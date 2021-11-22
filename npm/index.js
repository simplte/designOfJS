const chalk = require('chalk')
const Green = chalk.green
// 获取当前npm 执行的命令名字
console.log(Green(process.env.npm_lifecycle_event))
// 获取当前npm命令所在package的name
console.log(Green(process.env.npm_package_name))
// 获取npm命令具体执行的内容
console.log(Green(process.env.npm_package_scripts_test))
// 获取当前执行命令所在package.json中的config配置 npm_package_config_XXX
console.log(Green(process.env.npm_package_config_baseUrl))
// 继发处理 先执行成功test  再执行 test:npm
// "more": "test && test:npm",

// 获取命令中参数  npm run test --testVal
console.log(Green(JSON.parse(process.env.npm_config_argv).cooked))