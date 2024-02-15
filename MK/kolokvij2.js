window.onload = WebGL2aplikacija;

function WebGL2aplikacija() {
    var platno1 = document.getElementById("slika1");
    gl = platno1.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    GPUprogram1 = pripremiGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.CULL_FACE);

    matrica = new MT3D();

    function napuniSpremnike() {
        GPUprogram1.a_vrhXYZ = gl.getAttribLocation(GPUprogram1, "a_vrhXYZ");
        GPUprogram1.a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");
        GPUprogram1.u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");

        GPUprogram1.u_kameraXYZ = gl.getUniformLocation(GPUprogram1, "u_kameraXYZ");
        GPUprogram1.u_izvor = gl.getUniformLocation(GPUprogram1, "u_izvor");

        GPUprogram1.a_normala = gl.getAttribLocation(GPUprogram1, "a_normala");

        vrhoviRavnineVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviRavnineVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviPodloge), gl.STATIC_DRAW);

        vrhoviVanjskePolukugleVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviVanjskePolukugleVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vanjskiVrhoviKugla), gl.STATIC_DRAW);

        vrhoviUnutarnjePolukugleVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviUnutarnjePolukugleVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unutarnjiVrhoviKugla), gl.STATIC_DRAW);

        vrhoviKugleVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviKugleVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviKugla), gl.STATIC_DRAW);

        vrhoviStozcaVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviStozcaVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviStozac), gl.STATIC_DRAW);

        vrhoviUspravnogValjkaVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviUspravnogValjkaVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviUspravniValjak), gl.STATIC_DRAW);

        vrhoviUspravnogValjka2VAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviUspravnogValjka2VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviUspravniValjak2), gl.STATIC_DRAW);

        vrhoviUspravnogValjka3VAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviUspravnogValjka3VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviUspravniValjak3), gl.STATIC_DRAW);

        vrhoviKosiValjakVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviKosiValjakVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviKosiValjak), gl.STATIC_DRAW);

        vrhoviKosiValjak2VAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviKosiValjak2VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviKosiValjak2), gl.STATIC_DRAW);

        vrhoviLezecihValjakaVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviLezecihValjakaVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviLezeciValjak), gl.STATIC_DRAW);

        /* vrhoviElipsastogValjkaVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviElipsastogValjkaVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviElipsastiValjak), gl.STATIC_DRAW); */

        /* vrhoviPlastValjkaVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviPlastValjkaVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviPlastValjak), gl.STATIC_DRAW); */

        /* vrhoviPlastValjkaUnutarnjiVAO = gl.createVertexArray();
        gl.bindVertexArray(vrhoviPlastValjkaUnutarnjiVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(GPUprogram1.a_vrhXYZ);
        gl.enableVertexAttribArray(GPUprogram1.a_boja);
        gl.enableVertexAttribArray(GPUprogram1.a_normala);
        gl.vertexAttribPointer(GPUprogram1.a_vrhXYZ, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(GPUprogram1.a_normala, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(GPUprogram1.a_boja, 3, gl.FLOAT, false, 36, 24);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviPlastValjakUnutarnji), gl.STATIC_DRAW); */
    }

    function ravnina(a, boja) {
        var vrhovi = [];

        vrhovi.push(a, a, 0, 0, 0, 1, ...boja);
        vrhovi.push(-a, -a, 0, 0, 0, 1, ...boja);
        vrhovi.push(a, -a, 0, 0, 0, 1, ...boja);
        vrhovi.push(-a, a, 0, 0, 0, 1, ...boja);
        vrhovi.push(-a, -a, 0, 0, 0, 1, ...boja);
        vrhovi.push(a, a, 0, 0, 0, 1, ...boja);

        return vrhovi;
    }

    function polukugla(r, n, vanjski_dio, boja) {
        var vrhovi = [];
        var pomakX = Math.PI / n, pomakY = Math.PI / n;

        if (vanjski_dio) {
            for (let theta = 0; theta < Math.PI; theta = theta + pomakY) {
                for (let phi = 0; phi < Math.PI; phi = phi + pomakX) {
                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta);
                    y = Math.sin(phi + pomakX) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta + pomakY);
                    y = Math.sin(phi) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);
                }
            }
        }
        else {
            for (let theta = 0; theta < Math.PI; theta = theta + pomakY) {
                for (let phi = 0; phi < Math.PI; phi = phi + pomakX) {
                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta);
                    y = Math.sin(phi + pomakX) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta + pomakY);
                    y = Math.sin(phi) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);
                }
            }
        }

        return vrhovi;
    }

    function kugla(r, n, vanjski_dio, boja) {
        var vrhovi = [];
        var pomakX = Math.PI / n, pomakY = Math.PI / n;

        if (vanjski_dio) {
            for (let theta = 0; theta < 2 * Math.PI; theta = theta + pomakY) {
                for (let phi = 0; phi < 2 * Math.PI; phi = phi + pomakX) {
                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta);
                    y = Math.sin(phi + pomakX) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta + pomakY);
                    y = Math.sin(phi) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, x, y, z, ...boja);
                }
            }
        }
        else {
            for (let theta = 0; theta < 2 * Math.PI; theta = theta + pomakY) {
                for (let phi = 0; phi < 2 * Math.PI; phi = phi + pomakX) {
                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta);
                    y = Math.sin(phi + pomakX) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta);
                    y = Math.sin(phi) * Math.sin(theta);
                    z = Math.cos(theta);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi + pomakX) * Math.sin(theta + pomakY);
                    y = Math.sin(phi + pomakX) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);

                    x = Math.cos(phi) * Math.sin(theta + pomakY);
                    y = Math.sin(phi) * Math.sin(theta + pomakY);
                    z = Math.cos(theta + pomakY);
                    vrhovi.push(r * x, r * y, r * z, -x, -y, -z, ...boja);
                }
            }
        }

        return vrhovi;
    }

    function stozac(h, r, d, boja) {
        var vrhovi = [];

        vrhovi.push(0, 0, h, 0, 0, 1, ...boja);
        vrhovi.push(0, 0, 0, 0, 0, -1, ...boja);
        for (let phi = 0; phi <= 2 * Math.PI; phi += Math.PI / d) {
            vrhovi.push(r * Math.cos(phi), r * Math.sin(phi), 0, Math.cos(phi), Math.sin(phi), 0, ...boja);
        }
        for (let phi = 2 * Math.PI; phi >= 0; phi -= Math.PI / d) {
            vrhovi.push(r * Math.cos(phi), r * Math.sin(phi), 0, Math.cos(phi), Math.sin(phi), 0, ...boja);
        }

        return vrhovi;
    }

    function valjak(r, h, n, boja) {
        var vrhovi = [];

        vrhovi.push(0, 0, h / 2, 0, 0, 1, ...boja);
        let phi = 2 * Math.PI / n;
        for (let i = 0; i <= n; i++) {
            vrhovi.push(r * Math.cos(phi), r * Math.sin(phi), h / 2, 0, 0, 1, ...boja);
            phi += 2 * Math.PI / n;
        }
        vrhovi.push(0, 0, -h / 2, 0, 0, -1, ...boja);
        phi = 2 * Math.PI;
        for (let i = 0; i <= n; i++) {
            vrhovi.push(r * Math.cos(phi), r * Math.sin(phi), -h / 2, 0, 0, -1, ...boja);
            phi -= 2 * Math.PI / n;
        }
        phi = 0;
        for (let i = 0; i <= n; i++) {
            cos = Math.cos(phi);
            sin = Math.sin(phi);
            x = r * cos;
            y = r * sin;
            vrhovi.push(x, y, h / 2, cos, sin, 0, ...boja);
            vrhovi.push(x, y, -h / 2, cos, sin, 0, ...boja);
            phi += 2 * Math.PI / n;
        }

        return vrhovi;
    }

    function valjak_plast(r, h, n, boja, vanjski_dio) {
        var vrhovi = [];

        phi = 0;

        if(vanjski_dio){
            for (let i = 0; i <= n; i++) {
                cos = Math.cos(phi);
                sin = Math.sin(phi);
                x = r * cos;
                y = r * sin;
                vrhovi.push(x, y, h / 2, cos, sin, 0, ...boja);
                vrhovi.push(x, y, -h / 2, cos, sin, 0, ...boja);
                phi += 2 * Math.PI / n;
            }
        }
        else{
            for (let i = 0; i <= n; i++) {
                cos = Math.cos(phi);
                sin = Math.sin(phi);
                x = r * cos;
                y = r * sin;
                vrhovi.push(x, y, h / 2, -cos, -sin, 0, ...boja);
                vrhovi.push(x, y, -h / 2, -cos, -sin, 0, ...boja);
                phi += 2 * Math.PI / n;
            }
        }

        return vrhovi;
    }

    function elipsasti_valjak(rx, ry, h, n, boja) {
        var vrhovi = [];

        vrhovi.push(0, 0, h / 2, 0, 0, 1, ...boja);
        let phi = 2 * Math.PI / n;
        for (let i = 0; i <= n; i++) {
            vrhovi.push(rx * Math.cos(phi), ry * Math.sin(phi), h / 2, 0, 0, 1, ...boja);
            phi += 2 * Math.PI / n;
        }
        vrhovi.push(0, 0, -h / 2, 0, 0, -1, ...boja);
        phi = 2 * Math.PI;
        for (let i = 0; i <= n; i++) {
            vrhovi.push(rx * Math.cos(phi), ry * Math.sin(phi), -h / 2, 0, 0, -1, ...boja);
            phi -= 2 * Math.PI / n;
        }
        phi = 0;
        for (let i = 0; i <= n; i++) {
            cos = Math.cos(phi);
            sin = Math.sin(phi);
            x = rx * cos;
            y = ry * sin;
            vrhovi.push(x, y, h / 2, cos, sin, 0, ...boja);
            vrhovi.push(x, y, -h / 2, cos, sin, 0, ...boja);
            phi += 2 * Math.PI / n;
        }

        return vrhovi;
    }

    var stupanj = 0;
    var korak = 1;

    function iscrtaj() {
        gl.clearColor(0.1, 0.1, 0.1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, platno1.width, platno1.height);
        gl.uniform3fv(GPUprogram1.u_izvor, izvor); //-8, 2, 0 //[-8, 2, -4]

        stupanj = stupanj + korak;
        if (stupanj >= 360) stupanj = 0;

        function ravnina() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.pomakni(0, 0, 0);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviRavnineVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]); //-8, 2, 0
            gl.drawArrays(gl.TRIANGLES, 0, 6); //vrhoviPodloge.length/9
        }

        function stozac() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.pomakni(0, 0, -2);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviStozcaVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]);
            /* gl.drawArrays(gl.TRIANGLE_FAN, 0, 43);
            gl.drawArrays(gl.TRIANGLE_FAN, 42, 42); */
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 2*n+3);
        }

        function uspravniValjak() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.pomakni(0, 0, -3);
            //matrica.rotirajZ(stupanj);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviUspravnogValjkaVAO);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function uspravniValjak2() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.pomakni(0, 0, -3+0.4);
            //matrica.rotirajZ(stupanj);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviUspravnogValjka2VAO);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function uspravniValjak3() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.pomakni(0, 0, -3+0.4+0.4+1.4+1);
            //matrica.rotirajZ(stupanj);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviUspravnogValjka3VAO);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function lezeciValjak(kut) {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.rotirajZ(kut + stupanj);
            //matrica.rotirajX(90); 
            matrica.rotirajY(90);
            matrica.pomakni(-1.8, 0, -0.3);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviLezecihValjakaVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function kosiValjak(kut) {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.rotirajZ(kut + stupanj);
           /*  matrica.rotirajZ(kut + stupanj);
            matrica.rotirajX(90); */
            //matrica.rotirajY(180);
            matrica.pomakni(-0.5, 1.3, 2.5);
            matrica.rotirajX(-60);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviKosiValjakVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function kosiValjak2(kut) {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.rotirajZ(kut + stupanj);
           /*  matrica.rotirajZ(kut + stupanj);
            matrica.rotirajX(90); */
            
            matrica.pomakni(-0.5,3.8,4);
            matrica.rotirajX(30);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviKosiValjak2VAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function polukugla(kut) {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.rotirajZ(kut + stupanj);
            //matrica.rotirajZ(kut + stupanj);
            matrica.pomakni(-0.5,4.6,2.6);
            matrica.rotirajX(130);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviVanjskePolukugleVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]); //-6, 2, 0]
            //gl.uniform3fv(GPUprogram1.u_kameraXYZ, [-5, 0, -5]);
            gl.drawArrays(gl.TRIANGLES, 0, vanjskiVrhoviKugla.length / 9); //2400

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviUnutarnjePolukugleVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]); //-6, 2, 0]
            gl.drawArrays(gl.TRIANGLES, 0, unutarnjiVrhoviKugla.length / 9);
        }

        function kugla(kut) {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            
            matrica.rotirajZ(kut + stupanj);
            //matrica.rotirajZ(kut + stupanj);
            
            matrica.pomakni(-0.5,4.6,2.6);
            
            matrica.rotirajX(130);
            matrica.skaliraj(1.5,1.5,1);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviKugleVAO);
            //gl.uniform3fv(GPUprogram1.u_izvor, [-8, 2, -4]); //-6, 2, 0]
            //gl.uniform3fv(GPUprogram1.u_kameraXYZ, [-5, 0, -5]);
            gl.drawArrays(gl.TRIANGLES, 0, vrhoviKugla.length / 9); //2400
        }

        function elipsastiValjak() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);
            matrica.pomakni(4, 0, 0);
            //matrica.rotirajZ(stupanj);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviElipsastogValjkaVAO);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, n+2);
            gl.drawArrays(gl.TRIANGLE_FAN, n+2, n+2);
            gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n+2), 2*n+2);
        }

        function plastValjak() {
            matrica.identitet();
            matrica.persp(...persp);
            matrica.postaviKameru(...kamera);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviPlastValjkaVAO);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, vrhoviPlastValjak.length/9);

            gl.uniformMatrix4fv(GPUprogram1.u_mTrans, false, matrica.lista());
            gl.bindVertexArray(vrhoviPlastValjkaUnutanjiVAO);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, vrhoviPlastValjakUnutarnji.length/9);
        }

        uspravniValjak();
        uspravniValjak2();
        uspravniValjak3();
        lezeciValjak(0);
        kosiValjak(0);
        kosiValjak2(0);
        polukugla(0);
        //kugla(0);

        requestAnimationFrame(iscrtaj);
    } // iscrtaj

    let n = 50;

    // let kamera = [5, 5, 5, 0, 0, 0, 0, 0, 1];
    let kamera = [6, 6, 2, 0, 0, 1.8, 0, 0, 1];
    let persp = [-2, 2, -2, 2, 2.3, 20];
    let izvor = [-8, 2, -4]; //[-8, 2, -4]

    let vrhoviPodloge = ravnina(5, [0.5, 0.5, 0.5]);
    let vanjskiVrhoviKugla = polukugla(1, n, true, [0.6,0.8,1]);
    let unutarnjiVrhoviKugla = polukugla(1, n, false, [1,0.2,1]);
    let vrhoviStozac = stozac(3.8, 1.5, n, [0, 1, 0]);

    let vrhoviUspravniValjak = valjak(2.3, 0.4, n, [0.6,0.8,1]);
    let vrhoviUspravniValjak2 = valjak(1, 0.4, n, [0.6,0.8,1]);
    let vrhoviUspravniValjak3 = valjak(0.25, 5, n, [0.6,0.8,1]);

    let vrhoviLezeciValjak = valjak(0.5, 1.55, n, [0.6,0.8,1]);

    let vrhoviKosiValjak = valjak(0.2, 5, n, [0.6,0.8,1]);

    let vrhoviKosiValjak2 = valjak(0.5, 1.55, n, [0.6,0.8,1]);

    let vrhoviKugla = kugla(0.5, n, true, [0.6,0.8,1]);

    napuniSpremnike();

    iscrtaj();
} //WebGL2aplikacija