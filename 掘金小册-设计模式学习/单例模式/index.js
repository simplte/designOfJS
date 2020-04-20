class msgUtil {
    constructor() {
       console.log('我是一个单例对象') 
    }
    static getInstance() {
        if(false === this.instance instanceof this) {
            this.instance = new this;
        }
        return this.instance;
    }
}
const s1 = msgUtil.getInstance()
const s2 = msgUtil.getInstance()
// console.log(s1 == s2)
/**
 * 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。 
 *
*/
class Storage{
    constructor() {
        this.storage = {};
        this.instance = null
    }
    static getInstance() {
        if(!(this.instance instanceof this)) {
            this.instance = new this;
        }
        return this.instance;
    }
    setItem(key,value) {
        // localStorage.setItem(key,value)
        this.storage[key] = value;
    }
    getItem(key) {
        // return localStorage.getItem(key)
        return this.storage[key]
    }
}
const storage4= Storage.getInstance()
console.log(storage4)
storage4.setItem('bqc',"牛逼")
storage4.getItem('bqc')
// 闭包版本
function storageBb() {};
storageBb.prototype.getItem = function(key) {
    return localStorage.getItem(key)
}
storageBb.prototype.setItem = function(key, value) {
    localStorage.setItem(key,value)
}
const StorageFun = (function() {
    let instance = null;
    return function() {
        if(!instance) {
            instance =  new storageBb()
        } 
        return instance;
    }
 })()
 const storage1 = new StorageFun();
 const storage2 = new StorageFun();
 console.log(storage1 == storage2);

//  实现一个全局的模态框
class showToast {
    constructor() {
        this.isShow = false;
        this.modal = null;
        this.modalFun()
    }
    static getInstance() {
        if(!(this.instance instanceof this)){
             this.instance = new this;
        }
        return this.instance;
    }
    modalFun () {
        this.modal = document.createElement('div')
        this.modal.innerHTML = '我是一个全局唯一的Modal'
        this.modal.id = 'modal'
        this.modal.style.display = 'none'
        document.body.appendChild(this.modal)
    }
    showToastBox() {
        this.modal.style.display= 'block'
    }
    closeToastBox() {
        this.modal.style.display= 'none'
    }
}
document.getElementById('open').addEventListener('click', function() {
    const modal = showToast.getInstance()
    modal.modal.style.display = 'block'
})

// 点击关闭按钮隐藏模态框
document.getElementById('close').addEventListener('click', function() {
    const modal = showToast.getInstance();
    if(modal) {
      modal.modal.style.display = 'none'
    }
})
