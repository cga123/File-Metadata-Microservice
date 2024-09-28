var express = require('express');
var cors = require('cors');
// 引入 multer 模組，用於處理文件上傳
var multer = require('multer');
require('dotenv').config()

var app = express();

// 設置 multer，指定上傳文件的存儲位置
var upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 添加處理文件上傳的 POST 路由
// 使用 multer 中間件處理名為 'upfile' 的單一文件上傳
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  // 檢查是否有文件被上傳
  if(!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  //JavaScript 內置函數，用於解碼已經被 URL 編碼的字符串。它的主要作用是將 URL 編碼的特殊字符轉換回它們原本的形式。
  const decodedFileName = decodeURIComponent(req.file.originalname);
  
  // 返回包含文件信息的 JSON 響應
  res.json({
    name: decodedFileName,  // 解碼後文件名
    type: req.file.mimetype,      // 文件 MIME 類型
    size: req.file.size           // 文件大小（字節）
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
