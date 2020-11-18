function* foo() {
    for(let  i = 0 ; i <=4 ;i++ ) {
        let x = yield `等一下，i=${i}`;
    }
}

setTimeout(() => {
    console.log('到这了')
},100)

var a = foo();
var b = a.next();
console.log(b)
var c = a.next();
var d = a.next();
var e = a.next();
console.log(e);