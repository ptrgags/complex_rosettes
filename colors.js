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
            ...params,
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

class ColorWheel extends Palette {
    constructor(params) {
        super({
            saturation: 0.8,
            brightness: 0.8,
            ...params,
        });
    }
    
    color_impl(z) {
        const n = this.params.num_sectors;
        const theta_normalized = z.arg / TWO_PI;
        const bucket = Math.floor(theta_normalized * n);
        const hue = bucket / n;
        
        return color(hue, this.params.saturation, this.params.brightness);
    }
}

class AngleBrightness extends Palette {
    constructor(params) {
        super({
            hue: 0.1,
            saturation: 0.5,
            ...params,
        });
    }
    
    color_impl(z) {
        const n = this.params.num_sectors;
        const theta_normalized = z.arg / TWO_PI;
        const bucket = Math.floor(theta_normalized * n);
        const brightness = bucket / n;
        
        return color(this.params.hue, this.params.saturation, brightness);
    }
}

class RadiusBrightness extends Palette {
    constructor(params) {
        super({
            hue: 0.3,
            saturation: 0.5,
            max_value: 0.5,
            ...params,
        });
    }
    
    color_impl(z) {
        const n = this.params.num_sectors;
        const r_normalized = z.mod / this.params.max_value;
        const bucket = Math.floor(r_normalized * n);
        const brightness = bucket / n;
        
        return color(this.params.hue, this.params.saturation, brightness);
    }
}

const PALETTES = {
    "3-color rainbow sectors": new ColorWheel({
        num_sectors: 3,
    }),
    "5-color rainbow sectors": new ColorWheel({
        num_sectors: 5,
    }),
    "5-shade tan sectors": new AngleBrightness({
        num_sectors: 5,
    }),
    "7-shade green rings": new RadiusBrightness({
        num_sectors: 7,
        max_value: 3.0,
    }),
    "20-shade red rings": new RadiusBrightness({
        num_sectors: 20,
        hue: 0.01,
        saturation: 0.5,
        max_value: 3.0,
        zero_threshold: 0.01,
    }),
    "10-shade blue sectors": new AngleBrightness({
        hue: 0.6,
        num_sectors: 10,
    }),
};
