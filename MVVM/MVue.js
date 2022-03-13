let compileUtil = {
    getVal(expr, vm) {
        // [person,name]
        return expr.split(".").reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    setVal(expr, vm, inputVal) {
        return expr.split(".").reduce((data, currentVal) => {
            data[currentVal] = inputVal
        }, vm.$data)
    },
    getContent(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            console.log(args);
            return this.getVal(args[1], vm);
        })
    },
    text(node, expr, vm) { //expr:msg
        let value;
        if (expr.indexOf("{{") !== -1) {
            console.log(expr);
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                console.log(args);
                new Watcher(vm, args[1], (newVal) => {
                    this.updater.textUpdater(node, this.getContent(expr, vm))
                })
                return this.getVal(args[1], vm);
            })
        } else {
            value = this.getVal(expr, vm); //<div v-test="person.fav"></div>
        }
        this.updater.textUpdater(node, value)
    },
    html(node, expr, vm) {
        let value = this.getVal(expr, vm);
        // 订阅数据变化，绑定观察者
        // 绑定观察者，当数据变化的时候，触发这里的回调函数，触发更新
        // 绑定更新函数 数据=>视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal)
        })
       
        // 视图=>数据=>更新视图
        this.updater.htmlUpdater(node, value)
    },
    model(node, expr, vm) {
        let value = this.getVal(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal)
        })
        node.addEventListener("input", function (e) {
            // 设置值
            compileUtil.setVal(expr, vm, e.target.value)
        })
        this.updater.modelUpdater(node, value)
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    bind(node, expr, vm, attrName) {
        let value = this.getVal(expr, vm);
        this.updater.bindUpdater(node, attrName, value)
    },
    // 图示中的updater
    updater: {
        bindUpdater(node, attrName, value) {
            node.setAttribute(attrName, value)
        },
        // v-model  指令
        modelUpdater(node, value) {
            node.value = value;
        },
        // v-html 指令
        htmlUpdater(node, value) {
            // innerHTML 这里需要注意innerHTML为大写
            node.innerHTML = value;
        },
        // {{}}
        textUpdater(node, value) {
            // textContent 设置节点的值为value
            node.textContent = value;
        }
    }

}
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        console.log(this.el);
        this.vm = vm;
        // 1. 获取文档对象碎片，放入内存中，这样来减少页面的回流和重绘
        let fragment = this.node2Fragment(this.el)
        console.log(fragment, '这个是文档对象碎片');

        // 2. 编译文档对象碎片
        this.compile(fragment);

        // 3 .追加子元素到根节点
        this.el.appendChild(fragment)
    }
    compile(fragment) {
        // childNodes 使一个类数组
        let childNodes = fragment.childNodes;
        // console.log(childNodes);
        [...childNodes].forEach(child => {
            // console.log(child);
            if (this.isElementNode(child)) {
                // 是元素节点=>编译元素节点
                this.compileElement(child)
            } else {
                // 是文本节点=>编译文本节点
                // console.log(child,"文本节点");
                this.compileText(child)
            }
            if (child.childNodes && child.childNodes.length > 0) {
                // 递归
                this.compile(child)
            }
        })
    }
    compileElement(node) {
        // 获取元素的属性
        let attributes = node.attributes;
        // console.log(attributes,'获取元素的属性');
        [...attributes].forEach(attr => {
            console.log(attr);
            // 解构获取name和 value
            const {
                name,
                value
            } = attr;
            // console.log(name,value);
            if (this.isDirective(name)) { //使一个指令 v-html,v-text,v-model,v-on:click  v-bind:href
                const [, dirctive] = name.split('-'); //model text html on:click bind:href
                const [dirName, eventName] = dirctive.split(":"); //model text html click href
                //  更新视图，数据驱动视图
                // console.log(dirName,'----------');
                compileUtil[dirName](node, value, this.vm, eventName)
                //  移除元素的自定义属性 
                node.removeAttribute(name)
            } else if (this.isEventName(name)) { //@click="handleClick"
                let [, eventName] = name.split('@');
                compileUtil["on"](node, value, this.vm, eventName)
            }
        })
    }
    isDirective(attrName) {
        // 检测属性名是否是以v-开头,注意这里是startsWith
        return attrName.startsWith('v-')
    }
    isEventName(attrName) {
        return attrName.startsWith('@')
    }
    compileText(node) {
        let content = node.textContent;
        //  console.log(node.textContent);
        if (/\{\{(.+?)\}\}/.test(content)) {
            console.log(content);
            compileUtil['text'](node, content, this.vm)
        }
    }
    isElementNode(node) {
        // 如果说nodeType===1 表示是元素节点
        return node.nodeType === 1;
    }
    // 这一步挺精辟的
    node2Fragment(el) {
        let f = document.createDocumentFragment();
        let firstChild;
        // appendChild（）方法是向节点添加最后一个子节点，也可以使用此方法将一个节点移动另一个节点（移动后原来的节点将会消失）
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f;
    }
}

// 定义一个Vue类
class MVue {
    constructor(options) {
        // 指定元素容器
        this.$el = options.el;
        // 指定数据对象
        this.$data = options.data;
        // 存储真个形参
        this.$options = options;
        if (this.$el) {
            // 1. 实现一个数据观察者
            new Observer(this.$data)
            // 2. 实现一个指令解析器
            new Compile(this.$el, this);
            // 3. 代理this.$data
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        for (const key in data) {
            // 这里把this.$data 代理成this
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal;
                }
            })


        }
    }
}