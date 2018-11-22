window.onload = function () {
    //declare variables
    var camera, scene, renderer;
    var cameraControls;
    var water, ship, lhLight, models;
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
        lhLight = lighthouseLight();
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
        scene.add(lhLight);
        spotLightHelper = new THREE.SpotLightHelper(lhLight);
        scene.add(spotLightHelper);
        var helper = new THREE.CameraHelper(lhLight.shadow.camera);
        scene.add(helper);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        spotLightHelper.update();
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
        lhLight.target.position.set(x_p, 0, x_p);
        lhLight.target.updateMatrixWorld();
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

        if (command.command === "update") {
            models = new THREE.Group();
            scene.add(models);
            if (Object.keys(worldObjects).indexOf(command.parameters.guid) < 0) {

                if (command.parameters.type === "robot") {
                    var robot = new Robot();
                    models.add(robot);
                    worldObjects[command.parameters.guid] = robot;
                }
                else if (command.parameters.type === "boat") {
                    var boat = new Boat();
                    models.add(boat);
                    worldObjects[command.parameters.guid] = boat;
                }
                else if (command.parameters.type === "lighthouse") {
                    var lighthouse = new Lighthouse();
                    models.add(lighthouse);
                    worldObjects[command.parameters.guid] = lighthouse;
                }
                else if (command.parameters.type === "barrels") {
                    var barrels = new Barrels();
                    models.add(barrels);
                    worldObjects[command.parameters.guid] = barrels;
                }
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
   