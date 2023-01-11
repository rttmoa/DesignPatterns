




// 兼容接口就是一把梭——适配器的业务场景
    // 因此在不考虑兼容性的情况下，我们更愿意使用fetch、而不是使用ajax来发起异步请求。
    // 李雷是拜fetch教的忠实信徒，为了能更好地使用fetch，他封装了一个基于fetch的http方法库
    
    // export default class HttpUtils{} // SyntaxError: Unexpected token 'export'
    class HttpUtils {
        static get(url){
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(respone => respone.json())
                    .then(result => {
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }) 
        }
        // post方法，data以object形式传入
        static post(url, data){
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: this.changeData(data)
                })
                .then(respone => respone.json())
                .then(result => { resolve(result) }) // 这里不返回  直接回调
                .catch(error => { reject(error) }) 
            })
        }
        changeData(data){
            var prop, str = "";
            var i = 0;
            for (prop in data) {
                if(!prop){ return }
                if(i == 0){
                    str += prop + '=' + data[prop]
                }
                else{
                    str += '&' + prop + '=' + data[prop]
                }
                i++
            }
            return str
        }
    }
    

    // // 定义目标url地址
    // const URL = "xxxxx"
    // // 定义post入参
    // const params = {
    //     ...
    // }

    // // 发起post请求
    // const postResponse = await HttpUtils.post(URL,params) || {} 
    // // 发起get请求
    // const getResponse = await HttpUtils.get(URL) || {}


    // const res = new HttpUtils()
    // console.log(res.changeData({uname: 'zhangsan', age: 33, hobby: '吃饭'}))  // uname=zhangsan&age=33&hobby=吃饭





    // 需求：
        // 公司所有的业务的网络请求都迁移到你这个 HttpUtils 上来
        // 所有的请求都用HttpUtils库发请求不用Ajax发请求了

    // 该公司第1代员工封装的网络请求库，是基于 XMLHttpRequest 的，差不多长这样
    function Ajax(type, url, data, success, failed){
        // 创建ajax对象
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
    
        // ...(此处省略一系列的业务逻辑细节)
    
        var type = type.toUpperCase();
            
        // 识别请求类型
        if(type == 'GET'){
            if(data){
            xhr.open('GET', url + '?' + data, true); //如果有数据就拼接
            } 
            // 发送get请求
            xhr.send();
    
        } else if(type == 'POST'){
            xhr.open('POST', url, true);
            // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // 发送post请求
            xhr.send(data);
        }
    
        // 处理返回数据
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    success(xhr.responseText);
                } else {
                    if(failed){
                        failed(xhr.status);
                    }
                }
            }
        }
    }
    // // // Ajax请求实现逻辑、调用形式
    // Ajax('get', 'url地址', 'post入参', function(data){
    //     // 成功的回调函数
    // },function(error){
    //     // 失败的回调函数
    // })    




    // 还好李雷学过设计模式，他立刻联想到了专门为我们抹平差异的适配器模式。
    // 要把老代码迁移到新接口，不一定要挨个儿去修改每一次的接口调用——正如我们想用 iPhoneX + 旧耳机听歌，
    // 不必挨个儿去改造耳机一样，我们只需要在引入接口时进行一次适配，
    // 便可轻松地 cover 掉业务里可能会有的多次调用（具体的解析在注释里）：
    async function AjaxAdapter(type, url, data, success, failed){
        const type = type.toUpperCase();
        let result;
        try {
            if(type === "GET"){
                result = await HttpUtils.get(url) || {}
            }
            if(type === "POST"){
                result = await HttpUtils.post(url, data) || {}
            }
            result.statusCode === 1 && success ? success(result) : failed(result.statusCode)
        } catch (error) {
            if(failed){
                failed(error.statusCode)
            }
        }
    }
    // 用适配器适配旧的Ajax方法
    async function Ajax(type, url, data, success, failed){
        await AjaxAdapter(type, url, data, success, failed)
    }




    // 生产实践：axios中的适配器
    // 可轻松地发起各种姿势的网络请求，而不用去关心底层的实现细节。
    // 除了简明优雅的api之外，axios 强大的地方还在于，它不仅仅是一个局限于浏览器端的库。
    // 在Node环境下，我们尝试调用上面的 api，会发现它照样好使 —— axios 完美地抹平了两种环境下api的调用差异，靠的正是对适配器模式的灵活运用
    