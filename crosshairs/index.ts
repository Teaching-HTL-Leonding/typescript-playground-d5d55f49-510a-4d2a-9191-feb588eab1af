function setup() {
  createCanvas(500, 500);
  background("lightblue");
}

function mouseMoved() {
  background("lightblue");

  const snap: number = 50;       // marker must snap every 40 pixels
  const markerSize: number = 10; // size of marker

  const x: number = round(mouseX / snap) * snap;
  const y: number = round(mouseY / snap) * snap;

  line(x - 20, y, x + 20, y);
  line(x, y - 20, x, y + 20);

  text(`${x}/${y}`, 5, height - 5)
}
