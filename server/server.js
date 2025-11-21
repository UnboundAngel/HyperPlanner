// Basic planner backend with:
// - Tasks API
// - Simple stats
// - Email reminders via cron
// - SQLite persistence
// - Serves frontend from ../public at "/"

const fs = require("fs");
const os = require("os");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Database = require("better-sqlite3");
const dotenv = require("dotenv");

const envPaths = [
    path.join(__dirname, "..", ".env"),
    path.join(__dirname, ".env"),
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "..", ".env"),
    path.join(os.homedir(), ".env"),
    path.join(os.homedir(), "AI_Hub", ".env"),
    process.env.ENV_PATH,
].filter(Boolean);

envPaths.forEach((p) => {
    if (fs.existsSync(p)) {
        dotenv.config({ path: p });
    }
});

const app = express();
const PORT = process.env.PORT || 4000;

// ===========================
// CONFIG
// ===========================
const DB_PATH = path.join(__dirname, "planner.db");
const PUBLIC_DIR = path.join(__dirname, "..", "public"); // <— frontend folder

// Ideally load from env vars (Zoho SMTP)
const EMAIL_FROM = process.env.SMTP_FROM_EMAIL || process.env.EMAIL_FROM;
const EMAIL_FROM_NAME = process.env.SMTP_FROM_NAME || "HyperPlanner Notifications";
const EMAIL_TO_FALLBACK = process.env.EMAIL_TO_FALLBACK;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USERNAME || process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

// ===========================
// MIDDLEWARE
// ===========================
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(PUBLIC_DIR));

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "assets", "icon.png"));
});

// Root: send index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

// ===========================
// DATABASE SETUP
// ===========================
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending',   -- pending | in_progress | done | archived
    priority TEXT NOT NULL DEFAULT 'medium',  -- low | medium | high
    due_date TEXT,                             -- ISO string
    start_time TEXT,
    end_time TEXT,
    location TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    reminder_minutes_before INTEGER DEFAULT 60,
    reminder_sent INTEGER NOT NULL DEFAULT 0,
    recurring_rule TEXT,                       -- e.g. "daily", "weekly", "none"
    context TEXT,
    tags TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS email_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    email TEXT NOT NULL,
    alerts_enabled INTEGER NOT NULL DEFAULT 1,
    summary_enabled INTEGER NOT NULL DEFAULT 1,
    summary_hour INTEGER NOT NULL DEFAULT 8,
    allowed_domains TEXT
  )
`).run();

// Ensure there is always row with id=1
const existingSettings = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
if (!existingSettings) {
  db.prepare(`
    INSERT INTO email_settings (id, email, alerts_enabled, summary_enabled, summary_hour, allowed_domains)
    VALUES (1, ?, 0, 0, 8, NULL)
  `).run(EMAIL_TO_FALLBACK);
}

// Ensure context column exists for older DBs
const taskColumns = db.prepare("PRAGMA table_info(tasks)").all();
const ensureColumn = name => {
  if (!taskColumns.some(col => col.name === name)) {
    db.prepare(`ALTER TABLE tasks ADD COLUMN ${name} TEXT`).run();
  }
};
if (!taskColumns.some(col => col.name === "context")) {
  db.prepare("ALTER TABLE tasks ADD COLUMN context TEXT").run();
}
ensureColumn("start_time");
ensureColumn("end_time");
ensureColumn("location");
ensureColumn("tags");

db.prepare(`
  CREATE TABLE IF NOT EXISTS smart_terms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    term TEXT NOT NULL,
    weight INTEGER NOT NULL DEFAULT 1,
    metadata TEXT
  )
