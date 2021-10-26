import fs from 'fs'
import path from 'path'

import deepMerge from './deepMerge.js'
import sortDependencies from './sortDependencies.js'

function renderTemplate(src, dest) {
  // 获取指定路径文件的详细信息
  const stats = fs.statSync(src)
  if (stats.isDirectory()) {
    // 创建文件夹
    // recursive 递归地复制目录 个人理解是递归创建目录
    fs.mkdirSync(dest, { recursive: true })
    console.log(fs.readdirSync(src))
    for (const file of fs.readdirSync(src)) {
        console.log(path.resolve(src, file))
        console.log(path.resolve(dest, file))
        // 代码模板地址  和克隆地址传入，进行递归克隆创建
      renderTemplate(path.resolve(src, file), path.resolve(dest, file))
    }
    return
  }

  // 如果当前文件夹中有package.json文件则 更新package.json内容
  const filename = path.basename(src)
  if (filename === 'package.json' && fs.existsSync(dest)) {
    // 读取现在package。json的内容
    const existing = JSON.parse(fs.readFileSync(dest))
    const newPackage = JSON.parse(fs.readFileSync(src))
    // 新老package.json合并，并且重新排序
    const pkg = sortDependencies(deepMerge(existing, newPackage))
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
    return
  }
  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  fs.copyFileSync(src, dest)
}
export default renderTemplate
