const SrcMovimientos = "MOVIMIENTOS!A1:ZZZ";
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
      data.fecha = FormatsDate.latinFormat()
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
}
class Movimientos_UI {
  static async openUIMovimiento() {
    await loadPage("./html/movimientos.html");
    await this.loadArea();
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
  static loadListOFArticulos(articulos) {
    let ul = document.querySelector(".modal-list-products");
    ul.innerHTML = "";
    articulos.map((item) => {
      let li = document.createElement("li");
      li.innerHTML = `
      <i class="bi bi-circle" title="${item.id}"></i>
      <input class="btn text-start" type="button" title="${item.id}" value="${item.nombre}"  data-bs-toggle="button" onclick="Movimientos_UI.handleSelectArticulo(event)">
      `;
      ul.appendChild(li);
    });
  }
  static async handleSearchProduct() {
    try {
      articulos = await Articulo.getArticulos();
      this.loadListOFArticulos(articulos);
    } catch (e) {
      console.log(e);
    }
  }
  static handleFilterArticulos(event) {
    let word = normalizeString(event.target.value);
    let articulosFilter = articulos.filter((item) => {
      if (item.nombre) {
        let normalizedItemName = normalizeString(item.nombre);
        return normalizedItemName.includes(word);
      }
    });
    this.loadListOFArticulos(articulosFilter);
  }
  static handleSelectArticulo(event) {
    let IdArticulo = event.target.title;
    let icon = document.querySelector(`i[title='${IdArticulo}']`);
    icon.classList.replace("bi-circle", "bi-circle-fill");
    let articulo = document.querySelector(`input[title='${IdArticulo}']`);
    let modalElement = document.getElementById("modalProducts");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    let inputArticulo = document.getElementById("articulo");
    inputArticulo.value = articulo.value;
    inputArticulo.title = articulo.title;
  }
}
