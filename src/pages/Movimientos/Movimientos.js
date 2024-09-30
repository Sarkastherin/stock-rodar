import Form from "@components/Form";
import { DataAreas, DataArticulos } from "@backend/Articulos";
import MyCustumeModal from "@components/MyCustumeModal";
import { normalizeString } from "@utils/Tools";
import Titles from "@components/Titles";

const selectedItems = []
const Movimientos = async(content)=> {
  const inputs = new Form();
  const attr = await DataAreas.getDataInJSON();
  const myModal = new MyCustumeModal(document.getElementById("modal"));
  const title = new Titles();
  const selectedArticulos =(props) => `
  <div class="row g-1 mt-2">
    <div class="col">
      ${inputs.input({
        type:'text',
        placeholder: props.placeholder,
        id: props.id,
        name: props.id,
        disabled: true
      })}
    </div>
    <div class="col-2">
      ${inputs.input({
        type:'text',
        placeholder: 'Unidad',
        id: `cant-${props.id}`,
        name: '',
        disabled: true
      })}
    </div>
    <div class="col-2">
      ${inputs.input({
        type:'number',
        placeholder: 'Cant',
        id: '',
        name: '',
      })}
    </div>
    <div class="col-auto">
      <button type="button" class="btn btn-outline-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
        </svg>
      </button>
    </div>
  </div>
  `
  const view = `
  <form class="row g-3 needs-validation mx-auto" novalidate style="max-width:600px">
    <div class="row g-1">
      ${title.miniSubTitle({title:'Tipo de Movimiento'})}
      ${inputs.checkComponent({
        col: 6,
        mdCol: 6,
        xlCol: 6,
        id: 'entrada',
        name: 'tipo_movimiento',
        color: 'success',
        nameLabel: 'Entrada'
      })}
      ${inputs.checkComponent({
        col: 6,
        mdCol: 6,
        xlCol: 6,
        id: 'salida',
        name: 'tipo_movimiento',
        color: 'danger',
        nameLabel: 'Salida'
      })}
    </div>
    <div class="row g-1 mt-3">
      <div class="col">
      ${inputs.select({
        placeholder: "Seleccionar el área",
        id: "area",
        name: "area",
        data: attr,
        textNode: "nombre",
        required: true,
      })}
      </div>
      <div class="col-auto">
        <input class="btn btn-rodar" type="button" value="Seleccionar articulos" id="selectArticulos">
      </div>
    </div>
    <div class="row g-1 mt-3">
    ${title.miniSubTitle({title:'Articulos seleccionados'})}
      ${selectedArticulos({
        placeholder: 'No hay selección',
        id: ''
      })}
    </div>
    <hr>
    <div class="row g-1 mt-3">
      ${inputs.buttonComponent({
        type: 'submit',
        color: 'success',
        id: 'saveForm',
        title: 'Guardar'
      })}
    </div>
  </form>
  `
  content.innerHTML = view;
  const inputArticulo = document.getElementById('selectArticulos');
  inputArticulo.addEventListener('click', async() => {
    const articulos = await DataArticulos.getDataInJSON();
    const viewList = (data) => {
      return data.map(item => `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" role="switch" id="${item.id}" ${selectedItems.includes(item.id) ? 'checked' : ''}>
        <label class="form-check-label" for="${item.id}">
        ${item.nombre} ${item.id}
        </label>
      </div>
    `).join("")
    } 
    myModal.create({
      title: 'Listado de Articulos',
      content: `
      ${inputs.input({
        type: "text",
        id: "listArticulo",
        name: "listArticulo",
        placeholder: 'Buscar articulos',
        autocomplete: true

      })}
      <div class="modal-list-products">
        ${viewList(articulos)}
      </div>
      `
    })
    myModal.addButtonAction({
      color: 'success',
      id:'showSelectedItems',
      title: 'Cargar artículos'
    })
    const inputSearch = document.getElementById('listArticulo');
    const list = document.querySelector('.modal-list-products');
    inputSearch.addEventListener('input', (event) => {
      const word = event.target.value;
      const listFilter = articulos.filter(item => normalizeString(item.nombre).includes(word))
      list.innerHTML = viewList(listFilter);
    })
    list.addEventListener('click', (event) => {
      const selectedItem = event.target.closest('input');
      if(selectedItem) {
        if(selectedItem.checked === true) {selectedItems.push(selectedItem.id)}
        else {
          const index = selectedItems.indexOf(selectedItem.id)
          selectedItems.splice(index,1)
        }

      }
    })

  })

}
export default Movimientos