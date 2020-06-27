'use strict';

function DomElement (selector, options) {
    this.selector = selector; 
    options = options || {};
    this.height = options.height; 
    this.width = options.width; 
    this.bg = options.bg;
    this.fontSize = options.fontSize;
}

DomElement.prototype.createElem = function () {
    let attr = this.selector.trim();
    if (attr[0] === '.'){
        const div = document.createElement('div');
        div.setAttribute("class", attr.slice(1));
        div.style.cssText = 'width: ' + this.width + 
            'px; height:' + this.height + 
            'px; background-color: ' + this.bg + 
            '; font-size:' + this.fontSize +'px;';
        document.body.append(div);
        div.innerText = 'Какой-то текст';
    } else if (attr[0] === '#') {
        const p = document.createElement('p');
        p.setAttribute("id", attr.slice(1));
        p.style.cssText = 'width: ' + this.width + 
            'px; height:' + this.height + 
            'px; background-color: ' + this.bg + 
            '; font-size:' + this.fontSize +'px;';
        document.body.append(p);
        p.innerText = 'Ещё Какой-то текст';
    } else {
        console.log('Не верный формат селектора');
    }
    
};

let elem = new DomElement('    .block', {height: 200, width: 200, bg: 'red', fontSize: 20});
let elem2 = new DomElement('   #block2    ', {height: 300, width: 300, bg: 'blue', fontSize: 30});

elem.createElem();
elem2.createElem();