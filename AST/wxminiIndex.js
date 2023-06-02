const fs = require('fs');
const path = require('path');
const htmlparser = require('htmlParser2');
const uitls = require('./utils');

// 需要删除的class清单
let needDelClassName = [];
// 定义一个对象来存储 CSS 属性
let wxmlClass = [];
// css属性名匹配
const regex = /^\s*\.([a-zA-Z0-9_-]+)\s*{([^}]+)}/gm;

async function start() {
  const wxmlPath = uitls.scanWxmlFile();
  for (const wxmlP of wxmlPath) {
    const wxssPath = uitls.changeFileExt(wxmlP, '.wxss');

    if (fs.existsSync(wxssPath)) {
      wxmlClass = [];
      // 解析html class
      const htmlStr = fs.readFileSync(wxmlP, 'utf8');
      await dealWxmlClass(htmlStr);
      // 解析wxss css
      const wxssClassVal = dealCssName(wxssPath);
      const noUseC = differenceClass(wxmlClass, wxssClassVal);
      needDelClassName.push({
        path: wxmlP,
        noUseC,
      });
    }
  }
  // console.log(needDelClassName);

  uitls.writeFile(path.join(__dirname, './out/wxssClassName.json'), JSON.stringify(needDelClassName), 'utf-8');
}

// 创建一个解析器对象
const dealWxmlClass = function (htmlStr) {
  return new Promise((resolve, reject) => {
    const parser = new htmlparser.Parser({
      // 解析开始标签时调用的函数
      onopentag(name, attributes) {
        // 检查标签是否有 class 属性
        if (attributes.class) {
          wxmlClass = [...wxmlClass, ...attributes.class.split(' ')];
        }
        resolve();
      },
    });
    parser.write(htmlStr);
    parser.end();
  });
};

// 获取css属性名
function dealCssName(path) {
  const wxssStr = fs.readFileSync(path, 'utf8');
  const classNames = [];
  const classContent = [];
  while ((match = regex.exec(wxssStr)) != null) {
    if (match) {
      const className = match[1];
      classNames.push(className);
      classContent.push(match[0]);
    }
  }
  return {
    classNames,
    classContent,
  };
}

/**
 * 无用css检索
 * @param {*} wxmlC
 * @param {*} wxssC
 * @returns
 */
function differenceClass(wxmlC, wxssC) {
  const noUseClass = [];
  wxssC.classNames.forEach((c, i) => {
    const nouse = wxmlC.findIndex((v) => v == c) == -1;
    nouse && noUseClass.push(wxssC.classContent[i]);
  });
  return noUseClass;
}

start();
