function setup() {
  createCanvas(400, 400);
  background("lightgray");

  // head
  fill("gray");
  rect(100, 100, 200, 200);

  // eyes
  fill("black");
  circle(150, 150, 40);
  circle(250, 150, 40);

  // mouth
  fill("white");
  rect(150, 240, 100, 20);

  // antenna
  line(200, 100, 200, 50);
  circle(200, 50, 20);
}
