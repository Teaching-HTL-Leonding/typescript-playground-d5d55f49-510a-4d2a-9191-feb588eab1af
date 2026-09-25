function setup() {
    createCanvas(600, 700);
    background("deepskyblue"); //blue bg

    // grey head
    fill("grey");
    circle(300, 400, 370);

    triangle(150, 260, 220, 200, 200, 120); // left ear
    triangle(450, 260, 380, 200, 400, 120); // right ear

    // eyes
    fill("black");
    circle(250, 350, 30);
    circle(350, 350, 30);

    // nose
    stroke("black");
    strokeWeight(4);

    fill("pink");
    triangle(280, 390, 320, 390, 300, 420);

    // hair
    line(300, 420, 300, 470);

    line(300, 470, 260, 485);
    line(300, 470, 340, 485);

    line(260, 485, 200, 470);
    line(340, 485, 400, 470);

    line(260, 420, 200, 400);
    line(340, 420, 400, 400);

    line(260, 440, 200, 440);
    line(340, 440, 400, 440);

}
