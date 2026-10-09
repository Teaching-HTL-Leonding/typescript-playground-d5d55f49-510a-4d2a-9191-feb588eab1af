const PETAL_DIAMETER_LEFT = 70;
const PETAL_DIAMETER_RIGHT = 80;
const CENTER_DIAMETER = 65;
const PETAL_OFFSET = 50;
const SCALE = 1.3;

function setup() {

  angleMode(DEGREES);
  createCanvas(700 * SCALE, 600 * SCALE);
  scale(SCALE);

  // right flower
  translate(430, 220);
  
  // green arc
  stroke("green");
  strokeWeight(10);
  noFill();
  arc(-40, 100, 200, 200, 270, 60);

  // petals
  strokeWeight(2);
  fill("lime");
  circle(PETAL_OFFSET, 0, PETAL_DIAMETER_RIGHT); // right petal
  circle(0, PETAL_OFFSET, PETAL_DIAMETER_RIGHT); // bottom petal
  circle(-PETAL_OFFSET, 0, PETAL_DIAMETER_RIGHT); // left petal
  circle(0, -PETAL_OFFSET, PETAL_DIAMETER_RIGHT); // top petal

  // yellow circle
  fill("yellow");
  circle(0, 0, CENTER_DIAMETER);

  // left flower
  translate(-300, 0);

  // green arc
  noFill();
  stroke("green");
  strokeWeight(10);
  arc(-30, 100, 200, 200, 270, 60);

  // petals
  noStroke();
  fill("lime");
  circle(-44, 31.9, PETAL_DIAMETER_LEFT); // bottom left petal
  circle(-44, -31.9, PETAL_DIAMETER_LEFT); // top left petal
  circle(15.5, -47.5, PETAL_DIAMETER_LEFT); // top right petal
  circle(PETAL_OFFSET, 0, PETAL_DIAMETER_LEFT); // right petal
  circle(15.5, 47.5, PETAL_DIAMETER_LEFT); // bottom right petal

  // yellow circle
  fill("yellow");
  circle(0, 0, CENTER_DIAMETER);
}
