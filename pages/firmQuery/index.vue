<template>
	<!-- 企业查页面 -->
	<view class="pages_firmquery_tab">
		<!--自定义 navbar -->
		<view class="navbar">
			企业查
		</view>
		<view class="container">

			<view class="search_bar">
				<view class="inputbox">
					<image :src="search" mode="widthFix"></image>
					<input type="text" placeholder="请输入企业名称查询" maxlength="15" placeholder-style="color:#909090"
						v-model="searchinfo" />
				</view>
				<view class="btn_search" @click="search1">
					搜索
				</view>
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
						<!-- <view class="item_content" ></view> -->
					</view>
					<view class="item_container">
						<view class="item_title">联系电话:</view>
						<view class="item_content" v-if="item.user.length>0">{{item.user[0].phone}}</view>
						<!-- <view class="item_content" ></view> -->
					</view>
					<view class="item_container">
						<view class="item_title">企业码:</view>
						<view class="item_content">
							<!-- <image :src="corcode" mode="widthFix" /> -->
							<yuanqi-qr-code 
							    ref="yuanqiQRCode"
							    :text="'/pages/firmQuery/detail?id='+item.id"
								:size="size"
							    ></yuanqi-qr-code>
						</view>
					</view>
				</view>
			</view>
			
			<nomore />
		</view>
		<tabbar :loginType="loginType" :tabIndex='2'> </tabbar>
	</view>
</template>

