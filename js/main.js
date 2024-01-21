let articulos;
async function loadedWindow() {
  await Movimientos_UI.openUIMovimiento()
}

async function loadPage(srcPage, body = interface) {
  let response;
  try {
    response = await fetch(srcPage);
    response = await response.text();
    body.innerHTML = response;
  } catch (e) {
    console.log(e);
  }
}
function arrayToObject(arr) {
  // Obtenemos los encabezados del array
  var headers = arr[0];
  // Creamos un nuevo array para almacenar los objetos transformados
  var newData = [];
  // Iteramos desde 1 para evitar el primer elemento que son los encabezados
  for (var i = 1; i < arr.length; i++) {
    var obj = {};
    // Iteramos a través de cada elemento del array actual
    for (var j = 0; j < headers.length; j++) {
      // Usamos los encabezados como claves y asignamos los valores correspondientes
      obj[headers[j].toLowerCase()] = arr[i][j];
    }
    newData.push(obj); // Agregamos el objeto al nuevo array
  }
  return newData; // Devolvemos el nuevo array de objetos
}
function normalizeString(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
  function objectToArray(obj, arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (obj.hasOwnProperty(item)) {
        arr[i] = obj[item];
      } else {
        arr[i] = ""; // Cambia el contenido del array por un string vacío si el item no está presente
      }
    }
    return arr;
  }
