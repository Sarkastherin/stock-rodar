const DataForm = {};
async function handleSaveMov(event) {
  let articulo = document.getElementById("articulo").value;
  let form = document.querySelector("form");
  if (isValidForm(event, form)) {
    if (articulo) {
      modalShowLoading()
      let checked = document.querySelector('input[name="options"]:checked');
      DataForm.tipo = checked.id;
      DataForm.area = document.getElementById("area").value;
      DataForm.articulo = document.getElementById("articulo").title;
      DataForm.cantidad = document.getElementById("cantidad").value;
      await Movimiento.saveMovimiento(DataForm)
      modalHide('myModalLoading')
      modalShow('¡Guardo con exito ✔️!','<p>Los datos han sido cargados</p>')
      console.log(DataForm);
    } else {
      modalShow('Falta completar algunos datos ⚠️', '<p>Debe seleccionar un artículo</p>')
    }
  }
  else {
    modalShow('Falta completar algunos datos ⚠️', '<p>Debe completar todo los campos obligatorios</p>')
  }
  event.preventDefault();
}
function isValidForm(event, form) {
  if (form.checkValidity()) {
    event.preventDefault();
  }
  form.classList.add("was-validated");
  return form.checkValidity();
}
function modalShow(titulo, body) {
  var myModalShow = new bootstrap.Modal(
    document.getElementById("myModalMessage")
  );
  var titleModal = document.getElementById('modalTitle');
  titleModal.innerText = titulo;
  var bodyModal = document.getElementById('modalBody');
  bodyModal.innerHTML = body;
  myModalShow.show();
}
function modalHide(input = "myModalMessage") {
  var modalElement = document.getElementById(input);
  var modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
  if (modal) {
    modal.hide(); // Ocultar el modal si existe una instancia
  }
}
//myModalLoading
function modalShowLoading() {
  var myModalShow = new bootstrap.Modal(
    document.getElementById("myModalLoading")
  );
  myModalShow.show();
}
