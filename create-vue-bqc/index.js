import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

import minimist from 'minimist'
import prompts from 'prompts'
import { red, green, blue } from 'kolorist'


import renderTemplate from './utils/renderTemplate.js'

function canSafelyOverwrite(dir) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}


async function init() {
  // 返回当前nodejs 进程执行时所在的文件目录
  const cwd = process.cwd()

  // possible options:
  // --default
  // --typescript / --ts
  // --jsx
  // --router / --vue-router
  // --vuex
  // --with-tests / --tests / --cypress
  // --force (for force overwriting)

  // process.argv node命令中得参数 返回一个数组 下标为三是执行时得字定义参数

  /**
   * minimist作用是将node命令中 --typerscript 类似得命令转成对象
   * node index.js --ts
   * { _: [], ts: true, typescript: true }
   */
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'with-tests': ['tests', 'cypress'],
      router: ['vue-router']
    },
    // all arguments are treated as booleans
    boolean: true
  })
  // 命令中是否存在 --xxx 提前需要处理得参数
  const isFeatureFlagsUsed =
    typeof (argv.default || argv.ts || argv.jsx || argv.router || argv.vuex || argv.tests) ===
    'boolean'

  // 获取node命令中第一个参数作为目标文件夹
  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'vue-project' : targetDir
  console.log(targetDir)
  //   强制重写
  const forceOverwrite = argv.force

  let result = {}

  try {
    //   prompts询问用户需要得插件配置
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Project language: JavaScript / TypeScript
    // - Add JSX Support?
    // - Install Vue Router for SPA development?
    // - Install Vuex for state management? (TODO)
    // - Add Cypress for testing?
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`

            return `${dirForPrompt} is not empty. Remove existing files and continue?`
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values = {}) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          name: 'needsTypeScript',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add TypeScript?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsJsx',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add JSX Support?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsRouter',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add Vue Router for Single Page Application development?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsVuex',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add Vuex for state management?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsTests',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add Cypress for testing?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (error) {
    console.log(red(error.message))
    process.exit(1)
  }
  console.log(result)

  const {
    packageName = toValidPackageName(defaultProjectName),
    shouldOverwrite,
    needsJsx = argv.jsx,
    needsTypeScript = argv.typescript,
    needsRouter = argv.router,
    needsVuex = argv.vuex,
    needsTests = argv.tests
  } = result

  // // 获取当前node进程执行得文件夹路径+将要创建得文件夹路径
  const root = path.join(cwd, targetDir)
  console.log(root)
  // // 文件夹创建： 如果需要重写 直接将文件夹清空
  if (shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    // 否则就重新创建
    fs.mkdirSync(root)
  }

  // // package.json文件创建并内容写入
  const pkg = { name: packageName, version: '0.0.0' }
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))
  const templateRoot = path.resolve(__dirname, 'template')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    renderTemplate(templateDir, root);
  }
  render('base')
  
}


init()
