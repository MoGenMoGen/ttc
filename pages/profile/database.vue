<template>
<!-- 资源库页面 -->
  <view class="pages_database">
    <view class="container">
      <view class="list">
        <view class="item" v-for="(item, index) in resource" :key="index" @click="toDetail(item.id)">
          <text>{{ item.informName }}</text>
          <image :src="arrow2" mode="widthFix" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import arrow2 from "static/arrow2.png";
export default {
  data() {
    return {
      resource: [
        
        {informName:"莫某莫某某资料资料资料名称"}
      ],
      arrow2,
	  loginType:1
    };
  },
  methods:{
	  toDetail(id){
		  console.log(`/pages/profile/datadetail?id=${id}`);
	uni.navigateTo({
		url:`/pages/profile/datadetail?id=${id}`,
		// url:"/pages/profile/datadetail",
		success(){
		console.log("11")
		},
		fail(err){
			console.log("222",err)
		}
	})	  
	  }
  },
  onLoad() {
  	this.loginType = uni.getStorageSync("loginType")
  
  },
  async onShow(){
	  // 资料库列表
	  let data =await this.api.getlibList({})
	  console.log("资料库列表",data);
	  this.resource=data.records;
  }
};
</script>

<style lang="scss" scoped>
.pages_database {
  width: 100%;
  height: 100vh;
  padding: 20upx;
  background: #fafafa;
  box-sizing: border-box;
  .container {
    width: 100%;
    .list {
    background: #fff;
      padding: 0 46upx 0 62upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 40upx 0;
        text {
          font-size: 28upx;
        }

        image {
          width: 40upx;
        }
      }
    }
  }
}
</style>