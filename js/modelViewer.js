// Define initializeViewer in the global scope
window.initializeViewer = function() {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    const container = document.getElementById('modelViewer');
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetWidth);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Add dummy cube (placeholder for actual 3D model)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x44a8ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    function onWindowResize() {
        const width = container.offsetWidth;
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.setSize(width, width);
    }
    window.addEventListener('resize', onWindowResize, false);
};

// Initialize the viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.initializeViewer();
});
