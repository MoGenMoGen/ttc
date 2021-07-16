<template>
	<view class="newContainer">
		<view class="newBody">
			<view class="newList">
				<view class="newListTitle">
					整改单号
				</view>
				<view class="newListContent">
					{{info.cd}}
				</view>
			</view>
			<!-- <view class="newList">
				<view class="newListTitle">
					整改名称
				</view>
				<input type="text" v-model="info.title" value="" placeholder="请输入整改名称" placeholder-class="placeholderIn"
					class="newListContent" />
			</view> -->
			<view class="newList">
				<view class="newListTitle">
					整改单位
				</view>
				<view class="newListContent">
					<picker :range="info.AttrSystems" range-key="fullName" :value="index2" @change="bindPickerChange">
						<span class="ct">{{
				                  info.AttrSystem ? info.AttrSystem : "请选择整改单位"
				                }}</span>
					</picker>
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					检查区域
				</view>
				<input type="text" v-model="info.examRegion" class="newListContent" placeholder="请输入检查区域"
					placeholder-class="placeholderIn" />
			</view>
			<view class="newList" @click="getLoca">
				<view class="newListTitle">
					LBS位置
				</view>
				<view class="newListContent">
					<text v-if="!info.address">请选择位置</text>
					{{info.address}}
					<image src="../../static/location.png" mode="" class="location"></image>
				</view>
			</view>
			<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					隐患说明
				</view>
				<textarea value="" v-model="info.troubleReport" placeholder="请输入主要事项内容详情"
					placeholder-class="placeholderIn" class="text" />
			</view>
			<view class="newList">
				<view class="newListTitle">
					责任整改人
				</view>
				<view class="newListContent">
					<picker mode=selector :range="info.personList" range-key="realName" value="index1"
						@change="bindPickerPerson">
						<span class="ct">{{
				                  info.person ? info.person : "请选择整改负责人"
				                }}</span>
					</picker>
				</view>
			</view>
		<!-- 	<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					整改要求
				</view>
				<textarea value="" v-model="info.requReport" placeholder="请按照要求进行整改" placeholder-class="placeholderIn"
					class="text" />
			</view> -->
			<view class="newList">
				<view class="newListTitle">
					整改期限
				</view>
				<view class="newListContent">
					<picker mode="date" :value="info.rectifyDate" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input" style="display: flex; align-items: center;">{{info.rectifyDate}}
							<image src="../../static/choosedate.png" mode="" class="date"></image>
						</view>
					</picker>

				</view>
			</view>
			
			<view class="photograpBox">
				<view class="newListTitle">
					隐患图片
				</view>
				<view class="hint">
					上传完图片后，可以点击图片进行编辑
				</view>
				<view class="photo">

					<view class="photograp">
						<image src="/static/takephoto.png" mode="" @click="toPhoto()" />
					</view>
					<view class="choseImg" v-for="(item, index) in info.imgList" :key="index">
						<image :src="item" mode="" class="imgs" @click="enlarge(index)"></image>
						<image :src="del" mode="" class="deleteImg" @click="deleimg(index)"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="newBtn">
			<button type="default" class="cancel" @click="backTo">取消</button>
			<button type="default" class="next" @click="changePageTo">下一步 </button>
		</view>
		<view style="position: absolute; top: -9999rpx;">
		<view>
		<canvas style="width:375px;height:500px" canvas-id="firstCanvas"></canvas> 
		</view> 
		</view> 
	</view>
</template>

