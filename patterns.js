const PI = Math.PI;
const ROSETTES = {
    "7-fold symmetry take 1": new ComplexPolynomial([
        [0, 0, 1, 0,],
        [0, 7, 1/7, 0,],
        [0, -7, 1/7, 0,],
        [7, 0, 1/7, 0,],
        [-7, 0, 1/7, 0,],
    ]),
    "3-fold symmetry take 1": new ComplexPolynomial([
        [0, 0, 1, 0,],
        [0, 3, 1/3, 0,],
        [0, 6, 1/6, 0,],
        [1, 1, 1, 0,],
        [1, 4, 1/2, 0,],
        [1, 7, 1/3, 0,],
    ]),
    "5-fold symmetry take 1": new ComplexPolynomial([
        [-9, 1, 1/4, 0,],
        [1, 1, 1, 0,],
        [6, 1, 1/4, 0,],
        [11, 1, 1/8, 0,],
    ]),
    "5-fold symmetry take 2": new ComplexPolynomial([
        [1, -9, 1/4, 0,],
        [1, 1, 1, 0,],
        [1, 6, 1/4, 0,],
        [1, 11, 1/8, 0,],
    ]),
};
