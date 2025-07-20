import multer from 'multer';
import fs from 'fs';
import path from 'path';

const makeDir = (folder) => {
  const dir = `uploads/${folder}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

export const uploader = (folder = 'products') => {
  const dest = makeDir(folder);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/\s+/g, '_');
      cb(null, Date.now() + '-' + safeName);
    },
  });

  return multer({ storage });
};
