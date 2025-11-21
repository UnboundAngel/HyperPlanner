const API_BASE = "http://localhost:4000/api";
const urlParams = new URLSearchParams(window.location.search);
const isDemoMode =
  urlParams.get("mode") === "demo" || localStorage.getItem("hyperplanner_mode") === "demo";

// Elements
const appRootEl = document.getElementById("app");
const refreshBtn = document.getElementById("refreshTasksBtn");
const newTaskBtn = document.getElementById("newTaskBtn");
const taskListEl = document.getElementById("taskList");
const taskCountEl = document.getElementById("taskCount");
const navTabs = document.querySelectorAll(".nav-tab");
const openWidgetDrawerBtn = document.getElementById("openWidgetDrawerBtn");
const openCaptureSheetBtn = document.getElementById("openCaptureSheetBtn");
const closeCaptureSheetBtn = document.getElementById("closeCaptureSheetBtn");
const captureSheetBackdrop = document.getElementById("captureSheetBackdrop");
const mobileTabButtons = document.querySelectorAll("[data-mobile-tab]");
const layoutOnboardingEl = document.getElementById("layoutOnboarding");
const layoutChoiceButtons = document.querySelectorAll("[data-layout-choice]");
const skipLayoutOnboardingBtn = document.getElementById("skipLayoutOnboarding");
const layoutOnboardingRememberEl = document.getElementById("layoutOnboardingRemember");
const widgetDrawerEl = document.getElementById("widgetDrawer");
const widgetDrawerBackdrop = document.getElementById("widgetDrawerBackdrop");
const closeWidgetDrawerBtn = document.getElementById("closeWidgetDrawerBtn");
const widgetLayoutButtons = document.querySelectorAll("[data-widget-layout]");
const widgetTemplateListBtn = document.getElementById("widgetTemplateListBtn");
const widgetSaveTemplateBtn = document.getElementById("widgetSaveTemplateBtn");
const jumpToSettingsBtn = document.getElementById("jumpToSettingsBtn");
const jumpToThemeBtn = document.getElementById("jumpToThemeBtn");
const widgetSpaceSaverToggle = document.getElementById("widgetSpaceSaverToggle");
const localCalendarToggleEl = document.getElementById("localCalendarToggle");
const localCalendarCountyEl = document.getElementById("localCalendarCounty");
const localCalendarStatusEl = document.getElementById("localCalendarStatus");
const iconPackSelectEl = document.getElementById("iconPackSelect");
const iconOverrideContextEl = document.getElementById("iconOverrideContext");
const iconOverrideValueEl = document.getElementById("iconOverrideValue");
const iconOverrideSaveBtn = document.getElementById("iconOverrideSave");
const iconOverrideListEl = document.getElementById("iconOverrideList");
const taskVariantSelectEl = document.getElementById("taskVariantSelect");
const boardVariantSelectEl = document.getElementById("boardVariantSelect");
const heroVariantSelectEl = document.getElementById("heroVariantSelect");
const variantDensityToggleEl = document.getElementById("variantDensityToggle");
const variantRadiusToggleEl = document.getElementById("variantRadiusToggle");
const variantShadowToggleEl = document.getElementById("variantShadowToggle");
const nlpTriggerInputEl = document.getElementById("nlpTriggerInput");
const nlpActionSelectEl = document.getElementById("nlpActionSelect");
const nlpValueInputEl = document.getElementById("nlpValueInput");
const nlpOffsetInputEl = document.getElementById("nlpOffsetInput");
const nlpValueLabelEl = document.getElementById("nlpValueLabel");
const nlpOffsetLabelEl = document.getElementById("nlpOffsetLabel");
const nlpAddRuleBtn = document.getElementById("nlpAddRuleBtn");
const nlpRuleListEl = document.getElementById("nlpRuleList");
const autoTriggerInputEl = document.getElementById("autoTriggerInput");
const autoActionSelectEl = document.getElementById("autoActionSelect");
const autoValueInputEl = document.getElementById("autoValueInput");
const autoOffsetInputEl = document.getElementById("autoOffsetInput");
const autoValueLabelEl = document.getElementById("autoValueLabel");
const autoOffsetLabelEl = document.getElementById("autoOffsetLabel");
const autoAddRuleBtn = document.getElementById("autoAddRuleBtn");
const autoRuleListEl = document.getElementById("autoRuleList");

// Filters
const filterStatusEl = document.getElementById("filterStatus");
const filterPriorityEl = document.getElementById("filterPriority");
const filterFromEl = document.getElementById("filterFrom");
const filterToEl = document.getElementById("filterTo");
const applyFiltersBtn = document.getElementById("applyFiltersBtn");

// Quick form
const quickForm = document.getElementById("quickTaskForm");
const quickTitleEl = document.getElementById("quickTitle");
const quickDescriptionEl = document.getElementById("quickDescription");
const quickDueDateEl = document.getElementById("quickDueDate");
const quickStartTimeEl = document.getElementById("quickStartTime");
const quickEndTimeEl = document.getElementById("quickEndTime");
const quickPriorityEl = document.getElementById("quickPriority");
const quickReminderEl = document.getElementById("quickReminderMinutes");
const quickContextEl = document.getElementById("quickContext");
const quickTagsEl = document.getElementById("quickTags");
const quickLocationEl = document.getElementById("quickLocation");
const quickLocationMapBtn = document.getElementById("quickLocationMapBtn");
const smartHintTextEl = document.getElementById("smartHintText");
const clearSmartHintBtn = document.getElementById("clearSmartHintBtn");
const focusSuggestionTextEl = document.getElementById("focusSuggestionText");
const focusSuggestionBtn = document.getElementById("focusSuggestionBtn");
const quickTitleFieldEl = document.getElementById("quickTitleField");
const templateSelectEl = document.getElementById("templateSelect");
const applyTemplateBtn = document.getElementById("applyTemplateBtn");
const openTemplateSettingsBtn = document.getElementById("openTemplateSettingsBtn");
const settingsSaveTemplateBtn = document.getElementById("settingsSaveTemplateBtn");
const templateNameInputEl = document.getElementById("templateNameInput");
const templateTagsInputEl = document.getElementById("templateTagsInput");
const templateDueOffsetInputEl = document.getElementById("templateDueOffsetInput");
const templateLayoutSelectEl = document.getElementById("templateLayoutSelect");
const templateRecurringSelectEl = document.getElementById("templateRecurringSelect");
const templateImportBtn = document.getElementById("templateImportBtn");
const templateExportBtn = document.getElementById("templateExportBtn");
const templateDownloadBtn = document.getElementById("templateDownloadBtn");
const templateImportFileEl = document.getElementById("templateImportFile");
const templateGalleryGridEl = document.getElementById("templateGalleryGrid");
const refreshTemplateGalleryBtn = document.getElementById("refreshTemplateGalleryBtn");
const openDrawerTab = document.getElementById("openDrawerTab");
const openGlassSidebarBtn = document.getElementById("openGlassSidebar");
const closeGlassSidebarBtn = document.getElementById("closeGlassSidebar");
const glassSidebarEl = document.getElementById("glassSidebar");
const sidebarLayoutButtons = document.querySelectorAll(".sidebar-chip[data-widget-layout]");
const sidebarOpenDrawerBtn = document.getElementById("sidebarOpenDrawer");
const sidebarOpenSettingsBtn = document.getElementById("sidebarOpenSettings");
const sidebarOpenThemeBtn = document.getElementById("sidebarOpenTheme");
const sidebarOpenTemplatesBtn = document.getElementById("sidebarOpenTemplates");
const templateManagerListEl = document.getElementById("templateManagerList");
const templateStatusEl = document.getElementById("templateStatus");
const quickGenerateDescBtn = document.getElementById("quickGenerateDescBtn");
const quickAssistStatusEl = document.getElementById("quickAssistStatus");
const quickTitleHighlightsEl = document.getElementById("quickTitleHighlights");
const smartTokenRowEl = document.getElementById("smartTokenRow");
const inlineSubtaskPreviewEl = document.getElementById("inlineSubtaskPreview");
const conflictHintEl = document.getElementById("conflictHint");
const quickLocationAutoBtn = document.getElementById("quickLocationAutoBtn");
const quickLocationSuggestionsEl = document.getElementById("quickLocationSuggestions");
const quickLocationStatusEl = document.getElementById("quickLocationStatus");
const calendarGridEl = document.getElementById("calendarGrid");

// Email settings
const emailForm = document.getElementById("emailSettingsForm");
const emailAddressEl = document.getElementById("emailAddress");
const alertsEnabledEl = document.getElementById("alertsEnabled");
const summaryEnabledEl = document.getElementById("summaryEnabled");
const summaryHourEl = document.getElementById("summaryHour");
const emailStatusEl = document.getElementById("emailStatus");
const testEmailBtn = document.getElementById("testEmailBtn");
const statsOverviewEl = document.getElementById("statsOverview");
const taskBoardEl = document.getElementById("taskBoardColumns");
const taskBoardSummaryEl = document.getElementById("taskBoardSummary");
const insightsPanelEl = document.getElementById("insightsPanel");
const allowedDomainsEl = document.getElementById("allowedDomains");

// Hero summary
const heroNextTitleEl = document.getElementById("heroNextTitle");
const heroNextDueEl = document.getElementById("heroNextDue");
const heroNextDescriptionEl = document.getElementById("heroNextDescription");
const heroFocusCountEl = document.getElementById("heroFocusCount");
const heroFocusDistributionEl = document.getElementById("heroFocusDistribution");
const heroFocusProgressBar = document.getElementById("heroFocusProgressBar");
const heroAlertsStatusEl = document.getElementById("heroAlertsStatus");
const heroAlertsMetaEl = document.getElementById("heroAlertsMeta");
const heroAlertsEditBtn = document.getElementById("heroAlertsEdit");
const emailAlertsBadgeEl = document.getElementById("emailAlertsBadge");
const emailNextSummaryEl = document.getElementById("emailNextSummary");
const emailNextAlertEl = document.getElementById("emailNextAlert");

// Modal
const modal = document.getElementById("taskModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskForm = document.getElementById("taskForm");
const modalTitleEl = document.getElementById("modalTitle");
const taskIdEl = document.getElementById("taskId");
const taskTitleEl = document.getElementById("taskTitle");
const taskDescriptionEl = document.getElementById("taskDescription");
const taskStatusEl = document.getElementById("taskStatus");
const taskPriorityEl = document.getElementById("taskPriority");
const taskDueDateEl = document.getElementById("taskDueDate");
const taskReminderMinutesEl = document.getElementById("taskReminderMinutes");
const taskRecurringRuleEl = document.getElementById("taskRecurringRule");
const taskContextEl = document.getElementById("taskContext");
const taskTagsEl = document.getElementById("taskTags");
const taskStartDateTimeEl = document.getElementById("taskStartDateTime");
const taskEndTimeOnlyEl = document.getElementById("taskEndTimeOnly");
const taskLocationEl = document.getElementById("taskLocation");
const taskLocationMapBtn = document.getElementById("taskLocationMapBtn");
const taskLocationAutoBtn = document.getElementById("taskLocationAutoBtn");
const taskLocationSuggestionsEl = document.getElementById("taskLocationSuggestions");
const taskLocationStatusEl = document.getElementById("taskLocationStatus");
const modalGenerateDescBtn = document.getElementById("modalGenerateDescBtn");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");
const markDoneBtn = document.getElementById("markDoneBtn");
const snoozeStatusEl = document.getElementById("snoozeStatus");
const snoozeButtons = document.querySelectorAll("[data-snooze]");

// Theme lab
const themeAccentEl = document.getElementById("themeAccent");
const themePageBgEl = document.getElementById("themePageBg");
const themeGradAEl = document.getElementById("themeGradA");
const themeGradBEl = document.getElementById("themeGradB");
const themeGradCEl = document.getElementById("themeGradC");
const themeCardGlassEl = document.getElementById("themeCardGlass");
const themeTextMainEl = document.getElementById("themeTextMain");
const themeTextMutedEl = document.getElementById("themeTextMuted");
const themePrioHighEl = document.getElementById("themePrioHigh");
const themePrioMedEl = document.getElementById("themePrioMed");
const themePrioLowEl = document.getElementById("themePrioLow");
const themeRadiusLgEl = document.getElementById("themeRadiusLg");
const themeRadiusMdEl = document.getElementById("themeRadiusMd");
const themeRadiusSmEl = document.getElementById("themeRadiusSm");
const themeShadowStyleEl = document.getElementById("themeShadowStyle");
const quickThemeButtons = document.querySelectorAll("[data-quick-theme]");
const themePackSelectEl = document.getElementById("themePackSelect");
const themePackAccentEl = document.getElementById("themePackAccent");
const themePackBackgroundEl = document.getElementById("themePackBackground");
const themePackCardStyleEl = document.getElementById("themePackCardStyle");
const themePackEdgesEl = document.getElementById("themePackEdges");
const toggleAdvancedThemeBtn = document.getElementById("toggleAdvancedTheme");
const themeAdvancedPanel = document.getElementById("themeAdvancedPanel");
const themePreviewCalendarEl = document.getElementById("themePreviewCalendar");
const themePreviewTasksEl = document.getElementById("themePreviewTasks");
const themeOverrideCalendarEl = document.getElementById("themeOverrideCalendar");
const themeOverrideTasksEl = document.getElementById("themeOverrideTasks");
const themeOverrideStatusEl = document.getElementById("themeOverrideStatus");
const themePresetSelectEl = document.getElementById("themePresetSelect");
const themeApplyPresetBtn = document.getElementById("themeApplyPresetBtn");
const themeImportBtn = document.getElementById("themeImportBtn");
const themeExportBtn = document.getElementById("themeExportBtn");
const themeResetBtn = document.getElementById("themeResetBtn");
const themeJsonInputEl = document.getElementById("themeJsonInput");
const themeStatusEl = document.getElementById("themeStatus");
const themeLockToggleEl = document.getElementById("themeLockToggle");

// Calendar
const calendarRangeEl = document.getElementById("calendarRange");
const calendarWeekTagEl = document.getElementById("calendarWeekTag");
const prevWeekBtn = document.getElementById("prevWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const todayBtn = document.getElementById("todayBtn");
const densityButtons = document.querySelectorAll(".density-btn");

// State
let currentTasks = [];
let currentWeekStart = startOfWeek(new Date()); // Monday-based
let emailSettingsState = null;
let currentView = appRootEl?.dataset.view || "calendar";
let draggedTaskId = null;
let draggedPanelCardId = null;
let smartCaptureTimer = null;
let focusSuggestionDate = null;
let customTemplates = [];
let smartCapturedRecurring = null;
let calendarAnimationTimer = null;
let defaultPanelLayout = {};
let defaultLayoutSnapshot = null;
let panelDragGhost = null;
let panelDragData = null;
let highlightedPanelContainer = null;
let currentThemeKey = "default";
let advancedThemeVisible = false;
let calendarDensity = 60;
let pendingFlipDirection = null;
let isMobileView = false;
let iconPackKey = "minimal";
let iconOverrides = {};
let panelDragOffsetX = 0;
let panelDragOffsetY = 0;
const PANEL_LAYOUT_KEY = "hyperplanner.layout.panels";
const PANEL_HIDDEN_KEY = "hyperplanner.layout.hidden";
const USER_LAYOUTS_KEY = "hyperplanner.layouts.user";
const LAYOUT_ONBOARDING_KEY = "hyperplanner.onboarding.layout";
const THEME_STORAGE_KEY = "hyperplanner.theme.custom";
const THEME_LOCK_KEY = "hyperplanner.theme.lock";
const LOCAL_CALENDAR_KEY = "hyperplanner.local.calendar";
const ICON_PACK_KEY = "hyperplanner.icon.pack";
const ICON_OVERRIDE_KEY = "hyperplanner.icon.overrides";
const SPACE_SAVER_KEY = "hyperplanner.layout.spacesaver";
const LAYOUT_PRESETS = {
  minimal: {
    containers: {
      hero: [],
      left: ["panel-quick"],
      center: ["panel-calendar"],
      right: []
    },
    hidden: [
      "panel-kanban",
      "panel-filters",
      "panel-insights",
      "panel-email",
      "panel-settings",
      "panel-tasklist",
      "panel-overview",
      "panel-theme",
      "hero-next",
      "hero-focus",
      "hero-alerts"
    ]
  },
  dense: {
    containers: {
      hero: ["hero-next", "hero-focus", "hero-alerts"],
      left: ["panel-quick", "panel-filters", "panel-tasklist", "panel-kanban"],
      center: ["panel-calendar"],
      right: ["panel-email", "panel-theme", "panel-settings", "panel-overview", "panel-insights"]
    },
    hidden: []
  },
  creative: {
    containers: {
      hero: ["hero-notes", "hero-focus", "hero-alerts"].filter(Boolean),
      left: ["panel-quick", "panel-filters"],
      center: ["panel-calendar"],
      right: ["panel-insights", "panel-overview", "panel-theme", "panel-settings", "panel-email"]
    },
    hidden: ["panel-kanban"]
  },
  dashboard: {
    containers: {
      hero: ["hero-next", "hero-focus", "hero-alerts"],
      left: ["panel-tasklist", "panel-filters"],
      center: ["panel-calendar"],
      right: ["panel-overview", "panel-insights", "panel-theme", "panel-settings", "panel-email"]
    },
    hidden: ["panel-quick", "panel-kanban"]
  },
  kanban: {
    containers: {
      hero: ["hero-next", "hero-focus"],
      left: ["panel-kanban", "panel-tasklist"],
      center: ["panel-calendar"],
      right: ["panel-email", "panel-theme", "panel-settings", "panel-overview"]
    },
    hidden: ["panel-filters", "panel-insights", "hero-alerts"]
  },
  focus: {
    containers: {
      hero: ["hero-next", "hero-focus"],
      left: ["panel-quick", "panel-filters"],
      center: ["panel-calendar"],
      right: ["panel-tasklist", "panel-email", "panel-theme"]
    },
    hidden: ["panel-insights"]
  },
  split: {
    containers: {
      hero: ["hero-next", "hero-alerts"],
      left: ["panel-tasklist", "panel-kanban"],
      center: ["panel-calendar"],
      right: ["panel-quick", "panel-theme", "panel-settings"]
    },
    hidden: ["panel-filters", "panel-insights", "hero-focus"]
  },
  airy: {
    containers: {
      hero: ["hero-next"],
      left: ["panel-calendar"],
      center: ["panel-quick", "panel-tasklist"],
      right: ["panel-email", "panel-theme", "panel-settings", "panel-overview"]
    },
    hidden: ["panel-kanban", "panel-filters", "panel-insights", "hero-alerts", "hero-focus"]
  }
};
let userLayouts = {};
const DEFAULT_THEME = {
  accent: "#6366f1",
  pageBg: "#e8ecf7",
  gradientA: "rgba(99, 102, 241, 0.18)",
  gradientB: "rgba(14, 165, 233, 0.08)",
  gradientC: "rgba(232, 121, 249, 0.18)",
  cardGlass: "rgba(255, 255, 255, 0.92)",
  cardGlassMuted: "rgba(255, 255, 255, 0.75)",
  borderGlass: "rgba(255, 255, 255, 0.7)",
  borderStrong: "rgba(148, 163, 184, 0.35)",
  textMain: "#0f172a",
  textMuted: "#6b7280",
  textSoft: "#94a3b8",
  accentGradient: "linear-gradient(120deg, #6366f1, #8b5cf6, #ec4899)",
  prioHigh: "#f97316",
  prioMed: "#6366f1",
  prioLow: "#22c55e",
  prioHighBg: "rgba(249, 115, 22, 0.14)",
  prioMedBg: "rgba(99, 102, 241, 0.16)",
  prioLowBg: "rgba(34, 197, 94, 0.16)",
  radiusLg: 22,
  radiusMd: 12,
  radiusSm: 8,
  shadow: "soft"
};
const THEME_PRESETS = {
  minimal: {
    accent: "#2563eb",
    pageBg: "#f5f7fb",
    gradientA: "rgba(37,99,235,0.12)",
    gradientB: "rgba(99,102,241,0.08)",
    gradientC: "rgba(14,165,233,0.08)",
    cardGlass: "rgba(255,255,255,0.98)",
    textMain: "#0f172a",
    textMuted: "#5b6474",
    prioHigh: "#e11d48",
    prioMed: "#2563eb",
    prioLow: "#22c55e",
    radiusLg: 16,
    radiusMd: 10,
    radiusSm: 8,
    shadow: "flat"
  },
  soft: {
    accent: "#8b5cf6",
    pageBg: "#f3ecff",
    gradientA: "rgba(139,92,246,0.16)",
    gradientB: "rgba(236,72,153,0.12)",
    gradientC: "rgba(56,189,248,0.1)",
    cardGlass: "rgba(255,255,255,0.94)",
    textMain: "#111827",
    textMuted: "#6b7280",
    prioHigh: "#f59e0b",
    prioMed: "#8b5cf6",
    prioLow: "#22c55e",
    radiusLg: 22,
    radiusMd: 14,
    radiusSm: 10,
    shadow: "soft"
  },
  modern: {
    accent: "#6366f1",
    pageBg: "#111827",
    gradientA: "rgba(99,102,241,0.24)",
    gradientB: "rgba(37,99,235,0.18)",
    gradientC: "rgba(14,165,233,0.18)",
    cardGlass: "rgba(17,24,39,0.88)",
    textMain: "#e2e8f0",
    textMuted: "#94a3b8",
    prioHigh: "#f97316",
    prioMed: "#60a5fa",
    prioLow: "#22c55e",
    radiusLg: 18,
    radiusMd: 12,
    radiusSm: 10,
    shadow: "lift"
  },
  neon: {
    accent: "#22d3ee",
    pageBg: "#0b1224",
    gradientA: "rgba(34,211,238,0.35)",
    gradientB: "rgba(99,102,241,0.32)",
    gradientC: "rgba(16,185,129,0.3)",
    cardGlass: "rgba(15,23,42,0.9)",
    textMain: "#e2e8f0",
    textMuted: "#94a3b8",
    prioHigh: "#fb7185",
    prioMed: "#22d3ee",
    prioLow: "#a3e635",
    radiusLg: 20,
    radiusMd: 12,
    radiusSm: 8,
    shadow: "lift"
  },
  pastel: {
    accent: "#f472b6",
    pageBg: "#fdf2f8",
    gradientA: "rgba(244,114,182,0.2)",
    gradientB: "rgba(14,165,233,0.12)",
    gradientC: "rgba(236,72,153,0.16)",
    cardGlass: "rgba(255,255,255,0.96)",
    textMain: "#1f2937",
    textMuted: "#6b7280",
    prioHigh: "#fb7185",
    prioMed: "#f472b6",
    prioLow: "#22c55e",
    radiusLg: 22,
    radiusMd: 14,
    radiusSm: 10,
    shadow: "soft"
  },
  highContrast: {
    accent: "#111827",
    pageBg: "#f8fafc",
    gradientA: "rgba(15,23,42,0.1)",
    gradientB: "rgba(15,23,42,0.05)",
    gradientC: "rgba(15,23,42,0.08)",
    cardGlass: "#ffffff",
    textMain: "#0b0f1a",
    textMuted: "#1f2937",
    prioHigh: "#dc2626",
    prioMed: "#111827",
    prioLow: "#0f766e",
    radiusLg: 14,
    radiusMd: 10,
    radiusSm: 8,
    shadow: "flat"
  },
  darkMatte: {
    accent: "#0ea5e9",
    pageBg: "#0f172a",
    gradientA: "rgba(15,23,42,0.6)",
    gradientB: "rgba(30,41,59,0.4)",
    gradientC: "rgba(8,47,73,0.35)",
    cardGlass: "rgba(15,23,42,0.86)",
    textMain: "#e5e7eb",
    textMuted: "#94a3b8",
    prioHigh: "#fb923c",
    prioMed: "#0ea5e9",
    prioLow: "#22d3ee",
    radiusLg: 16,
    radiusMd: 10,
    radiusSm: 8,
    shadow: "lift"
  },
  oled: {
    accent: "#22c55e",
    pageBg: "#000000",
    gradientA: "rgba(255,255,255,0.06)",
    gradientB: "rgba(34,197,94,0.08)",
    gradientC: "rgba(59,130,246,0.08)",
    cardGlass: "rgba(16,16,16,0.92)",
    cardGlassMuted: "rgba(30,30,30,0.82)",
    borderGlass: "rgba(255,255,255,0.18)",
    borderStrong: "rgba(255,255,255,0.2)",
    textMain: "#f8fafc",
    textMuted: "#cbd5e1",
    textSoft: "#94a3b8",
    prioHigh: "#ef4444",
    prioMed: "#22c55e",
    prioLow: "#38bdf8",
    radiusLg: 18,
    radiusMd: 10,
    radiusSm: 8,
    shadow: "flat"
  },
  fantasy: {
    accent: "#d97706",
    pageBg: "#f8f1e7",
    gradientA: "rgba(217,119,6,0.18)",
    gradientB: "rgba(120,53,15,0.12)",
    gradientC: "rgba(244,114,182,0.12)",
    cardGlass: "rgba(255,252,244,0.96)",
    textMain: "#1f2937",
    textMuted: "#6b7280",
    prioHigh: "#b91c1c",
    prioMed: "#d97706",
    prioLow: "#0e7490",
    radiusLg: 26,
    radiusMd: 14,
    radiusSm: 12,
    shadow: "soft"
  },
  cyber: {
    accent: "#7c3aed",
    pageBg: "#0a0f1f",
    gradientA: "rgba(124,58,237,0.32)",
    gradientB: "rgba(34,211,238,0.22)",
    gradientC: "rgba(16,185,129,0.18)",
    cardGlass: "rgba(10,15,31,0.88)",
    textMain: "#e5e7eb",
    textMuted: "#94a3b8",
    prioHigh: "#f87171",
    prioMed: "#7c3aed",
    prioLow: "#22d3ee",
    radiusLg: 18,
    radiusMd: 12,
    radiusSm: 8,
    shadow: "lift"
  },
  calm: {
    accent: "#0ea5e9",
    pageBg: "#e0f2fe",
    gradientA: "rgba(14,165,233,0.22)",
    gradientB: "rgba(16,185,129,0.14)",
    gradientC: "rgba(99,102,241,0.14)",
    cardGlass: "rgba(255,255,255,0.9)",
    textMain: "#0b172a",
    textMuted: "#477c9a",
    prioHigh: "#fb7185",
    prioMed: "#0ea5e9",
    prioLow: "#22c55e",
    radiusLg: 20,
    radiusMd: 12,
    radiusSm: 8,
    shadow: "soft"
  },
  noir: {
    accent: "#a855f7",
    pageBg: "#0f172a",
    gradientA: "rgba(88,28,135,0.4)",
    gradientB: "rgba(30,41,59,0.4)",
    gradientC: "rgba(8,47,73,0.35)",
    cardGlass: "rgba(17,24,39,0.86)",
    textMain: "#e2e8f0",
    textMuted: "#94a3b8",
    prioHigh: "#fb923c",
    prioMed: "#a855f7",
    prioLow: "#22d3ee",
    radiusLg: 18,
    radiusMd: 10,
    radiusSm: 7,
    shadow: "lift"
  },
  sunrise: {
    accent: "#f97316",
    pageBg: "#fff7ed",
    gradientA: "rgba(251,146,60,0.25)",
    gradientB: "rgba(234,88,12,0.16)",
    gradientC: "rgba(249,115,22,0.18)",
    cardGlass: "rgba(255,255,255,0.94)",
    textMain: "#1f2937",
    textMuted: "#6b7280",
    prioHigh: "#dc2626",
    prioMed: "#f97316",
    prioLow: "#16a34a",
    radiusLg: 24,
    radiusMd: 14,
    radiusSm: 10,
    shadow: "lift"
  },
  forest: {
    accent: "#16a34a",
    pageBg: "#ecfdf3",
    gradientA: "rgba(34,197,94,0.25)",
    gradientB: "rgba(74,222,128,0.16)",
    gradientC: "rgba(8,47,73,0.12)",
    cardGlass: "rgba(255,255,255,0.9)",
    textMain: "#0b172a",
    textMuted: "#3f5f4f",
    prioHigh: "#f97316",
    prioMed: "#16a34a",
    prioLow: "#0ea5e9",
    radiusLg: 26,
    radiusMd: 14,
    radiusSm: 10,
    shadow: "soft"
  },
  aurora: {
    accent: "#22d3ee",
    pageBg: "#0b1224",
    gradientA: "rgba(34,211,238,0.3)",
    gradientB: "rgba(99,102,241,0.24)",
    gradientC: "rgba(16,185,129,0.2)",
    cardGlass: "rgba(15,23,42,0.88)",
    textMain: "#e2e8f0",
    textMuted: "#94a3b8",
    prioHigh: "#fb7185",
    prioMed: "#22d3ee",
    prioLow: "#a3e635",
    radiusLg: 20,
    radiusMd: 12,
    radiusSm: 8,
    shadow: "lift"
  },
  sandstone: {
    accent: "#f97316",
    pageBg: "#fff3e0",
    gradientA: "rgba(249,115,22,0.25)",
    gradientB: "rgba(234,179,8,0.16)",
    gradientC: "rgba(202,138,4,0.14)",
    cardGlass: "rgba(255,255,255,0.96)",
    textMain: "#1f2937",
    textMuted: "#6b7280",
    prioHigh: "#dc2626",
    prioMed: "#f97316",
    prioLow: "#0ea5e9",
    radiusLg: 24,
    radiusMd: 14,
    radiusSm: 10,
    shadow: "soft"
  }
};
let customTheme = { ...DEFAULT_THEME };
let themeLockEnabled = false;
let contextualThemeKey = "default";
const THEME_VIEW_OVERRIDE_KEY = "hyperplanner.theme.viewOverrides";
const VIEW_THEME_DEFAULTS = { calendar: "auto", tasks: "auto" };
const THEME_OVERRIDE_OPTIONS = ["auto", "custom", "work", "personal", "study", "health", "travel", "finance"];
let viewThemeOverrides = { ...VIEW_THEME_DEFAULTS };
const QUICK_THEME_MAP = {
  minimal: "minimal",
  soft: "soft",
  modern: "modern",
  neon: "neon",
  pastel: "pastel",
  highContrast: "highContrast",
  darkMatte: "darkMatte",
  oled: "oled",
  fantasy: "fantasy",
  cyber: "cyber"
};
const THEME_PACKS = {
  notebook: {
    label: "Notebook",
    theme: { ...THEME_PRESETS.fantasy, cardGlass: "rgba(255,252,244,0.96)" },
    defaults: { background: "texture", cardStyle: "soft", edges: "rounded" }
  },
  synthetic: {
    label: "Synthetic",
    theme: { ...THEME_PRESETS.neon },
    defaults: { background: "gradient", cardStyle: "glass", edges: "medium" }
  },
  productivity: {
    label: "Productivity",
    theme: { ...THEME_PRESETS.minimal },
    defaults: { background: "solid", cardStyle: "flat", edges: "minimal" }
  },
  artistic: {
    label: "Artistic",
    theme: { ...THEME_PRESETS.pastel },
    defaults: { background: "gradient", cardStyle: "soft", edges: "rounded" }
  },
  darkenergy: {
    label: "Dark Energy",
    theme: { ...THEME_PRESETS.aurora },
    defaults: { background: "gradient", cardStyle: "glass", edges: "medium" }
  },
  cozy: {
    label: "Cozy",
    theme: { ...THEME_PRESETS.sandstone },
    defaults: { background: "texture", cardStyle: "soft", edges: "rounded" }
  },
  retro: {
    label: "Retro UI",
    theme: { ...THEME_PRESETS.highContrast },
    defaults: { background: "solid", cardStyle: "flat", edges: "minimal" }
  },
  fantasy: {
    label: "Fantasy",
    theme: { ...THEME_PRESETS.fantasy },
    defaults: { background: "texture", cardStyle: "soft", edges: "pill" }
  }
};
const ICON_PACKS = {
  minimal: {
    label: "Minimal",
    default: "⬤",
    contexts: {
      work: "💼",
      personal: "🏠",
      study: "📚",
      health: "💧",
      travel: "✈️",
      finance: "💳"
    }
  },
  colorful: {
    label: "Colorful",
    default: "🟢",
    contexts: {
      work: "🟦",
      personal: "🟪",
      study: "🟨",
      health: "🟩",
      travel: "🟧",
      finance: "🟫"
    }
  },
  mono: {
    label: "Monochrome",
    default: "•",
    contexts: {
      work: "◼",
      personal: "◻",
      study: "◆",
      health: "●",
      travel: "▲",
      finance: "■"
    }
  }
};

const COMPONENT_VARIANT_KEY = "hyperplanner.component.variants";
const COMPONENT_TOGGLE_KEY = "hyperplanner.component.toggles";
const COMPONENT_VARIANT_DEFAULTS = {
  taskList: "detailed",
  taskBoard: "detailed",
  hero: "wide"
};
const COMPONENT_TOGGLE_DEFAULTS = {
  density: "default",
  radius: "round",
  shadow: "lifted"
};

let componentVariants = { ...COMPONENT_VARIANT_DEFAULTS };
let componentToggles = { ...COMPONENT_TOGGLE_DEFAULTS };
const CUSTOM_NLP_KEY = "hyperplanner.customNlpRules";
let customNlpRules = [];
const AUTOMATION_RULE_KEY = "hyperplanner.automationRules";
let automationRules = [];
const DEFAULT_TEMPLATES = [
  {
    id: "standup",
    label: "Daily standup",
    title: "Daily standup",
    description: "Capture yesterday, today, and blockers before the standup call.",
    priority: "medium",
    context: "Work",
    tags: "team,standup",
    reminder: 15,
    dueOffsetMinutes: 30
  },
  {
    id: "deepwork",
    label: "Deep work block",
    title: "Deep work",
    description: "Block 90 minutes for focused work with notifications muted.",
    priority: "high",
    context: "Work",
    tags: "focus,deep",
    reminder: 30,
    dueOffsetMinutes: 90
  },
  {
    id: "personal",
    label: "Personal errand",
    title: "Personal errand",
    description: "Handle errands and personal to-dos.",
    priority: "low",
    context: "Personal",
    tags: "errand,personal",
    reminder: 120,
    dueOffsetMinutes: 240
  }
];

const SMART_PRIORITY_FALLBACK = {
  high: ["urgent", "asap", "important", "critical", "client", "review", "deadline", "submit"],
  low: ["idea", "maybe", "someday", "later", "wishlist"]
};

const SMART_CONTEXT_FALLBACK = {
  Work: ["work", "client", "meeting", "project", "deadline", "review", "handoff"],
  Personal: ["family", "birthday", "friend", "anniversary", "date", "chores"],
  Health: ["gym", "doctor", "run", "yoga", "therapy", "checkup"],
  Study: ["study", "exam", "class", "lecture", "english", "essay", "thesis", "paper"],
  Errands: ["errand", "groceries", "bank", "post office"]
};

const SMART_TIME_PHRASES_FALLBACK = [
  { term: "tomorrow morning", metadata: "tomorrow_morning" },
  { term: "tomorrow afternoon", metadata: "tomorrow_afternoon" },
  { term: "tomorrow night", metadata: "tomorrow_evening" },
  { term: "this weekend", metadata: "this_weekend" },
  { term: "next week", metadata: "next_week" },
  { term: "next month", metadata: "next_month" },
  { term: "next quarter", metadata: "next_quarter" },
  { term: "weekday mornings", metadata: "weekday_mornings" },
  { term: "friday morning", metadata: "friday_morning" },
  { term: "before lunch", metadata: "before_lunch" },
  { term: "after lunch", metadata: "after_lunch" },
  { term: "after dinner", metadata: "after_dinner" },
  { term: "sunrise", metadata: "sunrise" },
  { term: "sunset", metadata: "sunset" },
  { term: "midnight", metadata: "midnight" },
  { term: "early", metadata: "early" },
  { term: "late", metadata: "late" }
];

const SMART_TAG_CONTEXTS_FALLBACK = [
  { term: "#work", metadata: "Work" },
  { term: "#school", metadata: "Study" },
  { term: "#fitness", metadata: "Fitness" },
  { term: "#personal", metadata: "Personal" },
  { term: "#health", metadata: "Health" },
  { term: "#finance", metadata: "Finance" },
  { term: "#travel", metadata: "Travel" },
  { term: "#focus", metadata: "Focus" },
  { term: "#deepwork", metadata: "Deep Work" },
  { term: "#errands", metadata: "Errands" },
  { term: "#meeting", metadata: "Work" },
  { term: "#call", metadata: "Work" }
];

const SMART_MACRO_CONTEXTS_FALLBACK = [
  { term: "@home", metadata: "Home" },
  { term: "@office", metadata: "Work" },
  { term: "@gym", metadata: "Fitness" },
  { term: "@campus", metadata: "Study" },
  { term: "@clinic", metadata: "Health" },
  { term: "@bank", metadata: "Finance" },
  { term: "@airport", metadata: "Travel" },
  { term: "@hotel", metadata: "Travel" },
  { term: "@focus", metadata: "Focus" },
  { term: "@meeting", metadata: "Work" }
];


const THEME_CONTEXT_MAP = {
  work: "work",
  client: "work",
  office: "work",
  project: "work",
  personal: "personal",
  family: "personal",
  home: "personal",
  errands: "personal",
  study: "study",
  school: "study",
  class: "study",
  exam: "study",
  health: "health",
  fitness: "health",
  gym: "health",
  wellness: "health",
  travel: "travel",
  trip: "travel",
  vacation: "travel",
  flight: "travel",
  finance: "finance",
  budget: "finance",
  money: "finance",
  invoice: "finance",
  taxes: "finance"
};

let smartTermSets = {
  context: { ...SMART_CONTEXT_FALLBACK },
  priority_high: new Set(SMART_PRIORITY_FALLBACK.high),
  priority_low: new Set(SMART_PRIORITY_FALLBACK.low),
  time_phrases: SMART_TIME_PHRASES_FALLBACK.map(item => ({
    term: item.term.toLowerCase(),
    metadata: item.metadata
  })),
  tag_contexts: new Map(SMART_TAG_CONTEXTS_FALLBACK.map(item => [item.term.toLowerCase(), item.metadata])),
  macro_contexts: new Map(SMART_MACRO_CONTEXTS_FALLBACK.map(item => [item.term.toLowerCase(), item.metadata]))
};

navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const view = tab.dataset.view || "calendar";
    setActiveView(view);
  });
});

densityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const density = Number(btn.dataset.density);
    if (!Number.isNaN(density)) {
      setCalendarDensity(density);
    }
  });
  btn.classList.toggle("active", Number(btn.dataset.density) === calendarDensity);
});

const allowedViews = ["calendar", "tasks", "automations", "insights"];
const hashView = window.location.hash.replace("#", "");
if (allowedViews.includes(hashView)) {
  currentView = hashView;
}

function loadIconPreferences() {
  try {
    const pack = localStorage.getItem(ICON_PACK_KEY) || "minimal";
    const overrides = JSON.parse(localStorage.getItem(ICON_OVERRIDE_KEY) || "{}");
    iconPackKey = pack;
    iconOverrides = overrides;
  } catch (_) {
    iconPackKey = "minimal";
    iconOverrides = {};
  }
}

function saveIconPreferences() {
  localStorage.setItem(ICON_PACK_KEY, iconPackKey);
  localStorage.setItem(ICON_OVERRIDE_KEY, JSON.stringify(iconOverrides || {}));
}

function getIconForContext(context) {
  const ctx = (context || "").toLowerCase().trim();
  if (!ctx) return ICON_PACKS[iconPackKey]?.default || "⬤";
  if (iconOverrides[ctx]) return iconOverrides[ctx];
  const pack = ICON_PACKS[iconPackKey];
  if (pack?.contexts?.[ctx]) return pack.contexts[ctx];
  return pack?.default || "⬤";
}

function syncIconControls() {
  if (iconPackSelectEl) iconPackSelectEl.value = iconPackKey;
  if (iconOverrideListEl) {
    const entries = Object.entries(iconOverrides || {});
    if (!entries.length) {
      iconOverrideListEl.innerHTML = `<p class="status-line">No custom icons yet.</p>`;
    } else {
      iconOverrideListEl.innerHTML = entries
        .map(
          ([ctx, icon]) =>
            `<div class="icon-override-row"><span>${icon} ${ctx}</span><button type="button" data-remove-icon="${ctx}" class="btn ghost small">Remove</button></div>`
        )
        .join("");
      iconOverrideListEl.querySelectorAll("[data-remove-icon]").forEach(btn => {
        btn.addEventListener("click", () => {
          const key = btn.dataset.removeIcon;
          if (key && iconOverrides[key]) {
            delete iconOverrides[key];
            saveIconPreferences();
            syncIconControls();
            rerenderTasks();
          }
        });
      });
    }
  }
}

function initIconControls() {
  syncIconControls();
  iconPackSelectEl?.addEventListener("change", () => {
    iconPackKey = iconPackSelectEl.value || "minimal";
    saveIconPreferences();
    syncIconControls();
    rerenderTasks();
    renderTaskBoard(currentTasks);
    updateHeroHighlights();
  });
  iconOverrideSaveBtn?.addEventListener("click", () => {
    const ctx = iconOverrideContextEl?.value?.trim().toLowerCase();
    const val = iconOverrideValueEl?.value?.trim();
    if (!ctx || !val) return;
    iconOverrides = { ...iconOverrides, [ctx]: val };
    saveIconPreferences();
    syncIconControls();
    rerenderTasks();
    renderTaskBoard(currentTasks);
    updateHeroHighlights();
  });
}

function loadComponentVariants() {
  try {
    const savedVariants = JSON.parse(localStorage.getItem(COMPONENT_VARIANT_KEY) || "{}");
    const savedToggles = JSON.parse(localStorage.getItem(COMPONENT_TOGGLE_KEY) || "{}");
    componentVariants = { ...COMPONENT_VARIANT_DEFAULTS, ...savedVariants };
    componentToggles = { ...COMPONENT_TOGGLE_DEFAULTS, ...savedToggles };
  } catch {
    componentVariants = { ...COMPONENT_VARIANT_DEFAULTS };
    componentToggles = { ...COMPONENT_TOGGLE_DEFAULTS };
  }
  applyComponentVariantAttributes();
}

function saveComponentVariants() {
  localStorage.setItem(COMPONENT_VARIANT_KEY, JSON.stringify(componentVariants));
  localStorage.setItem(COMPONENT_TOGGLE_KEY, JSON.stringify(componentToggles));
}

function applyComponentVariantAttributes() {
  const root = document.documentElement;
  if (!root) return;
  root.setAttribute("data-variant-tasklist", componentVariants.taskList);
  root.setAttribute("data-variant-taskboard", componentVariants.taskBoard);
  root.setAttribute("data-variant-herocard", componentVariants.hero);
  root.setAttribute("data-toggle-density", componentToggles.density);
  root.setAttribute("data-toggle-radius", componentToggles.radius);
  root.setAttribute("data-toggle-shadow", componentToggles.shadow);
}

function syncChipButtons(container, datasetKey, value) {
  if (!container) return;
  container.querySelectorAll(".chip-btn").forEach(btn => {
    const val = btn.dataset[datasetKey];
    btn.classList.toggle("active", val === value);
  });
}

function syncComponentVariantControls() {
  if (taskVariantSelectEl) taskVariantSelectEl.value = componentVariants.taskList;
  if (boardVariantSelectEl) boardVariantSelectEl.value = componentVariants.taskBoard;
  if (heroVariantSelectEl) heroVariantSelectEl.value = componentVariants.hero;
  syncChipButtons(variantDensityToggleEl, "variantDensity", componentToggles.density);
  syncChipButtons(variantRadiusToggleEl, "variantRadius", componentToggles.radius);
  syncChipButtons(variantShadowToggleEl, "variantShadow", componentToggles.shadow);
}

function initComponentVariantControls() {
  syncComponentVariantControls();
  taskVariantSelectEl?.addEventListener("change", () => {
    componentVariants.taskList = taskVariantSelectEl.value || COMPONENT_VARIANT_DEFAULTS.taskList;
    saveComponentVariants();
    applyComponentVariantAttributes();
    rerenderTasks();
    renderTaskBoard(currentTasks);
  });
  boardVariantSelectEl?.addEventListener("change", () => {
    componentVariants.taskBoard = boardVariantSelectEl.value || COMPONENT_VARIANT_DEFAULTS.taskBoard;
    saveComponentVariants();
    applyComponentVariantAttributes();
    renderTaskBoard(currentTasks);
  });
  heroVariantSelectEl?.addEventListener("change", () => {
    componentVariants.hero = heroVariantSelectEl.value || COMPONENT_VARIANT_DEFAULTS.hero;
    saveComponentVariants();
    applyComponentVariantAttributes();
  });
  variantDensityToggleEl?.addEventListener("click", e => {
    const btn = e.target.closest("[data-variant-density]");
    if (!btn) return;
    componentToggles.density = btn.dataset.variantDensity || COMPONENT_TOGGLE_DEFAULTS.density;
    saveComponentVariants();
    applyComponentVariantAttributes();
    syncComponentVariantControls();
  });
  variantRadiusToggleEl?.addEventListener("click", e => {
    const btn = e.target.closest("[data-variant-radius]");
    if (!btn) return;
    componentToggles.radius = btn.dataset.variantRadius || COMPONENT_TOGGLE_DEFAULTS.radius;
    saveComponentVariants();
    applyComponentVariantAttributes();
    syncComponentVariantControls();
  });
  variantShadowToggleEl?.addEventListener("click", e => {
    const btn = e.target.closest("[data-variant-shadow]");
    if (!btn) return;
    componentToggles.shadow = btn.dataset.variantShadow || COMPONENT_TOGGLE_DEFAULTS.shadow;
    saveComponentVariants();
    applyComponentVariantAttributes();
    syncComponentVariantControls();
  });
}

function loadCustomNlpRules() {
  try {
    const stored = JSON.parse(localStorage.getItem(CUSTOM_NLP_KEY) || "[]");
    if (Array.isArray(stored)) {
      customNlpRules = stored;
    }
  } catch {
    customNlpRules = [];
  }
}

function saveCustomNlpRules() {
  localStorage.setItem(CUSTOM_NLP_KEY, JSON.stringify(customNlpRules || []));
}

function renderNlpRules() {
  if (!nlpRuleListEl) return;
  if (!customNlpRules.length) {
    nlpRuleListEl.innerHTML = `<p class="status-line">No custom rules yet.</p>`;
    return;
  }
  nlpRuleListEl.innerHTML = customNlpRules
    .map(
      rule => `<div class="nlp-rule-row">
        <div class="nlp-rule-meta">
          <strong>${escapeHtml(rule.trigger)}</strong>
          <small>${escapeHtml(rule.action === "context" ? `Context → ${rule.value}` : rule.action === "priority" ? `Priority → ${rule.value}` : `Due → +${rule.offset || 0}m`)}</small>
        </div>
        <button class="btn ghost small" data-remove-rule="${rule.id}">Remove</button>
      </div>`
    )
    .join("");
  nlpRuleListEl.querySelectorAll("[data-remove-rule]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.removeRule;
      customNlpRules = customNlpRules.filter(r => String(r.id) !== String(id));
      saveCustomNlpRules();
      renderNlpRules();
    });
  });
}

function syncNlpValueFields() {
  const action = nlpActionSelectEl?.value || "context";
  if (action === "due") {
    nlpValueLabelEl?.classList.add("hidden");
    nlpOffsetLabelEl?.classList.remove("hidden");
    return;
  }
  nlpValueLabelEl?.classList.remove("hidden");
  nlpOffsetLabelEl?.classList.add("hidden");
}

function initNlpControls() {
  syncNlpValueFields();
  renderNlpRules();
  nlpActionSelectEl?.addEventListener("change", syncNlpValueFields);
  nlpAddRuleBtn?.addEventListener("click", () => {
    const trigger = nlpTriggerInputEl?.value?.trim().toLowerCase();
    const action = nlpActionSelectEl?.value || "context";
    const value = nlpValueInputEl?.value?.trim();
    const offset = Number(nlpOffsetInputEl?.value || 0);
    if (!trigger) return;
    if ((action === "context" || action === "priority") && !value) return;
    if (action === "priority" && !["high", "medium", "low"].includes(value?.toLowerCase())) return;
    if (action === "due" && Number.isNaN(offset)) return;
    const rule = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      trigger,
      action,
      value: action === "context" || action === "priority" ? value.toLowerCase() : undefined,
      offset: action === "due" ? offset : undefined
    };
    customNlpRules = [...customNlpRules.filter(r => r.trigger !== trigger || r.action !== action), rule];
    saveCustomNlpRules();
    renderNlpRules();
    if (nlpTriggerInputEl) nlpTriggerInputEl.value = "";
    if (nlpValueInputEl) nlpValueInputEl.value = "";
    if (nlpOffsetInputEl) nlpOffsetInputEl.value = "";
  });
}

function loadAutomationRules() {
  try {
    const stored = JSON.parse(localStorage.getItem(AUTOMATION_RULE_KEY) || "[]");
    if (Array.isArray(stored)) automationRules = stored;
  } catch {
    automationRules = [];
  }
}

function saveAutomationRules() {
  localStorage.setItem(AUTOMATION_RULE_KEY, JSON.stringify(automationRules || []));
}

