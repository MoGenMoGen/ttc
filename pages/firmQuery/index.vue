<template>
	<!-- 企业查页面 -->
	<view class="pages_firmquery_tab">
		<!--自定义 navbar -->
		<view class="navbar">
			企业查
		</view>
		<view class="container">
			<view class="search_bar">
				<view class="inputbox">
					<image :src="search" mode="widthFix"></image>
					<input type="text" placeholder="请输入企业名称、联系人等信息查询" maxlength="15" placeholder-style="color:#909090"
						v-model="info" />
				</view>
				<view class="btn_search" @click="handlesearch">
					搜索
				</view>
			</view>
			<view class="firm_query_container">
				<view class="firm_query_item" v-for="item in queryList" :key="item.id" @click="GoToDetail(item.id)">
					<view class="item_container">
						<view class="item_title">公司名称:</view>
						<view class="item_content">{{item.name}}</view>
					</view>
					<view class="item_container">
						<view class="item_title">联系人:</view>
						<view class="item_content">{{item.contact}}</view>
					</view>
					<view class="item_container">
						<view class="item_title">联系电话:</view>
						<view class="item_content">{{item.tel}}</view>
					</view>
					<view class="item_container">
						<view class="item_title">企业码:</view>
						<view class="item_content">
							<image :src="item.corcode" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<nomore />
		</view>
		<tabbar :loginType="loginType" :tabIndex='2'> </tabbar>
	</view>
</template>

<script>
	import tabbar from "components/tabbar";
	// 引入触底提示组件
	import nomore from "components/nomore";
	import corcode from "static/corcode.png";
	import search from "static/search.png";
	export default {
		data() {
			return {
				info: "",
				loginType: 2,
				search,
				// 企业查询列表
				queryList: [{
						//公司名称
						name: "广知科技有限公司",
						//联系人
						contact: "张章",
						tel: "13900110000", //联系电话
						corcode: corcode, //企业码
						id: 0
					},
					{
						//公司名称
						name: "广知科技有限公司",
						//联系人
						contact: "张章",
						tel: "13900110000", //联系电话
						corcode: corcode, //企业码
						id: 1
					},
					{
						//公司名称
						name: "广知科技有限公司",
						//联系人
						contact: "张章",
						tel: "13900110000", //联系电话
						corcode: corcode, //企业码
						id: 2
					},
				],
			}
		},
		components: {
			tabbar,
			nomore,

		},
		methods: {
			// 切换tab 
			tabChange(path) {
				uni.reLaunch({
					url: path,
					success() {
						console.log("success4");
					},
					fail(err) {
						console.log("fail", err);
					},
				});
			},
			// 搜索功能
			handlesearch() {
				console.log("搜索按钮触发");
			},
			// 进入详情
			GoToDetail(id) {
				console.log("detail");
				uni.navigateTo({
					url: `/pages/firmQuery/detail?id=${id}`
				})
			}
		},
		onLoad() {
			// 从缓存中获取loginType,角色信息
			this.loginType = uni.getStorageSync("loginType")
		},
		onShow() {  
			//隐藏默认tabbar显示自定义tabbar
			uni.hideTabBar({
				animation: false,

			})
		},
	}
</script>

<style lang="scss" scoped>
	.pages_firmquery_tab {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #fafafa;

		.navbar {
			text-align: center;
			height: 88upx;
			line-height: 88upx;
			width: 100%;
			margin-top: var(--status-bar-height);
			font-size: 34rpx;
			color: #000000;
		}

		.container {
			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 40upx 20upx;

			.search_bar {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30upx;
				height: 64upx;

				.inputbox {
					box-sizing: border-box;
					border-radius: 12upx;
					background-color: #FFF;
					padding: 0 24upx;
					display: flex;
					align-items: center;
					width: 560upx;
					height: 64upx;
					line-height: 64upx;

					input {
						width: 448upx;
						height: 40upx;
						font-size: 28upx;
					}

					image {
						width: 32upx;
						margin-right: 22upx;
					}
				}

				.btn_search {
					width: 132upx;
					height: 64upx;
					background: #2B89F7;
					box-shadow: 0px 6upx 12upx rgba(43, 137, 247, 0.26);
					opacity: 1;
					border-radius: 12upx;
					line-height: 64upx;
					text-align: center;
					font-size: 24upx;
					color: #FFFFFF;
				}
			}

			.firm_query_container {
				width: 100%;
				display: flex;
				flex-direction: column;

				.firm_query_item {
					width: 100%;
					box-sizing: border-box;
					background: #ffffff;
					box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
					opacity: 1;
					border-radius: 12px;
					padding: 20upx 28upx 0 28upx;
					margin-bottom: 20upx;

					.item_container {
						display: flex;
						padding: 20upx 14upx;
						border-bottom: 2upx solid #ecf0f1;

						.item_title {
							width: 140upx;
							height: 40upx;
							line-height: 40upx;
							color: #303030;
							font-size: 28upx;

						}

						.item_content {
							margin-left: 68upx;
							color: #303030;
							font-size: 28upx;

							image {
								width: 122upx;
							}
						}
					}

					.item_container:last-child {
						border: none;
					}
				}
			}
		}

	}
</style>
