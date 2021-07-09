<template>
	<!-- 我的页面 -->
	<view class="pages_profile_tab">
		<view class="profile_container">

			<!-- 个人中心头部背景部分 开始 -->
			<view class="profile_info_bg">
				<view class="profile_info" @click="goToperson(userinfo.user_id)">
					<view style="display: flex">
						<view class="avatar" @click.stop="changeAvatar">
							<image :src="userdata.avatar?userdata.avatar:avatar" mode="aspectFill" />
						</view>
						<view class="info_detail">
							<view class="myinfo">
								<text class="name">{{ userdata.realName }}</text>
								<text class="tel">{{ userdata.phone }}</text>
							</view>
							<view class="film_name">{{ userdata.deptName }}</view>
						</view>
					</view>
					<!-- loginType==1才有 -->
					<view style="display: flex; align-items: center">
						<view class="code" v-if="loginType == 1">
							<!-- <image :src="code" mode="widthFix" /> -->
							<yuanqi-qr-code ref="yuanqiQRCode" :text="'/pages/profile/personinfo?id='+info.id"
								:size="size" borderSize=10 :logo="logo"></yuanqi-qr-code>
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
				<text>已安全生产</text><text>{{ userdata.saveDate }}天</text>
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

		<tabbar :loginType="loginType" :tabIndex='3'> </tabbar>
	</view>
</template>

