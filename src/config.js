const animations = {
    slideDown: { 
        before:{
            transform:  'translateY(-100vh) scale(0.9)',
            opacity: '0'
        },
        in:{
            transition: '600ms',
            transform:  'translateY(0) scale(1)',
            opacity: '1'
        },
        out:{
            transition: '600ms',
            transform:  'translateY(-100vh) scale(0.9)',
            opacity: '0'
        }
    },
    slideUp: { 
        before:{
            transform:  'translateY(100vh) scale(0.9)',
            opacity: '0'
        },
        in:{
            transition: '600ms',
            transform:  'translateY(0) scale(1)',
            opacity: '1'
        },
        out:{
            transition: '600ms',
            transform:  'translateY(100vh) scale(0.9)',
            opacity: '0'
        }
    },
    slideLeft: { 
        before:{
            transform:  'translateX(-100vw) scale(0.9)',
            opacity: '0'
        },
        in:{
            transition: '600ms',
            transform:  'translateX(0) scale(1)',
            opacity: '1'
        },
        out:{
            transition: '600ms',
            transform:  'translateX(-100vw) scale(0.9)',
            opacity: '0'
        }
    },
    slideRight: { 
        before:{
            transform:  'translateX(100vw) scale(0.9)',
            opacity: '0'
        },
        in:{
            transition: '600ms',
            transform:  'translateX(0) scale(1)',
            opacity: '1'
        },
        out:{
            transition: '600ms',
            transform:  'translateX(100vw) scale(0.9)',
            opacity: '0'
        }
    },
    fadeInOut: { 
        before:{
            opacity: '0'
        },
        in:{
            transition: '600ms',
            opacity: '1'
        },
        out:{
            transition: '600ms',
            opacity: '0'
        }
    }
  
  };
  
  const positions = {
    top: { 
        position: 'fixed',
        inset: '0px 0px auto 0px',
        margin: '0px auto',
     },
    topLeft: { 
        position: 'fixed',
        inset: '0px auto auto 0px',
        margin: '0px',
        transform: 'translate(0.25rem, 0.25rem)'
     },
    topRight: { 
        position: 'fixed',
        inset: '0px 0px auto auto',
        margin: '0px',
        transform: 'translate(-0.25rem, 0.25rem)'
     },
    bottom: { 
        position: 'fixed',
        inset: 'auto 0px 0px 0px',
        margin: '0px auto',
     },
    bottomLeft: { 
        position: 'fixed',
        inset: 'auto auto  0px 0px',
        margin: '0px',
        transform: 'translate(0.25rem, -0.25rem)'
     },
    bottomRight: { 
        position: 'fixed',
        inset: 'auto 0px 0px auto',
        margin: '0px',
        transform: 'translate(-0.25rem, -0.25rem)'
     },
    auto:{

    }
  };
  
  
  module.exports = {
      namespace: 'toast___',
      positions: {...positions},
      animations: {...animations},
      templates: {info: '#toast-info', success: '#toast-success', warning: '#toast-warning', error: '#toast-error', alert: '#toast-alert'},
      regex: /{{[\s]?[\s+]?([\S]+)[\s]?[\s+]?}}/g,
  }