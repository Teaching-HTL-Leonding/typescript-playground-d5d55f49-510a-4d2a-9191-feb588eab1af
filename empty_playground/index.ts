// Isometrische Stadt bei Nacht – p5.js (TypeScript, Playground)
// Alles wird einmal in setup() gezeichnet. randomSeed ändern = neue Stadt.
const TILE = 34;       // Größe einer Gitterzelle in Pixeln
const COLS = 10;       // Zellen in x-Richtung
const ROWS = 10;       // Zellen in y-Richtung
const HORIZON = 380;   // y-Position des Horizonts
const MOON_X = 650;
const MOON_Y = 95;

type Road = { type: "road" };
type Park = { type: "park" };
type Building = {
  type: "building";
  h: number;
  col: p5.Color;
  roof: string;
  cols: number;
  floorH: number;
  litChance: number;
};
type Cell = Road | Park | Building;

let originX = 0;
let originY = 0;
let buildingColors: p5.Color[] = [];
const cells: Cell[][] = [];

function setup(): void {
  createCanvas(800, 600);
  originX = width / 2;
  originY = 170;
  randomSeed(12);

  buildingColors = [
    color(90, 110, 160),
    color(130, 100, 150),
    color(70, 130, 145),
    color(160, 140, 125),
    color(105, 110, 125),
    color(180, 110, 100),
  ];

  generateCity();

  // Hintergrund
  drawSky();
  drawStars(220);
  drawMoon(MOON_X, MOON_Y, 55);
  drawClouds();
  drawDistantSkyline(color(70, 50, 100), 60, 170, 0.06);
  drawDistantSkyline(color(38, 30, 62), 30, 110, 0.1);
  drawWater();

  // Stadt
  drawIsland();
  drawGround();
  drawCity();

  drawVignette();
}

// ---------- Grundlagen ----------

type Point = { x: number; y: number };

// 3D-Gitterkoordinate (x, y, Höhe z in Pixeln) -> Bildschirmpunkt
function iso(x: number, y: number, z: number = 0): Point {
  return {
    x: originX + (x - y) * TILE * 0.866, // cos(30°)
    y: originY + (x + y) * TILE * 0.5 - z, // sin(30°)
  };
}

function isoQuad(a: Point, b: Point, c: Point, d: Point): void {
  quad(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
}

// Farbe abdunkeln (amt 0 = gleich, 1 = schwarz)
function shade(col: p5.Color, amt: number): p5.Color {
  return lerpColor(col, color(0), amt);
}

// Zufälliges Element aus einem Array
function pick<T>(items: T[]): T {
  return items[Math.floor(random(items.length))];
}

// Nativer Canvas-Kontext (für Farbverläufe)
function ctx2d(): CanvasRenderingContext2D {
  return drawingContext as CanvasRenderingContext2D;
}

// Leuchtender Punkt mit weichem Schein
function glow(x: number, y: number, d: number, col: p5.Color): void {
  noStroke();
  for (let k = 5; k >= 1; k--) {
    fill(red(col), green(col), blue(col), 22);
    circle(x, y, d * k * 1.5);
  }
  fill(col);
  circle(x, y, d);
}

function isRoad(i: number, j: number): boolean {
  return i % 4 === 3 || j % 4 === 3;
}

// ---------- Stadtplan erzeugen ----------

function generateCity(): void {
  const cx = (COLS - 1) / 2;
  const cy = (ROWS - 1) / 2;
  for (let i = 0; i < COLS; i++) {
    cells[i] = [];
    for (let j = 0; j < ROWS; j++) {
      if (isRoad(i, j)) {
        cells[i][j] = { type: "road" };
        continue;
      }
      if (random() < 0.12) {
        cells[i][j] = { type: "park" };
        continue;
      }
      // Je näher an der Mitte, desto höher
      const center = Math.max(0, 1 - dist(i, j, cx, cy) / 6);
      const h = 25 + random(35) + Math.pow(center, 1.5) * 190 * random(0.5, 1);
      cells[i][j] = {
        type: "building",
        h: h,
        col: pick(buildingColors),
        roof: pick(["flat", "tank", "antenna", "ac", "garden"]),
        cols: Math.floor(random(2, 5)),
        floorH: pick([9, 10, 12]),
        litChance: random(0.2, 0.55),
      };
    }
  }
}

// ---------- Hintergrund ----------

function drawSky(): void {
  const ctx = ctx2d();
  ctx.save();
  const g = ctx.createLinearGradient(0, 0, 0, HORIZON);
  g.addColorStop(0, "#070a1e");
  g.addColorStop(0.55, "#3a2a66");
  g.addColorStop(0.85, "#b8607a");
  g.addColorStop(1, "#f0a070");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, HORIZON);
  ctx.restore();
}

