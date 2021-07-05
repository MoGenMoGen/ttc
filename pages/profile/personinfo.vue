<template>
	<!-- 个人信息页面 -->
	<view class="pages_personinfo">
		<view class="container">
			<view class="avatar">
				<image :src="info.avatar" mode="aspectFill" />
			</view>
			<view class="list">
				<view class="item">
					<text class="title">真实姓名</text>
					<text class="content">{{ info.realName }}</text>
				</view>
				<view class="item">
					<text class="title">联系电话</text>
					<text class="content">{{ info.phone }}</text>
				</view>
				<view class="item">
					<text class="title">公司名称</text>
					<text class="content">{{ info.deptName }}</text>
				</view>
				<view class="item">
					<text class="title">公司地址</text>
					<text class="content">{{ info.deptAddr }}</text>
				</view>
			</view>
			<!-- <image class="code" :src="info.code" mode="widthFix"></image> -->
			<yuanqi-qr-code style="margin-top:36upx" ref="yuanqiQRCode" :text="'/pages/profile/personinfo?id='+id"
				:size="size" :logo="logo"></yuanqi-qr-code>
				
		</view>
	</view>
</template>

<script>
	import avatar from "static/avatar.png";
	export default {
		data() {
			return {
				avatar,
				logo:avatar,
				size: 250,
				id: "",
				info: {
					deptAddr: "",
					avatar: "",
					realName: "",
					phone: "",
					deptName: ""
				},
			};
		},
		onLoad(e) {
			this.id = e.id;
			this.loginType = uni.getStorageSync("loginType")
			this.api.getuserInfo(e.id).then(res => {
				console.log("onload", 1111111111, res);
				this.info = res
				this.logo=this.info.avatar
				console.log("logo",this.logo);
				console.log("info",this.info);
				this.$nextTick(function(){
					this.$refs.yuanqiQRCode.make();
				})
			})
			// console.log(userdata)
			// this.info=userdata

		},
		onShow() {
			console.log("onshow");
		},
		mounted() {
			console.log("mounted", this.info.avatar);
			// 生成二维码
			// this.$refs.yuanqiQRCode.make();
		},
		onHide() {
			this.$refs.yuanqiQRCode.clear()
			console.log("onhide");
		},
		onUnload() {
			this.$refs.yuanqiQRCode.clear()
			console.log("onUnload");
		}

	};
</script>

<style lang="scss" scoped>
	.pages_personinfo {
		width: 100%;
		height: 100vh;
		background: #fafafa;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		padding: 20upx;

		.container {
			// height: calc(100vh - 88upx - 100upx);
			width: 100%;
			background: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatar {
				margin-top: 100upx;
				width: 134upx;
				height: 134upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.list {
				margin-top: 100upx;
				padding: 0 50upx;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.item {
					box-sizing: border-box;
					width: 80%;
					display: flex;
					align-items: center;
					padding: 40upx 0;
					border-bottom: 2upx solid #d0ced8;

					.title {
						font-size: 28upx;
						margin-right: 60upx;
					}

					.content {
						font-size: 28upx;
					}
				}
			}

			.code {
				margin-top: 36upx;
				width: 164upx;
			}
		}
	}
</style>
