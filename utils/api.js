const config = require("./config");
import Vue from 'vue'
// const app = getApp()

const hostUrl = config.serverURL;

function get(url, data, header) {
	// console.log(url)
	uni.showLoading({
		title: "加载中"
	});
	let BladeAuth = uni.getStorageSync("Blade-Auth")
	let myheader = {
		"Blade-Auth": BladeAuth
	}
	header = header ? header : {}
	myheader = {
		...myheader,
		...header
	}

	let promise = new Promise((resolve, reject) => {
		uni.request({
			data: data,
			method: "get",
			header: myheader,
			url: config.serverURL + url,
			success: function(res) {
				console.log('get success',res)
				// 登录失效重新登录
				if (res.data.code == '401') {
					console.log("401");
					uni.showToast({
						title: '登录失效了，重新登录',
						duration: 2000,
						icon: "none"
					})
					uni.reLaunch({
						url: '/pages/login/index'
					})
				} else if (res.data.code == '200')
					resolve(res.data);
				else {
					uni.showToast({
						title: '服务器错误',
						duration: 2000,
						icon: 'loading'

					})
				}
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

	let BladeAuth = uni.getStorageSync("Blade-Auth")
	let myheader = {
		"Blade-Auth": BladeAuth
	}
	header = header ? header : {}
	myheader = {
		...myheader,
		...header
	}
	let promise = new Promise((resolve, reject) => {
		uni.request({
			data: data,
			header: myheader,
			method: "post",
			url: config.serverURL + url,
			success: function(res) {
				console.log('post success',res)
				// 登录失效重新登录
				if (res.data.code == '401') {
					uni.showToast({
						title: '登录失效了，重新登录',
						duration: 2000,
						icon: 'none'
					})
					uni.reLaunch({
						url: '/pages/login/index'
					})
				} else if (res.data.code == '200')
					resolve(res.data);
				else {
					uni.showToast({
						title: '服务器错误',
						duration: 2000,
						icon: 'loading'
					})
				}

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
// 专门针对登录的post提交,error_code=='400'账号或密码错误,error_code=='402'账号未注册，没有error_code成功
// 其他接口用的get/post,code==401未授权，code=200成功，其他code就是服务器问题


function loginpost(url, data, header) {
	// console.log(url)
	uni.showLoading({
		title: "加载中"
	});

	let BladeAuth = uni.getStorageSync("Blade-Auth")
	let myheader = {
		"Blade-Auth": BladeAuth
	}
	header = header ? header : {}
	myheader = {
		...myheader,
		...header
	}
	let promise = new Promise((resolve, reject) => {
		uni.request({
			data: data,
			header: myheader,
			method: "post",
			url: config.serverURL + url,
			success: function(res) {
				console.log('post success',res)
				// 400账号或密码错误
				if (res.data.error_code == '400') {
					uni.showToast({
						title: res.data.error_description,
						// title: "111",
						icon: 'loading',
						duration: 2000
					})

				}
				// 402账号未注册
				else if (res.data.error_code == "402") {
					uni.showToast({
						title: res.data.error_description,
						// title:"222",
						duration: 2000,
						icon: 'loading'
					})
				} else if (!res.data.error_code) {} else {
					uni.showToast({
						title: '服务器错误',
						duration: 2000,
						icon: 'loading'
					})
				}
				// 不管账号是否存在或错误都返回res
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
			loginpost("/blade-auth/login", data, {
				"Tenant-Id": "000000",
				"Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
				"Content-Type": "application/x-www-form-urlencoded",
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
				resolve(res.data)
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
		// let token = uni.getStorageSync('yui3-token')
		// if(!token){
		//   token = await getToken2()
		// }
		console.log(imgPath)
		return new Promise((resolve, reject) => {
			let that = this
			//上传文件
			uni.uploadFile({
				url: hostUrl + '/blade-resource/oss/endpoint/put-file',
				filePath: imgPath,
				name: 'file',
				header: {
					"Content-Type": "multipart/form-data",
					"Blade-Auth": uni.getStorageSync("Blade-Auth")
				},
				success: function(res) {
					console.log('================')
					console.log(res)
					let img = JSON.parse(res.data).data.link;

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
	// 整改单列表
	getRecityList(data) {
		return new Promise(resolve => {
			get("/blade-works/rectifybill/rectifyList", data, {
					"Content-Type": "application/json"
				})
				.then(res => resolve(res.data))

		})

	}
	//整改单详情列表
	getRecityDetail(data) {
		return new Promise(resolve => {
			get("/blade-works/rectifybill/rectifyDetail", data, {
					"Content-Type": "application/json"
				})
				.then(res => resolve(res.data))
		})

	}
	getUnitList(data) {
		return new Promise(resolve=>{
			get("/blade-system/dept/getRectifyOrgList",data, {
				"Content-Type": "application/json","Blade-Auth":uni.getStorageSync("Blade-Auth")
			})
			.then(res=>resolve(res.data))
		})

	}
	// 整改单号生成
	generateRectifyid() {
		return new Promise(resolve => {
			get("/blade-works/rectifybill/rectifyCd", {}, {
					"Content-Type": "application/json",
					"Blade-Auth": uni.getStorageSync("Blade-Auth")
				})
				.then(res => resolve(res.data))
		})
	}

	postRecityNew(data) {}
	//责任人列表生成

	getUnitPerson(data) {
		console.log(data)
		return new Promise(resolve => {
			get("/blade-system/user/getUserListByDeptId", data, {
					"Content-Type": "application/json",
					"Blade-Auth": uni.getStorageSync("Blade-Auth")
				})
				.then(res => resolve(res.data))
		})

	}
	postNewList(data) {
		return new Promise(resolve => {
			post("/blade-works/rectifybill/rectifySave", data).then(res => resolve(res))
		})
	}
	//签收确认
	postRectifyAccept(data) {
		return new Promise(resolve => {
			post("/blade-works/rectifybill/rectifyAccept", data).then(res => resolve(res))
		})
	}
	//整改上报
	postRectifyReport(data) {
		return new Promise(resolve => {
			post("/blade-works/rectifybill/rectifyReport", data).then(res => relsolve(res))
		})
	}
	//确认结案
	postRectifyClose(data) {
		return new Promise(resolve => {
			post("/blade-works/rectifybill/rectifyClose", data).then(res => resolve(res))
		})
	}
	//新增整改单详情
	getAddDetail(data) {
		return new Promise(resolve => {
			get("/blade-works/rectifybill/addDetail", data, {
					"Content-Type": "application/json",
					"Blade-Auth": uni.getStorageSync("Blade-Auth")
				})
				.then(res => resolve(res.data))
		})
	}
	postNewList(data) {
		return new Promise(resolve => {
			post("/blade-works/rectifybill/rectifySave", data).then(res => resolve(res))
		})
	}
	// 获取企业查列表
	getFirmQueryList(data) {
		return new Promise(resolve => {
			get("/blade-system/dept/deptList", data, {
					"Blade-Auth": uni.getStorageSync("Blade-Auth")
				})
				.then(res => resolve(res.data))
		})

	}
	// 企业查详情
	getFirmQueryDetail(data) {
		return new Promise(resolve => {
			get("/blade-system/dept/deptDetail", data, {
					"Blade-Auth": uni.getStorageSync("Blade-Auth")
				})
				.then(res => resolve(res.data))
		})

	}


}
export {
	api
};
