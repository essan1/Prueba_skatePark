import path from "path";
import {
  addSkater,
  getSkater,
  logInQuery,
  updateSkater,
  deleteSkater,
  adminSkaters,
  adminUpdateSkater,
} from "../../queries/user.queries.js";
import jwt from "jsonwebtoken";
const __dirname = path.resolve();
process.loadEnvFile();
const secretKey = process.env.SECRET_KEY;

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
};

const getSkaterController = async (req, res) => {
  const skaters = await getSkater();
  res.render("Home", { skaters });
};

const loginController = async (req, res) => {
  res.render("Login");
};

const logController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await logInQuery(email, password);
    if (result.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    const user = result[0];
    const token = jwt.sign({ user }, secretKey, { expiresIn: "10m" });
    res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const profileUpdate = async (req, res) => {
  try {
    const token = req.query.token;
    const decodedToken = jwt.verify(token, secretKey);
    const user = decodedToken.user;
    res.render("Perfil", { user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSkater(id);
    res.status(200).send("Usuario eliminado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, password, años_experiencia, especialidad } = req.body;
    const updatedFields = { nombre, password, años_experiencia, especialidad };
    await updateSkater(id, updatedFields);
    res.status(200).json({ message: "Datos actualizados" });
  } catch (error) {
    console.error("Error en updateProfile:", error);
    res.status(500).send(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const skaters = await adminSkaters();
    res.render("Admin", { skaters });
  } catch (error) {
    console.error("Error en GET /admin:", error);
    res.status(500).send(error.message);
  }
};

const updateSkaterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const updatedEstado = await adminUpdateSkater(id, estado);
    res
      .status(200)
      .json({ message: "Update successful", estado: updatedEstado });
  } catch (error) {
    console.error("Error en updateSkaterStatus:", error);
    res.status(500).send({ message: error.message });
  }
};

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
  logController,
  profileUpdate,
  updateProfile,
  deleteAccount,
  updateStatus,
  updateSkaterStatus,
  rutaGenerica,
};
