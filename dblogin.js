import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dvg4184'
})

export function registerUser () {
  connection.connect()
}
