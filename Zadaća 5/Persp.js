class Persp {
    constructor(platno, xmin, xmax, ymin, ymax, distance) {
        this.platno = platno;
        this.xmin = -xmin;
        this.xmax = xmax;
        this.ymin = -ymin;
        this.ymax = ymax;

        this.width = this.platno.width;
        this.height = this.platno.height;
        this.g = this.platno.getContext("2d");

        this.sx = this.width / (xmax - xmin);
        this.sy = -this.height / (ymax - ymin);

        this.px = -this.sx * xmin;
        this.py = -this.sy * ymax;

        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.distance = distance;
    }

    promijeniUdaljenost(distance) {
        this.distance = distance;
    }

    trans(m) {
        this.matrica = m.pomnoziMatrice(m.kamera, m.matrica);
    }

    transformirajX(x) {
        return (this.sx * x) + this.px;
    }

    transformirajY(y) {
        return (this.sy * y) + this.py;
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

    pocistiPlatno() {
        this.g.fillStyle = "#FFFFFF";
        this.g.fillRect(0, 0, this.width, this.height);
        this.g.fillStyle = "#000000";
    }

    stozac(r, h, n, boja) {
        var brojac = 0;
        var polje = [];

        this.koristiBoju(boja);

        for (let fi = 0; fi <= 2 * Math.PI; fi = fi + 2 * Math.PI / n) {
            polje[brojac] = fi;
            brojac++;
        }

        this.postaviNa(r * Math.cos(polje[0]), r * Math.sin(polje[0]), 0);

        for (let i = 0; i < n; i++) {
            var x = r * Math.cos(polje[i]);
            var y = r * Math.sin(polje[i]);
            this.linijaDo(x, y, 0);
            this.povuciLiniju();
            this.postaviNa(x, y, 0);
        }

        this.linijaDo(r * Math.cos(polje[0]), r * Math.sin(polje[0]), 0);
        this.povuciLiniju();
        this.postaviNa(0, 0, h);

        for (let i = 0; i < n; i++) {
            var x = r * Math.cos(polje[i]);
            var y = r * Math.sin(polje[i]);
            this.linijaDo(x, y, 0);
            this.povuciLiniju();
            this.postaviNa(0, 0, h);
        }
    }

    valjak(r, h, n, boja) {
        var brojac = 0;
        var polje = [];

        this.koristiBoju(boja);

        for (let fi = 0; fi <= 2 * Math.PI; fi = fi + 2 * Math.PI / n) {
            polje[brojac] = fi;
            brojac++;
        }

        for (let i = 0; i <= h; i = i + h) {
            this.postaviNa(r * Math.cos(polje[0]), r * Math.sin(polje[0]), i);
            for (let j = 1; j < n; j++) {
                var x = r * Math.cos(polje[j]);
                var y = r * Math.sin(polje[j]);
                this.linijaDo(x, y, i);
                this.povuciLiniju();
                this.postaviNa(x, y, i);
            }
            this.linijaDo(r * Math.cos(polje[0]), r * Math.sin(polje[0]), i);
            this.povuciLiniju();
        }

        for (let i = 0; i < n; i++) {
            var x = r * Math.cos(polje[i]);
            var y = r * Math.sin(polje[i]);
            this.postaviNa(x, y, 0);
            this.linijaDo(x, y, h);
            this.povuciLiniju();
        }
    }

    kugla(r, m, n, boja, polukugla = true) {
        var pomak = 0.05;

        this.koristiBoju(boja);

        for (let fi = 0; polukugla == true ? fi <= Math.PI : fi <= 2 * Math.PI; fi = fi + 2 * Math.PI / m) {
            this.postaviNa(r * Math.cos(0) * Math.sin(0), r * Math.sin(0) * Math.sin(0), r * Math.cos(0));
            for (let theta = 0; theta <= Math.PI; theta = theta + pomak) {
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

        for (let theta = Math.PI / (n + 1); theta <= Math.PI; theta = theta + Math.PI / (n + 1)) {
            this.postaviNa(r * Math.cos(0) * Math.sin(theta), r * Math.sin(0) * Math.sin(theta), r * Math.cos(theta));
            for (let fi = 0; polukugla == true ? fi <= Math.PI : fi <= 2 * Math.PI; fi = fi + pomak) {
                var x = r * Math.cos(fi) * Math.sin(theta);
                var y = r * Math.sin(fi) * Math.sin(theta);
                var z = r * Math.cos(theta);
                this.linijaDo(x, y, z);
                this.povuciLiniju();
                this.postaviNa(x, y, z);
            }
            if (polukugla == false) {
                this.linijaDo(r * Math.cos(0) * Math.sin(theta), r * Math.sin(0) * Math.sin(theta), r * Math.cos(theta));
                this.povuciLiniju();
            }
        }
    }
}