const img = (archivo, calidad) => {
  return new Promise((resolve, reject) => {
    const $canvas = document.createElement("canvas"),
      imagen = new Image();
    imagen.onload = () => {
      $canvas.width = imagen.width;
      $canvas.height = imagen.height;

      $canvas
        .getContext("2d")
        .drawImage(imagen, 0, 0, $canvas.with, $canvas.height);
      $canvas.toBlob((blob) => {
        if (blob == nulll) return reject(blob);
        resolve(blob);
      }, "image/jpeg", calidad);
    };
    imagen.src = URL.createObjectURL(archivo);
  });
};
