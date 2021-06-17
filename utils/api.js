const config = require("./config");
import store from '../store'
import Vue from 'vue'
Vue.prototype.store = store.store;
const app = getApp()

const hostUrl = config.serverURL;

function get(url, data, header, loading) {
	// console.log(url)
	if (loading) {
		uni.showLoading({
			title: "加载中"
		});
	}
	let myData = {};
	if (data) {
		//过滤掉空的参数
		for (let [key, val] of Object.entries(data)) {
			if (val) {
				myData[key] = val;
			}
		}
	}

	let promise = new Promise((resolve, reject) => {
		let token = uni.getStorageSync('yui3-token')
		uni.request({
			data: myData,
			method: "get",
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"yui3-token": token
			},
			url: config.serverURL + url,
			success: function(res) {
				uni.hideLoading();
				if (res.data.code == 0) {
					resolve(res.data);
				} else if (res.data.code == 401) {
					uni.removeStorageSync('token')
					uni.showModal({
						title: '提示',
						content: '登录失效了，重新登录',
						success(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/login/index/main'
								})
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					})
				} else {
					console.log(url)
					console.log(url.indexOf('infoByMob'))
					if (url.indexOf('infoByMob') === -1) {
						uni.showToast({
							icon: "none",
							title: res.data.msg,
							duration: 2000
						});
					}

					// reject(res.data)
				}
			},
			fail: function(err) {
				uni.showToast({
					icon: "none",
					title: JSON.stringify(err),
					duration: 2000
				});
				reject(err);
			},
			complete: function() {}
		});
	});
	return promise;
}

function post(url, data, header) {
	// console.log(url)
	uni.showLoading({
		title: "加载中"
	});
	let promise = new Promise((resolve, reject) => {
		let token = uni.getStorageSync('yui3-token')
		uni.request({
			data: data,
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"yui3-token": token
			},
			method: "post",
			url: config.serverURL + url,
			success: function(res) {
				uni.hideLoading();
				if (res.data.code == 0) {
					resolve(res.data);
				} else if (res.data.code == 401) {
					uni.removeStorageSync('yui3-token')
					uni.showModal({
						title: '提示',
						content: '登录失效了，重新登录',
						success(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/login/index/main'
								})
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					})
				} else {

					uni.showToast({
						icon: "none",
						title: res.data.msg,
						duration: 2000
					});
					// reject(res.data.msg)
				}
			},
			fail: function(err) {
				uni.showToast({
					icon: "none",
					title: JSON.stringify(err),
					duration: 2000
				});
				// reject(err)
			},
			complete: function() {}
		});
	});
	return promise;
}

class api {
	//登录
	login(data) {
		return new Promise((resolve, reject) => {
			post("/blade-auth/login", data).then(res => {
				// uni.setStorageSync('userId', res.data.userInfo.subId)
				resolve(res);
			});
		});
	}
	//注册
	register(data) {
		return new Promise(resolve => {
			post("/general/ access/register", data).then(res => {
				resolve(res)
			})
		})
	}
	//登出
	logOut(data) {
		return new Promise((resolve, reject) => {
			get("/general/access/logout", data).then(res => {
				resolve(res);
			});
		});
	}



	//注销账号
	cancel(data) {
		return new Promise(resolve => {
			post("/zfw/api/pers/cancle", data).then(res => {
				resolve(res)
			})
		})
	}
	//设置新密码
	password(data) {
		return new Promise(resolve => {
			post("/sys/user/uniUpdPassword", data).then(res => {
				resolve(res)
			})
		})
	}
	//图片选择
	chooseImages(type, max) {
		uni.setStorage({
			key: "ifClose",
			data: 'no'
		})
		let promise = new Promise((resolve, reject) => {
			let that = this
			uni.chooseImage({
				count: max || 9, //一次最多可以选择的图片张数
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: type || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {

					uni.showLoading({
						title: '上传中...',
					})
					let img = res.tempFilePaths
					resolve(img)
					// that.upLoad(res.tempFilePaths[0])
				},
				fail: function(err) {
					console.log(err)
				},
				complete: function() {
					uni.hideLoading()
				}
			})
		})
		return promise
	}
	//上传操作
	async upLoad(imgPath) {
		let token = uni.getStorageSync('yui3-token')
		// if(!token){
		//   token = await getToken2()
		// }
		console.log(imgPath)
		return new Promise((resolve, reject) => {
			let that = this
			//上传文件
			uni.uploadFile({
				url: hostUrl + '/general/oss/upload',
				filePath: imgPath,
				name: 'img0',
				header: {
					"Content-Type": "multipart/form-data",
					"yui3-token": token
				},
				success: function(res) {
					console.log('================')
					console.log(res)
					let img = JSON.parse(res.data).data

					resolve(img)
				},
				fail: function(res) {

					uni.showModal({
						title: '错误提示',
						content: res.msg,
						showCancel: false,
						success: function(res) {}
					})
				},
				complete: function() {
					uni.hideLoading();
				}
			});
		})
	}





}
export {
	api
};
