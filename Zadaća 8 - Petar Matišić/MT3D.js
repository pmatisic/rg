class MT3D {
    constructor() {
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.kamera = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
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

    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz) {
        var N = [x0 - x1, y0 - y1, z0 - z1];
        var V = [Vx, Vy, Vz];

        var Na = Math.sqrt(Math.pow(N[0], 2) + Math.pow(N[1], 2) + Math.pow(N[2], 2));
        var n = [N[0] / Na, N[1] / Na, N[2] / Na];

        var U = this.VP(V, n);
        var Ua = Math.sqrt(Math.pow(U[0], 2) + Math.pow(U[1], 2) + Math.pow(U[2], 2));
        var u = [U[0] / Ua, U[1] / Ua, U[2] / Ua];

        var v = this.VP(n, u);

        this.kamera = [
            [u[0], u[1], u[2], -(u[0] * x0) - (u[1] * y0) - (u[2] * z0)],
            [v[0], v[1], v[2], -(v[0] * x0) - (v[1] * y0) - (v[2] * z0)],
            [n[0], n[1], n[2], -(n[0] * x0) - (n[1] * y0) - (n[2] * z0)],
            [0, 0, 0, 1]
        ];
        this.mult(this.kamera);
    }

    orto(xmin, xmax, ymin, ymax, zpr, zst) {
        var sx = 2 / (xmax - xmin);
        var sy = 2 / (ymax - ymin);
        var sz = 2 / (zpr - zst);
        var px = (xmin + xmax) / (xmin - xmax);
        var py = (ymin + ymax) / (ymin - ymax);
        var pz = (zpr + zst) / (zpr - zst);
        var mat = [[sx, 0, 0, px], [0, sy, 0, py], [0, 0, sz, pz], [0, 0, 0, 1]];
        this.mult(mat);
    }

    persp(xmin, xmax, ymin, ymax, zpr, zst) {
        var sx = (2 * zpr) / (xmax - xmin);
        var sy = (2 * zpr) / (ymax - ymin);
        var sz = (zpr + zst) / (zpr - zst);
        var px = (xmax + xmin) / (xmax - xmin);
        var py = (ymax + ymin) / (ymax - ymin);
        var pz = (2 * zpr * zst) / (zpr - zst);
        var mat = [[sx, 0, px, 0], [0, sy, py, 0], [0, 0, sz, pz], [0, 0, -1, 0]];
        this.mult(mat);
    }

    VP(u, v) {
        let vek = [0, 0, 0];
        vek[0] = u[1] * v[2] - u[2] * v[1];
        vek[1] = u[2] * v[0] - u[0] * v[2];
        vek[2] = u[0] * v[1] - u[1] * v[0];
        return vek;
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