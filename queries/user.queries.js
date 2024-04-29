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

export {
  addSkater,
};
