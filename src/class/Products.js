const SrcArticulos = 'ARTICULOS!A1:ZZZ'
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
}