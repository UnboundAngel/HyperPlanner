export function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");
  const int = parseInt(cleaned, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

export function luminance(r: number, g: number, b: number) {
  const chan = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const R = chan(r);
  const G = chan(g);
  const B = chan(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(l1: number, l2: number) {
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

export function pickContrastingText(bgHex: string): "#000000" | "#ffffff" {
  const { r, g, b } = hexToRgb(bgHex);
  const Lbg = luminance(r, g, b);

  const Lwhite = 1;
  const Lblack = 0;

  const cWhite = contrastRatio(Lwhite, Lbg);
  const cBlack = contrastRatio(Lblack, Lbg);

  if (cWhite >= 4.5 || cWhite > cBlack) return "#ffffff";
  return "#000000";
}
