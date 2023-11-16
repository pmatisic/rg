class GKS {
    constructor(platno, xmin, xmax, ymin, ymax) {
        this.platno = platno;
        this.ctx = platno.getContext("2d");
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;

        const xSkaliranje = this.platno.width / (this.xmax - this.xmin);
        const ySkaliranje = this.platno.height / (this.ymax - this.ymin);

        this.skaliranje = Math.min(xSkaliranje, ySkaliranje);
    }

    mapX(x) {
        const centarX = this.platno.width / 2;
        return centarX + (x * this.skaliranje);
    }

    mapY(y) {
        const centarY = this.platno.height / 2;
        return centarY - (y * this.skaliranje);
    }

    postaviNa(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.mapX(x), this.mapY(y));
    }

    linijaDo(x, y) {
        this.ctx.lineTo(this.mapX(x), this.mapY(y));
    }

    koristiBoju(c) {
        this.ctx.strokeStyle = c;
    }

    povuciLiniju() {
        this.ctx.stroke();
    }

    crtajOsi() {
        // X osa
        this.ctx.beginPath();
        this.koristiBoju("black");
        this.postaviNa(-this.platno.width / (2 * this.skaliranje), 0);
        this.linijaDo(this.platno.width / (2 * this.skaliranje), 0);
        this.povuciLiniju();
        this.ctx.closePath();

        // Y osa
        this.ctx.beginPath();
        this.postaviNa(0, -this.platno.height / (2 * this.skaliranje));
        this.linijaDo(0, this.platno.height / (2 * this.skaliranje));
        this.povuciLiniju();
        this.ctx.closePath();

        // Oznake na osima
        this.ctx.font = "12px Arial";
        this.ctx.fillText("X", this.mapX(this.xmax) - 25, this.mapY(0) - 10);
        this.ctx.fillText("Y", this.mapX(0) + 10, this.mapY(this.ymax) + 15);
        
        // Oznake i crtice na X osi
        let xMaxCanvas = Math.ceil(this.platno.width / (2 * this.skaliranje));
        for (let i = 1; i <= xMaxCanvas; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mapX(i), this.mapY(0.1));
            this.ctx.lineTo(this.mapX(i), this.mapY(-0.1));
            this.ctx.stroke();
            this.ctx.fillText(i.toString(), this.mapX(i) - 5, this.mapY(-0.1) + 20);

            this.ctx.beginPath();
            this.ctx.moveTo(this.mapX(-i), this.mapY(0.1));
            this.ctx.lineTo(this.mapX(-i), this.mapY(-0.1));
            this.ctx.stroke();
            this.ctx.fillText((-i).toString(), this.mapX(-i) - 5, this.mapY(-0.1) + 20);
        }

        // Oznake i crtice na Y osi
        let yMaxCanvas = Math.ceil(this.platno.height / (2 * this.skaliranje));
        for (let i = 1; i <= yMaxCanvas; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mapX(0.1), this.mapY(i));
            this.ctx.lineTo(this.mapX(-0.1), this.mapY(i));
            this.ctx.stroke();
            this.ctx.fillText(i.toString(), this.mapX(-0.4), this.mapY(i) + 5);

            this.ctx.beginPath();
            this.ctx.moveTo(this.mapX(0.1), this.mapY(-i));
            this.ctx.lineTo(this.mapX(-0.1), this.mapY(-i));
            this.ctx.stroke();
            this.ctx.fillText((-i).toString(), this.mapX(-0.4), this.mapY(-i) + 5);
        }
    }
}
