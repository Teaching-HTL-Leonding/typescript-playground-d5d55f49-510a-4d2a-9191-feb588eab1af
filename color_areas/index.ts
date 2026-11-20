function setup() {
    createCanvas(400, 200);
    background("black");
    noStroke();
    fill("orange");
    rect(0, 0, width / 3, height);
    fill("green");
    rect(width / 3, 0, width / 3, height)
    fill("red");
    rect((width / 3) * 2, 0, width / 3, height);
    fill("black");
    rect(0, height * 0.7, width, height * 0.3);
}

let message: string;

function mouseClicked() {
    fill("black");
    rect(0, height * 0.7, width, height * 0.3);
    textStyle(BOLD);
    fill("white");
    textSize(20);
    textAlign(CENTER);
    if (mouseX <= width / 3) {
        message = "Orange";
    } else if (mouseX <= 2 * width / 3) {
        message = "Green";
    } else {
        message = "Red";
    }
    text(message, width / 2, height * 0.85);
}