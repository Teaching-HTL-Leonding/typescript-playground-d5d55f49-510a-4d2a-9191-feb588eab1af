function setup() {
    createCanvas(700, 700);
    background("lightblue"); //lightblue bg
    
    // red building
    fill("red"); 
    rect(90, 310, 250, 300); 

    // brown triangle
    fill("saddlebrown");
    triangle(35, 320, 210, 170, 395, 320);

    // yellow door
    fill("yellow");
    rect(180, 470, 70, 140);

    // tree
    fill("saddlebrown");
    rect(510, 370, 80, 240);

    fill("green");
    circle(470, 350, 150);
    circle(600, 350, 150);
    circle(530, 250, 150);
}