function renderAutomationRules() {
  if (!autoRuleListEl) return;
  if (!automationRules.length) {
    autoRuleListEl.innerHTML = `<p class="status-line">No automation rules yet.</p>`;
    return;
  }
  autoRuleListEl.innerHTML = automationRules
    .map(
      rule => `<div class="automation-rule-row">
        <div class="automation-rule-meta">
          <strong>${escapeHtml(rule.trigger)}</strong>
          <small>${escapeHtml(rule.action === "context" ? `Context → ${rule.value}` : rule.action === "priority" ? `Priority → ${rule.value}` : `Due → +${rule.offset || 0}m`)}</small>
        </div>
        <button class="btn ghost small" data-remove-auto="${rule.id}">Remove</button>
      </div>`
    )
    .join("");
  autoRuleListEl.querySelectorAll("[data-remove-auto]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.removeAuto;
      automationRules = automationRules.filter(r => String(r.id) !== String(id));
      saveAutomationRules();
      renderAutomationRules();
    });
  });
}

function syncAutomationValueFields() {
  const action = autoActionSelectEl?.value || "context";
  if (action === "due") {
    autoValueLabelEl?.classList.add("hidden");
    autoOffsetLabelEl?.classList.remove("hidden");
    return;
  }
  autoValueLabelEl?.classList.remove("hidden");
  autoOffsetLabelEl?.classList.add("hidden");
}

function initAutomationControls() {
  syncAutomationValueFields();
  renderAutomationRules();
  autoActionSelectEl?.addEventListener("change", syncAutomationValueFields);
  autoAddRuleBtn?.addEventListener("click", () => {
    const trigger = autoTriggerInputEl?.value?.trim().toLowerCase();
    const action = autoActionSelectEl?.value || "context";
    const value = autoValueInputEl?.value?.trim();
    const offset = Number(autoOffsetInputEl?.value || 0);
    if (!trigger) return;
    if ((action === "context" || action === "priority") && !value) return;
    if (action === "priority" && !["high", "medium", "low"].includes(value?.toLowerCase())) return;
    if (action === "due" && Number.isNaN(offset)) return;
    const rule = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      trigger,
      action,
      value: action === "context" || action === "priority" ? value.toLowerCase() : undefined,
      offset: action === "due" ? offset : undefined
    };
    automationRules = [...automationRules.filter(r => r.trigger !== trigger || r.action !== action), rule];
    saveAutomationRules();
    renderAutomationRules();
    if (autoTriggerInputEl) autoTriggerInputEl.value = "";
    if (autoValueInputEl) autoValueInputEl.value = "";
    if (autoOffsetInputEl) autoOffsetInputEl.value = "";
  });
}

function addDemoOverlay(el, message) {
  if (!el) return;
  el.classList.add("demo-locked");
  if (el.querySelector(".demo-overlay")) return;
  const overlay = document.createElement("div");
  overlay.className = "demo-overlay";
  overlay.innerHTML = `<span class="lock-mini">🔒</span> ${message}`;
   overlay.addEventListener("click", e => {
     e.preventDefault();
     e.stopPropagation();
     showToast(message, "info");
   });
  el.appendChild(overlay);
}

function applyDemoLocks() {
  if (!isDemoMode) return;
  document.body.dataset.demo = "true";

  addDemoOverlay(document.querySelector('[data-panel-id="panel-theme"]'), "Theme Lab unlocks after sign up.");
  addDemoOverlay(document.querySelector(".automation-grid"), "Automations unlock after sign up.");
  addDemoOverlay(document.getElementById("templateManagerList"), "Save templates after sign up.");
  addDemoOverlay(document.querySelector(".insights-card"), "Insights unlock after sign up.");
  const emailCard = document.querySelector(".email-card") || emailForm;
  addDemoOverlay(emailCard, "Email alerts are disabled in demo.");
  emailForm?.querySelectorAll("input,button,select").forEach(node => {
    node.disabled = true;
    node.addEventListener("click", e => {
      e.preventDefault();
      showToast("Email alerts are disabled in demo.", "info");
    });
  });
  autoAddRuleBtn?.addEventListener("click", e => {
    e.preventDefault();
    showToast("Automations are locked in demo. Sign up to unlock.", "info");
  });
}

setActiveView(currentView);
renderQuickTitleHighlights(quickTitleEl?.value || "", []);
renderSmartTokenRow([]);
renderInlineSubtasks([]);
renderConflictHint(quickDueDateEl?.value || "");

if (quickGenerateDescBtn) {
  quickGenerateDescBtn.addEventListener("click", () => {
    const desc = buildSmartDescription({
      title: quickTitleEl.value,
      context: quickContextEl.value,
      due: quickDueDateEl.value,
      priority: quickPriorityEl.value
    });
    quickDescriptionEl.value = desc;
    updateAssistStatus("Description generated.");
  });
}

function bindAutoLocationButton(button, inputEl, statusEl) {
  if (!button || !inputEl) return;
  const defaultLabel = button.textContent;
  button.addEventListener("click", async () => {
    if (button.dataset.loading === "1") return;
    button.dataset.loading = "1";
    button.disabled = true;
    button.textContent = "Locating…";
    try {
      const result = await fillCurrentLocation(inputEl, statusEl);
      if (!result) {
        alert("Unable to auto-detect location. Please type the address.");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to auto-detect location. Please type the address.");
    } finally {
      button.disabled = false;
      button.textContent = defaultLabel;
      delete button.dataset.loading;
    }
  });
}

if (modalGenerateDescBtn) {
  modalGenerateDescBtn.addEventListener("click", () => {
    const desc = buildSmartDescription({
      title: taskTitleEl.value,
      context: taskContextEl.value,
      due: taskDueDateEl.value,
      priority: taskPriorityEl.value
    });
    taskDescriptionEl.value = desc;
  });
}

if (applyTemplateBtn) {
  applyTemplateBtn.addEventListener("click", () => {
    const id = templateSelectEl.value;
    if (!id) return;
    applyTemplateToQuickForm(id);
  });
}

if (openTemplateSettingsBtn) {
  openTemplateSettingsBtn.addEventListener("click", () => {
    setMobileTab("panel-settings");
    const panel = document.querySelector('[data-panel-id="panel-settings"]');
    if (panel) {
      if (panel.tagName === "DETAILS") {
        panel.open = true;
      }
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (settingsSaveTemplateBtn) {
  settingsSaveTemplateBtn.addEventListener("click", () => {
    const label = templateNameInputEl?.value || "";
    const template = saveCurrentTemplate(label);
    if (template && templateNameInputEl) templateNameInputEl.value = "";
  });
}

templateImportBtn?.addEventListener("click", handleTemplateImport);
templateExportBtn?.addEventListener("click", handleTemplateExport);
templateDownloadBtn?.addEventListener("click", handleTemplateExport);
templateImportFileEl?.addEventListener("change", handleTemplateFileImport);
refreshTemplateGalleryBtn?.addEventListener("click", renderTemplateGallery);
document.getElementById("openDrawerFromCard")?.addEventListener("click", openWidgetDrawer);
openDrawerTab?.addEventListener("click", openWidgetDrawer);
openGlassSidebarBtn?.addEventListener("click", () => {
  glassSidebarEl?.classList.add("open");
});
closeGlassSidebarBtn?.addEventListener("click", () => {
  glassSidebarEl?.classList.remove("open");
});
sidebarLayoutButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    applyLayoutPreset(btn.dataset.widgetLayout);
    glassSidebarEl?.classList.remove("open");
  })
);
sidebarOpenDrawerBtn?.addEventListener("click", () => {
  glassSidebarEl?.classList.remove("open");
  openWidgetDrawer();
});
sidebarOpenSettingsBtn?.addEventListener("click", () => {
  glassSidebarEl?.classList.remove("open");
  const panel = document.querySelector('[data-panel-id="panel-settings"]');
  if (panel && panel.tagName === "DETAILS") panel.open = true;
  panel?.scrollIntoView({ behavior: "smooth", block: "start" });
});
sidebarOpenThemeBtn?.addEventListener("click", () => {
  glassSidebarEl?.classList.remove("open");
  const panel = document.querySelector('[data-panel-id="panel-theme"]');
  if (panel && panel.tagName === "DETAILS") panel.open = true;
  panel?.scrollIntoView({ behavior: "smooth", block: "start" });
});
sidebarOpenTemplatesBtn?.addEventListener("click", () => {
  glassSidebarEl?.classList.remove("open");
  document.getElementById("templateManagerList")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (templateSelectEl) {
  templateSelectEl.addEventListener("change", () => {
    if (templateSelectEl.value) updateAssistStatus("Template ready to apply.");
  });
}

if (quickDueDateEl) {
  quickDueDateEl.addEventListener("change", () => {
    adjustReminderInput(quickDueDateEl.value, quickReminderEl);
    renderConflictHint(quickDueDateEl.value);
  });
}

if (taskDueDateEl) {
  taskDueDateEl.addEventListener("change", () => {
    adjustReminderInput(taskDueDateEl.value, taskReminderMinutesEl);
  });
}

if (quickTitleEl) {
  quickTitleEl.addEventListener("input", () => {
    renderQuickTitleHighlights(quickTitleEl.value, []);
    renderSmartTokenRow([]);
    renderInlineSubtasks([]);
    if (smartCaptureTimer) clearTimeout(smartCaptureTimer);
    smartCaptureTimer = setTimeout(() => applySmartCapture(), 200);
  });
  quickTitleEl.addEventListener("blur", () => applySmartCapture(true));
}

if (clearSmartHintBtn) {
  clearSmartHintBtn.addEventListener("click", () => {
    if (quickDueDateEl) quickDueDateEl.value = "";
    if (quickContextEl) quickContextEl.value = "";
    if (quickPriorityEl) quickPriorityEl.value = "medium";
    smartCapturedRecurring = null;
    updateSmartHint("Smart suggestions cleared.");
    renderQuickTitleHighlights(quickTitleEl.value, []);
    renderSmartTokenRow([]);
    renderInlineSubtasks([]);
    renderConflictHint("");
  });
}

if (focusSuggestionBtn) {
  focusSuggestionBtn.addEventListener("click", () => {
    if (focusSuggestionDate && quickDueDateEl) {
      quickDueDateEl.value = formatForDateTimeInput(focusSuggestionDate);
      adjustReminderInput(quickDueDateEl.value, quickReminderEl);
      renderConflictHint(quickDueDateEl.value);
      updateSmartHint("Scheduled using suggested slot.");
    }
  });
}


if (smartTokenRowEl) {
  smartTokenRowEl.addEventListener("click", e => {
    const chip = e.target.closest(".token-chip");
    if (!chip) return;
    const type = chip.dataset.type;
    const value = chip.dataset.value;
    let applied = false;
    if (type === "context" && quickContextEl) {
      quickContextEl.value = value;
      applied = true;
    } else if (type === "priority" && quickPriorityEl) {
      quickPriorityEl.value = value === "Low priority" ? "low" : value === "High priority" ? "high" : value;
      applied = true;
    }
    if (applied) {
      updateAssistStatus(`Applied ${type} cue: ${value}`);
    }
  });
}

if (snoozeButtons.length) {
  snoozeButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = taskIdEl.value ? Number(taskIdEl.value) : null;
      if (!id) return;
      const target = computeSnoozeDate(btn.dataset.snooze);
      if (!target) {
        setSnoozeStatus("No free slot available.", true);
        return;
      }
      try {
        await updateTaskDueDate(id, target);
        taskDueDateEl.value = formatForDateTimeInput(target);
        setSnoozeStatus(`Snoozed to ${formatDateTimeForDisplay(target.toISOString())}`);
        await loadTasksWithFilters();
      } catch (err) {
        setSnoozeStatus("Failed to snooze.", true);
      }
    });
  });
}

// Small API helper

function apiUrl(path) {
  return `${API_BASE}${path}`;
}

async function apiGet(path) {
  const res = await fetch(apiUrl(path));
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function apiPut(path, body) {
  const res = await fetch(apiUrl(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function apiPatch(path, body) {
  const res = await fetch(apiUrl(path), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PATCH ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(apiUrl(path), { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DELETE ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

// ==========================
// DATE HELPERS
// ==========================

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun..6 Sat
  const diff = (day + 6) % 7; // convert to Monday-based
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - diff);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateShort(date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
}

function weekLabel(start) {
  const end = addDays(start, 6);
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric"
    })} – ${end.toLocaleDateString(undefined, {
      day: "numeric",
      year: "numeric"
    })}`;
  }

  return `${start.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  })} – ${end.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  })}`;
}

function weekNumber(date) {
  // ISO week number
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((temp - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

// ==========================
// TASK RENDERING (LIST)
// ==========================

function formatDateTimeForDisplay(iso) {
  if (!iso) return "No due date";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function buildTaskTag(task) {
  const priorityClass =
    task.priority === "high"
      ? "tag-priority-high"
      : task.priority === "low"
      ? "tag-priority-low"
      : "tag-priority-medium";

  const statusClass = `tag-status-${task.status}`;

  const recurringTag =
    task.recurring_rule && task.recurring_rule !== "none"
      ? `<span class="tag tag-recurring">${task.recurring_rule}</span>`
      : "";

  return `
    <span class="tag ${priorityClass}">${task.priority}</span>
    <span class="tag ${statusClass}">${task.status.replace("_", " ")}</span>
    ${recurringTag}
  `;
}

function parseTagList(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map(t => String(t || "").trim())
      .filter(Boolean)
      .map(t => t.split(/\s+/)[0])
      .slice(0, 5);
  }
  return String(raw)
    .split(/[,;]/)
    .map(t => t.trim())
    .filter(Boolean)
    .map(t => t.split(/\s+/)[0])
    .slice(0, 5);
}

function joinTags(tags = []) {
  return parseTagList(tags).join(", ");
}

function enrichTaskTags(task) {
  const tags = parseTagList(task.tags || task.tag || task.context || "");
  return {
    ...task,
    tags,
    tag: tags[0] || ""
  };
}

function addMinutes(date, minutes) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

function toLocalDateTimeInput(date) {
  const d = new Date(date);
  const pad = value => String(value).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

function renderUserTags(tags = []) {
  if (!tags.length) return "";
  return tags
    .map(tag => `<span class="tag tag-context">${escapeHtml(tag)}</span>`)
    .join("");
}

function renderTasks(tasks) {
  const normalized = tasks.map(enrichTaskTags);
  currentTasks = normalized.slice();
  taskCountEl.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
  const taskCardVariant = componentVariants.taskList || "detailed";
  const descLimit =
    taskCardVariant === "minimal" ? 0 : taskCardVariant === "compact" ? 80 : 120;

  if (!normalized.length) {
    taskListEl.innerHTML = `<p class="status-line">No tasks match these filters.</p>`;
  } else {
    const html = normalized
      .map(task => {
        const due = formatDateTimeForDisplay(task.due_date);
        const desc =
          task.description && task.description.trim().length
            ? task.description.trim()
            : "";
        const locationLine = task.location
          ? `<p class="task-meta"><span>📍 ${escapeHtml(task.location)}</span></p>`
          : "";

        return `
          <article class="task-item variant-${taskCardVariant}" data-id="${task.id}">
            <div class="task-main">
              <div class="task-title-row">
                <span class="task-icon">${escapeHtml(getIconForContext(task.context))}</span>
                <span class="task-title">${escapeHtml(task.title)}</span>
              </div>
              <div class="task-meta">
                <span>${due}</span>
                ${
                  task.recurring_rule && task.recurring_rule !== "none"
                    ? `<span>· ${task.recurring_rule}</span>`
                    : ""
                }
              </div>
              ${
                desc && descLimit > 0
                  ? `<p class="task-desc">${escapeHtml(
                      desc.length > descLimit ? desc.slice(0, descLimit - 3) + "…" : desc
                    )}</p>`
                  : ""
              }
              ${locationLine}
            </div>
            <div class="task-tags">
              ${buildTaskTag(task)}
              ${
                task.context
                  ? `<span class="tag tag-context">${escapeHtml(task.context)}</span>`
                  : ""
              }
              ${renderUserTags(task.tags)}
            </div>
          </article>
        `;
      })
      .join("");

    taskListEl.innerHTML = html;

    document.querySelectorAll(".task-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = Number(el.dataset.id);
        const task = currentTasks.find(t => t.id === id);
        if (task) openTaskModal(task);
      });
    });
  }

  renderCalendar(currentTasks);
  updateHeroHighlights();
  renderTaskBoard(tasks);
  updateFocusSuggestion();
  renderConflictHint(quickDueDateEl?.value);
  updateContextualTheme(tasks);
}

function rerenderTasks() {
  renderTasks(currentTasks);
}

// ==========================
// CALENDAR RENDERING
// ==========================

const CALENDAR_START_HOUR = 0;
const CALENDAR_END_HOUR = 24;
const CALENDAR_DENSITIES = [60, 30, 15];
const LOCATION_SUGGESTION_LIMIT = 5;
const LOCATION_DEBOUNCE_MS = 110;

function renderCalendar(tasks) {
  if (!calendarGridEl) return;
  const weekStart = currentWeekStart;
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }

  calendarRangeEl.textContent = weekLabel(weekStart);
  calendarWeekTagEl.textContent = `Week ${weekNumber(weekStart)}`;
  const taskInstances = expandRecurringTasks(tasks.map(enrichTaskTags), weekStart);
  const map = Array.from({ length: 7 }, () => ({}));
  taskInstances.forEach(t => {
    if (!t.due_date && !t.start_time) return;
    const base = t.start_time ? new Date(t.start_time) : new Date(t.due_date);
    if (Number.isNaN(base.getTime())) return;

    const dayDiff = Math.floor(
      (startOfDay(base) - startOfDay(weekStart)) / 86400000
    );
    if (dayDiff < 0 || dayDiff >= 7) return;

    const slotKey = getSlotKey(base, calendarDensity);
    if (!map[dayDiff][slotKey]) map[dayDiff][slotKey] = [];
    map[dayDiff][slotKey].push({
      task: t,
      span: computeTaskSpan(t, calendarDensity)
    });
  });

  const timeSlots = buildTimeSlots(CALENDAR_START_HOUR, CALENDAR_END_HOUR, calendarDensity);

  const slotHeightMap = { 60: 52, 30: 38, 15: 28 };
  const slotHeight = slotHeightMap[calendarDensity] || 36;
  if (calendarGridEl) {
    calendarGridEl.style.setProperty("--slot-height", `${slotHeight}px`);
  }
  calendarGridEl.innerHTML = buildCalendarGridHtml(days, map, timeSlots);
  calendarGridEl.dataset.density = String(calendarDensity);
  calendarGridEl.classList.add("is-transitioning");
  if (calendarAnimationTimer) clearTimeout(calendarAnimationTimer);
  calendarAnimationTimer = setTimeout(() => {
    calendarGridEl.classList.remove("is-transitioning");
  }, 520);
  bindPageInteractions(calendarGridEl);
  applyCalendarFlipAnimation();
}

function buildCalendarGridHtml(days, map, slots) {
  const today = startOfDay(new Date());
  const todayFlags = days.map(day => startOfDay(day).getTime() === today.getTime());
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  let html = `<div class="calendar-time-cell"></div>`;
  days.forEach((day, idx) => {
    const isToday = todayFlags[idx];
    html += `<div class="calendar-header-cell${isToday ? " today" : ""}" data-day="${idx}">
      <span>${day.toLocaleDateString(undefined, { weekday: "short" })}</span>
      <span>${formatDateShort(day)}</span>
    </div>`;
  });

  slots.forEach(slot => {
    html += `<div class="calendar-time-cell">${formatSlotLabel(slot)}</div>`;
    days.forEach((_, idx) => {
      const slotEntries = map[idx][slot.key] || [];
      const conflict = slotEntries.length > 1;
      let blockHtml = "";
      if (slotEntries.length) {
        slotEntries.forEach(entry => {
          const main = entry.task;
          const cls =
            main.priority === "high"
              ? "cal-task-high"
              : main.priority === "low"
              ? "cal-task-low"
              : "cal-task-medium";
          const tag =
            main.tag && main.tag.length
              ? `<span class="cal-task-tag">${escapeHtml(main.tag)}</span>`
              : `<span class="cal-task-tag">${escapeHtml(main.title)}</span>`;
          blockHtml += `<div class="cal-task-block ${cls}${conflict ? " cal-task-conflict" : ""}" data-id="${main.id}" style="--slot-span:${entry.span};">
            ${tag}
          </div>`;
        });
      }
      const slotClasses = ["calendar-slot"];
      const isToday = todayFlags[idx];
      if (isToday) slotClasses.push("is-today");
      const matchesCurrentHour =
        isToday &&
        slot.hour === currentHour &&
        (calendarDensity >= 60 || Math.abs(slot.minute - currentMinute) < calendarDensity);
      if (matchesCurrentHour) slotClasses.push("is-current-hour");
      html += `<div class="${slotClasses.join(" ")}" data-day="${idx}" data-hour="${slot.hour}" data-minute="${slot.minute}">
        ${blockHtml}
      </div>`;
    });
  });
  return html;
}

function bindPageInteractions(container) {
  if (!container) return;
  container.querySelectorAll(".calendar-slot").forEach(slot => attachSlotEvents(slot));
  container.querySelectorAll(".calendar-header-cell[data-day]").forEach(header => {
    header.addEventListener("click", () => {
      const idx = Number(header.dataset.day);
      const targetDate = addDays(currentWeekStart, idx);
      currentWeekStart = startOfWeek(targetDate);
      renderCalendar(currentTasks);
    });
  });
  container.querySelectorAll(".cal-task-block").forEach(block => {
    block.setAttribute("draggable", "true");
    block.addEventListener("dragstart", e => {
      draggedTaskId = Number(block.dataset.id);
      block.classList.add("is-dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(draggedTaskId));
    });
    block.addEventListener("dragend", () => {
      draggedTaskId = null;
      block.classList.remove("is-dragging");
      clearCalendarDropTargets();
    });
  });
}

function attachSlotEvents(slot) {
  slot.addEventListener("click", e => {
    const taskBlock = e.target.closest(".cal-task-block");
    if (taskBlock) {
      const id = Number(taskBlock.dataset.id);
      const task = currentTasks.find(t => t.id === id);
      if (task) {
        openTaskModal(task);
        return;
      }
    }
    const dayIndex = Number(slot.dataset.day);
    const hour = Number(slot.dataset.hour);
    const minute = Number(slot.dataset.minute || 0);
    const base = addDays(currentWeekStart, dayIndex);
    base.setHours(hour, minute, 0, 0);
    openTaskModal(null, base);
  });

  slot.addEventListener("dragover", e => {
    if (!draggedTaskId) return;
    e.preventDefault();
    slot.classList.add("is-drop-target");
  });

  slot.addEventListener("dragleave", () => {
    slot.classList.remove("is-drop-target");
  });

  slot.addEventListener("drop", e => {
    if (!draggedTaskId) return;
    e.preventDefault();
    slot.classList.remove("is-drop-target");
    const dayIndex = Number(slot.dataset.day);
    const hour = Number(slot.dataset.hour);
    const minute = Number(slot.dataset.minute || 0);
    const base = addDays(currentWeekStart, dayIndex);
    base.setHours(hour, minute, 0, 0);
    scheduleDraggedTask(base);
  });
}

function triggerPageFlip(direction = "right") {
  pendingFlipDirection = direction;
}

function applyCalendarFlipAnimation() {
  if (!calendarGridEl || !pendingFlipDirection) return;
  const className = pendingFlipDirection === "left" ? "flip-left" : "flip-right";
  calendarGridEl.classList.remove("flip-left", "flip-right");
  void calendarGridEl.offsetWidth;
  calendarGridEl.classList.add(className);
  setTimeout(() => {
    calendarGridEl.classList.remove(className);
  }, 700);
  pendingFlipDirection = null;
}

function renderTaskBoard(tasks) {
  if (!taskBoardEl) return;
  const boardVariant = componentVariants.taskBoard || "detailed";
  const columns = [
    { status: "pending", label: "Inbox" },
    { status: "in_progress", label: "In Progress" },
    { status: "done", label: "Done" },
    { status: "archived", label: "Archived" }
  ];

  const html = columns
    .map(col => {
      const list = tasks.filter(t => t.status === col.status);
      const items = list
        .map(
          task => `<article class="task-board-item variant-${boardVariant}" draggable="true" data-id="${task.id}">
            <h4><span class="task-icon">${escapeHtml(getIconForContext(task.context))}</span> ${escapeHtml(task.title)}</h4>
            <p>${capitalize(task.priority)} priority</p>
            <span class="task-meta">${
              task.due_date ? formatDateTimeForDisplay(task.due_date) : "No due date"
            }</span>
            ${
              task.context
                ? `<span class="task-meta">Context · ${escapeHtml(task.context)}</span>`
                : ""
            }
          </article>`
        )
        .join("");

      const fallback =
        `<p class="status-line">Drop tasks here</p>`;

      return `<div class="task-board-column" data-status="${col.status}">
        <header>
          <span>${col.label}</span>
          <span class="pill small">${list.length}</span>
        </header>
        <div class="task-board-list" data-status="${col.status}">
          ${items || fallback}
        </div>
      </div>`;
    })
    .join("");

  taskBoardEl.innerHTML = html;
  updateTaskBoardSummary(tasks);
  setupTaskBoardDnD();
}

function updateTaskBoardSummary(tasks) {
  if (!taskBoardSummaryEl) return;
  if (!tasks.length) {
    taskBoardSummaryEl.textContent = "Add tasks";
    return;
  }
  const inFlight = tasks.filter(
    t => t.status !== "done" && t.status !== "archived"
  );
  const high = inFlight.filter(t => t.priority === "high").length;
  taskBoardSummaryEl.textContent = `${high} high priority in focus`;
}

function setupTaskBoardDnD() {
  if (!taskBoardEl) return;

  taskBoardEl.querySelectorAll(".task-board-item").forEach(card => {
    card.addEventListener("click", () => {
      const id = Number(card.dataset.id);
      const task = currentTasks.find(t => t.id === id);
      if (task) openTaskModal(task);
    });

    card.addEventListener("dragstart", e => {
      draggedTaskId = Number(card.dataset.id);
      card.classList.add("is-dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(draggedTaskId));
    });

    card.addEventListener("dragend", () => {
      draggedTaskId = null;
      card.classList.remove("is-dragging");
      clearCalendarDropTargets();
    });
  });

  taskBoardEl.querySelectorAll(".task-board-list").forEach(list => {
    list.addEventListener("dragover", e => {
      if (!draggedTaskId) return;
      e.preventDefault();
      list.classList.add("is-drop-target");
    });

    list.addEventListener("dragleave", () => list.classList.remove("is-drop-target"));

    list.addEventListener("drop", e => {
      if (!draggedTaskId) return;
      e.preventDefault();
      list.classList.remove("is-drop-target");
      const newStatus = list.dataset.status;
      moveTaskToStatus(draggedTaskId, newStatus);
    });
  });
}

function expandRecurringTasks(tasks, weekStart) {
  const expanded = [];
  tasks.forEach(task => {
    const baseStart = task.start_time
      ? new Date(task.start_time)
      : task.due_date
      ? new Date(task.due_date)
      : null;
    const baseEnd = task.end_time ? new Date(task.end_time) : null;
    const duration = baseStart && baseEnd ? baseEnd.getTime() - baseStart.getTime() : null;

    if (task.recurring_rule === "daily") {
      const hours = baseStart ? baseStart.getHours() : 9;
      const minutes = baseStart ? baseStart.getMinutes() : 0;
      for (let day = 0; day < 7; day++) {
        const startClone = addDays(startOfDay(weekStart), day);
        startClone.setHours(hours, minutes, 0, 0);
        let endClone = null;
        if (duration && !Number.isNaN(duration)) {
          endClone = new Date(startClone.getTime() + duration);
        }
        expanded.push({
          ...task,
          due_date: startClone.toISOString(),
          start_time: startClone.toISOString(),
          end_time: endClone ? endClone.toISOString() : task.end_time || null
        });
      }
    } else if (task.recurring_rule === "weekly") {
      if (baseStart && !Number.isNaN(baseStart.getTime())) {
        const targetWeekday = baseStart.getDay();
        const hours = baseStart.getHours();
        const minutes = baseStart.getMinutes();
        for (let day = 0; day < 7; day++) {
          const startClone = addDays(startOfDay(weekStart), day);
          if (startClone.getDay() === targetWeekday) {
            startClone.setHours(hours, minutes, 0, 0);
            let endClone = null;
            if (duration && !Number.isNaN(duration)) {
              endClone = new Date(startClone.getTime() + duration);
            }
            expanded.push({
              ...task,
              due_date: startClone.toISOString(),
              start_time: startClone.toISOString(),
              end_time: endClone ? endClone.toISOString() : task.end_time || null
            });
          }
        }
      } else {
        expanded.push(task);
      }
    } else {
      expanded.push(task);
    }
  });
  return expanded;
}

async function moveTaskToStatus(id, status) {
  if (!status) return;
  const task = currentTasks.find(t => t.id === id);
  if (!task || task.status === status) return;
  try {
    await apiPatch(`/tasks/${id}/status`, { status });
    await loadTasksWithFilters();
  } catch (err) {
    handleError(err);
  }
}

async function scheduleDraggedTask(targetDate) {
  if (!draggedTaskId) return;
  const taskId = draggedTaskId;
  draggedTaskId = null;
  clearCalendarDropTargets();
  try {
    await updateTaskDueDate(taskId, targetDate);
    await loadTasksWithFilters();
  } catch (err) {
    handleError(err);
  }
}

async function updateTaskDueDate(id, localDate) {
  const task = currentTasks.find(t => t.id === id);
  if (!task) throw new Error("Task not found");
  const newStart = toUtcISOString(localDate);
  let newEnd = task.end_time || null;
  if (task.start_time && task.end_time) {
    const duration = new Date(task.end_time).getTime() - new Date(task.start_time).getTime();
    if (!Number.isNaN(duration)) {
      const endDate = new Date(localDate.getTime() + duration);
      newEnd = toUtcISOString(endDate);
    }
  }
  const payload = {
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    due_date: newStart,
    start_time: newStart,
    end_time: newEnd,
    location: task.location || "",
    reminder_minutes_before: task.reminder_minutes_before ?? 60,
    recurring_rule: task.recurring_rule || "none",
    context: task.context || ""
  };
  await apiPut(`/tasks/${id}`, payload);
}

function clearCalendarDropTargets() {
  document
    .querySelectorAll(".calendar-slot.is-drop-target")
    .forEach(slot => slot.classList.remove("is-drop-target"));
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatHour(h) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${suffix}`;
}

