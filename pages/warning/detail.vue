<template>
	<!-- 预警详情页面 -->
	<view class="pages_warn_detail">
		<view class="container">    

			<view class="list">
				<view class="item" v-if="loginType==3">
					<text class="title">提醒类型</text>
					<text class="content" :class="{ yellow: info.warningState == 0||info.warningState==1, red: info.warningState == 2 }" v-if="info.warningState == 2">已逾期</text>
					<text class="content" :class="{ yellow: info.warningState==0||info.warningState==1, red: info.warningState==2 }" v-else>待执行</text>
				</view>
				<view class="item">
					<text class="title">提醒内容</text>
					<text class="content" v-if="currentTab==0">{{ info.requReport }}</text>
					<text class="content" v-else>{{ info.contReport }}</text>
				</view>
				<view class="item" v-if="loginType!=1">
					<text class="title">整改单位</text>
					<text class="content">{{ info.buildOrgName }}</text>
				</view>
				<!--< view class="item">
					<text class="title">施工单位</text>
					<text class="content">{{ info.sgunit }}</text>
				</view> -->
				<view class="item">
					<text class="title">执行人</text>
					<text class="content">{{ info.responsibleName }}</text>
				</view>
				<view class="item">
					<text class="title">提交日期</text>
					<text class="content">{{ info.issueDate }}</text>
				</view>
				<view class="item" v-if="loginType==3">
					<text class="title">逾期天数</text>
					<text class="content  red">{{ info.nextDate }}</text>
				</view>
				<view class="item">
					<text class="title">提醒日期</text>
					<text class="content">{{ info.warningTime }}</text>
				</view>
				<view class="item" v-if="loginType!=3">
					<text class="title">提醒类型</text>
					<text class="content" :class="{ yellow: info.warningState == 0||info.warningState==1, red: info.warningState == 2 }" v-if="info.warningState == 2">已逾期</text>
					<text class="content" :class="{ yellow: info.warningState==0||info.warningState==1, red: info.warningState==2 }" v-else>待执行</text>
				</view>
				<!-- <view class="item">
					<text class="title">任务类型</text>
					<text class="content red">{{ info.worktype }}</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab:0,//用于判断是否是整改单列表传过来的值
				info: {
					type: "待执行", //提醒类型
					//提醒内容
					content: "【广知科技有限公司】消防器材未按照标准规范摆放消防通道有障碍物存放",
					overdue: "4天", //逾期天数
					warnDate: "2020-12-15", //提醒日期
					clock: "2020-12-15", //提交日期
					zgunit: "聚联科技有限公司", //整改单位
					sgunit: "某某服务公司", //施工单位
					executor: "孔德文", //执行人
					worktype:"整改单任务"

				},
				loginType: 3
			};
		},
		async onLoad(e) {
			if(e.currentTab)
			{
				this.currentTab=e.currentTab;
			}
			else{
				this.currentTab=0;   
			}
		 	this.loginType = uni.getStorageSync("loginType")
			console.log("detail",e);
			let data=await this.api.getwarningdetail({id:e.id,cd:e.cd})
			this.info=data
			console.log("预警详情",data);
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

					.red {
						color: #E51937
					}
					.yellow{
							color: #f1c345;
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
				}
			}
		}
	}
</style>
