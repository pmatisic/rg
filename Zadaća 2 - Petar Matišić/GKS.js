class GKS {
    constructor(platno, xmin, xmax, ymin, ymax, nacrtaj = true) {
        this.platno = platno;
        this.xmin = -xmin;
        this.xmax = xmax;
        this.ymin = -ymin;
        this.ymax = ymax;
        this.width = this.platno.width;
        this.height = this.platno.height;
        this.ctx = this.platno.getContext("2d");
        this.sx = this.width / (xmax - xmin);
        this.sy = -this.height / (ymax - ymin);
        this.px = -this.sx * xmin;
        this.py = -this.sy * ymax;
        this.matrica = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        if (nacrtaj) this.postaviKoordinatniSustav();
    }

    static GKS(platno, xmin, xmax) {
        var height = platno.height;
        var width = platno.width;
        var sx = width / (xmax - xmin);
        var sy = -sx;
        var ymax = (-height / sy) / 2;
        var gks = new GKS(platno, xmin, xmax, -ymax, ymax);
        gks.sy = -sx;
        gks.sx = sx;
        gks.px = -sx * xmin;
        gks.py = height / 2;
        return gks;
    }

    postaviKoordinatniSustav() {
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#FFFFE0";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "14px Arial";

        this.lijevo = (this.xmin / (this.xmin + this.xmax)) * this.width;
        this.desno = (this.xmax / (this.xmin + this.xmax)) * this.width;
        this.gore = (this.ymax / (this.ymin + this.ymax)) * this.height;
        this.dolje = (this.ymin / (this.ymin + this.ymax)) * this.height;

        this.nacrtajOsi();
        this.nacrtajOznake();
    }

    nacrtajOsi() {
        const linije = [
            [this.lijevo, this.gore, this.lijevo, 0],
            [this.lijevo, this.gore, 0, this.gore],
            [this.lijevo, this.gore, this.desno + this.lijevo, this.gore],
            [this.lijevo, this.gore, this.lijevo, this.gore + this.dolje]
        ];
        for (const [x1, y1, x2, y2] of linije) {
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    nacrtajOznake() {
        const Xmin = this.lijevo / this.xmin;
        const Xmax = this.desno / this.xmax;
        const Ymin = this.dolje / this.ymin;
        const Ymax = this.gore / this.ymax;
        let broj = 0;
        for (let i = this.lijevo - Xmin; i > 0; i -= Xmin) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, this.gore - 5);
            this.ctx.lineTo(i, this.gore + 5);
            this.ctx.stroke();
            this.ctx.fillText(--broj, i - 5, this.gore + 20);
        }
        broj = 0;
        for (let i = this.lijevo + Xmax; i < this.width; i += Xmax) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, this.gore - 5);
            this.ctx.lineTo(i, this.gore + 5);
            this.ctx.stroke();
            this.ctx.fillText(++broj, i - 5, this.gore + 20);
        }
        broj = 0;
        for (let i = this.gore - Ymax; i > 0; i -= Ymax) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lijevo - 5, i);
            this.ctx.lineTo(this.lijevo + 5, i);
            this.ctx.stroke();
            this.ctx.fillText(++broj, this.lijevo + 5, i + 4);
        }
        broj = 0;
        for (let i = this.gore + Ymin; i < this.height; i += Ymin) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lijevo - 5, i);
            this.ctx.lineTo(this.lijevo + 5, i);
            this.ctx.stroke();
            this.ctx.fillText(--broj, this.lijevo + 5, i + 4);
        }
    }

    trans(m) {
        this.matrica = m.matrica;
    }

    postaviNa(x, y) {
        var tranx = this.matrica[0][0] * x + this.matrica[0][1] * y + this.matrica[0][2];
        var trany = this.matrica[1][0] * x + this.matrica[1][1] * y + this.matrica[1][2];

        var tx = this.sx * tranx + this.px;
        var ty = this.sy * trany + this.py;

        this.ctx.beginPath();
        this.ctx.moveTo(tx, ty);
    }

    linijaDo(x, y) {
        var tranx = this.matrica[0][0] * x + this.matrica[0][1] * y + this.matrica[0][2];
        var trany = this.matrica[1][0] * x + this.matrica[1][1] * y + this.matrica[1][2];

        var tx = this.sx * tranx + this.px;
        var ty = this.sy * trany + this.py;

        this.ctx.lineTo(tx, ty);
    }

    koristiBoju(c) {
        this.ctx.strokeStyle = c;
    }

    povuciLiniju() {
        this.ctx.stroke();
    }
}