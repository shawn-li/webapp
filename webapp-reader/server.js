var http = require('http');
var fs=require('fs'); //导入文件系统模块
var mime=require('./mime').types;
var url=require('url');//用户URL 格式化和反格式化模块
var path=require('path'); //用于处理文件路径的小工具
var documentRoot='F:/Git/Project-lx1.git/workspace';


http.createServer(function(req,res){

	// var url =req.url;
	// //客户端输入的url，例如如果输入localhost:8888/index.html
 //    //那么这里的url == /index.html 
 //    var file =documentRoot +url;
 //    //console.log(url);

 	var pathname= url.parse(req.url).pathname;
 	//var realFile= path.join(documentRoot,pathname)//将多个参数组合成一个 path
 	var realFile= documentRoot+ pathname;
 	console.log(realFile);
 	var ext=path.extname(realFile);
 	//返回path路径文件扩展名，如果path以 ‘.' 为结尾，将返回 ‘.'，如果无扩展名 又 不以'.'结尾，将返回空值
 	ext = ext ? ext.slice(1) : 'unknow'; 
 	console.log(ext);
 	//测试某个路径下的文件是否存在
 	fs.exists(realFile,function(exists){
 		if (!exists) {
			res.writeHead(404,{'Content-type':'text/html;charset="utf-8"'});
			//参数一为 HTTP状态码
			res.write("<h3>404错误</h3> <p>页面不存在！</p>"+url);
			res.end();
 		}else{
 			fs.readFile(realFile, function(err,data){
		    /*
		        一参为文件路径
		        二参为回调函数
		            回调函数的一参为读取错误返回的信息，返回空就没有错误
		            二参为读取成功返回的文本内容
		    */
			    if (err) {
			    	res.writeHead(404,{'Content-type':'text/html;charset="utf-8"'});
			    	//参数一为 HTTP状态码
			    	res.write("<h3>404错误</h3> <p>页面不存在！</p>"+url);
			    	res.end();
			    }else{
			    	var contentType=mime[ext] || "text/plain";
			    	res.writeHead(200,{'Content-type':contentType});
			    	res.write(data);//将index.html显示在客户端
			    	res.end();
			    }
    		});

 		}
 	});
    

    
    
}).listen(1337,'127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');