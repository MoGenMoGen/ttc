<template>
	<view class="newContainer">
		<view class="newBody">
			<view class="newList">
				<view class="newListTitle">
					整改单号
				</view>
				<view class="newListContent">
					{{newList.cd}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改名称
				</view>
				<view class="newListContent">
					{{newList.title}}
				</view>

			</view>
			<view class="newList">
				<view class="newListTitle">
					整改单位
				</view>
				<view class="newListContent">
					{{newList.AttrSystem}}
				</view>
			</view>
			<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					存在问题
				</view>
				<view class="textBox">
					<text>{{newList.troubleReport}}</text>
				</view>
			</view>
			<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					整改要求
				</view>
				<view class="textBox">
					<text>{{newList.requReport}}</text>
				</view>
			</view>


			<view class="newList">
				<view class="newListTitle">
					责任整改人
				</view>
				<view class="newListContent">
					{{newList.person}}
				</view>
			</view>
			<view class="newList" style="flex-direction: column;">
				<view class="newListTitle">
					服务商签字
				</view>
				<view class="signBox" style="width: 100%;">
					<sign @signImage="signImage"></sign>
				</view>

			</view>
			<view class="newList" style="flex-direction: column;">
				<view class="newListTitle">
					企业签字
				</view>
			<view class="signBox" style="width: 100%;">
				<sign @signImage="signImageTwo"></sign>
			</view>
			
			</view>
			<view class="newList">
				<view class="newListTitle">
					整改日期
				</view>
				<view class="newListContent">
					{{newList.rectifyDate}}
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					复查日期
				</view>
				<view class="newListContent">
					<picker mode="date" :value="nowDate" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input" style="display: flex; align-items: center;">{{nowDate}}
							<image src="../../static/choosedate.png" mode="" class="date"></image>
						</view>
					</picker>
				</view>
			</view>
		<!-- 	<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					复查情况
				</view>
				<view class="textBox">
	
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					签发人签字
				</view>

			</view>
			<view class="newList">
				<view class="newListTitle">
					审核人签字
				</view>


			</view> -->



			<view class="photograpBox">
				<view class="newListTitle">
					隐患图片
				</view>
				
				<view class="photo">
					<view class="choseImg" v-for="(item, index) in newList.imgList" :key="index">
						<image :src="item" mode="" class="imgs" @click="enlarge(index)"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="newBtn">
			<button type="default" class="cancel" @click="backTo">上一步</button>
			<button type="default" class="next" @click="nextTo">确认 </button>
		</view>
	</view>
</template>

<script>
	import del from "static/delete.png";
	import sign from './../../components/sign'
	export default {
		
		data() {
			return {
				del,
				nowDate:"",
				
				newList:{
					
				}
			}
		},
		methods: {
			toPhoto() {
				uni.chooseImage({
					sourceType: ["camera", "album "],
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					},
					fail(err) {
						console.log(err);
					},
				}); 
			},
			enlarge(index){
				uni.previewImage({
					current:this.newList.imgList[index],
					urls:this.newList.imgList,
					indicator:"default"
				})
			},
			deleimg(index) {
				this.newList.imgList.splice(index,1);
				console.log("dele");
			},
			backTo() {
				uni.navigateBack({})
			},
			nextTo() {
				console.log("111",this.newList.issueSign);
				console.log("222",this.newList.receiptSign);
				if(!this.newList.issueSign){
					uni.showToast({
						title:"服务商未签字",
						icon:"none",
					})
					return false
				}
				else if(!this.newList.receiptSign){
					uni.showToast({
						title:"企业未签字",
						icon:"none"
					})
					return false
				}
				this.newList.reviewTime=this.nowDate
				// this.api.postNewList(this.newList).then(res=>{
				// 	console.log(res)
				// })
				// uni.reLaunch({
				// 	url: "./newDetail?cd="+this.newList.cd
				// })
					

				
			},
			getSign(value) {
				console.log(value)
			},
			bindDateChange(e){
				console.log(e);
				this.nowDate= e.target.value
			},
			getDate(type) {
				const date = new Date(this.newList.rectifyDate).getTime()+48 * 60 * 60 * 1000;
				let date1 = new Date(date)
				let year = date1.getFullYear();
				let month = date1.getMonth() + 1;
				let day = date1.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			async signImage(signImage){
				this.newList.issueSign=await this.api.upLoad(signImage);
				console.log("guagua",this.bodyList.receiptSign);
			},
			async signImageTwo(signImage){
				this.newList.receiptSign=await this.api.upLoad(signImage);
				console.log("guagua",this.bodyList.receiptSign);
			},
			
		},
		components: {
			sign
		},
		onShow() {
		this.newList=uni.getStorageSync('rectifyList');
		console.log(1111,this.newList);
		this.nowDate= this.getDate({
				format: true,
			})
		}
	}
</script>

<style lang="scss" scoped>
	.newContainer {
		background-color: #fafafa; 
		display: flex;
		padding: 20rpx;
		flex-direction: column;

		.newBtn {
			margin-top: 50rpx;
			display: flex;
			padding: 100rpx 0;

			.cancel {
				width: 355rpx;
				height: 88rpx;
				background: #FFFFFF;
				border: 2rpx solid #2B89F7;
				opacity: 1;
				border-radius: 12rpx 0rpx 0rpx 12rpx;
				font-size: 28rpx;
				color: #303030;
				line-height: 88rpx;
			}

			.next {
				width: 355rpx;
				height: 88rpx;
				background: #2B89F7;
				border: 2rpx solid #2B89F7;
				opacity: 1;
				border-radius: 0rpx 12rpx 12rpx 0rpx;
				color: #ffffff;
				font-size: 28rpx;
				line-height: 88rpx;
			}
		}

		.newBody {
			width: 710rpx;

			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
			opacity: 1;
			border-radius: 12rpx;
			padding: 40rpx;
			box-sizing: border-box;

			.newList {
				display: flex;
				padding: 20rpx 14rpx;
				position: relative;
				width: 656rpx;
				background: #FFFFFF;
				opacity: 1;
				border-bottom: 1rpx solid #D0CED8;
				// align-items: center;
				box-sizing: border-box;

				.textBox {
					box-sizing: border-box;
					padding: 18rpx 22rpx;
					width: 624rpx;
					height: 206rpx;
					border: 1rpx solid #D0CED8;
					opacity: 1;
					border-radius: 6rpx;
					margin: 20rpx 0;

					text {
						font-size: 28rpx;
						color: #303030;
					}
				}

				.newListTitle {
					width: 200rpx;
					font-size: 28rpx;
					color: #303030;
				}
				
				.signBox {
					width: 100%;
				}

				.newListContent {
					width: 456rpx;
					margin-left: 30rpx;
					word-wrap: break-word;
					font-size: 28rpx;
					

					.location {
						width: 48rpx;
						height: 48rpx;
						float: right;
					}

					.date {
						width: 48rpx;
						height: 48rpx;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 3rpx;
					}
				}

				.text {
					width: 624rpx;
					height: 206rpx;
					background: #FCFCFC;
					opacity: 1;
					border-radius: 6rpx;
					font-size: 28rpx;

					padding: 18rpx 36rpx;
					box-sizing: border-box;
					margin-top: 20rpx;
				}

				.placeholderIn {
					color: #D0CED8;
				}

				input {
					font-size: 28rpx;

				}
			}

		}

		.photograpBox {
			padding: 20rpx 14rpx;

			.newListTitle {
				font-size: 28rpx;
				color: #303030;
			}

			.photo {
				margin-top: 74rpx;
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				.photograp {
					margin-left: 20rpx;
					width: 160rpx;
					height: 160rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}

				.choseImg {
					margin-left: 20rpx;
					// width: 160rpx;
					// height: 160rpx;
					position: relative;

					.imgs {
						width: 160rpx;
						height: 160rpx;
					}

					.deleteImg {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						top: -16rpx;
						right: -16rpx;
					}
				}
			}
		}

	}
</style>
