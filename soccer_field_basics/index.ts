// It must be possible to scale the entire field by changing the value of the constant SCALE.
// E.g. a SCALE value of 2 will create a small image, while a SCALE value of 10 will create a large image.
const SCALE = 6;

// Margin around the field (i.e. distance from edge to the field)
const MARGIN = 4    

function setup() {
    // We must calculate the size of the canvas using the constants.
    // Note that we assume that the soccer field has a width of 100m
    // and a height of 70m.
    createCanvas((100 + MARGIN * 2) * SCALE, (70 + MARGIN * 2) * SCALE);
    background("green");

    strokeWeight(0.5);
    stroke("white");
    noFill();
    angleMode(DEGREES);

    push();

    // Note that we scale everything by the constant SCALE. We use the size values
    // in meters as if they were pixels, and then scale them up by the SCALE factor.
    // Experiment with different SCALE values to see how it works.
    scale(SCALE);

    // translate moves the origin of the coordinate system. 0/0 will not be
    // in the top-left corner, but MARGIN pixels to the right/down.
    // Experiment with different MARGIN values to see how it works.
    translate(MARGIN, MARGIN);

    // TODO: Draw the soccer field as close as possible to a real soccer field.
    // <<< ADD YOUR CODE HERE

    // touchline
    rect(0, 0, 100, 70);
    
    // centre circle
    fill("white");
    circle(50, 35, 1.5);

    noFill();

    // kick off circle
    circle(50, 35, 18.3);

    // Halfway line
    line(50, 0, 50, 70)

    // corner arc
    arc(0, 0, 2, 2, 0, 90); // top left
    arc(100, 0, 2, 2, 90, 180); // top right
    arc(0, 70, 2, 2, 270, 0); // bottom left
    arc(100, 70, 2, 2, 180, 270); // bottom right


    // penalty arc
    circle(11, 35, 18.3); // left
    circle(89, 35, 18.3); // right

    // penalty area
    fill("green");
    rect(0, 14.84, 16.5, 40.32); // left
    rect(83.5, 14.84, 16.5, 40.32); // right

    // goal area
    rect(0, 25.84, 5.5, 18.32); // left
    rect(94.5, 25.84, 5.5, 18.32); // right

    // penalty marks
    fill("white");
    circle(11, 35, 1.5); // left
    circle(89, 35, 1.5); // right

}
