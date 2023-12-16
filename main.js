let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let upload = document.getElementById("upload");
let reset = document.getElementById("reset");
let download = document.getElementById("download");
let img = document.getElementById("img");
let imgBox = document.querySelector(".img-box");
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

const resetValue = () => {
  context.filter = "none";
  saturate.value = '100'
  contrast.value = '100'
  brightness.value = '100'
  sepia.value = '0'
  grayScale.value = '0'
  blur.value = '0'
  hueRotate.value = '0'
  context.drawImage(img,0,0,canvas.width,canvas.height)
};

window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => (img.src = file.result);
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img,0,0,canvas.width,canvas.height)
    img.style.display = 'none'
  }
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    context.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayScale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    context.drawImage(img,0,0,canvas.width,canvas.height)
  });
});

reset.onclick = () => {
  resetValue()
}

download.onclick = () => {
  download.href = canvas.toDataURL()
}