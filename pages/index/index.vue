<template>
	<view class="pages_home_tab">
		<!--自定义 navbar -->
		<view class="navbar">
			首页
		</view>
		<!-- 轮播图 开始 -->

		<view class="pages_home_container">

			<swiper class="swiper" :indicator-dots="true" autoplay="true" interval="5000" duration="500"
				indicator-color="white" indicator-active-color="red">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<image :src="item" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<!-- 轮播图 结束 -->
			<!-- 图标栏 开始 -->
			<view class="home_icon">
				<view class="icon_list" v-if="loginType == 2">
					<!-- loginType==2 服务商 一排放四个 -->
					<view class="icon_item_one" v-for="(item, index) in iconBar2" :key="index"
						@click="toPage(item.path,item.flag,item.tabIndex)">
						<image :src="item.img" mode="widthFix" />
						<text>{{ item.title }}</text>
					</view>
				</view>
				<view class="icon_list" v-else-if="loginType==1">
					<!-- loginType==1 一排放三个 -->
					<view class="icon_item_two" v-for="(item, index) in iconBar1"
						:key="index" @click="toPage(item.path,item.flag,item.tabIndex)">
						<image :src="item.img" mode="widthFix" />
						<text>{{ item.title }}</text>
					</view>
				</view>
				<view class="icon_list" v-else>
					<!-- loginType==3 一排放三个 -->
					<view class="icon_item_two" v-for="(item, index) in iconBar3"
						:key="index" @click="toPage(item.path,item.flag,item.tabIndex,item.special)">
						<image :src="item.img" mode="widthFix" />
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>
			<!-- 图标栏 结束 -->

			<!-- 预警提醒 开始 -->
			<!-- loginType==1|2 内容一致 loginTye=3 内容不同 -->
			<view class="home_warning_list">
				<view class="warning_info">
					<view class="warning_info_text">
						预警
						<text style="color: #303030">提醒</text>
					</view>
					<text class="warning_info_more" @click="goToWarning">查看更多</text>
				</view>
				<view class="warning_container">
					<view class="warning_item" v-for="item in  warnList" :key="item.id"
						@click="goToWarnDetail(item.id)">
						<!-- 提醒内容 -->
						<view class="warning_content">
							<image :src="workcontent" mode="widthFix" class="warning_icon" />
							<text>提醒内容</text><text>{{ item.content }}</text>
						</view>
						<!-- 提醒类型 -->
						<!-- logintype==3,监管侧没有提醒类型 -->
						<view class="warning_type" v-if="loginType != 3">
							<image :src="type" mode="widthFix" class="warning_icon" />
							<text>提醒类型</text><text
								:class="{ yellow: item.status == 0, red: item.status == -1 }">{{ item.type }}</text>
						</view>
						<!-- 提交日期 -->
						<view class="warning_submitDate">
							<image :src="clock" mode="widthFix" class="warning_icon" />
							<text>提交日期</text><text>{{ item.clock }}</text>
						</view>
						<!-- logintype==3，只有监管测有逾期天数和提醒日期 -->
						<!-- 逾期天数 -->
						<view class="warning_overdue" v-if="loginType == 3">
							<image :src="overdue" mode="widthFix" class="warning_icon" />
							<text style="color: #e51937">逾期天数</text><text
								style="color: #e51937">{{ item.overdue }}</text>
						</view>
						<!-- 提醒日期 -->
						<view class="warning_warnDate" v-if="loginType == 3">
							<image :src="warnDate" mode="widthFix" class="warning_icon" />
							<text>提醒日期</text><text>{{ item.warnDate }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 预警提醒 结束 -->
			<!-- 企业查 开始 -->
			<!-- loginType==3监管侧独有 -->
			<view class="home_firm_query">
				<view class="firm_query_info">
					<view class="firm_query_info_text">
						企业
						<text style="color: #303030">查询</text>
					</view>
					<text class="firm_query_info_more" @click="goTofirmQuery">查看更多</text>
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
			</view>
			<nomore />
			<!-- 企业查 结束 -->
		</view>

		<tabbar :loginType="loginType" :tabIndex='0'> </tabbar>
	</view>
</template>


<script>
	// 引入触底提示组件
	import nomore from "components/nomore";
	import tabbar from "components/tabbar";
	import bg from "static/bg.png";
	// 企业查询
	import iconFirmQuery from "static/iconFirmQuery.png";
	// 企业自检
	import iconSelfCheck from "static/iconSelfCheck.png";
	// 整改单
	import iconRedify from "static/iconRedify.png";
	// 巡检任务
	import iconInspection from "static/iconInspection.png";
	// 预警提醒
	import iconWarning from "static/iconWarning.png";
	// 提醒类型
	import type from "static/type.png";
	// 提交日期
	import clock from "static/clock.png";
	// 逾期天数
	import overdue from "static/overdue.png";
	// 提醒日期
	import warnDate from "static/warnDate.png";
	// 提醒内容
	import workcontent from "static/workcontent.png";
	// 企业码
	import corcode from "static/corcode.png";
	export default {
		data() {
			// loginType:1.企业侧 2.服务商侧 3.监管机构侧
			return {
				current: 1, //tab下标
				loginType: 1, //1：企业 2：服务商 3：监管机构
				bg,
				iconFirmQuery,
				iconSelfCheck,
				iconRedify,
				iconInspection,
				iconWarning,
				type,
				clock,
				overdue,
				warnDate,
				workcontent,
				corcode,
				swiperList: [bg, bg, bg],
				// 对应loginType1,2,3
				iconBar1: [{
						title: "自检任务",
						img: iconSelfCheck,
						path: "/pages/selfCheck/index", //跳转地址
						flag: true, //是否是tabbar页面
						tabIndex: 1
					},
					{
						title: "整改单",
						img: iconSelfCheck,
						path: "/pages/rectify/index",
						flag: true,
						tabIndex: 2

					},
					{
						title: "预警提醒",
						img: iconWarning,
						path: "/pages/warning/index",
						flag: false,
						tabIndex: 0 //不是tab页tabIndex随意
					},
				],
				iconBar2: [{
						title: "企业查询",
						img: iconFirmQuery,
						path: "/pages/firmQuery/index",
						flag: true,
						tabIndex: 2
					},
					{
						title: "巡检任务",
						img: iconInspection,
						path: "/pages/inspection/index",
						flag: false,
						tabIndex: 0

					},
					{
						title: "整改单",
						img: iconRedify,
						path: "/pages/rectify/index",
						tabIndex: 1,
						flag: true,
					},
					{
						title: "预警提醒",
						img: iconWarning,
						path: "/pages/warning/index",
						tabIndex: 0,

						flag: false,
					},
				],
				iconBar3: [{
						title: "企业查询",
						img: iconFirmQuery,
						tabIndex: 2,

						path: "/pages/firmQuery/index",
						flag: true,
					},
					{
						title: "企业自检",
						img: iconSelfCheck,
						path: "/pages/selfCheck/index",
						flag: false,
						tabIndex: 0,
						special:true

					},
					{
						title: "整改单",
						img: iconRedify,
						path: "/pages/rectify/index",
						flag: true,
						tabIndex: 1

					},
					{
						title: "巡检任务",
						img: iconInspection,
						path: "/pages/inspection/index",
						flag: false,
						tabIndex: 0,

					},
					{
						title: "预警提醒",
						img: iconWarning,
						path: "/pages/warning/index",
						flag: false,
						tabIndex: 0,

					},
				],
				//预警提醒列表
				warnList: [{
						//提醒类型
						type: "待执行提醒",
						status: 0, //表示待执行
						//提醒内容
						content: "【广知科技有限公司】消防器材未按照标准规范摆放消防通道有障碍物存放",
						overdue: "4天", //逾期天数
						warnDate: "2020-12-15", //提醒日期
						clock: "2020-12-15", //提交日期
					},
					{
						type: "待执行提醒",
						status: 0, //表示待执行
						content: "【广知科技有限公司】消防器材未按照标准规范摆放消防通道有障碍物存放",
						overdue: "4天",
						warnDate: "2020-12-15",
						clock: "2020-12-15",
					},
					{
						type: "已逾期提醒",
						status: -1, //表示已逾期
						content: "【广知科技有限公司】消防器材未按照标准规范摆放消防通道有障碍物存放",
						overdue: "4天",
						warnDate: "2020-12-15",
						clock: "2020-12-15",
					},
				],
				// 企业查询列表
				queryList: [{
						//公司名称
						name: "广知科技有限公司",
						//联系人
						contact: "张章",
						tel: "13900110000", //联系电话
						corcode: corcode, //企业码
					},
					{
						//公司名称
						name: "广知科技有限公司",
						//联系人
						contact: "张章",
						tel: "13900110000", //联系电话
						corcode: corcode, //企业码
					},
					{
						//公司名称
						name: "广知科技有限公司",
						//联系人
						contact: "张章",
						tel: "13900110000", //联系电话
						corcode: corcode, //企业码
					},
				],
			};
		},
		methods: {
			// 切换tab
			tabChange(path) {
				// if(this.current!=index)
				//     this.current=index;
				console.log(path);
				uni.reLaunch({
					url: path,
					success() {
						console.log("success1");
					},
					fail(err) {
						console.log("fail", err);
					},
				});
			},
			// 图标栏的按钮点击跳转页面
			toPage(path, flag, tabIndex,special) {
				// path：跳转地址，flag:是否是自定义tab
				// tabIndex tab下标,不是tab页随意传值
				console.log(path, flag, tabIndex);
				if (flag) {
					uni.setStorageSync('tabIndex', tabIndex)
					uni.reLaunch({
						url: path,
					});
				} 
				else if(!flag&&special)
				{
					uni.reLaunch({
						url:path
					})
				}
				else 
				{
					uni.navigateTo({
						url: path,
					});
				}
					
			},
			// 跳转到预警提醒主页面
			goToWarning() {
				this.toPage("/pages/warning/index", false, 0)
			},
			// 跳转到预警提醒详情页面
			goToWarnDetail(id) {
				uni.navigateTo({
					url: `/pages/warning/detail?id=${id}`,
				});
			},
			// 跳转到企业查询主页面
			goTofirmQuery() {
				this.toPage("/pages/firmQuery/index", true, 2)
			},
			// 进入企业查询详情
			GoToDetail(id) {
				console.log("detail");
				uni.navigateTo({
					url: `/pages/firmQuery/detail?id=${id}`
				})
			}
		},
		components: {
			tabbar,
			nomore
		},
		onLoad() {
			console.log("onload")
			uni.setStorageSync('tabIndex', 0)
			this.loginType=uni.getStorageSync("loginType")

		},
		onShow() {
			//隐藏默认tabbar显示自定义tabbar
			uni.hideTabBar({
				animation: false,

			})
		},
	};
</script>
<style lang="scss" scoped>
	.pages_home_tab {
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

		.pages_home_container {
			background-color: #fff;
			width: 100%;
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx;
			box-sizing: border-box;

			.swiper {
				width: 100%;
				height: 400upx;

				swiper-item {
					width: 100%;
					height: 400upx;

					image {
						box-sizing: border-box;
						width: 100%;
						height: 100%;
						border-radius: 12upx;
					}
				}
			}

			.home_icon {
				width: 100%;

				.icon_list {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					width: 100%;

					.icon_item_one {
						margin-top: 10rpx;
						width: 25%;
						display: flex;
						flex-direction: column;
						align-items: center;

						image {
							width: 152rpx;
						}

						text {
							font-size: 24upx;
						}
					}

					.icon_item_two {
						margin-top: 10rpx;
						width: 33.3%;
						display: flex;
						flex-direction: column;
						align-items: center;

						image {
							width: 152rpx;
						}

						text {
							font-size: 24upx;
						}
					}
				}
			}

			.home_warning_list {
				width: 100%;

				.warning_info {
					box-sizing: border-box;
					width: 100%;
					padding: 56upx 40upx 20upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.warning_info_text {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #2b89f7;
						opacity: 1;

						text {
							font-size: 32upx;
						}
					}

					.warning_info_more {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #909090;
						opacity: 1;
					}
				}

				.warning_container {
					width: 100%;
					display: flex;
					flex-direction: column;

					.warning_item {
						background: #ffffff;
						box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
						opacity: 1;
						border-radius: 12px;
						padding: 36upx;
						margin-bottom: 20upx;

						.warning_type {
							width: 100%;
							margin-bottom: 20upx;
							display: flex;
							align-items: center;

							.warning_icon {
								width: 38upx;
								margin-right: 8upx;
							}

							text:first-of-type {
								margin-right: 20upx;
							}

							text {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 400;
								opacity: 1;
								color: #303030;
							}

							.yellow {
								color: #f1c345;
							}

							.red {
								color: #e51937;
							}
						}

						.warning_content {
							box-sizing: border-box;
							width: 100%;
							margin-bottom: 20upx;
							display: flex;
							align-items: top;

							.warning_icon {
								width: 38upx;
								margin-right: 8upx;
							}

							text:nth-of-type(1) {
								margin-right: 20upx;
							}

							text {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 400;
								opacity: 1;
								color: #303030;
							}

							text:last-child {
								max-width: 456upx;

							}
						}

						.warning_submitDate {
							width: 100%;
							margin-bottom: 20upx;
							display: flex;
							align-items: center;

							.warning_icon {
								width: 38upx;
								margin-right: 8upx;
							}

							text {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 400;
								opacity: 1;
								color: #303030;
							}

							text:nth-of-type(1) {
								margin-right: 20upx;
							}
						}

						view.warning_overdue {
							width: 100%;
							margin-bottom: 20upx;
							display: flex;
							align-items: center;

							.warning_icon {
								width: 38upx;
								margin-right: 8upx;
							}

							text:nth-of-type(1) {
								margin-right: 20upx;
							}

							text {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 400;
								opacity: 1;
								color: #303030;
							}
						}

						view.warning_warnDate {
							width: 100%;
							display: flex;
							align-items: center;

							.warning_icon {
								width: 38upx;
								margin-right: 8upx;
							}

							text:nth-of-type(1) {
								margin-right: 20upx;
							}

							text {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 400;
								opacity: 1;
								color: #303030;
							}
						}
					}
				}
			}

			.home_firm_query {
				width: 100%;

				.firm_query_info {
					box-sizing: border-box;
					width: 100%;
					padding: 56upx 40upx 20upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.firm_query_info_text {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #2b89f7;
						opacity: 1;

						text {
							font-size: 32upx;

						}
					}

					.firm_query_info_more {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #909090;
						opacity: 1;
					}
				}

				.firm_query_container {
					width: 100%;
					display: flex;
					flex-direction: column;

					.firm_query_item {
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
	}
</style>
