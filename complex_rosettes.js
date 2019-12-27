const MAX_X = 2.0;
const THICKNESS = 2.0;
const COLOR_WHEEL_SECTORS = 10;

let display_polynomial = false;

function setup() {
    createCanvas(500, 750);
    background(0);
    refresh();
    show_color_wheel();
}

function refresh() {
    if (display_polynomial) {
        background(0);
    } else {
        show_color_wheel();
    }
}

function get_z(x, y) {
    const w = width;
    const hw = w / 2.0;
    const hh = height / 2.0;
    const u = (x - hw) / hw * MAX_X;
    const v = -(y - hh) / hw * MAX_X;
    
    return new Complex(u, v);
}

function show_color_wheel() {
    enable_hsb();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const z = get_z(x, y);
            const c = color_wheel(z, COLOR_WHEEL_SECTORS, 0.1, MAX_X);
            noFill();
            stroke(c);
            point(x, y);
        }
    }
    disable_hsb();
}

function keyReleased() {
    if (key === ' ') {
        display_polynomial = !display_polynomial;
        refresh();
    }
}
