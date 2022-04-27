module.exports = function (toaster, options) {
    options = {
        before: { ...options.before },
        in: { ...options.in },
        out: { ...options.out },
    };

    var toast = toaster.getToast();
    
    toaster.styleElement(toast, options.before); 
    
    toast.addEventListener('toast-show-in', function(event) {
        // delay show trigger
        toaster.delay = 600;
        toaster.styleElement(event.target, options.in);
    });

    toast.addEventListener('toast-show-out', function(event) {
        // delay remove
        toaster.delay = 600;
        toaster.styleElement(event.target, options.out);
    });
    

    
}