
// 构造器模式
    // 需求1：给公司员工信息录入系统 就一个人
    const liLei = {
        name: '李雷',
        age: 25,
        career: 'coder',
    }

    // 需求2：给公司员工信息录入系统 录两个人
    const liLei2 = {
        name: '李雷',
        age: 25,
        career: 'coder',
    }
     
    const hanMeiMei = {
        name: '韩梅梅',
        age: 24,
        career: 'product manager'
    }


    // 需求3：把部门的 500 人录入看看功能
    // ?
    // 使用构造函数代替一个一个录 
    function User(name , age, career) {
        this.name = name
        this.age = age
        this.career = career 
    } 
    const user = new User(name, age, career)


    // 在创建一个user过程中，谁变了，谁不变？
    // 很明显，变的是每个user的姓名、年龄、工种这些值，这是用户的个性，不变的是每个员工都具备姓名、年龄、工种这些属性，这是用户的共性
// --------------------------------------构造器模式-------------------------------



// 简单工厂模式
    // 需求1：程序员和产品经理之间不能依靠career字段区分、要求这个系统具备给不同工种分配职责说明的功能。 
        // 也就是说，要给每个工种的用户加上一个个性化的字段，来描述他们的工作内容 
    function Coder(name , age) {
        this.name = name
        this.age = age
        this.career = 'coder' 
        this.work = ['写代码','写系分', '修Bug']
    }
    function ProductManager(name, age) {
        this.name = name 
        this.age = age
        this.career = 'product manager'
        this.work = ['订会议室', '写PRD', '催更']
    }
    function Factory(name, age, career) {
        switch(career) {
            case 'coder':
                return new Coder(name, age) 
                break
            case 'product manager':
                return new ProductManager(name, age)
                break
            // ...
        }
    } 
    // 看起来是好一些了，至少我们不用操心构造函数的分配问题了。
    // 但是大家注意我在 switch 的末尾写了个省略号，这个省略号比较恐怖。
    // 看着这个省略号，李雷哭了，他想到：整个公司上下有数十个工种，难道我要手写数十个类、数十行 switch 吗？


    // 当然不！回到我们最初的问题：大家仔细想想，在楼上这两段并不那么好的代码里，变的是什么？不变的又是什么？
        // Coder 和 ProductManager 两个工种的员工，是不是仍然存在都拥有 name、age、career、work 这四个属性这样的共性？
        // 它们之间的区别，在于每个字段取值的不同，以及 work 字段需要随 career 字段取值的不同而改变。

    function User (name, age, career, work){
        this.name = name
        this.age = age
        this.career = career
        this.work = work
    }
    function Factory(name, age, career){
        let work;
        switch(career){
            case "coder":
                work = ['写代码','写系分', '修Bug'] 
                break;
            case "product manager":
                work = ['订会议室', '写PRD', '催更']
                break;
            case "boss":
                work = ['喝茶', '看报', '见客户']
                break;
            case "xxx":
                // ... 
        }
        return new User(name, age, career, work)
    }
// --------------------------------------简单工厂模式-------------------------------
// 现在我们一起来总结一下什么是工厂模式：
    // 工厂模式其实就是将创建对象的过程单独封装。
        // 它很像我们去餐馆点菜：比如说点一份西红柿炒蛋，
        // 我们不用关心西红柿怎么切、怎么打鸡蛋这些菜品制作过程中的问题，我们只关心摆上桌那道菜。
    // 在工厂模式里，我传参这个过程就是点菜，
        // 工厂函数里面运转的逻辑就相当于炒菜的厨师和上桌的服务员做掉的那部分工作——这部分工作我们同样不用关心，
        // 我们只要能拿到工厂交付给我们的实例结果就行了。

// 总结一下：工厂模式的目的，就是为了实现无脑传参，就是为了爽！