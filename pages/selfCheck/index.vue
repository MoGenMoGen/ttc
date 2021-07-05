<!-- 自检页面 -->
<template>
	<view class="pages_selfCheck">
		<!--自定义 navbar -->
		<view class="navbar">
			<text>自检任务</text> 
			<view class="back" @click="backTo" v-if="loginType==3">
				<image src="../../static/back.png" mode=""></image> 
			</view>
			</view>
			<view class="selfCheckContainer">
				<view class="nav-top">
					<view class="navheader" v-for="(item, index) in navList" :key="index"
						:class="{ active: currentIndex == index }" @click="changeNav(index)">{{ item.title }}
					</view>
				</view>
				<searchBox :placeholderIn="placeholderIn" @search="search" ref="research"></searchBox>
				<view class="taskContent">
					<view class="taskContentIn" v-for="(item, index) in worksArr" :key="index"
						@click="taskContentTo(item.id)">
						<view class="taskContentInList">
							<image src="../../static/worktype.png" mode="" />
							<text class="taskContentInListHead">任务编号 </text>
							<text class="taskContentInListContent">{{ item.cd }}</text>
						</view>
						<view class="taskContentInList ">
							<image src="../../static/workcontent.png" mode="" />
							<view class="taskContentInListHead">任务内容 </view>
							<view class="taskContentInListContent">{{ item.contReport }}</view>
						</view>
						<view class="taskContentInList " v-if="loginType==3">
							<image src="../../static/qiye.png" mode="" />
							<view class="taskContentInListHead">企业名称</view>
							<view class="taskContentInListContent">{{ item.buildOrgName }}</view>
						</view>
						<view class="taskContentInList">
							<image src="../../static/person.png" mode="" />
							<text class="taskContentInListHead">执行人 </text>
							<text class="taskContentInListContent">{{
              item.issueUserName
            }}</text>
						</view>
						<view class="taskContentInList">
							<image src="../../static/clock.png" mode="" />
							<view class="taskContentInListHead">提交日期 </view>
							<view class="taskContentInListContent">{{ item.completeDate }}</view>
						</view>
						<view v-if="currentIndex == 1" class="taskContentInList">
							<image src="../../static/withinTime.png" mode="" />
							<view style="color:red" class="taskContentInListHead">逾期天数
							</view>
							<view style="color:red" class="taskContentInListContent">
								{{item.nextDate}}
							</view>
						</view>
						<view v-if="currentIndex == 2" class="taskContentInList">
							<image src="../../static/completeDate.png" mode="" />
							<view class="taskContentInListHead">完成日期 </view>
							<view class="taskContentInListContent">{{
              item.completeTime
            }}</view>
						</view>
					</view>
				</view>
				<nomore></nomore>
			</view>

			<tabbar :loginType="loginType" :tabIndex='1' v-if=" loginType !=3"></tabbar>
		</view>

</template>

