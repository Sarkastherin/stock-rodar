const SrcArticulos = 'ARTICULOS!A1:ZZZ';
let Stock;
let ID;
let Movimientos;
let DataArticulo;
class Articulo {
    static async getArticulos() {
        let articulos;
        try {
            let response = await ApiGoogleSheet.getResponse(SrcArticulos);
            if (response.status === 200) {
                articulos = response.result.values;
                articulos = arrayToObject(articulos);
              }
              return articulos;
        } catch (e) {
          console.log(e);
        }
    }
    static async getArticuloById(id) {
      try {
        let articulos = await Movimiento.getStock();
        let articulo = articulos.find(item => item.id === id);
        return articulo
      }
      catch(e) {
        console.log(e);
      }
    }
}
class Articulo_UI {
  static async openUIArticulos(event) {
    activeLink(event);
    openLoading()
    await loadPage("./html/articulos.html");
    await this.loadArticulosOnTable()
    openUI();
    Movimientos = await Movimiento.getMovimientos();
  }
  static async loadArticulosOnTable(){
    
    try {
      Stock = await Movimiento.getStock();
      this.loadTable(Stock)
    } catch (e) {
      console.log(e)
    }
  }
  static loadTable(data){
    const tbodyStock = document.getElementById('tbodyStock');
    tbodyStock.innerHTML = '';
    data.map(item => {
      tbodyStock.innerHTML += `
      <tr title="${item.id}">
          <td>${item.nombre}</td>
          <td>${item.unidad}</td>
          <td>${item.stock}</td>
          <td class="text-center">
            <i 
              id="${item.id}" 
              class="btn btn-icon bi bi-eye"
              data-bs-toggle="modal" 
              data-bs-target="#cardArticulo"
              onclick="Articulo_UI.showCardArticulo(event)">
            </i>
          </td>
      </tr>
      `
    })

  }
  static filterTable(event) {
    let word = normalizeString(event.target.value);
    let StockFilter = Stock.filter((item) => {
      if (item.nombre) {
        let normalizedItemName = normalizeString(item.nombre);
        return normalizedItemName.includes(word);
      }
    });
    this.loadTable(StockFilter)
  }
  static resetCard(name,stock,cardContent) {
    name.innerText = 'Nombre del Producto'
    name.classList.add('placeholder')
    stock.innerText = '000'
    stock.classList.add('placeholder')
    cardContent.innerHTML = ''
  }
  static fillCard(data, name, stock, cardContent) {
    name.innerText = data.nombre;
    name.classList.remove('placeholder');
    stock.innerText = data.stock
    stock.classList.remove('placeholder');

    let MovimientoByID;
    if(Movimientos.some(item => item.articulo === ID)) {
      MovimientoByID = Movimientos.filter(item => item.articulo === ID);
    }
    MovimientoByID.map(item => {
      cardContent.innerHTML += `
      <tr>
          <td>${item.fecha}</td>
          <td>${item.tipo}</td>
          <td>${item.area}</td>
          <td>${item.cantidad}</td>
      </tr>
      `
    })
  }
  static async showCardArticulo(event){
    let name = document.getElementById('nameArticulo')
    let stock = document.getElementById('stock');
    let cardContent = document.getElementById('cardContent')
    this.resetCard(name,stock,cardContent);

    if(event){ID = event.target.id;}
    DataArticulo = await Articulo.getArticuloById(ID)
    this.fillCard(DataArticulo, name, stock, cardContent)
  }
  static async saveNewStock() {
    modalHide('ajustarStockModal')
    DataForm.area = 'No aplica';
    DataForm.tipo = 'Ajuste';
    DataForm.articulo = ID;
    DataForm.cantidad = Number(document.getElementById('stock_real').value) - DataArticulo.stock
    await Movimiento.saveMovimiento(DataForm);
    
    Movimientos = await Movimiento.getMovimientos();
    
    let modalElement = document.getElementById("cardArticulo");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.show();
    this.showCardArticulo();
  }
}