<template>
	<!-- 企业查询详情页面 -->
	<view class="pages_warn_detail">
		<view class="container">

			<view class="list">
				<view class="item">
					<text class="title">公司名称</text>
					<text class="content">{{ info.fullName }}</text>
				</view>

				<view class="item">
					<text class="title">公司地址</text>
					<text class="content">{{ info.addr }}</text>
				</view>
				<view class="item">
					<text class="title">联系人 </text>
					<text class="content">{{ users}}</text>
				</view>
				<view class="item">
					<text class="title">联系电话</text>
					<text class="content">{{ phones}}</text>
				</view>

				<view class="item">
					<!-- loginType==2 -->
					<!-- <text class="title" v-if="loginType==2">自检任务</text> -->
					<!-- loginType==3 -->
					<text class="title border" @click="handleSelfCheck">自检任务</text>
					<text class="content red">{{ info.taskBillCount }}</text>
				</view>
				<view class="item">
					<text class="title border" @click="handleRedify">整改单数</text>
					<text class="content red">{{ info.rectifyBillCount }}</text>
				</view>

				<view class="item">
					<text class="title">预警提醒</text>
					<text class="content red">{{ info.warningCount }}</text>
				</view>

				<view class="item">
					<text class="title">企业码</text>
					<!-- <image :src="info.code" mode="widthFix"></image> -->
					<yuanqi-qr-code 
					ref="yuanqiQRCode" 
					:text="'/pages/firmQuery/detail?id='+id" 
					:size="size"
					:color="color(info.completeState)"></yuanqi-qr-code>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				size: 200,
				logo: "/static/avatar.png",
				id: "",
				info: {
					// 公司名称
					fullName: "摩根电器有限公司",
					//公司地址
					addr: "宁波镇海 329创业社区二楼",
					completeState: "", //1:绿码，2：黄码，3：红码
					user: [{
						phone: "",
						name: ""
					}],
					// // 联系人 
					// contactor: "摩根",
					// // 联系电话
					// tel: "15185161111",
					// 自检任务
					taskBillCount: 0,
					// 整改单数
					rectifyBillCount: 0,
					// 预警提醒
					warningCount: 0,
				},
				// loginType只能为2/3
				loginType: 2
			};
		},
		methods: {
			// 处理自检任务
			handleSelfCheck() {
				uni.reLaunch({
					url: `/pages/selfCheck/index?name=firmdetail&id=${this.id}`
				})

			},
			// 处理整改单
			handleRedify() {
				uni.reLaunch({
					url: `/pages/rectify/index?id=${this.id}`
				})
			}
		},
		computed: {
			users() {
				return this.info.user.slice(0, 3).map(item => item.name).join("、");
			},
			phones() {
				return this.info.user.slice(0, 3).map(item => item.phone).join("、");
			},
			// 二维码前景色
			color() {
				return function(state) {
					if (state == 2)
						return "#F1C345"
					else if (state == 1)
						return "#2B801C"
					else if (state == 3)
						return "#DB2222"
					else return "#000000"	
					
				}
			}
		},
		async onLoad(e) {
			this.id = e.id;
			// 从缓存中获取loginType,角色信息
			this.loginType = uni.getStorageSync("loginType")

			let data = await this.api.getFirmQueryDetail({
				id: this.id
			})
			this.info = data;
			this.$nextTick(function(){
				this.$refs.yuanqiQRCode.make();
			})
			console.log("企业查详情", this.info);
			console.log("用户", this.users, this.phones);
		},
		mounted() {
			console.log("mounted");
			// 生成二维码
			// let coderefs = [];
			// if (this.$refs.yuanqiQRCode)
			// 	coderefs = this.$refs.yuanqiQRCode;
			// console.log("111", coderefs);
			// if (coderefs.length > 0) {
			// 	for (let i = 0; i < coderefs.length; i++)
			// 		this.$refs.yuanqiQRCode[i].make();
			// }

		},
	}
</script>

<style lang="scss">
	.pages_warn_detail {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		height: 100vh;
		background-color: #fafafa;


		.container {
			width: 100%;
			box-sizing: border-box;

			.list {
				background-color: #fff;
				padding: 0 42upx;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;

				.item {
					box-sizing: border-box;
					width: 100%;
					display: flex;
					// align-items: center;
					padding: 30upx 0;
					border-bottom: 2upx solid #d0ced8;

					.border {
						border-bottom: 2upx solid rgba(0, 0, 0, .5);
					}

					.red {
						color: #E51937
					}

					.title {
						font-size: 28upx;
						margin-right: 60upx;
						width: 112upx;
						height: 40upx;
						line-height: 40upx;
						color: #303030;
					}

					.content {
						font-size: 28upx;
						max-width: 456upx;
					}
				}

				.item:last-child {
					border: none;

					image {
						width: 173upx;
					}
				}
			}
		}
	}
</style>
