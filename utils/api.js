const config = require("./config");
import Vue from 'vue'
const app = getApp()

const hostUrl = config.serverURL;

function get(url, data, header) {
	// console.log(url)
		uni.showLoading({
			title: "加载中"
		});
	header = header ? header : {}
	let promise = new Promise((resolve, reject) => {
		uni.request({
			data: data,
			method: "get",
			header: header?header:{},
			url: config.serverURL + url,
			success: function(res) {
				console.log('get success')
				resolve(res.data);
			},
			fail: function(err) {
				console.log("get error");
				uni.showToast({
					icon: "none",
					title: JSON.stringify(err),
					duration: 2000
				});
				reject(err);
			},
			complete: function() {
				uni.hideLoading();
			}
		});
	});
	return promise;
}

function post(url, data, header) {
	// console.log(url)
	uni.showLoading({
		title: "加载中"
	});
	
	header = header ? header : {}
	let promise = new Promise((resolve, reject) => {
		uni.request({
			data: data,
			header: header?header:{},
			method: "post",
			url: config.serverURL + url,
			success: function(res) {
				console.log('post success')
				resolve(res.data);

			},
			fail: function(err) {
				console.log('post fail')
				uni.showToast({
					icon: "none",
					title: JSON.stringify(err),
					duration: 2000
				});
				reject(err)
			},
			complete: function() {
				uni.hideLoading()
			}
		});
	});
	return promise;
}

class api {
	//登录
	login(data) {
		return new Promise((resolve, reject) => {
			post("/blade-auth/login", data, {
				"Tenant-Id": "000000",
				"Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
				"Content-Type": "application/x-www-form-urlencoded",
				"user_id":uni.getStorageSync("user_id")
			}).then(res => {
				uni.setStorageSync("user_id", res.user_id)
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
	logOut() {
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
