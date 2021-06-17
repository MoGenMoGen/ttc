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
						{{bodyList.number}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改单位
					</view>
					<view class="bodyListContent">
						广知科技有限公司
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改负责人
					</view>
					<view class="bodyListContent">
						{{bodyList.head}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改日期
					</view>
					<view class="bodyListContent">
						{{bodyList.changeDate}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						下发日期
					</view>
					<view class="bodyListContent">
						{{bodyList.issuedDate}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						检查区域
					</view>
					<view class="bodyListContent">
						{{bodyList.area}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						隐患说明
					</view>
					<view class="bodyListContent">
						{{bodyList.instructions}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改要求
					</view>
					<view class="bodyListContent">
						{{bodyList.requirements}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						复查人
					</view>
					<view class="bodyListContent">
						{{bodyList.person}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						复查时间
					</view>
					<view class="bodyListContent">
						{{bodyList.reviewDate}}
					</view>
				</view>
				<view class="bodyList" style="border-bottom:0">
					<view class="bodyListTitle">
						隐患图片
					</view>
					<view class="bodyListImg">
						<image :src="bodyList.img" mode=""></image>
					</view>
				</view>


			</view>
		</view>


		<view class="detailContent" style="margin-top: 20rpx;" v-if="currentIndex==2||currentIndex==3">
			<view class="contentBody" style="margin-top: 0rpx;">
				<view class="bodyList">
					<view class="bodyListTitle">
						整改上报
					</view>
					<view class="bodyListContent">
						{{bodyList.report}}
					</view>
				</view>
				<view class="bodyList">
					<view class="bodyListTitle">
						整改照片
					</view>
					<view class="bodyListImg">
						<image :src="bodyList.img" mode=""></image>
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
				<view class="bodyList" style="border-bottom: 0;" v-if="currentIndex==2&&loginType==1">
					<view class="bodyListTitle">
						上报人
					</view>
					<view class="bodyListContent">
						{{bodyList.reportPerson}}
					</view>
				</view>
				<view class="bodyList" v-if="currentIndex==3">
					<view class="bodyListTitle">
						结案人
					</view>
					<view class="bodyListContent">
						{{bodyList.casePeople}}
					</view>
				</view>
				<view class="bodyList" v-if="loginType==2&&currentIndex==2">
					<view class="bodyListTitle">
						确认人
					</view>
					<view class="bodyListContent">
						章老师
					</view>
				</view>
				<view class="bodyList" v-if="currentIndex==3||(loginType==2&&currentIndex==2)"
					style="border-bottom: 0;">
					<view class="bodyListTitle">
						确认时间
					</view>
					<view class="bodyListContent">
						{{bodyList.setTime}}
					</view>
				</view>

			</view>
		</view>
		<!-- 	<view class="detailContent" style="margin-top: 20rpx; padding: 20rpx 40rpx;" v-if="currentIndex==2">
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
		<view class="contentText" v-if="currentIndex==0">
			<view class="TextTitle">
				确认签收
			</view>
			<textarea value="" placeholder="在此签名" class="textareaIn" placeholder-class="placeholderIn" />
			<view class="textBtn">
				<button class="btn1" type="default">重签</button>
				<button class="btn2" type="default">保存</button>
			</view>
		</view>
		<view class="contentText" v-if="currentIndex==1&&loginType==1">
			<view class="TextTitle">
				整改上报
			</view>
			<textarea value="" placeholder="多行输入" class="textareaInTwo" placeholder-class="placeholderIn" />
		</view>
		<view class="contentText" v-if="currentIndex==2&&loginType==2">
			<view class="TextTitle">
				结案内容
			</view>
			<textarea value="" placeholder="多行输入" class="textareaInTwo" placeholder-class="placeholderIn" />
		</view>
		<view class="photograpBox" v-if="currentIndex==1&&loginType==1">
			<view class="title">拍照上传 </view>
			<view class="photograp" v-if="loginType == 1">
				<image src="../../static/takephoto.png" mode="" @click="toPhoto()" />
			</view>

			<view class="choseImg" v-for="(item, index) in imgList" :key="index">
				<image :src="item" mode="" class="imgs" v-if="loginType == 1" />
				<image v-if="loginType == 1" class="deleteImg" :src="del" mode="" @click="deleimg(index)" />
			</view>
		</view>
		<view class="lastBtn" v-if="loginType==1">
			<button type="default" class="cancel" v-if="currentIndex==0||currentIndex==1">取消</button>
			<button type="default" class="confirm" v-if="currentIndex==0">确认</button>
			<button type="default" class="confirm" v-if="currentIndex==1">上报确认</button>
		</view>
		<view class="status" v-if="(currentIndex==2&&loginType==1)||(loginType==3)||(loginType==2&&currentIndex==1)">
			<view class="title">
				整改状态
			</view>
			<view class="content">
				待执行
			</view>
		</view>
		<view class="lastBtnTwo" v-if="currentIndex==2&&loginType==2">
			<button type="default" class="cancel"  @click="backTo">取消</button>
			<button type="default" class="confirm" @click="backTo">确认结案</button>
			<button type="default" class="again" @click="pop">再次下发</button>
		</view>
		<view class="mask" v-if="popshow" catchtouchmove="true">
			
		</view>
		<view class="popBox" v-if="popshow" catchtouchmove="true">
			<view class="title">
				再次下发说明
			</view>
			<view class="text">
				<textarea  class="textIn" value="" placeholder="请输入二次下发说明" placeholder-style="font-size: 28rpx;color: #D0CED8" />
			</view>
			<view class="btn">
				<view class="btn1" type="default" @click="unshowpop">取消</view>
				<view class="btn2" type="default"@click="finishshowpop">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import del from "static/delete.png";
	export default {
		data() {
			return {
				
				del,
				loginType: 2,
				popshow:false,
				
				imgList: ["/static/takephoto.png"],
				bodyList: {
					number: "ZG20210330001",
					unit: "广知科技有限公司",
					head: "张宁",
					changeDate: "2021-05-20",
					issuedDate: "2021-05-19",
					area: "消防通道",
					instructions: "消防通道堵塞",
					requirements: "请按照要求进行整改",
					person: "章老师",
					reviewDate: "2021-05-19",
					img: "/static/takephoto.png",
					report: "已按整改要求完成整改",
					reportDate: "2021-5-25",
					reportPerson: "张宁",
					state: "待结案",
					casePeople: "章老师",
					setTime: "2021-05-27"
				},
				
			}
		},
		methods: {
			toPhoto() {
				uni.chooseImage({
					sourceType: ["camera", "album "],
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					},
					fail(err) {
						console.log(err);
					},
				});
			},
			deleimg(index) {
				this.imgList.splice(index);
				console.log("dele");
			},
			pop(){
				this.popshow=true
			},
			unshowpop(){
			this.popshow=false	
			},
			finishshowpop(){
				this.popshow=false;
				uni.navigateBack({
					
				})
				
			},
			backTo(){
				uni.navigateBack({
					
				})
			}
			 
		},
		onLoad(e) {
			this.currentIndex = e.currentIndex;
		},

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
						width: 160rpx;
						height: 160rpx;

						image {
							width: 100%;
							height: 100%;
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

			.photograp {
				width: 160rpx;
				height: 160rpx;
				position: absolute;
				top: 148rpx;
				left: 30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.choseImg {
				position: absolute;
				width: 160rpx;
				height: 160rpx;
				top: 148rpx;
				left: 210rpx;

				.imgs {
					position: absolute;
					width: 100%;
					height: 100%;
				}

				.deleteImg {
					position: absolute;
					width: 32rpx;
					height: 32rpx;
					top: -16rpx;
					right: -16rpx;
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
		.popBox{
			width: 640rpx;
		
			background: #FFFFFF;
			opacity: 1;
			position: fixed;
			top: 424rpx;
			left: 56rpx;
			z-index: 1000;
			border-radius: 12rpx;
			.title{
				margin-top: 66rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
			}
			.text{
				margin-top: 34rpx;
				display: flex;
				justify-content: center;
				.textIn{
					padding: 22rpx;
					width: 544rpx;
					height: 306rpx;
					background: #FCFCFC;
					border-radius: 4rpx;
				}
			}
			.btn{
				margin-top: 40rpx;
				display: flex;
				.btn1{
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
				.btn2{
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
		.mask{
			background-color:#8B8B8B;
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
