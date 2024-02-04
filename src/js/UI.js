class UI {
  static isValidForm(event, form) {
    if (form.checkValidity()) {
      event.preventDefault();
    }
    form.classList.add("was-validated");
    return form.checkValidity();
  }
}
function modalShow(titulo, body, withSecondButton) {
  secondButtonModal = document.getElementById('secondButtonModal');
  const myModalShow = new bootstrap.Modal(
    document.getElementById("myModalMessage")
  );
  const titleModal = document.getElementById('modalTitle');
  titleModal.innerText = titulo;
  const bodyModal = document.getElementById('modalBody');
  bodyModal.innerHTML = body;
  if(withSecondButton) {
    secondButtonModal.removeAttribute('hidden')
  }
  else {secondButtonModal.setAttribute('hidden','')}
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
function activeLink(event) {
  const activeLink = event.target;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(item => item.classList.remove('active'))
  activeLink.classList.add('active')
}
const LoadingHTML = `
<div class="loader loader--style8">
  <p class="fs-4">Cargando</p>
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
</div>
`
