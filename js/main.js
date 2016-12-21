function interval(fn,wait){
    var interv = function(){
        fn.call(null);
        setTimeout(arguments.callee,wait);
    };

    setTimeout(interv,wait);
}




function nextSibling(elem){
    var _elem;
    while(elem = elem.nextSibling){
        if(elem.nodeType === 1){
            _elem = elem;
            break;
        }
    }
    return _elem;
}

function previousSibling(elem){
    var _elem;
    while(elem = elem.previousSibling){
        if(elem.nodeType ===1){
            _elem = elem;
            break;
        }
    }
    return _elem;
}








































