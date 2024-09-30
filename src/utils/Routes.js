import Home from "@pages/Home";
import Error404 from "@pages/Error404";
import Loader from "@components/Loader";
import { getHash } from "./Tools";
import Articulos from "../pages/Articulos/Articulos";
import Movimientos from "../pages/Movimientos/Movimientos";

const routes = {
  "/": Home,
  "/articulos": Articulos,
  "/movimientos": Movimientos
};
const resolveRoutes = (route) => {
  if (route === undefined) {
    route = "";
  }
  else if(route.startsWith('no-conformidad=')) {
    route = "no-conformidad=:id"
  }
  else if(route.startsWith('oportunidad=')) {
    route = "oportunidad=:id"
  }
  return `/${route}`;
};

const router = async () => {
  const load = new Loader({ idLoad: "load" });
  load.create();
  const content = document.getElementById("content");
  content.classList.add("d-none");
  let hash = getHash();
  let route = resolveRoutes(hash);
  let render = routes[route] ? routes[route] : Error404;
  try {
    await render(content);
    content.classList.remove("d-none");
    load.delete();
  } catch (e) {
    console.log(e);
  }
};
export default router;
