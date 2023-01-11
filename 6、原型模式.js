







// ES6 的类其实是原型继承的语法糖

    // 在 JavaScript 中，每个构造函数都拥有一个prototype属性，它指向构造函数的原型对象，这个原型对象中有一个 constructor 属性指回构造函数；
    //     每个实例都有一个__proto__属性，当我们使用构造函数去创建实例时，实例的__proto__属性就会指向构造函数的原型对象。
    //     具体来说，当我们这样使用构造函数创建一个对象时：

    // 创建一个Dog构造函数
    function Dog(name, age) {
    this.name = name;
    this.age = age;
    }
    Dog.prototype.eat = function () {
        console.log("肉骨头真好吃");
    };
    // 使用Dog构造函数创建dog实例
    const dog = new Dog("旺财", 3);





    // 深拷贝
        // JSON.stringify
        const liLei = {
            name: 'lilei',
            age: 28,
            habits: ['coding', 'hiking', 'running']
        }
        const liLeiStr = JSON.stringify(liLei)
        const liLeiCopy = JSON.parse(liLeiStr);
        liLeiCopy.habits.splice(0,1)
        // console.log('李雷副本的habits数组是', liLeiCopy.habits)
        // console.log('李雷的habits数组是',  liLei.habits)
        // JavaScript中的splice主要用来对js中的数组进行操作，包括删除，添加，替换等





        // 调用深拷贝方法，若属性为值类型，则直接返回；
        // 若属性为引用类型，则递归遍历。
        // 这就是我们在解这一类题时的核心的方法
        function deepClone(obj) {
            if(typeof obj !== "object" || obj === null){
                return obj
            }
            let copy = {}
            if(obj.constructor === Array){
                copy = []
            }
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    copy[key] = deepClone(obj[key])
                }
            }
            return copy
        }
        function fn () {}
        console.log(deepClone(typeof {}))
        console.log(deepClone(typeof null))
        console.log(deepClone(typeof undefined))
        console.log(deepClone(typeof fn))
        console.log(deepClone(typeof true === "boolean"))
        console.log([6].constructor === Array)
        console.log(deepClone({uname: '1', age: 2}))
