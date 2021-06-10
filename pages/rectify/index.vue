<template>
<view class="pages_rectify">
	<view class="rectifyContainer">
		<view class="rectifyBar">
			<view class="rectifyTop" v-for="(item,index) in listBar" :key="index"  :class="{ active: currentIndex == index } " @click="changeNav(index)">
				{{item}}
			</view>
		
		</view>
		<searchBox :placeholderIn="placeholderIn"></searchBox>
		<view class="rectifyBody">
			<view class="rectifyList" v-for="(item,index) in listBody" :key="index">
				<view class="rectifyListIn">
					<image src="../../static/worktype.png" mode=""></image>
					<view class="rectifyListTitle">
						整改单号
					</view>
					<view class="rectifyListContent">
						{{item.number}}
					</view>
				</view>
				<view class="rectifyListIn">
					<image src="../../static/workcontent.png" mode=""></image>
					<view class="rectifyListTitle">
						整改内容
					</view>
					<view class="rectifyListContent">
						{{item.content}}
					</view>
				</view>
				<view class="rectifyListIn">
					<image src="../../static/clock.png" mode=""></image>
					<view class="rectifyListTitle">
						下发日期
					</view>
					<view class="rectifyListContent">
						{{item.issueDay}}
					</view>
				</view>
				<view class="rectifyListIn" v-if="currentIndex==0||currentIndex==1">
					<image src="../../currentstate.png" mode=""></image>
					<view class="rectifyListTitle">
						当前状态
					</view>
					<view class="rectifyListContent" style="color:#2B89F7">
						{{item.currentState}}
					</view>
				</view>
				<view class="rectifyListIn" v-if="currentIndex==2">
					<image src="../../currentstate.png" mode=""></image>
					<view class="rectifyListTitle">
						签收日期
					</view>
					<view class="rectifyListContent">
						{{item.receiptDate}}
					</view>
				</view>
				<view class="rectifyListIn" v-if="currentIndex==3">
					<image src="../../currentstate.png" mode=""></image>
					<view class="rectifyListTitle">
						完成日期
					</view>
					<view class="rectifyListContent">
						{{item.finishDate}}
					</view>
				</view>
			</view>
			<nomore></nomore>
		</view>
		
	</view>
	

  <tabbar
    :loginType="loginType"
    @tabChange="change"
    v-if="loginType != 3"
  ></tabbar>
  </view>
    
</template>

<script>
	import tabbar from "components/tabbar.vue"
	import searchBox from "../../components/searchBox.vue"
	import nomore from "../../components/nomore.vue"
export default {
data(){
	return{
		placeholderIn:"任务编号、任务内容",
		loginType:1,
		currentIndex:0,
		listBar:["代签收","待执行","待结案","已完成"],
		listBody:[
			{
				number:"RW20210330001",
				content: "消防器材未按照标准规范摆放，消防通道有障碍物存放",
				issueDay:"2020-12-15",
				currentState:"待签收",
				receiptDate:"2020-3-20",
				finishDate:'2020-3-20'
			},
			{
				number:"RW20210330001",
				content: "消防器材未按照标准规范摆放，消防通道有障碍物存放",
				issueDay:"2020-12-15",
				currentState:"待签收",
				receiptDate:"2020-3-20",finishDate:'2020-3-20'
			},
			{
				number:"RW20210330001",
				content: "消防器材未按照标准规范摆放，消防通道有障碍物存放",
				issueDay:"2020-12-15",
				currentState:"待签收",
				receiptDate:"2020-3-20",finishDate:'2020-3-20'
			},
			{
				number:"RW20210330001",
				content: "消防器材未按照标准规范摆放，消防通道有障碍物存放",
				issueDay:"2020-12-15",
				currentState:"待签收",
				receiptDate:"2020-3-20",finishDate:'2020-3-20'
			},
		]
	}
},
components:{
	tabbar,
	searchBox,
	nomore
},
methods:{
	changeNav(index){
		this.currentIndex=index
	},
	change(path) {
	  uni.reLaunch({
	    url: path,
	  });
	},
},


}
</script>

<style lang="scss" scoped>
.pages_rectify{
	  background-color: #fafafa;
	  display: flex;
	  flex-direction: column;
	  height: 100vh;
	  .rectifyContainer{
		  flex: 1;
		  overflow: auto;
		  .rectifyBar{
			  display: flex;
			  align-items: center;
				justify-content: space-around;
				width: 750rpx;
				height: 100rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 12rpx;
				.rectifyTop{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40rpx;
					color: #909090;
					opacity: 1;
					
					
				}
				.active{
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
				.active::after{
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
	  }
	  
	}
	.rectifyBody{
		padding: 20rpx;
		.rectifyList{
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			padding: 36rpx 0 36rpx 36rpx;
			margin-bottom: 20rpx;
			
			.rectifyListIn{
				display:flex;
				align-items: top;
				margin-bottom: 20rpx;
				color: #303030;
				opacity: 1;
				image{
					width: 38rpx;
					height: 38rpx;
				}
				.rectifyListTitle{
					width: 150rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-left: 2rpx;
					color: #303030;
					opacity: 1;
				}
				.rectifyListContent{
					width: 600rpx;
					margin-left: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					
					color: #303030;
					opacity: 1;
				}
			}
		}
	}


</style>