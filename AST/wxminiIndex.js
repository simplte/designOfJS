const fs = require('fs');
const path = require('path');
const htmlparser = require('htmlParser2');
const uitls = require('./utils');
const cssTree = require('css-tree');
// const prettier = require('prettier');
// const prettierConfig = require('../../prettier.config');

const skipFileArr = ['transition.wxml'];
// 需要删除的class清单
let needDelClassName = [];
// 定义一个对象来存储 CSS 属性
let wxmlClass = [];
// css属性名匹配
const regex = /^\s*\.([a-zA-Z0-9_-]+)\s*{([^}]+)}/gm;

async function start() {
  const wxmlPath = uitls.scanWxmlFile();
  for (const wxmlP of wxmlPath) {
    const isSkip = skipFileArr.some((item) => wxmlP.includes(item));
    // console.log(isSkip)
    const wxssPath = uitls.changeFileExt(wxmlP, '.wxss');
    if (!isSkip) {
      if (fs.existsSync(wxssPath)) {
        wxmlClass = [];
        // 解析html class
        const htmlStr = fs.readFileSync(wxmlP, 'utf8');
        await dealWxmlClass(htmlStr);
        // 解析wxss css
        const wxssClassVal = dealCssName(wxssPath);
        // console.log(wxmlClass)
        const noUseC = differenceClass(wxmlClass, wxssClassVal);
        if (noUseC.length > 0) {
          needDelClassName.push({
            path: wxmlP,
            noUseC,
          });
        }
      }
    }
  }
  // const formattedData = prettier.format(JSON.stringify(needDelClassName), {
  //   parser: 'json',
  //   trailingComma: 'es5', // 添加尾随逗号（可选值：none|es5|all）
  //   singleQuote: true, // 使用单引号而不是双引号
  //   tabWidth: 2, // 缩进宽度
  //   printWidth: 80, // 每行最大字符数
  // })
  console.log(needDelClassName);

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
  const ast = cssTree.parse(wxssStr);
  let selectors = [];
  const classContent = [];

  // 一：csstree ast检索选择器
  // cssTree.walk(ast, (wxss) => {
  //   if (wxss.type === 'StyleSheet') {
  //     wxss.children.forEach((node) => {
  //       if (node && node.type == 'Rule' && node.prelude.type == 'SelectorList') {
  //         node.prelude.children.forEach((cnode) => {
  //           cnode.children.forEach((cval) => {
  //             if (cval.type == 'ClassSelector') {
  //               selectors.push(cval.name);
  //             }
  //           });
  //         });
  //       }
  //     });
  //   }
  // });

  // 二：正则方式获取wxss选择器及内容
  while ((match = regex.exec(wxssStr)) != null) {
    if (match) {
      const className = match[1];
      selectors.push(className);
      classContent.push(match[0]);
    }
  }

  selectors = [...new Set(selectors)];
  console.log({
    selectors,
    classContent,
  });

  return {
    selectors,
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
  wxssC.selectors.forEach((c, i) => {
    const nouse = wxmlC.findIndex((v) => v.includes(c)) == -1;
    //  nouse && noUseClass.push(wxssC.classContent[i]);
    nouse && noUseClass.push(c);
  });
  return noUseClass;
}

start();