function drawStars(n: number): void {
  for (let k = 0; k < n; k++) {
    const x = random(width);
    const y = Math.pow(random(), 1.5) * HORIZON * 0.75; // oben dichter
    stroke(255, 255, 240, map(y, 0, HORIZON * 0.75, 255, 40));
    strokeWeight(random() < 0.08 ? 2.5 : random(0.8, 1.6));
    point(x, y);
  }
  // ein paar funkelnde Sterne
  stroke(255, 255, 230, 200);
  strokeWeight(1);
  for (let k = 0; k < 6; k++) {
    const x = random(width);
    const y = random(HORIZON * 0.4);
    line(x - 4, y, x + 4, y);
    line(x, y - 4, x, y + 4);
  }
}

function drawMoon(x: number, y: number, d: number): void {
  noStroke();
  for (let r = d * 3; r > d; r -= 4) {
    fill(255, 230, 190, 4);
    circle(x, y, r);
  }
  fill(250, 245, 225);
  circle(x, y, d);
  // Krater
  fill(228, 222, 200);
  circle(x - d * 0.15, y - d * 0.1, d * 0.2);
  circle(x + d * 0.2, y + d * 0.15, d * 0.14);
  circle(x + d * 0.05, y - d * 0.28, d * 0.1);
  circle(x - d * 0.25, y + d * 0.22, d * 0.08);
}

function drawClouds(): void {
  noStroke();
  for (let k = 0; k < 5; k++) {
    const cx = random(width);
    const cy = random(190, 330);
    for (let e = 0; e < 8; e++) {
      fill(255, 170, 170, 12);
      ellipse(cx + random(-60, 60), cy + random(-6, 6), random(80, 180), random(8, 18));
    }
  }
}

// Flache Silhouetten am Horizont für Tiefe
function drawDistantSkyline(col: p5.Color, minH: number, maxH: number, windowChance: number): void {
  noStroke();
  let x = -10;
  while (x < width) {
    const w = random(18, 50);
    const h = random(minH, maxH);
    fill(col);
    rect(x, HORIZON - h, w, h);
    if (random() < 0.2) rect(x + w / 2 - 1, HORIZON - h - 15, 2, 15); // Antenne

    fill(255, 210, 140, 150);
    for (let wy = HORIZON - h + 6; wy < HORIZON - 4; wy += 7) {
      for (let wx = x + 4; wx < x + w - 4; wx += 6) {
        if (random() < windowChance) rect(wx, wy, 2, 3);
      }
    }
    x += w + random(-5, 4);
  }
}

function drawWater(): void {
  const ctx = ctx2d();
  ctx.save();
  const g = ctx.createLinearGradient(0, HORIZON, 0, height);
  g.addColorStop(0, "#4a3560");
  g.addColorStop(1, "#070914");
  ctx.fillStyle = g;
  ctx.fillRect(0, HORIZON, width, height - HORIZON);
  ctx.restore();

  // Spiegelung des Mondes
  strokeWeight(2);
  for (let y = HORIZON + 4; y < height; y += 6) {
    const spread = map(y, HORIZON, height, 10, 70);
    const len = random(8, 30);
    const x = MOON_X + random(-spread, spread);
    stroke(255, 235, 200, map(y, HORIZON, height, 140, 30));
    line(x - len / 2, y, x + len / 2, y);
  }

  // kleine Wellen
  strokeWeight(1);
  stroke(255, 255, 255, 18);
  for (let k = 0; k < 120; k++) {
    const y = random(HORIZON, height);
    const x = random(width);
    line(x, y, x + random(5, 25), y);
  }
}

// ---------- Insel & Boden ----------

