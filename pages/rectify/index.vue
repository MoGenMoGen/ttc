<template>
<!-- 整改单页面 -->
  <view class="pages_rectify_tab">
	<view class="container">
	
	</view>	  
	<tabbar :loginType="loginType" @tabChange="tabChange"> </tabbar>
  </view>
</template>

<script>
import tabbar from "components/tabbar";
export default {
	data(){
		return{
			loginType:1
		}
	},
  components: {
    tabbar,
  },
  methods: {
    tabChange(path) {
      // if(this.current!=index)
      //     this.current=index;
      // console.log(path);
      uni.reLaunch({
        url: path,
        success() {
          console.log("success4");
        },
        fail(err) {
          console.log("fail", err);
        },
      });
    },}
}
</script>

<style lang="scss" scoped>
.pages_rectify_tab{
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.container{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	
}
</style>