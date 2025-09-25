import fs from 'fs'
import { compileEntity } from '../template/complies/complie-entity.js'

export async function entityGenerate(url, tableName, className, packageName, filePath) {
  
  const code = await compileEntity(url, tableName, className, packageName)
  // java code to file
  const path = filePath + '/' + className + '.java'
  console.log("will generate entity on: ", path)
  fs.writeFileSync(path, code)
  
}