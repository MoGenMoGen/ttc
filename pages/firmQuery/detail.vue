<template>
	<!-- 企业查询详情页面 -->
	<view class="pages_warn_detail">
		<view class="container">

			<view class="list">
				<view class="item">
					<text class="title">公司名称</text>
					<text class="content">{{ info.fullName }}</text>
				</view>

				<view class="item">
					<text class="title">公司地址</text>
					<text class="content">{{ info.addr }}</text>
				</view>
				<view class="item">
					<text class="title">联系人 </text>
					<text class="content">{{ info.user[0].name }}</text>
				</view>
				<view class="item">
					<text class="title">联系电话</text>
					<text class="content">{{ info.user[0].phone }}</text>
				</view>

				<view class="item">
					<!-- loginType==2 -->
					<text class="title" v-if="loginType==2">自检任务</text>
					<!-- loginType==3 -->
					<text class="title border" @click="handleSelfCheck" v-else >自检任务</text>
					<text class="content red">{{ info.taskBillCount }}</text>
				</view>
				<view class="item">
					<text class="title border" @click="handleRedify">整改单数</text>
					<text class="content red">{{ info.rectifyBillCount }}</text>
				</view>

				<view class="item">
					<text class="title">预警提醒</text>
					<text class="content red">{{ info.warningCount }}</text>
				</view>

				<view class="item">
					<text class="title">企业码</text>
					<!-- <image :src="info.code" mode="widthFix"></image> -->
					 <yuanqi-qr-code
					     ref="yuanqiQRCode"
					     :text="'/pages/firmQuery/detail?id='+id"
					 	:size="size"
					 	logo="/static/avatar.png"
					     ></yuanqi-qr-code>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import corcode from "static/corcode.png"
	export default {
		data() {
			return {
				size:200,
				logo:"/static/avatar.png",
				id:"",
				info: {
					// 公司名称
					fullName: "摩根电器有限公司",
					//公司地址
					addr: "宁波镇海 329创业社区二楼",
					user:[{phone:"",name:""}],
					// // 联系人 
					// contactor: "摩根",
					// // 联系电话
					// tel: "15185161111",
					// 自检任务
					taskBillCount: 0,
					// 整改单数
					rectifyBillCount: 0,
					// 预警提醒
					warningCount: 0,
				},
				// loginType只能为2/3
				loginType: 2
			};
		},
		methods: {
			// 处理自检任务
			handleSelfCheck() {
				uni.navigateTo({
					url: "/pages/selfCheck/index"
				})

			},
			// 处理整改单
			handleRedify() {
				uni.reLaunch({
					url: "/pages/rectify/index"
				})
			}
		},
		async onLoad(e) {
			this.id=e.id;
			// 从缓存中获取loginType,角色信息
			this.loginType = uni.getStorageSync("loginType")
			
			let data=await this.api.getFirmQueryDetail({id:this.id})
			this.info=data;
			console.log("企业查详情",data);
		},
		mounted(){
			console.log("mounted");
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

					.border {
						border-bottom: 2upx solid rgba(0, 0, 0, .5);
					}

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

					image {
						width: 173upx;
					}
				}
			}
		}
	}
</style>
