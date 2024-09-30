import ApiServices from "./ApiServices";
const SheetId = process.env.SHEET_ID;

class Articulos extends ApiServices{

}
const DataArticulos = new Articulos({
  nameSheet: 'ARTICULOS',
  sheetId: SheetId,
  rowHead: 1
})
const DataAreas = new Articulos({
  nameSheet: 'AREAS',
  sheetId: SheetId,
  rowHead: 1
})
export {DataArticulos, DataAreas}