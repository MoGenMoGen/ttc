<template>
	<!-- 修改密码页面 -->
	<view class="pages_modify_pass">
		<view class="wrapper">
			<image class="cover" :src="modifyPassCover" mode="aspectfit"></image>
			<!-- 表单 开始 -->
			<view class="list">
				<view class="item">
					<image :src="passimg" mode="widthFix" />
					<input type="password" placeholder="请输入原始密码" maxlength="150" placeholder-style="color:#909090"
						v-model="info.oldPassword" />
				</view>
				<view class="item">
					<image :src="passimg" mode="widthFix" />
					<input type="password" placeholder="请输入新密码" maxlength="150" placeholder-style="color:#909090"
						v-model="info.newPassword" />
				</view>
				<view class="item">
					<image :src="passimg" mode="widthFix" />
					<input type="password" placeholder="请输入新密码" maxlength="150" placeholder-style="color:#909090"
						v-model="info.newPassword1" />
				</view>
				<button @click="summit">确定</button>
			</view>
			<!-- 表单 结束 -->
		</view>
	</view>
</template>

<script>
	import modifyPassCover from "static/modifyPassCover.png";
	import passimg from "static/loginPass.png";
	export default {
		data() {
			return {
				passimg,
				modifyPassCover,
				info: {
					newPassword1: "",
					newPassword: "",
					oldPassword: "",
				},
			};
		},
		methods: {
			async summit() {
				let flag = true; //判断信息是否输入完全
				for (let i in this.info) {
					if (!this.info[i]) {
						uni.showToast({
							title: "请将信息输入完全",
							icon: "loading"
						})
						flag = false;
						break;
					}
				}
				if (flag) {
					// 前端先校验两次输入的新密码是否一致
					if(this.info.newPassword!=this.info.newPassword1)
					{
						uni.showToast({
							title:"确认密码不一致",
							icon:"loading",
							duration:2000
						})
					}
					else{
						this.info.id = uni.getStorageSync("user_id")
					let data = await this.api.modifypassword(this.info)
					console.log("修改密码", data);
					if(data.success)
					{    
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/index'
							})
						}, 2000)
					}
					}
					
					
				}

			}
		},
		onLoad() {
			this.loginType = uni.getStorageSync("loginType")

		}
	};
</script>

<style lang="scss" scoped>
	.pages_modify_pass {
		width: 100%;

		.wrapper {
			width: 100%;
			padding-top: 60rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.cover {
				margin: 74upx 0 158upx 0;
				width: 187upx;
				height: 161upx;
			}

			.list {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 530rpx;

				.item {
					width: 100%;
					height: 110rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #d0ced8;

					image {
						width: 40rpx;
						margin-left: 8rpx;
						margin-right: 28rpx;
					}

					input {
						font-size: 28rpx;
					}
				}

				button {
					margin-top: 100rpx;
					width: 100%;
					text-align: center;
					height: 88rpx;
					line-height: 88rpx;
					background: #2b89f7;
					border-radius: 60rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
