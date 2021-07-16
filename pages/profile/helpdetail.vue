<template>
<!-- 帮助中心页面 -->
 <view class="pages_help">
   <view class="wrapper">
     <view class="content" v-html="content"></view>
   </view>
 </view>
</template>

<script>
export default {
	data(){
		return {
			content:""
		}
	},
 async onLoad(e) {
  	this.loginType = uni.getStorageSync("loginType")
	let data=await this.api.gethelpDetail({id:e.id})	
	this.content=data.helpInformContent
  }
}
</script>

<style lang="scss" scoped>
.pages_help{
  width: 100%;
  padding:20upx;
  background: #fafafa;
  height: calc(100vh - 128upx);
  box-sizing: border-box;
  .wrapper{
    width: 100%;
    height: calc(100vh - 128upx);
  background: #fff;
  .content{
	  text-align: justify;
  }

  }
}
</style>