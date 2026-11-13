function setup() {
  createCanvas(500, 500);
  background("lightblue");
}

let clickPosition: string = "0/0";

function mouseClicked() {
  clickPosition = `${clickPosition}, ${round(mouseX)}/${round(mouseY)}`;
  text(clickPosition, 5, 5, width - 10, height - 10);
}
