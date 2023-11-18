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
}