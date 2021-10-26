import fs from 'fs';
import path from 'path';

export function preOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
    for(const filename of fs.readdirSync(dir)) {
        const fullpath = path.resolve(dir, filename);
        // IstatSync方法返回一个stat数组对象
        console.log(fs.statSync(fullpath))
        if(fs.statSync(fullpath).isDirectory()) {
            dirCallback(fullpath);
            // 以防dirCallback完全删除目录
            if(fs.existsSync(fullpath)) {
                preOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
            }
            continue
        }
        fileCallback(fullpath)
    }
}

export function postOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
    for (const filename of fs.readdirSync(dir)) {
      const fullpath = path.resolve(dir, filename)
      if (fs.lstatSync(fullpath).isDirectory()) {
        postOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
        dirCallback(fullpath)
        continue
      }
      fileCallback(fullpath)
    }
  }