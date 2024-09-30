import Titles from "@components/Titles";
const title = new Titles()
const Home = (content) => {
  const view = `
      <div class="container row g-3 mx-auto" style="max-width: 600px">
      ${title.mainTitle({title:'Gestión de acciones'})}
      `;
  content.innerHTML = view;
};
const card = (props) => {
  const view = `
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4 text-center">
      <img src="${props.img}" class="img-fluid rounded-start p-3" alt="..." style="max-width: 170px;">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${props.title}</h5>
        <p class="card-text"></p>
        <a href="${props.link}" class="btn btn-${props.color}">Agregar</a>
      </div>
    </div>
  </div>
</div>
  `
  return view
}
export default Home;
