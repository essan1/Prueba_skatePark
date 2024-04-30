import express from "express";
import {
  homePage,
  register,
  addskaterController,
  getSkaterController,
  loginController,
  logController,
  profileUpdate,
  updateProfile,
  deleteAccount,
  updateStatus,
  updateSkaterStatus
} from "../controllers/user.controllers.js";
const router = express.Router();

//ruta principal

router.get("/", getSkaterController);
router.get("/registro", register )
router.post("/skaters", addskaterController);
router.get("/login", loginController);
router.get("/skaters", getSkaterController);
router.post("/login", logController)
router.get("/perfil", profileUpdate);
router.delete("/skaters/:id", deleteAccount);
router.put("/perfil/:id", updateProfile);
router.get("/admin", updateStatus);
router.put("/skaters/status/:id", updateSkaterStatus);


//creamos nuestra ruta generica, simeprea al final
router.get("*", (req, res) => {
  res.status(404);
  res.send(
    "<h1><center>404 ERROR -- Pagina No Encontrada</center></h1><p><center><a href='/'>Ir a la página principal</a></center></p>"
  );
});


export default router;
