<template>
	<view class="pages_rectify">
		<view class="navHeader">
			<view class="title">
				整改单
			</view>
			<image v-if="loginType==3||loginType==2" src="../../static/add.png" mode="widthFix" @click="addNewTo">
			</image>

		</view>
		<view class="rectifyContainer">
			<view class="rectifyBar">
				<view class="rectifyTop" v-if="(loginType!=1&&index>0)||loginType==1" v-for="(item,index) in listBar"
					:key="index" :class="{ active: currentIndex == index } " @click="changeNav(index)">
					{{item}}
				</view>
				
			</view>


			<searchBox :placeholderIn="placeholderIn" @search="search" ref="research"></searchBox>
			<view class="rectifyBody">
				<view class="rectifyList" v-for="(item,index) in listBody" :key="index" @click="changePage(item.id)">
					<view class="rectifyListIn">
						<image src="../../static/worktype.png" mode=""></image>
						<view class="rectifyListTitle">
							整改单号
						</view>
						<view class="rectifyListContent">
							{{item.cd}}
						</view>
					</view>
					<view class="rectifyListIn">
						<image src="../../static/workcontent.png" mode=""></image>
						<view class="rectifyListTitle">
							整改内容
						</view>
						<view class="rectifyListContent">
							{{item.requReport}}
						</view>
					</view>
					<view class="rectifyListIn">
						<image src="../../static/clock.png" mode=""></image>
						<view class="rectifyListTitle">
							下发日期
						</view>
						<view class="rectifyListContent">
							{{item.issueDate}}
						</view>
					</view>
					<view class="rectifyListIn" v-if="(currentIndex==0||currentIndex==1)&&loginType==1">
						<image src="../../static/currentstate.png" mode=""></image>
						<view class="rectifyListTitle">
							当前状态
						</view>
						<view class="rectifyListContent" style="color:#2B89F7">
							{{currentState(item.state)}}
						</view>
					</view>
					<view class="rectifyListIn" v-if="currentIndex==2&&loginType!=2">
						<image src="../../static/currentstate.png" mode=""></image>
						<view class="rectifyListTitle">
							签收日期
						</view>
						<view class="rectifyListContent">
							{{item.receiptDate}}
						</view>
					</view>
					<view class="rectifyListIn" v-if="currentIndex==3">
						<image src="../../static/currentstate.png" mode=""></image>
						<view class="rectifyListTitle">
							完成日期
						</view>
						<view class="rectifyListContent">
							{{item.closeDate}}
						</view>
					</view>
					<view class="rectifyListIn" v-if="currentIndex==2&&loginType==2">
						<image src="../../static/currentstate.png" mode=""></image>
						<view class="rectifyListTitle">
							当前状态
						</view>
						<view class="rectifyListContent" style="color: #F1C345;">
							待结案
						</view>
					</view>
				</view>
				<nomore></nomore>
			</view>

		</view>


		<tabbar :loginType="loginType" :tabIndex="tabIndex"></tabbar>
	</view>
</template>

