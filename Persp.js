class Persp {
    constructor(platno, xmin, xmax, ymin, ymax, distance) {
        if (!platno) alert("Greška - nema platna!");
        this.w = platno.width;
        this.h = platno.height;
        this.g = platno.getContext("2d");

        this.sx = this.w / (xmax - xmin);
        this.sy = -this.h / (ymax - ymin);

        this.px = -this.sx * xmin;
        this.py = -this.sy * ymax;

        this.platno = platno;
        this.xmin = -xmin;
        this.xmax = xmax;
        this.ymin = -ymin;
        this.ymax = ymax;

        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.distance = distance;
    }

    stozac(r, h, n) {
        var counter = 0;
        var list = [];
        for (let fi = 0; fi <= 2 * Math.PI; fi += 2 * Math.PI / n) {
            list[counter++] = fi;
        }

        this.postaviNa(r * Math.cos(list[0]), r * Math.sin(list[0]), 0);

        for (let i = 1; i < n; i++) {
            var x = r * Math.cos(list[i]);
            var y = r * Math.sin(list[i]);
            this.linijaDo(x, y, 0);
            this.povuciLiniju();
            this.postaviNa(x, y, 0);
        }

        this.linijaDo(r * Math.cos(list[0]), r * Math.sin(list[0]), 0);
        this.povuciLiniju();
        this.postaviNa(0, 0, h);

        for (let i = 0; i < n; i++) {
            var x = r * Math.cos(list[i]);
            var y = r * Math.sin(list[i]);
            this.linijaDo(x, y, 0);
            this.povuciLiniju();
            this.postaviNa(0, 0, h);
        }
    }

    valjak(r, h, n) {
        var counter = 0;
        var list = [];
        for (let fi = 0; fi <= 2 * Math.PI; fi += 2 * Math.PI / n) {
            list[counter++] = fi;
        }

        for (let j = 0; j <= h; j += h) {
            this.postaviNa(r * Math.cos(list[0]), r * Math.sin(list[0]), j);

            for (let i = 1; i < n; i++) {
                var x = r * Math.cos(list[i]);
                var y = r * Math.sin(list[i]);
                this.linijaDo(x, y, j);
                this.povuciLiniju();
                this.postaviNa(x, y, j);
            }
            this.linijaDo(r * Math.cos(list[0]), r * Math.sin(list[0]), j);
            this.povuciLiniju();
        }

        for (let i = 0; i < n; i++) {
            var x = r * Math.cos(list[i]);
            var y = r * Math.sin(list[i]);
            this.postaviNa(x, y, 0);
            this.linijaDo(x, y, h);
            this.povuciLiniju();
        }
    }

    kugla(r, m, n) {
        var pomak = 0.01;
        for (let fi = 0; fi < 2 * Math.PI; fi += 2 * Math.PI / m) {
            this.postaviNa(r * Math.cos(0) * Math.sin(0), r * Math.sin(0) * Math.sin(0), r * Math.cos(0));
            for (let theta = pomak; theta <= Math.PI; theta += pomak) {
                var x = r * Math.cos(fi) * Math.sin(theta);
                var y = r * Math.sin(fi) * Math.sin(theta);
                var z = r * Math.cos(theta);

                this.linijaDo(x, y, z);
                this.povuciLiniju();
                this.postaviNa(x, y, z);
            }
            this.linijaDo(-r * Math.cos(0) * Math.sin(0), -r * Math.sin(0) * Math.sin(0), -r * Math.cos(0));
            this.povuciLiniju();
        }

        for (let theta = Math.PI / (n + 1); theta < Math.PI; theta += Math.PI / (n + 1)) {
            this.postaviNa(r * Math.cos(0) * Math.sin(theta), r * Math.sin(0) * Math.sin(theta), r * Math.cos(theta));
            for (let fi = 0; fi <= 2 * Math.PI; fi += pomak) {
                var x = r * Math.cos(fi) * Math.sin(theta);
                var y = r * Math.sin(fi) * Math.sin(theta);
                var z = r * Math.cos(theta);

                this.linijaDo(x, y, z);
                
                this.povuciLiniju();
                this.postaviNa(x, y, z);
            }
            this.linijaDo(r * Math.cos(0) * Math.sin(theta), r * Math.sin(0) * Math.sin(theta), r * Math.cos(theta));
            this.povuciLiniju();
        }
    }

    trans(m) {
        this.matrica = m.mnoziMatrice(m.kamera, m.matrica);
    }

    postaviUdaljenost(d) {
        this.distance = d;
    }

    postaviNa(x, y, z) {
        var tranx = this.matrica[0][0] * x + this.matrica[0][1] * y + this.matrica[0][2] * z + this.matrica[0][3];
        var trany = this.matrica[1][0] * x + this.matrica[1][1] * y + this.matrica[1][2] * z + this.matrica[1][3];
        var tranz = this.matrica[2][0] * x + this.matrica[2][1] * y + this.matrica[2][2] * z + this.matrica[2][3];

        var tx = this.transformirajX(-(this.distance / tranz) * tranx);
        var ty = this.transformirajY(-(this.distance / tranz) * trany);

        this.g.beginPath();
        this.g.moveTo(tx, ty, tranz);
    }

    linijaDo(x, y, z) {
        var tranx = this.matrica[0][0] * x + this.matrica[0][1] * y + this.matrica[0][2] * z + this.matrica[0][3];
        var trany = this.matrica[1][0] * x + this.matrica[1][1] * y + this.matrica[1][2] * z + this.matrica[1][3];
        var tranz = this.matrica[2][0] * x + this.matrica[2][1] * y + this.matrica[2][2] * z + this.matrica[2][3];

        var tx = this.transformirajX(-(this.distance / tranz) * tranx);
        var ty = this.transformirajY(-(this.distance / tranz) * trany);

        this.g.lineTo(tx, ty, tranz);
    }


    koristiBoju(c) {
        this.g.strokeStyle = c;
    }

    povuciLiniju() {
        this.g.stroke();
    }

    transformirajX(x) {
        return (this.sx * x) + this.px;
    }

    transformirajY(y) {
        return (this.sy * y) + this.py;
    }

    pocistiPlatno() {
        this.g.fillStyle = "#FFFFFF";
        this.g.fillRect(0, 0, this.w, this.h);
        this.g.fillStyle = "#000000";
    }

}