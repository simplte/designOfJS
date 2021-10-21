import fs from 'fs';
import path from 'path';

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
}
export default renderTemplate;