<script>
	import del from "static/delete.png";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				del,
				index2: 0,
				index1: 0,
				w:'100px',
				h:'100px',
				canvasWidth:"",
				canvasHeight:"", 
				info: {
					cd: "",
					personList: [],
					title: "",
					issueUserId: 1,
					buildOrgId: 1,
					examRegion: "",
					reviewTime: currentDate,
					lat: "",
					lng: "",
					troubleReport: "",
					requReport: "",
					responsibleId: 1,
					person: "",
					troublePic: "",
					AttrSystems: [],
					address: "",
					rectifyDate: currentDate,
					AttrSystem: "", //当前选择的整改单位
					imgList: [],
					serverimgList: [], //上传到服务器的图片地址
				}
			}
		},
		methods: {
// 			async toPhoto() {
// 				let that=this
// 				this.canvasImg=await this.api.chooseImages('', 9)
// 				console.log("qweqeqweqewqe",this.canvasImg);
// 				uni.getImageInfo({
// 					src:that.canvasImg[0],

// 					success:res=>{
// 						console.log("我进来了");
// 						console.log("宽度",res.width);
// 						console.log("高度",res.height);
// 						that.canvasWidth=`${res.width}px`;
// 						that.canvasHeight=`${res.height}px`;
// 						console.log("111",that.canvasWidth,that.canvasHeight);
// 						var ctx=uni.createCanvasContext('firstCanvas');
// 						ctx.clearRect(0,0,res.width,res.height);
// 						ctx.beginPath();
// 						ctx.setFontSize(170);
// 						ctx.drawImage(that.canvasImg[0],0,0,res.width,res.height); 
// 						// ctx.translate(res.width/2,res.height/2);
// 						// ctx.rotate(45 * Math.PI / 180);
// 						let horizontal=res.width/4;
// 						let vertical=res.height/3;	
// 						ctx.fillText("--晒渔--",horizontal,vertical);
// 						ctx.setFillStyle("rgba(255,255,255,0.4)");
// 						console.log("看看画布",ctx);
// 						ctx.draw(false,()=>{
// 							setTimeout(()=>{
// 								console.log("qweq");
// 								uni.canvasToTempFilePath({
// 									canvasId:"firstCanvas",
// 										success:res=>{
// 											console.log("我又进来了");
// 											console.log(res.tempFilePath);
// 											// that.canvasImg=[]
// 											that.info.imgList.push(res.tempFilePath)
											
// 										}
// 								})
// 							},500)
// 						});
// 					}
// 				})

// console.table(this.info.imgList)
// 				// this.info.imgList = [...this.info.imgList,...this.canvasImg];
// 				// console.log(1111, this.info.imgList);
// 				let path = this.info.imgList; //所有上传的图片的地址
// 				let path1=[];//上传到服务器的图片
// 				this.info.troublePic = '';
// 				// console.log('path222222222',path);
// 				for(let i=0;i<path.length;i++){
// 					// console.log(i,"dwsfsf54645646");
// 					let res=await this.api.upLoad(path[i]); 	
// 					path1.push(res)
// 				}
// 				this.info.serverimgList=path1;
// 				this.info.troublePic = this.info.serverimgList.join(",");
// 				// console.log("图片上传到服务器",path1);
// 				// path.forEach((item, index, arr) => {
// 				// 	this.api.upLoad(item).then(res=>{
// 				// 		 console.log('图片上传',res);
// 				// 		 path1.push(res)
// 				// 	})

// 				// });
// 			},
			async toPhoto() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sourceType:['camera'], 
					success(res) {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: (ress) => {
								console.log("nnnnn",res);   
								console.log("mmmm",ress);
								that.w = ress.width / 2+ 'px';
								that.h = ress.height / 2 + 'px';
								let ctx = uni.createCanvasContext('firstCanvas'); /** 创建画布 */
								//将图片src放到cancas内，宽高为图片大小
								ctx.drawImage(res.tempFilePaths[0], 0, 0, 375, 500)
								ctx.setFontSize(30)
								ctx.setFillStyle('white')
								// ctx.rotate(30 * Math.PI / 180);
								let textToWidth = ress.width / 3 * 0;
								let textToHeight = ress.height / 3 * 0.1;
								ctx.fillText(that.dateFormat("YYYY-mm-dd HH:MM", new Date()), textToWidth, textToHeight)
								/** 除了上面的文字水印，这里也可以加入图片水印 */
								//ctx.drawImage('/static/watermark.png', 0, 0, ress.width / 3, ress.height / 3)
								ctx.draw(false, (() => { 
									setTimeout(() => { 
										uni.canvasToTempFilePath({
											canvasId: 'firstCanvas',
											success: (res1) => {
												that.src = res1.tempFilePath;
												console.log("qqqqqq" ,res1.tempFilePath);
												that.info.imgList.push(res1.tempFilePath)
												that.info.imgList.push()
												let path = that.info.imgList; //所有上传的图片的地址
												console.log("显示图片列表",that.info.imgList);
												let path1=[];//上传到服务器的图片
												that.info.troublePic = '';
												// console.log('path222222222',path);
												for(let i=0;i<path.length;i++){
													// console.log(i,"dwsfsf54645646");
													that.api.upLoad(path[i]).then(res=>{
														path1.push(res)
														that.info.serverimgList=path1;
													})
													
												}
											}
										});
									}, 1000);  
								})());
							}
						})
					}
				
				});
				
				// console.log("显示图片",path1);
				// this.info.serverimgList=path1;
				// this.info.troublePic = that\.info.serverimgList.join(",");
				
		
			}, 
			dateFormat(fmt, date) {
			    let ret;
			    const opt = {
			        "Y+": date.getFullYear().toString(),        // 年
			        "m+": (date.getMonth() + 1).toString(),     // 月
			        "d+": date.getDate().toString(),            // 日
			        "H+": date.getHours().toString(),           // 时
			        "M+": date.getMinutes().toString(),         // 分
			        "S+": date.getSeconds().toString()          // 秒
			        // 有其他格式化字符需求可以继续添加，必须转化成字符串
			    };
			    for (let k in opt) {
			        ret = new RegExp("(" + k + ")").exec(fmt);
			        if (ret) {
			            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			        };
			    };
			    return fmt;
			},
			enlarge(index) {
				uni.previewImage({
					current: this.info.imgList[index],
					urls: this.info.imgList,
					indicator: "default"
				})
			},
		
			async bindPickerChange(e) {
				this.index2 = e.mp.detail.value;
				// console.log(e.mp.detail.value, typeof(e.mp.detail.value));
				// console.log(this.info.AttrSystems[this.index2]);
				this.info.AttrSystem = this.info.AttrSystems[this.index2].fullName;
				this.info.rectifyOrgId = this.info.AttrSystems[this.index2].id;
				console.log(this.info.rectifyOrgId);
				let Person = await this.api.getUnitPerson({
					rectifyOrgId: this.info.rectifyOrgId
				})
				this.info.personList = Person;
				// console.log("waibi",Person);
				// 	for(let i=0;i<Person.length;i++){
				// 		console.log(i,"dwsfsf54645646");
				// 		this.info.personList.push(Person[i])
				// 	}
			},
			bindPickerPerson(e) {
				console.log(1123, e, this.info.personList);

				this.index1 = e.mp.detail.value;
				this.info.person = this.info.personList[this.index1].realName;
				this.info.responsibleId = this.info.personList[this.index1].id;

			},
			deleimg(index) {
				this.info.imgList.splice(index, 1)
				this.info.troublePic = this.info.imgList.join(",");
			},
			changePageTo() {
				this.info.troublePic = this.info.serverimgList.join(",");
				// if (this.info.title == "") {
				// 	uni.showToast({
				// 		title: "请填写整改名称",
				// 		icon: "none"
				// 	})
				// 	return false
				// } 
				 if (this.info.AttrSystem == "") {
					uni.showToast({
						title: "请选择整改单位",
						icon: "none"
					})
					return false
				} 
				else if (this.info.examRegion == "") {
					uni.showToast({
						title: "请选择检查区域",
						icon: "none"
					})
					return false
				} else if (this.info.address == "") {
					uni.showToast({
						title: "请选择位置",
						icon: "none"
					})
					return false
				} else if (this.info.troubleReport == "") {
					uni.showToast({
						title: "请填写隐患说明",
						icon: "none"
					})
					return false
				} else if (this.info.person == "") {
					uni.showToast({
						title: "请选择责任整改人",
						icon: "none"
					})
					return false
				} 
				// else if (this.info.requReport == "") {
				// 	uni.showToast({
				// 		title: "请填写整改要求",
				// 		icon: "none"
				// 	})
				// 	return false
				// } 
				else if (this.info.troublePic == "") {
					uni.showToast({
						title: "请选择隐患图片",
						icon: "none"
					})
					return false
				}
				uni.setStorageSync('rectifyList', this.info);
				uni.navigateTo({
					url: "./newNext"
				});



			},
			backTo() {
				uni.navigateBack({})
			},
			getLoca() {
				let that = this

				uni.chooseLocation({

					success: function(res) {
						// console.log(res);
						that.info.address = res.name;
						that.info.lat = res.latitude;
						that.info.lng = res.longitude;
						console.log(res.latitude, res.longitude);
					},
					fail() {
						console.log(111);
					}

				})
			},
			bindDateChange: function(e) {
				this.info.rectifyDate = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {

			this.loginType = uni.getStorageSync("loginType")
			this.info.buildOrgId = uni.getStorageSync("userinfo").dept_id
			this.info.issueUserId = uni.getStorageSync("userinfo").user_id


		},

		async onShow() {
			// Object.assign(this.$data, this.$options.data())
			// 生成整改单号
			let res = await this.api.generateRectifyid()
			this.info.cd = res;
			console.log("zzzzzzzzzz", res);
			// 获取整改单位列
			let unitList = await this.api.getUnitList({
				id: this.info.buildOrgId
			});
			this.info.AttrSystems = unitList
			console.log("显示", unitList)


		},



	}
