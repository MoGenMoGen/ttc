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
					{{cd}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改单位
				</view>
				<view class="newListContent">
					{{detaliList.rectifyOrgName}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改负责人
				</view>
				<view class="newListContent">
					{{detaliList.responsibleName}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改日期
				</view>
				<view class="newListContent">
					{{detaliList.rectifyDate}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					下发日期
				</view>
				<view class="newListContent">
					{{detaliList.issueDate}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					检查区域
				</view>
				<view class="newListContent">
					{{detaliList.examRegion}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					隐患说明
				</view>
				<view class="newListContent">
					{{detaliList.troubleReport}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改要求
				</view>
				<view class="newListContent">
					{{detaliList.requReport}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					复查人
				</view>
				<view class="newListContent">
				{{detaliList.reviewName}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					复查时间
				</view>
				<view class="newListContent">
					{{detaliList.reviewTime}}
				</view>
			</view>
			<view class="newList" style="border-bottom: 0;">
				<view class="newListTitle">
					隐患图片
				</view>
				<view class="newListContent">
					<image :src="detaliList.troublePic" mode=""></image>
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
			cd:"",
			detaliList:{}
		}
	},
	methods:{
		lookTo(){
			console.log(1);
			uni.switchTab({
				url:"/pages/rectify/index"
			})
		}
	},
	onLoad(e) {
		this.cd=e.cd
		console.log(1231231,this.cd);
		this.api.getAddDetail({cd:this.cd}).then(res=>{
			console.log(res);
			this.detaliList=res 
		})
		
	},
	
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
