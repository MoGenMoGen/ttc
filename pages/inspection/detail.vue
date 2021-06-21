<!-- 巡检详情页面 -->
<template>
	<view class="taskDetails">
		<view class="taskContent">
			<view class="taskContentInList">
				<text class="taskContentInListHead">任务编号 </text>
				<text class="taskContentInListContent">{{ arr.number }}</text>
			</view>
			<view class="taskContentInListTwo">
				<text class="taskContentInListHead" v-if="loginType == 3 && currentIndex == 1">提醒内容</text>
				<text class="taskContentInListHead" v-else>任务内容</text>
				<text class="taskContentInListContent">{{ arr.content }}</text>
			</view>
			<view class="taskContentInListTwo">
				<text class="taskContentInListHead">整改单位</text>
				<text class="taskContentInListContent">{{ arr.reform }}</text>
			</view>
			<view class="taskContentInList" v-if="currentIndex==1||currentIndex==2">
				<text class="taskContentInListHead">施工单位 </text>
				<text class="taskContentInListContent">{{ arr.Construction }}</text>
			</view>

			<view class="taskContentInList">
				<text class="taskContentInListHead">执行人 </text>
				<text class="taskContentInListContent">{{ arr.person }}</text>
			</view>
			<view class="taskContentInList">
				<text class="taskContentInListHead">提交日期 </text>
				<text class="taskContentInListContent">{{ arr.subdate }}</text>
			</view>

			<view class="taskContentInList">
				<text class="taskContentInListHead">复查日期</text>
				<text class="taskContentInListContent">{{ arr.reviewdate }}</text>
			</view>
			<view class="taskContentInList">
				<text class="taskContentInListHead">任务状态</text>
				<text class="taskContentInListContent">{{ arr.taskStatus }}</text>
			</view>
			<view class="taskContentInList" v-if="currentIndex == 2">
				<text class="taskContentInListHead">完成日期</text>
				<text class="taskContentInListContent">{{ arr.completeDate }}</text>
			</view>

			<view class="taskContentInList" v-if="
		currentIndex==1
        ">
				<text class="taskContentInListHead">逾期天数</text>
				<text style="color:red" class="taskContentInListContent">{{
          arr.withinTime
        }}</text>
			</view>
		</view>
		<view class="taskBodyOne" v-if="currentIndex != 2">
			<view class="taskChose">
				<view class="taskChoseList" v-for="(item, index) in taskChoseArr" :key="index">
					<view class="ListHead">
						<text>{{ index + 1 }}、 </text>
						<text>{{ item.name }}</text>
					</view>
					<view class="choose">
						<text>有</text>
						<view>
							<image style="width:32rpx;height:32rpx;" src="../../static/isChosed.png"></image>
							<image style="width:32rpx;height:32rpx;" src="../../static/unChosed.png"></image>
						</view>

						<text>无</text>
						<view>
							<image style="width:32rpx;height:32rpx;" src="../../static/isChosed.png"></image>
							<image style="width:32rpx;height:32rpx;" src="../../static/unChosed.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="photograpBox">
				<view class="title">拍照上传 </view>
				<view class="photograp" v-if="loginType == 1">
					<image src="../../static/takephoto.png" mode="" @click="toPhoto()" />
				</view>

				<view class="choseImg" v-for="(item, index) in imgList" :key="index">
					<image :src="item" mode="" class="imgs" v-if="loginType == 1" />
					<image v-if="loginType == 1" class="deleteImg" :src="del" mode="" @click="deleimg(index)" />
				</view>
			</view>
			<view class="note">
				<view class="noteTitle">备注</view>
				<textarea v-if="loginType==1" class="textIn" name="" id="" cols="30" rows="10" placeholder="多行输入"
					placeholder-class="textInPlaceholder"></textarea>
			</view>

			<view class="taskState">
				<text>任务状态</text>
				<text class="perform">待执行</text>
			</view>
			<view class="bottomBtn" v-if="loginType==2">
				<button class="cancel" @click="backTo">取消</button>
				<button class="confirm" @click="backTo">确认完成</button>
			</view>
		</view>
		<view class="taskBodyTwo" v-if="currentIndex == 2">
			<view class="taskIn">
				<view class="taskInList" v-for="(item, index) in taskChoseArr" :key="index">
					<text>{{ index +1}}、 </text>
					<text>{{ item.name }}</text>
					<view class="taskInCase">{{ item.case }}</view>
				</view>
			</view>
			<view class="choosedImg">
				<view class="imgContainer">
					<image src="../../static/takephoto.png" mode="" />
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
				loginType: 2,
				del,
				activeRadio: "",
				check: "10",
				checkTwo: "20",
				radioGroup: ["有", "无"],
				imgList: ["/static/takephoto.png"],
				arr: {
					number: "RW20210330001",
					content: "消防器材未按照标准规范摆放，消防通道有障碍物存放",
					person: "张宁",
					subdate: "2020-12-15",
					withinTime: "四天",
					completeDate: "2020-03-20",
					reviewdate: "2021-5-20",
					taskStatus: "待执行",
					reform: "广知科技有限公司",
					Construction: "某某某服务有限公司",
				},
				taskChoseArr: [{
						name: "消防控制室",
						case: "有",
					},
					{
						name: "火灾自动报警系统",
						case: "有",
					},
					{
						name: "自动灭火系统",
						case: "有",
					},
					{
						name: "防排烟系统",
						case: "有",
					},
					{
						name: "灭火器",
						case: "有",
					},
				],
			};
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
				uni.navigateBack()
			}
		},
		onLoad(e) {
			this.currentIndex = e.currentIndex;
			// 从缓存中获取loginType,角色信息
			this.loginType = uni.getStorageSync("loginType")
		},
		components: {},
	};
</script>

<style>
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
		height: 368rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		margin-top: 20rpx;
		position: relative;
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

	.photograp {
		width: 160rpx;
		height: 160rpx;
		position: absolute;
		top: 148rpx;
		left: 30rpx;
	}

	.photograp image {
		width: 100%;
		height: 100%;
	}

	.choseImg {
		position: absolute;
		width: 160rpx;
		height: 160rpx;
		top: 148rpx;
		left: 210rpx;
	}

	.choseImg .imgs {

		position: absolute;
		width: 100%;
		height: 100%;
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
		margin: 40rpx 40rpx;
	}

	.choosedImg {
		width: 710rpx;
		height: 208rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.04);
		opacity: 1;
		border-radius: 12rpx;
		padding: 48rpx 30rpx;
		margin-top: 20rpx;
	}

	.imgContainer {
		width: 160rpx;
		height: 160rpx;
		background: rgba(0, 0, 0, 0);
		opacity: 1;
	}

	.imgContainer image {
		width: 100%;
		height: 100%;
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
