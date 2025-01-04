import mysql from "mysql2/promise";

const config = {
  host: "b9ejxpdtn4ylh7bhqquh-mysql.services.clever-cloud.com",
  port: 3306,
  user: "uhj0vcjedombkpme",
  password: "e76gXn8QUhHlubnBkE28",
  database: "b9ejxpdtn4ylh7bhqquh",
};
const pool = mysql.createPool(config);

export class Model {
  static async Login(object) {
    try {
      const { nombre, contrasena } = object.data;
      const [usuario] = await pool.query(
        "SELECT * FROM usuarios WHERE nombre = ?",
        [nombre]
      );
      if (Array.isArray(usuario) && usuario.length === 0) {
        const error = "ERROR: Usuario no encontrado";
        return error;
      } else {
        if (Array.isArray(usuario)) {
          let usuario2 = "";
          let alias = "";
          let contrasena2 = "";
          usuario.forEach((state) => {
            alias = state.nombre;
            contrasena2 = state.contrasena;
            usuario2 = state.nombre;
          });
        
          if (contrasena2 === contrasena) {
            return { usuario2, alias, contrasena2 };
          }
          const e2 = "ERROR: Contraseña incorrecta";
          return e2;
        }
      }
      console.log(usuario);
    } catch (error) {
      throw new Error("A ocurrido un errosr" + error.message);
    }
  }
  static async Register(object) {
    try {
      const { nombre, contrasena, alias } = object.data;
      const [[{ uuids }]] = await pool.query("SELECT UUID() AS uuids");
        
      const [comprobar1] = await pool.query(
        "SELECT * FROM usuarios WHERE nombre = ?",
        [nombre]
      );
      if (comprobar1.length > 0) {
        return "El usuario ya existe";
      }

      const [comprobar2] = await pool.query(
        "SELECT * FROM usuarios WHERE alias = ?",
        [alias]
      );
      if (comprobar2.length > 0) {
        return "Este alias ya está ocupado";
      }

      await pool.query(
        `INSERT INTO usuarios (nombre, id, contrasena, alias) VALUES (?, ?, ?, ?)`,
        [nombre, uuids, contrasena, alias]
      );

      return "Usuario creado";
    } catch (error) {
      return error.message;
    }
  }
  static async Update({ id, object }) {
    try {
      const variables = [];
      const valores = [];

      if (object.data.nombre) {
        variables.push("nombre = ?");
        valores.push(object.data.nombre);
      }
      if (object.data.contrasena) {
        variables.push("contrasena = ?");
        valores.push(object.data.contrasena);
      }
      if (object.data.alias) {
        variables.push("alias = ?");
        valores.push(object.data.alias);
      }

      if (variables.length === 0) {
        return "No hay campos para actualizar.";
      }

      const result = await pool.query(
        `UPDATE usuarios SET ${variables.join(",")} WHERE id = ?`,
        [...valores, id]
      );
      console.log(result);
      return "Se actualizó la información correctamente.";
    } catch (error) {
      console.error("Error updating user:", error);
      return "Ha ocurrido un error, intente de nuevo."
    }
  }
}
