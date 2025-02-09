// soapRequest.js

var description = ''
global_var = 'cadena'

function soapRequest() {
  var solicitante = document.getElementById('solicitante').value
  var email = document.getElementById('email').value
  var product = document.getElementById('product').value
  var price_project = document.getElementById('price_project').value
  var justify = document.getElementById('justify').value
  var cantidad = document.getElementById('cantidad').value
  var fecha_solicitud = document.getElementById('fecha_solicitud').value
  var str =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bpm="http://bpm.ws.sas.interact.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<bpm:startProcessWithAttributesNS>' +
    '<contract>bb1e1007-03a6-4ccb-8552-bd1e197850eb</contract>' +
    '<service>ws.bpm</service>' +
    '<application>Process Manager WS</application>' +
    '<secret>HhNnKiIlLfLlNbPbOeGcHmFlBeBdOiPlLpIoDbEbLfMhCgEoBmBcLbFmLiIkNnHh</secret>' +
    '<mnemonic>procedimientoapagarsoapservice</mnemonic>' +
    '<name>Procedimiento de Pago desde el formulario externo</name>' +
    '<attributes>' +
    '<name>solicitante</name>' +
    '<value>' +
    solicitante +
    '</value>' +
    '</attributes>' +
    '<attributes>' +
    '<name>email</name>' +
    '<value>' +
    email +
    '</value>' +
    '</attributes>' +
    '<attributes>' +
    '<name>product</name>' +
    '<value>' +
    product +
    '</value>' +
    '</attributes>' +
    '<attributes>' +
    '<name>price_project</name>' +
    '+<value>' +
    price_project +
    '</value>' +
    '</attributes>' +
    // cantidad
    '<attributes>' +
    '<name>unit</name>' +
    '+<value>' +
    cantidad +
    '</value>' +
    '</attributes>' +
    // date_request
    '<attributes>' +
    '<name>date_request</name>' +
    '+<value>' +
    fecha_solicitud +
    '</value>' +
    '</attributes>' +
    '<attributes>' +
    '<name>justify</name>' +
    '<value>' +
    justify +
    '</value>' +
    '</attributes>' +
    '</bpm:startProcessWithAttributesNS>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'

  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
      xhr.open(method, url, false)
    } else if (typeof XDomainRequest != 'undefined') {
      alert
      xhr = new XDomainRequest()
      xhr.open(method, url)
    } else {
      console.log('CORS not supported')
      alert('CORS not supported')
      xhr = null
    }
    return xhr
  }

  var xhr = createCORSRequest(
    'POST',
    'https://latam.interact.com.br/sa/ws/bpm?wsdl'
  )

  if (!xhr) {
    console.log('XHR issue')
    return
  }

  xhr.onload = function CADENA() {
    var results = xhr.responseText
    cadena = results.slice(291, 315)
    alert('Registrada, solicitud abierta ' + cadena)
    console.log(cadena)
  }

  xhr.setRequestHeader('Content-Type', 'text/xml')
  xhr.send(str)

  // Se hace una segunda llamada
  var finaltask =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bpm="http://bpm.ws.sas.interact.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<bpm:finishTaskNS>' +
    '<contract>bb1e1007-03a6-4ccb-8552-bd1e197850eb</contract>' +
    '<service>ws.bpm</service>' +
    '<application>Process Manager WS</application>' +
    '<secret>HhNnKiIlLfLlNbPbOeGcHmFlBeBdOiPlLpIoDbEbLfMhCgEoBmBcLbFmLiIkNnH</secret>' +
    '<task>' +
    cadena +
    ':sol_compra</task>' +
    '</bpm:finishTaskNS>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'

  function createCORSRequest2(method, url) {
    var xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
      xhr.open(method, url, false)
    } else if (typeof XDomainRequest != 'undefined') {
      alert
      xhr = new XDomainRequest()
      xhr.open(method, url)
    } else {
      console.log('CORS not supported')
      alert('CORS not supported')
      xhr = null
    }
    return xhr
  }

  var xhr2 = createCORSRequest2(
    'POST',
    'https://latam.interact.com.br/sa/ws/bpm?wsdl'
  )

  if (!xhr2) {
    console.log('XHR issue')
    return
  }

  xhr2.onload = function () {
    var results = xhr2.responseText
    // Podrías parsear la respuesta si quieres
  }

  xhr2.setRequestHeader('Content-Type', 'text/xml')
  xhr2.send(finaltask)

  // Al final, recarga la página
  location.reload()
}