<script>
	import tabbar from "components/tabbar.vue"
	import searchBox from "../../components/searchBox.vue"
	import nomore from "../../components/nomore.vue"
	export default {
		data() {
			return {
				placeholderIn: "任务编号、任务内容",
				loginType: 2,
				currentIndex: 1,
				searchFlag:false,
				page1:{
					
				},
				page: {
					current: 1,
					size: 5
				},
				listBar: ["待签收", "待执行", "待结案", "已完成"],
				listBody: [
					
				]
			}
		},
		components: {
			tabbar,
			searchBox,
			nomore
		},

		computed: {
			tabIndex() {
				if (this.loginType == 1) {
					return 2
				} else {
					return 1
				}
			},
			currentState() {
				return function(state) {
					if (state == 1)
						return "待签收";
					else if (state == 2)
						return "待执行";
					else if (state == 3)
						return "已完成"
					else if (state == 4)
						return "已结案"
				}  
			}
		},
		methods: {
			changeNav(index) {
				this.currentIndex = index;
				this.listBody=[]
				this.getList({
					state: this.currentIndex + 1,
					deptId:this.userinfo.dept_id,
					current:1,
					size:5
				})
				this.searchFlag=false
				this.$refs.research.cd=''
				this.$refs.research.date=''
			},
			change(path) {
				uni.reLaunch({
					url: path,
				});
			},
			changePage(id) {
				uni.navigateTo({
					url: `./detail?id=${id}`,

				})
			},
			addNewTo() {
				uni.navigateTo({
					url: "./new"
				})
			},
			async getList(params) {
				console.log(1111);
				let data = await this.api.getRecityList(params)
				this.listBody = [...this.listBody, ...data.records]
				this.total = data.total;
				console.log(data.records);
			},
			async handelSearch(params){
				await this.api.getBillSearch(this.page1).then(res=>{
				    this.searchFlag=true
					this.total=res.total
					this.listBody = [...this.listBody, ...res.records]
				})
			},
			 search(data){
				// console.log({...data,state:this.currentIndex + 1});
				this.page1={
					state:this.currentIndex + 1,
					current: 1,
					size: 5,
					cd:data.cd
				}
				this.model=data
				console.log('进来了',this.model)
				if(data.date!=""){
				
					this.page1.issueDate=data.date
				}
				this.handelSearch(this.page1)
			
				
			}
		},
		onLoad() {
			this.loginType = uni.getStorageSync("loginType")
			this.userinfo=uni.getStorageSync("userinfo")
		
			
		},
		onShow() {
			uni.hideTabBar({
				animation: false,

			})
			if (this.loginType == 1) {
				this.currentIndex = 0
			} else {
				this.currentIndex = 1
			}
			this.listBody = []
			this.page = {
				curretn: 1,
				size: 5
			}
			this.getList({
				...{
					state: this.currentIndex + 1,
					deptId:this.userinfo.dept_id,
				},
				...this.page
			})
			this.searchFlag=false
			this.$refs.research.cd=''
			this.$refs.research.date=''

		},
		// 触底加载更多数据
		onReachBottom() {
			console.log('触底');
			if (this.total <= this.listBody.length) {
				console.log(this.total, this.listBody.length, "fffff");
			}
			else{
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
							deptId:this.userinfo.dept_id,
						}
					});
				}
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.listBody=[]
			this.page = {
				current: 1,
				size: 5,
			}
		
			if(this.searchFlag){
				this.handelSearch(this.page1)
			}
			else
			{
				this.getList({
					...this.page,
					...{
						state: this.currentIndex + 1,
						deptId:this.userinfo.dept_id,
						// types:1
					}
				})
			}
		
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
		


	}
</script>

<style lang="scss" scoped>
	.pages_rectify {
		background-color: #fafafa;
		// display: flex;
		// flex-direction: column;
		height: 100vh;

		.navHeader {
			// height: 60rpx;
			// background-color: #fafafa;
			// position: fixed;
			// top: 0;

			// display: flex;
			// align-items: center;
			// justify-content: center;
			// padding: 14rpx 6rpx;
			// padding-top:var(--status-bar-height);
			// z-index: 1000;
			background-color: #fafafa;
			position: fixed;
			top: 0;
			// text-align: center;
			height: 88upx;
			// line-height: 88upx;
			width: 100%;
			font-size: 34rpx;
			color: #000000;
			padding-top: var(--status-bar-height);
			z-index: 1000;

			.title {
				width: 102rpx;
				height: 48rpx;
				font-size: 34rpx;
				font-family: PingFang SC;
				// font-weight: 500;
				line-height: 48rpx;
				color: #000000;
				opacity: 1;
				position: absolute;
				left: 50%;
				top: 60%;
				transform: translateX(-50%);
			}

			image {
				width: 36rpx;
				height: 40rpx;
				opacity: 1;
				position: absolute;
				top: calc(24upx + var(--status-bar-height));
				right: 40rpx;
			}
		}

		.rectifyContainer {
			// flex: 1;
			// overflow: auto;
			padding: 88upx 0upx 173upx;
			margin-top: var(--status-bar-height);

			.rectifyBar {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 750rpx;
				height: 100rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 12rpx;

				.rectifyTop {
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

			}



			.rectifyBody {
				padding: 20rpx;

				.rectifyList {
					background: #FFFFFF;
					box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
					opacity: 1;
					border-radius: 12rpx;
					padding: 36rpx 0 36rpx 36rpx;
					margin-bottom: 20rpx;

					.rectifyListIn {
						display: flex;
						align-items: top;
						margin-bottom: 20rpx;
						color: #303030;
						opacity: 1;

						image {
							width: 38rpx;
							height: 38rpx;
						}

						.rectifyListTitle {
							width: 150rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							margin-left: 2rpx;
							color: #303030;
							opacity: 1;
						}

						.rectifyListContent {
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
		}
	}
</style>
