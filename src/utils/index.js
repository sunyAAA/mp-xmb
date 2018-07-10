import { loginByCode } from '../api'
import config from '../config'
const appId = config.appId;
const ossroot = config.ossroot
export function formatTime(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	// const hour = date.getHours()
	// const minute = date.getMinutes()
	// const second = date.getSeconds()

	const t1 = `${year}年${month}月${day}日`
	// const t2 = [hour, minute, second].map(formatNumber).join(':')

	return `${t1}`
}

export function showSucc(text, cb) {
	wx.showToast({
		title: text, //提示的内容,
		icon: 'success', //图标,
		duration: 800, //延迟时间,
		mask: true, //显示透明蒙层，防止触摸穿透,
		success: res => {
			setTimeout(() => {
				cb && cb(res)
			}, 800);
		}
	});
}

//  如果有过授权则自动获取用户信息  cb返回 userinfo 对象
export function _login(cb) {
	_loading('加载中...')
	wx.hideTabBar()
	wx.login({
		success: res => {
			//  临时登录凭证
			var code = res.code
			if (_getU()) {
				var u = _getU();
				u.code = code;
				u.appId = appId;
				loginByCode(u).then(res => {
					if (res.data.code == 1) {
						wx.setStorageSync('_token', res.data.data.token)
						wx.setStorageSync('userId', res.data.data.userId)
						_loading()
						return cb && cb(u, null);
					}
				}).catch(err => {
					msg('用户信息获取失败,请稍后再试...')
					return cb && cb(null)
				})
			} else {
				wx.getUserInfo({
					success: res => {
						// 	同步存入userInfo  
						wx.setStorageSync('userInfo', res.userInfo)
						res.userInfo.code = code;
						res.userInfo.appId = appId;
						loginByCode(res.userInfo).then(res => {
							if (res.data.code == 1) {
								wx.setStorageSync('_token', res.data.data.token)
								wx.setStorageSync('userId', res.data.data.userId)
								_loading()
								wx.showTabBar()
								return cb && cb(res.userInfo, null);
							}else{
								_loading()
							}
						}).catch(err => {
							console.log(err)
							msg('用户信息获取失败,请稍后再试...')
							return cb && cb(null)
						})
					},
					fail: () => {
						_loading()
						msg('初次见面~！,请登录开始达成目标之旅吧', function () {
							cb && cb(null)
						})
					}
				});
			}

		},
		fail: () => {
			_loading()
			msg('网络错误，请稍后再试', function () {
				cb && cb(null)
			})
		}
	});

}
// 用户初次登录 手动授权 
export function loginByUser(userInfo, cb) {
	wx.login({
		success: res => {
			//  临时登录凭证
			var code = res.code;
			userInfo.code = code;
			userInfo.appId = appId;
			loginByCode(userInfo).then(res => {
				if (res.data.code == 1) {
					wx.setStorageSync('_token', res.data.data.token)
					wx.setStorageSync('userId', res.data.data.userId)
					_loading()
					wx.showTabBar()
					return cb && cb(userInfo, null);
				}else{
					_loading()
				}
			}).catch((err) => {
				console.log(err)
				msg('用户信息获取失败,请稍后再试...')
				return cb && cb(null)
			})
		},
		fail: () => {
			_loading()
			msg('网络错误，请稍后再试', function () {
				cb && cb(null)
			})
		}
	});
}
// 后端登录

export function _loading(text) {
	if (text) {
		wx.showLoading({ title: text })
	} else {
		wx.hideLoading();
	}
}

export function _getU() {
	return wx.getStorageSync('userInfo');
}


export function upImgs(num,result) {  // num:上传的数量   result:接受返回文件名的数组
	// return new Promise()
	wx.chooseImage({
		count: num, //最多可以选择的图片张数,    
		sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
		success: res => {//返回图片的本地文件路径列表 tempFilePaths,
			// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
			var tempFilePaths = res.tempFilePaths;
			wx.request({
				url: config.host + '/api/imgupload/getImgPolicy',  // 签名
				success: oss => {
					_loading('正在上传')
					for(var i =0 ; i <num;i++){
						var item = tempFilePaths[i]
						wx.uploadFile({
							url: config.host + '/api/imgupload/imgUpload',   //上传
							filePath: item, 
							name: 'upfile', 
							formData:{
								name:item,
								policy:res.policy,
								signature:res.signature,
								OSSAccessKeyId:res.accessid
							},
							success: res => {
								result.push('/'+ JSON.parse(res.data).data);
								if(i == num){_loading()}
							}
						});
					}

				},
			  });
		},
	});
}

export function msg(text, cb) {
	wx.showToast({
		title: text,
		icon: 'none',
		duration: 800,
		success: res => {
			setTimeout(() => {
				cb && cb(null)
			}, 800);
		}
	})
}

export function getLeftDays(begin){
	var now = new Date().getTime();
	var result =  Math.floor((now-begin)/3600/24/1000);
	return result>0?result:0
}
export function getRightDays(end){
	var now = new Date().getTime();
	var result =  Math.floor((end-now)/3600/24/1000);
	return result>0?result:0
}

export function fromartTargetDate(begin,end){
	return dateForm(begin,'Y-m-d') + " 至 " +dateForm(end,'Y-m-d')
}

export function dateForm (timestamp, formats) {
	// formats格式包括
	// 1. Y-m-d
	// 2. Y-m-d H:i:s
	// 3. Y年m月d日
	// 4. Y年m月d日 H时i分
	formats = formats || 'Y-m-d';

	var zero = function (value) {
		if (value < 10) {
			return '0' + value;
		}
		return value;
	};

	var myDate = timestamp ? new Date(timestamp) : new Date();

	var year = myDate.getFullYear();
	var month = zero(myDate.getMonth() + 1);
	var day = zero(myDate.getDate());

	var hour = zero(myDate.getHours());
	var minite = zero(myDate.getMinutes());
	var second = zero(myDate.getSeconds());

	return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
		return ({
			Y: year,
			m: month,
			d: day,
			H: hour,
			i: minite,
			s: second
		})[matches];
	});
}

export function showModel(title){
	return new Promise((resolve,reject)=>{
		wx.showModal({
			title: title,
			success: function(res) {
			  if (res.confirm) {
				resolve(true)
			  } else if (res.cancel) {
				resolve(null)
			  }
			}
		  })
	})
}

export function strToArray(str){
	return !str?[]:str.indexOf(',')>0? str.split(','):[str]
}