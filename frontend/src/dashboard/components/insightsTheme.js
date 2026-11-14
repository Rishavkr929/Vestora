// Shared colors and styles for the Insights page (same palette as Holdings.js)
export const C = { green: "#174F3D", maroon: "#511A1A", grey: "#CCCCCC", bg: "#F2F2EF", white: "#FFFFFF", muted: "#5b6b63" };
export const serif = "Georgia, serif";
export const h2 = { fontFamily: serif, fontWeight: 400, fontSize: 30, color: C.green, margin: "0 0 6px" };
export const lead = { fontSize: 14, maxWidth: 520, margin: "0 0 16px" };
export const select = { flex: 1, minWidth: 0, padding: "10px 16px", borderRadius: 999, border: `1px solid ${C.green}`, background: "transparent", color: C.green, fontSize: 14 };
export const pill = (disabled) => ({ padding: "10px 22px", borderRadius: 999, border: "none", background: C.maroon, color: C.white, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", opacity: disabled ? 0.6 : 1, cursor: disabled ? "default" : "pointer" });
export const card = (bg = C.grey, fg = C.green) => ({ background: bg, color: fg, borderRadius: 16, padding: 20 });
export const label = { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" };
export const big = { fontFamily: serif, fontSize: 30, margin: 0 };
export const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 };
export const money = (v, cur = "₹") => `${cur}${Number(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
