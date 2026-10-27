// OKLCH-Stufen aus den v3-Hexwerten mit den Matrizen aus CSS Color 4 (conversions.js), Rundung und Rückweg-Fehler
const mul = (M, v) => M.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
const RGB_XYZ = [[506752 / 1228815, 87881 / 245763, 12673 / 70218], [87098 / 409605, 175762 / 245763, 12673 / 175545], [7918 / 409605, 87881 / 737289, 1001167 / 1053270]];
const XYZ_LMS = [[0.819022437996703, 0.3619062600528904, -0.1288737815209879], [0.0329836539323885, 0.9292868615863434, 0.0361446663506424], [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]];
const LMS_LAB = [[0.210454268309314, 0.7936177747023054, -0.0040720430116193], [1.9779985324311684, -2.42859224204858, 0.450593709617411], [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]];
const LAB_LMS = [[1, 0.3963377773761749, 0.2158037573099136], [1, -0.1055613458156586, -0.0638541728258133], [1, -0.0894841775298119, -1.2914855480194092]];
const LMS_XYZ = [[1.2268798758459243, -0.5578149944602171, 0.2813910456659647], [-0.0405757452148008, 1.112286803280317, -0.0717110580655164], [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]];
const XYZ_RGB = [[12831 / 3959, -329 / 214, -1974 / 3959], [-851781 / 878810, 1648619 / 878810, 36519 / 878810], [705 / 12673, -2585 / 12673, 705 / 667]];
const lin = (c) => (Math.abs(c) <= 0.04045 ? c / 12.92 : Math.sign(c) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4);
const gam = (c) => (Math.abs(c) > 0.0031308 ? Math.sign(c) * (1.055 * Math.abs(c) ** (1 / 2.4) - 0.055) : 12.92 * c);
function zuOklch(hex) {
  const rgb = [1, 3, 5].map((i) => lin(parseInt(hex.slice(i, i + 2), 16) / 255));
  const [L, a, b] = mul(LMS_LAB, mul(XYZ_LMS, mul(RGB_XYZ, rgb)).map(Math.cbrt));
  return [L * 100, Math.hypot(a, b), ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360];
}
function zuRgb([l, c, h]) {
  const lab = [l / 100, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)];
  return mul(XYZ_RGB, mul(LMS_XYZ, mul(LAB_LMS, lab).map((v) => v ** 3))).map((v) => gam(v) * 255);
}
const ziel = process.argv.slice(2);
for (const eintrag of ziel) {
  const [name, hex, wert] = eintrag.split('=');
  let o;
  if (hex.startsWith('#')) { const r = zuOklch(hex); o = [+r[0].toFixed(4), +r[1].toFixed(6), +r[2].toFixed(3)]; if (o[1] < 1e-5) o = [o[0], 0, 0]; }
  else o = hex.split(',').map(Number);
  const zurueck = zuRgb(o);
  const fehler = hex.startsWith('#') ? zurueck.map((v, i) => (v - parseInt(hex.slice(1 + 2 * i, 3 + 2 * i), 16)).toFixed(4)) : zurueck.map((v) => v.toFixed(3));
  console.log(`${name}\toklch(${o[0]}% ${o[1]} ${o[2]})\t${fehler.join('/')}`);
}
