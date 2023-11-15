class MT3D {
    constructor() {
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.kamera = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

    set postaviMatricu(matrica) {
        this.matrica = matrica;
    }

    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz) {
        var N = [x0 - x1, y0 - y1, z0 - z1];
        var V = [Vx, Vy, Vz];

        var Na = Math.sqrt(Math.pow(N[0],2) + Math.pow(N[1],2) + Math.pow(N[2],2));
        var n = [N[0]/Na,N[1]/Na,N[2]/Na];

        var U = this.VP(V,n);
        var Ua = Math.sqrt(Math.pow(U[0],2) + Math.pow(U[1],2) + Math.pow(U[2],2));
        var u = [U[0]/Ua,U[1]/Ua,U[2]/Ua];

        var v = this.VP(n,u);

        this.kamera =  [
            [u[0],u[1],u[2],-(u[0]*x0)-(u[1]*y0)-(u[2]*z0)],
            [v[0],v[1],v[2],-(v[0]*x0)-(v[1]*y0)-(v[2]*z0)],
            [n[0],n[1],n[2],-(n[0]*x0)-(n[1]*y0)-(n[2]*z0)],
            [0,0,0,1]
        ];
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
        var mTemp = [[1, 0, 0, px], [0, 1, 0, py], [0, 0, 1, pz], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    skaliraj(sx, sy, sz) {
        var mTemp = [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    zrcaliNaX() {
        var mTemp = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    zrcaliNaY() {
        var mTemp = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    zrcaliNaZ() {
        var mTemp = [[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    zrcaliNaXY() {
        var mTemp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    zrcaliNaXZ() {
        var mTemp = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    zrcaliNaYZ() {
        var mTemp = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    rotirajY(kut) {
        var mTemp = [[Math.cos(kut), 0, Math.sin(kut), 0], [0, 1, 0, 0], [-Math.sin(kut), 0, Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    rotirajX(kut) {
        var mTemp = [[1, 0, 0, 0], [0, Math.cos(kut), -Math.sin(kut), 0], [0, Math.sin(kut), Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(mTemp);
    }

    rotirajZ(kut) {
        var mTemp = [[Math.cos(kut), -Math.sin(kut), 0, 0], [Math.sin(kut), Math.cos(kut), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(mTemp);
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

    mult(m2) {
        var m1 = this.matrica;
        var mTemp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        var tmp = 0;

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                for (let k = 0; k <= 3; k++) {
                    tmp += m1[i][k] * m2[k][j];
                }
                mTemp[i][j] = tmp;
                tmp = 0;
            }
        }
        this.matrica = mTemp;
    }

    mnoziMatrice(m1, m2) {
        var mTemp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        var tmp = 0;

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                for (let k = 0; k <= 3; k++) {
                    tmp += m1[i][k] * m2[k][j];
                }
                mTemp[i][j] = tmp;
                tmp = 0;
            }
        }
        return mTemp;
    }
}