function interval(fn,wait){
	var interv = function(){
		fn.call(null);
		setTimeout(arguments.callee,wait);
	};

	setTimeout(interv,wait);
}