`).run();

function loadSmartTermSeed() {
  try {
    const seed = require("./data/smart_terms_seed.json");
    if (Array.isArray(seed)) {
      return seed;
    }
  } catch (err) {
    console.warn("Smart term seed file missing or invalid, falling back to inline defaults.");
  }
  return [];
}

const fallbackSmartTerms = [
  { category: "context", term: "work", metadata: "Work" },
  { category: "context", term: "client", metadata: "Work" },
  { category: "context", term: "meeting", metadata: "Work" },
  { category: "context", term: "presentation", metadata: "Work" },
  { category: "context", term: "proposal", metadata: "Work" },
  { category: "context", term: "sales", metadata: "Sales" },
  { category: "context", term: "demo", metadata: "Sales" },
  { category: "context", term: "campaign", metadata: "Marketing" },
  { category: "context", term: "content", metadata: "Marketing" },
  { category: "context", term: "family", metadata: "Personal" },
  { category: "context", term: "birthday", metadata: "Personal" },
  { category: "context", term: "vacation", metadata: "Personal" },
  { category: "context", term: "travel", metadata: "Travel" },
  { category: "context", term: "flight", metadata: "Travel" },
  { category: "context", term: "hotel", metadata: "Travel" },
  { category: "context", term: "gym", metadata: "Health" },
  { category: "context", term: "doctor", metadata: "Health" },
  { category: "context", term: "dentist", metadata: "Health" },
  { category: "context", term: "therapy", metadata: "Health" },
  { category: "context", term: "study", metadata: "Study" },
  { category: "context", term: "exam", metadata: "Study" },
  { category: "context", term: "assignment", metadata: "Study" },
  { category: "context", term: "english", metadata: "Study" },
  { category: "context", term: "math", metadata: "Study" },
  { category: "context", term: "science", metadata: "Study" },
  { category: "context", term: "history", metadata: "Study" },
  { category: "context", term: "project", metadata: "Study" },
  { category: "context", term: "essay", metadata: "Study" },
  { category: "context", term: "paper", metadata: "Study" },
  { category: "context", term: "research", metadata: "Study" },
  { category: "context", term: "lab", metadata: "Study" },
  { category: "context", term: "homework", metadata: "Study" },
  { category: "context", term: "portfolio", metadata: "Work" },
  { category: "context", term: "sprint", metadata: "Product" },
  { category: "context", term: "budget", metadata: "Finance" },
  { category: "context", term: "invoice", metadata: "Finance" },
  { category: "context", term: "taxes", metadata: "Finance" },
  { category: "context", term: "sprint", metadata: "Product" },
  { category: "context", term: "deploy", metadata: "Product" },
  { category: "context", term: "retrospective", metadata: "Product" },
  { category: "priority_high", term: "urgent" },
  { category: "priority_high", term: "asap" },
  { category: "priority_high", term: "deadline" },
  { category: "priority_high", term: "review" },
  { category: "priority_high", term: "submit" },
  { category: "priority_high", term: "critical" },
  { category: "priority_high", term: "blocker" },
  { category: "priority_high", term: "launch" },
  { category: "priority_high", term: "handoff" },
  { category: "priority_high", term: "presentation" },
  { category: "priority_high", term: "proposal" },
  { category: "priority_high", term: "demo" },
  { category: "priority_low", term: "idea" },
  { category: "priority_low", term: "someday" },
  { category: "priority_low", term: "later" },
  { category: "priority_low", term: "maybe" },
  { category: "priority_low", term: "wishlist" },
  { category: "priority_low", term: "optional" }
];

const smartTermSeed = loadSmartTermSeed();
const seedTerms = smartTermSeed.length ? smartTermSeed : fallbackSmartTerms;

const existingSmartTerms = db.prepare("SELECT category, term FROM smart_terms").all();
const existingKeys = new Set(existingSmartTerms.map(row => `${row.category}::${row.term.toLowerCase()}`));
const missingTerms = seedTerms.filter(
  row => !existingKeys.has(`${row.category}::${row.term.toLowerCase()}`)
);
if (missingTerms.length) {
  const insertSmartTerm = db.prepare(
    "INSERT INTO smart_terms (category, term, weight, metadata) VALUES (@category, @term, @weight, @metadata)"
  );
  const insertMany = db.transaction(rows => {
    rows.forEach(row =>
      insertSmartTerm.run({
        category: row.category,
        term: row.term,
        weight: row.weight || 1,
        metadata: row.metadata ?? null
      })
    );
  });
  insertMany(missingTerms);
}

// ===========================
// EMAIL TRANSPORT
// ===========================
function createTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // Zoho: STARTTLS on 587
    requireTLS: true,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  });
}

function validateSmtpConfig() {
  const missing = [];
  if (!SMTP_HOST) missing.push("SMTP_HOST");
  if (!SMTP_USER) missing.push("SMTP_USERNAME");
  if (!SMTP_PASS) missing.push("SMTP_PASSWORD");
  if (!EMAIL_FROM) missing.push("SMTP_FROM_EMAIL");
  return { valid: missing.length === 0, missing };
}

let lastEmailSentAt = 0;
async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject || !html) throw new Error("Email payload missing to/subject/html");
  const transporter = createTransport();
  const from = `"${EMAIL_FROM_NAME}" <${EMAIL_FROM}>`;
  const mail = {
    from,
    to,
    subject,
    html,
    text: text || stripHtml(html)
  };
  const attempts = 3;
  for (let i = 1; i <= attempts; i++) {
    try {
      const waitMs = Math.max(0, 1000 - (Date.now() - lastEmailSentAt));
      if (waitMs) await new Promise(res => setTimeout(res, waitMs));
      const info = await transporter.sendMail(mail);
      lastEmailSentAt = Date.now();
      return info;
    } catch (err) {
      console.error(`Email send failed (attempt ${i}/${attempts})`, err);
      if (i === attempts) throw err;
      const backoff = 300 * 2 ** (i - 1);
      await new Promise(res => setTimeout(res, backoff));
    }
  }
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// ===========================
// HELPERS
// ===========================
function nowISO() {
  return new Date().toISOString();
}

function normalizeStatus(status) {
  const allowed = ["pending", "in_progress", "done", "archived"];
  return allowed.includes(status) ? status : "pending";
}

function normalizePriority(priority) {
  const allowed = ["low", "medium", "high"];
  return allowed.includes(priority) ? priority : "medium";
}

function normalizeRecurring(rule) {
  const allowed = ["none", "daily", "weekly", "monthly"];
  return allowed.includes(rule) ? rule : "none";
}

function startOfDayLocal(date = new Date()) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDaysLocal(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatDueForEmail(value) {
  if (!value) return "No due date";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatTaskForEmailHTML(task) {
  const context = task.context ? ` · ${escapeHtml(task.context)}` : "";
  return `<li><strong>${escapeHtml(task.title)}</strong>${context}<br/><small>[${task.priority}] ${task.status.replace(
    "_",
    " "
  )} · Due ${escapeHtml(formatDueForEmail(task.due_date))}</small></li>`;
}

function formatTaskForEmailText(task) {
  const context = task.context ? ` (${task.context})` : "";
  return `- [${task.priority}] ${task.title}${context} · ${task.status.replace(
    "_",
    " "
  )} · due ${formatDueForEmail(task.due_date)}`;
}

function snippetText(str, max = 140) {
  if (!str) return "";
  const clean = String(str).trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

function formatReminderEmailHTML(task) {
  const due = escapeHtml(formatDueForEmail(task.due_date));
  const context = task.context
    ? `<span style="background:#eef2ff;color:#312e81;padding:2px 8px;border-radius:999px;font-size:11px;margin-right:6px;">${escapeHtml(
        task.context
      )}</span>`
    : "";
  const recurring =
    task.recurring_rule && task.recurring_rule !== "none"
      ? `<span style="background:#ecfccb;color:#365314;padding:2px 8px;border-radius:999px;font-size:11px;">Repeats ${escapeHtml(
          task.recurring_rule
        )}</span>`
      : "";
  const desc = task.description
    ? `<p style="margin:10px 0 0;color:#475569;line-height:1.4;">${escapeHtml(
        snippetText(task.description, 180)
      )}</p>`
    : "";
  return `
    <article style="border:1px solid #e2e8f0;border-radius:22px;padding:18px;margin:16px 0;background:linear-gradient(135deg,rgba(248,250,252,0.95),rgba(224,231,255,0.8));box-shadow:0 15px 40px rgba(15,23,42,0.08);">
      <h4 style="margin:0 0 4px;color:#0f172a;font-size:16px;">${escapeHtml(task.title)}</h4>
      <p style="margin:0;font-size:13px;color:#475569;">Due <strong>${due}</strong> &middot; Priority <strong>${escapeHtml(
        capitalCase(task.priority)
      )}</strong></p>
      <div style="margin:6px 0;font-size:12px;color:#475569;">${context}${recurring}</div>
      ${desc}
    </article>
  `;
}

function formatReminderEmailText(task) {
  const due = formatDueForEmail(task.due_date);
  const recurring =
    task.recurring_rule && task.recurring_rule !== "none" ? ` · repeats ${task.recurring_rule}` : "";
  const context = task.context ? `Context: ${task.context}\n` : "";
  const desc = task.description ? `Notes: ${snippetText(task.description, 160)}\n` : "";
  return `${task.title}\nDue: ${due} · Priority: ${task.priority}${recurring}\n${context}${desc}`.trim();
}

function capitalCase(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function normalizeTags(raw) {
  if (!raw) return "";
  const tags = Array.isArray(raw) ? raw : String(raw).split(/[,;]/);
  return tags
    .map(t => String(t || "").trim())
    .filter(Boolean)
    .map(t => t.split(/\s+/)[0])
    .slice(0, 8)
    .join(",");
}

function buildEmailChip(label, value) {
  return `<div style="flex:1;min-width:140px;padding:12px 16px;border-radius:16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.15);">
    <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6366f1;">${escapeHtml(
      label
    )}</p>
    <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#0f172a;">${escapeHtml(value)}</p>
  </div>`;
}

function wrapEmailHtml({ title, subtitle = "", body }) {
  return `
  <div style="background:#eef2ff;padding:32px 16px;font-family:'Inter','Segoe UI',sans-serif;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:32px;padding:40px 32px;border:1px solid #e2e8f0;box-shadow:0 30px 80px rgba(15,23,42,0.18);">
      <div style="text-align:center;margin-bottom:28px;">
        <p style="text-transform:uppercase;letter-spacing:0.45em;font-size:12px;color:#a5b4fc;margin:0;">HyperPlanner</p>
        <h1 style="margin:16px 0 6px;font-size:26px;color:#0f172a;">${escapeHtml(title)}</h1>
        <p style="margin:0;color:#64748b;font-size:15px;">${escapeHtml(subtitle)}</p>
      </div>
      ${body}
      <p style="margin-top:32px;font-size:13px;color:#94a3b8;">Stay focused,<br/><strong>HyperPlanner</strong></p>
    </div>
  </div>`;
}

// ===========================
// TASK QUERIES
// ===========================
const insertTaskStmt = db.prepare(`
  INSERT INTO tasks (
    title, description, status, priority,
    due_date, start_time, end_time, location,
    created_at, updated_at,
    reminder_minutes_before, reminder_sent, recurring_rule, context, tags
  )
  VALUES (
    @title, @description, @status, @priority,
    @due_date, @start_time, @end_time, @location,
    @created_at, @updated_at,
    @reminder_minutes_before, 0, @recurring_rule, @context, @tags
  )
