class MT2D {
    constructor() {
        this.matrica = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    }

    set postaviMatricu(matrica) {
        this.matrica = matrica;
    }

    lista() {
        var lista = [];
        var c = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                lista[c++] = this.matrica[j][i];
            }
        }
        return lista;
    }

    projekcija2D(xmin, xmax, ymin, ymax) {
        var sx = 2 / (xmax - xmin);
        var sy = 2 / (ymax - ymin);
        var tx = -sx * xmin - 1;
        var ty = -sy * ymin - 1;
        var mat = [[sx, 0, tx], [0, sy, ty], [0, 0, 1]];
        this.mult(mat);
    }

    projekcija2Dx(xmin, xmax, ymin, ymax, w, h) {
        var k = ((h / w) * (xmax - xmin) - (ymax - ymin)) / 2;
        var y1 = ymin - k;
        var y2 = ymax + k;
        this.projekcija2D(xmin, xmax, y1, y2);
    }

    projekcija2Dy(xmin, xmax, ymin, ymax, w, h) {
        var k = ((w / h) * (ymax - ymin) - (xmax - xmin)) / 2;
        var x1 = xmin - k;
        var x2 = xmax + k;
        this.projekcija2D(xmin, xmax, x1, x2);
    }

    identitet() {
        this.matrica = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    }

    pomakni(px, py) {
        var mat = [[1, 0, 0], [0, 1, 0], [px, py, 1]];
        this.mult(mat);
    }

    skaliraj(sx, sy) {
        var mat = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaX() {
        var mat = [[1, 0, 0], [0, -1, 0], [0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaY() {
        var mat = [[-1, 0, 0], [0, 1, 0], [0, 0, 1]];
        this.mult(mat);
    }

    rotiraj(kut) {
        var mat = [[Math.cos(kut), -Math.sin(kut), 0], [Math.sin(kut), Math.cos(kut), 0], [0, 0, 1]];
        this.mult(mat);
    }

    smicanje(alpha, beta) {
        var mat = [[1, Math.tan(beta), 0], [Math.tan(alpha), 1, 0], [0, 0, 1]];
        this.mult(mat);
    }

    mult(m2) {
        var m1 = this.matrica;
        var mat = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                mat[i][j] = m1[i][0] * m2[0][j] + m1[i][1] * m2[1][j] + m1[i][2] * m2[2][j];
            }
        }
        this.matrica = mat;
    }
}