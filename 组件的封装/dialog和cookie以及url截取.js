String.prototype.myQueryURLParameter = function myQueryURLParameter() {
    let obj = {},
        reg = /([^?=&]+)=([^?=&]+)/g;
    reg = /([^?=&]+)/
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};
/*--DIALOG--*/
~function () {
    class Dialog {
        constructor(content, callback, isTap) {
            this.content = content;
            this.callback = callback;
            this.isTap = typeof isTap === 'undefined' ? true : isTap;
            this.init();
        }

        init() {
            this.createMark();

            //->移除MARK
            this.isTap === true ? this.markEvent() : null;
            this.timer = setTimeout(() => {
                this.removeMark();
            }, 1000);
        }

        createMark() {
            //->创建新的之前先把之前的移除掉
            this.removeMark();

            //->创建新的
            let mark = document.createElement('div');
            this.mark = mark;
            mark.className = 'markDialog';
            mark.innerHTML = `<div class="box">
                <h3>系统提示</h3>
                <div class="content">${this.content}</div>
            </div>`;
            document.body.appendChild(mark);
        }

        removeMark() {
            clearTimeout(this.timer);
            let mark = this.mark;
            if (mark) {
                document.body.removeChild(mark);
                this.callback && this.callback();
            }
        }

        markEvent() {
            let mark = this.mark;
            if (!mark) return;

            $(mark).tap((e) => {
                if (e.target.className === 'markDialog') {
                    this.removeMark();
                }
            });
        }
    }

    window.Dialog = Dialog;
}();

/*--COOKIE--*/
let cookie = (function () {
    let setValue = (name, value, expires = (new Date(new Date().getTime() + (1000 * 60 * 60 * 24))), path = '/', domain = '') => {
        document.cookie = `${name}=${escape(value)};expires=${expires.toGMTString()};path=${path};domain=${domain}`;
    };

    let getValue = name => {
        let cookieInfo = document.cookie,
            reg = new RegExp(`(?:^| )${name}=([^;]*)(?:;|$)`),
            ary = cookieInfo.match(reg);
        return ary ? unescape(ary[1]) : null;
    };

    let removeValue = (name, path = '/', domain = '') => {
        let value = getValue(name);
        if (value) {
            document.cookie = `${name}= ;path=${path};domain=${domain};expires=Fri,02-Jan-1970 00:00:00 GMT`;
        }
    };

    return {
        set: setValue,
        get: getValue,
        remove: removeValue
    }
})();
