const canvas = document.getElementById("js-Canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-Color");
const range = document.getElementById("js-Range");
const mode = document.getElementById("js-Mode");
const save = document.getElementById("js-Save");

const INITIAL_COLOR = "#000";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    //set starting point
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    //create visible paths
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  //event.target is return element
  const color = event.target.style.backgroundColor;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const strokeSize = event.target.value;

  ctx.lineWidth = strokeSize;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = image;
  link.download = "download";
  link.click();

  console.log(link);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

//convert array-like object to array
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