// ==========================
// MODAL HANDLING
// ==========================

function openTaskModal(task, defaultDate) {
  modal.classList.remove("hidden");
  modalTitleEl.textContent = task ? "Edit Task" : "New Task";

  if (task) {
    taskIdEl.value = task.id;
    taskTitleEl.value = task.title || "";
    taskDescriptionEl.value = task.description || "";
    if (taskContextEl) taskContextEl.value = task.context || "";
    taskStatusEl.value = task.status || "pending";
    taskPriorityEl.value = task.priority || "medium";
    taskReminderMinutesEl.value = task.reminder_minutes_before || 60;
    taskRecurringRuleEl.value = task.recurring_rule || "none";
    if (taskTagsEl) taskTagsEl.value = joinTags(task.tags || task.tag || "");

    if (task.due_date) {
      const d = new Date(task.due_date);
      if (!Number.isNaN(d.getTime())) {
        const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
        taskDueDateEl.value = local.toISOString().slice(0, 16);
      } else {
        taskDueDateEl.value = "";
      }
    } else {
      taskDueDateEl.value = "";
    }
    if (taskStartDateTimeEl) {
      if (task.start_time) {
        const start = new Date(task.start_time);
        if (!Number.isNaN(start.getTime())) {
          const local = new Date(start.getTime() - start.getTimezoneOffset() * 60000);
          taskStartDateTimeEl.value = local.toISOString().slice(0, 16);
        } else {
          taskStartDateTimeEl.value = "";
        }
      } else {
        taskStartDateTimeEl.value = taskDueDateEl.value || "";
      }
    }
    if (taskEndTimeOnlyEl) {
      taskEndTimeOnlyEl.value = formatTimeInputFromISO(task.end_time);
    }
    if (taskLocationEl) {
      taskLocationEl.value = task.location || "";
    }
  } else {
    taskIdEl.value = "";
    taskTitleEl.value = "";
    taskDescriptionEl.value = "";
    if (taskContextEl) taskContextEl.value = "";
    taskStatusEl.value = "pending";
    taskPriorityEl.value = "medium";
    taskReminderMinutesEl.value = 60;
    taskRecurringRuleEl.value = "none";
    if (taskTagsEl) taskTagsEl.value = "";
    if (taskStartDateTimeEl) taskStartDateTimeEl.value = "";
    if (taskEndTimeOnlyEl) taskEndTimeOnlyEl.value = "";
    if (taskLocationEl) taskLocationEl.value = "";

    if (defaultDate) {
      const local = new Date(
        defaultDate.getTime() - defaultDate.getTimezoneOffset() * 60000
      );
      taskDueDateEl.value = local.toISOString().slice(0, 16);
      if (taskStartDateTimeEl) taskStartDateTimeEl.value = taskDueDateEl.value;
    } else {
      taskDueDateEl.value = "";
      if (taskStartDateTimeEl) taskStartDateTimeEl.value = "";
    }
  }
}

function closeTaskModal() {
  modal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", () => closeTaskModal());
modal.addEventListener("click", e => {
  if (e.target === modal || e.target.classList.contains("modal-backdrop")) {
    closeTaskModal();
  }
});

// ==========================
// FILTERS / LOADING
// ==========================

async function loadTasksWithFilters() {
  const params = new URLSearchParams();

  const status = filterStatusEl.value;
  if (status) params.append("status", status);

  const priority = filterPriorityEl.value;
  if (priority) params.append("priority", priority);

  const from = filterFromEl.value;
  if (from) params.append("from", from);

  const to = filterToEl.value;
  if (to) params.append("to", to);

  const query = params.toString() ? `?${params.toString()}` : "";

  const data = await apiGet(`/tasks${query}`);
  renderTasks(data);
}

refreshBtn.addEventListener("click", () => {
  loadTasksWithFilters().catch(handleError);
});

applyFiltersBtn.addEventListener("click", () => {
  loadTasksWithFilters().catch(handleError);
});

// Calendar navigation

prevWeekBtn.addEventListener("click", () => {
  triggerPageFlip("left");
  currentWeekStart = addDays(currentWeekStart, -7);
  renderCalendar(currentTasks);
});

nextWeekBtn.addEventListener("click", () => {
  triggerPageFlip("right");
  currentWeekStart = addDays(currentWeekStart, 7);
  renderCalendar(currentTasks);
});

todayBtn.addEventListener("click", () => {
  triggerPageFlip("right");
  currentWeekStart = startOfWeek(new Date());
  renderCalendar(currentTasks);
});

// ==========================
// QUICK ADD
// ==========================

quickForm.addEventListener("submit", async e => {
  e.preventDefault();
  const inlineData = extractInlineSubtasks(quickTitleEl.value);
  const title = inlineData.baseTitle || quickTitleEl.value.trim();
  if (!title) return;

  let description = quickDescriptionEl.value.trim();
  if (inlineData.subtasks.length) {
    const list = inlineData.subtasks.map(item => `- ${item}`).join("\n");
    description += `${description ? "\n\n" : ""}Subtasks:\n${list}`;
  }
  const priority = quickPriorityEl.value;
  const reminderMinutes = Number(quickReminderEl.value) || 60;
  const context = quickContextEl.value.trim();
  const tags = parseTagList(quickTagsEl?.value) || [];

  let dueDateISO = null;
  let startTimeISO = null;
  let endTimeISO = null;

  if (quickDueDateEl.value) {
    const local = new Date(quickDueDateEl.value);
    if (!Number.isNaN(local.getTime())) {
      dueDateISO = toUtcISOString(local);
    }
  }

  if (quickStartTimeEl?.value && quickDueDateEl?.value) {
    const combined = combineDateAndTime(quickDueDateEl.value, quickStartTimeEl.value);
    if (combined) {
      startTimeISO = toUtcISOString(combined);
      dueDateISO = startTimeISO;
    }
  }
  if (!startTimeISO && dueDateISO) {
    startTimeISO = dueDateISO;
  }

  if (quickEndTimeEl?.value && quickDueDateEl?.value) {
    const combined = combineDateAndTime(quickDueDateEl.value, quickEndTimeEl.value);
    if (combined) {
      if (startTimeISO && combined < new Date(startTimeISO)) {
        combined.setDate(combined.getDate() + 1);
      }
      endTimeISO = toUtcISOString(combined);
    }
  }

  try {
    await apiPost("/tasks", {
      title,
      description,
      priority,
      due_date: dueDateISO,
      start_time: startTimeISO,
      end_time: endTimeISO,
      location: quickLocationEl?.value.trim() || "",
      reminder_minutes_before: reminderMinutes,
      context,
      tags: tags.join(","),
      recurring_rule: smartCapturedRecurring || "none"
    });

    quickTitleEl.value = "";
    quickDescriptionEl.value = "";
    quickDueDateEl.value = "";
    quickReminderEl.value = "60";
    quickContextEl.value = "";
    if (quickTagsEl) quickTagsEl.value = "";
    quickPriorityEl.value = "medium";
    quickStartTimeEl.value = "";
    quickEndTimeEl.value = "";
    quickLocationEl.value = "";
    updateSmartHint("Task captured.");
    updateAssistStatus("Ready for the next task.");
    renderQuickTitleHighlights("", []);
    renderSmartTokenRow([]);
    renderInlineSubtasks([]);
    renderConflictHint("");
    smartCapturedRecurring = null;

    await loadTasksWithFilters();
  } catch (err) {
    handleError(err);
  }
});

// ==========================
// TASK FORM (MODAL)
// ==========================

taskForm.addEventListener("submit", async e => {
  e.preventDefault();

  const id = taskIdEl.value ? Number(taskIdEl.value) : null;
  const title = taskTitleEl.value.trim();
  if (!title) return;

  const description = taskDescriptionEl.value.trim();
  const context = taskContextEl.value.trim();
  const tags = parseTagList(taskTagsEl?.value) || [];
  const status = taskStatusEl.value;
  const priority = taskPriorityEl.value;
  const reminderMinutes = Number(taskReminderMinutesEl.value) || 60;
  const recurringRule = taskRecurringRuleEl.value;

  let dueDateISO = null;
  let startISO = null;
  let endISO = null;
  if (taskDueDateEl.value) {
    const local = new Date(taskDueDateEl.value);
    if (!Number.isNaN(local.getTime())) {
      dueDateISO = toUtcISOString(local);
    }
  }
  if (taskStartDateTimeEl?.value) {
    const local = new Date(taskStartDateTimeEl.value);
    if (!Number.isNaN(local.getTime())) {
      startISO = toUtcISOString(local);
      dueDateISO = startISO;
    }
  }
  if (!startISO && dueDateISO) {
    startISO = dueDateISO;
  }
  if (taskEndTimeOnlyEl?.value && (taskStartDateTimeEl?.value || taskDueDateEl?.value)) {
    const base = taskStartDateTimeEl?.value || taskDueDateEl?.value;
    const combined = combineDateAndTime(base, taskEndTimeOnlyEl.value);
    if (combined) {
      const startDate = startISO ? new Date(startISO) : combined;
      if (combined < startDate) combined.setDate(combined.getDate() + 1);
      endISO = toUtcISOString(combined);
    }
  }

  const payload = {
    title,
    description,
    status,
    priority,
    due_date: dueDateISO,
    start_time: startISO,
    end_time: endISO,
    location: taskLocationEl?.value.trim() || "",
    reminder_minutes_before: reminderMinutes,
    recurring_rule: recurringRule,
    context,
    tags: tags.join(",")
  };

  try {
    if (id) {
      await apiPut(`/tasks/${id}`, payload);
    } else {
      await apiPost("/tasks", payload);
    }
    closeTaskModal();
    await loadTasksWithFilters();
  } catch (err) {
    handleError(err);
  }
});

deleteTaskBtn.addEventListener("click", async () => {
  const id = taskIdEl.value ? Number(taskIdEl.value) : null;
  if (!id) return;
  if (!confirm("Delete this task?")) return;

  try {
    await apiDelete(`/tasks/${id}`);
    closeTaskModal();
    await loadTasksWithFilters();
  } catch (err) {
    handleError(err);
  }
});

markDoneBtn.addEventListener("click", async () => {
  const id = taskIdEl.value ? Number(taskIdEl.value) : null;
  if (!id) return;

  try {
    await apiPatch(`/tasks/${id}/status`, { status: "done" });
    closeTaskModal();
    await loadTasksWithFilters();
  } catch (err) {
    handleError(err);
  }
});

newTaskBtn.addEventListener("click", () => {
  closeCaptureSheet();
  openTaskModal(null, new Date());
});

// ==========================
// EMAIL SETTINGS + STATS
// ==========================

async function loadEmailSettings() {
  if (isDemoMode) {
    if (emailAddressEl) emailAddressEl.value = "";
    alertsEnabledEl.checked = false;
    summaryEnabledEl.checked = false;
    if (allowedDomainsEl) allowedDomainsEl.value = "";
    emailSettingsState = null;
    updateEmailChips();
    return;
  }
    const settings = await apiGet("/email-settings");
    emailAddressEl.value = settings.email || "";
    alertsEnabledEl.checked = !!settings.alerts_enabled;
    summaryEnabledEl.checked = !!settings.summary_enabled;
    summaryHourEl.value = settings.summary_hour ?? 8;
    if (allowedDomainsEl) allowedDomainsEl.value = settings.allowed_domains || "";
    emailSettingsState = settings;
    updateEmailChips();
    updateHeroHighlights();
}

emailForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = emailAddressEl.value.trim();
  if (!email) return;

  try {
    const payload = {
        email,
        alerts_enabled: alertsEnabledEl.checked,
        summary_enabled: summaryEnabledEl.checked,
        summary_hour: Number(summaryHourEl.value) || 8,
        allowed_domains: allowedDomainsEl?.value || "",
    };
    if (!isEmailAllowed(email, payload.allowed_domains)) {
        setStatus(
            emailStatusEl,
            "Email domain is not allowed. Update allowed domains or use a permitted address.",
            "error",
        );
        return;
    }
    await apiPut("/email-settings", payload);
    emailSettingsState = payload;
    updateEmailChips();
    updateHeroHighlights();
    setStatus(emailStatusEl, "Saved.", "ok");
  } catch (err) {
    handleError(err, emailStatusEl);
  }
});

testEmailBtn.addEventListener("click", async () => {
  setStatus(emailStatusEl, "Sending test email...", "pending");
  try {
    await apiPost("/email-settings/test", {});
    setStatus(emailStatusEl, "Test email sent (check inbox).", "ok");
  } catch (err) {
    console.error(err);
    setStatus(
      emailStatusEl,
      err?.message || "Failed to send. Check SMTP host, port, username, and password.",
      "error"
    );
  }
});

if (heroAlertsEditBtn) {
  heroAlertsEditBtn.addEventListener("click", () => {
    if (emailForm) {
      emailForm.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        if (emailAddressEl) emailAddressEl.focus({ preventScroll: true });
      }, 350);
    }
  });
}

// Email preview chips update on toggle/change
[alertsEnabledEl, summaryEnabledEl, summaryHourEl].forEach(el => {
  el?.addEventListener("change", () => updateEmailChips(buildEmailPreviewFromForm()));
});


async function loadStats() {
  const stats = await apiGet("/stats/overview");
  const parts = [];

  parts.push(
    `<div class="stats-row"><span>Total tasks</span><span class="stats-badge">${stats.total}</span></div>`
  );

  if (stats.byStatus && stats.byStatus.length) {
    parts.push(`<div class="stats-row"><span>Status</span></div>`);
    stats.byStatus.forEach(s => {
      parts.push(
        `<div class="stats-row"><span>${s.status}</span><span class="stats-badge">${s.c}</span></div>`
      );
    });
  }

  if (stats.byPriority && stats.byPriority.length) {
    parts.push(`<div class="stats-row"><span>Priority</span></div>`);
    stats.byPriority.forEach(p => {
      parts.push(
        `<div class="stats-row"><span>${p.priority}</span><span class="stats-badge">${p.c}</span></div>`
      );
    });
  }

  if (stats.upcoming && stats.upcoming.length) {
    parts.push(`<div class="stats-row"><span>Next up</span></div>`);
    stats.upcoming.forEach(t => {
      parts.push(
        `<div class="stats-row"><span>${escapeHtml(
          t.title
        )}</span><span class="stats-badge">${formatDateTimeForDisplay(
          t.due_date
        )}</span></div>`
      );
    });
  }

  statsOverviewEl.innerHTML = parts.join("");
  renderInsightsPanel(stats);
}

// ==========================
// HERO SUMMARY
// ==========================

