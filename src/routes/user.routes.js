import express from "express";
import {
  homePage,
  register,
  skaterController,
  loginController
} from "../controllers/user.controllers.js";
const router = express.Router();

//ruta principal

router.get("/", homePage);
router.get("/registro", register )
router.post("/skaters", skaterController);
router.get("/login", loginController);

//creamos nuestra ruta generica, simeprea al final
router.get("*", (req, res) => {
  res.status(404);
  res.send(
    "<h1><center>404 ERROR -- Pagina No Encontrada</center></h1><p><center><a href='/'>Ir a la página principal</a></center></p>"
  );
});


export default router;
