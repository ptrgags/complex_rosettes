const MAX_X = 1.5;
const THICKNESS = 2.0;
const COLOR_WHEEL_SECTORS = 5 * 1;
const ZERO_THRESHOLD = 0.2;
const MAX_THRESHOLD = 1e9;
const PALETTE = grey_wheel;

let display_polynomial = true;

function setup() {
    createCanvas(500, 750);
    background(0);
    refresh();
}

function refresh() {
    if (display_polynomial) {
        compute_polynomial();
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
            const c = PALETTE(z, COLOR_WHEEL_SECTORS, 0.1, MAX_X);
            noFill();
            stroke(c);
            point(x, y);
        }
    }
    disable_hsb();
}

function compute_polynomial() {
    enable_hsb();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const z = get_z(x, y);
            const w = POLYNOMIAL.compute(z);
            const c = PALETTE(w, COLOR_WHEEL_SECTORS, ZERO_THRESHOLD, MAX_THRESHOLD);
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
