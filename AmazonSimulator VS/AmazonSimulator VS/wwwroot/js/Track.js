//Makes track and positions it
function Track(){
    var track = new THREE.Group();
    var tempZ = 55;
    var trackGeometryHor = new THREE.PlaneGeometry( 5, 103, 32 );
    var trackMaterial = new THREE.MeshLambertMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
    var planeHor1 = new THREE.Mesh( trackGeometryHor, trackMaterial );
    var planeHor2 = new THREE.Mesh( trackGeometryHor, trackMaterial );
    var planeVer = [];

    planeHor1.position.set(18.50, 3.07, 5.07);
    planeHor2.position.set(-46.47, 3.07, 5.07);
    planeHor1.rotation.x = Math.PI / 2;
    planeHor2.rotation.x = Math.PI / 2;
    track.add(planeHor1, planeHor2);         
                
    for(var i = 0; i < 6; i++){                   
        var trackGeometryVer = new THREE.PlaneGeometry(70, 4, 32);
        planeVer[i] = new THREE.Mesh(trackGeometryVer, trackMaterial);
        planeVer[i].rotation.x = Math.PI / 2;
        planeVer[i].position.set(-14, 3.07, tempZ);
        track.add(planeVer[i]);
        tempZ -= 20;
    }
    track.traverse(function (child) { child.receiveShadow = true; });
    return track;
}