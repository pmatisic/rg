class MT3D {
    constructor() {
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

    set postaviMatricu(matrica) {
        this.matrica = matrica;
    }

    lista() {
        var lista = [];
        var c = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                lista[c++] = this.matrica[j][i];
            }
        }
        return lista;
    }

    identitet() {
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

    pomakni(px, py, pz) {
        var mat = [[1, 0, 0, px], [0, 1, 0, py], [0, 0, 1, pz], [0, 0, 0, 1]];
        this.mult(mat);
    }

    skaliraj(sx, sy, sz) {
        var mat = [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaX() {
        var mat = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaY() {
        var mat = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaZ() {
        var mat = [[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaXY() {
        var mat = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaXZ() {
        var mat = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    zrcaliNaYZ() {
        var mat = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    rotirajY(kut) {
        var mat = [[Math.cos(kut), 0, Math.sin(kut), 0], [0, 1, 0, 0], [-Math.sin(kut), 0, Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    rotirajX(kut) {
        var mat = [[1, 0, 0, 0], [0, Math.cos(kut), -Math.sin(kut), 0], [0, Math.sin(kut), Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    rotirajZ(kut) {
        var mat = [[Math.cos(kut), -Math.sin(kut), 0, 0], [Math.sin(kut), Math.cos(kut), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    mult(m2) {
        var m1 = this.matrica;
        var mat = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        var tmp = 0;

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                for (let k = 0; k <= 3; k++) {
                    tmp += m1[i][k] * m2[k][j];
                }
                mat[i][j] = tmp;
                tmp = 0;
            }
        }
        this.matrica = mat;
    }
}