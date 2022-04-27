var _array = [];
function ToastElement(template, data, options){
    
    var stylePosition = ToastElement.getStyleByName(options.position, options.positions)
    var conatiner_id =  options.namespace + stylePosition.name;
    var conatiner_style = {
        position: 'fixed',
        display: 'flex',
        minHeight: '0px',
        width: '100%',
        flexDirection: 'column',
        maxWidth: '32rem',
        ...stylePosition.style
    };
    this.setContainer(conatiner_id, conatiner_style);

    this.setToast(template, { ...data }, options.regex);
    
}

ToastElement.prototype.length = 0;
ToastElement.prototype.splice = function(start, deleteCount, ...item){
    return _array.splice.call(this, start, deleteCount, ...item);
}


ToastElement.prototype.setContainer = function(id, style, reset){
    
    const container = document.getElementById(id) || document.createElement('div');
    
    if (!document.body.contains(container)){
        container.id = id;
        document.body.appendChild(container);
    }

    ToastElement.styleElement(container, style, reset)

    this.splice(0,1,container);
    return this;
}

ToastElement.prototype.getContainer = function(){
    
    return this[0];
}

ToastElement.prototype.setToast = function(template, data, regex){
    data = { ...data };
    
    var element = document.createElement('div');
    while ((match = regex.exec(template)) !== null) {
        // avoid infinite loops
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        template = match['input'].replace(match[0], data[match[1]] || match[1]);
    }
    element.innerHTML = template.trim();
    element = element.firstChild;
    
    this.splice(1,1,element);
    return this;
}

ToastElement.prototype.getToast = function(){
    return this[1];
}

ToastElement.prototype.show = function(){
    var toast = this.getToast();
    
    toast.style.display = 'none';
    this.getContainer().appendChild(toast);
    toast.dispatchEvent(new Event('toast-appended'));

    setTimeout(() => {
        toast.style.display = '';
        
        setTimeout(() => {
            toast.dispatchEvent(new Event('toast-show-in'));
            
            setTimeout(() => {
                toast.dispatchEvent(new Event('toast-show'));
            }, this.delay || 100);

        }, this.delay || 100);
        
    }, this.delay || 100);

    return this;
}

ToastElement.prototype.hide = function(){
    var toast = this.getToast();
    toast.dispatchEvent(new Event('toast-show-out'));

    setTimeout(() => {
        toast.dispatchEvent(new Event('toast-removed'));
        toast.style.display = 'none';
        toast.remove();

    }, this.delay || 100);

    return this;
}

ToastElement.getStyleByName = function(name, styles, def){
    def = def || 0;
    let list = Object.keys(styles);
    if (!name || list.indexOf(name) < 0){
        
        name = list[def] || def;
    }

    return {
        name: name,
        style: styles[name] || {}
    };
}

ToastElement.styleElement = ToastElement.prototype.styleElement = function(element, style, reset){

    if (reset || typeof style  !== 'object'){
        element.style = {};
        style = {...style}
    }
    
    for(let prop of Object.keys(style)){
        let key = prop.toString();
        let value = style[key];
        if (value && typeof value === 'string'){
            element.style[key] = value;
        }
    }
    
    return element;
}

module.exports = ToastElement;