function setup() {
    createCanvas(400, 200);
    background("black");
    noStroke();
}

let message: string;

function mouseClicked() {
    if (mouseX <= width / 3) {
        background("red");
        message = "Red";
        console.log(message);
    } else if (mouseX <= 2 * width / 3) {
        background("gold");
        message = "Gold";
        console.log(message);
    } else {
        background("blue");
        message = "Blue";
        console.log(message);
    }
}