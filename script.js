const canvas = document.getElementById("layer-1");
const toolbar = document.getElementById("toolbar");
const stroke = document.getElementById("stroke");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let title = "untitled";
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener("click", (e) => {
	if (e.target.id === "clear") {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	if (e.target.id === "save") {
		const link = document.createElement("a");
		link.download = `${title}.jpg`;
		link.href = canvas.toDataURL();
		link.click();
	}

	if (e.target.id === "eraser") {
		ctx.strokeStyle = "white";
		console.log(e.target);
	}
	if (e.target.id === "pencil") {
		ctx.strokeStyle = stroke.value;
		console.log("pencil");
	}
});

toolbar.addEventListener("change", (e) => {
	if (e.target.id === "stroke") {
		ctx.strokeStyle = e.target.value;
	}
	if (e.target.id === "lineWidth") {
		lineWidth = e.target.value;
	}
	if (e.target.id === "title") {
		title = e.target.value;
	}
});

const draw = (e) => {
	if (!isPainting) {
		return;
	}

	ctx.lineWidth = lineWidth;
	ctx.lineCap = "round";

	ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
	ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
	isPainting = true;
	startX = e.clientX;
	startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
	isPainting = false;
	ctx.stroke();
	ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);
