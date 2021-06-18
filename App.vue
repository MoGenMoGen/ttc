<script>
export default {
  onLaunch: function () {
	  uni.reLaunch({
	  	url:"/pages/login/index"
	  })
    console.log("app onlaunch");
   
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss" scoped>
/*每个页面公共css */
@import "./styles/common.css";
</style>
