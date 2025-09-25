import mysql from 'mysql2/promise'

async function queryMetadata(url, tableName) {
  const parsed = new URL(url)

  // mysql://username:password@localhost:3306/db_name
  // create a database connect
  const connection = await mysql.createConnection({
    host: parsed.hostname,
    port: Number(parsed.port),
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.replace(/^\//, ''), // remove slash
  })
  try {
    const [results, fields] = await connection.query('DESCRIBE ' + tableName)
    connection.destroy()
    return results
  } catch (err) {
    console.log(err)
    connection.destroy()
  }
}

/**
 * extract export the fields
 * @param url database connect url
 * @param tableName the database table name
 * @returns fieldList for Java
 */
export async function extract(url, tableName) {
  const fieldList = []
  const columns = await queryMetadata(url, tableName)
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    const fieldName = column['Field']
    const fieldType = column['Type']

    const item = {
      type: matchType(fieldType),
      name: format(fieldName),
    }
    fieldList.push(item)
  }
  console.log("list: ", fieldList)
  return fieldList
}

/**
 * format transfer the snake_case string to camelCase.
 */
function format(str) {
  return str.replace(/_([a-zA-Z0-9])/g, (match, group1) => group1.toUpperCase())
}

/**
 * matchType makes the database type name to Java Type name
 */
function matchType(databaseType) {
  switch (true) {
    case databaseType.includes('int'):
      return 'Integer'

    case databaseType.includes('varchar'):
      return 'String'

    default:
      return
  }
}