<template>
		<view class="newContainer">
			<view class="newBody">
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
					整改名称
					</view>
					<input type="text" value="" placeholder="请输入整改名称" class="newListContent"/>
				</view>
				<view class="newList">
				<view class="newListTitle">
					整改单位
				</view>
				<input type="text" value="" placeholder="请输入整改单位"class="newListContent" />
				</view>
				<view class="newList">
				<view class="newListTitle">
					检查区域
				</view>
				<input type="text" value="" class="newListContent" placeholder="请输入检查区域"/>
				</view>
				<view class="newList">
					<view class="newListTitle">
						LBS位置
					</view>
					<view class="newListContent">
					宁波镇海329创业社区
					<image src="../../location.png" mode="" class="location"></image>
					</view>
				</view>
				<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					隐患说明
				</view>
				<textarea value="" placeholder="请输入主要事项内容详情"  class="text"/>
				</view>
				<view class="newList">
				<view class="newListTitle">
					责任整改人
				</view>
				<view class="newListContent">
					张三
				</view>
				</view>
				<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					整改要求
				</view>
				<textarea value="" placeholder="请按照要求进行整改"  class="text"/>
				</view>
				<view class="newList">
				<view class="newListTitle">
					整改期限
				</view>
				<view class="newListContent">
					2021-10-20
					<image src="../../static/choosedate.png" mode="" class="date"></image>
				</view>
			</view>
			<view class="newList" style="display: flex; flex-direction: column;" >
			<view class="newListTitle">
				隐患图片
			</view>
			<view class="photograp">
				 <image src="../../static/takephoto.png" mode="" @click="toPhoto()" />
			</view>
			<view class="choseImg" v-for="(item, index) in imgList" :key="index">
				<image :src="item" mode="" class="imgs"></image>
				<image :src="del" mode="" class="deleteImg" @click="deleimg(index)"></image>
			</view>
			</view>
			</view>
			<view class="newBtn">
				<button type="default" class="cancel">取消</button>
				<button type="default" class="next">下一步</button>
			</view>
		</view>
</template>

<script>
	import del from "static/delete.png";
export default{
	data(){
		return{
			del,
			imgList: ["/static/takephoto.png"],
		}
	}
}
</script>

<style lang="scss" scoped>
.newContainer{
	background-color: #fafafa;
	display: flex;
	padding: 20rpx;
	flex-direction:column;
	.newBtn{
		margin-top: 50rpx;
		display: flex;
		.cancel{
			width: 355rpx;
			height: 88rpx;
			background: #FFFFFF;
			border: 2rpx solid #2B89F7;
			opacity: 1;
			border-radius: 12rpx 0rpx 0rpx 12rpx;
			font-size: 28rpx;
			color:#303030;
		}
		.next{
			width: 355rpx;
			height: 88rpx;
			background: #2B89F7;
			border: 2rpx solid #2B89F7;
			opacity: 1;
			border-radius: 0rpx 12rpx 12rpx 0rpx;
			color: #ffffff;
			font-size: 28rpx;
		}
	}
	.newBody{
	width: 710rpx;
	
	background: #FFFFFF;
	box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
	opacity: 1;
	border-radius: 12rpx;
	padding: 40rpx;
	box-sizing:border-box;
	.newList{
		display: flex;
		padding: 20rpx 14rpx;
		width: 656rpx;
		background: #FFFFFF;
		opacity: 1;
		border-bottom:1rpx solid #D0CED8 ;
		// align-items: center;
		box-sizing: border-box;
		.newListTitle{
			width: 200rpx;
			
		}
		.newListContent{
			width: 456rpx;
			margin-left: 30rpx;
			word-wrap: break-word;
			.location{
				width: 48rpx;
				height: 48rpx;
				float: right;
			}
			.date{
				width: 48rpx;
				height: 48rpx;
				float: right;
			}
		}
		.text{
			width: 624rpx;
			height: 206rpx;
			background: #FCFCFC;
			opacity: 1;
			border-radius: 6rpx;
			font-size: 28rpx;
			color: #D0CED8;
			padding: 18rpx 36rpx;
			box-sizing: border-box;
			margin-top: 20rpx;
		}
		input{
			font-size: 28rpx;
			color: #D0CED8;
		}
		
	}
		}
}


</style>
