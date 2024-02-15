class MT3D{
    constructor(){
        let m = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
        
        this._matrica = m;

        this.sx;
        this.sy;
        this.sz;
        this._px;
        this._py;
        this._pz;

        this._kamera = m;
    }

    lista(){
        let lista = [];
        for(let j = 0; j < 4; j++){
            for(let i = 0; i < 4; i++){
                lista.push(this._matrica[i][j]);
            }
        }

        return lista;
    }

    orto(xmin, xmax, ymin, ymax, zpr, zst){
        this.sx = 2/(xmax-xmin);
        this.sy = 2/(ymax-ymin);
        this.sz = 2/(zpr-zst);
        /* this._px = -this.sx*xmin-1;
        this._py = -this.sy*ymin-1; */
        this._px = (xmin+xmax)/(xmin-xmax);
        this._py = (ymin+ymax)/(ymin-ymax);
        this._pz = (zpr+zst)/(zpr-zst); 

        let m = [
                [this.sx,0,0,this._px],
                [0,this.sy,0,this._py],
                [0,0,this.sz,this._pz],
                [0,0,0,1]
                ];

        this.mult(m);
    }

    /**
     * 
     * @param {*} xmin 
     * @param {*} xmax 
     * @param {*} ymin 
     * @param {*} ymax 
     * @param {*} zpr 
     * @param {*} zst 
     */
    persp(xmin, xmax, ymin, ymax, zpr, zst){
        let m = [[(2*zpr)/(xmax-xmin), 0, (xmax+xmin)/(xmax-xmin), 0],
        [0, (2*zpr)/(ymax-ymin), (ymax+ymin)/(ymax-ymin), 0],
        [0, 0, (zpr+zst)/(zpr-zst), (2*zpr*zst)/(zpr-zst)],
        [0, 0, -1, 0]];

        this.mult(m);
    }

    trans(){
        this._matrica = this.mnoziMatrice(this._kamera, this._matrica);
    }

    transformirajTocku(x,y,z){
        const tocka = [x, y, z, 1];
        const tockaTransformirano = this.mnozenjeMatrice(this._matrica, tocka);
        return [tockaTransformirano[0], tockaTransformirano[1], tockaTransformirano[2]];
    }

    mnozenjeMatrice(matrica, vektor){
        const rezultat = [0,0,0,0];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              rezultat[i] += matrica[i][j] * vektor[j];
            }
        }
        return rezultat;
    }

    transformirajX(x){
        return this.sx*x+this._px;
    }

    transformirajY(y){
        return this.sy*y+this._py;
    }

    identitet(){
        let m = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
        this._matrica = m;
    }

    pomakni(px, py, pz){
        let m = [[1,0,0,px],[0,1,0,py],[0,0,1,pz],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    skaliraj(sx,sy,sz){
        let m = [[sx,0,0,0],[0,sy,0,0],[0,0,sz,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    zrcaliNaX(){
        let m = [[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    zrcaliNaY(){
        let m = [[-1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    zrcaliNaZ(){
        let m = [[-1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    zrcaliNaXY(){
        let m = [[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    zrcaliNaXZ(){
        let m = [[1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    zrcaliNaYZ(){
        let m = [[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
        //this._matrica = m;
        this.mult(m);
    }

    rotirajX(kut){
        var rad = (kut * Math.PI)/180;

        let m = [[1,0,0,0],
                 [0, Math.cos(rad), -Math.sin(rad), 0], 
                 [0, Math.sin(rad), Math.cos(rad), 0],
                 [0, 0, 0, 1]];

        //this._matrica = m;
        this.mult(m);
    }

    rotirajY(kut){
        var rad = (kut * Math.PI)/180;

        let m = [[Math.cos(rad), 0, Math.sin(rad), 0],
                 [0, 1, 0, 0], 
                 [-Math.sin(rad), 0, Math.cos(rad), 0],
                 [0, 0, 0, 1]];

        //this._matrica = m;
        this.mult(m);
    }

    rotirajZ(kut){
        var rad = (kut * Math.PI)/180;

        let m = [[Math.cos(rad), -Math.sin(rad), 0, 0],
                 [Math.sin(rad), Math.cos(rad), 0, 0], 
                 [0, 0, 1, 0],
                 [0, 0, 0, 1]];

        //this._matrica = m;
        this.mult(m);
    }

    mult(m){
        var rezultat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              for (let k = 0; k < 4; k++) {
                rezultat[i][j] += this._matrica[i][k] * m[k][j];
              }
            }
        }
        this._matrica = rezultat;
    }

    rotiraj(x1, y1, z1, x2, y2, z2, kut){
        var a = (x2-x1)/(Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2));
        var b = (y2-y1)/(Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2));
        var c = (z2-z1)/(Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2));

        var d = Math.sqrt(b**2+c**2);

        let alpha = Math.asin(b/d)*(180/Math.PI);
        let beta = Math.asin(a)*(180/Math.PI);

        //formula:

        this.pomakni(x1,y1,z1);
        this.rotirajX(-alpha);
        this.rotirajY(beta);
        this.rotirajZ(kut);
        this.rotirajY(-beta);
        this.rotirajX(alpha);
        this.pomakni(-x1,-y1,-z1);
    }

    VP(u, v){
        let vek = [0, 0, 0];
        vek[0] = u[1] * v[2] - u[2] * v[1];
        vek[1] = u[2] * v[0] - u[0] * v[2];
        vek[2] = u[0] * v[1] - u[1] * v[0];
        return vek;
    }

    mnoziMatrice(m1, m2){
        var rezultat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              for (let k = 0; k < 4; k++) {
                rezultat[i][j] += m1[i][k] * m2[k][j];
              }
            }
        }
        
        return rezultat;
    }

    /**
     * točka kamere: x0, y0, z0
     * 
     * točka u koju gleda kamera: x1, y1, z1
     * 
     * vektor smjera prema gore (view-up vektor): Vx, Vy, Vz
     * 
     * @param {*} x0 
     * @param {*} y0 
     * @param {*} z0 
     * @param {*} x1 
     * @param {*} y1 
     * @param {*} z1 
     * @param {*} Vx 
     * @param {*} Vy 
     * @param {*} Vz 
     */
    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz){

        var N = [x0-x1, y0-y1, z0-z1];
        var V = [Vx, Vy, Vz];

        var n0 = N[0]/(Math.sqrt(N[0]**2+N[1]**2+N[2]**2));
        var n1 = N[1]/(Math.sqrt(N[0]**2+N[1]**2+N[2]**2));
        var n2 = N[2]/(Math.sqrt(N[0]**2+N[1]**2+N[2]**2));

        var n = [n0, n1, n2];

        var U = this.VP(V,n);

        var u0 = U[0]/(Math.sqrt(U[0]**2+U[1]**2+U[2]**2));
        var u1 = U[1]/(Math.sqrt(U[0]**2+U[1]**2+U[2]**2));
        var u2 = U[2]/(Math.sqrt(U[0]**2+U[1]**2+U[2]**2));

        var u = [u0, u1, u2];

        var v = this.VP(n,u);

        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];

        this._kamera = [[u0, u1, u2, -u0*x0-u1*y0-u2*z0],
                        [v0, v1, v2, -v0*x0-v1*y0-v2*z0],
                        [n0, n1, n2, -n0*x0-n1*y0-n2*z0],
                        [0,  0,  0,  1]];

        this.mult(this._kamera);
    }
}