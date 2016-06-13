document.addEventListener('DOMContentLoaded', function() {
  var inputs = document.getElementsByClassName('input')
  var length = inputs.length
  for (var index = 0; index < length; index++) {
    var element = inputs[index]
    element.addEventListener('input', onInputChange) } })

function onInputChange(event) {
  var target = event.target
  var parent = target.parentNode
  var code = parent.getElementsByTagName('code')[0]
  var value = target.value
  if (value.length === 0) {
    code.textContent = 'Enter text above.'
    updateSameDisplays() }
  else {
    var buffer = new TextEncoder('utf-8').encode(value)
    window.crypto.subtle.digest({ name: 'SHA-1' }, buffer)
    .then(function(hash){
      code.textContent = toHex(hash)
      updateSameDisplays() })
    .catch(function(error){
      console.error(error) }) } }

function updateSameDisplays() {
  var digests = document.getElementsByClassName('digest')
  var same = digests[0].textContent === digests[1].textContent
  var displays = document.getElementsByClassName('same')
  var length = displays.length
  for (var index = 0; index < length; index++) {
    var display = displays[index]
    display.innerHTML = (
      'A and B are ' +
      ( same ? 'the same' : 'different' ) + '.' ) } }

function toHex(arrayBuffer) {
  var hexadecimal = ''
  var dataView = new DataView(arrayBuffer)
  var length = dataView.byteLength
  for (var index = 0; index < length; index++) {
    var character = dataView.getUint8(index).toString(16)
    hexadecimal += character }
  return hexadecimal }
