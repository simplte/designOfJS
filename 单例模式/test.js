class SingletonApple {
    constructor(name, creator, products) {
        this.name = name;
        this.creator = creator;
        this.products = products;
    }
    //静态方法
    static getInstance(name, creator, products) {
        if (!this.instance) {
            console.log(111111)
            this.instance = new SingletonApple(name, creator, products);
        }
        return this.instance;
    }

    setName(name) {
        this.name = name;
        console.log()
    }
    getName(name) {
        console.log(this.name)
    }
}

// let appleCompany = SingletonApple.getInstance('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
// let copyApple = SingletonApple.getInstance('苹果公司', '阿辉', ['iPhone', 'iMac', 'iPad', 'iPod'])

// console.log(appleCompany === copyApple); //true
module.exports = SingletonApple;