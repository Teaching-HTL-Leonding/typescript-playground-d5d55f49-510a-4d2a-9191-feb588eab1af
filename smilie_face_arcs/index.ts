function setup() {
  createCanvas(400, 400);
  strokeWeight(8);

  angleMode(DEGREES);

  // yellow face
  fill("yellow");
  circle(200, 200, 380)

  // black eyes
  fill("black");
  circle(140, 130, 30); // left eye
  circle(260, 130, 30); // right eye

  // mouth
  strokeWeight(10);
  noFill();
  arc(200, 250, 180, 110, 15, 165);
}
