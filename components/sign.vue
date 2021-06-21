<template>
  <view class="written">
    <canvas
      :style="{ width: (canvaw-60)+'px', height: 250 + 'px' }"
      class="firstCanvas"
      canvas-id="firstCanvas"
      @touchmove="move"
      @touchend="end"
      @error="error"
      disable-scroll="true"
      v-if="!signImage"
    ></canvas>
    <img :src="signImage" v-if="signImage">
    <view class="button_clear" @click="clearClick()">重写</view>
    <view class="button_submit" @click="saveClick()">保存</view>

  </view>
</template>

<script>
  let content = null;
  let touchs = [];
  let canvasw = 0;
  let canvash = 0;
  export default {
    data(){
      return {
        canvaw:0,
        canvah:0,
        src:`你的背景图片`,
        flag:true,
        status:false
      }
    },
    props:{
      status:{
        type:String,
        default:'default',
        required: false
      },
      signImage: {
        type: String,
        default: ""
      }
    },
    mounted () {
      var _this = this;
      // uni.getSystemInfo({
      //   success: function (res) {
          canvasw = 700,
          canvash = 500;
          _this.canvaw = 700;
          _this.canvah = 500;
          content = uni.createCanvasContext('firstCanvas',this);
          content.setStrokeStyle("#aaaa7f");
		  content.setBackgroundColor("#ffffff")
          content.setLineWidth(5);
          content.setLineCap('round');
          content.setLineJoin('round')
      //   },
      // });

    },
    methods:{
      error(e){
        uni.showModal({
          title:"初始化异常，请尝试刷新！"
        });
      },
      move(e) {
        // 开始清空背景图
        if(this.flag){
          content.clearRect(0,0,canvasw,canvash);
          this.flag = false;
        }
        let point = {x: e.touches[0].x, y: e.touches[0].y};
        touchs.push(point);
        if(touchs.length >= 2) {
          this.draw(touchs)
        }
      },
      end(e){
        for (let i = 0 ;i < touchs.length;i++ ){
          touchs.pop()
        }
      },
      clearClick() {
        this.signImage = ''
        content.clearRect(0,0,canvasw,canvash);
        // uni.getImageInfo({
        //   src: this.src,//服务器返回的图片地址
        //   success: function (res) {
        //     let num = res.width/res.height;
        //     let Path = res.path;
        //     //计算宽高，按照返回图片的比例来;
        //     content.drawImage(Path, 20,100,(canvash-200)*num ,canvash-200)
        //     content.draw(true);

        //   },
        //   fail: function (res) {
        //     console.error(res)
        //   }
        // });
        this.flag = true;
        // content.draw(true)
      },
      saveClick() {
        let that = this;
        uni.canvasToTempFilePath({
          canvasId: 'firstCanvas',
          success:function(res) {
            that.signImage = res.tempFilePath;
            console.log(that.signImage);
            that.$emit("success",that.signImage);
          }
        },this)
      },
      draw(touchs) {
        let point1 = touchs[0];
        let point2 = touchs[1];
        touchs.shift();
        content.moveTo(point1.x, point1.y);
        content.lineTo(point2.x, point2.y);
        content.stroke();
        content.draw(true);
      }
    }
  }
</script>

<style scoped>
  .firstCanvas {
    background-color: #fff;
    width: 100%;
    height: 100%;
  }

  .button_clear {
    position: absolute;
    /*transform: rotate(270deg);*/
    /*-ms-transform: rotate(270deg); !* IE 9 *!*/
    /*-moz-transform: rotate(270deg); !* Firefox *!*/
    /*-webkit-transform: rotate(270deg); !* Safari 和 Chrome *!*/
    /*-o-transform: rotate(270deg);*/
    bottom: 0rpx;
    left: 40rpx;
    width: 213rpx;
    height: 84rpx;
    background-color: #fff;
    border: #387ffb 1px solid;
    text-align: center;
    line-height: 80rpx;
    border-radius: 40rpx;
    color: #387ffb;
    z-index: 10000;
  }
  .button_submit {
    position: absolute;
    /*transform: rotate(270deg);*/
    /*-ms-transform: rotate(270deg); !* IE 9 *!*/
    /*-moz-transform: rotate(270deg); !* Firefox *!*/
    /*-webkit-transform: rotate(270deg); !* Safari 和 Chrome *!*/
    /*-o-transform: rotate(270deg);*/
    bottom: 00rpx;
    right: 40rpx;
    width: 213rpx;
    height: 84rpx;
    background-color: #2173f9;
    border: #387ffb 1px solid;
    text-align: center;
    line-height: 80rpx;
    border-radius: 40rpx;
    color: #ffffff;
    z-index: 10000;
  }
  .button {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    text-align: center;
    color: deepskyblue;
    border-radius: 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    outline: none;
  }
  .button:first-of-type {
    border-right: 1px solid #ddd;
  }
  .button:last-of-type {
    border-left: 1px solid #ddd;
  }
  .written {
    position: relative;
    background-color: #ffffff;
  }
</style>
