const sharp = require('sharp')
const request = require('snekfetch');

const imgUrls = ['https://dl.airtable.com/tw9fDuuOQESwQ2c2iouK_large_CS-sme.jpg', 'https://dl.airtable.com/Xk9Rt5YT0qe2Pdb7XWKe_large_JBTD-bonus2.jpg', 'https://dl.airtable.com/U2htzBRwT3WVT8P1Usot_large_vp-money.jpg', 'https://dl.airtable.com/GEM2qQ9QKuRL6dJH7pxL_large_CS-scaleup.jpg']

const fetchImgs = async urls => {
  return await Promise.all(urls.map(url => cropImage(url)))
}

const cropImage = async url => {
    const r = await request.get(url)
    let imgString = await sharp(r.body)
        .resize(300, 200)
        .crop(sharp.strategy.attention)
        .toBuffer()
    return Promise.resolve(`data:image/png;base64,${imgString.toString('base64')}`)
}

module.exports = (req, res) => {
  fetchImgs(imgUrls)
  res.end(`Hello from Node.js on Now 2.0!`);
};