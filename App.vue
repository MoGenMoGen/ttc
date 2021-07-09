<script>
	export default {
		onLaunch: function() {
			console.log("appid:", plus.runtime.appid, "version", plus.runtime.version);
			let appid = plus.runtime.appid;
			let version = plus.runtime.version;
			let appupdate = this.api.getAppUpdate({
				appid,
				version
			}).then(res => {
				console.log(res);
				// 升级标志，0：需要升级；1：无需升级
				if (res.state == 0) {
					uni.showModal({ //提醒用户更新  
						title: "更新提示",
						content: res.note,
						success: (res1) => {
							if (res1.confirm) {
								plus.runtime.openURL(res.url);
							}
						}
					})
				}

			})

			if (!uni.getStorageSync("Blade-Auth")) {
				uni.reLaunch({
					url: "/pages/login/index"
				})
			} else {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
			console.log("app onlaunch");

		},
		onShow: function() {
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
		onUnload() {
			console.log('onunload');
		}
	};
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
	@import "./styles/common.css";
</style>
