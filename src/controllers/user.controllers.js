import path from "path";
import { addSkater, getSkater } from "../../queries/user.queries.js";
import jwt from "jsonwebtoken";
const __dirname = path.resolve();

//ruta principal
const homePage = (req, res) => {
  res.render("Home");
};

//registro
const register = (req, res) => {
  res.render("Registro");
};

//skaters

const addskaterController = async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad } = req.body;
  const skater = { email, nombre, password, anos_experiencia, especialidad };
  const { files } = req;
  const { foto } = files;
  const { name } = foto;
  const pathPhoto = `/uploads/${name}`;
  foto.mv(`${__dirname}/public${pathPhoto}`, async (err) => {
    try {
      if (err) throw err;
      skater.foto = pathPhoto;
      await addSkater(skater);
      res.status(201).redirect("/login");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

const getSkaterController = async (req, res) => {
  const skaters = await getSkater();
  res.render("Home", {skaters});
}

const loginController = async (req, res) => {
  res.render("Login"); 
}

//ruta generica
const rutaGenerica = (req, res) => {
  res.send("error 404");
};

export {
  homePage,
  register,
  addskaterController,
  loginController,
  getSkaterController,
  rutaGenerica,
};
