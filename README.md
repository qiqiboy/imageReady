imageReady
==========

> javascript图片预加载，监测图片加载完成，获取图片真实尺寸的组件（图片延迟加载）

## 如何使用
```javascript
// 首先在页面中引入imageReady.js

/**
 * @param img string|Image 图片url或者Image对象
 * @param onready Function 图片尺寸已获取（此时图片还未完全下载下来）
 * @param onload Function 图片加载完成
 * @param onerror Function 图片加载失败
 *
 * onready、onload、onerror的参数只有一个，都是Image对象
 * imageReady('http://www.planeart.cn/demo/imgReady/vistas24.jpg',function(img){
		console.log('图片已经ready了，可以获取宽高了')
	},function(img){
		console.log('图片已经下载完成了')
	},function(img){
		console.log('图片下载出错了')
	})
 */

imageReady=function(img, onready, onload, onerror){}

````