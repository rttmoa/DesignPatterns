




// 差异化询价
    // 需求：
    //     当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
    //     当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
    //     当价格类型为“返场价”时，满 200 - 50，不叠加
    //     当价格类型为“尝鲜价”时，直接打 5 折
    // 预售价 - pre
    // 大促价 - onSale
    // 返场价 - back
    // 尝鲜价 - fresh
    function askPrice(tag, originPrice){
        if(tag === "pre"){
            if(originPrice >= 100){
                return originPrice - 20
            }
            return originPrice * 0.9
        }
        if(tag === "onSale"){
            if(originPrice >= 100){
                return originPrice - 30
            }
            return originPrice * 0.8
            // return originPrice >= 100 ? originPrice - 30 : originPrice * 0.8
        }
        if(tag === "back"){
            if(originPrice >= 200){
                return originPrice - 50
            }
            return originPrice 
        }
        if(tag === "fresh"){
            return originPrice * 0.5
        }
    }
    // console.log(askPrice("onSale", 200)) // 170


    // 此函数弊端：
        // 1、比如说万一其中一行代码出了 Bug，那么整个询价逻辑都会崩坏；
        // 2、与此同时出了 Bug 你很难定位到底是哪个代码块坏了事；
        // 3、再比如说单个能力很难被抽离复用等等等等
    
    

// 重构询价逻辑
    function prePrice(originPrice){
        if(originPrice >= 100){
            return originPrice - 20
        }
        return originPrice * 0.9
    }
    function onSalePrice(originPrice){
        if(originPrice >= 100){
            return originPrice - 30
        }
        return originPrice * 0.8
        // return originPrice >= 100 ? originPrice - 30 : originPrice * 0.8
    }
    function backPrice(originPrice){
        if(originPrice >= 200){
            return originPrice - 50
        }
        return originPrice 
    }
    function freshPrice(originPrice){
        return originPrice * 0.5
    }
    function askPrice(tag, originPrice){
        if(tag === "pre"){
            return prePrice(originPrice)
        }
        if(tag === "onSale"){
            return onSalePrice(originPrice)
        }
        if(tag === "back"){
            return backPrice(originPrice)
        }
        if(tag === "fresh"){
            return freshPrice(originPrice)
        }

    }

// 开放封闭改造
    // 这会儿我要想给 askPrice 增加新人询价逻辑，我该咋整？
    function prePrice(originPrice){
        if(originPrice >= 100){
            return originPrice - 20
        }
        return originPrice * 0.9
    }
    function onSalePrice(originPrice){
        if(originPrice >= 100){
            return originPrice - 30
        }
        return originPrice * 0.8
        // return originPrice >= 100 ? originPrice - 30 : originPrice * 0.8
    }
    function backPrice(originPrice){
        if(originPrice >= 200){
            return originPrice - 50
        }
        return originPrice 
    }
    function freshPrice(originPrice){
        return originPrice * 0.5
    }
    // 处理新人价
    function newUserPrice(originPrice) {
        if(originPrice >= 100) {
        return originPrice - 50
        }
        return originPrice
    } 
    function askPrice(tag, originPrice){
        if(tag === "pre"){
            return prePrice(originPrice)
        }
        if(tag === "onSale"){
            return onSalePrice(originPrice)
        }
        if(tag === "back"){
            return backPrice(originPrice)
        }
        if(tag === "fresh"){
            return freshPrice(originPrice)
        }
        if(tag === "newUser"){
            return newUserPrice(originPrice) // 在askPrice函数体中增加了newUser、没有实现“对扩展开放，对修改封闭”的效果
        }
    }
    // 在外层，我们编写一个 newUser 函数用于处理新人价逻辑；
        // 在 askPrice 里面，我们新增了一个 if-else 判断。
        // 可以看出，这样其实还是在修改 askPrice 的函数体，
        // 没有实现“对扩展开放，对修改封闭”的效果



// 那么在 JS 中，有没有什么既能够既帮我们明确映射关系，同时不破坏代码的灵活性的方法呢？
//     答案就是对象映射！
    const priceProcessor = {
        pre(originPrice){
            return originPrice >= 100 ? originPrice - 20 : originPrice * 0.9
        },
        onSale(originPrice){
            return originPrice >= 100 ? originPrice - 30 : originPrice * 0.8
        },
        back(originPrice){
            return originPrice >= 200 ? originPrice - 50 : originPrice
        },
        fresh(originPrice){
            return originPrice * 0.5
        }
    }
    priceProcessor.newUser = function (originPrice){
        if(originPrice >= 100){
            return originPrice - 50
        }
        return originPrice
    }
    function askPrice(tag, originPrice){
        return priceProcessor[tag](originPrice)
    }
    // 这时候如果你需要一个新人价，只需要给 priceProcessor 新增一个映射关系
    console.log(askPrice('pre', 300)) // 280