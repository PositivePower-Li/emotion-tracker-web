const sharp = require('sharp');
const fs = require('fs');

const input = 'public/vite.svg';
const outputs = [
  { file: 'public/icon-192.png', size: 192 },
  { file: 'public/icon-512.png', size: 512 },
];

if (!fs.existsSync(input)) {
  console.error('找不到 public/vite.svg');
  process.exit(1);
}

Promise.all(
  outputs.map(({ file, size }) =>
    sharp(input)
      .resize(size, size)
      .png()
      .toFile(file)
      .then(() => console.log(`已產生 ${file}`))
  )
)
  .then(() => console.log('全部轉檔完成！'))
  .catch(err => {
    console.error('轉檔失敗:', err);
    process.exit(1);
  }); 