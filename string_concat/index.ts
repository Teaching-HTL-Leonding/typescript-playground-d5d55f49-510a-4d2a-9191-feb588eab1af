function setup() {
  createCanvas(500, 500);
  background("lightblue");
  noStroke();
}

let clickPosition: string = "0/0";

function mouseClicked() {
  background("lightblue");
  circle(mouseX, mouseY, 20);

  clickPosition = `${clickPosition}, ${round(mouseX)}/${round(mouseY)}`;
  text(clickPosition, 5, 5, width - 10, height - 10);
}
