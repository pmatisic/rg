class MT3D {
    constructor() {
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
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

    rotirajX(kut) {
        var mat = [[1, 0, 0, 0], [0, Math.cos(kut), -Math.sin(kut), 0], [0, Math.sin(kut), Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    rotirajY(kut) {
        var mat = [[Math.cos(kut), 0, Math.sin(kut), 0], [0, 1, 0, 0], [-Math.sin(kut), 0, Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    rotirajZ(kut) {
        var mat = [[Math.cos(kut), -Math.sin(kut), 0, 0], [Math.sin(kut), Math.cos(kut), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mat);
    }

    mult(m) {
        var mat = this.matrica;
        var pom = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        var temp = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    temp += mat[i][k] * m[k][j];
                }
                pom[i][j] = temp;
                temp = 0;
            }
        }
        this.matrica = pom;
    }

    rotiraj_oko_osi(x0, y0, z0, u1, u2, u3, kut) {
        var x1 = u1 + x0;
        var y1 = u2 + y0;
        var z1 = u3 + z0;

        var a = (x1 - x0) / Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2) + Math.pow((z1 - z0), 2));
        var b = (y1 - y0) / Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2) + Math.pow((z1 - z0), 2));
        var c = (z1 - z0) / Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2) + Math.pow((z1 - z0), 2));

        var alfa = Math.asin(b / (Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2))));
        var beta = Math.asin(a);

        this.pomakni(x0, y0, z0);
        this.rotirajX(-alfa);
        this.rotirajY(beta);
        this.rotirajZ(kut);
        this.rotirajY(-beta);
        this.rotirajX(alfa);
        this.pomakni(-x0, -y0, -z0);
    }
}