//This code was written with the help of the build-drawing-app-html-canvas-javascript on codingnepalweb.


const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const saveImg = document.querySelector(".save-img");
const ctx = canvas.getContext("2d");
const undoBtn = document.querySelector("#undo-btn");
let undoIndex = -1;

let shapes = [];

// global variables with default value
let prevMouseX,
prevMouseY,
snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";

const setCanvasBackground = () => {
  // setting whole canvas background to white, so the downloaded img background will be white
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
};

window.addEventListener("load", () => {
  // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setCanvasBackground();
});

const drawRect = (e) => {
  // if fillColor isn't checked draw a rect with border else draw rect with background
  if (!fillColor.checked) {
    // creating circle according to the mouse pointer
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawCircle = (e) => {
  ctx.beginPath(); // creating new path to draw circle
  // getting radius for circle according to the mouse pointer
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
};

const drawTriangle = (e) => {
  ctx.beginPath(); // creating new path to draw circle
  ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
  ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
  ctx.closePath(); // closing path of a triangle so the third line draw automatically
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
};

//Undo function adds a click event to the undoBtn element, If the undo button is clicked it checks if undoIndex is greater than or equal to 0.  If it is, it decrements the undoIndex by 1
undoBtn.addEventListener("click", () => {
  if (undoIndex >= 0) {
    
    //THis then clears the entire canvas by usning ctx.clearRect() method,(from Stackoverflow methods).  This method sets the canvas content to transparent.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //then it retrieves a single shape from the shapes array using array.slice method(shapes.slice), with undoIndex as the start index and undoIndex + 1 as the end index
    shapes.slice(undoIndex, undoIndex + 1).forEach((shape) => {
      //Then it iterates over the retrieved shape(s) and uses ctx.putImageData() method to put the shapes(s) back onto the canvas at position (0,0) effectively undoing the last drawn shape
      ctx.putImageData(shape, 0, 0);
    });
    undoIndex--;

  }
});

const saveCanvasState = () => {
  if (undoIndex < shapes.length - 1) {
    shapes.splice(undoIndex + 1); // Remove any shapes ahead of the current undo index
  }
  undoIndex++;
  shapes.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Save the current shape to the shapes array
};



const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
  saveCanvasState();
  ctx.beginPath(); // creating new path to draw
  ctx.lineWidth = brushWidth; // passing brushSize as line width
  ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
  ctx.fillStyle = selectedColor; // passing selectedColor as fill style
  // copying canvas data & passing as snapshot value.. this avoids dragging the image
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
  if (!isDrawing) return; // if isDrawing is false return from here
  ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

  if (selectedTool === "brush" || selectedTool === "eraser") {
    // if selected tool is eraser then set strokeStyle to white
    // to paint white color on to the existing canvas content else set the stroke color to selected color
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with color
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
  //saves the current shape/drawing into the array for the undo function
  shapes.push(snapshot);
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all tool option
    // removing active class from the previous option and adding on current clicked option
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value)); // passing slider value as brushSize

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all color button
    // removing selected class from the previous option and adding on current clicked option
    document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");
    // passing selected btn background color as selectedColor value
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

colorPicker.addEventListener("change", () => {
  // passing picked color value from color picker to last color btn background
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
  setCanvasBackground();
});

//Save function below saves the avatar image created to downloads on users computer and in local storage
saveImg.addEventListener("click", async () => {
  
  const link = document.createElement("a"); 
  link.click(); // clicking link to download image
  const imageData = canvas.toDataURL('image/jpeg').split(',')[1];
  const imageKey = "savedImage";

   fetch('/api/users/save-image', {
    method: 'POST',
    body: imageData,
  })
    .then((response) => {
      if (response.ok) {
        console.log('Image saved on the server.');
      } else {
        console.error('Failed to save image on the server.');
      }
    })
    .catch((error) => {
      console.error('Error saving image:', error);
    });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
