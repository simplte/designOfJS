const worker = new Worker('./worker.js');
worker.postMessage({ msg: 'init' });
worker.onmessage = function (e) {
  // 这里就接受到work 传来的离屏canvas位图
  ctx.drawImage(e.data.imageBitmap, 0, 0);
};
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke();
