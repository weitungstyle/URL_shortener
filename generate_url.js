
function sample(array) {
  const index = Math.floor(math.random() * array.length)
  return array[index]
}

//generate a five words ID
function generateUrl() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []
  collection.concat(lowerCaseLetters.split(''), upperCaseLetters.split(''), numbers.split(''))

  let newUrl = ''
  for (i = 0; i < 5; i++) {
    newUrl += sample(collection)
  }
  return newUrl
}

module.exports = generateUrl
