function setup() {
  createCanvas(500, 500);
  background("lightblue");
}

function mouseMoved() {
  background("lightblue");
  
  noFill();
  circle(mouseX, mouseY, 25);
  circle(mouseX, mouseY, 40);

  line(mouseX - 25, mouseY, mouseX + 25, mouseY);
  line(mouseX, mouseY - 25, mouseX, mouseY + 25);
}
