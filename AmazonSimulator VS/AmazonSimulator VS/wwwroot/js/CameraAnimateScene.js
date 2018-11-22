window.onload = function () {
    //declare variables
    var camera, scene, renderer;
    var cameraControls;
    var water, models;
    var lights = lighthouseLight();
    var spotLight = lights[0];
    var pointLight = lights[1];
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
        scene.add(water);
        scene.add(Skybox());
        scene.add(Platform());
        scene.add(Track());
        scene.add(Light());
        scene.add(spotLight);
        scene.add(pointLight);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        x_p = moveLight(x_p);
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
   