<script>
	import nomore from "components/nomore";
	import searchBox from "components/searchBox";
	import tabbar from "components/tabbar";
	export default {
		data() {
			return {
				loginType: 1,
				currentIndex: 0,
				searchFlag:false,
				placeholderIn: "任务编号",
				navList: [{
						title: "待执行任务",
					},
					{
						title: "逾期任务",
					},
					{
						title: "已完成任务",
					},
				],
				worksArr: [
				],
			};
		},
		methods: {
			changeNav(index) {
				this.currentIndex = index;
				this.worksArr = []
				this.getList({
					state: this.currentIndex + 1,
					current: 1,
					size: 5,
					performOrgId:this.userinfo.dept_id,
					types:1
				})
				this.page.current=1
				this.page1.current=1
				this.searchFlag=false
				this.$refs.research.cd=''
				this.$refs.research.date=''
			},
			change(path) {
				uni.reLaunch({
					url: path,
				});
			},
			taskContentTo(id) {
				uni.navigateTo({
					url: `/pages/selfCheck/details?currentIndex=${this.currentIndex}&id=${id}`,
				});
			},
			async getList(params) {
				let data = await this.api.getBillList(params)
				console.log(data);
				this.worksArr = [...this.worksArr, ...data.records]
				this.total = data.total;
				console.log(data.records);
			},
			async handelSearch(params){
				await this.api.getBillSearch(this.page1).then(res=>{
				    this.searchFlag=true
					this.total=res.total
					this.worksArr = [...this.worksArr, ...res.records]
				})
			},
			search(data){
				this.page1={
					state:this.currentIndex+1,
					current:1,
					size:5,
					cd:data.cd,
					types:1
				}
				this.worksArr=[]
				this.model=data
				if(data.date!=""){
					this.page1.issueDate=data.date
				}
				this.handelSearch(this.page1)
			},
			backTo(){
				console.log(1111);
				uni.switchTab({
					url:"../index/index"
				})
			}
		},
		components: {
			searchBox,
			tabbar,
			nomore,
		},
		onShow() {
			//隐藏默认tabbar显示自定义tabbar
			uni.hideTabBar({
				animation: false,

			})
			this.worksArr = []
			this.page = {
				current: 1, 
				size: 5
			}
	
			this.getList({
				...{
					state: this.currentIndex + 1,
					performOrgId:this.userinfo.dept_id,
					types:1
					
				},
				...this.page
			})
			this.searchFlag=false
			this.$refs.research.cd=''
			this.$refs.research.date=''
			console.log("aaaa",this.userinfo)
		},
		onLoad() {
			this.loginType = uni.getStorageSync("loginType")
			this.userinfo=uni.getStorageSync("userinfo")
		},
		onReachBottom() {
			this.page.current=1
			this.page1.current=1
			console.log("触底");
			if (this.total <= this.worksArr.length) {
				console.log(this.total, this.worksArr.length, "fffff");
			} else {
				if(this.searchFlag){
					this.page1.current+=1
					this.handelSearch(this.page1)
				}
				else
				{
					this.page.current += 1;
					this.getList({
						...this.page,
						...{
							state: this.currentIndex + 1,
							performOrgId:this.userinfo.dept_id,
							types:1
						}
					})
				}
			
			}
		},
		onPullDownRefresh() {
			this.page.current=1
			this.page1.current=1
			this.page = {
				current: 1,
				size: 5,
			}
			this.worksArr = [];
			if(this.searchFlag){
				this.handelSearch(this.page1)
			}
			else
			{
				this.getList({
					...this.page,
					...{
						state: this.currentIndex + 1,
						performOrgId:this.userinfo.dept_id,
						types:1
					}
				})
			}
			
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	};
</script>

<style lang="scss" scoped>
	.pages_selfCheck {
		background-color: #fafafa;
		// display: flex;
		// flex-direction: column;
		height: 100vh;

	}

	.navbar {
		background-color: #fafafa;
		position: fixed;
		top: 0;
		padding-top: var(--status-bar-height);
		z-index: 1000;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
		width: 100%;
		font-size: 34rpx;
		color: #000000;
	}

	.back {
		position: absolute;
		top: 50%;
		left: 34rpx;
		width: 18rpx;
		height: 34rpx;
	
	}
	.back image{
		
			width: 100%;
			height: 100%;
	}

	.selfCheckContainer {
		// flex: 1;
		// overflow: auto;
		background-color: #fff;
		// 上边距加88，下边据加173
		padding: 88upx 0upx 173upx;
		margin-top: var(--status-bar-height);
	}

	.nav-top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 750rpx;
		height: 100rpx;
		background: #ffffff;
		opacity: 1;
		border-radius: 12rpx;
	}

	.navheader {
		height: 40rpx;
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

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 750rpx;
		height: 100rpx;
		background: #ffffff;
		opacity: 1;
	}

	.dateBox {
		width: 226rpx;
		height: 60rpx;
		border: 1rpx solid #303030;
		opacity: 1;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.uni-list-cell-db {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 16rpx;
		color: #909090;
		opacity: 1;
	}

	.iconimg {
		width: 36rpx;
	}

	.task {
		width: 312rpx;
		height: 60rpx;
		border: 1rpx solid #303030;
		opacity: 1;
		border-radius: 12rpx;
		line-height: 60rpx;
		font-size: 24rpx;
	}

	.placeholderStyle {
		font-size: 24rpx;
		text-align: center;
		line-height: 60rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #909090;
		opacity: 1;
	}

	.taskBtn {
		width: 116rpx;
		height: 60rpx;
		background: #2b89f7;
		opacity: 1;
		border-radius: 12rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		opacity: 1;
		text-align: center;
		line-height: 60rpx;
	}

	.taskContentIn {
		background-color: #ffffff;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin: 20rpx;
		padding: 34rpx 30rpx;
	}

	.taskContentIn image {
		width: 38rpx;
		height: 38rpx;
	}

	.taskContentInList {
		margin-top: 25rpx;
		margin-left: 36rpx;
		display: flex;

		align-items: top;
	}

	.taskContentInListHead {
		width: 150rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		margin-left: 5rpx;
		color: #303030;
		opacity: 1;
	}

	.taskContentInListContent {
		width: 600rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;

		color: #303030;
		opacity: 1;
	}
</style>
