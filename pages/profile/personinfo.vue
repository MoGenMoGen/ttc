<template>
  <!-- 个人信息页面 -->
  <view class="pages_personinfo">
    <view class="container">
      <view class="avatar"><image :src="info.avatar?info.avatar:avatar" mode="aspectFill" /></view>
      <view class="list">
        <view class="item">
          <text class="title">真实姓名</text>
          <text class="content">{{ info.realName }}</text>
        </view>
        <view class="item">
          <text class="title">联系电话</text>
          <text class="content">{{ info.phone }}</text>
        </view>
        <view class="item">
          <text class="title">公司名称</text>
          <text class="content">{{ info.deptName }}</text>
        </view>
        <view class="item">
          <text class="title">公司地址</text>
          <text class="content">{{ info.deptAddr }}</text>
        </view>
      </view>
      <!-- <image class="code" :src="info.code" mode="widthFix"></image> -->
	   <yuanqi-qr-code
	   style="margin-top:36upx"
	       ref="yuanqiQRCode"
	     :text="'/pages/profile/personinfo?id='+id"
	   	:size="size"
	   	borderSize=10
	   	:logo="info.avatar?info.avatar:avatar"
	       ></yuanqi-qr-code>
    </view>
  </view>
</template>

<script>
import avatar from "static/avatar.png";
import code from "static/corcode.png";
export default {
  data() {
    return {
		avatar,
		size:250,
		id:"",
      info: {
        deptAddr: "",
		avatar:"",realName:"",phone:"",deptName:""
      },
    };
  },
  async onLoad(e) {
	  this.id=e.id;
   	this.loginType = uni.getStorageSync("loginType")
   let userdata=await this.api.getuserInfo(e.id)
   console.log(userdata)
   this.info=userdata
   },
   mounted(){
   	console.log("mounted");
   	// 生成二维码
   	 this.$refs.yuanqiQRCode.make();
   	}
   	
};
</script>

<style lang="scss" scoped>
.pages_personinfo {
  width: 100%;
  height: calc(100vh - 88upx);
  background: #fafafa;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 20upx;
  .container {
    height: calc(100vh - 88upx - 100upx);
    width: 710upx;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      margin-top: 100upx;
      width: 134upx;
      height: 134upx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .list {
      margin-top: 100upx;
      padding: 0 50upx;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        box-sizing: border-box;
        width: 80%;
        display: flex;
        align-items: center;
        padding: 40upx 0;
        border-bottom: 2upx solid #d0ced8;
        .title {
          font-size: 28upx;
          margin-right: 60upx;
        }

        .content {
          font-size: 28upx;
        }
      }
    }

    .code {
      margin-top: 36upx;
      width: 164upx;
    }
  }
}
</style>