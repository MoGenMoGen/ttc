<template>
	<view class="pages_home_tab">
		<!--自定义 navbar -->
		<view class="navbar">
			<image src="/static/saoma.png" mode="widthFix" @click="scaning"></image>
			<text>首页</text>
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
						<view class="badge" v-if="item.count!=0">
							{{item.count<=99?item.count:'99+'}}
						</view>
					</view>
				</view>
				<view class="icon_list" v-else-if="loginType==1">
					<!-- loginType==1 一排放三个 -->
					<view class="icon_item_two" v-for="(item, index) in iconBar1" :key="index"
						@click="toPage(item.path,item.flag,item.tabIndex)">
						<image :src="item.img" mode="widthFix" />
						<text>{{ item.title }}</text>
						<view class="badge" v-if="item.count!=0">
							{{item.count<=99?item.count:'99+'}}
						</view>
					</view>
				</view>
				<view class="icon_list" v-else>
					<!-- loginType==3 一排放三个 -->
					<view class="icon_item_two" v-for="(item, index) in iconBar3" :key="index"
						@click="toPage(item.path,item.flag,item.tabIndex,item.special)">
						<image :src="item.img" mode="widthFix" />
						<text>{{ item.title }}</text>
						<view class="badge" v-if="item.count!=0">
							{{item.count<=99?item.count:'99+'}}
						</view>
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
						@click="goToWarnDetail(item.id,item.cd)">
						<!-- 提醒内容 -->
						<view class="warning_content">
							<image :src="workcontent" mode="widthFix" class="warning_icon" />
							<text>提醒内容</text><text>{{ item.requReport }}</text>
						</view>
						<!-- 提醒类型 -->
						<!-- logintype==3,监管侧没有提醒类型 -->
						<view class="warning_type" v-if="loginType != 3">
							<image :src="type" mode="widthFix" class="warning_icon" />
							<text>提醒类型</text>
							<text :class="{ yellow: item.warningState == 0||item.warningState==1, red: item.warningState == 2 }" v-if="item.warningState == 2">已逾期提醒</text>
							<text :class="{ yellow: item.warningState==0||item.warningState==1, red: item.warningState==2 }" v-else>待执行提醒</text>
						</view>
						<!-- 提交日期 -->
						<view class="warning_submitDate" v-if="loginType == 3">
							<image :src="clock" mode="widthFix" class="warning_icon" />
							<text>提交日期</text><text>{{ item.issueDate }}</text>
						</view>
						<!-- logintype==3，只有监管测有逾期天数和提醒日期 -->
						<!-- 逾期天数 -->
						<view class="warning_overdue" v-if="loginType == 3">
							<image :src="overdue" mode="widthFix" class="warning_icon" />
							<text style="color: #e51937">逾期天数</text><text
								style="color: #e51937">{{ item.nextDate }}</text>
						</view>
						<!-- 提醒日期 -->
						<view class="warning_warnDate">
							<image :src="warnDate" mode="widthFix" class="warning_icon" />
							<text>提醒日期</text><text>{{ item.warningTime }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 预警提醒 结束 -->
			<!-- 企业查 开始 -->
			<!-- loginType==3监管侧独有 -->
			<view class="home_firm_query" v-if="loginType==3">
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
							<view class="item_content">{{item.fullName}}</view>
						</view>
						<view class="item_container">
							<view class="item_title">联系人:</view>
							<view class="item_content" v-if="item.user.length>0">{{item.user[0].name}}</view>
						</view>
						<view class="item_container">
							<view class="item_title">联系电话:</view>
							<view class="item_content" v-if="item.user.length>0">{{item.user[0].phone}}</view>
						</view>
						<view class="item_container">
							<view class="item_title">企业码:</view>
							<view class="item_content">
								<yuanqi-qr-code
								    ref="yuanqiQRCode"
								   :text="'/pages/firmQuery/detail?id='+item.id"
									:size="size"
								    ></yuanqi-qr-code>
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
	// dept_id
	var buildOrgId ="";
	export default {
		data() {
			// loginType:1.企业侧 2.服务商侧 3.监管机构侧
			return {
				current: 1, //tab下标
				loginType: 1, //1：企业 2：服务商 3：监管机构
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
				size:200,
				swiperList: [],
				// 对应loginType1,2,3
				iconBar1: [{
						title: "自检任务",
						img: iconSelfCheck,
						path: "/pages/selfCheck/index", //跳转地址
						flag: true, //是否是tabbar页面
						tabIndex: 1,
						count: 0
					},
					{
						title: "整改单",
						img: iconSelfCheck,
						path: "/pages/rectify/index",
						flag: true,
						tabIndex: 2,
						count: 0

					},
					{
						title: "预警提醒",
						img: iconWarning,
						path: "/pages/warning/index",
						flag: false,
						tabIndex: 0, //不是tab页tabIndex随意
						count: 0
					},
				],
				iconBar2: [{
						title: "企业查询",
						img: iconFirmQuery,
						path: "/pages/firmQuery/index",
						flag: true,
						tabIndex: 2,
						count: 0
					},
					{
						title: "巡检任务",
						img: iconInspection,
						path: "/pages/inspection/index",
						flag: false,
						tabIndex: 0,
						count: 0

					},
					{
						title: "整改单",
						img: iconRedify,
						path: "/pages/rectify/index",
						tabIndex: 1,
						flag: true,
						count: 0
					},
					{
						title: "预警提醒",
						img: iconWarning,
						path: "/pages/warning/index",
						tabIndex: 0,

						flag: false,
						count: 0
					},
				],
				iconBar3: [{
						title: "企业查询",
						img: iconFirmQuery,
						tabIndex: 2,

						path: "/pages/firmQuery/index",
						flag: true,
						count: 0
					},
					{
						title: "企业自检",
						img: iconSelfCheck,
						path: "/pages/selfCheck/index",
						flag: false,
						tabIndex: 0,
						special: true,
						count: 0

					},
					{
						title: "整改单",
						img: iconRedify,
						path: "/pages/rectify/index",
						flag: true,
						tabIndex: 1,
						count: 0

					},
					{
						title: "巡检任务",
						img: iconInspection,
						path: "/pages/inspection/index",
						flag: false,
						tabIndex: 0,
						count: 0

					},
					{
						title: "预警提醒",
						img: iconWarning,
						path: "/pages/warning/index",
						flag: false,
						tabIndex: 0,
						count: 0

					},
				],
				//预警提醒列表
				warnList: [],
				// 企业查询列表
				queryList: [],
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
			toPage(path, flag, tabIndex, special) {
				// path：跳转地址，flag:是否是自定义tab
				// tabIndex tab下标,不是tab页随意传值
				console.log(path, flag, tabIndex);
				if (flag) {
					uni.setStorageSync('tabIndex', tabIndex)
					uni.reLaunch({
						url: path,
					});
				} else if (!flag && special) {
					uni.reLaunch({
						url: path
					})
				} else {
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
			goToWarnDetail(id,cd) {
				uni.navigateTo({
					url: `/pages/warning/detail?id=${id}&cd=${cd}`,
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
			},
			// 获取首页列表
			async getList(params1, params2) {
				
				
				// 获取预警提醒列表
				let data2 = await this.api.gethomewarningList(params1)
				console.log("首页预警", data2);
				
				this.warnList = data2.records
				// this.warnList.shift()
				this.warnList=this.warnList.slice(0,3)
				// logintype==3获取企业查列表
				if (this.loginType == 3) {
					let data3 = await this.api.getFirmQueryList(params2)
					
					console.log("首页企业查", data3);
					this.queryList=data3.records
				}

			},
			// 扫描二维码
			scaning(){
				uni.scanCode({
					success:function(res){
						console.log('二维码扫描成功 ',res.result);
						uni.navigateTo({
							url:res.result
						})
					},
					fail:function(){   
						console.log('二维码扫描失败');
					},
					complete:function(){
						console.log('二维码扫描完成');
					}
				})
			}
		},
		components: {
			tabbar,
			nomore
		},
		async onLoad() {
			console.log("onload",111111)
			uni.hideTabBar({
				animation: false,
			
			})
			uni.setStorageSync('tabIndex', 0)
			this.loginType = uni.getStorageSync("loginType")
			buildOrgId = uni.getStorageSync("userinfo").dept_id;
			
			// 获取轮播图
			let ad=await this.api.getadvertinfo({posCd:"ADPOS_001",adNums:3})
			console.log(ad);
			this.swiperList=ad.map(item=>item.imgUrl)
			let params2;
			// 监管侧多一个企业查
			if (this.loginType == 3) {
				params2 = {
					current: 1,
					size: 3,
					subjectDept: buildOrgId
				}
			} else {
				params2 = {}
			}

			// 获取首页列表
			this.getList({
				buildOrgId,
				current: 1,
				size: 4
			}, params2)

		},
		mounted(){
			console.log("mounted");
			// 生成二维码
			let coderefs=[];
			if(this.$refs.yuanqiQRCode)
			{
				coderefs=this.$refs.yuanqiQRCode;
			}
			console.log("111",coderefs);
			if(coderefs.length>0){
				for(let i=0;i<coderefs.length;i++)
			 this.$refs.yuanqiQRCode[i].make();
			}
			
		},
		async onShow() {
			console.log("onshow");
			//隐藏默认tabbar显示自定义tabbar
			uni.hideTabBar({
				animation: false,
			})
			
			// 获取messagenum
			let data1=await this.api.getMessageNum({buildOrgId})
			
			// 不同loginType，数组中对象count赋值
			if (this.loginType == 1) {
				this.iconBar1[0].count = data1.taskCount;
				this.iconBar1[1].count = data1.rectifyCount;
				if(this.iconBar1[0].count=='99+'||this.iconBar1[1].count=='99+')
				this.iconBar1[2].count="99+"
				else
				this.iconBar1[2].count = this.iconBar1[0].count+this.iconBar1[1].count;
			}
			if (this.loginType == 2) {
				this.iconBar2[1].count = data1.taskCount;
				this.iconBar2[2].count = data1.rectifyCount;
				this.iconBar2[3].count=data1.Count
				// if(this.iconBar2[1].count=='99+'||this.iconBar2[2].count=='99+')
				// this.iconBar2[3].count="99+"
				// else
				// this.iconBar2[3].count =this.iconBar2[1].count+this.iconBar2[2].count ;
			}
			if (this.loginType == 3) {
				this.iconBar3[1].count = data1.taskCount;   
				this.iconBar3[2].count = data1.rectifyCount;
				this.iconBar3[3].count = data1.taskCountXun;
				
				// if(this.iconBar3[1].count=='99+'||this.iconBar3[2].count=='99+'||this.iconBar3[3].count=='99+')
				// this.iconBar3[4].count='99+'
				// else
				// this.iconBar3[4].count =this.iconBar3[1].count+ this.iconBar3[2].count+this.iconBar3[3].count;
			this.iconBar3[4].count=data1.Count
			}
			

			// 没有token,重新登录
			// if (!uni.getStorageSync("Blade-Auth")) {
			// 	uni.showToast({
			// 		title: "您还没有登录,立即登录···",
			// 		duration: 1500,
			// 		icon: 'none',
			// 		success() {

			// 			setTimeout(function(){
			// 				uni.reLaunch({
			// 					url:'/pages/login/index'
			// 				})
			// 			},1500)   

			// 		}
			// 	});


			// }
		},
	};
</script>
<style lang="scss" scoped>
	.pages_home_tab {
		width: 100%;
		height: 100vh;
		// display: flex;
		// flex-direction: column;
		background-color: #fafafa;

		.navbar {
			background-color: #fafafa;
			position: fixed;
			top: 0;
			// text-align: center;
			// height: 88upx;
			// line-height: 88upx;
			width: 100%;
			// font-size: 34rpx;
			color: #000000;
			padding-top: var(--status-bar-height);
			z-index: 1000;
			display: flex;
			align-items: center;
			// justify-content: center;
			text{
				color: #000000;
				height: 88upx;
				line-height: 88upx;
				font-size: 34upx;
				text-align: center;
				width:550upx ;
			}
			image{
				margin-left:50upx;
				width:50upx;
			}
		}

		.pages_home_container {
			background-color: #fff;
			width: 100%;
			// flex: 1;
			// overflow: auto;
			// -webkit-overflow-scrolling: touch;
			display: flex;
			flex-direction: column;
			align-items: center;
			// 上边距加88，下边据加173
			padding: 168upx 20upx 193upx;
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
						position: relative;

						.badge {
							position: absolute;
							border-radius: 50%;
							width: 40upx;
							line-height: 40rpx;
							background: #FA5151;
							color: #ffffff;
							font-size: 20upx;
							text-align: center;
							border: 1upx solid #fff;
							height: 40upx;
							right: 19upx;
							top: -5upx;
						}

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
						position: relative;

						.badge {
							position: absolute;
							border-radius: 50%;
							width: 40upx;
							line-height: 40rpx;
							background: #FA5151;
							color: #ffffff;
							font-size: 20upx;
							text-align: center;
							border: 1upx solid #fff;
							height: 40upx;
							right: 42upx;
							top: 2upx;
						}


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
