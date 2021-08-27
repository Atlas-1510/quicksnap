const max_width = 800;
const max_height = 800;

export default async function compressImage(file) {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
      // blob stuff
      var blob = new Blob([event.target.result]); // create blob...
      window.URL = window.URL || window.webkitURL;
      var blobURL = window.URL.createObjectURL(blob); // and get it's URL

      // helper Image object
      var image = new Image();
      image.src = blobURL;
      image.onload = async function () {
        var resized = await resizeMe(image, file.name); // send it to canvas
        resolve(resized);
      };
    };
  });
}

async function resizeMe(img, name) {
  console.log("activated");
  var canvas = document.createElement("canvas");

  var width = img.width;
  var height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > max_width) {
      //height *= max_width / width;
      height = Math.round((height *= max_width / width));
      width = max_width;
    }
  } else {
    if (height > max_height) {
      //width *= max_height / height;
      width = Math.round((width *= max_height / height));
      height = max_height;
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  const url = canvas.toDataURL("image/jpeg", 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)
  const blob = await (await fetch(url)).blob();
  blob.name = name;
  return blob;
}
