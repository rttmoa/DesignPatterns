



// 抽象工厂模式
    // 手机的基本组成是操作系统OS和硬件HardWare组成
    // 如果我要开一个山寨手机工厂，那我这个工厂里必须是既准备好了操作系统，也准备好了硬件，才能实现手机的量产。
    // 考虑到操作系统和硬件这两样东西背后也存在不同的厂商，而我现在并不知道我下一个生产线到底具体想生产一台什么样的手机，
    // 我只知道手机必须有这两部分组成，所以我先来一个抽象类来约定住这台手机的基本组成

    class MobilePhoneFactory{
        // 提供操作系统的接口
        createOS(){
            throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！")
        }
        // 提供硬件的接口
        createHardWare(){
            throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！")
        }
    }
    // console.log(new MobilePhoneFactory().createOS()) // Error: 抽象工厂方法不允许直接调用，你需要将我重写！
    // 抽象工厂
        // 如果你尝试让它干点啥，比如 new 一个 MobilePhoneFactory 实例，并尝试调用它的实例方法。
        // 它还会给你报错，提醒你“我不是让你拿去new一个实例的，我就是个定规矩的”。
        // 在抽象工厂模式里，楼上这个类就是我们食物链顶端最大的 Boss——AbstractFactory（抽象工厂）


    // 抽象工厂不干活，具体工厂（ConcreteFactory）来干活！
    class FakeStarFactory extends MobilePhoneFactory{
        createOS() {
            // 提供安卓系统实例
            return new AndroidOS()
        }
        createHardWare(){
            // 提供高通硬件实例
            return new QualcommHardWare()
        }
    }



    // 定义操作系统这类产品的抽象产品类
    class OS {
        controlHardWare() {
            throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
        }
    } 
    // 定义具体操作系统的具体产品类
    class AndroidOS extends OS {
        controlHardWare() {
            console.log('我会用安卓的方式去操作硬件')
        }
    } 
    class AppleOS extends OS {
        controlHardWare() {
            console.log('我会用🍎的方式去操作硬件')
        }
    }



    // 硬件类产品同理
    // 定义手机硬件这类产品的抽象产品类
    class HardWare {
        // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
        operateByOrder() {
            throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
        }
    } 
    // 定义具体硬件的具体产品类
    class QualcommHardWare extends HardWare {
        operateByOrder() {
            console.log('我会用高通的方式去运转')
        }
    } 
    class MiWare extends HardWare {
        operateByOrder() {
            console.log('我会用小米的方式去运转')
        }
    }



    // 好了，如此一来，当我们需要生产一台FakeStar手机时，我们只需要这样做：
    // 这是我的手机
    const myPhone = new FakeStarFactory()
    // 让它拥有操作系统
    const myOS = myPhone.createOS()
    // 让它拥有硬件
    const myHardWare = myPhone.createHardWare()
    // 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
    myOS.controlHardWare()
    // 唤醒硬件(输出‘我会用高通的方式去运转’)
    myHardWare.operateByOrder()





    // 关键的时刻来了——假如有一天，FakeStar过气了，我们需要产出一款新机投入市场，这时候怎么办？
    // 我们是不是不需要对抽象工厂MobilePhoneFactory做任何修改，只需要拓展它的种类： 
    class newStarFactory extends MobilePhoneFactory {
        createOS() {
            // 操作系统实现代码
        }
        createHardWare() {
            // 硬件实现代码
        }
    }
    // 这么个操作，对原有的系统不会造成任何潜在影响 所谓的“对拓展开放，对修改封闭”就这么圆满实现了。前面我们之所以要实现抽象产品类，也是同样的道理。




    // 抽象工厂模式的定义，是围绕一个超级工厂创建其他工厂。
    // 本节内容对一些工作年限不多的同学来说可能不太友好，
    // 但抽象工厂目前来说在JS世界里也应用得并不广泛，
    // 所以大家不必拘泥于细节，只需留意以下三点：
        // 1、学会用 ES6 模拟 JAVA 中的抽象类；
        // 2、了解抽象工厂模式中四个角色的定位与作用；
        // 3、对“开放封闭原则”形成自己的理解，知道它好在哪，知道执行它的必要性。
    // 如果能对这三点有所掌握，那么这一节的目的就达到了，最难搞、最难受的抽象工厂也就告一段落了。