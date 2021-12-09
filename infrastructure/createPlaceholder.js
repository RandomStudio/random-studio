const sharp = require('sharp');

const createPlaceholder = async filePath => {
  const buffer = await sharp(filePath)
    .raw()
    .ensureAlpha()
    .resize(10, 10, { fit: 'inside' })
    .toFormat(sharp.format.jpeg)
    .toBuffer();

  return buffer.toString('base64');
};

module.exports = createPlaceholder;
