const ws = require('nodejs-websocket');
let arrS = {};
ws.createServer((socket) => {
  socket.on('text', (info) => {
    if (typeof info === 'string' && info == 'pingqc') return;
    const data = JSON.parse(info);
    // 是否是管理员 是管理员直接上线
    if (data.id == 'admin' && data.isLogged) {
      arrS[data.id] = socket;
      console.log(arrS);
      return;
    }
    // 其他人员上线
    if (data.isLogged) {
      arrS[data.id] = socket;
      return;
    }
    // 没上线就发言
    if (!arrS[data.id]) {
      arrS['admin'].sendText(
        JSON.stringify({
          id: 'admin',
          res: '请先上线后发言',
          time: new Date().getTime(),
        })
      );
      return;
    }
    for (const item in arrS) {
      if (item == data.id) return;
      arrS[item].sendText(
        JSON.stringify({
          id: data.id,
          res: data.msg,
          userName: data.userName,
          time: new Date().getTime(),
        })
      );
    }
  });

  socket.on('connection', (code) => {
    console.log('开启链接', code);
  });
  socket.on('close', (close) => {
    console.log('关闭连接', close);
    arrS = {};
  });
  socket.on('error', (err) => {
    console.log(err);
  });
}).listen(4000);
