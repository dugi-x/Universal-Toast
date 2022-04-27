const lodash_merge = require('lodash.merge');
const ToastElement = require("./ToastElement.js");
const { positions, animations, templates, regex, namespace } = require("./config.js");
const features = {
    autoClose: require("./features/autoClose.js"),
    animation: require("./features/animation.js"),
};
HASH_UNDEFINED = '___hash_undefined__';

const defaults = {
    namespace: namespace,
    positions: {
        ...positions,
    },
    position: '',
    animations: {
        ...animations,
    },
    animation: '',

    templates: {
        ...templates,
    },
    regex: regex,
    autoShow: true
}



const Toast = function Toast (options){
    
    return new Toast.init( options );
};

Toast.merge = lodash_merge;
Toast.defaults = defaults;

Toast.init = function (options){
    
    options = Toast.merge({}, Toast.defaults, options);
    
    this._templates = Toast.createTemplates(options.templates);

    for(let templateName of Object.keys(this._templates)){
        
        this[templateName] = function(data, extend){
            return this.show(templateName, data, Toast.merge({}, options, extend));
        };
    }
    
    return this;
}

Toast.init.prototype = Toast.prototype = {
    constructor: Toast,
    init: Toast.init
}


Toast.createTemplates = function(items){
    
    var templates = {};
    for(var templateName of Object.keys(items)){
        var selectorOrElement = items[templateName];
        
        if (typeof selectorOrElement === 'string'){
            // Is selector
            if (/^[\w#.]/.test(selectorOrElement)){
                selectorOrElement = document.querySelector(selectorOrElement);
            }
            // Is string element
            else if (/^\s+<|^</.test(selectorOrElement)){
                var TEMPLATE = document.createElement('TEMPLATE');
                TEMPLATE.innerHTML = selectorOrElement.trim();
                selectorOrElement = TEMPLATE;
            }
            // Exclude
            else{
                selectorOrElement = false;
            }
        }
        
        // Is node element
        if(selectorOrElement && typeof selectorOrElement  === 'object' && selectorOrElement.nodeType !== undefined){
            
            let template = '';
            
            if (selectorOrElement.nodeName == 'TEMPLATE'){
                template = selectorOrElement.innerHTML;
            } else {
                template = selectorOrElement.outerHTML;
            }
    
            if (template){
                templates[templateName] = template.replace(/\s\s+/g, ' ').trim(); 
            }
        }
    }

    return templates;
}


Toast.prototype.show = function(variant, data, options){
    options = Toast.merge({}, Toast.defaults, options);
    
    var toastElement = new ToastElement(this._templates[variant], data, options);
    
    features.autoClose(toastElement, options);
    
    
    if (options.animations){
        var styleAnimation = ToastElement.getStyleByName(options.animation, options.animations);
        features.animation(toastElement,styleAnimation.style);
    }

    if (options.autoShow){
        toastElement.show();
    }

    return toastElement;
}




module.exports = Toast;