</script>

<style lang="scss" scoped>
	.newContainer {
		background-color: #fafafa;
		display: flex;
		padding: 20rpx;
		flex-direction: column;

		.newBtn {
			margin-top: 50rpx;
			display: flex;
			padding: 100rpx 0;

			.cancel {
				width: 355rpx;
				height: 88rpx;
				background: #FFFFFF;
				border: 2rpx solid #2B89F7;
				opacity: 1;
				border-radius: 12rpx 0rpx 0rpx 12rpx;
				font-size: 28rpx;
				color: #303030;
				line-height: 88rpx;
			}

			.next {
				width: 355rpx;
				height: 88rpx;
				background: #2B89F7;
				border: 2rpx solid #2B89F7;
				opacity: 1;
				border-radius: 0rpx 12rpx 12rpx 0rpx;
				color: #ffffff;
				font-size: 28rpx;
				line-height: 88rpx;
			}
		}

		.newBody {
			width: 710rpx;

			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			padding: 40rpx;
			box-sizing: border-box;

			.newList {
				display: flex;
				position: relative;
				padding: 20rpx 14rpx;
				width: 656rpx;
				background: #FFFFFF;
				opacity: 1;
				border-bottom: 1rpx solid #D0CED8;

				box-sizing: border-box;

				.textBox {
					padding: 18rpx 22rpx;
					width: 624rpx;
					height: 206rpx;
					border: 1rpx solid #D0CED8;
					opacity: 1;
					border-radius: 6rpx
				}

				.newListTitle {
					width: 200rpx;
					font-size: 28rpx;
					color: #303030;
					display: flex;
					align-items: center;
				}

				.newListContent {
					width: 350rpx;
					margin-left: 30rpx;
					word-wrap: break-word;
					font-size: 28rpx;

					.location {
						width: 48rpx;
						height: 48rpx;
						position: absolute;
						right: 3rpx;
						top: 50%;
						transform: translateY(-50%);

					}

					.date {
						width: 48rpx;
						height: 48rpx;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 3rpx;
					}
				}

				.text {
					width: 624rpx;
					height: 206rpx;
					background: #FCFCFC;
					opacity: 1;
					border-radius: 6rpx;
					font-size: 28rpx;

					padding: 18rpx 36rpx;
					box-sizing: border-box;
					margin-top: 20rpx;
				}

				.placeholderIn {
					color: #D0CED8;
				}

				input {
					font-size: 28rpx;

				}
			}

		}

		.photograpBox {
			padding: 20rpx 14rpx;

			.hint {
				font-size: 28rpx;
				color: #D0CED8;
				margin: 20rpx 0;
			}

			.newListTitle {
				font-size: 28rpx;
				color: #303030;
			}

			.photo {
				margin-top: 74rpx;
				display: flex;
				flex-wrap: wrap;
				width: 100%;

				.photograp {
					margin-left: 20rpx;
					width: 160rpx;
					height: 160rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.choseImg {
					margin-left: 20rpx;
					// width: 160rpx;
					// height: 160rpx;
					position: relative;

					.imgs {
						width: 160rpx;
						height: 160rpx;
					}

					.deleteImg {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						top: -16rpx;
						right: -16rpx;
					}
				}
			}
		}

	}
</style>
