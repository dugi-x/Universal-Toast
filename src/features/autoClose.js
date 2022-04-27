module.exports = function (toaster, options) {
    options = {
        autoClose: 5000,
        pauseOnHover: true,
        hideByClick: true,
        delayClose: 700,
        startTriggerName: 'toast-show',
        tickEventName: 'toast-progress-tick',
        progressSelector: '[data-progress-width]',
        ...options
    }

    var toast = toaster.getToast();
    var interval = 10;
    var ticksMax = options.autoClose/interval;
    var ticks = 0;
    var percent = 0;
    var timerId = 0;

    var stopTimer = function(){
        if (timerId > 0){
            clearInterval(timerId);
            timerId = 0;
        }
    }
    var startTimer = function(){
        if (timerId > 0){
            return;
        }
        
        timerId = setInterval(() => {
            percent = ticks/ticksMax *100;
            toast.dispatchEvent(new CustomEvent(options.tickEventName, {detail: { timerId: timerId, percent: percent  }}));
            
            if (ticks < ticksMax){
                ticks++;
            }else{
                stopTimer();
                setTimeout(() => {
                    ticks = 0;
                    toaster.hide()
                }, options.delayClose);
            }
                        
        }, interval);

        return timerId;
    }

    

    if (options.autoClose){
        toast.addEventListener(options.startTriggerName, function(event) {
            startTimer();
        }, false);

        if (options.pauseOnHover){
            toast.addEventListener('mouseenter',function(){
                stopTimer();
            }, false);
            
            toast.addEventListener('mouseleave',function(){
                startTimer();
            }, false);
        }
    }
    
    

    if (options.hideByClick){
        toast.addEventListener('click',function(e){
            ticks = ticksMax;
            percent = 99;
            toast.dispatchEvent(new CustomEvent(options.tickEventName, {detail: { timerId: timerId, percent: percent  }}));
            
            toast.addEventListener('mouseleave',function(){
                startTimer();
            }, false);
            
        }, false);
    }
    

    var progress = toast.querySelector(options.progressSelector);
    if(progress){
        progress.style.width = percent +'%';
        toast.addEventListener(options.tickEventName, function () {
            if (percent == 99){
                progress.style.transition = 'all 500ms ease 0s';
                progress.style.width = '100%';
            }else{
                progress.style.width = percent +'%';
            }
            
        }, false);
    }
    
}