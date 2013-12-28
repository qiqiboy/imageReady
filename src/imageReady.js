/**
 * imageReady v1.1
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/12/19
 */
var imageReady=(function(){
	var list=[],
		timer=null,
		prop=[['width','height'],['naturalWidth','naturalHeight']],
		natural=Number(typeof (new Image()).naturalWidth=='number'),//是否支持HTML5新增的 naturalHeight
		tick=function(){
			var i=0;
			while(i<list.length){
				list[i].end?list.splice(i--,1):check.call(list[i]);
				i++;
			}
			list.length && (timer=setTimeout(tick,50)) || (timer=null);
		},
		/** overflow: 检测图片尺寸的改变
		  *  img.__width,img.__height: 初载入时的尺寸
		  */
		check=function(){
			if(this.complete || this[prop[natural][0]]!==this.__width || this[prop[natural][1]]!==this.__height || this.readyState=='loading'){
				this.end=true;
				this.onready(this);
			}
		};
		
	return function(_img, onready, onload, onerror){
		onready=onready || new Function();
		onload=onload || new Function();
		onerror=onerror || new Function();
		var img=typeof _img=='string'?new Image():_img;
		img.onerror=function(){// ie && ie<=8 的浏览器必须在src赋予前定义onerror
			img.end=true;
			img.onload=img.onerror=img.onreadystatechange=null;
			onerror.call(img,img);
			img=null;
		}
		if(typeof _img=='string') img.src=_img;
		if(!img)return; //为了防止onerror触发后img=null
		if(img.complete){
			img.onerror=null;
			onready.call(img,img);
			onload.call(img,img);
			img=null;
			return;
		}
		img.__width=img[prop[natural][0]];
		img.__height=img[prop[natural][1]];
		img.onready=onready;
		check.call(img);
		img.onload=img.onreadystatechange=function(){
			if(img&&img.readyState&&img.readyState!='loaded'&&img.readyState!='complete'){return;}
			img.onload=img.onerror=img.onreadystatechange=null;
			!img.end && check.call(img);
			onload.call(img,img);
			img=null;
		}
		if(!img.end){
			list.push(img);
			!timer && (timer=setTimeout(tick,50));
		}
	}
})();