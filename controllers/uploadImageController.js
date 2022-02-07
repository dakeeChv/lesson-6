const fs = require('fs')
const path = require('path')

// baseImage == base64 format
exports.saveImage = async (baseImage) => {
  const projectPath = path.join(__dirname, '../uploads')
  const ex = baseImage.substring(baseImage.indexOf('/') + 1, baseImage.indexOf(';base64'))

  let fileName = "";
  if (ex === 'svg+xml') {
    fileName = `${Date.now()}.svg`
  }else {
    fileName =  `${Date.now()}.${ex}`
  }

  let image = decodeBase64Image(baseImage)
  await fs.writeFileSync(`${projectPath}/${fileName}`, image.data, {encoding : 'base64'})

  return fileName
}

const decodeBase64Image = (dataString) => {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  if (matches.length !== 3 || !matches){
  return new Error("Invalid base64 format")
  }

  return {
    type : matches[1],
    data : matches[2]
  }
}
