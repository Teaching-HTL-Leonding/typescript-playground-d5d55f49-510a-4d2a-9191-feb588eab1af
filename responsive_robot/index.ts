function setup() {
  createCanvas(700, 500);
  background("lightgray");

  // Define relative sizes and positions based on canvas width and height
  const headWidth: number = width * 0.50; // Head size as 50% of the canvas width
  const headHeight: number = height * 0.50; // Head size as 50% of the canvas height
  const headX: number = width / 2 - headWidth / 2; // Center the head horizontally
  const headY: number = height / 2 - headHeight / 2; // Center the head vertically
  const eyeSize: number = min(headWidth, headHeight) * 0.2; // diameter of eyes
  const eyeXLeft: number = headX + headWidth * 0.25; // X coordinate left eye
  const eyeYLeft: number = headY + headHeight * 0.25; // Y coordinate left eye
  const eyeXRight: number = headX + headWidth * 0.75; // X coordinate right eye
  const eyeYRight: number = headY + headHeight * 0.25; // Y coordinate right eye
  const mouthX: number = headX + headWidth * 0.25; // X position of mouth
  const mouthY: number = headY + headHeight * 0.7; // Y position of mouth
  const mouthWidth: number = headWidth * 0.5; // width of mouth
  const mouthHeight: number = headHeight * 0.1; // height of mouth
  const antennaX: number = headX + headWidth * 0.5; // X coordinate of antenna
  const antennaY: number = headHeight * 0.25; // Y coordinate of top point of antenna
  const antennaCircleDiameter: number = eyeSize * 0.5; // diameter of antenna circle

  // Draw the robot's head
  fill("gray");
  rect(headX, headY, headWidth, headHeight);

  // eyes
  fill("black");
  circle(eyeXLeft, eyeYLeft, eyeSize); // left eye
  circle(eyeXRight, eyeYRight, eyeSize); // right eye

  // mouth
  fill("white");
  rect(mouthX, mouthY, mouthWidth, mouthHeight);

  // antenna
  line(antennaX, headY, antennaX, antennaY);
  circle(antennaX, antennaY, antennaCircleDiameter);
}
