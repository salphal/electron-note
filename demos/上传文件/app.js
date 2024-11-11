const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());

const uploaderDir = path.resolve(__dirname, 'uploads');

if (!fs.existsSync(uploaderDir)) {
  fs.mkdirSync(uploaderDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploaderDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    const filename = `${basename}-${timestamp}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('文件上传成功');
});

app.listen(3000, () => {
  console.log('=>(app.js:13) app.listen 3000');
});
