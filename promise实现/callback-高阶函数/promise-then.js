const fs = require('fs');
function read(url) {
    return new Promise((resolve, reject) =>{
        fs.readFile(url, 'utf8', function(err, data) {
           if(err) reject(err);
           resolve(data)
        });
    })
}
read('./fs/a.txt').then(res => {
    console.log(res)
    return undefined
},err => {
    console.log(err)
}).then(res => {
    console.log(res)
    return Promise.reject('err')
}, err=> {
    console.log(err)
}).then(res => {
    console.log(res)
}, err=> {
    console.log("err",err)
})