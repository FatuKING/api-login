import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const CONFIGDEFAULT = {
  host: process.env.HOST_DB || 'localhost',
  port: process.env.PORT_DB || 3306,
  user: process.env.USER_DB || 'root',
  password: process.env.PASS_DB || 'dvg4184',
  database: process.env.NAME_DB || 'db_login'
}

const connectionString = CONFIGDEFAULT

const connection = await mysql.createConnection(connectionString)

export class DBlogin {
  static async validateUser ({ email, password }) {
    try {
      const [[result]] = await connection.query('CALL getUserPassword(?);', [email])

      // Accede al primer objeto en el array de resultados y extrae la contraseña
      const passwordRow = result[0] // Ajusta si la estructura del objeto cambia
      if (passwordRow && passwordRow.passwordHash) {
        const validatePassword = bcrypt.compareSync(password, passwordRow.passwordHash)

        return validatePassword // Devuelve si la contraseña es correcta
      }
    } catch (error) {
      return error
    }
  }

  static async registerUser ({ email, password }) {
    try {
      const salt = parseInt(process.env.SALT)
      const passwordHash = await bcrypt.hash(password, salt)

      const result = await connection.query('CALL insertUser(?, ?, ?);', [email, passwordHash, 'email'])
      return result
    } catch (error) {
      return error.message
    }
  }
}
