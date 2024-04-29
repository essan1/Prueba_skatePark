import path from "path";
import addSkater from "../queries/user.queries.js"
const __dirname = import.meta.dirname;


//ruta principal
const homePage = (req, res) => {
  res.render("Home");
};

//registro
const register = (req, res) => {
  res.render("Registro");
}

//skaters

const skaterController = async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad } = req.body;
  const skater = { email, nombre, password, anos_experiencia, especialidad };
  const { files } = req;
  const { foto } = files;
  const { name } = foto;
  const pathPhoto = `/uploads/${name}`;
  const absolutePath = path.join(__dirname, "../public", pathPhoto);
  foto.mv(absolutePath, async (err) => {
    try {
      if (err) throw err;
      skater.foto = pathPhoto;
      await addSkater(skater);
      res.status(201).redirect("/login");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};


//ruta generica
const rutaGenerica = (req, res) => {
  res.send("error 404");
};  


export { homePage, register, skaterController, rutaGenerica };