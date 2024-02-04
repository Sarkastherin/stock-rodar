const SrcMovimientos = "MOVIMIENTOS!A1:ZZZ";
const DataForm = {};
let secondButtonModal;
class Movimiento {
  constructor({ id, fecha, area, tipo, articulo, cantidad }) {
    this.id = id;
    this.fecha = fecha;
    this.area = area;
    this.tipo = tipo;
    this.articulo = articulo;
    this.cantidad = cantidad;
  }
  static async createId() {
    try {
      let movimientos = await this.getMovimientos();
      let ids = movimientos.map((item) => Number(item.id));
      let maxValue = Math.max(...ids);
      return maxValue + 1;
    } catch (e) {
      console.log(e);
    }
  }
  static async saveMovimiento(data) {
    try {
      data.id = await this.createId();
      data.fecha = FormatsDate.latinFormat();
      if(data.tipo === 'Salida') {data.cantidad = Number(data.cantidad) * -1}
      let newMovimiento = new Movimiento(data);
      let headers = await ApiGoogleSheet.getHeaders(SrcMovimientos);
      newMovimiento = objectToArray(data, headers);
      
      await ApiGoogleSheet.postData(SrcMovimientos, newMovimiento);
    } catch (e) {
      console.log(e);
    }
  }
  static async getMovimientos() {
    let movimientos;
    try {
      let response = await ApiGoogleSheet.getResponse(SrcMovimientos);
      if (response.status === 200) {
        movimientos = response.result.values;
        movimientos = arrayToObject(movimientos);
      }
      return movimientos;
    } catch (e) {
      console.log(e);
    }
  }
  static async getStock(){
    try {
      let Movimientos = await this.getMovimientos();
      let Stock = Movimientos.reduce((obj,item) => {
        if (!obj[item.articulo]) {
          obj[item.articulo] = Number(item.cantidad)
        }
        else {
          obj[item.articulo] = obj[item.articulo] + Number(item.cantidad)
        }
        return obj
      }, {});
      let Articulos = await Articulo.getArticulos();
      let newData = Articulos.map(item => {
        if(Stock.hasOwnProperty(item.id)) {
          item.stock = Stock[item.id]
        }
        else {
          item.stock = 0
        }
        return item
      })
      return newData
    } catch (e) {
      console.log(e);
    }
  }
}
class Movimientos_UI {
  static async openUIMovimiento(event) {
    activeLink(event);
    //filterTable;
    await loadPage("./html/movimientos.html");
    await this.loadArea();
    openUI()
  }
  static async loadArea(inputId = "area") {
    try {
      let areas = await Area.getAreas();
      let input = document.getElementById(inputId);
      input.innerHTML =
        '<option selected value="">Seleccione una opción</option>';
      areas.map((item) => {
        let option = document.createElement("option");
        let textNode = document.createTextNode(item.nombre);
        option.appendChild(textNode);
        option.value = item.nombre;
        input.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }
  static loadListArticulos(articulos) {
    let ul = document.querySelector(".modal-list-products");
    ul.innerHTML = "";
    articulos.map((item) => {
      let li = document.createElement("li");
      li.innerHTML = `
      <i class="bi bi-circle" title="${item.id}"></i>
      <input 
        class="btn text-start" 
        type="button" title="${item.id}" 
        value="${item.nombre}"  
        data-bs-toggle="button" 
        onclick="Movimientos_UI.selectArticulo(event)">`;
      ul.appendChild(li);
    });
  }
  static async searchArticulo() {
    try {
      Stock = await Movimiento.getStock();
      this.loadListArticulos(Stock);
    } catch (e) {
      console.log(e);
    }
  }
  static filterArticulos(event) {
    let word = normalizeString(event.target.value);
    let articulosFilter = Stock.filter((item) => {
      if (item.nombre) {
        let normalizedItemName = normalizeString(item.nombre);
        return normalizedItemName.includes(word);
      }
    });
    this.loadListArticulos(articulosFilter);
  }
  static async selectArticulo(event) {
    let IdArticulo = event.target.title;
    
    let icon = document.querySelector(`i[title='${IdArticulo}']`);
    icon.classList.replace("bi-circle", "bi-circle-fill");

    
    let modalElement = document.getElementById("modalProducts");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    let articulo = await Articulo.getArticuloById(IdArticulo);
    let inputArticulo = document.getElementById("articulo");
    inputArticulo.value = articulo.nombre;
    inputArticulo.title = articulo.id;
    document.getElementById('unidad').value = articulo.unidad;
    document.getElementById('cantidad_stock').value = articulo.stock
  }
  static showConfirm(data) {
    let textConfirm = `
    <p>Usted está por registrar los siguientes datos:</p>
    <ul>
      <li><strong>Tipo: </strong>${data.tipo}</li>
      <li><strong>Área: </strong>${data.area}</li>
      <li><strong>Artículo: </strong>${document.getElementById("articulo").value}</li>
      <li><strong>Cantidad: </strong>${data.cantidad}</li>
    </ul>
    `
    modalShow('Confirmar movimiento', textConfirm, true)
    
  }
  static async saveMovimiento(event) {
    let articulo = document.getElementById("articulo").value;
    let form = document.querySelector("form");
    if (UI.isValidForm(event, form)) {
      if (articulo) {
        let checked = document.querySelector('input[name="options"]:checked');
        DataForm.tipo = checked.id;
        DataForm.area = document.getElementById("area").value;
        DataForm.articulo = document.getElementById("articulo").title;
        DataForm.cantidad = document.getElementById("cantidad").value;
        this.showConfirm(DataForm)
        secondButtonModal.addEventListener('click',async () => {
          modalHide()
          modalShowLoading()
          await Movimiento.saveMovimiento(DataForm)
          modalHide('myModalLoading')
          modalShow('¡Guardo con exito ✔️!',`
          <p>Los datos han sido cargados</p>`)
          form.reset()
          form.classList.remove('was-validated')
        })
        
      } else {
        modalShow('Falta completar algunos datos ⚠️', '<p>Debe seleccionar un artículo</p>')
      }
    }
    else {
      modalShow('Falta completar algunos datos ⚠️', '<p>Debe completar todo los campos obligatorios</p>')
    }
    event.preventDefault();
  }
}