function drawIsland(): void {
  const depth = 30;
  stroke(15, 15, 25);
  strokeWeight(1);

  // vordere linke Wand
  fill(75, 70, 85);
  isoQuad(iso(0, ROWS, 0), iso(COLS, ROWS, 0), iso(COLS, ROWS, -depth), iso(0, ROWS, -depth));
  // vordere rechte Wand
  fill(55, 50, 65);
  isoQuad(iso(COLS, 0, 0), iso(COLS, ROWS, 0), iso(COLS, ROWS, -depth), iso(COLS, 0, -depth));

  // Steinfugen
  stroke(0, 0, 0, 60);
  for (let z = -8; z > -depth; z -= 8) {
    const a = iso(0, ROWS, z);
    const b = iso(COLS, ROWS, z);
    const c = iso(COLS, 0, z);
    line(a.x, a.y, b.x, b.y);
    line(b.x, b.y, c.x, c.y);
  }

  // Spiegelungen der Stadtlichter im Wasser
  strokeWeight(1.5);
  for (let k = 0; k < 60; k++) {
    const t = random();
    const pt = random() < 0.5 ? iso(t * COLS, ROWS, -depth) : iso(COLS, t * ROWS, -depth);
    const len = random(6, 35);
    stroke(255, 200, 120, random(20, 70));
    for (let dy = 4; dy < len; dy += 4) {
      line(pt.x - 3, pt.y + dy, pt.x + 3, pt.y + dy);
    }
  }
}

function drawGround(): void {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const cell = cells[i][j];
      if (cell.type === "road") {
        noStroke();
        fill(38, 40, 52);
      } else if (cell.type === "park") {
        noStroke();
        fill(50, 105, 60);
      } else {
        stroke(70, 72, 85);
        fill(85, 88, 100);
      }
      isoQuad(iso(i, j), iso(i + 1, j), iso(i + 1, j + 1), iso(i, j + 1));

      // Weg durch den Park
      if (cell.type === "park") {
        noStroke();
        fill(165, 145, 105);
        isoQuad(iso(i + 0.45, j), iso(i + 0.55, j), iso(i + 0.55, j + 1), iso(i + 0.45, j + 1));
      }
    }
  }

  // Straßenmarkierungen
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (cells[i][j].type !== "road") continue;
      const vertical = i % 4 === 3;
      const horizontal = j % 4 === 3;
      if (vertical && horizontal) continue; // Kreuzung

      stroke(230, 200, 90);
      strokeWeight(1.5);
      if (vertical) {
        const a = iso(i + 0.5, j + 0.35);
        const b = iso(i + 0.5, j + 0.65);
        line(a.x, a.y, b.x, b.y);
        if ((j + 1) % 4 === 3) zebraVertical(i, j + 0.72, j + 0.95);
        if (j > 0 && (j - 1) % 4 === 3) zebraVertical(i, j + 0.05, j + 0.28);
      } else {
        const a = iso(i + 0.35, j + 0.5);
        const b = iso(i + 0.65, j + 0.5);
        line(a.x, a.y, b.x, b.y);
        if ((i + 1) % 4 === 3) zebraHorizontal(j, i + 0.72, i + 0.95);
        if (i > 0 && (i - 1) % 4 === 3) zebraHorizontal(j, i + 0.05, i + 0.28);
      }
      strokeWeight(1);
    }
  }
}

// Zebrastreifen auf einer Straße in Spalte r
function zebraVertical(r: number, y0: number, y1: number): void {
  noStroke();
  fill(220, 220, 225, 200);
  for (let s = 0; s < 5; s++) {
    const x0 = r + 0.1 + s * 0.17;
    isoQuad(iso(x0, y0), iso(x0 + 0.09, y0), iso(x0 + 0.09, y1), iso(x0, y1));
  }
}

// Zebrastreifen auf einer Straße in Zeile r
function zebraHorizontal(r: number, x0: number, x1: number): void {
  noStroke();
  fill(220, 220, 225, 200);
  for (let s = 0; s < 5; s++) {
    const y0 = r + 0.1 + s * 0.17;
    isoQuad(iso(x0, y0), iso(x1, y0), iso(x1, y0 + 0.09), iso(x0, y0 + 0.09));
  }
}

// ---------- Stadt (von hinten nach vorne) ----------

function drawCity(): void {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const cell = cells[i][j];
      if (cell.type === "building") drawBuilding(i, j, cell);
      else if (cell.type === "park") drawPark(i, j);
      else drawRoadStuff(i, j);
    }
  }
}

function drawBuilding(i: number, j: number, c: Building): void {
  const x = i + 0.12;
  const y = j + 0.12;
  const w = 0.76;
  const d = 0.76;

  if (c.h > 130) {
    // Hochhaus mit Absatz: unten breit, oben schmaler
    const lower = c.h * 0.6;
    drawBox(x, y, w, d, 0, lower, c.col, c);
    const inset = 0.13;
    drawBox(x + inset, y + inset, w - 2 * inset, d - 2 * inset, lower, c.h - lower, c.col, c);
    drawRoof(x + inset, y + inset, w - 2 * inset, d - 2 * inset, c.h, c);
  } else {
    drawBox(x, y, w, d, 0, c.h, c.col, c);
    drawRoof(x, y, w, d, c.h, c);
  }
}

