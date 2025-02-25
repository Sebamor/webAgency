// Nav Rotate Animations
const navLinks = document.querySelectorAll('nav a');

const currentPage = window.location.pathname;

navLinks.forEach(link => {
    if (link.getAttribute('href') === '.' + currentPage) {
        link.classList.add('rotate');
    }
})

// Three.js Rain Animation
let scene, camera, renderer, material, particles;
const rainCount = 5000;

// Initialize scene
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up rain geometry
const geometry = new THREE.SphereGeometry(0.3, 0.3, 2, 4);

// Set the initial material based on the theme
const getRainColor = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--rain-color').trim();
};

// Create rain material
material = new THREE.MeshBasicMaterial({
    color: getRainColor(), 
    transparent: true
});

particles = new THREE.Group();
for (let i = 0; i < rainCount; i++) {
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(
        Math.random() * window.innerWidth - window.innerWidth / 2,
        Math.random() * window.innerHeight - window.innerHeight / 2,
        Math.random() * 100 - 50
    );
    particle.scale.set(1, 3, 1);
    particles.add(particle);
}
scene.add(particles);

// Set up camera position
camera.position.z = 5;

// Function to update the rain color based on the theme
const updateRainColor = () => {
    const rainColor = getRainColor();
    material.color.set(rainColor);
    renderer.setClearColor(getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color').trim(), 1);
};

// Function to animate the scene
const animate = () => {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.01;
    particles.rotation.y += 0.01;
    renderer.render(scene, camera);
};
animate();

// Handle window resize
const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

// Listen for window resize events
window.addEventListener('resize', onWindowResize, false);

// Light/Dark mode toggle functionality
const darkToggle = document.querySelector('.dark-btn');
const lightToggle = document.querySelector('.light-btn');
const darkText = document.getElementById('dark-text');
const lightText = document.getElementById('light-text');

// Function to set the theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        darkText.innerHTML = 'DARK ■';
        lightText.innerHTML = 'LIGHT □';
    } else {
        lightText.innerHTML = 'LIGHT ■';
        darkText.innerHTML = 'DARK □';
    }
    updateRainColor();
    localStorage.setItem('theme', theme);
};

// Event listeners for theme toggle buttons
darkToggle.addEventListener('click', () => {
    setTheme('dark');
});

lightToggle.addEventListener('click', () => {
    setTheme('light');
});

// Apply the saved theme on page load
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Set the correct innerHTML based on the saved theme
if (savedTheme === 'dark') {
    darkText.innerHTML = 'DARK ■';
    lightText.innerHTML = 'LIGHT □';
} else {
    lightText.innerHTML = 'LIGHT ■';
    darkText.innerHTML = 'DARK □';
}

// Loader Animation
window.addEventListener('load', () => {
    const landingContainer = document.querySelector('.landing-container');
    
    if (!sessionStorage.getItem('loaderShown')) {
        setTimeout(() => {
            landingContainer.classList.add('hidden');
        }, 1000);

        landingContainer.addEventListener('transitionend', () => {
            document.body.removeChild(landingContainer);
        });

        // Ensure sessionStorage is set even if transitionend does not fire
        sessionStorage.setItem('loaderShown', 'true');
    } else {
        landingContainer.style.display = 'none';
    }
});

// // Gsap Animation
// const spin = gsap.timeline({repeat:-1})
// .set("#svg-stage", { opacity: 1 })
// .fromTo("#clover", {
//     transformOrigin: "50%",
//     x: 30,
//     y: 30
// },{
//     duration: 50,
//     rotation: 360,
//     ease: "none",
// });

// Draggable.create("#clover", {
// type: "rotation",
// trigger: "#svg-stage",
// inertia: true,
// onPressInit: () => spin.pause(),
//   onDrag: setSpinProgress, 
// onThrowUpdate: setSpinProgress,
// onThrowComplete: () => {
//     spin.resume();
//     gsap.fromTo(spin, { timeScale: 0 }, { timeScale: 1, ease: "power1.in" });
// }
// });

// function setSpinProgress() {
//     spin.progress(gsap.utils.wrap(0, 360, this.rotation) / 360);
// }