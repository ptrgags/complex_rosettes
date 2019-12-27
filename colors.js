function enable_hsb() {
    colorMode(HSB, 1, 1, 1, 1);
}

function disable_hsb() {
    colorMode(RGB, 255);
}

let foo = false;

function color_wheel(z, n, zero_threshold, large_threshold) {
    const r = z.mod;
    const theta_normalized = z.arg / TWO_PI;
    const bucket = Math.floor(theta_normalized * n);
    const hue = bucket / n;
    
    let saturation = 1.0;
    let brightness = 1.0;
    
    if (r < zero_threshold) {
        brightness = 0.0;
    } else if (r > large_threshold) {
        saturation = 0.0;
    }
    
    return color(hue, saturation, brightness);
}
