const max_width = 800;
const max_height = 800;

// based on https://stackoverflow.com/a/14672943/14113994

export default async function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
      const blob = new Blob([event.target.result]);
      const blobURL = window.URL.createObjectURL(blob);
      const image = new Image();
      image.src = blobURL;
      image.onload = async function () {
        const resized = await resizeMe(image, file.name);
        resolve(resized);
      };
    };
  });
}

async function resizeMe(img, name) {
  const canvas = document.createElement("canvas");

  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > max_width) {
      height = Math.round((height *= max_width / width));
      width = max_width;
    }
  } else {
    if (height > max_height) {
      width = Math.round((width *= max_height / height));
      height = max_height;
    }
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  // get the data from canvas as 70% JPG (can be also PNG, etc.)
  const url = canvas.toDataURL("image/jpeg", 1);
  const blob = await (await fetch(url)).blob();
  blob.name = name;
  return blob;
}
