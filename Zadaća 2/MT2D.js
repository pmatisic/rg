class MT2D {
	constructor() {
		this.matrica = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
	}

	identitet() {
		this.matrica = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
	}

	pomakni(px, py) {
		var mat = [[1, 0, px], [0, 1, py], [0, 0, 1]];
		this.mult(mat);
	}

	skaliraj(sx, sy) {
		var mat = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
		this.mult(mat);
	}

	zrcaliNaX() {
		var mat = [[1, 0, 0], [0, -1, 0], [0, 0, 1]];
		this.mult(mat);
	}

	zrcaliNaY() {
		var mat = [[-1, 0, 0], [0, 1, 0], [0, 0, 1]];
		this.mult(mat);
	}

	rotiraj(kut) {
		var mat = [[Math.cos(kut), -Math.sin(kut), 0], [Math.sin(kut), Math.cos(kut), 0], [0, 0, 1]];
		this.mult(mat);
	}

	smicanje(alpha, beta) {
		var mat = [[1, Math.tan(beta), 0], [Math.tan(alpha), 1, 0], [0, 0, 1]];
		this.mult(mat);
	}

	mult(m) {
		var mat = this.matrica;
		let pom = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				for (let k = 0; k < 3; k++) {
					pom[i][j] = mat[i][0] * m[0][j] + mat[i][1] * m[1][j] + mat[i][2] * m[2][j];
				}
			}
		}
		this.matrica = pom;
	}

	zrcaliNa(k, l) {
		this.pomakni(0, l);
		this.rotiraj(Math.atan(k));
		this.zrcaliNaX();
		this.rotiraj(-Math.atan(k));
		this.pomakni(0, -l);
	}

	rotiraj_oko_tocke(x0, y0, kut) {
		this.pomakni(x0, y0);
		this.rotiraj(kut);
		this.pomakni(-x0, -y0);
	}
}