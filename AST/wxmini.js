const fs = require('fs');
const path = require('path');
const htmlparser = require('htmlParser2');
// 定义一个对象来存储 CSS 属性
let cssProperties = [];

// 创建一个解析器对象
const parser = new htmlparser.Parser({
  // 解析开始标签时调用的函数
  onopentag(name, attributes) {
    // 检查标签是否有 style 属性
    // console.log(name, attributes);
    if (attributes.class) {
      cssProperties = [...cssProperties, ...attributes.class.split(' ')];
    }
  },
});

const html = fs.readFileSync(path.join(__dirname, './source/wxmini/sfcIndex.wxml'), 'utf8');
const wxss = fs.readFileSync(path.join(__dirname, './source/wxmini/sfcIndex.wxss'), 'utf8');
const regex = /^\s*\.([a-zA-Z0-9_-]+)\s*{([^}]+)}/gm;
// 开始解析 HTML
parser.write(html);
parser.end();
// 获取css属性名
const classNames = [];
while ((match = regex.exec(wxss)) != null) {
  if (match) {
    const className = match[1];
    classNames.push(className);
  }
}
const outContent = {
  sfcIndex: {
    wxss: classNames,
    wxml: cssProperties,
  },
};
fs.writeFileSync(path.join(__dirname, './out/wxssClassName.json'), JSON.stringify(outContent), 'utf-8');
console.log(classNames);
Object.keys(outContent).forEach((it) => {
  const cur = outContent[it];
  const wxss = cur.wxss;
  const wxml = cur.wxml;
  const nouseClass = [];
  wxss.forEach((c) => {
    const nouse = wxml.findIndex((v) => v == c) == -1;
    nouse && nouseClass.push(c);
  });
  console.log(nouseClass);
});

// 打印出所有的 CSS 属性
// console.log(cssProperties);
