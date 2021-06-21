<template>
<!-- 帮助中心页面 -->
 <view class="pages_help">
   <view class="wrapper">
     <view class="content">帮助中心文档内容帮助中心文档内容帮助中心文档内
容帮助中心文档内容帮助中心文档内容帮助中心文档
内容帮助中心文档内容帮助中心文档内容帮助中心文
档内容帮助中心文档内容帮助中心文档内容帮助中心
文档内容帮助中心文档内容帮助中心文档内容帮助中
心文档内容帮助中心文档内容帮助中心文档内容帮助
中心文档内容帮助中心文档内容帮助中心文档内容帮
助中心文档内容帮助中心文档内容帮助中心文档内容
帮助中心文档内容帮助中心文档内容帮助中心文档内
容帮助中心文档内容帮助中心文档内容帮助中心文档
内容帮助中心文档内容帮助中心文档</view>
   </view>
 </view>
</template>

<script>
export default {
 onLoad() {
  	this.loginType = uni.getStorageSync("loginType")
  
  }
}
</script>

<style lang="scss" scoped>
.pages_help{
  width: 100%;
  padding:20upx;
  background: #fafafa;
  height: calc(100vh - 128upx);
  .wrapper{
    width: 100%;
    height: calc(100vh - 128upx);
  background: #fff;

  }
}
</style>