// Quader: Position (x, y), Grundfläche w × d, Start-Höhe z0, Höhe h
function drawBox(
  x: number, y: number, w: number, d: number,
  z0: number, h: number, col: p5.Color, win?: Building
): void {
  const z1 = z0 + h;
  stroke(15, 15, 25);
  strokeWeight(1);

  // linke Seite
  fill(shade(col, 0.35));
  isoQuad(iso(x, y + d, z1), iso(x + w, y + d, z1), iso(x + w, y + d, z0), iso(x, y + d, z0));
  // rechte Seite
  fill(shade(col, 0.55));
  isoQuad(iso(x + w, y + d, z1), iso(x + w, y, z1), iso(x + w, y, z0), iso(x + w, y + d, z0));
  // Dach
  fill(lerpColor(col, color(255), 0.1));
  isoQuad(iso(x, y, z1), iso(x + w, y, z1), iso(x + w, y + d, z1), iso(x, y + d, z1));

  if (win) drawWindows(x, y, w, d, z0, h, win);
}

function drawWindows(
  x: number, y: number, w: number, d: number,
  z0: number, h: number, c: Building
): void {
  noStroke();
  const floors = Math.floor((h - 6) / c.floorH);
  for (let f = 0; f < floors; f++) {
    const za = z0 + 4 + f * c.floorH;
    const zb = za + c.floorH * 0.55;
    for (let k = 0; k < c.cols; k++) {
      const a = (k + 0.2) / c.cols;
      const b = (k + 0.8) / c.cols;
      // linke Seite (Ebene y + d)
      windowColor(c);
      isoQuad(iso(x + a * w, y + d, zb), iso(x + b * w, y + d, zb), iso(x + b * w, y + d, za), iso(x + a * w, y + d, za));
      // rechte Seite (Ebene x + w)
      windowColor(c);
      isoQuad(iso(x + w, y + d - a * d, zb), iso(x + w, y + d - b * d, zb), iso(x + w, y + d - b * d, za), iso(x + w, y + d - a * d, za));
    }
  }
}

function windowColor(c: Building): void {
  if (random() < c.litChance) {
    fill(pick([color(255, 214, 130), color(255, 235, 170), color(180, 220, 255)]));
  } else {
    fill(20, 25, 40, 180);
  }
}

function drawRoof(x: number, y: number, w: number, d: number, z: number, c: Building): void {
  if (c.h > 200 || c.roof === "antenna") {
    drawAntenna(x + w * 0.5, y + d * 0.5, z, c.h > 200 ? 45 : 22);
  } else if (c.roof === "tank") {
    drawWaterTank(x + w * 0.5, y + d * 0.5, w * 0.22, z);
  } else if (c.roof === "ac") {
    const grey = color(150, 150, 160);
    drawBox(x + w * 0.15, y + d * 0.15, w * 0.25, d * 0.2, z, 5, grey);
    drawBox(x + w * 0.55, y + d * 0.5, w * 0.25, d * 0.2, z, 5, grey);
  } else if (c.roof === "garden") {
    noStroke();
    fill(60, 120, 70);
    isoQuad(iso(x + w * 0.1, y + d * 0.1, z), iso(x + w * 0.9, y + d * 0.1, z), iso(x + w * 0.9, y + d * 0.9, z), iso(x + w * 0.1, y + d * 0.9, z));
    drawTree(x + w * 0.3, y + d * 0.35, z, 0.6);
    drawTree(x + w * 0.65, y + d * 0.7, z, 0.6);
  }
}

function drawAntenna(cx: number, cy: number, z: number, len: number): void {
  const pt = iso(cx, cy, z);
  stroke(180);
  strokeWeight(1.5);
  line(pt.x, pt.y, pt.x, pt.y - len);
  strokeWeight(1);
  line(pt.x - 4, pt.y - len * 0.6, pt.x + 4, pt.y - len * 0.6);
  glow(pt.x, pt.y - len, 3, color(255, 60, 60));
}

