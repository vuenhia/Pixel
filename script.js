const canvas = document.getElementById("canvas");
const dropScreen = document.getElementById("drop-screen");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const context = canvas.getContext("2d");
const palette = ["#fff9a0", "#ffe44d", "#ffbb00", "#ffffff", "#ffd700"];
let themeIndex = 0;
let themeTimer = 0;
const THEME_DURATION = 360;
//setup
const w = 405;
const h = 720;
const px = 3;
canvas.width = w;
canvas.height = h;
//classes
class Particle {
	constructor() {
		this.x = Math.random() * w;
		this.y = Math.random() * h;
		this.vx = (Math.random() - 0.5) * 2;
		this.vy = (Math.random() - 0.5) * 2;
		this.age = 0;
		this.maxAge = 120 + Math.random() * 180;
		this.color = palette[Math.floor(Math.random() * palette.length)];
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.age++;
		if (this.x < 0) this.x = w;
		if (this.x > w) this.x = 0;
		if (this.y < 0) this.y = h;
		if (this.y > h) this.y = 0;

		if (this.age >= this.maxAge) {
			this.reset();
		}
	}

	reset() {
		this.x = Math.random() * w;
		this.y = Math.random() * h;
		this.vx = (Math.random() - 0.5) * 2;
		this.vy = (Math.random() - 0.5) * 2;
		this.age = 0;
		this.maxAge = 120 + Math.random() * 180;
	}
}
//functions
const shapes = {
	star: [
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[1, 1, 1, 1, 1],
		[0, 1, 1, 1, 0],
		[0, 0, 1, 0, 0],
	],
	heart: [
		[0, 1, 0, 1, 0],
		[1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1],
		[0, 1, 1, 1, 0],
		[0, 0, 1, 0, 0],
	],
	diamond: [
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[1, 1, 1, 1, 1],
		[0, 1, 1, 1, 0],
		[0, 0, 1, 0, 0],
	],
};
const THEMES = [
	{
		name: "STARS",
		shape: "star",
		palette: ["#fff9a0", "#ffe44d", "#ffbb00", "#ffffff", "#ffd700"],
		physics: "float",
	},
	{
		name: "HEARTS",
		shape: "heart",
		palette: ["#ff6b9d", "#ff3366", "#ff0055", "#ffaacc", "#ffffff"],
		physics: "gravity",
	},
	{
		name: "DIAMONDS",
		shape: "diamond",
		palette: ["#00ffff", "#00ccff", "#0088ff", "#aaeeff", "#ffffff"],
		physics: "vortex",
	},
];
const drawShape = (x, y, shapeKey, color) => {
	const grid = shapes[shapeKey];
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			if (grid[row][col] === 1) {
				context.fillStyle = color;
				context.fillRect(x + col * px, y + row * px, px, px);
			}
		}
	}
};
//loops
let particles = [];
for (let i = 0; i < 100; i++) {
	particles.push(new Particle());
}
const loop = () => {
	context.fillStyle = "rgba(0, 0, 0, 0.10)";
	context.fillRect(0, 0, w, h);
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		drawShape(particles[i].x, particles[i].y, "star", particles[i].color);
	}

	requestAnimationFrame(loop);
};
// event listeners
dropZone.addEventListener("click", () => {
	fileInput.click();
});

fileInput.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		dropScreen.style.display = "none";
	}
});

//calling
loop();
