<template>
  <!-- 个人信息页面 -->
  <view class="pages_personinfo">
    <view class="container">
      <view class="avatar"><image :src="info.avatar" mode="aspectFill" /></view>
      <view class="list">
        <view class="item">
          <text class="title">真实姓名</text>
          <text class="content">{{ info.realname }}</text>
        </view>
        <view class="item">
          <text class="title">联系电话</text>
          <text class="content">{{ info.tel }}</text>
        </view>
        <view class="item">
          <text class="title">公司名称</text>
          <text class="content">{{ info.filmnm }}</text>
        </view>
        <view class="item">
          <text class="title">公司地址</text>
          <text class="content">{{ info.address }}</text>
        </view>
      </view>
      <image class="code" :src="info.code" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
import avatar from "static/avatar.png";
import code from "static/corcode.png";
export default {
  data() {
    return {
      info: {
        avatar,
        realname: "张张",
        tel: "1561561654165",
        filmnm: "光电开关的恐龙国际公司",
        address: "宁波329公社",
        code,
      },
    };
  },
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