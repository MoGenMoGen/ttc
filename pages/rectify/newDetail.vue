<template>
	<view class="newContainer">
		<view class="newBody">
			<view class="title">
				<text>消防通道畅通整改</text>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改单号
				</view>
				<view class="newListContent">
					ZG20210330001
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改单位
				</view>
				<view class="newListContent">
					广知科技有限公司
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改负责人
				</view>
				<view class="newListContent">
					张宁
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改日期
				</view>
				<view class="newListContent">
					2021-05-20
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					下发日期
				</view>
				<view class="newListContent">
					2021-05-19
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					检查区域
				</view>
				<view class="newListContent">
					消防通道
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					隐患说明
				</view>
				<view class="newListContent">
					消防通道堵塞
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改要求
				</view>
				<view class="newListContent">
					请按照要求进行整改
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					复查人
				</view>
				<view class="newListContent">
					章老师
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					复查时间
				</view>
				<view class="newListContent">
					2021-05-19
				</view>
			</view>
			<view class="newList" style="border-bottom: 0;">
				<view class="newListTitle">
					隐患图片
				</view>
				<view class="newListContent">
					<image src="../../static/takephoto.png" mode=""></image>
				</view>
			</view>

		</view>
		<view class="lastBtn">
			<button type="default" @click="lookTo">查看其他整改单</button>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	methods:{
		lookTo(){
			console.log(1);
			uni.switchTab({
				url:"/pages/rectify/index"
			})
		}
	}
	
}
</script>

<style lang="scss" scoped>
	.newContainer {
		background-color: #fafafa;
		display: flex;
		padding: 20rpx;
		flex-direction: column;
		.newBody {
			width: 710rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			padding: 40rpx;
			box-sizing: border-box;
			.title{
				text-align: center;
				margin-bottom: 20rpx;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
			}
			.newList {
				display: flex;

				padding: 20rpx 14rpx;
				width: 656rpx;
				background: #FFFFFF;
				opacity: 1;
				border-bottom: 1rpx solid #D0CED8;
				// align-items: center;
				box-sizing: border-box;

				.newListTitle {
					width: 200rpx;
					font-size: 28rpx;
					color: #303030;
				}

				.newListContent {
					width: 456rpx;
					margin-left: 30rpx;
					word-wrap: break-word;
					font-size: 28rpx;
					image{
						width: 160rpx;
						height: 160rpx;
					}
				}
			}
		}
	}
		.lastBtn{
			margin-top: 80rpx;
			margin-bottom: 100rpx;
			button{
				width: 355rpx;
				height: 88rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
				opacity: 1;
				border-radius: 12rpx;
				font-size: 28rpx;
				color: #303030;
				line-height: 88rpx;
			}
		}
</style>
