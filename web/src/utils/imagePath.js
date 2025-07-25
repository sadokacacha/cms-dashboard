export const getImageUrl = (folder, filename) =>
  filename ? `http://localhost:5000/uploads/${folder}/${filename}` : "";
