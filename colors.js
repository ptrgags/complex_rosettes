function enable_hsb() {
    colorMode(HSB, 1, 1, 1, 1);
}

function disable_hsb() {
    colorMode(RGB, 255);
}

let foo = false;

class Palette {
    constructor(params) {
        this.params = {
            zero_threshold: 0.2,
            max_threshold: 1e9,
            zero_color: [0.75, 1.0, 0.3,],
            max_color: [0.5, 1.0, 0.3,],
            ...params
        };
    }
    
    /**
     * Color small and large values with special colors
     * to make it more obvious.
     */
    check_radius(z) {
        const r = z.mod;
        if (r < this.params.zero_threshold) {
            return color(...this.params.zero_color);
        } else if (r > this.params.max_threshold) {
            return color(...this.params.max_color);
        }
        
        return undefined;
    }
    
    get_color(z) {
        const extreme_color = this.check_radius(z);
        if (extreme_color !== undefined) {
            return extreme_color;
        }
        
        return this.color_impl(z);
    }
}

class ColorWheel extends Palette{
    color_impl(z) {
        const n = this.params.num_sectors;
        const theta_normalized = z.arg / TWO_PI;
        const bucket = Math.floor(theta_normalized * n);
        const hue = bucket / n;
    
        let saturation = 0.8;
        let brightness = 0.8;
        return color(hue, saturation, brightness);
    }
}

/*
function angle_brightness(z, n, zero_threshold, large_threshold) {
    const r = z.mod;
    const theta_normalized = z.arg / TWO_PI;
    const bucket = Math.floor(theta_normalized * n);
    const brightness = bucket / n;
    
    if (r < zero_threshold) {
        return color(0.75, 1.0, 0.3);
    } else if (r > large_threshold) {
        return color(0.5, 1.0, 0.3);
    }
    
    return color(0.1, 0.5, brightness);
}

function radius_brightness(z, n, zero_threshold, large_threshold) {
    const SHELLS = 10;
    const r = z.mod;
    const r_normalized = r / large_threshold; 
    const bucket = Math.floor(r_normalized * SHELLS);
    const brightness = bucket / SHELLS;
    
    if (r < zero_threshold) {
        return color(0.75, 1.0, 0.3);
    } else if (r > large_threshold) {
        return color(0.5, 1.0, 0.3);
    }
    
    return color(0.2, 0.5, brightness);
}
*/

const PALETTES = {
    "3-color rainbow": new ColorWheel({
        num_sectors: 3,
    }),
    "5-color rainbow": new ColorWheel({
        num_sectors: 5,
    }),
};
