let offscreen, ctx;
// 监听主线程发的信息
onmessage = function (e) {
  if (e.data.msg == 'init') {
    init();
    draw();
  }
};

function init() {
  offscreen = new OffscreenCanvas(512, 512);
  ctx = offscreen.getContext('2d');
}
// 绘制图形
function draw() {
  ctx.clearRect(0, 0, offscreen.width, offscreen.height);
  for (var i = 0; i < 10000; i++) {
    for (var j = 0; j < 1000; j++) {
      ctx.fillRect(i * 3, j * 3, 2, 2);
    }
  }
  //   通过transferToImageBitmap函数可以从OffscreenCanvas对象的绘制内容创建一个ImageBitmap对象。
  //   该对象可以用于到其他canvas的绘制
  const imageBitmap = offscreen.transferToImageBitmap();
  // 传送给主线程
  postMessage({ imageBitmap: imageBitmap }, [imageBitmap]);
}
