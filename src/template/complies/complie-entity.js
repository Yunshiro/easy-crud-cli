import Handlebars from 'handlebars'
import { entityTemplate } from '../java-entity-templates.js'
import { extract } from '../../metadata/extractor.js'

const template = Handlebars.compile(entityTemplate)

// first char to Upper
Handlebars.registerHelper('capitalize', function(str) {
  if (!str || typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
})

export async function compileEntity(url, tableName, className, packageName) {
  const fieldList = await extract(url, tableName)

  // template to java code string
  const code = template({
    packagePath: packageName,
    className: className, 
    variables: fieldList 
  })

  return code
}