function setup() {
  createCanvas(500, 500);
  background("lightgray");

  // Head: half of the canvas in each dimension, centered
  const headWidth: number = width * 0.5;
  const headHeight: number = height * 0.5;
  const headX: number = width / 2 - headWidth / 2;
  const headY: number = height / 2 - headHeight / 2;

  // Eyes: diameter is 20% of the shorter head side,
  // centers at 25% / 75% of the head width and 25% below the head's top edge
  const eyeSize: number = min(headWidth, headHeight) * 0.2;
  const eyeXLeft: number = headX + headWidth * 0.25;
  const eyeYLeft: number = headY + headHeight * 0.25;
  const eyeXRight: number = headX + headWidth * 0.75;
  const eyeYRight: number = headY + headHeight * 0.25;

  // Mouth: top-left corner at 25% of the head width and 70% of the head height;
  // 50% of the head width makes it horizontally centered, height is 10% of the head
  const mouthX: number = headX + headWidth * 0.25;
  const mouthY: number = headY + headHeight * 0.7;
  const mouthWidth: number = headWidth * 0.5;
  const mouthHeight: number = headHeight * 0.1;

  // Antenna: centered on the head, the ball is half the eye diameter
  const antennaX: number = headX + headWidth * 0.5;
  const antennaY: number = headHeight * 0.25;
  const antennaCircleDiameter: number = eyeSize * 0.5;

  // Head
  fill("gray");
  rect(headX, headY, headWidth, headHeight);

  // Eyes
  fill("black");
  circle(eyeXLeft, eyeYLeft, eyeSize);
  circle(eyeXRight, eyeYRight, eyeSize);

  // Mouth
  fill("white");
  rect(mouthX, mouthY, mouthWidth, mouthHeight);

  // Antenna: line from the top edge of the head up to the ball
  line(antennaX, headY, antennaX, antennaY);
  circle(antennaX, antennaY, antennaCircleDiameter);
}