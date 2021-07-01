<template>
<!-- 资料库详情页面 -->
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
	let data=await this.api.getBillDetail({id:e.id})
	console.log("资料库详情页面",data);
	this.content=data.informContent
  },
  
}
</script>

<style lang="scss" scoped>
.pages_help{
  width: 100%;
  padding:20upx;
  box-sizing: border-box;
  background: #fafafa;
  height: calc(100vh - 128upx);
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