window.onload = function () {
    //declare variables
    var camera, scene, renderer;
    var cameraControls;
    var water, ship;
    var lights = lighthouseLight();
    var spotLight = lights[0];
    var pointLight = lights[1];
    var boolTurn = false;
    var worldObjects = {};
    var x_p = 0;

    function init() {
        //create camera view, scene and renderer
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        cameraControls = new THREE.OrbitControls(camera);
        camera.position.z = 75;
        camera.position.y = 25;
        camera.position.x = 75;
        cameraControls.update();
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
        //store water and the boat in another variable, so that it can be used outside of the init function
        water = WaterRender();
        //ship = Boat();
        //add the objects and geometries to the scene
        scene.add(water);
        //scene.add(ship);
        scene.add(Skybox());
        scene.add(Platform());
        //var geometry = new THREE.BoxGeometry(1, 1, 1);
        //material = new THREE.MeshPhongMaterial({
        //    color: 0xff0000,
        //});
        //mesh = new THREE.Mesh(geometry, material);
        //mesh.castShadow = true;
        //mesh.position.set(0, 10, 0);
        //mesh.scale.set(10, 10, 10);
        //scene.add(mesh);
        //scene.add(Barrels());
        scene.add(Track());
        //scene.add(lighthouse());
        scene.add(Light());
        scene.add(spotLight);
        scene.add(pointLight);
        //spotLightHelper = new THREE.SpotLightHelper(spotLight);
        //scene.add(spotLightHelper);
        //var helper = new THREE.CameraHelper(spotLight.shadow.camera);
        //scene.add(helper);
        var sphereSize = 1;
        var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize, 0xFFAA55);
        scene.add(pointLightHelper);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        //spotLightHelper.update();
        if (x_p < 300 && boolTurn === false) {
            x_p += 1;
            if (x_p === 100) {
                boolTurn = true;
            }
        }
        else if (boolTurn === true) {
            x_p -= 1;
            if (x_p === -100) {
                boolTurn = false;
            }
        }
        spotLight.target.position.set(x_p, 0, x_p);
        spotLight.target.updateMatrixWorld();
        cameraControls.update();
        render();
    }
    //render function to animate the water shader, also cause off huge gpu dependency
    function render() {
        var time = performance.now() * 0.001;
        water.material.uniforms.time.value += 1.0 / 60.0;
        renderer.render(scene, camera);
    }

    exampleSocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/connect_client");
    exampleSocket.onmessage = function (event) {
        var command = parseCommand(event.data);
        var group = new THREE.Group();

        if (command.command === "update") {
            if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0) {

                if (command.parameters.type === "robot") {

                    group.add(Robot());

                    worldObjects[command.parameters.guid] = group;
                }

                else if (command.parameters.type === "boat") {
                    group.add(Boat());

                    worldObjects[command.parameters.guid] = group;
                    render();
                }
                else if (command.parameters.type === "lighthouse") {
                    group.add(Lighthouse());

                    worldObjects[command.parameters.guid] = group;
                }
                else if (command.parameters.type === "barrels") {
                    group.add(Barrels());

                    worldObjects[command.parameters.guid] = group;
                }

                scene.add(group);
            }


            var object = worldObjects[command.parameters.guid];

            object.position.x = command.parameters.x;
            object.position.y = command.parameters.y;
            object.position.z = command.parameters.z;

        }
    };
    init();
    animate();
};
   