function updateHeroHighlights() {
  if (!heroNextTitleEl) return;

  if (!currentTasks.length) {
    heroNextTitleEl.textContent = "No upcoming tasks";
    heroNextDueEl.textContent = "No schedule";
    heroNextDescriptionEl.textContent = "Add a due date to light up your week.";
  } else {
    const upcoming = currentTasks
      .filter(t => t.due_date)
      .sort(
        (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      );

    const now = new Date();
    let nextTask = null;
    for (const task of upcoming) {
      const dt = new Date(task.due_date);
      if (Number.isNaN(dt.getTime())) continue;
      if (!nextTask) nextTask = task;
      if (dt >= now) {
        nextTask = task;
        break;
      }
    }

    if (nextTask) {
      const icon = escapeHtml(getIconForContext(nextTask.context));
      heroNextTitleEl.innerHTML = `<span class="task-icon">${icon}</span> ${escapeHtml(nextTask.title || "Upcoming task")}`;
      heroNextDueEl.textContent = formatDateTimeForDisplay(nextTask.due_date);
      const readableStatus = capitalize(
        (nextTask.status || "pending").replace(/_/g, " ")
      );
      heroNextDescriptionEl.textContent = `${capitalize(
        nextTask.priority || "medium"
      )} priority · ${readableStatus}`;
    } else {
      heroNextTitleEl.textContent = "Schedule this week";
      heroNextDueEl.textContent = "No due date";
      heroNextDescriptionEl.textContent = "Drop a task on the calendar grid.";
    }
  }

  const active = currentTasks.filter(
    t => t.status !== "done" && t.status !== "archived"
  );
  const highFocus = active.filter(t => t.priority === "high").length;
  const doneCount = currentTasks.filter(t => t.status === "done").length;
  const total = currentTasks.length || 1;
  const completion = Math.min(100, Math.round((doneCount / total) * 100));

  if (heroFocusCountEl) heroFocusCountEl.textContent = active.length;
  if (heroFocusDistributionEl) {
    heroFocusDistributionEl.textContent = `${highFocus} high priority`;
  }
  if (heroFocusProgressBar) {
    heroFocusProgressBar.style.width = `${completion}%`;
    heroFocusProgressBar.title = `${completion}% complete`;
  }

  let alertsStatus = "Alerts off";
  let alertsMeta = "Connect alerts so HyperPlanner can nudge you.";
  if (emailSettingsState) {
    const { alerts_enabled, summary_enabled, email, summary_hour } = emailSettingsState;
    const switches = [];
    if (alerts_enabled) switches.push("Instant alerts");
    if (summary_enabled) {
      const hr =
        typeof summary_hour === "number"
          ? summary_hour
          : Number(summary_hour) || 8;
      switches.push(`Daily summary @ ${hr}:00`);
    }

    if (switches.length) {
      alertsStatus = "Automation on";
      alertsMeta = `${switches.join(" · ")}${email ? ` → ${email}` : ""}`;
    } else if (email) {
      alertsMeta = `Ready to send to ${email}. Toggle an option to activate.`;
    }
  }

  if (heroAlertsStatusEl) heroAlertsStatusEl.textContent = alertsStatus;
  if (heroAlertsMetaEl) heroAlertsMetaEl.textContent = alertsMeta;
}

function renderInsightsPanel(stats) {
  if (!insightsPanelEl) return;
  const total = stats.total || 0;
  const done = (stats.byStatus || []).find(s => s.status === "done")?.c || 0;
  const completion = total ? Math.round((done / total) * 100) : 0;
  const highPriority =
    (stats.byPriority || []).find(p => p.priority === "high")?.c || 0;
  const insights = [
    {
      title: "Completion rate",
      detail: `${completion}% complete`,
      subtext: total ? `${done} of ${total} tasks finished` : "No tasks yet"
    },
    {
      title: "High-priority load",
      detail: `${highPriority} critical tasks`,
      subtext:
        highPriority > 3
          ? "Consider deferring or delegating a few items."
          : "Load is within a healthy range."
    }
  ];

  if (stats.upcoming && stats.upcoming.length) {
    const next = stats.upcoming[0];
    insights.push({
      title: "Next deadline",
      detail: next.title || "Upcoming task",
      subtext: formatDateTimeForDisplay(next.due_date)
    });
  }

  insightsPanelEl.innerHTML = insights
    .map(
      insight => `<div class="insight-row">
      <strong>${escapeHtml(insight.title)}</strong>
      <span>${escapeHtml(insight.detail)}</span>
      <small>${escapeHtml(insight.subtext)}</small>
    </div>`
    )
    .join("");
}

// ==========================
// SMART CAPTURE HELPERS
// ==========================

function applySmartCapture(force = false) {
  if (!quickTitleEl) return;
  const raw = quickTitleEl.value;
  if (!raw.trim()) {
    smartCapturedRecurring = null;
    renderQuickTitleHighlights(raw, []);
    renderSmartTokenRow([]);
    renderInlineSubtasks([]);
    return;
  }
  const inlineData = extractInlineSubtasks(raw);
  const focusText = inlineData.baseSegment || raw;
  renderInlineSubtasks(inlineData.subtasks);
  const result = parseSmartQuickInput(focusText);
  const hints = [];

  if (result.context && quickContextEl && (!quickContextEl.value || force)) {
    quickContextEl.value = result.context;
    hints.push(`Context → ${result.context}`);
  }

  if (result.priority && quickPriorityEl && (quickPriorityEl.value === "medium" || force)) {
    quickPriorityEl.value = result.priority;
    hints.push(`Priority → ${capitalize(result.priority)}`);
  }

  if (typeof result.recurringRule === "string") {
    smartCapturedRecurring = result.recurringRule || null;
    if (result.recurringRule) {
      hints.push(`Recurring → ${capitalize(result.recurringRule)}`);
    }
  }

  if (result.dueDate && quickDueDateEl && (!quickDueDateEl.value || force)) {
    quickDueDateEl.value = formatForDateTimeInput(result.dueDate);
    adjustReminderInput(quickDueDateEl.value, quickReminderEl);
    hints.push(`Due → ${formatDateTimeForDisplay(result.dueDate.toISOString())}`);
    if (quickStartTimeEl) {
      quickStartTimeEl.value = formatTimeInputFromISO(result.dueDate.toISOString());
    }
  }

  const autoHints = applyAutomationRules(raw, {
    context: quickContextEl?.value,
    priority: quickPriorityEl?.value,
    due: quickDueDateEl?.value
  });
  if (autoHints.length) {
    hints.push(...autoHints);
  }

  renderQuickTitleHighlights(raw, result.highlights);
  renderSmartTokenRow(result.tokens);
  renderConflictHint(quickDueDateEl.value);

  if (hints.length) {
    updateSmartHint(hints.join(" · "));
  } else if (force) {
    updateSmartHint("Listening for cues.");
  }
}



function parseSmartQuickInput(text) {
  const lower = text.toLowerCase();
  let dueDate = null;
  let contextLabel = "";
  let priorityLabel = null;
  let recurringRule = "";
  const now = new Date();
  const highlights = [];
  const occupied = [];
  const tokens = [];

  const addRange = (start, end, type, label, value) => {
    if (start == null || start < 0) return;
    const overlaps = occupied.some(range => start < range.end && end > range.start);
    if (overlaps) return;
    occupied.push({ start, end });
    highlights.push({ start, end, type });
    if (label) {
      const trimmed = label.trim();
      const exists = tokens.some(token => token.type === type && token.label === trimmed);
      if (!exists) tokens.push({ type, label: trimmed, value: value ?? trimmed });
    }
  };

  const matchRegex = (regex, type, label) => {
    regex.lastIndex = 0;
    const match = regex.exec(text);
    if (match) {
      const raw = match[0];
      addRange(match.index, match.index + raw.length, type, label || raw, raw);
    }
    return match;
  };

  const markWord = (word, type, label) => {
    const idx = lower.indexOf(word.toLowerCase());
    if (idx >= 0) {
      const chunk = text.slice(idx, idx + word.length);
      addRange(idx, idx + word.length, type, label || chunk, chunk);
      return true;
    }
    return false;
  };

  const applyContextTokens = (regex, lookup) => {
    if (!lookup || typeof lookup.get !== "function") return;
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(text))) {
      const raw = match[0].toLowerCase();
      const label = lookup.get(raw);
      if (!label) continue;
      addRange(match.index, match.index + match[0].length, "context", match[0], label);
      if (!contextLabel) contextLabel = label;
    }
  };

  customNlpRules.forEach(rule => {
    const idx = lower.indexOf(rule.trigger);
    if (idx >= 0) {
      const end = idx + rule.trigger.length;
      if (rule.action === "context") {
        addRange(idx, end, "context", rule.trigger, rule.value);
        if (!contextLabel) contextLabel = rule.value;
      } else if (rule.action === "priority" && !priorityLabel) {
        priorityLabel = rule.value;
        addRange(idx, end, "priority", rule.trigger, rule.value);
      } else if (rule.action === "due" && !dueDate) {
        const mins = Number(rule.offset || 0);
        const base = new Date(now);
        base.setMinutes(base.getMinutes() + mins);
        dueDate = base;
        addRange(idx, end, "time", rule.trigger, `+${mins}m`);
      }
    }
  });

  const phraseMatch = findTimePhraseMatch(lower, text);
  if (phraseMatch) {
    const resolved = resolveTimePhrase(phraseMatch.metadata, now);
    if (resolved && !dueDate) {
      dueDate = resolved;
    }
    addRange(phraseMatch.start, phraseMatch.end, "time", phraseMatch.label, phraseMatch.metadata);
  }

  applyContextTokens(/#[\w-]+/gi, smartTermSets.tag_contexts);
  applyContextTokens(/@[\w-]+/gi, smartTermSets.macro_contexts);

  if (!dueDate) {
    const explicitDate = findExplicitDateMatch(text, now);
    if (explicitDate) {
      dueDate = explicitDate.date;
      addRange(explicitDate.start, explicitDate.end, "time", explicitDate.label, explicitDate.label);
    }
  }

  if (!dueDate && matchRegex(/\b(tomorrow)\b/i, "time", "Tomorrow")) {
    dueDate = startOfDay(addDays(now, 1));
  } else if (!dueDate && matchRegex(/\b(today)\b/i, "time", "Today")) {
    dueDate = startOfDay(now);
  }

  if (!recurringRule) {
    const weekdayRecurring = lower.match(/\bevery (monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/);
    if (weekdayRecurring) {
      recurringRule = "weekly";
      const weekday = weekdayRecurring[1];
      const idx = lower.indexOf(weekdayRecurring[0]);
      addRange(
        idx,
        idx + weekdayRecurring[0].length,
        "time",
        text.slice(idx, idx + weekdayRecurring[0].length),
        weekday
      );
      if (!dueDate) {
        dueDate = nextDateForWeekday(weekday, false);
      }
    } else if (/\bevery ?weekday(s)?\b/.test(lower)) {
      recurringRule = "daily";
      const idx = lower.indexOf("weekday");
      if (idx >= 0) {
        addRange(idx, idx + 8, "time", text.slice(idx, idx + 8), "weekday");
      }
    }
  }

  const routineMatch = matchRegex(
    /((every ?day|daily)\s*(at\s*)?\d{1,2}(?::\d{2})?\s*(am|pm)?)/i,
    "time",
    "Daily block"
  );
  if (routineMatch) {
    const hours = routineMatch[0].match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (hours) {
      let h = Number(hours[1]);
      const mins = hours[2] ? Number(hours[2]) : 0;
      const mer = hours[3]?.toLowerCase();
      if (mer === "pm" && h < 12) h += 12;
      if (mer === "am" && h === 12) h = 0;
      const nextDay = addDays(startOfDay(now), 1);
      nextDay.setHours(h, mins, 0, 0);
      dueDate = nextDay;
      recurringRule = "daily";
    }
  }

  if (!dueDate) {
    const relativeMatch = matchRegex(/(in\s+\d+\s*(hours?|hrs?|minutes?|mins?))/i, "time");
    if (relativeMatch) {
      const valueMatch = relativeMatch[0].match(/(\d+)\s*(hours?|hrs?|minutes?|mins?)/i);
      if (valueMatch) {
        const value = Number(valueMatch[1]);
        const unit = valueMatch[2];
        const temp = new Date(now);
        if (unit.startsWith("hour") || unit.startsWith("hr")) {
          temp.setHours(temp.getHours() + value);
        } else {
          temp.setMinutes(temp.getMinutes() + value);
        }
        dueDate = temp;
      }
    }
  }

  if (!dueDate) {
    const weekdayMatch = matchRegex(
      /((next\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday))/i,
      "time"
    );
    if (weekdayMatch) {
      const isNext = Boolean(weekdayMatch[2]);
      dueDate = nextDateForWeekday(weekdayMatch[3], isNext);
    }
  }

  if (!dueDate) {
    const specificDateMatch =
      matchRegex(
        /\b(before|by)\s+(?:the\s+)?(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?\b/i,
        "time"
      ) ||
      matchRegex(
        /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?\b/i,
        "time"
      );

    if (specificDateMatch) {
      let monthName;
      let dayStr;
      if (specificDateMatch.length === 4) {
        monthName = specificDateMatch[2];
        dayStr = specificDateMatch[3];
      } else {
        monthName = specificDateMatch[1];
        dayStr = specificDateMatch[2];
      }
      const index = MONTH_NAME_INDEX[monthName.toLowerCase()];
      if (typeof index === "number") {
        const day = Number(dayStr);
        let year = now.getFullYear();
        const candidate = new Date(now);
        candidate.setFullYear(year, index, day);
        candidate.setHours(9, 0, 0, 0);
        if (candidate < now) {
          year += 1;
          candidate.setFullYear(year, index, day);
        }
        dueDate = candidate;
      }
    }
  }

  let hourOverride = null;
  let minuteOverride = 0;
  const explicitTime = matchRegex(/((?:at|@)\s*\d{1,2}(?::\d{2})?\s*(am|pm)?)/i, "time");
  const fallbackTime = explicitTime || matchRegex(/(\d{1,2}(?::\d{2})?\s*(am|pm))/i, "time");
  if (fallbackTime) {
    const timeParts = fallbackTime[0].match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (timeParts) {
      hourOverride = Number(timeParts[1]);
      minuteOverride = timeParts[2] ? Number(timeParts[2]) : 0;
      const meridiem = timeParts[3]?.toLowerCase();
      if (meridiem === "pm" && hourOverride < 12) hourOverride += 12;
      if (meridiem === "am" && hourOverride === 12) hourOverride = 0;
    }
  } else if (markWord("morning", "time", "Morning")) {
    hourOverride = 9;
  } else if (markWord("afternoon", "time", "Afternoon")) {
    hourOverride = 14;
  } else if (markWord("evening", "time", "Evening") || markWord("tonight", "time", "Tonight")) {
    hourOverride = 19;
  }

  if (hourOverride != null) {
    if (!dueDate) dueDate = new Date(now);
    dueDate.setHours(hourOverride, minuteOverride, 0, 0);
  } else if (dueDate) {
    dueDate.setHours(9, 0, 0, 0);
  }

  for (const [label, keywords] of Object.entries(smartTermSets.context)) {
    const foundWord = keywords.find(word => lower.includes(word.toLowerCase()));
    if (foundWord) {
      const idx = lower.indexOf(foundWord.toLowerCase());
      contextLabel = label;
      const chunk = text.slice(idx, idx + foundWord.length);
      addRange(idx, idx + foundWord.length, "context", chunk, label);
      break;
    }
  }

  const priorityHighWord = [...smartTermSets.priority_high].find(word => lower.includes(word));
  const priorityLowWord = [...smartTermSets.priority_low].find(word => lower.includes(word));
  if (priorityHighWord) {
    const idx = lower.indexOf(priorityHighWord);
    priorityLabel = "high";
    const chunk = text.slice(idx, idx + priorityHighWord.length);
    addRange(idx, idx + priorityHighWord.length, "priority", chunk, "high");
  } else if (priorityLowWord) {
    const idx = lower.indexOf(priorityLowWord);
    priorityLabel = "low";
    const chunk = text.slice(idx, idx + priorityLowWord.length);
    addRange(idx, idx + priorityLowWord.length, "priority", chunk, "low");
  }

  if (!recurringRule && /\bevery ?day\b|\bdaily\b/.test(lower)) {
    recurringRule = "daily";
  }

  return {
    dueDate,
    context: contextLabel ? capitalize(contextLabel) : "",
    priority: priorityLabel,
    recurringRule,
    highlights,
    tokens
  };
}

function applyAutomationRules(text, fields = {}) {
  const lower = (text || "").toLowerCase();
  const hints = [];
  if (!lower.trim()) return hints;
  automationRules.forEach(rule => {
    const idx = lower.indexOf(rule.trigger);
    if (idx === -1) return;
    if (rule.action === "context" && quickContextEl && !quickContextEl.value) {
      quickContextEl.value = capitalize(rule.value);
      hints.push(`Context → ${capitalize(rule.value)}`);
      const { highlights, tokens } = parseSmartQuickInput(text);
      renderQuickTitleHighlights(text, highlights);
      renderSmartTokenRow(tokens);
    }
    if (rule.action === "priority" && quickPriorityEl && quickPriorityEl.value === "medium") {
      quickPriorityEl.value = rule.value;
      hints.push(`Priority → ${rule.value}`);
    }
    if (rule.action === "due" && quickDueDateEl && rule.offset != null && !quickDueDateEl.value) {
      const base = new Date();
      base.setMinutes(base.getMinutes() + Number(rule.offset));
      quickDueDateEl.value = formatForDateTimeInput(base);
      adjustReminderInput(quickDueDateEl.value, quickReminderEl);
      hints.push(`Due → +${rule.offset}m`);
    }
  });
  return hints;
}

function findTimePhraseMatch(lowerText, originalText) {
  if (!smartTermSets.time_phrases || !smartTermSets.time_phrases.length) return null;
  const sorted = [...smartTermSets.time_phrases].sort((a, b) => b.term.length - a.term.length);
  for (const phrase of sorted) {
    const term = phrase.term.toLowerCase();
    const idx = lowerText.indexOf(term);
    if (idx !== -1) {
      return {
        start: idx,
        end: idx + term.length,
        label: originalText.slice(idx, idx + term.length),
        metadata: phrase.metadata || term
      };
    }
  }
  return null;
}

function findExplicitDateMatch(originalText, baseDate = new Date()) {
  if (!originalText) return null;
  const regex =
    /\b(?:(by|before|on|this|next)\s+)?(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,\s*(\d{4}))?(?:\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?/gi;
  const match = regex.exec(originalText);
  if (!match) return null;
  const [, qualifierRaw, monthNameRaw, dayStr, yearStr, hourStr, minuteStr, meridianRaw] = match;
  const monthIndex = MONTH_NAME_INDEX[(monthNameRaw || "").toLowerCase()];
  if (monthIndex == null) return null;
  const day = Number(dayStr);
  if (Number.isNaN(day)) return null;
  let year = yearStr ? Number(yearStr) : baseDate.getFullYear();
  if (Number.isNaN(year)) year = baseDate.getFullYear();
  let hour = hourStr ? Number(hourStr) : 9;
  let minute = minuteStr ? Number(minuteStr) : 0;
  const qualifier = qualifierRaw ? qualifierRaw.toLowerCase() : "";
  const meridian = meridianRaw ? meridianRaw.toLowerCase() : "";
  if (meridian === "pm" && hour < 12) hour += 12;
  if (meridian === "am" && hour === 12) hour = 0;
  const candidate = new Date(year, monthIndex, day, hour, minute, 0, 0);
  if (!yearStr) {
    const startToday = startOfDay(baseDate);
    if (qualifier === "next" && candidate <= baseDate) {
      candidate.setFullYear(candidate.getFullYear() + 1);
    } else if (candidate < startToday) {
      candidate.setFullYear(candidate.getFullYear() + 1);
    }
  }
  return {
    date: candidate,
    start: match.index,
    end: match.index + match[0].length,
    label: match[0]
  };
}

function resolveTimePhrase(metadata, baseDate = new Date()) {
  if (!metadata) return null;
  const start = startOfDay(baseDate);
  const addDaysAndTime = (days, hours, minutes = 0) => {
    const target = addDays(start, days);
    target.setHours(hours, minutes, 0, 0);
    return target;
  };

  switch (metadata) {
    case "tomorrow_morning":
      return addDaysAndTime(1, 9);
    case "tomorrow_afternoon":
      return addDaysAndTime(1, 14);
    case "tomorrow_evening":
      return addDaysAndTime(1, 19);
    case "this_weekend": {
      const day = baseDate.getDay();
      const daysUntilSaturday = (6 - day + 7) % 7;
      return addDaysAndTime(daysUntilSaturday || 0, 10);
    }
    case "next_week": {
      const upcoming = addDays(start, 7);
      const monday = startOfWeek(upcoming);
      monday.setHours(9, 0, 0, 0);
      return monday;
    }
    case "next_month": {
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth() + 1;
      const target = new Date(year, month, 1, 9, 0, 0, 0);
      return target;
    }
    case "next_quarter": {
      const month = baseDate.getMonth();
      const nextQuarter = Math.floor(month / 3) * 3 + 3;
      const year = baseDate.getFullYear() + Math.floor(nextQuarter / 12);
      const monthIndex = nextQuarter % 12;
      return new Date(year, monthIndex, 1, 9, 0, 0, 0);
    }
    case "weekday_mornings": {
      for (let i = 1; i <= 7; i++) {
        const candidate = addDays(baseDate, i);
        const day = candidate.getDay();
        if (day !== 0 && day !== 6) {
          candidate.setHours(9, 0, 0, 0);
          return candidate;
        }
      }
      return null;
    }
    case "friday_morning": {
      const date = nextDateForWeekday("friday", false);
      return date;
    }
    case "before_lunch":
      return baseDate.getHours() < 11 ? addDaysAndTime(0, 11) : addDaysAndTime(1, 11);
    case "after_lunch":
      return addDaysAndTime(baseDate.getHours() < 13 ? 0 : 1, 13);
    case "after_dinner":
      return addDaysAndTime(baseDate.getHours() < 20 ? 0 : 1, 20);
    case "sunrise":
      return addDaysAndTime(0, 6);
    case "sunset":
      return addDaysAndTime(0, 19);
    case "midnight":
      return addDaysAndTime(1, 0);
    case "early":
      return addDaysAndTime(baseDate.getHours() < 8 ? 0 : 1, 8);
    case "late":
      return addDaysAndTime(baseDate.getHours() < 21 ? 0 : 1, 21);
    default:
      return null;
  }
}

function updateSmartHint(message) {
  if (!smartHintTextEl) return;
  smartHintTextEl.textContent = message;
}

function updateAssistStatus(message) {
  if (!quickAssistStatusEl) return;
  quickAssistStatusEl.textContent = message;
}

function nextDateForWeekday(weekdayName, forceNextWeek) {
  const targetIndex = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(
    weekdayName.toLowerCase()
  );
  if (targetIndex < 0) return null;
  const now = new Date();
  const date = new Date(now);
  const currentIndex = date.getDay();
  let diff = targetIndex - currentIndex;
  if (diff <= 0 || forceNextWeek) {
    diff += 7;
  }
  date.setDate(date.getDate() + diff);
  date.setHours(9, 0, 0, 0);
  return date;
}

function formatForDateTimeInput(date) {
  const pad = num => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

function formatTimeInputFromISO(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function combineDateAndTime(dateValue, timeValue) {
  if (!dateValue || !timeValue) return null;
  const base = new Date(dateValue);
  if (Number.isNaN(base.getTime())) return null;
  const [hours, minutes] = timeValue.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  base.setHours(hours, minutes, 0, 0);
  return base;
}

// ==========================
// FOCUS SUGGESTION
// ==========================

function updateFocusSuggestion() {
  if (!focusSuggestionTextEl) return;
  focusSuggestionDate = computeFocusSuggestionDate();
  if (focusSuggestionDate) {
    focusSuggestionTextEl.textContent = formatDateTimeForDisplay(focusSuggestionDate.toISOString());
    if (focusSuggestionBtn) focusSuggestionBtn.disabled = false;
  } else {
    focusSuggestionTextEl.textContent = "Calendar is fully booked soon.";
    if (focusSuggestionBtn) focusSuggestionBtn.disabled = true;
  }
}

function computeFocusSuggestionDate() {
  const now = new Date();
  const start = new Date(now);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    for (let hour = 9; hour <= 18; hour++) {
      const candidate = new Date(start);
      candidate.setDate(start.getDate() + dayOffset);
      candidate.setHours(hour, 0, 0, 0);
      if (candidate < now) continue;
      if (!isSlotTaken(candidate)) {
        return candidate;
      }
    }
  }
  return null;
}

function isSlotTaken(candidate) {
  return currentTasks.some(task => {
    if (!task.due_date) return false;
    const dt = new Date(task.due_date);
    if (Number.isNaN(dt.getTime())) return false;
    return Math.abs(dt.getTime() - candidate.getTime()) < 30 * 60 * 1000;
  });
}

// ==========================
// SMART TERMS + TEMPLATES
// ==========================

function renderQuickTitleHighlights(text, ranges = []) {
  if (!quickTitleHighlightsEl) return;
  const placeholder = quickTitleEl?.dataset.placeholder || "Task title...";
  if (!text) {
    quickTitleHighlightsEl.innerHTML = `<span class="placeholder">${escapeHtml(placeholder)}</span>`;
    quickTitleFieldEl?.classList.remove("has-highlights");
    return;
  }
  if (!ranges.length) {
    quickTitleHighlightsEl.innerHTML = "";
    quickTitleFieldEl?.classList.remove("has-highlights");
    return;
  }
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  let cursor = 0;
  let html = "";
  sorted.forEach(range => {
    if (range.start > cursor) {
      html += escapeHtml(text.slice(cursor, range.start));
    }
    const chunk = text.slice(range.start, range.end);
    html += `<span class="hl-${range.type}">${escapeHtml(chunk)}</span>`;
    cursor = range.end;
  });
  if (cursor < text.length) {
    html += escapeHtml(text.slice(cursor));
  }
  quickTitleHighlightsEl.innerHTML = html || `<span class="placeholder">${escapeHtml(placeholder)}</span>`;
  if (quickTitleFieldEl) {
    quickTitleFieldEl.classList.toggle("has-highlights", ranges.length > 0);
  }
}

function renderSmartTokenRow(tokens = []) {
  if (!smartTokenRowEl) return;
  smartTokenRowEl.innerHTML = "";
  tokens.forEach(token => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `token-chip ${token.type}`;
    btn.dataset.type = token.type;
    btn.dataset.value = token.value || token.label;
    btn.textContent = token.label;
    smartTokenRowEl.appendChild(btn);
  });
}

function renderInlineSubtasks(subtasks = []) {
  if (!inlineSubtaskPreviewEl) return;
  if (!subtasks.length) {
    inlineSubtaskPreviewEl.innerHTML = "";
    return;
  }
  const html = subtasks.map(task => `<span>${escapeHtml(task)}</span>`).join("");
  inlineSubtaskPreviewEl.innerHTML = html;
}

function extractInlineSubtasks(raw) {
  const delimiterIndex = raw.indexOf(">");
  if (delimiterIndex === -1) {
    return { baseSegment: raw, baseTitle: raw.trim(), subtasks: [] };
  }
  const baseSegment = raw.slice(0, delimiterIndex);
  const rest = raw.slice(delimiterIndex + 1);
  const subtasks = rest
    .split(/,|;/)
    .map(part => part.replace(/^and\s+/i, "").trim())
    .filter(Boolean);
  return { baseSegment, baseTitle: baseSegment.trim(), subtasks };
}

function renderConflictHint(value) {
  if (!conflictHintEl) return;
  if (!value) {
    conflictHintEl.textContent = "Pick a time to check conflicts.";
    conflictHintEl.classList.remove("is-conflict");
    return;
  }
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) {
    conflictHintEl.textContent = "Invalid date.";
    conflictHintEl.classList.add("is-conflict");
    return;
  }
  const weekRef = startOfWeek(dt);
  const simulatedTasks = expandRecurringTasks(currentTasks, weekRef);
  const conflict = simulatedTasks.find(task => {
    if (!task.due_date) return false;
    const taskDate = new Date(task.due_date);
    if (Number.isNaN(taskDate.getTime())) return false;
    return Math.abs(taskDate.getTime() - dt.getTime()) < 45 * 60 * 1000;
  });
  if (conflict) {
    conflictHintEl.textContent = `Conflicts with ${conflict.title} (${formatDateTimeForDisplay(
      conflict.due_date
    )})`;
    conflictHintEl.classList.add("is-conflict");
  } else {
    conflictHintEl.textContent = "Slot is free.";
    conflictHintEl.classList.remove("is-conflict");
  }
}

async function loadSmartTerms() {
  try {
    const data = await apiGet("/smart-terms");
    ingestSmartTerms(data);
  } catch (err) {
    console.info("Smart term fetch failed; using fallback.");
  }
}

function ingestSmartTerms(grouped) {
  if (!grouped) return;
  if (grouped.context && grouped.context.length) {
    const contextMap = {};
    grouped.context.forEach(row => {
      const label = row.metadata || capitalize(row.term);
      if (!contextMap[label]) contextMap[label] = [];
      contextMap[label].push(row.term.toLowerCase());
    });
    smartTermSets.context = contextMap;
  }
  if (grouped.priority_high && grouped.priority_high.length) {
    smartTermSets.priority_high = new Set(grouped.priority_high.map(row => row.term.toLowerCase()));
  }
  if (grouped.priority_low && grouped.priority_low.length) {
    smartTermSets.priority_low = new Set(grouped.priority_low.map(row => row.term.toLowerCase()));
  }
  if (grouped.time_phrase && grouped.time_phrase.length) {
    smartTermSets.time_phrases = grouped.time_phrase.map(row => ({
      term: row.term.toLowerCase(),
      metadata: row.metadata || row.term
    }));
  }
  if (grouped.category_tag && grouped.category_tag.length) {
    smartTermSets.tag_contexts = new Map(
      grouped.category_tag.map(row => [row.term.toLowerCase(), row.metadata || row.term])
    );
  }
  if (grouped.macro && grouped.macro.length) {
    smartTermSets.macro_contexts = new Map(
      grouped.macro.map(row => [row.term.toLowerCase(), row.metadata || row.term])
    );
  }
}

function loadTemplates() {
  try {
    const stored = JSON.parse(localStorage.getItem("hyperplanner.templates") || "[]");
    customTemplates = Array.isArray(stored) ? stored.map(normalizeTemplate) : [];
  } catch (err) {
    customTemplates = [];
  }
  renderTemplateOptions();
  updateAssistStatus("Smart helpers ready.");
}

function listAllTemplates() {
  if (isDemoMode) {
    return [...DEFAULT_TEMPLATES.map(normalizeTemplate)].slice(0, 2);
  }
  return [...DEFAULT_TEMPLATES.map(normalizeTemplate), ...customTemplates.map(normalizeTemplate)];
}

function normalizeTemplate(template) {
  if (!template) return null;
  const safeReminder = Number(template.reminder);
  const safeOffset = Number(template.dueOffsetMinutes);
  return {
    id: template.id,
    label: template.label || template.title || "Template",
    title: template.title || template.label || "",
    description: template.description || "",
    priority: template.priority || "medium",
    context: template.context || "",
    tags: joinTags(template.tags),
    reminder: Number.isFinite(safeReminder) ? safeReminder : 60,
    recurring: template.recurring || "",
    dueOffsetMinutes: Number.isFinite(safeOffset) ? safeOffset : 0,
    layoutPreset: template.layoutPreset || ""
  };
}

function renderTemplateOptions() {
  if (!templateSelectEl) return;
  const allTemplates = listAllTemplates();
  templateSelectEl.innerHTML = '<option value="">Select template…</option>';
  allTemplates.forEach(template => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.label;
    templateSelectEl.appendChild(option);
  });
  renderTemplateManagerList();
}

function applyTemplateToQuickForm(id) {
  const template = normalizeTemplate(listAllTemplates().find(t => t.id === id));
  if (!template) return;
  quickTitleEl.value = template.title || "";
  quickDescriptionEl.value = template.description || "";
  quickPriorityEl.value = template.priority || "medium";
  quickContextEl.value = template.context || "";
  quickReminderEl.value = template.reminder || 60;
  if (quickTagsEl) quickTagsEl.value = template.tags || "";
  if (template.dueOffsetMinutes && quickDueDateEl) {
    quickDueDateEl.value = toLocalDateTimeInput(addMinutes(new Date(), template.dueOffsetMinutes));
  }
  if (quickStartTimeEl) quickStartTimeEl.value = "";
  if (quickEndTimeEl) quickEndTimeEl.value = "";
  if (quickLocationEl) quickLocationEl.value = "";
  smartCapturedRecurring = template.recurring || null;
  if (template.layoutPreset) {
    applyLayoutPreset(template.layoutPreset);
  }
  renderQuickTitleHighlights(quickTitleEl.value, []);
  renderSmartTokenRow([]);
  renderInlineSubtasks([]);
  renderConflictHint(quickDueDateEl?.value || "");
  updateAssistStatus(`Applied template: ${template.label}`);
}

function renderTemplateManagerList() {
  if (!templateManagerListEl) return;
  const allTemplates = listAllTemplates().map(t => ({ ...t, builtin: DEFAULT_TEMPLATES.some(d => d.id === t.id) }));
  templateManagerListEl.innerHTML = "";

  allTemplates.forEach(template => {
    const row = document.createElement("div");
    row.className = "template-manager-row";
    const meta = document.createElement("div");
    meta.className = "meta";
    const title = document.createElement("h4");
    title.textContent = template.label;
    const desc = document.createElement("p");
    const priorityLabel = template.priority ? `${template.priority} priority` : "balanced priority";
    const contextLabel = template.context ? ` • ${template.context}` : "";
    const tagsLabel = template.tags ? ` • #${parseTagList(template.tags).join(" #")}` : "";
    const offsetLabel = template.dueOffsetMinutes
      ? ` • due in ${template.dueOffsetMinutes}m`
      : "";
    desc.textContent = `${priorityLabel}${contextLabel}${tagsLabel}${offsetLabel}`;
    meta.append(title, desc);

    const actions = document.createElement("div");
    actions.className = "template-manager-actions";
    const applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "btn ghost small";
    applyBtn.textContent = "Apply";
    applyBtn.addEventListener("click", () => {
      templateSelectEl.value = template.id;
      applyTemplateToQuickForm(template.id);
      updateAssistStatus(`Applied template: ${template.label}`);
      if (document.body.classList.contains("is-mobile")) {
        document.body.classList.add("capture-sheet-open");
      }
      setStatus(templateStatusEl, `Applied ${template.label} to quick capture.`, "ok");
    });
    actions.appendChild(applyBtn);

    if (!template.builtin) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn ghost small";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTemplate(template.id));
      actions.appendChild(deleteBtn);
    } else {
      const badge = document.createElement("span");
      badge.className = "pill small";
      badge.textContent = "Default";
      actions.appendChild(badge);
    }

    row.append(meta, actions);
    templateManagerListEl.appendChild(row);
  });

  renderTemplateGallery();
}

