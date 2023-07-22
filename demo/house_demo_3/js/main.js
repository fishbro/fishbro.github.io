import * as THREE from "https://cdn.skypack.dev/three";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";
import { Sky } from "https://cdn.skypack.dev/three/examples/jsm/objects/Sky.js";

let camera, scene, renderer, loader, controls, house;

let sky, sun;

const createLight = (
  scene,
  params = {
    color: 0xdfebff,
    opacity: 1,
    position: [25, 100, 50],
    resolution: 512,
  },
  debug = false
) => {
  const light = new THREE.DirectionalLight(params.color, params.opacity);
  light.position.set(
    params.position[0],
    params.position[1],
    params.position[2]
  );
  light.position.multiplyScalar(1.3);

  light.castShadow = true;

  light.shadow.mapSize.width = params.resolution ? params.resolution : 512;
  light.shadow.mapSize.height = params.resolution ? params.resolution : 512;

  const d = 100; //300

  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;

  light.shadow.camera.far = 300;

  light.shadow.bias = -0.0005;

  scene.add(light);

  if (debug) {
    const helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper);
  }

  return light;
};

const initSky = () => {
  // Add Sky
  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 0,
    exposure: renderer.toneMappingExposure,
  };

  sky = new Sky();
  sky.scale.setScalar(300);
  scene.add(sky);

  sun = new THREE.Vector3();

  const uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = effectController.turbidity;
  uniforms["rayleigh"].value = effectController.rayleigh;
  uniforms["mieCoefficient"].value = effectController.mieCoefficient;
  uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

  const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
  const theta = THREE.MathUtils.degToRad(effectController.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  uniforms["sunPosition"].value.copy(sun);

  renderer.toneMappingExposure = effectController.exposure;
};

const init = () => {
  scene = new THREE.Scene();
  loader = new GLTFLoader();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 20);

  // Load a glTF resource
  loader.load(
    // resource URL
    "./model/house_base_textured_v0.5.gltf",
    // called when the resource is loaded
    function (gltf) {
      house = gltf.scene;
      house.castShadow = true;
      house.receiveShadow = true;
      scene.add(house);

      house.children.map((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          obj.material.bumpMap = obj.material.map;
          obj.material.bumpScale = 0.1;
          if (obj.material.map) obj.material.map.anisotropy = 8;
        }
        if (obj.name === "windows_glasses") {
          obj.visible = false;
        }
      });
      console.log(house);
      render();
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );

  // LIGHT
  scene.add(new THREE.AmbientLight(0x9e9b91, 0.5));

  const lightSKY = createLight(scene, {
    color: 0xdfebff,
    opacity: 0.3,
    position: [25, 100, 50],
    resolution: 256,
  });

  const lightSUN = createLight(scene, {
    color: 0xfffedf,
    opacity: 0.5,
    position: [0, 10, 50],
  });

  renderer = new THREE.WebGLRenderer({
    // antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // //Controls
  // controls = new OrbitControls(camera, renderer.domElement);
  // //vertical
  // controls.minPolarAngle = 1.55;
  // controls.maxPolarAngle = 1.7;

  // //horizontal
  // controls.minAzimuthAngle = -0.15;
  // controls.maxAzimuthAngle = 0.15;

  // controls.addEventListener("change", render); // use if there is no animation loop
  // controls.minDistance = 25;
  // controls.maxDistance = 30;
  // controls.target.set(0, 10, 0);
  // controls.update();
  // //Controls

  window.addEventListener("resize", onWindowResize);

  let viewSize = renderer.getSize();
  let xPath = 5;
  let yPath = 5;
  renderer.domElement.addEventListener("mousemove", (e) => {
    let mousePosPerc = {
      x: e.clientX / viewSize.x,
      y: 1 - e.clientY / viewSize.y,
    };

    camera.position.x = xPath / -2 + xPath * mousePosPerc.x;
    camera.position.y = yPath + yPath * mousePosPerc.y;

    render();
  });

  initSky();
  render();
};

const render = () => {
  renderer.render(scene, camera);

  // console.log(camera.position.x / Math.PI);
  // console.log(camera.position.y / Math.PI);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
};

init();
render();