<script>
	import tabbar from "components/tabbar";
	// 引入触底提示组件
	import nomore from "components/nomore";
	import corcode from "static/corcode.png";
	import search from "static/search.png";
	// 获取dept_id,传给后台筛选数据
	var subjectDept=uni.getStorageSync("userinfo").dept_id;
	export default {
		data() {
			return {
				searchinfo: "", //输入的搜索信息
				searchflag:false,//判断是列表分页还是搜索后的列表分页
				loginType: 2,
				search,
				size:200,
				logo:"/static/avatar.png",
				page1: {//列表分页传参
					current: 1,
					size: 2,
				}, 
				page2: {//搜索分页传参
					current: 1,
					size: 2,
				}, 
				total: 0, //数据库中数据长度
				// 企业查询列表
				queryList: [
					// {
					// 	//公司名称
					// 	name: "广知科技有限公司",
					// 	//联系人
					// 	contact: "张章",
					// 	tel: "13900110000", //联系电话
					// 	corcode: corcode, //企业码
					// 	id: 0
					// },
					// {
					// 	//公司名称
					// 	name: "广知科技有限公司",
					// 	//联系人
					// 	contact: "张章",
					// 	tel: "13900110000", //联系电话
					// 	corcode: corcode, //企业码
					// 	id: 1
					// },
					// {
					// 	//公司名称
					// 	name: "广知科技有限公司",
					// 	//联系人
					// 	contact: "张章",
					// 	tel: "13900110000", //联系电话
					// 	corcode: corcode, //企业码
					// 	id: 2
					// },
				],
				corcode: corcode, //企业码
			}
		},
		components: {
			tabbar,
			nomore,

		},
		
		methods: {
			// 切换tab 
			tabChange(path) {
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
			// 处理点击搜索事件
			search1(){ 
				console.log("搜索按钮触发");
				this.page2={current:1,size:1,deptName:this.searchinfo}
				this.queryList = [];
				this.handlesearch(this.page2)
				
			},
			// 处理搜索请求
			async handlesearch(params) {
				let data=await this.api.getFirmQuerySearch(params);
				console.log("搜搜",data)
				this.total=data.total;
				// let handledata=data.map(item=> ({...item.dept,...{user:item.users}}))
				this.queryList = [...this.queryList, ...data.records]
				this.searchflag=true;
				console.log("处理搜索请求",data);    
			},
			// 进入详情
			GoToDetail(id) {     
				console.log("detail");
				uni.navigateTo({
					url: `/pages/firmQuery/detail?id=${id}`
				})
			},
			// 获取企业查询列表
			async getList(params) {
				console.log("参数",params);
				let data = await this.api.getFirmQueryList(params)
				console.log("企业查列表",data);
				this.queryList = [...this.queryList, ...data.records]
				this.total = data.total;
			}
		},
		onLoad() {
			// 从缓存中获取loginType,角色信息
			this.loginType = uni.getStorageSync("loginType")
			subjectDept=uni.getStorageSync("userinfo").dept_id;
			
			this.searchinfo=""//清空输入框
			this.page1 = {
				current: 1,
				size: 5,
				subjectDept
			}
			
			this.queryList = [];
			this.getList(this.page1)
		},
		mounted(){
			console.log("mounted1111111111111111111111111111111111111111");
			// 生成二维码
			let coderefs=[];
			if(this.$refs.yuanqiQRCode)
			coderefs=this.$refs.yuanqiQRCode;
			console.log("111",coderefs);
			if(coderefs.length>0){
				for(let i=0;i<coderefs.length;i++)
			 this.$refs.yuanqiQRCode[i].make();
			}
			
		},
		 onShow() {
			
			//隐藏默认tabbar显示自定义tabbar
			uni.hideTabBar({
				animation: false,

			})
			
			// 生成二维码
			// let coderefs=this.$refs.yuanqiQRCode;
			// console.log("111",coderefs);
			// if(!coderefs){
			// 	for(let i=0;i<coderefs.length;i++)
			//  this.$refs.yuanqiQRCode[i].make();
			// }
			


		},
		// 触底加载更多数据
		onReachBottom() {
			console.log('触底');
			
				if (this.total <= this.queryList.length) {
				console.log(this.total, this.queryList.length, "fffff");
			} else {
				console.log(this.total, this.queryList.length,"dddddd");
				if(this.searchflag)//搜索分页
				{
					this.page2.current += 1;
					this.handlesearch(this.page2)
				}
				else{
					this.page1.current += 1;
					this.getList(this.page1);
				}
				
			}
			
		},
		// 下拉重新加载
		onPullDownRefresh(){
			this.searchinfo=""
				this.page1 = {
					current: 1,
					size: 5,
					subjectDept
				}
				this.queryList = [];
				this.getList(this.page1)
				setTimeout(function(){
					uni.stopPullDownRefresh()
				},1000)
			
		}
	}
</script>

<style lang="scss" scoped>
	.pages_firmquery_tab {
		width: 100%;
		height: 100vh;
		// display: flex;
		// flex-direction: column;
		background-color: #fafafa;

		.navbar {
			background-color: #fafafa;
			position: fixed;
			text-align: center;
			height: 88upx;
			line-height: 88upx;
			width: 100%;
			top: 0;
			font-size: 34rpx;
			color: #000000;
			padding-top:var(--status-bar-height);
			z-index: 1000;
		}

		.container {

			width: 100%;
			box-sizing: border-box;
			background-color: #fff;
			// flex: 1;
			// overflow-y: auto;
			// -webkit-overflow-scrolling: touch;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 128upx 20upx 213upx;
			margin-top: var(--status-bar-height);



			.search_bar {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30upx;
				height: 64upx;

				.inputbox {
					box-sizing: border-box;
					border-radius: 12upx;
					background-color: #fafafa;
					padding: 0 24upx;
					display: flex;
					align-items: center;
					width: 560upx;
					height: 64upx;
					line-height: 64upx;

					input {
						width: 448upx;
						height: 40upx;
						font-size: 28upx;
					}

					image {
						width: 32upx;
						margin-right: 22upx;
					}
				}

				.btn_search {
					width: 132upx;
					height: 64upx;
					background: #2B89F7;
					box-shadow: 0px 6upx 12upx rgba(43, 137, 247, 0.26);
					opacity: 1;
					border-radius: 12upx;
					line-height: 64upx;
					text-align: center;
					font-size: 24upx;
					color: #FFFFFF;
				}
			}

			.firm_query_container {
				width: 100%;
				display: flex;
				flex-direction: column;

				.firm_query_item {
					width: 100%;
					box-sizing: border-box;
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
</style>
