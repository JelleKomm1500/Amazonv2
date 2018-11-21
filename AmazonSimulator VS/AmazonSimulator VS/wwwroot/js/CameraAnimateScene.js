window.onload = function () {
    //declare variables
    var camera, scene, renderer;
    var cameraControls;
    var water, ship, lhLight;
    var worldObjects = {};
    var lighthelper, rotWorldMatrix;
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
        //scene.add(Barrels());
        scene.add(Track());
        //scene.add(lighthouse());
        scene.add(Light());
        scene.add(lhLight);
        spotLightHelper = new THREE.SpotLightHelper(lhLight);
        scene.add(spotLightHelper);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        spotLightHelper.update();
        x_p += 1;
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
   