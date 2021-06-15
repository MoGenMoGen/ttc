<template>
	<!-- 我的页面 -->
	<view class="pages_profile_tab">
		<view class="profile_container">
			<!-- 个人中心头部背景部分 开始 -->
			<view class="profile_info_bg">
				<view class="profile_info" @click="goToperson">
					<view style="display: flex">
						<view class="avatar">
							<image :src="avatar" mode="aspectFill" />
						</view>
						<view class="info_detail">
							<view class="myinfo">
								<text class="name">{{ info.name }}</text>
								<text class="tel">{{ info.tel }}</text>
							</view>
							<view class="film_name">{{ info.film }}</view>
						</view>
					</view>
					<!-- loginType==1才有 -->
					<view style="display: flex; align-items: center">
						<view class="code" v-if="loginType == 1">
							<image :src="code" mode="widthFix" />
						</view>
						<view class="arrow">
							<image :src="arrow" mode="widthFix" style="width: 32upx" />
						</view>
					</view>
				</view>
			</view>
			<!-- 个人中心头部背景部分 结束 -->
			<!-- 任务信息统计 开始 -->
			<view class="queryinfo">
				<view class="querydetail" @click="handlework1">
					<view>{{ dataone }}</view>
					<view>{{ workone }}</view>
				</view>
				<view class="querydetail" @click="handlework2">
					<view>{{ datatwo }}</view>
					<view>{{ worktwo }}</view>
				</view>
				<view class="querydetail" @click="handlework3">
					<view>{{ datathree }}</view>
					<view>{{ workthree }}</view>
				</view>
			</view>
			<!-- 任务信息统计 结束 -->
			<!-- loginType==2 echart曲线图 开始 -->
			<view class="graph" v-if="loginType == 2">
				<view class="content">
					<!-- #ifdef APP-PLUS || H5 -->
					<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts"
						class="echarts"></view>
					<!-- <button @click="changeOption">更新数据</button> -->
					<!-- #endif -->
					<!-- #ifndef APP-PLUS || H5 -->
					<view>非 APP、H5 环境不支持</view>
					<!-- #endif -->
				</view>
			</view>
			<!-- echart曲线图 结束  -->
			<!-- loginType==3 安全生产 开始-->
			<view class="procition" v-if="loginType == 3">
				<text>已安全生产</text><text>{{ info.productday }}天</text>
			</view>
			<!-- loginType==3 安全生产 结束-->
			<!-- 功能列表 开始 -->
			<view class="list">
				<view class="item" @click="goTodatabase">
					<view class="item_icon">
						<image :src="database" mode="widthFix" />
						<text>资料库</text>
					</view>
					<view class="righticon">
						<image :src="arrow2" mode="widthFix" />
					</view>
				</view>
				<view class="item" @click="goTohelp">
					<view class="item_icon">
						<image :src="help" mode="widthFix" />
						<text>帮助中心</text>
					</view>
					<view class="righticon">
						<image :src="arrow2" mode="widthFix" />
					</view>
				</view>
				<view class="item" style="border: none" @click="goTomodifyPass">
					<view class="item_icon">
						<image :src="modifyPass" mode="widthFix" />
						<text>修改密码</text>
					</view>
					<view class="righticon">
						<image :src="arrow2" mode="widthFix" />
					</view>
				</view>
			</view>
			<!-- 功能列表 结束 -->
			<!-- 退出 开始 -->
			<view class="exit" @click="exit">退出</view>
			<!-- 退出 结束 -->
		</view>

		<tabbar :loginType="loginType" :tabIndex=3 @tabChange="tabChange"> </tabbar>
	</view>
</template>

