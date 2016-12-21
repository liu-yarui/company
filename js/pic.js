	var index = 0;
	var timer = 0;

	var imgs = ["img/001.jpg","img/002.jpg","img/003.jpg"];
	var pic = document.getElementById("picSlider");
	function test(){
		if(index == imgs.length-1){
			index = 0;
		}else{
			index++;
		};
		console.log(index);

		pic.src = imgs[index];
	}

	interval(function(){
		if(index == imgs.length-1){
			index = 0;
		}else{
			index++;
		};
		console.log(index);

		pic.src = imgs[index];
	},2000);