<!-- 自检详情页面 -->
<template>
	<view class="taskDetails">
		<view class="taskContent">
			<view class="taskContentInList">
				<text class="taskContentInListHead">任务编号 </text>
				<text class="taskContentInListContent">{{ arr.cd }}</text>
			</view>
			<view class="taskContentInListTwo">
				<!-- <text class="taskContentInListHead" v-if="loginType == 3 && currentIndex == 1">提醒内容</text> -->
				<text class="taskContentInListHead">任务内容</text>
				<text class="taskContentInListContent">{{ arr.contReport }}</text>
			</view>
			<!-- <view class="taskContentInListTwo" v-if="loginType == 3">
				<text class="taskContentInListHead">整改单位</text>
				<text class="taskContentInListContent">{{ arr.reform }}</text>
			</view> -->
			<view class="taskContentInList" v-if="loginType == 3">
				<text class="taskContentInListHead">企业名称 </text>
				<text class="taskContentInListContent">{{ arr.performOrgName }}</text>
			</view>
			<!-- <view class="taskContentInList" v-if="loginType == 3 && currentIndex==2">
				<text class="taskContentInListHead">施工单位 </text>
				<text class="taskContentInListContent">{{ arr.Construction }}</text>
			</view> -->

			<view class="taskContentInList">
				<text class="taskContentInListHead">执行人 </text>
				<text class="taskContentInListContent">{{ arr.issueUserName }}</text>
			</view>
			<view class="taskContentInList">
				<text class="taskContentInListHead">下发日期</text>
				<text class="taskContentInListContent">{{ arr.issueDate }}</text>
			</view>
			<view class="taskContentInList">
				<text class="taskContentInListHead">截止日期 </text>
				<text class="taskContentInListContent">{{ arr.completeDate }}</text>
			</view>

			<view class="taskContentInList" v-if="loginType == 3&& currentIndex==2">
				<text class="taskContentInListHead">复查日期</text>
				<text class="taskContentInListContent">{{ arr.reviewTime }}</text>
			</view>
			<view class="taskContentInList" v-if="loginType == 3&& currentIndex==2">
				<text class="taskContentInListHead">任务状态</text>
				<text class="taskContentInListContent">{{currentState(arr.warningState) }}</text>
			</view>
			<view class="taskContentInList" v-if="currentIndex == 2">
				<text class="taskContentInListHead">完成日期</text>
				<text class="taskContentInListContent">{{arr.completeTime}}</text>
			</view>

			<view class="taskContentInList"
				v-if=" (currentIndex != 0 && loginType == 1) || (currentIndex == 1 && loginType == 3) ">
				<text class="taskContentInListHead">逾期天数</text>
				<text style="color:red" class="taskContentInListContent">{{arr.nextDate}}</text>
			</view>
		</view>
		<view class="taskBodyOne">
			<view class="taskChose" v-if="currentIndex!=2">
				<view class="taskChoseList" v-for="(item, index) in arr.taskItemList" :key="index"
					v-if="item.taskBillItem.types==1">
					<view class="ListHead">
						<text>{{ index + 1 }}、 </text>
						<text>{{ item.taskBillItem.name }}</text>
					</view>
					<view class="choose">

						<view>
							<radio-group @change="radioChange(index,$event)">
								<label v-for="(item1,index1) in item.taskItemOption" :key="item1.id" class="radioInput">
									<radio :value="item1.id" style="transform: scale(0.60)" />
									<text style="font-size: 28rpx;">{{item1.cont}}</text>
								</label>
							</radio-group>

						</view>
					</view>
					<view class="photo" style="margin-top: 20rpx;">
						<view class="photograp">
							<image src="../../static/takephoto.png" mode="" @click="toPhoto(index)" />
						</view>

						<view class="choseImg" v-for="(item2, index2) in imgList[index].taskPic" :key="index2"
							style="margin-left: 25rpx;">
							<image :src="item2" mode="" class="imgs" @click="enlarge(index,index2)"/>
							<image class="deleteImg" :src="del" mode="" @click="deleimg(index2,index)" />
						</view>
					</view>
				</view>
				<view class="taskChoseList" v-for="(item,index) in arr.taskItemList" :key="index"
					v-if="item.taskBillItem.types==2">
					<view class="ListHead">
						<text>{{ index + 1 }}、 </text>
						<text>{{ item.taskBillItem.name }}</text>
					</view>
					<view class="choose">
						<view>
							<checkbox-group @change="checkboxChange(index,$event)">
								<label v-for="(item1,index1) in item.taskItemOption" :key="item1.id" class="radioInput">
									<checkbox :value="item1.id" /><text style="font-size:28rpx ;">{{item1.cont}}</text>
								</label>
							</checkbox-group>
						</view>
					</view>
					<view class="photo">
						<view class="photograp">
							<image src="../../static/takephoto.png" mode="" @click="toPhoto(index)" />
						</view>

						<view class="choseImg" v-for="(item2, index2) in imgList[index].taskPic" :key="index2">
							<image :src="item2" mode="" class="imgs" @click="enlarge(index,index2)"/>
							<image class="deleteImg" :src="del" mode="" @click="deleimg(index2,index)" />
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="photograpBox" v-if="currentIndex!=2">
				<view class="title" style="font-size: 28rpx;">拍照上传 </view>
				<view class="photo">
					<view class="photograp" v-if="loginType == 1">
						<image src="../../static/takephoto.png" mode="" @click="toPhoto()" />
					</view>

					<view class="choseImg" v-for="(item, index) in imgList" :key="index">
						<image :src="item" mode="" class="imgs" v-if="loginType == 1" />
						<image v-if="loginType == 1" class="deleteImg" :src="del" mode="" @click="deleimg(index)" />
					</view>
				</view>
			</view> -->
			<view class="note" v-if="currentIndex!=2">
				<view class="noteTitle">备注</view>
				<textarea v-if="loginType==1" v-model="textIn" class="textIn" name="" id="" cols="30" rows="10"
					placeholder="多行输入" placeholder-class="textInPlaceholder"></textarea>
			</view>
			<view class="bottomBtn" v-if="loginType==1&&currentIndex!=2">
				<button class="cancel" @click="backTo">取消</button>
				<button class="confirm" @click="sureTo">确认完成</button>
			</view>
			<view class="taskState" v-if="loginType==3&&currentIndex!=2">
				<text>任务状态</text>
				<text class="perform">{{currentState(arr.warningState)}}</text>
			</view>
		</view>
		<view class="taskBodyTwo" v-if="currentIndex == 2">
			<view class="taskIn">
				<view class="taskInList" v-for="(item, index) in arr.taskItemList" :key="index">
					<text>{{ index +1}}、 </text>
					<text>{{ item.taskBillItem.name }}</text>
					<view class="taskInCase" v-for="(item1,index1) in item.taskItemOption" :key="index">
						<text v-if="item1.state==1">{{item1.cont}}</text>
					</view>
					<view class="photo" v-for="(item2,index2) in item.taskBillItem.taskPic" :key="index2"
						style="margin-top: 0rpx;">
						<image :src="item2" mode="" style="height: 160rpx; width: 160rpx;"
							@click="enlargeTwo(index,index2)"></image>
					</view>
				</view>
			</view>
			<!-- 	<view class="choosedImg">
				<view class="imgContainer" >
					<image v-for="(item,index) in arr.taskPic" :key="index" :src="item" mode="" @click="enlarge(index)"/>
				</view>
			</view> -->
			<view class="note">
				<view class="noteTitle" style="font-size: 28rpx;">
					备注
				</view>
				<view class="noteContainer" style="font-size: 28rpx; margin-top: 15rpx;">
					{{arr.rmks}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import del from "static/delete.png";
	export default {
		data() {
			return {
				currentIndex: 1,
				imgList: [],
				picflag: false,
				textIn: "",
				loginType: 2,
				del,
				activeRadio: "",
				check: "10",
				checkTwo: "20",

				items: [{
						name: "有",

					},
					{
						name: "无",
					},
				],
				taskItemList: [],
				arr: {

				},
				taskChoseArr: [],
				taskItemOption: [],
				list: {

				}
			};
		},
		computed: {
			currentState() {
				return function(warningState) {
					if (warningState == 1)
						return "待执行";
					else if (warningState == 2)
						return "已逾期";
					else if (warningState == 3)
						return "已完成"

				}
			}
		},
		methods: {
			async toPhoto(index) {
				console.log("111222", index);
				console.table({
					orignlist: this.imgList[index].taskPic
				});
				this.imgList[index].taskPic = [...this.imgList[index].taskPic, ...await this.api.chooseImages('', 9)];
				console.log("ssss", this.imgList[index]);
				// console.log("wwwwww",await this.api.chooseImages('', 9));
				let path = this.imgList[index].taskPic;
				// console.log("wew", this.imgList[index].taskPic)
				let path1 = [];
				// this.arr.taskPic = '';
				for (let i = 0; i < path.length; i++) {
					console.log(i, "dwsfsf54645646");
					let res = await this.api.upLoad(path[i]);
					path1.push(res)
				}
				this.arr.serverimgList = path1;
				this.arr.taskPic = this.arr.serverimgList.join(",");
			},
			enlarge(index,index2) {
				uni.previewImage({
					current: this.imgList[index].taskPic[index2],
					urls:this.imgList[index].taskPic,
					indicator: "default"
				})
			},
			enlargeTwo(index, index2) {
				uni.previewImage({
					current: this.arr.taskItemList[index].taskBillItem.taskPic[index2],
					urls: this.arr.taskItemList[index].taskBillItem.taskPic,
					indicator: "default"
				})
			},
			deleimg(index2, index) {
				this.imgList[index].taskPic.splice(index2, 1)
				this.imgList.push()
				console.log(this.imgList[index])
			},
			backTo() {
				uni.navigateBack()
			},
			sureTo() {
				// this.arr.taskPic=this.arr.serverimgList.join(",");
				this.list.rmks = this.textIn
				for (let i = 0; i < this.this.arr.taskItemList.length; i++) {
					if (this.imgList[i].taskPic.length == 0) {
						this.picflag = false
						break
					} else {
						this.picflag = true
					}
				}
				if (this.picflag == false) {
					uni.showToast({
						title: "请拍照",
						icon: "none"
					})
					return false
				} else if (this.list.rmks == "") {
					uni.showToast({
						title: "请输入备注",
						icon: "none"
					})
					return false
				} else if (this.taskChoseArr.length != this.arr.taskItemList.length) {
					uni.showToast({
						title: "存在选项未选",
						icon: "none"
					})
					return false
				}
				this.taskChoseArr.forEach(item=>{
					this.taskItemOption=this.taskItemOption.concat(item.optionId)
				})
			for(let i=0;i<this.arr.taskItemList.length;i++){
				console.log(89898989);
				console.log("qqw",this.arr.taskItemList[i].taskBillItem.id);
				console.log("qqw",this.list.taskItemOption[i].id);
				this.list.taskItemOption[i].id=this.taskItemOption[i]
				this.list.taskItemOption[i].billId=this.id
				this.list.taskItemOption[i].billItemId=this.arr.taskItemList[i].taskBillItem.id
				this.list.taskItemOption[i].taskPic=this.imgList[i].taskPic.join(",")
			}
			this.api.postBillSubmit(this.list)
				uni.navigateBack({

				})
			},
			radioChange: function(index, evt) {
				console.log(evt, index)
				let data = {
					itemId: this.arr.taskItemList[index].taskBillItem.id,
					optionId: evt.detail.value
				}
				if (this.taskChoseArr.length === 0) {
					this.taskChoseArr.push(data)
				} else {
					console.log(this.taskChoseArr.filter(item => item.itemId == data.itemId));
					if (this.taskChoseArr.filter(item => item.itemId == data.itemId).length == 1) {
						this.taskChoseArr.forEach(item1 => {
							if (item1.itemId == data.itemId) {
								item1.optionId = data.optionId
							}
						})
					} else {
						this.taskChoseArr.push(data)
					}
				}

				console.log(this.taskChoseArr)
			},

			checkboxChange: function(index, evt) {
				console.log(index, evt.detail.value)

				let data = {
					itemId: this.arr.taskItemList[index].taskBillItem.id,
					optionId: evt.detail.value
				}
				if (this.taskChoseArr.length == 0) {
					this.taskChoseArr.push(data)
				} else {
					// console.log(this.taskChoseArr.filter(item => item.itemId == data.itemId));
					if (this.taskChoseArr.filter(item => item.itemId == data.itemId).length == 1) {
						this.taskChoseArr.forEach(item1 => {
							if (item1.itemId == data.itemId) {
								item1.optionId = data.optionId
							}
						})
					} else {
						this.taskChoseArr.push(data)
					}
				}
				console.log("11", this.taskChoseArr);



			}

		},
	async onLoad(e) {
	
		this.id = e.id
		this.currentIndex = e.currentIndex;
		// 从缓存中获取loginType,角色信息
		this.loginType = uni.getStorageSync("loginType")
		this.arr = await this.api.getBillDetail({
			id: this.id
		})
		
		this.list.taskItemOption=[]
		
		
		for(var i=0; i<this.arr.taskItemList.length;i++){
			this.imgList[i]={
				taskPic:[]
			}
			
			this.list.taskItemOption[i]={
				
			}
			this.arr.taskItemList[i].taskBillItem.taskPic=this.arr.taskItemList[i].taskBillItem.taskPic.split(",")
		}
		console.log("77777",this.arr.taskItemList[i].taskBillItem.taskPic);
	},
		async onShow() {
		},
		components: {},
	}
</script>

<style lang="scss" scoped>
	.taskDetails {
		background-color: #fafafa;
		padding: 20rpx;
	}

	.taskContent {
		box-sizing: border-box;
		width: 710rpx;
		background: #ffffff;
		box-shadow: 0px 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		padding: 20rpx 28rpx;
	}

	.taskContentInList {
		/* margin-left: 36rpx; */
		display: flex;

		align-items: center;
		width: 656rpx;
		padding: 20rpx 0;
		background: #ffffff;
		opacity: 1;
		border-bottom: 1rpx solid #d0ced8;
	}

	.taskContentInListTwo {
		display: flex;
		align-items: top;
		width: 656rpx;
		padding: 20rpx 0;
		background: #ffffff;
		opacity: 1;
		border-bottom: 1rpx solid #d0ced8;
	}

	.taskContentInListHead {
		width: 160rpx;
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
		margin-left: 96rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;

		color: #303030;
		opacity: 1;
	}

	.taskChose {
		box-sizing: border-box;
		width: 710rpx;
		background: #ffffff;
		box-shadow: 0px 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin-top: 20rpx;
		padding: 20rpx 0 40rpx 40rpx;
	}

	.ListHead {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #1d1d2e;
		opacity: 1;
	}

	.ListBtn {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #1d1d2e;
		letter-spacing: 59rpx;
		opacity: 1;
		margin: 20rpx 0 40rpx 20rpx;
	}

	.photograpBox {
		width: 710rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
	}

	.title {
		padding: 40rpx 30rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 32rpx;
		color: #000000;
		opacity: 1;
	}

	.photo {
		margin-top: 60rpx;
		display: flex;
		flex-wrap: wrap;
		width: 100%;

	}

	.photograp {
		width: 160rpx;
		height: 160rpx;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		// position: absolute;
	}

	.photograp image {
		width: 100%;
		height: 100%;
	}

	.choseImg {
		margin-left: 20rpx;
		// width: 160rpx;
		// height: 160rpx;
		position: relative;

	}

	.choseImg .imgs {
		width: 160rpx;
		height: 160rpx;
	}

	.choseImg .deleteImg {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		top: -16rpx;
		right: -16rpx;
	}

	.note {
		box-sizing: border-box;
		width: 710rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin-top: 20rpx;
		padding: 40rpx 30rpx;
	}

	.choose {
		display: flex;
		align-items: center;

		.radioInput {
			margin-right: 40rpx;

			text {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #1D1D2E;
			}
		}
	}

	.noteTitle {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #303030;
		opacity: 1;
	}

	.textIn {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-bottom: 40rpx;
		width: 610rpx;
		height: 206rpx;
		background: #ffffff;
		border: 1rpx solid #909090;
		opacity: 1;
		border-radius: 6rpx;
		font-size: 24rpx;
		padding: 14rpx 20rpx;
	}

	.textInPlaceholder {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #c9c9c9;
		opacity: 1;
	}

	.bottomBtn {
		display: flex;
		margin-top: 60rpx;
		margin-bottom: 184rpx;
	}

	.cancel {
		width: 355rpx;
		height: 88rpx;
		background: #ffffff;
		border: 2rpx solid #2b89f7;
		opacity: 1;
		border-radius: 12rpx 0rpx 0rpx 12rpx;
		font-size: 28rpx;
		color: #303030;
	}

	.confirm {
		width: 355rpx;
		height: 88rpx;
		background: #2b89f7;
		border: 2rpx solid #2b89f7;
		opacity: 1;
		border-radius: 0rpx 12rpx 12rpx 0rpx;
		font-size: 28rpx;
		color: #ffffff;
	}

	.taskIn {
		width: 710rpx;

		background: #ffffff;
		box-shadow: 0px 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin-top: 20rpx;
		padding: 20rpx 40rpx;
	}

	.taskInList text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #1d1d2e;
		opacity: 1;
	}

	.taskInCase {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #1d1d2e;
		letter-spacing: 59rpx;
		opacity: 1;
		margin: 40rpx;
	}

	.choosedImg {
		width: 710rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		padding: 48rpx 30rpx;
		margin-top: 20rpx;
	}

	.imgContainer {
		width: 600rpx;

		// height: 160rpx;
		background: rgba(0, 0, 0, 0);
		opacity: 1;
		word-wrap: break-word;
	}

	.imgContainer image {
		margin-left: 30rpx;
		width: 160rpx;
		height: 160rpx;
	}

	.taskState {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin-top: 20rpx;
	}

	.taskState text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		color: #303030;
		opacity: 1;
	}

	.perform {
		margin-left: 108rpx;
	}
</style>