function deleteTemplate(id) {
  customTemplates = customTemplates.filter(t => t.id !== id);
  localStorage.setItem("hyperplanner.templates", JSON.stringify(customTemplates));
  renderTemplateOptions();
  setStatus(templateStatusEl, "Template removed.", "pending");
}

function saveCurrentTemplate(labelOverride = "") {
  if (isDemoMode) {
    setStatus(templateStatusEl, "Templates are locked in demo. Create an account to save templates.", "error");
    showNotification?.("Templates are locked in demo. Sign up to save.", "info");
    return null;
  }
  const titleFallback = quickTitleEl.value.trim();
  const label = (labelOverride || titleFallback).trim();
  if (!label) {
    updateAssistStatus("Add a title before saving.");
    setStatus(templateStatusEl, "Add a title or template name first.", "error");
    return null;
  }
  const tags = templateTagsInputEl?.value?.trim() || quickTagsEl?.value?.trim() || "";
  const dueOffsetMinutes = Number(templateDueOffsetInputEl?.value || 0);
  const layoutPreset = templateLayoutSelectEl?.value || "";
  const recurringRule = templateRecurringSelectEl?.value || "";
  const template = {
    id: `custom-${Date.now()}`,
    label: label.slice(0, 28),
    title: titleFallback || label,
    description: quickDescriptionEl.value.trim(),
    priority: quickPriorityEl.value,
    context: quickContextEl.value.trim(),
    tags: joinTags(tags),
    reminder: Number(quickReminderEl.value) || 60,
    recurring: recurringRule || smartCapturedRecurring || null,
    dueOffsetMinutes: Number.isFinite(dueOffsetMinutes) ? dueOffsetMinutes : 0,
    layoutPreset
  };
  customTemplates = [template, ...customTemplates].slice(0, 10);
  localStorage.setItem("hyperplanner.templates", JSON.stringify(customTemplates));
  renderTemplateOptions();
  templateSelectEl.value = template.id;
  updateAssistStatus("Template saved.");
  setStatus(templateStatusEl, `Saved ${template.label} for reuse.`, "ok");
  return template;
}

function handleTemplateExport() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    templates: customTemplates.map(normalizeTemplate)
  };
  downloadJson(payload, "hyperplanner-templates.json");
  setStatus(templateStatusEl, "Templates exported.", "ok");
}

function handleTemplateImport() {
  if (templateImportFileEl) {
    templateImportFileEl.value = "";
    templateImportFileEl.click();
    return;
  }
  const raw = prompt("Paste template JSON (array or { templates: [] }):");
  importTemplatesFromRaw(raw);
}

function handleTemplateFileImport(event) {
  const file = event.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target?.result;
    importTemplatesFromRaw(text);
  };
  reader.readAsText(file);
}

function importTemplatesFromRaw(raw) {
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    const incoming = Array.isArray(parsed) ? parsed : Array.isArray(parsed.templates) ? parsed.templates : [];
    if (!incoming.length) throw new Error("No templates found in payload.");
    customTemplates = incoming.map(normalizeTemplate).filter(Boolean).slice(0, 25);
    localStorage.setItem("hyperplanner.templates", JSON.stringify(customTemplates));
    renderTemplateOptions();
    setStatus(templateStatusEl, `Imported ${customTemplates.length} template(s).`, "ok");
  } catch (err) {
    console.error(err);
    setStatus(templateStatusEl, "Import failed. Check JSON format.", "error");
  }
}

function renderTemplateGallery() {
  if (!templateGalleryGridEl) return;
  const templates = listAllTemplates().slice(0, 8).map(normalizeTemplate);
  templateGalleryGridEl.innerHTML = "";
  templates.forEach(tpl => {
    const card = document.createElement("div");
    card.className = "template-gallery-card";
    const h = document.createElement("h5");
    h.textContent = tpl.label;
    const p = document.createElement("p");
    p.textContent = tpl.description || "Quick starter template.";
    const tagsRow = document.createElement("div");
    tagsRow.className = "template-gallery-tags";
    parseTagList(tpl.tags).slice(0, 3).forEach(tag => {
      const chip = document.createElement("span");
      chip.className = "template-gallery-tag";
      chip.textContent = `#${tag}`;
      tagsRow.appendChild(chip);
    });
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn secondary small";
    btn.textContent = "Apply";
    btn.addEventListener("click", () => {
      applyTemplateToQuickForm(tpl.id);
      templateSelectEl.value = tpl.id;
      updateAssistStatus(`Applied template: ${tpl.label}`);
      setStatus(templateStatusEl, `Applied ${tpl.label}.`, "ok");
    });
    card.append(h, p, tagsRow, btn);
    templateGalleryGridEl.appendChild(card);
  });
}

function downloadJson(obj, filename = "export.json") {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildSmartDescription({ title, context, due, priority }) {
  const titleText = title?.trim() || "Your task";
  const ctx = context ? ` in your ${context.toLowerCase()} lane` : "";
  let dueText = " soon";
  if (due) {
    const dt = new Date(due);
    if (!Number.isNaN(dt.getTime())) {
      dueText = ` before ${formatDateTimeForDisplay(dt.toISOString())}`;
    }
  }
  const priorityText = priority ? `${priority.toLowerCase()} priority` : "balanced";
  return `${titleText}${ctx} is scheduled${dueText}. Keep it ${priorityText} by outlining the next action and blockers.`;
}

function adjustReminderInput(value, inputEl) {
  if (!inputEl) return;
  if (!value) {
    if (!inputEl.value) inputEl.value = 60;
    return;
  }
  const reminder = value.includes("T") ? 30 : 180;
  inputEl.value = reminder;
}

function computeSnoozeDate(mode) {
  const base = taskDueDateEl?.value ? new Date(taskDueDateEl.value) : new Date();
  if (Number.isNaN(base.getTime())) return null;
  if (!mode) return null;
  if (!Number.isNaN(Number(mode))) {
    const minutes = Number(mode);
    return new Date(base.getTime() + minutes * 60000);
  }
  if (mode === "tomorrow") {
    const tomorrow = addDays(startOfDay(new Date()), 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow;
  }
  if (mode === "focus") {
    return computeFocusSuggestionDate() || new Date(base.getTime() + 60 * 60000);
  }
  return null;
}

function setSnoozeStatus(message, isError = false) {
  if (!snoozeStatusEl) return;
  snoozeStatusEl.textContent = message;
  snoozeStatusEl.style.color = isError ? "#ef4444" : "#10b981";
}

// ==========================
// LAYOUT CUSTOMIZER
// ==========================

function initPanelLayoutManager() {
  const containers = document.querySelectorAll("[data-panel-container]");
  const panels = document.querySelectorAll("[data-panel-id]");
  if (!containers.length || !panels.length) return;
  captureDefaultPanelLayout();
  loadUserLayouts();
  renderLayoutPresetOptions();
  panels.forEach(panel => insertPanelControls(panel));
  restorePanelLayout();
  restoreHiddenPanels();
  document.getElementById("resetPanelsBtn")?.addEventListener("click", resetPanelLayout);
  document.getElementById("applyLayoutPresetBtn")?.addEventListener("click", () => {
    const select = document.getElementById("layoutPresetSelect");
    if (!select) return;
    applyLayoutPreset(select.value);
  });
  document.getElementById("saveLayoutPresetBtn")?.addEventListener("click", saveCurrentLayoutPreset);
  document.getElementById("layoutPresetSelect")?.addEventListener("change", e => {
    const name = e.target.value;
    // no auto-apply on change; manual apply keeps surprises down
  });
}

function captureDefaultPanelLayout() {
  defaultPanelLayout = {};
  document.querySelectorAll("[data-panel-container]").forEach(container => {
    defaultPanelLayout[container.dataset.panelContainer] = Array.from(
      container.querySelectorAll("[data-panel-id]")
    ).map(panel => panel.dataset.panelId);
  });
  defaultLayoutSnapshot = {
    containers: JSON.parse(JSON.stringify(defaultPanelLayout)),
    hidden: []
  };
}

function insertPanelControls(panel) {
  if (!panel?.dataset.panelId || panel.querySelector(".panel-controls")) return;
  const controls = document.createElement("div");
  controls.className = "panel-controls";
  const handle = document.createElement("button");
  handle.type = "button";
  handle.className = "panel-handle";
  const dotGrid = document.createElement("span");
  dotGrid.className = "panel-handle-dots";
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("span");
    dot.className = "panel-handle-dot";
    dotGrid.appendChild(dot);
  }
  handle.appendChild(dotGrid);
  handle.setAttribute("aria-label", "Drag panel");
  handle.addEventListener("pointerdown", e => startPanelPointerDrag(panel, e));
  const hideBtn = document.createElement("button");
  hideBtn.type = "button";
  hideBtn.className = "panel-hide-btn";
  hideBtn.innerHTML = "&times;";
  hideBtn.setAttribute("aria-label", "Hide panel");
  hideBtn.addEventListener("click", () => hidePanel(panel.dataset.panelId));
  controls.append(handle, hideBtn);
  panel.appendChild(controls);
}

function startPanelPointerDrag(panel, event) {
  if (!panel?.dataset.panelId) return;
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  draggedPanelCardId = panel.dataset.panelId;
  const rect = panel.getBoundingClientRect();
  panelDragOffsetX = event.clientX - rect.left;
  panelDragOffsetY = event.clientY - rect.top;
  const computed = window.getComputedStyle(panel);
  const placeholder = document.createElement("div");
  placeholder.className = "panel-placeholder";
  placeholder.style.height = `${rect.height}px`;
  placeholder.style.width = computed.width;
  const parent = panel.parentElement;
  panelDragData = {
    panel,
    placeholder,
    originalContainer: parent
  };
  parent.insertBefore(placeholder, panel.nextSibling);
  createPanelDragGhost(panel, event, rect);
  panel.remove();
  highlightPanelContainer(parent);
  document.addEventListener("pointermove", handlePanelPointerMove);
  document.addEventListener("pointerup", stopPanelPointerDrag);
}

function handlePanelPointerMove(event) {
  if (!panelDragData) return;
  event.preventDefault();
  updatePanelDragGhostPosition(event);
  const container = findPanelContainerFromPoint(event.clientX, event.clientY);
  if (container) {
    highlightPanelContainer(container);
    const axis = container.dataset.panelAxis || "column";
    const insertBefore = getPanelInsertBefore(container, axis, event.clientX, event.clientY);
    if (insertBefore) {
      container.insertBefore(panelDragData.placeholder, insertBefore);
    } else {
      container.appendChild(panelDragData.placeholder);
    }
  } else {
    highlightPanelContainer(null);
  }
  autoScrollViewport(event.clientY);
}

function stopPanelPointerDrag() {
  if (!panelDragData) return;
  document.removeEventListener("pointermove", handlePanelPointerMove);
  document.removeEventListener("pointerup", stopPanelPointerDrag);
  const { panel, placeholder, originalContainer } = panelDragData;
  const targetContainer = placeholder.parentNode || originalContainer;
  targetContainer.replaceChild(panel, placeholder);
  highlightPanelContainer(null);
  draggedPanelCardId = null;
  panelDragData = null;
  removePanelDragGhost();
  savePanelLayout();
}

function findPanelContainerFromPoint(x, y) {
  const elements = document.elementsFromPoint(x, y);
  return elements.find(el => el?.dataset?.panelContainer) || null;
}

function getPanelInsertBefore(container, axis, x, y) {
  const siblings = Array.from(
    container.querySelectorAll("[data-panel-id]:not(.panel-hidden)")
  ).filter(node => node !== panelDragData?.panel);
  for (const child of siblings) {
    const box = child.getBoundingClientRect();
    const before = axis === "row" ? x < box.left + box.width / 2 : y < box.top + box.height / 2;
    if (before) {
      return child;
    }
  }
  return null;
}

function highlightPanelContainer(container) {
  if (highlightedPanelContainer === container) return;
  highlightedPanelContainer?.classList.remove("is-drop-target");
  highlightedPanelContainer = container;
  highlightedPanelContainer?.classList.add("is-drop-target");
}

function savePanelLayout() {
  const layout = {};
  document.querySelectorAll("[data-panel-container]").forEach(container => {
    layout[container.dataset.panelContainer] = Array.from(
      container.querySelectorAll("[data-panel-id]:not(.panel-hidden)")
    ).map(panel => panel.dataset.panelId);
  });
  localStorage.setItem(PANEL_LAYOUT_KEY, JSON.stringify(layout));
}

function restorePanelLayout() {
  const stored = JSON.parse(localStorage.getItem(PANEL_LAYOUT_KEY) || "{}");
  Object.entries(stored).forEach(([containerKey, panelIds]) => {
    const container = document.querySelector(`[data-panel-container="${containerKey}"]`);
    if (!container) return;
    panelIds.forEach(id => {
      const panel = document.querySelector(`[data-panel-id="${id}"]`);
      if (panel) container.appendChild(panel);
    });
  });
}

function hidePanel(panelId) {
  if (!panelId) return;
  const panel = document.querySelector(`[data-panel-id="${panelId}"]`);
  if (!panel) return;
  panel.classList.add("panel-hidden");
  const hidden = getHiddenPanels();
  hidden.add(panelId);
  saveHiddenPanels(hidden);
  savePanelLayout();
}

function restoreHiddenPanels() {
  const hidden = getHiddenPanels();
  document.querySelectorAll("[data-panel-id]").forEach(panel => {
    if (hidden.has(panel.dataset.panelId)) {
      panel.classList.add("panel-hidden");
    } else {
      panel.classList.remove("panel-hidden");
    }
  });
}

function resetPanelLayout() {
  localStorage.removeItem(PANEL_LAYOUT_KEY);
  localStorage.removeItem(PANEL_HIDDEN_KEY);
  if (defaultLayoutSnapshot) {
    applyLayoutSnapshot(defaultLayoutSnapshot, false);
  } else {
    Object.entries(defaultPanelLayout).forEach(([containerKey, panelIds]) => {
      const container = document.querySelector(`[data-panel-container="${containerKey}"]`);
      if (!container) return;
      panelIds.forEach(id => {
        const panel = document.querySelector(`[data-panel-id="${id}"]`);
        if (panel) {
          panel.classList.remove("panel-hidden");
          container.appendChild(panel);
        }
      });
    });
    savePanelLayout();
    saveHiddenPanels(new Set());
  }
}

function getHiddenPanels() {
  try {
    const stored = JSON.parse(localStorage.getItem(PANEL_HIDDEN_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored : []);
  } catch (err) {
    return new Set();
  }
}

function saveHiddenPanels(set) {
  localStorage.setItem(PANEL_HIDDEN_KEY, JSON.stringify(Array.from(set)));
}

function snapshotCurrentLayout() {
  const containers = {};
  document.querySelectorAll("[data-panel-container]").forEach(container => {
    containers[container.dataset.panelContainer] = Array.from(
      container.querySelectorAll("[data-panel-id]:not(.panel-hidden)")
    ).map(panel => panel.dataset.panelId);
  });
  const hidden = Array.from(getHiddenPanels());
  return { containers, hidden };
}

function applyLayoutSnapshot(snapshot, persist = true) {
  if (!snapshot || !snapshot.containers) return;
  const panelMap = {};
  document.querySelectorAll("[data-panel-id]").forEach(panel => {
    panelMap[panel.dataset.panelId] = panel;
  });

  Object.entries(snapshot.containers).forEach(([containerKey, panelIds]) => {
    const container = document.querySelector(`[data-panel-container="${containerKey}"]`);
    if (!container) return;
    panelIds.forEach(id => {
      const panel = panelMap[id];
      if (panel) {
        panel.classList.remove("panel-hidden");
        container.appendChild(panel);
      }
    });
  });

  // Hide panels per snapshot
  const hiddenSet = new Set(snapshot.hidden || []);
  document.querySelectorAll("[data-panel-id]").forEach(panel => {
    if (hiddenSet.has(panel.dataset.panelId)) {
      panel.classList.add("panel-hidden");
    } else {
      panel.classList.remove("panel-hidden");
    }
  });

  // Save if requested
  if (persist) {
    saveHiddenPanels(hiddenSet);
    savePanelLayout();
  }
}

function loadUserLayouts() {
  try {
    const raw = localStorage.getItem(USER_LAYOUTS_KEY) || "{}";
    const parsed = JSON.parse(raw);
    userLayouts = parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    userLayouts = {};
  }
}

function saveUserLayouts() {
  localStorage.setItem(USER_LAYOUTS_KEY, JSON.stringify(userLayouts));
}

function renderLayoutPresetOptions() {
  const select = document.getElementById("layoutPresetSelect");
  if (!select) return;
  const preserve = select.value;
  select.innerHTML = "";
  const builtins = [
    { value: "default", label: "Default" },
    { value: "minimal", label: "Minimal" },
    { value: "dense", label: "Dense" },
    { value: "creative", label: "Creative" },
    { value: "dashboard", label: "Dashboard" },
    { value: "kanban", label: "Kanban-first" }
  ];
  [...builtins, ...Object.keys(userLayouts).map(key => ({ value: `user:${key}`, label: `Saved · ${key}` }))].forEach(
    opt => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      select.appendChild(o);
    }
  );
  if (preserve) {
    select.value = preserve;
  }
}

function syncLayoutPresetSelect(value) {
  const select = document.getElementById("layoutPresetSelect");
  if (!select) return;
  const hasOption = Array.from(select.options).some(opt => opt.value === value);
  if (hasOption) select.value = value;
}

function rememberLayoutOnboarding() {
  if (layoutOnboardingRememberEl?.checked !== false) {
    localStorage.setItem(LAYOUT_ONBOARDING_KEY, "dismissed");
  }
}

function hideLayoutOnboarding() {
  layoutOnboardingEl?.classList.add("hidden");
}

function handleLayoutChoicePick(layoutName) {
  if (!layoutName) return;
  applyLayoutPreset(layoutName);
  syncLayoutPresetSelect(layoutName);
  rememberLayoutOnboarding();
  hideLayoutOnboarding();
  promptLocalCalendarOptIn();
}

function initLayoutOnboardingPrompt() {
  if (!layoutOnboardingEl) return;
  layoutChoiceButtons.forEach(btn => {
    btn.addEventListener("click", () => handleLayoutChoicePick(btn.dataset.layoutChoice));
  });
  skipLayoutOnboardingBtn?.addEventListener("click", () => {
    rememberLayoutOnboarding();
    hideLayoutOnboarding();
  });

  const dismissed = localStorage.getItem(LAYOUT_ONBOARDING_KEY) === "dismissed";
  const hasSavedLayout = localStorage.getItem(PANEL_LAYOUT_KEY);
  if (dismissed || hasSavedLayout) return;
  layoutOnboardingEl.classList.remove("hidden");
}

function promptLocalCalendarOptIn() {
  const current = loadLocalCalendarSettings();
  if (current.optIn) return;
  const wants = confirm("Share an anonymized local calendar view with nearby users? (You can change this later in Settings.)");
  if (wants) {
    const county = prompt("Enter your county/region (optional, e.g. Orange County, CA):") || "";
    saveLocalCalendarSettings({ optIn: true, county });
    syncLocalCalendarSettings();
  }
}

function applyLayoutPreset(name) {
  if (!name) return;
  let snapshot = null;
  if (name === "default" && defaultLayoutSnapshot) {
    snapshot = defaultLayoutSnapshot;
  } else if (name.startsWith("user:")) {
    const key = name.replace("user:", "");
    snapshot = userLayouts[key];
  } else if (LAYOUT_PRESETS[name]) {
    snapshot = LAYOUT_PRESETS[name];
  }
  if (!snapshot) return;
  applyLayoutSnapshot(snapshot, true);
}

function saveCurrentLayoutPreset() {
  const name = prompt("Name this layout preset:");
  if (!name) return;
  const key = name.trim().slice(0, 40);
  if (!key) return;
  const snapshot = snapshotCurrentLayout();
  userLayouts = { ...userLayouts, [key]: snapshot };
  saveUserLayouts();
  renderLayoutPresetOptions();
  const select = document.getElementById("layoutPresetSelect");
  if (select) select.value = `user:${key}`;
}

function createPanelDragGhost(panel, event, rect) {
  removePanelDragGhost();
  panelDragGhost = panel.cloneNode(true);
  panelDragGhost.classList.add("panel-drag-ghost");
  const width = rect?.width || panel.offsetWidth;
  const height = rect?.height || panel.offsetHeight;
  panelDragGhost.style.width = `${width}px`;
  panelDragGhost.style.height = `${height}px`;
  panelDragGhost.style.pointerEvents = "none";
  document.body.appendChild(panelDragGhost);
  updatePanelDragGhostPosition(event);
}

function updatePanelDragGhostPosition(event) {
  if (!panelDragGhost) return;
  const offsetX = panelDragOffsetX || 0;
  const offsetY = panelDragOffsetY || 0;
  panelDragGhost.style.left = `${event.clientX - offsetX}px`;
  panelDragGhost.style.top = `${event.clientY - offsetY}px`;
}

function removePanelDragGhost() {
  if (panelDragGhost?.parentNode) {
    panelDragGhost.parentNode.removeChild(panelDragGhost);
  }
  panelDragGhost = null;
}

function autoScrollViewport(y) {
  const threshold = 120;
  if (y < threshold) {
    window.scrollBy({ top: -30, behavior: "smooth" });
  } else if (window.innerHeight - y < threshold) {
    window.scrollBy({ top: 30, behavior: "smooth" });
  }
}

function openLocationInMaps(location) {
  if (!location) {
    alert("Enter an address first.");
    return;
  }
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  window.open(url, "_blank", "noopener");
}

function setLocationStatus(el, message, tone = "muted") {
  if (!el) return;
  el.textContent = message || "";
  el.classList.remove("is-error", "is-success");
  if (tone === "error") {
    el.classList.add("is-error");
  } else if (tone === "success") {
    el.classList.add("is-success");
  }
}

async function fillCurrentLocation(inputEl, statusEl) {
  if (!inputEl) return null;
  const assign = value => {
    if (!value) return;
    inputEl.value = value;
    inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  };

  setLocationStatus(statusEl, "Locating device…");
  try {
    const coords = await requestPreciseCoordinates();
    const displayName = await reverseGeocode(coords.latitude, coords.longitude);
    assign(displayName);
    setLocationStatus(statusEl, "Precise location captured.", "success");
    return displayName;
  } catch (geoErr) {
    const friendly = describeGeolocationError(geoErr);
    console.info("Precise geolocation unavailable:", friendly);
    setLocationStatus(statusEl, `${friendly}. Trying network fallback…`);
  }

  try {
    const fallbackLabel = await lookupLocationByIP();
    assign(fallbackLabel);
    setLocationStatus(statusEl, "Approximate location applied — refine if needed.");
    return fallbackLabel;
  } catch (err) {
    const friendly = err?.message || "Network lookup failed";
    console.error("Auto location failed:", friendly);
    setLocationStatus(statusEl, `Unable to determine location (${friendly}).`, "error");
    return null;
  }
}

function describeGeolocationError(error) {
  if (!error) return "GPS unavailable";
  if (typeof error === "string") return error;
  if (typeof error.code === "number") {
    switch (error.code) {
      case 1:
        return "Location permission denied";
      case 2:
        return "Location signal unavailable";
      case 3:
        return "Location request timed out";
      default:
        break;
    }
  }
  return error.message || "GPS unavailable";
}

function requestPreciseCoordinates() {
  if (!navigator.geolocation) {
    return Promise.reject(new Error("Geolocation not supported"));
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

async function lookupLocationByIP() {
  const res = await fetch("https://ipapi.co/json/");
  if (!res.ok) throw new Error("IP lookup failed");
  const data = await res.json();
  if (data?.latitude && data?.longitude) {
    try {
      return await reverseGeocode(data.latitude, data.longitude);
    } catch (err) {
      console.info("Reverse geocode fallback failed, using coordinates.");
      return `${data.latitude.toFixed(5)}, ${data.longitude.toFixed(5)}`;
    }
  }
  if (data?.city) {
    return `${data.city}, ${data.region || ""} ${data.country_name || ""}`.trim();
  }
  if (data?.ip) {
    return `Near ${data.ip}`;
  }
  throw new Error("No network location data");
}

async function reverseGeocode(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" }
  });
  if (!res.ok) throw new Error("Reverse geocode failed");
  const data = await res.json();
  if (data?.display_name) return data.display_name;
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

function setupLocationAutocomplete(inputEl, suggestionsEl) {
  if (!inputEl || !suggestionsEl) return;
  let timer = null;
  inputEl.addEventListener("input", () => {
    const value = inputEl.value.trim();
    if (timer) clearTimeout(timer);
    if (value.length < 3) {
      hideSuggestions(suggestionsEl);
      return;
    }
    timer = setTimeout(async () => {
      try {
        const suggestions = await fetchLocationSuggestions(value);
        renderLocationSuggestions(inputEl, suggestionsEl, suggestions);
      } catch (err) {
        console.error(err);
        hideSuggestions(suggestionsEl);
      }
    }, LOCATION_DEBOUNCE_MS);
  });

  document.addEventListener("click", e => {
    if (e.target !== inputEl && !suggestionsEl.contains(e.target)) {
      hideSuggestions(suggestionsEl);
    }
  });
}

async function fetchLocationSuggestions(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=${LOCATION_SUGGESTION_LIMIT}&q=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Suggestion fetch failed");
  const data = await res.json();
  return data.map(item => ({
    label: item.display_name,
    value: item.display_name
  }));
}

function renderLocationSuggestions(inputEl, container, suggestions) {
  if (!suggestions.length) {
    hideSuggestions(container);
    return;
  }
  container.innerHTML = suggestions
    .map(
      suggestion =>
        `<button type="button" data-value="${escapeHtml(suggestion.value)}">${escapeHtml(
          suggestion.label
        )}</button>`
    )
    .join("");
  container.classList.add("active");
  Array.from(container.querySelectorAll("button")).forEach(btn => {
    btn.addEventListener("click", () => {
      inputEl.value = btn.dataset.value || "";
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
      hideSuggestions(container);
    });
  });
}

function hideSuggestions(container) {
  container.innerHTML = "";
  container.classList.remove("active");
}

function setCalendarDensity(minutes) {
  if (!CALENDAR_DENSITIES.includes(minutes) || calendarDensity === minutes) return;
  calendarDensity = minutes;
  densityButtons.forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.density) === minutes);
  });
  renderCalendar(currentTasks);
}

