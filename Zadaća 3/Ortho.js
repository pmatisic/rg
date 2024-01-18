class Ortho {
    constructor(platno, xmin, xmax, ymin, ymax) {
        this.platno = platno;
        this.xmin = -xmin;
        this.xmax = xmax;
        this.ymin = -ymin;
        this.ymax = ymax;
        this.width = platno.width;
        this.height = platno.height;
        this.g = platno.getContext("2d");
        this.sx = this.width / (xmax - xmin);
        this.sy = -this.height / (ymax - ymin);
        this.px = -this.sx * xmin;
        this.py = -this.sy * ymax;
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

    postaviNa(x, y, z) {
        var tranx = this.matrica[0][0] * x + this.matrica[0][1] * y + this.matrica[0][2] * z + this.matrica[0][3];
        var trany = this.matrica[1][0] * x + this.matrica[1][1] * y + this.matrica[1][2] * z + this.matrica[1][3];

        var tx = this.transformirajX(tranx);
        var ty = this.transformirajY(trany);

        this.g.beginPath();
        this.g.moveTo(tx, ty, z);
    }

    linijaDo(x, y, z) {
        var tranx = this.matrica[0][0] * x + this.matrica[0][1] * y + this.matrica[0][2] * z + this.matrica[0][3];
        var trany = this.matrica[1][0] * x + this.matrica[1][1] * y + this.matrica[1][2] * z + this.matrica[1][3];

        var tx = this.transformirajX(tranx);
        var ty = this.transformirajY(trany);

        this.g.lineTo(tx, ty, z);
    }

    trans(m) {
        this.matrica = m.matrica;
    }

    postaviBoju(c) {
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
        this.g.fillRect(0, 0, this.width, this.height);
        this.g.fillStyle = "#000000";
    }
}