define(function () {

    Object.deepExtend = function (destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    };

    var defaultOpt = {
        number: 0,
        height: 40,
        fontSize: 24,
        color: '#000'
    }

    var Num = function (dom, option) {
        if (!dom) return false;
        this.option = Object.deepExtend(defaultOpt, option);
        console.log(this.option)
        this.initDom(dom);
        this.NumberBlank = [];
        this.setNumber(this.option.number);
    }

    Num.prototype.initDom = function (dom, option) {
        this.dom = document.getElementById(dom);
        this.dom.style.overflow = 'hidden';
        this.dom.style.height = parseInt(this.option.height) + 'px';
    }

    /**
     *  init the dome of the numbers
     * @param  {Number|String} number the number we want show
     */
    Num.prototype.initNumberBlank = function (number) {
        var self = this;
        var numArr = number.toString().split('');
        // only add or remove node when the number length is change
        if (self.NumberBlank.length == numArr.length) {
            return false;
        }
        // format the NumberBlank;
        var needBlankLength = numArr.length - self.NumberBlank.length;
        for (var i = 0; i < Math.abs(needBlankLength); i++) {
            var blank = document.createElement('span');
            blank.style.fontFamily = 'arial, sans-serif';
            blank.style.display = 'inline-block';
            blank.style.transition = 'top 0.2s ease-in';
            blank.style.top = '0px';
            blank.style.fontSize = parseInt(this.option.fontSize) + 'px';
            blank.style.color = this.option.color;
            blank.style.lineHeight = parseInt(this.option.height) + 'px';
            blank.style.height = parseInt(this.option.height) + 'px';
            blank.style.width = '25px';
            blank.style.textAlign = 'center';
            blank.textContent = 0;
            if (needBlankLength < 0) {
                // the show dom is more than we need, just remove it
                var blankDom = self.NumberBlank.shift();
                this.dom.removeChild(blankDom);
            } else {
                // the show dom is less than we need, add the dom
                self.NumberBlank.unshift(blank);
            }
        }
        // fit the domlength
        for (var i in self.NumberBlank) {
            this.dom.appendChild(self.NumberBlank[i]);
        }
    };

    Num.prototype.setNumber = function (number) {
        // fit the dom
        this.initNumberBlank(number);
        //
        this.animate(number)
    }

    Num.prototype.animate = function (newNum) {
        var self = this;
        var newNumArr = newNum.toString().split('');
        var newDoms = [];
        // set box width
        self.dom.style.width = self.dom.offsetWidth + 'px';
        // set numbers to absolute
        for (var i in self.NumberBlank) {
            var dom = self.NumberBlank[i];
            var left = dom.offsetLeft;

            dom.style.left = left + 'px';
            dom.style.top = '0px';
            // dom.style.position = 'absolute';

            // add new number Dom
            // console.log(dom.textContent, '->', newNumArr[i])
            if (newNumArr[i] !== dom.textContent) {
                var newDom = dom.cloneNode();
                var height = -self.option.height;
                var top = self.option.height
                if (newNumArr[i] < dom.textContent) {
                    height = -height;
                    top = -top
                }
                newDom.style.top = top + 'px';
                dom.dataset.dest = height;
                newDom.dataset.dest = 0;
                dom.dataset.newVal = newNumArr[i];
                newDom.style.position = 'absolute';
                newDom.textContent = newNumArr[i];
                self.dom.appendChild(newDom);
                newDoms.push(newDom);
            }
        }

        for (var i in self.NumberBlank) {
            var dom = self.NumberBlank[i];
            dom.style.position = 'absolute';
        };



        // move new and old dom
        // return false;
        var spans = self.dom.children;
        // console.log(spans);
        for (var i in spans) {
            if (!spans.hasOwnProperty(i)) continue;
            spans[i].style.top = spans[i].dataset.dest + 'px';
        }
        // return false;
        setTimeout(function () {
            // remove new Dom
            for (var i in newDoms) {
                self.dom.removeChild(newDoms[i]);
            }
            // release the numbers absolute
            for (var i in self.NumberBlank) {
                var dom = self.NumberBlank[i];
                var left = dom.offsetLeft;
                dom.style.position = '';
                dom.style.left = '';
                dom.style.top = '';
                delete dom.dataset.dest;
                // change old dom's val
                if (dom.dataset.newVal) {
                    dom.textContent = dom.dataset.newVal;
                    delete dom.dataset.newVal;
                }
            }

            // release the box width
            self.dom.style.width = '';
        }, 400);
    }
    return Num;
});
