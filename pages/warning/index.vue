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
				<searchBox :placeholderIn="placeholderIn" @search="search" ref="searchbox"></searchBox>
			</view>
			<!-- loginType==1|2 内容一致 loginTye=3 内容不同-->
			<view class="home_warning_list">

				<view class="warning_container">
					<view class="warning_item" v-for="item in  warnList" :key="item.id"
						@click="goToWarnDetail(item.id,item.cd,currentTab)">
						<!-- 提醒内容 -->
						<view class="warning_content">
							<image :src="workcontent" mode="widthFix" class="warning_icon" />
							<text>提醒内容</text>
							<text v-if="currentTab==0">{{ item.requReport }}</text>
							<text v-else>{{ item.contReport }}</text>
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
						<!-- logintype==3，只有监管测有逾期天数 -->
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
	var performOrgId = ""
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
	export default {
		data() {
			// loginType:1.企业侧 2.服务商侧 3.监管机构侧
			return {
				loginType: 1, //1：企业 2：服务商 3：监管机构
				tabList: ["整改单", "自检", "巡检"],
				currentTab: 0,
				searchflag: false, //是否处于搜索状态
				firstrectify: false, //是否第一次请求整改单数据
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
				// 预警列表整改单参数
				page1: {
					current: 1,
					size: 10,
					performOrgId
				},
				// 预警列表自检巡检参数
				page2: {
					current: 1,
					size: 10,
					performOrgId,
					types: 1, //自检1,巡检2
				},
				// 预警搜索整改单参数
				page3: {
					current: 1,
					size: 10,
					requReport: "", //搜索内容
					// issueDate:""	
				},
				// 预警搜索自检/巡检参数
				page4: {
					current: 1,
					size: 10,
					contReport: "", //搜索内容
					// issueDate:"",	
					types: 1, //自检1,巡检2
				},

				total: 0

			}
		},
		components: {
			searchBox,
			nomore
		},
		methods: {
			// 跳转到预警提醒详情页面
			goToWarnDetail(id, cd, currentTab) {
				console.log("idcd", id, cd);
				uni.navigateTo({
					url: `/pages/warning/detail?id=${id}&cd=${cd}&currentTab=${currentTab}`,

				});
			},
			//处理搜索事件
			search(obj) {
				console.log("子组件传值", obj)
				this.warnList = [];
				if (this.currentTab == 0) {
					this.page3 = {
						current: 1,
						size: 10,
						requReport: obj.cd,

					}
					if (obj.date != '')
						this.page3.issueDate = obj.date

					this.handlesearch1(this.page3)
				} else if (this.currentTab == 1) {
					this.page4 = {
						current: 1,
						size: 10,
						contReport: obj.cd,
						types: 1
					}
					if (obj.date != '')
						this.page4.issueDate = obj.date
					this.handlesearch2(this.page4)
				} else {
					this.page4 = {
						current: 1,
						size: 10,
						contReport: obj.cd,
						types: 2
					}
					if (obj.date != '')
						this.page4.issueDate = obj.date
					this.handlesearch2(this.page4)
				}
			},
			// 处理整改搜索请求
			async handlesearch1(params) {
				let data = await this.api.getWarningSearchRectify(params);
				console.log("搜索", data)
				this.total = data.total;
				// let handledata=data.map(item=> ({...item.dept,...{user:item.users}}))
				this.warnList = [...this.warnList, ...data.records]
				this.searchflag = true;
				console.log("处理搜索请求", data);

			},
			// 处理自检/巡检搜索请求
			async handlesearch2(params) {
				let data = await this.api.getWarningSearchTaskBill(params);
				console.log("搜索", data)
				this.total = data.total;
				// let handledata=data.map(item=> ({...item.dept,...{user:item.users}}))
				this.warnList = [...this.warnList, ...data.records]
				this.searchflag = true;
				console.log("处理搜索请求", data);
			},
			// 切换tab
			changetab(index) {
				// 清空搜索框
				this.$refs.searchbox.date = "";
				this.$refs.searchbox.cd = "";
				this.searchflag = false; //去除搜索状态
				this.currentTab = index
				if (this.currentTab == 0) {
					this.refresh1()
				} else if (this.currentTab == 1) {
					this.refresh2(1)
				} else {
					this.refresh2(2)
				}

			},
			// 刷新重新获取整改单数据
			refresh1() {
				console.log("refresh1")
				this.firstrectify = true;
				this.page1 = {
					current: 1,
					size: 10,
					buildOrgId: performOrgId

				}
				this.warnList = [];
				this.getList1(this.page1)
			},
			// 刷新重新获取自检/巡检数据
			refresh2(types) {
				this.page2 = {
					current: 1,
					size: 10,
					performOrgId,
					types

				}
				this.warnList = [];
				this.getList2(this.page2)
			},
			// 获取预警整改单列表
			async getList1(params) {
				console.log("getlist1")
				let data = await this.api.getWarningRectifyList(params)
				console.log("未删除", data.records)
				// if (this.firstrectify) //删除第一条数据
					data.records.shift()
				console.log("删除第一条", data.records)
				this.warnList = [...this.warnList, ...data.records]
				this.total = data.total;
				console.log("预警整改单列表data", data);
				// this.firstrectify = false;
			},
			// 获取预警自检/巡检列表
			async getList2(params) {
				let data = await this.api.getWarningCheckList(params)
				// data.records.shift()
				this.warnList = [...this.warnList, ...data.records]
				this.total = data.total;
				console.log("预警自检/巡检列表data", data);
			}
		},
		onLoad() {
			performOrgId = uni.getStorageSync("userinfo").dept_id;
			this.loginType = uni.getStorageSync("loginType")
			// 清空搜索框
			// this.$refs.searchbox.date = "";
			// this.$refs.searchbox.cd = "";
			this.searchflag = false;
			// 获取预警提醒整改单列表
			this.refresh1()
		},

		onShow() {
			// loginType==3标题改为逾期预警提醒
			if (this.loginType == 3) {
				uni.setNavigationBarTitle({
					title: "逾期预警提醒",
				});
			}
			console.log("onshow")



		},
		// 下拉重新加载
		onPullDownRefresh() {
			this.warnList = [];
			if (this.currentTab == 0) {
				if (this.searchflag) {
					this.page3.current = 1
					this.handlesearch1(this.page3)
				} else
					this.refresh1()
			} else if (this.currentTab == 1) //自检
			{
				if (this.searchflag) {
					this.page4.current = 1
					this.handlesearch2(this.page4)
				} else
					this.refresh2(1)
			} else //巡检
			{
				if (this.searchflag) {
					this.page4.current = 1
					this.handlesearch2(this.page4)
				} else
					this.refresh2(2)
			}
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			console.log('触底');
			if (this.total <= this.warnList.length) {
				console.log(this.total, this.warnList.length, "fffff");
			} else {
				if (this.searchflag) //搜索分页
				{
					if (this.currentTab == 0) {
						this.page3.current += 1;
						this.handlesearch1(this.page3)
					} else {
						this.page4.current += 1;
						this.handlesearch2(this.page4)
					}
				}
				// 列表分页
				else {
					if (this.currentTab == 0) {
						this.page1.current += 1;
						this.getList1(this.page1)
					} else {
						this.page2.current += 1;
						this.getList2(this.page2)
					}
				}
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
