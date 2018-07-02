<template>
    <div>
        <div class="img-box-l">
            <img :src="avatarUrl" alt="">
        </div>
        <div class="form-box">
            <input type="text" maxlength="20" placeholder="输入目标标题"  placeholder-class="center" v-model=" name">
            <input type="text" maxlength="20" placeholder="输入目标值"  placeholder-class="center" v-model=" targetValue">
            <input type="text" maxlength="20" placeholder="输入当前值(选填)"  placeholder-class="center" v-model=" curValue">
        </div>
        <div class="select-box">
            <div class="select-item">
                <div class="label">设置目标时间</div>
                <div class="control">
                     <picker class="date-picker" mode="date" v-model='startTime' :start="pickerStart" end="2020-09-01" 
                        @change='startTimeChange'
                     >
                        <view class="picker">
                        {{startTime || '选择开始日期'}}
                        </view>
                    </picker> 
                    <span class="blank">至</span>
                     <picker class="date-picker" mode="date" v-model='endTime' :start="pickerStart" end="2020-09-01" 
                        @change='endTimeChange'
                     >
                        <view class="picker">
                        {{endTime || '选择结束日期'}}
                        </view>
                    </picker> 
                </div>
            </div>
            <div class="select-item" >
                <div class="label" >监督人</div>
                <div class="control text" @click='goPerson'>
                  {{ targetNum}}人 <span class="arrow">></span>
                </div>
            </div>
            <!-- <div class="select-item">
                <div class="label">目标起航金</div>
                <div class="control text" @click='goPay'>￥：{{targetMoney}} <span class="arrow">></span> </div>
            </div> -->
        </div>
        <div class="btn-box">
            <button @click='send' v-show='!targetId'>保存</button>
            <button open-type="share" v-show='targetId'>分享给好友</button>
        </div>
    </div>
</template>

<script>
import { _getU, formatTime, msg,showSucc } from "../../utils";
import { sendNewTarget } from "../../api";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      name: "",
      targetValue: "",
      curValue: "",
      targetNum: 1,
      targetMoney: 0,
      avatarUrl: "",
      targetId: ""
    };
  },
  onShow() {
    this.avatarUrl = _getU().avatarUrl;
    this.pickerStart = formatTime(new Date());
    this.targetNum = wx.getStorageSync("personNum");
  },
  onHide() {
    wx.removeStorageSync("personNum");
  },
  methods: {
    startTimeChange(e) {
      this.startTime = e.mp.detail.value;
    },
    endTimeChange(e) {
      var end = new Date(e.mp.detail.value).getTime();
      if (new Date(this.startTime).getTime() > end) {
        return;
      }
      this.endTime = e.mp.detail.value;
    },
    // goPay() {
    //   wx.navigateTo({ url: "../../pages/pay/main" });
    // },
    goPerson() {
      wx.navigateTo({ url: "../../pages/personNum/main" });
    },
    send() {
      let st = true;
      var parmas = {
        beginTime: new Date(this.startTime).getTime(),
        endTime: new Date(this.endTime).getTime(),
        name: this.name,
        targetValue: this.targetValue,
        curValue: this.curValue,
        superviseNum: this.targetNum,
        deposit: this.targetMoney,
        avatar: this.avatarUrl
      };
      if (
        !parmas.name ||
        !parmas.targetValue ||
        !parmas.superviseNum ||
        !parmas.beginTime ||
        !parmas.endTime
      ) {
        msg("请将表单填写完整");
      } else {
        sendNewTarget(parmas).then(res => {
          if (res.data.code == 1) {
			  showSucc('目标创建成功');
			  setTimeout(()=>{
				wx.navigateBack({
					delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
			  	});
			  },800)
          }
        });
      }
    }
  },
  onShareAppMessage: function() {
    return {
      title: "帅哥就是俺",
      desc: "小目标之挣他一个亿之帅哥版!",
      path: "/pages/sharePage/main?id=6"
    };
  }
};
</script>

.<style lang="stylus" scoped>
.img-box-l {
	margin: 20px auto;
}

.form-box {
	input {
		margin: 0 40px;
		height: 45px;
		border: 1px solid #eee;
		text-align: center;
		margin-bottom: 20px;
		font-size: 14px;
	}
}

.btn-box {
	padding: 10px 30px;

	&>button {
		display: inline-block;
		width: 100px;
		font-size: 14px;

		&:nth-child(2) {
			float: right;
		}
	}
}

.select-item {
	padding: 10px 20px;
	margin-top: 15px;
	font-size: 14px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #eee;

	.label {
		flex: 0 0 120px;
	}

	.control {
		flex: 1;

		.date-picker {
			width: 90px;
			display: inline-block;
		}

		.blank {
			padding: 0 10px;
		}

		&.text {
			text-align: right;
			padding-right: 12px;
		}
	}
}

.btn-box {
	margin-top: 20px;
	padding: 10px 30px;
	text-align: center;

	&>button {
		display: inline-block;
		width: 300px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		font-size: 14px;
		background: #479EF8;
		color: #fff;
	}
}

.center {
	text-align: center;
}

.arrow {
	vertical-align: middle;
	padding: 0 10px;
	font-weight: bold;
}
</style>

