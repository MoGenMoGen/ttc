<!-- 整改单详情 -->
<template>
	<view class="detailContainer">
		<view class="detailContent">
			<view class="contentHead">
				消防通道畅通整改

			</view>
			<view class="contentBody">

				<view class="bodyList">
					<view class="bodyListTitle">
						整改单号
					</view>
					<view class="bodyListContent">
						{{bodyList.cd}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改单位
					</view>
					<view class="bodyListContent">
						{{bodyList.rectifyOrgName}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改负责人
					</view>
					<view class="bodyListContent">
						{{bodyList.responsibleName}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改日期
					</view>
					<view class="bodyListContent">
						{{bodyList.rectifyDate}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						下发日期
					</view>
					<view class="bodyListContent">
						{{bodyList.issueDate}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						检查区域
					</view>
					<view class="bodyListContent">
						{{bodyList.examRegion}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						隐患说明
					</view>
					<view class="bodyListContent">
						{{bodyList.troubleReport}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改要求
					</view>
					<view class="bodyListContent">
						{{bodyList.requReport}}
					</view>
				</view>
				<view class="bodyList" v-if="bodyList.reissueReport">
					<view class="bodyListTitle">
						二次下发说明
					</view>
					<view class="bodyListContent">
						{{bodyList.reissueReport}}
					</view>
				</view>
				
				<view class="bodyList">
					<view class="bodyListTitle">
						复查人
					</view>
					<view class="bodyListContent">
						{{bodyList.reviewName}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						复查时间
					</view>
					<view class="bodyListContent">
						{{bodyList.reviewTime}}
					</view>
				</view>
				<view class="bodyList" style="border-bottom:0">
					<view class="bodyListTitle">
						隐患图片
					</view>
					<view class="bodyListImg">
						<image v-for="(item,index) in bodyList.troublePic" :key="index" :src="item" mode="" @click="enlargeOne(index)"></image>
					</view>
				</view>


			</view>
		</view>


		<view class="detailContent" style="margin-top: 20rpx;" v-if="currentIndex==1||currentIndex==2">
			<view class="contentBody" style="margin-top: 0rpx;">
				<view class="bodyList">
					<view class="bodyListTitle">
						整改上报
					</view>
					<view class="bodyListContent">
						{{bodyList.rectifyReport}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改照片
					</view>
					<view class="bodyListImg">
						<image v-for="(item,index) in bodyList.rectifyPic" :key="index" :src="item" mode="" @click="enlargeTwo(index)"></image>
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						上报日期
					</view>
					<view class="bodyListContent">
						{{bodyList.reportDate}}
					</view>
				</view>
				<view class="bodyList" style="border-bottom: 0;" v-if="currentIndex==1&&loginType==1">
					<view class="bodyListTitle">
						上报人
					</view>
					<view class="bodyListContent">
						{{bodyList.reportUserName}}
					</view>
				</view>
				<view class="bodyList" v-if="currentIndex==2">
					<view class="bodyListTitle">
						结案人
					</view>
					<view class="bodyListContent">
						{{bodyList.closeUserName}}
					</view>
				</view>
				<view class="bodyList" v-if="loginType==2&&currentIndex==1">
					<view class="bodyListTitle">
						确认人
					</view>
					<view class="bodyListContent">
						{{bodyList.reviewName}}
					</view>
				</view>
				<view class="bodyList" v-if="currentIndex==2||(loginType==2&&currentIndex==1)"
					style="border-bottom: 0;">
					<view class="bodyListTitle">
						确认时间
					</view>
					<view class="bodyListContent">
						{{confirmDate}}
					</view>
				</view>

			</view>
		</view>
			<!-- <view class="detailContent" style="margin-top: 20rpx; padding: 20rpx 40rpx;" v-if="currentIndex==2">
			<view class="contentBody" style="margin-top: 0rpx;">
				<view class="bodyList" style="border-bottom: 0;">
					<view class="bodyListTitle">
						整改状态
					</view>
					<view class="bodyListContent">
						{{bodyList.state}}
					</view>
				</view>
			</view>
		</view> -->
	<!-- 	<view class="contentText" v-if="currentIndex==0&&loginType==1">
			<view class="TextTitle">
				确认签收
			</view>
			 <view class="signBox" style="width: 100%;">
				<sign @signImage="signImage"></sign>
			</view> -->
			<!-- <textarea v-model="signs" placeholder="在此签名" class="textareaIn" placeholder-class="placeholderIn" />
			<view class="textBtn">
				<button class="btn1" type="default" @click="Resign">重签</button>
				<button class="btn2" type="default" @click="preservation">保存</button>
			</view> -->
		<view class="contentText" v-if="currentIndex==0&&loginType==1">
			<view class="TextTitle">
				整改上报
			</view>
			<textarea v-model="report" placeholder="多行输入" class="textareaInTwo" placeholder-class="placeholderIn" />
		</view>
		<view class="contentText" v-if="currentIndex==1&&loginType==2">
			<view class="TextTitle">
				结案内容
			</view>
			<textarea v-model="closingContent" placeholder="多行输入" class="textareaInTwo" placeholder-class="placeholderIn" />
		</view>
		<view class="photograpBox" v-if="currentIndex==0&&loginType==1">
			<view class="title">拍照上传 </view>
			<view class="photo">


				<view class="photograp" v-if="loginType == 1">
					<image src="../../static/takephoto.png" mode="" @click="toPhoto()" />
				</view>

				<view class="choseImg" v-for="(item, index) in imgList" :key="index">
					<image :src="item" mode="" class="imgs" v-if="loginType == 1" />
					<image v-if="loginType == 1" class="deleteImg" :src="del" mode="" @click="deleimg(index)" />
				</view>
			</view>
		</view>
		<view class="lastBtn" v-if="loginType==1&&currentIndex!=1">
			<button type="default" class="cancel" v-if="currentIndex==0" @click="cancelTo">取消</button>
			<!-- <button type="default" class="confirm" v-if="currentIndex==0" @click="confirmTO">确认</button> -->
			<button type="default" class="confirm" v-if="currentIndex==0" @click="reportSure ">上报确认</button>
		</view>
		<view class="status" v-if="(currentIndex==1&&loginType==1)||(loginType==3)||(loginType==2&&currentIndex==0)">
			<view class="title">
				整改状态
			</view>
			<view class="content">
				{{currentState}}
			</view>
		</view>
		<view class="lastBtnTwo" v-if="currentIndex==1&&loginType==2">
			<button type="default" class="cancel" @click="backTo">取消</button>
			<button type="default" class="confirm" @click="sureTo">确认结案</button>
			<button type="default" class="again" @click="pop">再次下发</button>
		</view>
		<view class="mask" v-if="popshow" catchtouchmove="true"></view>
		<view class="popBox" v-if="popshow" catchtouchmove="true">
			<view class="title">
				再次下发说明
			</view>
			<view class="text">
				<textarea class="textIn" v-model="twice" placeholder="请输入二次下发说明"
					placeholder-style="font-size: 28rpx;color: #D0CED8" />
			</view>
			<view class="btn">
				<view class="btn1" type="default" @click="unshowpop">取消</view>
				<view class="btn2" type="default" @click="finishshowpop">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import del from "static/delete.png";
	import sign from "../../components/sign.vue"
	export default {
		data() {

			return {
				confirmDate:"",
				showCanvas: false,
				ctx: '', //绘图图像
				points: [], //路径点集合 
				signature: '',
				signs: "",
				personList: [],
				del,
				loginType: 2,
				popshow: false,
				currentIndex: 1,
				imgList: [],
				report:"",
				closingContent:"",
				twice:"",
				bodyList: {

				},

			}
		},
		components: {
			sign
		},
		methods: {
			async toPhoto() {
				// uni.chooseImage({
				// 	sourceType: ["camera", "album "],
				// 	success: function(res) {
				// 		console.log(JSON.stringify(res.tempFilePaths));
				// 	},
				// 	fail(err) {
				// 		console.log(err);
				// 	},
				// });
				this.imgList = [...this.imgList, ...await this.api.chooseImages('', 9)];
				// console.log(1111, this.bodylist.imgList);
				let path = this.imgList; //所有上传的图片的地址
				let path1 = []; //上传到服务器的图片
				this.bodyList.rectifyPic = '';
				console.log('path222222222', path);
				for (let i = 0; i < path.length; i++) {
					console.log(i, "dwsfsf54645646");
					let res = await this.api.upLoad(path[i]);
					path1.push(res)
				}
				this.bodyList.serverimgList = path1;
				this.bodyList.rectifyPic = this.bodyList.serverimgList.join(",");
				console.log("图片上传到服务器", this.bodyList.serverimgList);
	
			},
			deleimg(index) {
			// this.bodyList.serverimgList.splice(index, 1)
			this.imgList.splice(index, 1)
			this.bodyList.rectifyPic = this.imgList.join(",");
			},
			pop() {
				this.popshow = true
				
			},
			unshowpop() {
				this.popshow = false
			},
			async signImage(signImage){
				this.bodyList.receiptSign=await this.api.upLoad(signImage);
				console.log("guagua",this.bodyList.receiptSign);
			},
			
			finishshowpop() {
				
				if(this.twice==""){
					uni.showToast({
						title:"请输入二次下发说明",
						icon:"none"
					})
					return false
				}
				this.bodyList.rectifyPic = this.bodyList.rectifyPic.join(",");
				this.bodyList.troublePic=this.bodyList.troublePic.join(",")
				this.bodyList.reissueReport=this.twice;
				// this.bodyList.requReport=this.twice
				this.api.postRectifyClose(this.bodyList)
				this.popshow = false;
				uni.navigateBack({
				
				})

			},
			cancelTo() {
				uni.navigateBack({

				})
			},

			backTo() {
				uni.navigateBack({

				})
			},
			sureTo(){
			
				if(this.closingContent==""){
					uni.showToast({
						title:"请输入结案内容",
						icon:"none"
					})
					return false
				}
				this.bodyList.rectifyPic = this.bodyList.rectifyPic.join(",");
				this.bodyList.troublePic=this.bodyList.troublePic.join(",")
				this.bodyList.closeReport=this.closingContent
				this.bodyList.closeUserId=this.userinfo.user_id
				 
				this.api.postRectifyClose(this.bodyList)
				
				uni.navigateBack({
					
				})
			},
			async getList() {
				console.log(1111);
				let data = await this.api.getRecityDetail({
					id: this.id
					
				})
				// this.=data.records;
				console.log(data);
				this.bodyList = data
				this.currentIndex = data.state - 2
				this.bodyList.troublePic=this.bodyList.troublePic.split(",")
				this.bodyList.rectifyPic=this.bodyList.rectifyPic.split(",")
				
			},
			close: function() {
				this.showCanvas = false;
				this.clear();
			},
			confirmTO() {
				
				if(this.bodyList.receiptSign==""){
					uni.showToast({
						title:"请完成签名",
						icon:"none"
					})
					return false
				}
				this.bodyList.rectifyPic = this.bodyList.rectifyPic.join(",");
				this.bodyList.troublePic=this.bodyList.troublePic.join(",")
				this.api.postRectifyAccept(this.bodyList)

				uni.navigateBack({})
			},
			preservation() {
				this.bodyList.receiptSign = this.signs
			},
			Resign() {
				this.signs = ""
			},
			reportSure() {
				console.log("111",this.bodyList.rectifyPic,"222",this.bodyList.troublePic);
				
				// this.bodyList.troublePic=this.bodyList.troublePic.join(",")
				if(this.report==""){
					uni.showToast({
						title:"请输入整改上报内容",
						icon:"none"
					})
					return false
				}
				else if(this.bodyList.rectifyPic==""){
					uni.showToast({
						title:"请选择整改照片",
						icon:"none"
					})
					return false
				}
				// this.bodyList.rectifyPic = this.bodyList.rectifyPic.join(",");
				this.bodyList.troublePic=this.bodyList.troublePic.join(",")
				this.bodyList.rectifyReport = this.report
				this.bodyList.reportUserId=this.userinfo.user_id
				this.api.postRectifyReport(this.bodyList)
				
				uni.navigateBack({
					
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === "start") {
					year = year - 60;
				} else if (type === "end") {
					year = year + 2;
				}
				month = month > 9 ? month : "0" + month;
				day = day > 9 ? day : "0" + day;
				return `${year}-${month}-${day}`;
			},
			enlargeOne(index){
				uni.previewImage({
					current:this.bodyList.troublePic[index],
					urls:this.bodyList.troublePic,
					indicator:"default"
				})
			},
			enlargeTwo(index){
				uni.previewImage({
					current:this.bodyList.rectifyPic[index],
					urls:this.bodyList.rectifyPic,
					indicator:"default"
				})
			}
		},

		async onLoad(e) {
			this.id = e.id;
			// console.log(data);
			this.loginType = uni.getStorageSync("loginType")
			this.userinfo=uni.getStorageSync("userinfo")

		},
		onShow() {
			var str= new Date();
			var str2= str.getFullYear() + "-"
			 + (str.getMonth() + 1) + "-" + str.getDate();
			this.confirmDate=str2;
			this.getList()
			
			
			
		},
		
		computed: {
			currentState() {
				let state = this.bodyList.state;

				if (state == 1)
					return "待签收";
				else if (state == 2)
					return "待执行";
				else if (state == 3)
					return "待结案"
				else if (state == 4)
					return "已完成"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		background: #FAFAFA;
		padding: 20rpx;
		display: flex;
		flex-direction: column;

		.status {
			margin-top: 20rpx;
			width: 710rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			box-sizing: border-box;
			display: flex;

			.title {
				width: 200rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #303030;
				opacity: 1;
				margin: 20rpx 0rpx 20rpx 50rpx;
			}

			.content {
				width: 456rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #303030;
				opacity: 1;
				margin: 20rpx 0;
			}
		}

		.detailContent {
			width: 710rpx;

			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			padding: 40rpx;
			box-sizing: border-box;

			.contentHead {
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 600;
				text-align: center;
				color: #000000;
				opacity: 1;
			}

			.contentBody {
				margin-top: 20rpx;

				.bodyList {
					width: 656rpx;
					padding: 20rpx 14rpx;
					box-sizing: border-box;
					background: #FFFFFF;
					opacity: 1;
					display: flex;
					border-bottom: 1rpx solid #D0CED8;

					.bodyListTitle {
						width: 200rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #303030;
						opacity: 1;
					}

					.bodyListContent {
						width: 456rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #303030;
						opacity: 1;
					}

					.bodyListImg {
						width: 456rpx;
						word-wrap: break-word;
						image {
							width: 160rpx;
							height:160rpx;
							margin-left: 30rpx;
						}
					}
				}
			}

		}

		.contentText {
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			margin-top: 20rpx;

			.TextTitle {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: #303030;
				opacity: 1;
				margin-top: 40rpx;
				margin-left: 30rpx;
			}


			.textareaIn {
				width: 580rpx;
				height: 280rpx;
				background: #F2F2F2;
				border: 1rpx solid #909090;
				opacity: 1;
				border-radius: 6rpx;
				font-size: 24rpx;
				margin-left: 50rpx;
				margin-top: 20rpx;
				padding: 14rpx 20rpx;

			}

			.textareaInTwo {
				width: 580rpx;
				height: 206rpx;
				background: #FFFFFF;
				border: 1rpx solid #909090;
				opacity: 1;
				border-radius: 6rpx;
				margin: 20rpx 50rpx 62rpx;
				font-size: 24rpx;
				color: #303030;
				padding: 14rpx 20rpx;


			}

			.textBtn {
				display: flex;
				padding: 40rpx;

				.btn1 {
					width: 240rpx;
					height: 70rpx;
					background: #FFFFFF;
					border: 2rpx solid #50A1FF;
					opacity: 1;
					border-radius: 12rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 28rpx;
					color: #303030;
				}

				.btn2 {
					width: 240rpx;
					height: 70rpx;
					background: #50A1FF;
					opacity: 1;
					border-radius: 12rpx;
					line-height: 70rpx;
					font-size: 28rpx;
					color: #FFFFFF;
				}
			}

		}

		.lastBtn {
			display: flex;
			margin-top: 80rpx;
			margin-bottom: 404rpx;

			.cancel {
				width: 355rpx;
				height: 88rpx;
				background: #FFFFFF;
				border: 2rpx solid #2B89F7;
				opacity: 1;
				border-radius: 12rpx 0rpx 0rpx 12rpx;
				font-size: 28rpx;
				line-height: 88rpx;
				color: #303030;
			}

			.confirm {
				width: 355rpx;
				height: 88rpx;
				background: #2B89F7;
				border: 2rpx solid #2B89F7;
				opacity: 1;
				border-radius: 0rpx 12rpx 12rpx 0rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				line-height: 88rpx;
			}
		}

		.photograpBox {
			width: 710rpx;
			height: 368rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			margin-top: 20rpx;
			position: relative;

			.title {
				padding: 40rpx 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 32rpx;
				color: #000000;
				opacity: 1;

			}

			// .photograp {
			// 	margin-left: 20rpx;
			// 	width: 160rpx;
			// 	height: 160rpx

			// 	image {
			// 		width: 100%;
			// 		height: 100%;
			// 	}
			// }

			// .choseImg {
			// 	margin-left: 20rpx;
			// 	// width: 160rpx;
			// 	// height: 160rpx;
			// 	position: relative;

			// 	.imgs {

			// 		width: 100%;
			// 		height: 100%;
			// 	}

			// 	.deleteImg {
			// 		position: absolute;
			// 		width: 32rpx;
			// 		height: 32rpx;
			// 		top: -16rpx;
			// 		right: -16rpx;
			// 	}
			// }
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

		.lastBtnTwo {
			margin-top: 50rpx;
			display: flex;

			.cancel {
				width: 200rpx;
				height: 88rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 6rpx 12rpx rgba(155, 155, 155, 0.16);
				opacity: 1;
				border-radius: 20rpx;
				font-size: 28rpx;
				line-height: 88rpx;
			}

			.confirm {
				width: 200rpx;
				height: 88rpx;
				background: #F1C345;
				box-shadow: 0rpx 6rpx 12rpx rgba(241, 195, 69, 0.36);
				opacity: 1;
				border-radius: 20rpx;
				font-size: 28rpx;
				line-height: 88rpx;
				color: #FFFFFF
			}

			.again {
				width: 200rpx;
				height: 88rpx;
				background: #2B89F7;
				box-shadow: 0rpx 6rpx 12rpx rgba(43, 137, 247, 0.29);
				opacity: 1;
				border-radius: 20rpx;
				font-size: 28rpx;
				line-height: 88rpx;
				color: #FFFFFF
			}
		}

		.popBox {
			width: 640rpx;

			background: #FFFFFF;
			opacity: 1;
			position: fixed;
			top: 424rpx;
			left: 56rpx;
			z-index: 1000;
			border-radius: 12rpx;

			.title {
				margin-top: 66rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
			}

			.text {
				margin-top: 34rpx;
				display: flex;
				justify-content: center;

				.textIn {
					padding: 22rpx;
					width: 544rpx;
					height: 306rpx;
					background: #FCFCFC;
					border-radius: 4rpx;
				}
			}

			.btn {
				margin-top: 40rpx;
				display: flex;

				.btn1 {
					width: 320rpx;
					height: 112rpx;
					background: #FFFFFF;
					line-height: 112rpx;
					text-align: center;
					font-size: 34rpx;
					font-weight: 500;
					color: #000000;
					border-top: 1rpx solid #E5E5E5;
					border-right: 1rpx solid #E5E5E5;
					// letter-spacing: 59rpx;
				}

				.btn2 {
					width: 320rpx;
					height: 112rpx;
					background: #FFFFFF;
					line-height: 112rpx;
					text-align: center;
					color: #576B95;
					font-size: 34rpx;
					border-top: 1rpx solid #E5E5E5;
					// letter-spacing: 59rpx;
				}
			}
		}

		.mask {
			background-color: #8B8B8B;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 1;
			opacity: 0.5;
			width: 100%;
			height: 100%;
		}
	}
</style>
