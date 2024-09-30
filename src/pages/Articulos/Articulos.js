import Titles from "@components/Titles";
import Form from "@components/Form";
import Table from "@components/Table";
import { DataArticulos } from "@backend/Articulos";
import MyCustumeModal from "@components/MyCustumeModal";

let TableArticulos;
const inputs = new Form()
const modal = new MyCustumeModal(document.getElementById("modal"));
/* let previousButton;
let nextButton;
 */

const formFilter = async () => {
  const view = `
    <form class="row g-1 mt-3" id="form-filter">
      ${inputs.inputComponent({
        col: "1",
        mdCol: 1,
        xlCol: 1,
        type: "number",
        className: "filter",
        placeholder: "Id",
        id: "id",
        sizes: "sm",
      })}
      ${inputs.inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Descripción",
        id: "nombre",
        sizes: "sm",
      })}
      ${this.buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "rodar",
        title: "Agregar",
        id: "add",
        sizes: "sm",
      })}
    </form>
    `;
  return view;
};
const columns = {
  id: "Id",
  nombre: "Descripción",
  unidad: "Unidad",
  modelo: 'Modelo'
};
const Articulos = async (content) => {
  const data = await DataArticulos.getDataInJSON();
  const title = new Titles()
  TableArticulos = new Table({
    columns: columns,
    data: data,
    attrId: "id",
  });
  const view = `
    ${title.mainTitle({
      title: "Artículos"
    })}
    ${await formFilter()}
    ${TableArticulos.createTable()}
    `;
    content.innerHTML = view;
    const containerFilter = document.getElementById('form-filter');
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const addButton = document.getElementById("add");
    containerFilter.addEventListener('change', handleFilterButton);
    previousButton.addEventListener("click", handlePreviousButton);
    nextButton.addEventListener("click", handleNextButton);
    addButton.addEventListener("click",() => location.hash = "/add-no-confomidad");
    const table = document.querySelector('table');
    table.addEventListener('click',(event)=> {
      const tr = event.target.closest('tr')
      modal.create({
        title: 'Titulo',
        content: 'contenido'
      })
    })
};
const handlePreviousButton = () => {
  TableArticulos.previousButton();
  //activeListenerRows();
};
const handleNextButton = () => {
  TableArticulos.nextButton();
  //activeListenerRows();
};
const handleFilterButton = () => {
  const valuesFilter = {};
  const itemsFilter = document.querySelectorAll(".filter");
  itemsFilter.forEach((item) => {
    valuesFilter[item.id] = item.value;
  });
  TableArticulos.filterButton(valuesFilter);
  //activeListenerRows();
};
const handleEditData = (event) => {
  const id = event.target.parentNode.id;
  location.hash = `/no-conformidad=${id}/`;
};
/* const activeListenerRows = () => {
  document
    .querySelectorAll(".row-table")
    .forEach((row) => row.addEventListener("click", handleEditData));
}; */
export default Articulos;
