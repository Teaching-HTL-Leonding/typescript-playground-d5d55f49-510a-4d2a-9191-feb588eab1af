function setup() {
  createCanvas(250, 115);
  noFill();
    
  // blue ring
  stroke("blue");
  strokeWeight(8);
  circle(40, 40, 70);

  // black ring
  stroke("black");
  circle(125, 40, 70);

  // red ring
  stroke("red");
  circle(210, 40, 70);

  // yellow ring
  stroke("yellow");
  circle(82.5, 75, 70);

  // green ring
  stroke("green");
  circle(160, 75, 70);
}
