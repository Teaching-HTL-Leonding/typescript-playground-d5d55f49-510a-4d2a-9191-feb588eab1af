function setup() {
  createCanvas(400, 400);
  background("lightgray");

  // Define relative sizes and positions based on canvas width and height
  const headWidth: number = width * 0.50; // Head size as 50% of the canvas width
  const headHeight: number = height * 0.50; // Head size as 50% of the canvas height
  const headX: number = width / 2 - headWidth / 2; // Center the head horizontally
  const headY: number = height / 2 - headHeight / 2; // Center the head vertically

  // Draw the robot's head
  push();
  fill("gray");
  rect(headX, headY, headWidth, headHeight);
  pop();

  // eyes
  const eyeSize: number = min(headWidth, headHeight) * 0.2;
  const eyeCenterXLeft: number = headX + headWidth * 0.25;
  const eyeCenterXRight: number = headX + headWidth * 0.75;
  const eyeCenterY: number = headY + headHeight * 0.25;

  push();
  fill("black");
  circle(eyeCenterXLeft, eyeCenterY, eyeSize);
  circle(eyeCenterXRight, eyeCenterY, eyeSize);
  pop();

  // mouth
  const mouthX: number = headX + headWidth * 0.25;
  const mouthY: number = headY + headWidth * 0.70;
  const mouthWidth: number = headWidth / 2;
  const mouthHeight: number = headWidth * 0.1;

  push();
  fill("white");
  rect(mouthX, mouthY, mouthWidth, mouthHeight);
  pop();

  // antenna
  const antennaTopY: number = headY - headHeight * 0.25;
  const antennaDiameter: number = eyeSize / 2;

  push();
  line(width / 2, headY, width / 2, antennaTopY);
  fill("white");
  circle(width / 2, antennaTopY, antennaDiameter);
  pop();
}