<script>
	import tabbar from "components/tabbar";
	// 头像
	import avatar from "static/avatar.png";
	import code from "static/corcode.png";
	import arrow from "static/arrow.png";
	import arrow2 from "static/arrow2.png";
	// 资源库
	import database from "static/database.png";
	// 帮助中心
	import help from "static/help.png";
	// 修改密码
	import modifyPass from "static/modifyPass.png";
	export default {
		data() {
			return {
				current: 0, //tab下标
				avatar,
				code,
				arrow,
				database,
				help,
				modifyPass,
				arrow2,
				loginType: 2,
				info: {
					name: "雨新斯",
					tel: "13590001234",
					film: "广州史密斯广告制作有限公司",
					// 企业一侧
					selfwork: 58, //自检任务
					redify: 58, //整改单
					warn: 58, //预警提醒
					// 服务商一侧
					jrredify: 58, //今日整改数
					dyredify: 158, //当月整改数
					redifyrate: 0.24, //整改率
					// 监管机构一侧
					jrinspect: 36, //今日巡检数
					dyinspect: 12, //当月巡检数
					inspection: 0.24, //巡检率
					productday: 896,
				},
				// echarts配置
				option: {
					color: ['#5470C6', '#EE6666'],

					tooltip: {
						trigger: 'none',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						top: 0,
						bottom: 2
					},
					xAxis: [{
							type: 'category',
							show: false,
							axisTick: {
								alignWithLabel: true
							},
							axisLine: {
								onZero: false,
								lineStyle: {
									color: '#EE6666'
								}
							},
							axisPointer: {
								label: {
									formatter: function(params) {
										return '降水量  ' + params.value +
											(params.seriesData.length ? '：' + params.seriesData[0].data : '');
									}
								}
							},
							data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8',
								'2016-9', '2016-10', '2016-11', '2016-12'
							]
						},
						{
							type: 'category',
							show: false,
							axisTick: {
								alignWithLabel: true
							},
							axisLine: {
								onZero: false,
								lineStyle: {
									color: '#5470C6'
								}
							},
							axisPointer: {
								label: {
									formatter: function(params) {
										return '降水量  ' + params.value +
											(params.seriesData.length ? '：' + params.seriesData[0].data : '');
									}
								}
							},
							data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8',
								'2015-9', '2015-10', '2015-11', '2015-12'
							]
						}
					],
					yAxis: [{
						type: 'value',
						show: false
					}],
					series: [{
							name: '2015 降水量',
							type: 'line',
							xAxisIndex: 1,
							smooth: true,
							emphasis: {
								focus: 'series'
							},
							areaStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'blue' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'white' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								opacity: 0.2
							},
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '2016 降水量',
							type: 'line',
							smooth: true,
							emphasis: {
								focus: 'series'
							},
							areaStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'orange' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'white' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								opacity: 0.2
							},
							data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 181.6, 46.6, 55.4, 18.4, 10.3, 0.7]
						}
					]
				}
			};
		},
		computed: {
			// 自检任务、今日整改数、今日巡检数
			workone() {
				return this.loginType == 1 ?
					"自检任务" :
					this.loginType == 2 ?
					"今日整改数" :
					"今日巡检数";
			},
			// 整改单、当月整改数、当月巡检数
			worktwo() {
				return this.loginType == 1 ?
					"整改单" :
					this.loginType == 2 ?
					"当月整改数" :
					"当月巡检数";
			},
			// 预警提醒、整改率、巡检率
			workthree() {
				return this.loginType == 1 ?
					"预警提醒" :
					this.loginType == 2 ?
					"整改率" :
					"巡检率";
			},
			// info.selfwork info.jrredify info.jrinspect
			dataone() {
				return this.loginType == 1 ?
					this.info.selfwork :
					this.loginType == 2 ?
					this.info.jrredify :
					this.info.jrinspect;
			},
			// info.redify info.dyredify info.dyinspect
			datatwo() {
				return this.loginType == 1 ?
					this.info.redify :
					this.loginType == 2 ?
					this.info.dyredify :
					this.info.dyinspect;
			},
			// info.warn info. redifyrate info.inspection
			datathree() {
				return this.loginType == 1 ?
					this.info.warn :
					this.loginType == 2 ?
					this.info.redifyrate :
					this.info.inspection;
			},
		},
		methods: {
			tabChange(path) {
				// if(this.current!=index)
				//     this.current=index;
				// console.log(path);
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
			// 小数变百分数
			turn(num) {
				return num * 100 + "%";
			},
			// 处理任务1
			handlework1() {
				if (this.loginType == 1) {
					uni.setStorageSync("tabIndex", 1);
					uni.reLaunch({
						url: "/pages/selfCheck/index",
					});
				} else if (this.loginType == 2)
					uni.navigateTo({
						url: "/pages/inspection/index",
					});
				else
					uni.navigateTo({
						url: "/pages/selfCheck/index",
					});
			},
			// 处理任务2
			handlework2() {
				if (this.loginType == 1) {
					uni.setStorageSync("tabIndex", 2);
					uni.reLaunch({
						url: "/pages/rectify/index",
					});
				} else if (this.loginType == 2) {
					uni.setStorageSync("tabIndex", 1);
					uni.reLaunch({
						url: "/pages/rectify/index",
					});
				} else {
					uni.setStorageSync("tabIndex", 1);
					uni.reLaunch({
						url: "/pages/rectify/index",
					});
				}
			},
			// 处理任务3
			handlework3() {
				console.log(1111);
				uni.navigateTo({
					url: "/pages/warning/index",
				});
			},
			// 进入个人中心
			goToperson() {
				uni.navigateTo({
					url: '/pages/profile/personinfo'
				});
			},
			// 进入资料库
			goTodatabase() {
				uni.navigateTo({
					url: '/pages/profile/database'
				});
			},
			// 进入帮助中心
			goTohelp() {
				uni.navigateTo({
					url: '/pages/profile/help'
				});
			},
			// 进入修改密码
			goTomodifyPass() {
				uni.navigateTo({
					url: '/pages/profile/modifyPass'
				});
			},
			// 退出
			exit() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			},
		},


		components: {
			tabbar,
		},
		beforeMount() {
			this.info.redifyrate = this.turn(this.info.redifyrate);
			this.info.inspection = this.turn(this.info.inspection);
		},
	};
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages_profile_tab {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		// align-items: center;
		.profile_container {
			padding-bottom: 80upx;

			background: #fafafa;
			width: 100%;
			// margin-height:581upx;
			// height: calc(100vh - 186upx);
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			display: flex;
			flex-direction: column;
			align-items: center;

			.profile_info_bg {
				padding: 200upx 0;
				width: 100%;
				// height: 1000upx;
				background: #2b89f7;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.profile_info {
					width: 90%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;

					// align-content: center;
					.avatar {
						width: 134upx;
						height: 134upx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}

						margin-right: 28upx;
					}

					.info_detail {
						// height: 74upx;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.myinfo {
							display: flex;
							align-items: center;

							.name {
								font-size: 28upx;
								font-weight: 600;
								color: #ffffff;
								margin-right: 4upx;
							}

							.tel {
								font-size: 24upx;
								color: #ffffff;
							}
						}

						.film_name {
							font-size: 24upx;
							color: #ffffff;
						}
					}

					.code {
						width: 64upx;
						float: right;
						margin-right: 20upx;

						image {
							width: 100%;
						}
					}

					.arrow {
						font-size: 24upx;
						color: #ffffff;
					}
				}
			}

			.queryinfo {
				background: #fff;
				width: 90%;
				margin-top: -92upx;
				border-radius: 20upx;
				display: flex;
				justify-content: space-around;
				box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);

				.querydetail {
					display: flex;
					flex-direction: column;

					view:first-child {
						display: flex;
						justify-content: center;
						font-size: 40upx;
						padding-top: 36upx;
						padding-bottom: 10upx;
						font-weight: 600;
						color: #303030;
					}

					view:last-child {
						font-size: 34upx;
						padding-bottom: 36upx;
					}
				}
			}

			.graph {
				margin:10upx 0;
				width: 100%;

				.content {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					.echarts {
						margin-top: 20upx;
						width: 100%;
						height: 270upx;
					}
				}
			}

			.procition {
				box-sizing: border-box;
				box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
				background: #fff;
				margin-top: 20upx;
				padding: 20upx 40upx;
				width: 90%;

				text:first-child {
					margin-right: 34upx;
					font-size: 28upx;
				}

				text:last-child {
					color: #ff0000;
					font-size: 28upx;
				}
			}

			.list {
				box-sizing: border-box;
				background: #fff;
				margin-top: 20upx;
				padding: 0 40upx;
				width: 90%;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);

				.item {
					box-sizing: border-box;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 40upx 20upx;
					border-bottom: 2upx solid #d0ced8;

					.item_icon {
						display: flex;
						align-items: center;

						image {
							width: 32upx;
						}

						text {
							margin-left: 16upx;
							font-size: 28upx;
						}
					}

					.righticon {
						image {
							width: 32upx;
						}
					}
				}
			}

			.exit {
				text-align: center;
				line-height: 88upx;
				margin-top: 80upx;
				// margin-bottom: 80upx;
				width: 530upx;
				height: 88upx;
				background: #ffffff;
				opacity: 1;
				border-radius: 60upx;
			}
		}
	}
</style>
