<template>
	<view class="newContainer">
		<view class="newBody">
			<view class="newList">
				<view class="newListTitle">
					整改单号
				</view>
				<view class="newListContent">
					ZGD202106160003
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
					{{}}
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
					张三
				</view>
			</view>
			<view class="newList">
				<view class="newListTitle">
					责任整改人签字
				</view>
				<view>
					<sign @success="getSign"></sign>
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
					2021-10-21
				</view>
			</view>
			<view class="newList" style="display: flex; flex-direction: column;">
				<view class="newListTitle">
					复查情况
				</view>
				<view class="textBox">
					<text>请按照要求进行整改</text>
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


			</view>



			<view class="photograpBox">
				<view class="newListTitle">
					隐患图片
				</view>
				<view class="hint">
					上传完图片后，可以点击图片进行编辑
				</view>
				<view class="photo">

					<view class="photograp">
						<image src="../../static/takephoto.png" mode="" @click="toPhoto()" />
					</view>
					<view class="choseImg" v-for="(item, index) in imgList" :key="index">
						<image :src="item" mode="" class="imgs"></image>
						<image :src="del" mode="" class="deleteImg" @click="deleimg(index)"></image>
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
				imgList: ["/static/takephoto.png"],
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
			deleimg(index) {
				this.imgList.splice(index);
				console.log("dele");
			},
			backTo() {
				uni.navigateBack({})
			},
			nextTo() {
				uni.navigateTo({
					url: "./newDetail"
				})
			},
			sign(value) {
				console.log(value)
			},

		},
		components: {
			sign
		},
		onShow() {
		this.newList=uni.getStorageSync('rectifyList',this.info);
		console.log(1111,this.newList);
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
						float: right;
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

			.hint {
				font-size: 28rpx;
				color: #D0CED8;
				margin: 20rpx 0;
			}

			.newListTitle {
				font-size: 28rpx;
				color: #303030;
			}

			.photo {
				margin-top: 74rpx;
				display: flex;

				.photograp {
					width: 160rpx;
					height: 160rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.choseImg {
					margin-left: 20rpx;
					width: 160rpx;
					height: 160rpx;
					position: relative;

					.imgs {
						width: 100%;
						height: 100%;
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
