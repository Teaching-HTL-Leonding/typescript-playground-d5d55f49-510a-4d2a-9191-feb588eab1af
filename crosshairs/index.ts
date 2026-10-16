function setup() {
  createCanvas(500, 500);
  background("lightblue");
}

function mouseMoved() {
  background("lightblue");

  const snap: number = 50;       // marker must snap every 40 pixels
  const markerSize: number = 20; // size of marker

  const x: number = round(mouseX / snap) * snap;
  const y: number = round(mouseY / snap) * snap;

  line(x - markerSize, y, x + markerSize, y);
  line(x, y - markerSize, x, y + markerSize);

  text(`${x}/${y}`, 5, height - 5)
}
