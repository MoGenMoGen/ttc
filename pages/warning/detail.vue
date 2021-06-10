<template>
	<!-- 预警详情页面 -->
	<view class="pages_warn_detail">
		<view class="container">    

			<view class="list">
				<view class="item" v-if="loginType==3">
					<text class="title">提醒类型</text>
					<text class="content red">{{ info.type }}</text>
				</view>
				<view class="item">
					<text class="title">提醒内容</text>
					<text class="content">{{ info.content }}</text>
				</view>
				<view class="item" v-if="loginType!=1">
					<text class="title">整改单位</text>
					<text class="content">{{ info.zgunit }}</text>
				</view>
				<view class="item">
					<text class="title">施工单位</text>
					<text class="content">{{ info.sgunit }}</text>
				</view>
				<view class="item">
					<text class="title">执行人</text>
					<text class="content">{{ info.executor }}</text>
				</view>
				<view class="item">
					<text class="title">提交日期</text>
					<text class="content">{{ info.clock }}</text>
				</view>
				<view class="item" v-if="loginType==3">
					<text class="title">逾期天数</text>
					<text class="content  red">{{ info.overdue }}</text>
				</view>
				<view class="item">
					<text class="title">提醒日期</text>
					<text class="content">{{ info.warnDate }}</text>
				</view>
				<view class="item" v-if="loginType!=3">
					<text class="title">提醒类型</text>
					<text class="content red">{{ info.type }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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

				},
				loginType: 3
			};
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
