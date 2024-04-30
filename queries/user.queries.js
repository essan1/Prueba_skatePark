import db from "../config/db.js";

const addSkater = async (skater) => {
  try {
    const values = Object.values(skater);
    const skaterQuery = {
      text: `insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values($1,$2,$3,$4,$5,$6,'f') returning * `,
      values: values,
    };

    const result = await db.query(skaterQuery);
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getSkater = async (req, res) => {
  try {
    const skatersQuery = {
      text: "select * from skaters",
    }
    const result = await db.query(skatersQuery);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.log(error.message);
  }
}

const logInQuery = async (email, password) => {
  const logInSql = {
    text: "SELECT * FROM skaters WHERE email = $1 AND password = $2",
    values: [email, password],
  };
  const result = await db.query(logInSql);
  return result.rows;
};


// Consulta para actualizar el perfil del usuario
const updateSkater = async (id, updatedFields) => {
  try {
    const { nombre, password, años_experiencia, especialidad } = updatedFields; // Desestructurar updatedFields
    const updateQuery = {
      text: `UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5`,
      values: [nombre, password, años_experiencia, especialidad, id],
    };

    await db.query(updateQuery);
  } catch (error) {
    console.error("Error en updateSkater:", error); // Agregar este registro de error
    throw new Error("Error al actualizar el perfil del usuario");
  }
};


// Consulta para eliminar la cuenta del usuario
const deleteSkater = async (id) => {
  try {
    const deleteQuery = {
      text: `DELETE FROM skaters WHERE id = $1`,
      values: [id],
    };

    await db.query(deleteQuery);
  } catch (error) {
    throw new Error("Error al eliminar la cuenta del usuario");
  }
};


export { addSkater, getSkater, logInQuery, updateSkater, deleteSkater };
