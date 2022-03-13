// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb
        // 旧数据存起来
        // 每个数据都对应了一个观察者，
        this.oldValue = this.getOldValue()
    }

    getOldValue() {
        Dep.target = this;
        let oldValue = compileUtil.getVal(this.expr, this.vm);
        // 这一步很重要
        Dep.target = null;
        return oldValue;
    }
    // 这里有一个updater方法，当数据有变化的时需要更新视图,数据有变化就要知道旧数据和新数据
    updater() {
        let newVal = compileUtil.getVal(this.expr, this.vm);
        if (newVal !== this.oldValue) {
            this.cb(newVal)
        }

    }
}

// 收集依赖器
class Dep {
    constructor() {
        //  定义一个容器池来存储所有的收集到的watcher
        this.subs = [];
    }
    //  将观察者放在存储池中
    addSub(watcher) {
        this.subs.push(watcher)
    }
    //  通知观察者去更新
    notify() {
        console.log("通知了观察者", this.subs)
        this.subs.forEach(w => w.updater())
    }

}


// 数据劫持
class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        if (data && data instanceof Object) {
            // console.log(Object.keys(data));
            Object.keys(data).forEach((key) => {
                this.defineReactive(data, key, data[key])
            });
        }
    }
    defineReactive(obj, key, value) {
        // person:{
        //     name:"",
        //     extra:{
        //         age:""
        //     }
        // }
        // 这里需要递归遍历，observe 方法里面有对对象的判断
        this.observer(value)
        let dep = new Dep();
        // 劫持并监听所有属性
        Object.defineProperty(obj, key, {
            // enumberable 可枚举的，该属性才会出现在对象的可枚举属性中
            enumerable: true,
            // configurable 可配置的
            configurable: false,
            get() {
                // 初始化
                // 订阅数据变化的时候，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                // 这里需要改变this的指向，这里的指向使obj
                console.log(this, '-------');
                // 这里再次调用observer 是为了给新增加的值也绑定get 和 set
                this.observer(newVal)
                if (newVal !== value) {
                    value = newVal;
                }
                // 通知变化
                dep.notify()
            }
        })

    }
}