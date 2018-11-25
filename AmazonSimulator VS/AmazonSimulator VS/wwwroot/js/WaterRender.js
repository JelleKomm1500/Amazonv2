/**
 * Creates a plane and adds it to the THREE.Water to create a water plane
 * @returns {THREE.Water} returns the water plane, which will later be animated
 */
function waterRender(){
    var water;
    var waterGeometry = new THREE.PlaneBufferGeometry( 950, 950 );
    water = new THREE.Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( "textures/water/waternormals.jpg", function ( texture ) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
            alpha: 1.0,
            waterColor: 0x001e0f,
            distortionScale:  3.7,
            //fog: scene.fog !== undefined
        }
    );
    water.rotation.x = - Math.PI / 2;
    water.receiveShadow = true;
    return water;
}