function drawWaterTank(cx: number, cy: number, r: number, z: number): void {
  const legs = 6;
  const g = iso(cx, cy, z);
  const base = iso(cx, cy, z + legs);
  const top = iso(cx, cy, z + legs + 16);
  const ew = r * 2 * 1.414 * TILE * 0.866; // Breite der Ellipse
  const eh = ew * 0.577;                   // isometrisch gestaucht

  // Beine
  stroke(40);
  strokeWeight(1.5);
  line(g.x - ew * 0.35, g.y, base.x - ew * 0.35, base.y);
  line(g.x + ew * 0.35, g.y, base.x + ew * 0.35, base.y);
  line(g.x, g.y + eh * 0.35, base.x, base.y + eh * 0.35);

  // Tank
  strokeWeight(1);
  stroke(20);
  fill(120, 85, 60);
  ellipse(base.x, base.y, ew, eh);
  noStroke();
  rect(base.x - ew / 2, top.y, ew, base.y - top.y);
  stroke(20);
  line(base.x - ew / 2, top.y, base.x - ew / 2, base.y);
  line(base.x + ew / 2, top.y, base.x + ew / 2, base.y);
  fill(150, 110, 80);
  ellipse(top.x, top.y, ew, eh);

  // Kegeldach
  fill(90, 70, 55);
  triangle(top.x - ew / 2, top.y, top.x + ew / 2, top.y, top.x, top.y - 9);
}

function drawTree(x: number, y: number, z: number, s: number = 1): void {
  const pt = iso(x, y, z);
  stroke(70, 50, 35);
  strokeWeight(2 * s);
  line(pt.x, pt.y, pt.x, pt.y - 8 * s);
  noStroke();
  fill(30, 80, 45);
  circle(pt.x, pt.y - 12 * s, 14 * s);
  fill(50, 115, 60);
  circle(pt.x - 2 * s, pt.y - 14 * s, 9 * s);
  strokeWeight(1);
}

function drawPark(i: number, j: number): void {
  const spots: [number, number][] = [[0.2, 0.2], [0.75, 0.25], [0.2, 0.45], [0.25, 0.75], [0.8, 0.75]];
  // von hinten nach vorne sortieren
  spots.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  for (const [u, v] of spots) {
    if (random() < 0.8) drawTree(i + u, j + v, 0, random(0.8, 1.2));
  }
}

function drawRoadStuff(i: number, j: number): void {
  const vertical = i % 4 === 3;
  const horizontal = j % 4 === 3;
  if (vertical && horizontal) return; // Kreuzung frei lassen

  // Laterne am Straßenrand (zuerst, weil sie weiter hinten steht)
  if ((vertical ? j : i) % 2 === 0) {
    if (vertical) drawLamp(i + 0.06, j + 0.5);
    else drawLamp(i + 0.5, j + 0.06);
  }

  // Auto
  if (random() < 0.35) {
    const col = pick([color(200, 50, 50), color(230, 230, 235), color(40, 90, 180), color(240, 190, 40)]);
    if (vertical) drawCar(i + pick([0.18, 0.55]), j + 0.25, 0.27, 0.45, col, true);
    else drawCar(i + 0.25, j + pick([0.18, 0.55]), 0.45, 0.27, col, false);
  }
}

function drawCar(x: number, y: number, w: number, d: number, col: p5.Color, vertical: boolean): void {
  drawBox(x, y, w, d, 0, 5, col);
  const cabin = lerpColor(col, color(20, 30, 50), 0.5);
  if (vertical) drawBox(x + w * 0.1, y + d * 0.25, w * 0.8, d * 0.45, 5, 4, cabin);
  else drawBox(x + w * 0.25, y + d * 0.1, w * 0.45, d * 0.8, 5, 4, cabin);

  // Scheinwerfer auf der vorderen Seite
  const a = vertical ? iso(x + w * 0.25, y + d, 2.5) : iso(x + w, y + d * 0.25, 2.5);
  const b = vertical ? iso(x + w * 0.75, y + d, 2.5) : iso(x + w, y + d * 0.75, 2.5);
  glow(a.x, a.y, 2, color(255, 245, 200));
  glow(b.x, b.y, 2, color(255, 245, 200));
}

function drawLamp(x: number, y: number): void {
  const pt = iso(x, y, 0);
  const topY = pt.y - 22;
  // Lichtkegel am Boden
  noStroke();
  fill(255, 200, 120, 25);
  ellipse(pt.x, pt.y, 26, 13);
  // Mast
  stroke(60, 60, 70);
  strokeWeight(1.5);
  line(pt.x, pt.y, pt.x, topY);
  strokeWeight(1);
  glow(pt.x, topY, 3, color(255, 220, 150));
}

// ---------- Abschluss ----------

function drawVignette(): void {
  const ctx = ctx2d();
  ctx.save();
  const g = ctx.createRadialGradient(width / 2, height / 2, height * 0.35, width / 2, height / 2, height * 0.85);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}