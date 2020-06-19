// References to field elements
var fromNumberField = document.getElementById('fromNumber')
var toNumberField = document.getElementById('toNumber')
var dialBtn = document.getElementById('dial')
var updateStatusBtn = document.getElementById('updateStatus')
var sidField = document.getElementById('sid')
var statusField = document.getElementById('status')

// References to values stored in the plug-in parameters
var authToken = getPluginParameter('authToken')
var accountSID = getPluginParameter('accountSID')
var fromNumber = getPluginParameter('fromNumber')
var toNumber = getPluginParameter('toNumber')
var twilioNumber = getPluginParameter('twilioNumber')
var record = Number(getPluginParameter('record'))
var displayNumber = Number(getPluginParameter('displayNumber'))

// other variables
var rootUrl = 'https://api.twilio.com'
var callJSON

// Define the dial function
dialBtn.onclick = function () { dial() }

updateStatusBtn.onclick = function () { updateStatus() }

function makeHttpObject () {
  try {
    return new XMLHttpRequest()
  } catch (error) { }
  try {
    return new ActiveXObject('Msxml2.XMLHTTP')
  } catch (error) { }
  try {
    return new ActiveXObject('Microsoft.XMLHTTP')
  } catch (error) { }

  throw new Error('Could not create HTTP request object.')
}

function updateStatusField (value) {
  statusField.innerHTML = value
}

function updateStatus () {

  var responseText = getMetaData()

  if (!responseText) {
    updateStatusField('The call metadata is undefined')

    return false
  }

  try {

    callJSON = JSON.parse(responseText)

  } catch (error) {

    updateStatusField('Response JSON not valid')

    return false
  }

  if (!callJSON.uri) {

    updateStatusField('Status uri is undefined')

    return false
  }

  var request = undefined
  var requestUrl = rootUrl + callJSON.uri

  try {

    request = makeHttpObject()

    request.open('POST', requestUrl, true)
    request.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent(accountSID + ':' + authToken))))
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        responseText = request.responseText

        if (!responseText) {
          updateStatusField('undefined error')

        } else {
          setMetaData(responseText)

          processResponse(responseText)
        }
      }
    }

    request.send()
  } catch (error) {
    updateStatusField(error)
  }
}

function dial () {
  var responseText = ''

  var request

  var requestUrl = rootUrl + '/2010-04-01/Accounts/' + accountSID + '/Calls.json'

  var Twiml = '<Response><Dial record="' + (record === 0 ? 'do-not-record' : 'record-from-ringing-dual') + '" answerOnBridge="true" callerId="' + twilioNumber + '">' + toNumber + '</Dial></Response>'

  var params = 'From=' + twilioNumber + '&To=' + fromNumber + '&Twiml=' + Twiml

  updateStatusField('Call attempted')

  try {

    request = makeHttpObject()

    request.open('POST', requestUrl, true)
    request.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent(accountSID + ':' + authToken))))
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function () {

      if (request.readyState === 4) {

        responseText = request.responseText

        if (!responseText) {

          updateStatusField('undefined error')

        } else {

          setMetaData(responseText)

          processResponse(responseText)
        }

      }
    }

    request.send(params)

  } catch (error) {

    updateStatusField(error)

  }
}

function onLoad () {

  fromNumberField.innerHTML = fromNumber

  toNumberField.innerHTML = toNumber

  if (displayNumber === 0) { toNumberField.innerHTML = '**********'; }

  var responseText = getMetaData()

  if (!responseText) {
    setDefault()
    return false
  }

  processResponse(responseText)
}

function setDefault () {

  dialBtn.disabled = false

  updateStatusBtn.disabled = true

  sidField.innerHTML = ''

  updateStatusField('Ready to call')
}

function processResponse (responseText) {

  dialBtn.disabled = false

  updateStatusBtn.disabled = true

  var dialJSON = undefined

  try {

    dialJSON = JSON.parse(responseText)

  } catch (error) {

    updateStatusField('Response JSON not valid')

    return false
  }

  if (!dialJSON.uri && dialJSON.status) {

    updateStatusField(dialJSON.status)

    return false
  }

  if (dialJSON.status && dialJSON.uri && dialJSON.sid && dialJSON.subresource_uris.recordings) {

    dialBtn.disabled = true

    updateStatusBtn.disabled = false

    sidField.innerHTML = dialJSON.sid

    updateStatusField(dialJSON.status)

    var s = dialJSON.status + '|' + dialJSON.sid + '|' + rootUrl + dialJSON.uri + '|' + rootUrl + dialJSON.subresource_uris.recordings

    setAnswer(s)

  } else {

    updateStatusField('Response not valid')

    setAnswer('Response not valid')
  }
}

//global function
function clearAnswer () {

  //global
  setAnswer('')

  setMetaData('')

  //local
  setDefault()
}

onLoad()
