import { Theme } from "./theme";
import { pickContrastingText } from "./colorUtils";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const toHex = (value: string) => (value.startsWith("#") ? value : value);

  root.style.setProperty("--color-accent", toHex(theme.accent));
  root.style.setProperty("--color-page-base", toHex(theme.pageBase));
  root.style.setProperty("--color-card-bg", toHex(theme.cardBg));
  root.style.setProperty("--color-chip-bg", toHex(theme.chipBg));
  root.style.setProperty("--color-danger", toHex(theme.danger));
  root.style.setProperty("--color-warning", toHex(theme.warning));
  root.style.setProperty("--color-success", toHex(theme.success));
  root.style.setProperty("--color-muted", toHex(theme.muted));

  root.style.setProperty("--color-accent-foreground", pickContrastingText(theme.accent));
  root.style.setProperty("--color-card-foreground", pickContrastingText(theme.cardBg));
  root.style.setProperty("--color-chip-foreground", pickContrastingText(theme.chipBg));
  root.style.setProperty("--color-danger-foreground", pickContrastingText(theme.danger));
  root.style.setProperty("--color-warning-foreground", pickContrastingText(theme.warning));
  root.style.setProperty("--color-success-foreground", pickContrastingText(theme.success));
}