`);

const updateTaskStmt = db.prepare(`
  UPDATE tasks
  SET
    title = @title,
    description = @description,
    status = @status,
    priority = @priority,
    due_date = @due_date,
    start_time = @start_time,
    end_time = @end_time,
    location = @location,
    updated_at = @updated_at,
    reminder_minutes_before = @reminder_minutes_before,
    recurring_rule = @recurring_rule,
    context = @context,
    tags = @tags
  WHERE id = @id
`);

const markReminderSentStmt = db.prepare(`
  UPDATE tasks
  SET reminder_sent = 1
  WHERE id = ?
`);

const resetReminderStmt = db.prepare(`
  UPDATE tasks
  SET reminder_sent = 0
  WHERE id = ?
`);

// ===========================
// ROUTES: TASKS
// ===========================

// GET /api/tasks?status=&from=&to=&priority=
app.get("/api/tasks", (req, res) => {
  const { status, from, to, priority } = req.query;
  const conditions = [];
  const params = {};

  if (status) {
    conditions.push("status = @status");
    params.status = status;
  }
  if (priority) {
    conditions.push("priority = @priority");
    params.priority = priority;
  }
  if (from) {
    conditions.push("(due_date IS NOT NULL AND due_date >= @from)");
    params.from = from;
  }
  if (to) {
    conditions.push("(due_date IS NOT NULL AND due_date <= @to)");
    params.to = to;
  }

  let sql = "SELECT * FROM tasks";
  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY COALESCE(due_date, created_at) ASC";

  const rows = db.prepare(sql).all(params);
  res.json(rows);
});

// POST /api/tasks
app.post("/api/tasks", (req, res) => {
  const {
    title,
    description = "",
    status = "pending",
    priority = "medium",
    due_date = null,
    start_time = null,
    end_time = null,
    location = "",
    reminder_minutes_before = 60,
    recurring_rule = "none",
    context = "",
    tags = ""
  } = req.body || {};

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required" });
  }

  const now = nowISO();
  const task = {
    title: title.trim(),
    description: description?.trim() || "",
    status: normalizeStatus(status),
    priority: normalizePriority(priority),
    due_date,
    start_time,
    end_time,
    location: String(location || "").trim(),
    created_at: now,
    updated_at: now,
    reminder_minutes_before: Number(reminder_minutes_before) || 60,
    recurring_rule: normalizeRecurring(recurring_rule),
    context: String(context || "").trim(),
    tags: normalizeTags(tags || context || "")
  };

  const info = insertTaskStmt.run(task);
  const created = db.prepare("SELECT * FROM tasks WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  const {
    title = existing.title,
    description = existing.description,
    status = existing.status,
    priority = existing.priority,
    due_date = existing.due_date,
    start_time = existing.start_time,
    end_time = existing.end_time,
    location = existing.location,
    reminder_minutes_before = existing.reminder_minutes_before,
    recurring_rule = existing.recurring_rule,
    context = existing.context,
    tags = existing.tags
  } = req.body || {};

  const updated = {
    id,
    title: String(title).trim(),
    description: String(description || "").trim(),
    status: normalizeStatus(status),
    priority: normalizePriority(priority),
    due_date,
    start_time,
    end_time,
    location: String(location || "").trim(),
    updated_at: nowISO(),
    reminder_minutes_before: Number(reminder_minutes_before) || 60,
    recurring_rule: normalizeRecurring(recurring_rule),
    context: String(context || "").trim(),
    tags: normalizeTags(tags || context || "")
  };

  updateTaskStmt.run(updated);
  resetReminderStmt.run(id); // due date / reminder changed
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  res.json(row);
});

// PATCH /api/tasks/:id/status
app.patch("/api/tasks/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { status } = req.body || {};
  const normalized = normalizeStatus(status);
  db.prepare(`
    UPDATE tasks
    SET status = ?, updated_at = ?
    WHERE id = ?
  `).run(normalized, nowISO(), id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  res.json(updated);
});

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  if (!result.changes) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({ success: true });
});

// SMART TERMS
app.get("/api/smart-terms", (req, res) => {
  const rows = db
    .prepare("SELECT category, term, weight, metadata FROM smart_terms ORDER BY category, term")
    .all();
  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.category]) acc[row.category] = [];
    acc[row.category].push(row);
    return acc;
  }, {});
  res.json(grouped);
});

// ===========================
// ROUTES: EMAIL SETTINGS
// ===========================

// GET /api/email-settings
app.get("/api/email-settings", (req, res) => {
  const row = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
  res.json(row);
});

// GET /api/email-settings/status
app.get("/api/email-settings/status", (req, res) => {
  const smtpCheck = validateSmtpConfig();
  res.json({
    configured: smtpCheck.valid,
    missing: smtpCheck.missing
  });
});

// PUT /api/email-settings
app.put("/api/email-settings", (req, res) => {
  const existing = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
  const {
    email = existing.email,
    alerts_enabled = existing.alerts_enabled,
    summary_enabled = existing.summary_enabled,
    summary_hour = existing.summary_hour,
    allowed_domains = existing.allowed_domains
  } = req.body || {};

  db.prepare(`
    UPDATE email_settings
    SET email = @email,
        alerts_enabled = @alerts_enabled,
        summary_enabled = @summary_enabled,
        summary_hour = @summary_hour,
        allowed_domains = @allowed_domains
    WHERE id = 1
  `).run({
    email: String(email).trim(),
    alerts_enabled: alerts_enabled ? 1 : 0,
    summary_enabled: summary_enabled ? 1 : 0,
    summary_hour: Number(summary_hour) || 8,
    allowed_domains: allowed_domains ? String(allowed_domains).trim() : null
  });

  const updated = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
  res.json(updated);
});

// POST /api/email-settings/test
app.post("/api/email-settings/test", async (req, res) => {
  const settings = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
  const smtpCheck = validateSmtpConfig();
  if (!smtpCheck.valid) {
    return res.status(400).json({
      error: "Email not configured",
      detail: `Missing env vars: ${smtpCheck.missing.join(", ")}`
    });
  }
  try {
    await sendEmail({
      to: settings.email,
      subject: "Planner test email",
      text: "If you got this, email alerts are wired correctly.",
      html: "<p>If you got this, email alerts are wired correctly.</p>"
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Test email failed:", err);
    res.status(500).json({ error: "Failed to send test email", detail: String(err.message || err) });
  }
});

// ===========================
// ROUTES: STATS
// ===========================

app.get("/api/stats/overview", (req, res) => {
  const total = db.prepare("SELECT COUNT(*) as c FROM tasks").get().c;
  const byStatus = db.prepare(`
    SELECT status, COUNT(*) as c
    FROM tasks
    GROUP BY status
  `).all();
  const byPriority = db.prepare(`
    SELECT priority, COUNT(*) as c
    FROM tasks
    GROUP BY priority
  `).all();
  const upcoming = db.prepare(`
    SELECT *
    FROM tasks
    WHERE status != 'done' AND due_date IS NOT NULL
    ORDER BY due_date ASC
    LIMIT 5
  `).all();

  res.json({
    total,
    byStatus,
    byPriority,
    upcoming
  });
});

// ===========================
// EMAIL SCHEDULER
// ===========================

function findTasksNeedingReminders() {
  const now = new Date();
  const nowISO = now.toISOString();

  const rows = db.prepare(`
    SELECT *
    FROM tasks
    WHERE
      status != 'done'
      AND due_date IS NOT NULL
      AND reminder_sent = 0
  `).all();

  const dueSoon = [];

  for (const t of rows) {
    try {
      const due = new Date(t.due_date);
      if (isNaN(due.getTime())) continue;

      const diffMs = due.getTime() - now.getTime();
      const diffMinutes = diffMs / 60000;
      if (diffMinutes <= t.reminder_minutes_before && diffMinutes >= 0) {
        dueSoon.push(t);
      }
    } catch (_) {
      // ignore broken dates
    }
  }

  return { dueSoon, scannedAt: nowISO };
}

async function processReminders() {
  const settings = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
  if (!settings || !settings.alerts_enabled) return;

  const { dueSoon } = findTasksNeedingReminders();
  if (!dueSoon.length) return;

  const to = settings.email;
  const subject = `[Planner] ${dueSoon.length} task(s) due soon`;

  const detailedText = dueSoon.map(formatReminderEmailText).join("\n\n");
  const text = `HyperPlanner reminder — ${dueSoon.length} upcoming task(s)\n\n${detailedText}\n\nTip: snooze in 30/60/90 minute increments or punt to tomorrow morning when things get tight.`;
  const chips = [
    buildEmailChip("Window checked", formatDueForEmail(new Date().toISOString())),
    buildEmailChip("Avg reminder lead", `${Math.round(
      dueSoon.reduce((sum, t) => sum + (t.reminder_minutes_before || 0), 0) / dueSoon.length
    )} min`),
    buildEmailChip("High priority", `${dueSoon.filter(t => t.priority === "high").length}`)
  ].join("");
  const htmlBody = `
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;">
      ${chips}
    </div>
    ${dueSoon.map(formatReminderEmailHTML).join("")}
    <p style="font-size:13px;color:#94a3b8;margin-top:16px;">Tip: snooze in 30/60/90 minute increments or punt to tomorrow morning when the timeline is tight.</p>
  `;
  const html = wrapEmailHtml({
    title: `${dueSoon.length} task(s) are coming up`,
    subtitle: "Here’s what deserves your attention next.",
    body: htmlBody
  });

  try {
    await sendEmail({ to, subject, text, html });

    const mark = db.transaction(tasks => {
      for (const t of tasks) {
        markReminderSentStmt.run(t.id);
      }
    });
    mark(dueSoon);
  } catch (err) {
    console.error("Reminder email failed:", err);
  }
}

async function processDailySummary() {
  const settings = db.prepare("SELECT * FROM email_settings WHERE id = 1").get();
  if (!settings || !settings.summary_enabled) return;

  const now = new Date();
  const hour = now.getHours();
  if (hour !== settings.summary_hour) return;

  const todayISO = now.toISOString().slice(0, 10);
  const startToday = startOfDayLocal(now);
  const endToday = addDaysLocal(startToday, 1);
  const upcomingEnd = addDaysLocal(startToday, 3);

  const allTasks = db.prepare("SELECT * FROM tasks").all();
  const tasksWithDue = allTasks.filter(t => t.due_date);

  const todayTasks = [];
  const upcomingTasks = [];
  const overdueTasks = [];

  tasksWithDue.forEach(task => {
    const due = new Date(task.due_date);
    if (Number.isNaN(due.getTime())) return;
    if (due >= startToday && due < endToday) {
      todayTasks.push(task);
    } else if (due >= endToday && due < upcomingEnd) {
      upcomingTasks.push(task);
    } else if (due < now && task.status !== "done" && task.status !== "archived") {
      overdueTasks.push(task);
    }
  });

  const sortByDue = arr =>
    arr.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  sortByDue(todayTasks);
  sortByDue(upcomingTasks);
  sortByDue(overdueTasks);

  const sections = [
    { title: "Overdue", data: overdueTasks },
    { title: "Today", data: todayTasks },
    { title: "Next 72h", data: upcomingTasks }
  ];

  const sectionText = sections
    .map(section =>
      section.data.length
        ? `${section.title}:\n${section.data.map(formatTaskForEmailText).join("\n")}`
        : `${section.title}: none`
    )
    .join("\n\n");

  const sectionHtml = sections
    .map(section => {
      const list = section.data.length
        ? `<ul style="margin:8px 0 0 18px;padding:0;color:#475569;">${section.data
            .map(formatTaskForEmailHTML)
            .join("")}</ul>`
        : `<p style="margin:8px 0 0;color:#94a3b8;">Nothing queued.</p>`;
      return `<section style="border:1px solid #e2e8f0;border-radius:20px;padding:18px;margin-top:14px;background:rgba(248,250,252,0.75);">
        <h3 style="margin:0;color:#0f172a;">${section.title}</h3>
        ${list}
      </section>`;
    })
    .join("");

  const statusCounts = allTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const priorityCounts = allTasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const statsText = `Total: ${allTasks.length}
