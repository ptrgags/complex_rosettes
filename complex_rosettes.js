const MAX_X = 1.5;
const THICKNESS = 2.0;
const COLOR_WHEEL_SECTORS = 5 * 1;
const ZERO_THRESHOLD = 0.2;
const MAX_THRESHOLD = 1e9;
let palette = PALETTES[Object.keys(PALETTES)[0]];
let pattern = ROSETTES[Object.keys(ROSETTES)[0]];

let display_polynomial = true;

function make_rosette_select() {
    const sel = createSelect();
    sel.position(10, 10);
    for (const x of Object.keys(ROSETTES)) {
        sel.option(x);
    }
    sel.changed(change_rosette);
}

function change_rosette(e) {
    const selected = e.target.value;
    pattern = ROSETTES[selected];
    refresh();
}

function make_palette_select() {
    const sel = createSelect();
    sel.position(width / 2 + 10, 10);
    for (const x of Object.keys(PALETTES)) {
        sel.option(x);
    }
    sel.changed(change_palette);
}

function change_palette(e) {
    const selected = e.target.value;
    palette = PALETTES[selected];
    refresh();
}

function setup() {
    createCanvas(2 * 500, 750);
    background(0);
    make_rosette_select();
    make_palette_select();
    refresh();
}

function refresh() {
    compute_polynomial();
    show_color_wheel();
}

function get_z(x, y) {
    const w = width / 2;
    const hw = w / 2.0;
    const hh = height / 2.0;
    const u = (x - hw) / hw * MAX_X;
    const v = -(y - hh) / hw * MAX_X;
    
    return new Complex(u, v);
}

function show_color_wheel() {
    enable_hsb();
    for (let x = 0; x < width / 2; x++) {
        for (let y = 0; y < height; y++) {
            const z = get_z(x, y);
            const c = palette.get_color(z);
            noFill();
            stroke(c);
            point(x + width / 2, y);
        }
    }
    disable_hsb();
    
    fill(255);
    stroke(0);
    textSize(16);
    text("Color palette:", width / 2 + 10, 24);
}

function compute_polynomial() {
    enable_hsb();
    for (let x = 0; x < width / 2; x++) {
        for (let y = 0; y < height; y++) {
            const z = get_z(x, y);
            const w = pattern.compute(z);
            const c = palette.get_color(w);
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
