#!/usr/bin/env node

import { program } from 'commander'
import { entityGenerate } from '../src/generator/java-entity-generator.js'
import inquirer from 'inquirer'

program
  .version('1.0.0')
  .description('CURD java codes generator.')
  .name('easy-crud-cli')

program
  .command('generate')
  .description('generate java code with options')
  .action(async () => {
    console.log('welcome to use easy-crud-cli@v1.0.0 \n')

    // mysql://username:password@localhost:3306/db_name
    const { url } = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter your database connect info(mysql://username:password@localhost:3306/db_name):',
        validate: (input) =>
          input.trim() ? true : "database connect name can't be empty!",
      },
    ])

    const { genType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'genType',
        message: 'Select a CRUD code type:',
        choices: ['Entity', 'Service', 'Mapper', "SQL Mapper"],
      },
    ])

    const { tableName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'tableName',
        message: 'Enter table name:',
        validate: (input) =>
          input.trim() ? true : "table name can't be empty!",
      },
    ])

    const { packageName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'packageName',
        message: 'Enter package name:',
        default: 'com.example.pkg',
        validate: (input) =>
          input.trim() ? true : "package name can't be empty!",
      },
    ])

    const { className } = await inquirer.prompt([
      {
        type: 'input',
        name: 'className',
        message: 'Enter class name:',
        validate: (input) =>
          input.trim() ? true : "class name can't be empty!",
      },
    ])

    const { filePath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'filePath',
        message: 'Enter file path:',
        validate: (input) =>
          input.trim() ? true : "file path can't be empty!",
      },
    ])

    // generate code
    console.log('\ngenerating...')
    if (genType === "Entity") {
      await entityGenerate(url, tableName, className, packageName, filePath)
    }
    console.log('\ncomplete!')

    process.exit(0)
  })

program.parse(process.argv)