Status: ${Object.entries(statusCounts)
    .map(([status, count]) => `${status}: ${count}`)
    .join(", ")}
Priority: ${Object.entries(priorityCounts)
    .map(([priority, count]) => `${priority}: ${count}`)
    .join(", ")}`;

  const statsHtml = `
    <section style="border:1px solid #e2e8f0;border-radius:20px;padding:18px;margin-top:18px;background:rgba(249,250,251,0.8);">
      <h3 style="margin:0 0 6px;">Snapshot</h3>
      <ul style="margin:0;padding-left:18px;color:#475569;">
        <li>Total tasks: ${allTasks.length}</li>
        <li>Status mix: ${Object.entries(statusCounts)
          .map(([status, count]) => `${escapeHtml(status)} ${count}`)
          .join(", ")}</li>
        <li>Priorities: ${Object.entries(priorityCounts)
          .map(([priority, count]) => `${escapeHtml(priority)} ${count}`)
          .join(", ")}</li>
      </ul>
    </section>
  `;
  const contextCounts = allTasks.reduce((acc, task) => {
    if (!task.context) return acc;
    acc[task.context] = (acc[task.context] || 0) + 1;
    return acc;
  }, {});
  const topContexts = Object.entries(contextCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const contextText = topContexts.length
    ? `Context focus: ${topContexts.map(([ctx, count]) => `${ctx} (${count})`).join(", ")}`
    : "Context focus: add context labels to surface trends.";
  const contextHtml = topContexts.length
    ? `<section style="border:1px solid #e2e8f0;border-radius:20px;padding:18px;margin-top:18px;background:rgba(236,254,255,0.6);">
        <h3 style="margin:0 0 6px;">Context focus</h3>
        <ul style="margin:0;padding-left:18px;color:#475569;">${topContexts
          .map(([ctx, count]) => `<li>${escapeHtml(ctx)} · ${count}</li>`)
          .join("")}</ul>
      </section>`
    : `<section style="border:1px solid #e2e8f0;border-radius:20px;padding:18px;margin-top:18px;background:rgba(236,254,255,0.6);">
        <h3 style="margin:0 0 6px;">Context focus</h3>
        <p style="margin:0;color:#94a3b8;">Add context labels to surface focus areas.</p>
      </section>`;

  const to = settings.email;
  const subject = `[Planner] Daily summary for ${todayISO}`;
  const text = `Daily summary for ${todayISO}\n\n${sectionText}\n\n${statsText}\n\n${contextText}`;
  const chipRow = `
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
      ${buildEmailChip("Total tasks", `${allTasks.length}`)}
      ${buildEmailChip("In progress", `${todayTasks.length}`)}
      ${buildEmailChip("Overdue", `${overdueTasks.length}`)}
    </div>`;
  const html = wrapEmailHtml({
    title: `Daily summary · ${todayISO}`,
    subtitle: `Snapshot generated at ${now.toLocaleTimeString()}`,
    body: `${chipRow}${sectionHtml}${statsHtml}${contextHtml}`
  });

  try {
    await sendEmail({ to, subject, text, html });
  } catch (err) {
    console.error("Daily summary failed:", err);
  }
}

// Every minute: check reminders
cron.schedule("* * * * *", () => {
  processReminders().catch(err => console.error(err));
});

// Every 15 minutes: check if we’re at the summary hour, send once
// At minute 0 of every hour
cron.schedule("0 * * * *", () => {
  processDailySummary().catch(err => console.error(err));
});


// ===========================
// START
// ===========================
app.listen(PORT, () => {
  console.log(`Planner API + frontend running on http://localhost:${PORT}`);
});
