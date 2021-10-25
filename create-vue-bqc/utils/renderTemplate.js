import fs from 'fs';
import path from 'path';

import deepMerge from './deepMerge.js'
import sortDependencies from './sortDependencies.js'

function renderTemplate(src, dest) {
    // 获取指定路径文件的详细信息
    const stats = fs.statSync(src);
    console.log(stats);
    if(stats.isDirectory()) {
        // 创建文件夹
        // recursive 递归地复制目录 个人理解是递归创建目录
        fs.mkdirSync(dest, {recursive: true});
        for(const file of fs.readdirSync(src)) {
            renderTemplate(path.resolve(src, file), path.resolve(dest, file));
        }
    }

    // 更新package.json内容
    const filename = path.basename(src);
    if(filename === "package.json" && fs.existsSync(dest)){
        const existing = JSON.parse(fs.readFileSync(dest));
        const newPackage = JSON.parse(fs.readFileSync(src));
        // 新老package.json合并，并且重新排序
        const pkg = sortDependencies(deepMerge(existing, newPackage))
        fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
        return;
    }
    if (filename.startsWith('_')) {
        // rename `_file` to `.file`
        dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
      }
    
      fs.copyFileSync(src, dest)
}
export default renderTemplate;