function buildTimeSlots(startHour, endHour, interval) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      slots.push({
        hour,
        minute,
        key: `${hour}:${minute}`
      });
    }
  }
  return slots;
}

function getSlotKey(date, interval) {
  const hour = date.getHours();
  let minute = interval >= 60 ? 0 : Math.floor(date.getMinutes() / interval) * interval;
  if (minute >= 60) minute = 0;
  return `${hour}:${minute}`;
}

function formatSlotLabel(slot) {
  if (calendarDensity <= 30 || slot.minute === 0) {
    return formatTimeLabel(slot.hour, slot.minute);
  }
  return `:${String(slot.minute).padStart(2, "0")}`;
}

function computeTaskSpan(task, interval) {
  const start = task.start_time ? new Date(task.start_time) : task.due_date ? new Date(task.due_date) : null;
  if (!start || Number.isNaN(start.getTime())) return 1;
  const end = task.end_time ? new Date(task.end_time) : null;
  if (!end || Number.isNaN(end.getTime())) return 1;
  const minutes = Math.max(0, (end.getTime() - start.getTime()) / 60000);
  return Math.max(1, Math.ceil(minutes / interval));
}

function formatTimeLabel(hour, minute = 0) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = ((hour + 11) % 12) + 1;
  const min = String(minute).padStart(2, "0");
  return `${hour12}:${min} ${suffix}`;
}

function updateContextualTheme(tasks) {
  if (!Array.isArray(tasks) || !tasks.length) {
    contextualThemeKey = "default";
    updateActiveTheme("no_tasks");
    return;
  }
  const counts = tasks.reduce((acc, task) => {
    const theme = deriveThemeKey(task.context);
    if (!theme) return acc;
    acc[theme] = (acc[theme] || 0) + 1;
    return acc;
  }, {});
  let dominant = "default";
  let maxCount = 0;
  Object.entries(counts).forEach(([theme, count]) => {
    if (count > maxCount) {
      dominant = theme;
      maxCount = count;
    }
  });
  contextualThemeKey = maxCount < 2 ? "default" : dominant;
  updateActiveTheme("contextual");
}

function deriveThemeKey(context) {
  if (!context) return "";
  const lower = context.toLowerCase().trim();
  if (THEME_CONTEXT_MAP[lower]) return THEME_CONTEXT_MAP[lower];
  const parts = lower.split(/[\s-_]+/);
  for (const part of parts) {
    if (THEME_CONTEXT_MAP[part]) return THEME_CONTEXT_MAP[part];
  }
  return "";
}

function applyTheme(theme, { force = false } = {}) {
  if (!force && themeLockEnabled && theme !== "custom") return;
  if (!document?.body) return;
  if (currentThemeKey !== theme) {
    currentThemeKey = theme;
    document.body.dataset.theme = theme;
  }
}

function updateActiveTheme(reason = "context") {
  const view = currentView || "calendar";
  const override = viewThemeOverrides[view] || "auto";
  if (themeLockEnabled) {
    applyTheme("custom", { force: true });
    return;
  }
  if (override === "custom") {
    applyTheme("custom", { force: true });
    return;
  }
  if (override && override !== "auto") {
    applyTheme(override, { force: true });
    return;
  }
  applyTheme(contextualThemeKey || "default", { force: true });
}

// ==========================
// MOBILE UI
// ==========================

function syncMobileModeFlag() {
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  isMobileView = mobile;
  document.body.classList.toggle("is-mobile", mobile);
  if (!mobile) {
    document.body.classList.remove("capture-sheet-open");
  } else if (!document.querySelector(".mobile-tab.active")) {
    setMobileTab("panel-email");
  }
}

function handleOpenCaptureSheet() {
  if (isMobileView) {
    document.body.classList.add("capture-sheet-open");
    quickTitleEl?.focus();
  } else if (quickForm) {
    quickForm.scrollIntoView({ behavior: "smooth", block: "start" });
    quickTitleEl?.focus();
  }
}

function closeCaptureSheet() {
  document.body.classList.remove("capture-sheet-open");
}

function setMobileTab(targetId) {
  const target =
    targetId || document.querySelector(".mobile-tab.active")?.dataset.mobileTab || "panel-email";
  mobileTabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mobileTab === target);
  });
  document.querySelectorAll(".column-right [data-panel-id]").forEach(panel => {
    panel.classList.toggle("mobile-tab-active", panel.dataset.panelId === target);
  });
}

function initMobileTabs() {
  if (!mobileTabButtons.length) return;
  mobileTabButtons.forEach(btn => {
    btn.addEventListener("click", () => setMobileTab(btn.dataset.mobileTab));
  });
  setMobileTab(document.querySelector(".mobile-tab.active")?.dataset.mobileTab || "panel-email");
}

function initMobileLayoutControls() {
  syncMobileModeFlag();
  window.addEventListener("resize", syncMobileModeFlag);
  initMobileTabs();
  openCaptureSheetBtn?.addEventListener("click", handleOpenCaptureSheet);
  closeCaptureSheetBtn?.addEventListener("click", closeCaptureSheet);
  captureSheetBackdrop?.addEventListener("click", closeCaptureSheet);
}

// ==========================
// WIDGET DRAWER
// ==========================

function openWidgetDrawer() {
  if (!widgetDrawerEl) return;
  widgetDrawerEl.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeWidgetDrawer() {
  widgetDrawerEl?.classList.remove("open");
  document.body.style.overflow = "";
}

function initWidgetDrawer() {
  if (!widgetDrawerEl) return;
  openWidgetDrawerBtn?.addEventListener("click", openWidgetDrawer);
  closeWidgetDrawerBtn?.addEventListener("click", closeWidgetDrawer);
  widgetDrawerBackdrop?.addEventListener("click", closeWidgetDrawer);
  widgetLayoutButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      applyLayoutPreset(btn.dataset.widgetLayout);
      closeWidgetDrawer();
    });
  });
  widgetTemplateListBtn?.addEventListener("click", () => {
    closeWidgetDrawer();
    document.getElementById("templateManagerList")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  widgetSaveTemplateBtn?.addEventListener("click", () => {
    saveCurrentTemplate(templateNameInputEl?.value);
    closeWidgetDrawer();
  });
  widgetSpaceSaverToggle?.addEventListener("change", () => {
    applySpaceSaverMode(widgetSpaceSaverToggle.checked, true);
  });
  jumpToSettingsBtn?.addEventListener("click", () => {
    closeWidgetDrawer();
    const settingsPanel = document.querySelector('[data-panel-id="panel-settings"]');
    if (settingsPanel?.open !== undefined) settingsPanel.open = true;
    settingsPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  jumpToThemeBtn?.addEventListener("click", () => {
    closeWidgetDrawer();
    const themePanel = document.querySelector('[data-panel-id="panel-theme"]');
    if (themePanel?.open !== undefined) themePanel.open = true;
    themePanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && widgetDrawerEl?.classList.contains("open")) {
      closeWidgetDrawer();
    }
  });
}

function applySpaceSaverMode(enabled, persist = false) {
  document.body.classList.toggle("space-saver-on", !!enabled);
  if (widgetSpaceSaverToggle) widgetSpaceSaverToggle.checked = !!enabled;
  if (persist) {
    localStorage.setItem(SPACE_SAVER_KEY, enabled ? "1" : "0");
  }
}

function loadSpaceSaverMode() {
  const stored = localStorage.getItem(SPACE_SAVER_KEY);
  const enabled = stored === "1";
  applySpaceSaverMode(enabled, false);
}

// ==========================
// THEME LAB
// ==========================

function setThemeVariables(target, t) {
  if (!target) return;
  target.setProperty("--accent", t.accent);
  target.setProperty("--accent-strong", t.accent);
  target.setProperty("--accent-soft", hexToRgba(t.accent, 0.12));
  target.setProperty("--accent-gradient", t.accentGradient || `linear-gradient(120deg, ${t.accent}, ${t.accent})`);
  target.setProperty("--page-bg", t.pageBg);
  const gradientA = t.gradientA
    ? (t.gradientA.includes("rgb") ? t.gradientA : hexToRgba(t.gradientA, 0.22))
    : hexToRgba(t.accent, 0.22);
  const gradientB = t.gradientB
    ? (t.gradientB.includes("rgb") ? t.gradientB : hexToRgba(t.gradientB, 0.16))
    : hexToRgba(t.accent, 0.16);
  const gradientC = t.gradientC
    ? (t.gradientC.includes("rgb") ? t.gradientC : hexToRgba(t.gradientC, 0.18))
    : hexToRgba(t.accent, 0.18);
  target.setProperty("--page-gradient-a", gradientA);
  target.setProperty("--page-gradient-b", gradientB);
  target.setProperty("--page-gradient-c", gradientC);
  const cardGlass = t.cardGlass?.startsWith("#") ? hexToRgba(t.cardGlass, 0.92) : t.cardGlass;
  const cardGlassMuted =
    (t.cardGlassMuted || t.cardGlass)?.startsWith("#")
      ? hexToRgba(t.cardGlassMuted || t.cardGlass, 0.8)
      : t.cardGlassMuted || t.cardGlass;
  target.setProperty("--card-glass", cardGlass);
  target.setProperty("--card-glass-muted", cardGlassMuted);
  target.setProperty("--surface-1", cardGlass);
  target.setProperty("--surface-2", cardGlassMuted);
  target.setProperty("--surface-3", t.borderStrong || "rgba(148, 163, 184, 0.25)");
  target.setProperty("--border-glass", t.borderGlass || "rgba(255,255,255,0.7)");
  target.setProperty("--border-strong", t.borderStrong || "rgba(148, 163, 184, 0.35)");
  target.setProperty("--text-main", t.textMain);
  target.setProperty("--text-muted", t.textMuted);
  target.setProperty("--text-soft", t.textSoft || t.textMuted);
  target.setProperty("--color-accent", t.accent);
  target.setProperty("--color-page-base", t.pageBg);
  target.setProperty("--color-card-bg", cardGlass || t.pageBg);
  target.setProperty("--color-chip-bg", cardGlassMuted || cardGlass || t.pageBg);
  target.setProperty("--color-danger", t.prioHigh || "#ef4444");
  target.setProperty("--color-warning", t.prioMed || "#f59e0b");
  target.setProperty("--color-success", t.prioLow || "#22c55e");
  target.setProperty("--color-muted", t.textMuted || "#6b7280");

  target.setProperty("--color-accent-foreground", pickContrastingText(t.accent));
  target.setProperty("--color-card-foreground", pickContrastingText(cardGlass || t.cardGlass || t.pageBg));
  target.setProperty("--color-chip-foreground", pickContrastingText(cardGlassMuted || cardGlass || t.pageBg));
  target.setProperty("--color-danger-foreground", pickContrastingText(t.prioHigh || "#ef4444"));
  target.setProperty("--color-warning-foreground", pickContrastingText(t.prioMed || "#f59e0b"));
  target.setProperty("--color-success-foreground", pickContrastingText(t.prioLow || "#22c55e"));
  target.setProperty("--selection-bg", hexToRgba(t.accent, 0.28));
  target.setProperty("--selection-fg", pickContrastingText(cardGlass || t.cardGlass || t.pageBg));
  target.setProperty("--input-fg", pickContrastingText(cardGlass || t.cardGlass || t.pageBg));
  target.setProperty("--prio-high", t.prioHigh);
  target.setProperty("--prio-high-bg", t.prioHighBg || hexToRgba(t.prioHigh, 0.16));
  target.setProperty("--prio-medium", t.prioMed);
  target.setProperty("--prio-medium-bg", t.prioMedBg || hexToRgba(t.prioMed, 0.16));
  target.setProperty("--prio-low", t.prioLow);
  target.setProperty("--prio-low-bg", t.prioLowBg || hexToRgba(t.prioLow, 0.16));
  target.setProperty("--radius-lg", `${t.radiusLg || 22}px`);
  target.setProperty("--radius-md", `${t.radiusMd || 12}px`);
  target.setProperty("--radius-sm", `${t.radiusSm || 8}px`);
  const shadowSoft =
    t.shadow === "flat"
      ? "0 4px 12px rgba(15,23,42,0.08)"
      : t.shadow === "lift"
      ? "0 18px 45px rgba(15,23,42,0.2)"
      : "0 15px 45px rgba(15,23,42,0.12)";
  const shadowLift =
    t.shadow === "flat"
      ? "0 10px 18px rgba(15,23,42,0.12)"
      : t.shadow === "lift"
      ? "0 32px 78px rgba(15,23,42,0.22)"
      : "0 30px 65px rgba(15,23,42,0.18)";
  target.setProperty("--shadow-soft", shadowSoft);
  target.setProperty("--shadow-lift", shadowLift);
  const inputBg = t.inputBg || t.surfaceInput || t.cardGlass || t.surface1 || t.pageBg;
  const inputFg = pickContrastingText(inputBg);
  target.setProperty("--input-bg", inputBg);
  target.setProperty("--input-fg", inputFg);
}

function applyThemeTokens(theme, targetStyle) {
  const root = targetStyle || document.documentElement?.style;
  if (!root) return;
  const readableTheme = ensureReadableTheme({ ...DEFAULT_THEME, ...theme });
  const t = { ...DEFAULT_THEME, ...readableTheme };
  setThemeVariables(root, t);
  if (!targetStyle) {
    customTheme = { ...t };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(customTheme));
  }
}

function applyQuickTheme(key) {
  const presetKey = QUICK_THEME_MAP[key] || key;
  if (!THEME_PRESETS[presetKey]) return;
  customTheme = { ...DEFAULT_THEME, ...THEME_PRESETS[presetKey] };
  applyThemeTokens(customTheme);
  renderThemePreviews(customTheme);
  syncThemeForm();
  renderThemeValidation(customTheme, `${capitalize(key.replace(/([A-Z])/g, " $1"))} theme applied.`);
  updateActiveTheme("quick-theme");
}

function computePackTheme(base, { background, cardStyle, edges, accent }) {
  const t = { ...DEFAULT_THEME, ...base };
  if (accent) t.accent = accent;
  if (background === "solid") {
    t.gradientA = hexToRgba(t.pageBg, 0.06);
    t.gradientB = hexToRgba(t.pageBg, 0.06);
    t.gradientC = hexToRgba(t.pageBg, 0.08);
  } else if (background === "texture") {
    t.gradientA = hexToRgba(t.accent, 0.12);
    t.gradientB = hexToRgba("#f6f5f0", 0.18);
    t.gradientC = hexToRgba(t.accent, 0.08);
    t.cardGlass = t.cardGlass || "rgba(255,255,255,0.94)";
  }
  if (cardStyle === "flat") {
    t.shadow = "flat";
    t.cardGlass = t.cardGlass || "rgba(255,255,255,0.96)";
  } else if (cardStyle === "glass") {
    t.shadow = "lift";
    t.cardGlass = t.cardGlass || "rgba(255,255,255,0.8)";
    t.cardGlassMuted = t.cardGlassMuted || "rgba(255,255,255,0.65)";
  } else {
    t.shadow = "soft";
  }
  const radius =
    edges === "pill" ? 28 : edges === "rounded" ? 22 : edges === "medium" ? 16 : 10;
  t.radiusLg = radius;
  t.radiusMd = Math.max(10, radius - 6);
  t.radiusSm = Math.max(8, radius - 10);
  return t;
}

function syncPackControls(packName) {
  const pack = THEME_PACKS[packName] || THEME_PACKS.productivity;
  if (!pack) return;
  themePackSelectEl.value = packName;
  themePackBackgroundEl.value = pack.defaults.background;
  themePackCardStyleEl.value = pack.defaults.cardStyle;
  themePackEdgesEl.value = pack.defaults.edges;
  if (themePackAccentEl) themePackAccentEl.value = rgbaToHex(pack.theme.accent || customTheme.accent);
}

function applyThemePack(name) {
  const pack = THEME_PACKS[name] || THEME_PACKS.productivity;
  const accent = themePackAccentEl?.value || pack.theme.accent;
  const background = themePackBackgroundEl?.value || pack.defaults.background;
  const cardStyle = themePackCardStyleEl?.value || pack.defaults.cardStyle;
  const edges = themePackEdgesEl?.value || pack.defaults.edges;
  const t = computePackTheme(pack.theme, { background, cardStyle, edges, accent });
  applyThemeTokens(t);
  renderThemePreviews(t);
  syncThemeForm();
  renderThemeValidation(t, `${pack.label} pack applied.`);
  updateActiveTheme("theme-pack");
}

function toggleAdvancedThemePanel(force) {
  const show = typeof force === "boolean" ? force : !advancedThemeVisible;
  advancedThemeVisible = show;
  if (themeAdvancedPanel) themeAdvancedPanel.classList.toggle("hidden", !show);
  if (toggleAdvancedThemeBtn) toggleAdvancedThemeBtn.textContent = show ? "Hide advanced" : "Show advanced";
}

function renderThemePreviews(theme = customTheme) {
  const resolved = { ...DEFAULT_THEME, ...theme };
  const targets = [
    themePreviewCalendarEl?.style,
    themePreviewTasksEl?.style,
  ].filter(Boolean);
  targets.forEach(target => setThemeVariables(target, resolved));
}
function loadLocalCalendarSettings() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CALENDAR_KEY) || "{}");
  } catch (_) {
    return {};
  }
}

