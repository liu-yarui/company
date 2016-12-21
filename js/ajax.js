//下边的代码返回一个XMLHttpRequest实例。
var oXMLHttpRequest;
if(window.XMLHttpRequest){
	//mozilla,opera,safari,IE7等适用
	oXMLHttpRequest = new XMLHttpRequest();
	if(oXMLHttpRequest.overrideMimeType){
		oXMLHttpRequest.overrideMimeType("text/plain;charset=utf-8");
	}
}else if(window.ActiveXObject){
	//IE7以前的浏览器适用，并且有两种版本
	var porgIDs = ["Msxml2.XMLHTTP5.0","Msxml2.XMLHTTP4.0","Msxml2.XMLHTTP3.0","Msxml2.XMLHTTP2.0","Microsoft.XMLHTTP"];
	for(var i=0;i<porgIDs.length;i++){
		try{
			oXMLHttpRequest = new ActiveXObject(porgIDs[i]);
		}catch(err){
			try{
				oXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(err){};
		}
	}
}

if(!oXMLHttpRequest){
	alert("XMLHttpRequest is not supported!");
}

//设置一个函数响应状态变化，这是一个回调函数
oXMLHttpRequest.onreadystatechange = theReadyStateChange;

//打开连接，发送数据，并在这个过程中捕捉错误
//(new Date()).getTime()防止请求被浏览器缓存
try{
	oXMLHttpRequest.open("GET","http://localhost/test/em.txt",true);
	oXMLHttpRequest.send();
}catch(err){
	alert(err.message);
}


//响应状态变化
function theReadyStateChange(){
	//根据HTTP请求的状态码确定当前请求处于何种状态
	if(oXMLHttpRequest.readyState==0){
		//对象尚未初始化，这是最初的状态，这时open方法尚未被调用
		//可以编写一段业务逻辑处理事件
	}else if(oXMLHttpRequest.readyState==1){
		//对象已经创建，这时还未调用send方法
		//可以给用户一段提示信息，例如正在加载，请稍等。
	}else if(oXMLHttpRequest.readyState==2){
		//已经调用send方法，但响应主体还未到达
	}else if(oXMLHttpRequest.readyState==3){
		//与服务器交互过程中，部分数据已经到达，但还不可以访问
	}else if(oXMLHttpRequest.readyState==4){
		//全部数据已经到达，数据和报头都可以访问了
		getResult();
	}

	//alert(oXMLHttpRequest.readyState);
}


//处理返回的结果
function getResult(){
	if(oXMLHttpRequest.status==200){
		try{
			var pDiv = document.getElementById("contentL");
			var div = document.createElement("div");
			div.className = "newData";

			div.innerHTML = oXMLHttpRequest.responseText;
			pDiv.appendChild(div);
			document.write("数据==<xmp>"+oXMLHttpRequest.responseText+"</xmp>");
		}catch(err){
			alert(err.message);
		}
	}else if(oXMLHttpRequest.status==404){
		document.write("没有发现请求的文档！");
	}else if(oXMLHttpRequest.status==500){
		document.write("服务器内部错误！");
	}
}


//数据被加载后，用下边的方法解析数据为一个W3C DOM
//该函数用来跨浏览器解析XML数据
function parse(xml){
	var doc;
	try{
		//较旧的IE的支持的方法
		doc = new ActiveXObject("Microsoft.XMLDOM");
		doc.async = false;
		doc.loadXML(xml);
	}catch(err){
		try{
			//其他的浏览器支持方法
			var parser = new DOMParser();
			doc = parser.parseFromString(xml,"text/xml");
			delete parser;
		}catch(err2){
			if(debug){
				alert("XML parsing is not supported.");
			}
		}
	}
	return doc;
}