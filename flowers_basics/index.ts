// <<< ADD CONSTANTS HERE (if you need them)

function setup() {

  angleMode(DEGREES),
  createCanvas(700, 600);

  push();

  // right flower
  translate(590, 200);
  
  // green arc
  stroke("green");
  strokeWeight(10);
  noFill();
  arc(-40, 100, 200, 200, 270, 60);

  // petals
  strokeWeight(2);
  fill("lime");
  circle(50, 0, 80); // right petal
  circle(0, 50, 80); // bottom petal
  circle(-50, 0, 80); // left petal
  circle(0, -50, 80); // top petal

  // yellow circle
  fill("yellow");
  circle(0, 0, 65);

  pop();

  // left flower
  push();
  translate(100, 200);

  // green ark
  noFill();
  stroke("green");
  strokeWeight(10);
  arc(-30, 100, 200, 200, 270, 60);

  // petals
  noStroke();
  fill("lime");
  circle(-44, 31.9, 70); // bottom left petal
  circle(-44, -31.9, 70); // top left petal
  circle(15.5, -47.5, 70); // top right petal
  circle(50, 0, 70); // right petal
  circle(15.5, 47.5, 70); // bottom right petal

  // yellow circle
  fill("yellow");
  circle(0, 0, 65);
}