<script>
	import tabbar from "components/tabbar";
	// 头像
	import avatar from "static/avatar.png";
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
				arrow,
				database,
				help,
				modifyPass,
				arrow2,
				loginType: 1,
				userinfo: {},
				size: 50,
				logo: "avatar",
				// 用户基本信息
				userdata: {
					avatar: "",
					realName: "",
					phone: "",
					deptName: ""
				},
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
					id: "123",
					avatar: avatar
				},
				// 工单信息
				order: {
					// 企业一侧
					taskBillCount: 58, //自检任务
					rectifyBillCount: 58, //整改单
					warningCount: 58, //预警提醒
					// 服务商一侧
					// taskBillCount: 58, //今日整改数
					monthCount: 158, //当月整改数
					rectifyPercent: 24, //整改率
					// 监管机构一侧
					// taskBillCount: 36, //今日巡检数
					// monthCount: 12, //当月巡检数
					taskPercent: 24, //巡检率
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
					legend: {
						data: ['月已完成整改单数', '月已完成巡检数']
					},
					grid: {
						top: 60,
						bottom: 30
					},
					xAxis: [{
							type: 'category',
							show: true,
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
										return '月已完成整改单数  ' + params.value +
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
										return '月已完成巡检数  ' + params.value +
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
						show: true
					}],
					series: [{
							name: '月已完成整改单数',
							type: 'line',
							xAxisIndex: 1,
							smooth: true,
							emphasis: {
								focus: 'series',
								blurScope: 'coordinateSystem'
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
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						},
						{
							name: '月已完成巡检数',
							type: 'line',
							xAxisIndex: 1,
							smooth: true,
							emphasis: {
								focus: 'series',
								blurScope: 'coordinateSystem'
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
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							// data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 181.6, 46.6, 55.4, 18.4, 10.3, 0.7]
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
			// order.selfwork order.jrredify order.jrinspect
			dataone() {
				return this.loginType == 2 ? this.order.rectifyBillCount : this.order.taskBillCount
			},
			// order.redify order.dyredify order.dyinspect
			datatwo() {
				return this.loginType == 1 ?
					this.order.rectifyBillCount :
					this.order.monthCount;
			},
			// order.warn order. redifyrate order.inspection
			datathree() {
				return this.loginType == 1 ?
					this.order.warningCount :
					this.loginType == 2 ?
					this.order.rectifyPercent :
					this.order.taskPercent;
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
				return Number(num) * 100 + "%";
			},
			// 处理任务1
			handlework1() {
				if (this.loginType == 1) {
					uni.setStorageSync("tabIndex", 1);
					uni.reLaunch({
						url: "/pages/selfCheck/index",
					});
				} else if (this.loginType == 2) {
					uni.setStorageSync("tabIndex", 2);
					uni.setStorageSync("rectifycurrent",3)
					uni.switchTab({
						url: "/pages/rectify/index?currentIndex=3",
					});
				} else if(this.loginType == 3)
					uni.navigateTo({
						url: "/pages/inspection/index?currentIndex=3",
					})

			},
			// 处理任务2
			handlework2() {
				if (this.loginType == 1) {
					uni.setStorageSync("tabIndex", 2);
					uni.setStorageSync("rectifycurrent",3)
					uni.switchTab({
						url: "/pages/rectify/index?currentIndex=",
						
					});
				} else if (this.loginType == 2) {
					uni.setStorageSync("tabIndex", 2);
					uni.setStorageSync("rectifycurrent",3)
					uni.switchTab({
						url: "/pages/rectify/index?currentIndex=3",
					});
				} else if(this.loginType == 3){
					uni.navigateTo({
						url: "/pages/inspection/index?currentIndex=3",
					})
				}
			},
			// 处理任务3
			handlework3() {
				if (this.loginType == 1) {
					uni.navigateTo({
						url: "/pages/warning/index",
					});
				}
				 // else if (this.loginType == 2) {
				// 	uni.setStorageSync("tabIndex", 2);
				// 	uni.switchTab({
				// 		url: "/pages/rectify/index",
				// 	});
				// } else {
				// 	uni.navigateTo({
				// 		url: "/pages/inspection/index",
				// 	})
				// }


			},
			// 进入个人中心
			goToperson(id) {
				uni.navigateTo({
					url: `/pages/profile/personinfo?id=${id}`
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
			// 更换头像
			async changeAvatar() {
				// 图片上传接口
				let avatar = await this.api.chooseImages('', 1)
				console.log(1111111);
				let res = await this.api.upLoad(avatar[0])
				// 调用更换头像接口
				await this.api.changeavatar({
					avatar: res,
					id: this.userinfo.user_id
				})
				// 再次调取userinfo接口，重新赋值
				this.api.getuserInfo(this.userinfo.user_id).then(res1 => {
					this.userdata = res1
					this.logo = this.userdata.avatar



					this.$nextTick(function() {
						if (this.loginType == 1)
							this.$refs.yuanqiQRCode.make();
						else
							return false;
					})
				})
			},
			// 退出
			exit() {
				uni.clearStorageSync("Blade-Auth")
				uni.reLaunch({
					url: '/pages/login/index'
				});
			},
		},
		components: {
			tabbar,
		},
		beforeMount() {

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
		async onLoad() {
			this.loginType = uni.getStorageSync("loginType")

			this.userinfo = uni.getStorageSync("userinfo")
			// 获取个人信息
			this.api.getuserInfo(this.userinfo.user_id).then(res => {
				this.userdata = res
				this.logo = this.userdata.avatar

				// 折线图
				// x轴时间
				this.option.xAxis[0].data = this.userdata.dateList;
				this.option.xAxis[1].data = this.userdata.dateList;
				// 月整改单完成
				//找出日期对应的数据下标
				let baseindex;
				this.userdata.baseList.forEach((item, index) => {
					baseindex = this.option.xAxis[0].data.indexOf(item.month)
					this.option.series[0].data[baseindex] = item.num
				})

				// 月巡检单完成
				//找出日期对应的数据下标
				let taskindex;
				this.userdata.taskList.forEach((item, index) => {
					taskindex = this.option.xAxis[1].data.indexOf(item.month)
					console.log("taskindex", taskindex, item)
					this.option.series[1].data[taskindex] = item.num
				})

				this.$nextTick(function() {
					if (this.loginType == 1)
						this.$refs.yuanqiQRCode.make();
					else
						return false;
				})
			})
			// 获取工单信息
			let order = await this.api.getorder(this.userinfo.dept_id)
			console.log("工单信息", order);
			this.order = order[0]
			console.log("adfdsafe", this.order.taskPercent, typeof(this.order.taskPercent));
			this.order.taskPercent = `${this.order.taskPercent}%`
			this.order.rectifyPercent = `${this.order.rectifyPercent}%`

			// this.info.inspection = this.turn(this.info.inspection);
		},
		async onShow() {
			//隐藏默认tabbar显示自定义tabbar
			uni.hideTabBar({
				animation: false
			})


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
		height: calc(100vh - 173upx);
		display: flex;
		flex-direction: column;

		.profile_container {
			padding-bottom: 120upx;

			background: #fafafa;
			width: 100%;

			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			display: flex;
			flex-direction: column;
			align-items: center;

			.profile_info_bg {
				padding: 200upx 0;
				width: 100%;
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
						// width: 64upx;
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
				margin: 10upx 0;
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
						height: 470upx;
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
