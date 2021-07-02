<template>
	<!-- 预警提醒 页面 -->
	<view class="pages_warning">
		<view class="container">
			<view class="warning_tab">
				<view class="warning_tab_item" v-for="(item,index) in tabList" :key="index"
					:class="{ active: currentTab == index } " @click="changetab(index)">
					{{item}}
				</view>
			</view>
			<view class="header">
				<searchBox :placeholderIn="placeholderIn"></searchBox>
			</view>
			<!-- loginType==1|2 内容一致 loginTye=3 内容不同-->
			<view class="home_warning_list">

				<view class="warning_container">
					<view class="warning_item" v-for="item in  warnList" :key="item.id"
						@click="goToWarnDetail(item.id,item.cd)">
						<!-- 提醒内容 -->
						<view class="warning_content">
							<image :src="workcontent" mode="widthFix" class="warning_icon" />
							<text>提醒内容</text><text>{{ item.title }}</text>
						</view>
						<!-- 提醒类型 -->

						<view class="warning_type" v-if="loginType != 3">
							<image :src="type" mode="widthFix" class="warning_icon" />
							<text>提醒类型</text>
							<text
								:class="{ yellow: item.warningState == 0||item.warningState==1, red: item.warningState == 2 }"
								v-if="item.warningState == 2">已逾期提醒</text>
							<text
								:class="{ yellow: item.warningState==0||item.warningState==1, red: item.warningState==2 }"
								v-else>待执行提醒</text>
						</view>
						<!-- logintype==3 提交日期 -->
						<view class="warning_submitDate" v-if="loginType == 3">
							<image :src="clock" mode="widthFix" class="warning_icon" />
							<text>提交日期</text><text>{{ item.issueDate }}</text>
						</view>
						<!-- logintype==3，只有监管测有逾期天数-->
						<!-- 逾期天数 -->
						<view class="warning_overdue" v-if="loginType == 3">
							<image :src="overdue" mode="widthFix" class="warning_icon" />
							<text style="color: #e51937">逾期天数</text>
							<text style="color: #e51937 ">{{ item.nextDate }}</text>
						</view>
						<!-- 提醒日期 -->
						<view class="warning_warnDate">
							<image :src="warnDate" mode="widthFix" class="warning_icon" />
							<text>提醒日期</text><text>{{ item.warningTime }}</text>
						</view>
					</view>
				</view>
			</view>
			<nomore />
		</view>

	</view>

</template>

<!-- app中使用vconsole -->
<!-- <script module="vconsole" lang="renderjs">  
    import VConsole from 'vconsole'  
    new VConsole();  
	console.log("111")
	vconsole.log(222)
</script> -->
<script>
	// 头部引入组件
	import searchBox from "components/searchBox";
	// 引入触底提示组件
	import nomore from "components/nomore";
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
	// 获取dept_id,传给后台筛选数据
	var buildOrgId = uni.getStorageSync("userinfo").dept_id;
	export default {

		data() {
			// loginType:1.企业侧 2.服务商侧 3.监管机构侧
			return {
				loginType: 1, //1：企业 2：服务商 3：监管机构
				tabList: ["整改单", "自检任务", "巡检任务"],
				currentTab: 1,
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
				// 头部组件搜索框默认内容
				placeholderIn: "提醒内容",
				type,
				clock,
				overdue,
				warnDate,
				workcontent,
				page: {
					current: 1,
					size: 2,
					buildOrgId
				}, //分页传参
			}
		},
		components: {
			searchBox,
			nomore
		},
		methods: {
			// 跳转到预警提醒详情页面
			goToWarnDetail(id, cd) {
				console.log("idcd", id, cd);
				uni.navigateTo({
					url: `/pages/warning/detail?id=${id}&cd=${cd}`,

				});
			},
			// 切换tab
			changetab(index) {
				this.currentTab = index
			},
			// 刷新重新获取数据
			refresh() {
				this.page = {
					current: 1,
					size: 3,
					buildOrgId

				}
				this.warnList = [];
				this.getList(this.page)
			},
			// 获取预警提醒列表
			async getList(parms) {
				let data = await this.api.getwarningList(parms)
				data.records.shift()
				this.warnList = [...this.warnList, ...data.records]
				this.total = data.total;
				console.log("预警列表data", this.warnList);
			}
		},
		onLoad() {
			this.loginType = uni.getStorageSync("loginType")

		},

		onShow() {
			// loginType==3标题改为逾期预警提醒
			if (this.loginType == 3) {
				uni.setNavigationBarTitle({
					title: "逾期预警提醒",
				});
			}
			// 获取预警提醒提醒列表
			this.refresh()

		},
		// 下拉重新加载
		onPullDownRefresh() {
			this.refresh()
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			console.log('触底');
			if (this.total <= this.warnList.length) {
				console.log(this.total, this.warnList.length, "fffff");
			} else {
				console.log(this.total, this.warnList.length, "dddddd");
				this.page.current += 1;
				this.getList(this.page);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pages_warning {
		width: 100%;

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx;

			.warning_tab {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				padding: 30upx 0;

				.warning_tab_item {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40rpx;
					color: #909090;
					opacity: 1;
				}

				.active {
					position: relative;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 600;
					line-height: 44rpx;
					color: #303030;
					opacity: 1;
					transition: 0.3s;   
				}

				.active::after {
					position: absolute;
					bottom: -28rpx;
					left: 50%;
					transform: translateX(-50%);
					content: "";
					width: 50rpx;
					height: 6rpx;
					background: rgba(43, 137, 247, 0.67);
					opacity: 1;
					border-radius: 6rpx;
				}
			}

			.header {}

			.home_warning_list {
				width: 100%;

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
		}
	}
</style>