function saveLocalCalendarSettings(settings) {
  localStorage.setItem(LOCAL_CALENDAR_KEY, JSON.stringify(settings));
}

function syncLocalCalendarSettings() {
  const stored = loadLocalCalendarSettings();
  if (localCalendarToggleEl) localCalendarToggleEl.checked = !!stored.optIn;
  if (localCalendarCountyEl) localCalendarCountyEl.value = stored.county || "";
  if (localCalendarStatusEl) {
    if (stored.optIn && stored.county) {
      localCalendarStatusEl.textContent = `Sharing anonymized calendar view for ${stored.county}.`;
      localCalendarStatusEl.classList.add("is-on");
    } else if (stored.optIn) {
      localCalendarStatusEl.textContent = "Opted in. Add a county to appear locally.";
      localCalendarStatusEl.classList.remove("is-on");
    } else {
      localCalendarStatusEl.textContent = "Local sharing is off.";
      localCalendarStatusEl.classList.remove("is-on");
    }
  }
}

function loadViewThemeOverrides() {
  try {
    const stored = JSON.parse(localStorage.getItem(THEME_VIEW_OVERRIDE_KEY) || "{}");
    viewThemeOverrides = { ...VIEW_THEME_DEFAULTS, ...(stored || {}) };
  } catch (err) {
    viewThemeOverrides = { ...VIEW_THEME_DEFAULTS };
  }
}

function persistViewThemeOverrides() {
  localStorage.setItem(THEME_VIEW_OVERRIDE_KEY, JSON.stringify(viewThemeOverrides));
}

function describeThemeOverride(label, value = "auto") {
  if (value === "custom") return `${label}: Custom theme`;
  if (!value || value === "auto") return `${label}: Auto (context)`;
  return `${label}: ${capitalize(value)}`;
}

function syncThemeOverrideControls() {
  if (themeOverrideCalendarEl) themeOverrideCalendarEl.value = viewThemeOverrides.calendar || "auto";
  if (themeOverrideTasksEl) themeOverrideTasksEl.value = viewThemeOverrides.tasks || "auto";
  if (themePreviewCalendarEl)
    themePreviewCalendarEl.classList.toggle("is-override", (viewThemeOverrides.calendar || "auto") !== "auto");
  if (themePreviewTasksEl)
    themePreviewTasksEl.classList.toggle("is-override", (viewThemeOverrides.tasks || "auto") !== "auto");
  const summary = [
    describeThemeOverride("Calendar", viewThemeOverrides.calendar),
    describeThemeOverride("Tasks", viewThemeOverrides.tasks)
  ].join(" · ");
  if (themeOverrideStatusEl) {
    const tone = themeLockEnabled ? "pending" : summary.includes("Auto") ? "pending" : "ok";
    const suffix = themeLockEnabled ? " · Lock keeps custom theme active." : "";
    setStatus(themeOverrideStatusEl, `${summary}${suffix}`, tone);
  }
}

function handleThemeOverrideChange(view, value) {
  if (!view) return;
  const normalized = THEME_OVERRIDE_OPTIONS.includes(value) ? value : "auto";
  viewThemeOverrides = { ...viewThemeOverrides, [view]: normalized };
  persistViewThemeOverrides();
  syncThemeOverrideControls();
  updateActiveTheme("override-change");
}

function parseCssColor(value) {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) {
    let hex = trimmed.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(ch => ch + ch).join("");
    if (hex.length !== 6) return null;
    const num = parseInt(hex, 16);
    if (Number.isNaN(num)) return null;
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
      a: 1
    };
  }
  const rgbaMatch = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(",").map(p => p.trim());
    if (parts.length < 3) return null;
    const rgb = parts.slice(0, 3).map(Number);
    if (rgb.some(v => Number.isNaN(v))) return null;
    const alpha = parts[3] !== undefined ? Number(parts[3]) : 1;
    return { r: rgb[0], g: rgb[1], b: rgb[2], a: Number.isNaN(alpha) ? 1 : alpha };
  }
  return null;
}

function blendOnBackground(top, bottom) {
  if (!top) return bottom;
  if (!bottom) return top;
  const alpha = Math.max(0, Math.min(1, top.a ?? 1));
  return {
    r: Math.round(top.r * alpha + bottom.r * (1 - alpha)),
    g: Math.round(top.g * alpha + bottom.g * (1 - alpha)),
    b: Math.round(top.b * alpha + bottom.b * (1 - alpha)),
    a: 1
  };
}

function relativeLuminance({ r, g, b }) {
  const normalize = channel => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const [lr, lg, lb] = [normalize(r), normalize(g), normalize(b)];
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrastRatio(a, b) {
  if (!a || !b) return null;
  const lumA = relativeLuminance(a);
  const lumB = relativeLuminance(b);
  const [lighter, darker] = lumA >= lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
}

function formatContrast(value) {
  if (!value || Number.isNaN(value)) return "";
  return `${value.toFixed(1)}x`;
}

function colorToCss(color) {
  if (!color) return "";
  const alpha = color.a === undefined ? 1 : color.a;
  return alpha === 1
    ? `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`
    : `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${alpha})`;
}

function mixColors(top, bottom, opacity = 0.5) {
  if (!top || !bottom) return top || bottom;
  const alpha = Math.max(0, Math.min(1, opacity));
  return {
    r: Math.round(top.r * (1 - alpha) + bottom.r * alpha),
    g: Math.round(top.g * (1 - alpha) + bottom.g * alpha),
    b: Math.round(top.b * (1 - alpha) + bottom.b * alpha),
    a: 1
  };
}

function pickContrastingText(colorValue) {
  const rgb =
    typeof colorValue === "string" ? parseCssColor(colorValue) : colorValue?.r ? colorValue : null;
  const base = rgb || { r: 255, g: 255, b: 255, a: 1 };
  const bgLum = relativeLuminance(base);
  const whiteLum = 1;
  const blackLum = 0;
  const contrastWhite = (whiteLum + 0.05) / (bgLum + 0.05);
  const contrastBlack = (bgLum + 0.05) / (blackLum + 0.05);
  const highContrastWhite = contrastWhite >= 4.5;
  const highContrastBlack = contrastBlack >= 4.5;
  if (highContrastWhite && !highContrastBlack) return "#ffffff";
  if (highContrastBlack && !highContrastWhite) return "#000000";
  return contrastWhite >= contrastBlack ? "#ffffff" : "#000000";
}

function ensureReadableTheme(theme) {
  const t = { ...theme };
  const page = parseCssColor(t.pageBg) || { r: 232, g: 236, b: 247, a: 1 };
  const pageLum = relativeLuminance(page);
  const isDark = pageLum < 0.3;

  const providedMain = parseCssColor(t.textMain);
  const mainContrast = providedMain ? contrastRatio(page, providedMain) : null;
  const mainColor =
    providedMain && mainContrast && mainContrast >= 4.5
      ? providedMain
      : parseCssColor(pickContrastingText(page)) || { r: 15, g: 18, b: 36, a: 1 };

  const adjustContrast = (base, targetContrast, fallbackTone = "main") => {
    const parsed = parseCssColor(base);
    if (parsed && contrastRatio(page, parsed) >= targetContrast) return parsed;
    if (fallbackTone === "main") return mainColor;
    const anchor = fallbackTone === "light" ? { r: 255, g: 255, b: 255, a: 1 } : { r: 0, g: 0, b: 0, a: 1 };
    let candidate = mixColors(anchor, page, isDark ? 0.2 : 0.55);
    if (contrastRatio(page, candidate) < targetContrast) candidate = mainColor;
    return candidate;
  };

  const muteFallback = adjustContrast(t.textMuted, 3, isDark ? "light" : "dark");
  const softFallback = adjustContrast(t.textSoft, 2.2, isDark ? "light" : "dark");

  t.textMain = colorToCss(mainColor);
  t.textMuted = colorToCss(muteFallback);
  t.textSoft = colorToCss(softFallback);

  // Surface safety: lift glass backgrounds slightly off pure black in dark modes
  const glass = parseCssColor(t.cardGlass);
  const glassMuted = parseCssColor(t.cardGlassMuted);
  const defaultGlassDark = { r: 18, g: 18, b: 20, a: 0.94 };
  const defaultGlassMutedDark = { r: 30, g: 32, b: 36, a: 0.86 };
  if (isDark && (!glass || contrastRatio(page, glass) < 1.2)) {
    t.cardGlass = colorToCss(defaultGlassDark);
  }
  if (isDark && (!glassMuted || contrastRatio(page, glassMuted) < 1.2)) {
    t.cardGlassMuted = colorToCss(defaultGlassMutedDark);
  }

  if (isDark) {
    t.borderGlass = t.borderGlass || "rgba(255,255,255,0.18)";
    t.borderStrong = t.borderStrong || "rgba(255,255,255,0.2)";
  }

  // Input surface defaults to cardGlassMuted in dark mode for contrast
  if (isDark) {
    t.inputBg = t.cardGlassMuted || t.cardGlass || "rgba(30,30,30,0.86)";
  }

  return t;
}

function validateTheme(theme) {
  const t = { ...DEFAULT_THEME, ...theme };
  const paletteKeys = ["accent", "pageBg", "cardGlass", "textMain", "textMuted", "prioHigh", "prioMed", "prioLow"];
  const warnings = [];
  const errors = [];
  const parsed = {};
  paletteKeys.forEach(key => {
    parsed[key] = parseCssColor(t[key]);
    if (!parsed[key]) {
      const label = capitalize(key.replace(/([A-Z])/g, " $1")).trim();
      warnings.push(`${label} color looks invalid`);
    }
  });
  const page = parsed.pageBg;
  const text = parsed.textMain;
  const glass = parsed.cardGlass;
  const glassOnPage = blendOnBackground(glass, page);
  const pageContrast = page && text ? contrastRatio(text, page) : null;
  const cardContrast = text && glassOnPage ? contrastRatio(text, glassOnPage) : null;
  if (pageContrast && pageContrast < 3) {
    errors.push(`Text/page contrast ${formatContrast(pageContrast)} is low`);
  } else if (pageContrast && pageContrast < 4.5) {
    warnings.push(`Text/page contrast ${formatContrast(pageContrast)} could be higher`);
  }
  if (cardContrast && cardContrast < 3) {
    errors.push(`Card contrast ${formatContrast(cardContrast)} is low`);
  } else if (cardContrast && cardContrast < 4.5) {
    warnings.push(`Card contrast ${formatContrast(cardContrast)} could be higher`);
  }
  return { warnings, errors, contrast: { page: pageContrast, card: cardContrast } };
}

function renderThemeValidation(theme, hint = "Theme ready.") {
  if (!themeStatusEl) return;
  const { warnings, errors, contrast } = validateTheme(theme);
  const contrastParts = [];
  if (contrast.page) contrastParts.push(`Page ${formatContrast(contrast.page)}`);
  if (contrast.card) contrastParts.push(`Card ${formatContrast(contrast.card)}`);
  const contrastText = contrastParts.length ? `Contrast ${contrastParts.join(" / ")}` : "";
  if (errors.length) {
    setStatus(themeStatusEl, `${errors.join(" · ")}${contrastText ? ` · ${contrastText}` : ""}`, "error");
  } else if (warnings.length) {
    setStatus(
      themeStatusEl,
      `${hint} · ${warnings.join(" · ")}${contrastText ? ` · ${contrastText}` : ""}`,
      "pending"
    );
  } else {
    setStatus(themeStatusEl, `${hint}${contrastText ? ` · ${contrastText}` : ""}`, "ok");
  }
}

function syncThemeForm() {
  if (!themeAccentEl) return;
  const t = { ...DEFAULT_THEME, ...customTheme };
  themeAccentEl.value = t.accent;
  themePageBgEl.value = t.pageBg;
  themeGradAEl.value = rgbaToHex(t.gradientA);
  themeGradBEl.value = rgbaToHex(t.gradientB);
  themeGradCEl.value = rgbaToHex(t.gradientC);
  themeCardGlassEl.value = rgbaToHex(t.cardGlass);
  themeTextMainEl.value = t.textMain;
  themeTextMutedEl.value = t.textMuted;
  themePrioHighEl.value = t.prioHigh;
  themePrioMedEl.value = t.prioMed;
  themePrioLowEl.value = t.prioLow;
  themeRadiusLgEl.value = t.radiusLg;
  themeRadiusMdEl.value = t.radiusMd;
  themeRadiusSmEl.value = t.radiusSm;
  themeShadowStyleEl.value = t.shadow || "soft";
  themeLockToggleEl.checked = themeLockEnabled;
  renderThemeValidation(customTheme, "Theme ready. Live preview on edit.");
}

function initThemeLab() {
  try {
    const stored = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "{}");
    customTheme = { ...DEFAULT_THEME, ...(stored || {}) };
  } catch (err) {
    customTheme = { ...DEFAULT_THEME };
  }
  loadViewThemeOverrides();
  themeLockEnabled = localStorage.getItem(THEME_LOCK_KEY) === "1";
  applyThemeTokens(customTheme);
  renderThemePreviews(customTheme);
  syncThemeForm();
  syncThemeOverrideControls();
  updateActiveTheme("init");
  syncPackControls(themePackSelectEl?.value || "productivity");
  syncLocalCalendarSettings();
  bindThemeInputs();
}

function bindThemeInputs() {
  const colorFields = [
    [themeAccentEl, "accent"],
    [themePageBgEl, "pageBg"],
    [themeGradAEl, "gradientA"],
    [themeGradBEl, "gradientB"],
    [themeGradCEl, "gradientC"],
    [themeCardGlassEl, "cardGlass"],
    [themeTextMainEl, "textMain"],
    [themeTextMutedEl, "textMuted"],
    [themePrioHighEl, "prioHigh"],
    [themePrioMedEl, "prioMed"],
    [themePrioLowEl, "prioLow"],
  ];
  colorFields.forEach(([el, key]) => {
    el?.addEventListener("input", () => handleThemeChange(key, el.value));
  });
  [[themeRadiusLgEl, "radiusLg"], [themeRadiusMdEl, "radiusMd"], [themeRadiusSmEl, "radiusSm"]].forEach(
    ([el, key]) => {
      el?.addEventListener("input", () => handleThemeChange(key, Number(el.value)));
    }
  );
  themeShadowStyleEl?.addEventListener("change", () => handleThemeChange("shadow", themeShadowStyleEl.value));
  themePresetSelectEl?.addEventListener("change", () => {
    if (themePresetSelectEl.value) setStatus(themeStatusEl, `Preset ${themePresetSelectEl.value} selected.`, "pending");
  });
  themeApplyPresetBtn?.addEventListener("click", () => applyThemePreset(themePresetSelectEl.value));
  themeResetBtn?.addEventListener("click", () => {
    customTheme = { ...DEFAULT_THEME };
    applyThemeTokens(customTheme);
    renderThemePreviews(customTheme);
    syncThemeForm();
    renderThemeValidation(customTheme, "Theme reset to defaults.");
    updateActiveTheme("theme-reset");
  });
  themeExportBtn?.addEventListener("click", exportThemeJson);
  themeImportBtn?.addEventListener("click", importThemeJson);
  themeLockToggleEl?.addEventListener("change", () => toggleThemeLock(themeLockToggleEl.checked));
  themeOverrideCalendarEl?.addEventListener("change", () =>
    handleThemeOverrideChange("calendar", themeOverrideCalendarEl.value)
  );
  themeOverrideTasksEl?.addEventListener("change", () =>
    handleThemeOverrideChange("tasks", themeOverrideTasksEl.value)
  );
  quickThemeButtons.forEach(btn => {
    btn.addEventListener("click", () => applyQuickTheme(btn.dataset.quickTheme));
  });
  themePackSelectEl?.addEventListener("change", () => {
    syncPackControls(themePackSelectEl.value);
    applyThemePack(themePackSelectEl.value);
  });
  themePackAccentEl?.addEventListener("input", () => applyThemePack(themePackSelectEl.value));
  themePackBackgroundEl?.addEventListener("change", () => applyThemePack(themePackSelectEl.value));
  themePackCardStyleEl?.addEventListener("change", () => applyThemePack(themePackSelectEl.value));
  themePackEdgesEl?.addEventListener("change", () => applyThemePack(themePackSelectEl.value));
  toggleAdvancedThemeBtn?.addEventListener("click", () => toggleAdvancedThemePanel());
  toggleAdvancedThemePanel(false);
  localCalendarToggleEl?.addEventListener("change", () => {
    const settings = {
      optIn: !!localCalendarToggleEl.checked,
      county: localCalendarCountyEl?.value || ""
    };
    saveLocalCalendarSettings(settings);
    syncLocalCalendarSettings();
  });
  localCalendarCountyEl?.addEventListener("input", () => {
    const settings = {
      optIn: !!localCalendarToggleEl?.checked,
      county: localCalendarCountyEl.value
    };
    saveLocalCalendarSettings(settings);
    syncLocalCalendarSettings();
  });
}

function handleThemeChange(key, value) {
  if (!key) return;
  customTheme = { ...customTheme, [key]: value };
  applyThemeTokens(customTheme);
  renderThemePreviews(customTheme);
  renderThemeValidation(customTheme, "Live preview updated.");
  updateActiveTheme("theme-change");
}

function applyThemePreset(name) {
  if (!name || !THEME_PRESETS[name]) return;
  customTheme = { ...DEFAULT_THEME, ...THEME_PRESETS[name] };
  applyThemeTokens(customTheme);
  syncThemeForm();
  renderThemePreviews(customTheme);
  renderThemeValidation(customTheme, `Preset "${name}" applied.`);
  updateActiveTheme("preset");
}

async function exportThemeJson() {
  const data = JSON.stringify(customTheme, null, 2);
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(data);
      setStatus(themeStatusEl, "Copied JSON to clipboard.", "ok");
      return;
    } catch (_) {
      // fall through
    }
  }
  if (themeJsonInputEl) {
    themeJsonInputEl.value = data;
  }
  setStatus(themeStatusEl, "Clipboard unavailable. JSON placed in the text area.", "pending");
}

function importThemeJson() {
  if (!themeJsonInputEl?.value) {
    setStatus(themeStatusEl, "Paste a JSON payload first.", "error");
    return;
  }
  try {
    const parsed = JSON.parse(themeJsonInputEl.value);
    customTheme = { ...DEFAULT_THEME, ...parsed };
    applyThemeTokens(customTheme);
    syncThemeForm();
    renderThemePreviews(customTheme);
    renderThemeValidation(customTheme, "Imported theme applied.");
    updateActiveTheme("theme-import");
  } catch (err) {
    setStatus(themeStatusEl, "Invalid JSON. Please check and try again.", "error");
  }
}

function toggleThemeLock(enabled) {
  themeLockEnabled = !!enabled;
  if (themeLockEnabled) {
    applyTheme("custom");
  }
  if (enabled) {
    localStorage.setItem(THEME_LOCK_KEY, "1");
    renderThemeValidation(customTheme, "Contextual themes locked. Custom theme stays active.");
  } else {
    localStorage.removeItem(THEME_LOCK_KEY);
    renderThemeValidation(customTheme, "Contextual theming re-enabled.");
  }
  syncThemeOverrideControls();
  updateActiveTheme("theme-lock-toggle");
}

// ==========================
// UTILS
// ==========================

function componentToHex(value) {
  const v = Math.max(0, Math.min(255, Number(value) || 0));
  return v.toString(16).padStart(2, "0");
}

function rgbaToHex(value) {
  if (!value) return "#ffffff";
  if (value.startsWith("#")) {
    if (value.length === 4) {
      return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    }
    return value.slice(0, 7);
  }
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return "#ffffff";
  const [, r, g, b] = match;
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(255,255,255,${alpha})`;
  if (hex.startsWith("rgb")) return hex;
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map(ch => ch + ch)
      .join("");
  }
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toUtcISOString(date) {
  return new Date(date).toISOString();
}

function setStatus(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.style.color =
    type === "ok" ? "#a7f3d0" : type === "pending" ? "#e5e7eb" : "#fecaca";
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `hp-toast hp-toast-${type}`;
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.zIndex = "9999";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "10px";
  toast.style.backdropFilter = "blur(12px)";
  toast.style.color = "#0b1116";
  toast.style.fontWeight = "700";
  toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.35)";
  toast.style.background =
    type === "error"
      ? "rgba(239,68,68,0.9)"
      : type === "success"
      ? "rgba(16,185,129,0.9)"
      : "rgba(255,159,67,0.9)";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function handleError(err, statusEl) {
  console.error(err);
  if (statusEl) {
    setStatus(statusEl, err.message || "Something broke.", "error");
  } else {
    alert(err.message || "Something broke.");
  }
}

function setActiveView(view) {
  if (!appRootEl) return;
  closeCaptureSheet();
  currentView = view;
  appRootEl.dataset.view = view;
  navTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
  if (window?.history?.replaceState) {
    window.history.replaceState({}, "", `#${view}`);
  }
  updateActiveTheme("view-change");

  const scrollTarget =
    view === "tasks"
      ? document.querySelector(".task-board-card") || appRootEl
      : view === "automations"
      ? document.querySelector(".email-card") || appRootEl
      : view === "insights"
      ? document.querySelector(".insights-card") || appRootEl
      : document.querySelector(".calendar-shell") || appRootEl;

  scrollTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==========================
// INIT
// ==========================

async function init() {
  try {
    applyDemoLocks();
    initPanelLayoutManager();
    initLayoutOnboardingPrompt();
    initMobileLayoutControls();
    initWidgetDrawer();
    loadSpaceSaverMode();
    loadIconPreferences();
    loadCustomNlpRules();
    loadAutomationRules();
    loadComponentVariants();
    initThemeLab();
    initIconControls();
    initNlpControls();
    initAutomationControls();
    initComponentVariantControls();
    loadTemplates();
    await loadSmartTerms();
    await Promise.all([loadTasksWithFilters(), loadEmailSettings(), loadStats()]);
  } catch (err) {
    handleError(err);
  }
}

init();

function buildEmailPreviewFromForm() {
  return {
    alerts_enabled: !!alertsEnabledEl?.checked,
    summary_enabled: !!summaryEnabledEl?.checked,
    summary_hour: Number(summaryHourEl?.value || emailSettingsState?.summary_hour || 8),
    allowed_domains: allowedDomainsEl?.value || ""
  };
}

function updateEmailChips(snapshot = emailSettingsState) {
  if (!snapshot) return;
  const alertsOn = !!snapshot.alerts_enabled;
  const summaryOn = !!snapshot.summary_enabled;
  if (emailAlertsBadgeEl) {
    emailAlertsBadgeEl.textContent = alertsOn ? "Alerts on" : "Alerts off";
    emailAlertsBadgeEl.classList.toggle("is-on", alertsOn);
  }
  if (emailNextAlertEl) {
    emailNextAlertEl.textContent = alertsOn ? "Due-soon alerts enabled" : "Alerts off";
  }
  if (emailNextSummaryEl) {
    const hour = Number(snapshot.summary_hour ?? 8);
    emailNextSummaryEl.textContent = summaryOn ? `Daily at ${hour}:00` : "Summary off";
  }
}

function isEmailAllowed(email, allowedDomains) {
  if (!email) return false;
  if (!allowedDomains) return true;
  const domain = String(email.split("@")[1] || "").toLowerCase();
  if (!domain) return false;
  const allowedList = String(allowedDomains)
    .split(",")
    .map(d => d.trim().toLowerCase())
    .filter(Boolean);
  if (!allowedList.length) return true;
  return allowedList.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`));
}
const MONTH_NAME_INDEX = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sept: 8,
  sep: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11
};
if (quickLocationMapBtn) {
  quickLocationMapBtn.addEventListener("click", () => {
    openLocationInMaps(quickLocationEl?.value);
  });
}

if (taskLocationMapBtn) {
  taskLocationMapBtn.addEventListener("click", () => {
    openLocationInMaps(taskLocationEl?.value);
  });
}

setLocationStatus(quickLocationStatusEl, "Tap Auto to insert your current location.");
setLocationStatus(taskLocationStatusEl, "Auto-detect or refine the meeting address.");
bindAutoLocationButton(quickLocationAutoBtn, quickLocationEl, quickLocationStatusEl);
bindAutoLocationButton(taskLocationAutoBtn, taskLocationEl, taskLocationStatusEl);
setupLocationAutocomplete(quickLocationEl, quickLocationSuggestionsEl);
setupLocationAutocomplete(taskLocationEl, taskLocationSuggestionsEl);
