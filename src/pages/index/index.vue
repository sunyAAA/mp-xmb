<template>
  <div class="container">
    <div class='title'>
			<progressArc ref='progress' :score='score'></progressArc>
			<div class="index-icon">
				<img src="../../../static/indexIcon.png" alt="">
			</div>
			<div class="desc">
				共坚持{{dayDown}}天
			</div>
			<div class="start">
				<button v-if='isLogin' @click="goAddTarget">发起目标</button>
				<button v-else open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
			</div>
    </div>
	<div class="case-box">
		<div class="case" @click='tab(1)'>
			<h2>【执行中】</h2>
			<p class="text">{{targetName}}</p>
			<div class="time">
					<div class="img-box-s"><img src="../../../static/doing.png" alt=""></div>
					<p>{{targetDayDown}}</p>
			</div>
		</div>
		<div class="case" @click='tab(2)'>
			<h2>【我的监督】</h2>
			<p class="text">{{watchName}}</p>
			<div class="time">
				<div class="img-box-s"><img src="../../../static/watch.png" alt=""></div>	
				<p>{{watchDayDown}}</p>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import progressArc from "../../components/progressAec";
import {
  _login,
  _getUserInfo,
  _loading,
  _getU,
	loginByUser,
	getRightDays,getLeftDays
} from "../../utils/index.js";
import { loginByCode,getMytarget,getHetarget } from "../../api";
export default {
  components: { progressArc },
  data() {
    return {
      isLogin: false,
      score: 0,
			dayDown:0,
			targetName:'暂无进行中的目标',
			targetDayDown:'',
			watchName:'暂无监督中的目标',
			watchDayDown:''
    };
	},
	onLoad(options){
		if(options.share){
			var tid = options.tid
			setTimeout(()=>{
				wx.navigateTo({
					url:'../../pages/sharePage/main?tid='+tid
				});
			},800)
		}
	},
  mounted() {
    _login(res => {
      if (res) {
        this.isLogin = true;
        this.userInfo = res;
        this.score = 66;
				wx.showTabBar();
				this.getIndexDate()
      }
    });
  },
  methods: {
    getUserInfo(e) {
      _loading("加载中...");
      var res = e.mp.detail.userInfo;
      loginByUser(res, res => {
        if (res) {
          this.isLogin = true;
          this.userInfo = res;
          wx.setStorageSync("userInfo", res);
          this.score = 66;
					wx.showTabBar();
					this.getIndexDate()
        }
      });
		},
		getIndexDate(){
			getMytarget(1,1).then(res=>{
				if(res.data.code == 1){
					let d = res.data.data[0]
					if(!d){
						return
					}
					this.dayDown = getLeftDays(d.beginTime);
					var per = (new Date().getTime() - d.beginTime)/(d.endTime - d.beginTime) 
					this.score = parseInt(per)>0?parseInt(per):0
					this.targetName = d.name;
					this.targetDayDown ="倒计时："+ getRightDays(d.endTime)+"天";
				}
			})
			getHetarget(1,1).then(res=>{
				if(res.data.code == 1){
					let d = res.data.data[0]
					if(!d){
						return
					}
					this.watchName = d.name;
					this.watchDayDown ="倒计时："+ getLeftDays(d.beginTime)+"天";
				}
			})
		},
    goAddTarget() {
      if (this.isLogin) {
        wx.navigateTo({ url: "../../pages/addTarget/main" });
      }
    },
    tab(i) {
      if (i == 1 && this.isLogin) {
        wx.switchTab({
          url: "../../pages/myTarget/main"
        });
      } else if (i == 2 && this.isLogin) {
        wx.switchTab({
          url: "../../pages/mySupervise/main"
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.title {
	height: 250px;
	line-height: 200px;
	width: 100%;
	text-align: center;
	position: relative;
	background: -webkit-linear-gradient(#2b32b2, #1488cc);
	background: -o-linear-gradient(#2b32b2, #1488cc);
	background: -moz-linear-gradient(#2b32b2, #1488cc);
	background: linear-gradient(#2b32b2, #1488cc);

	.desc {
		position: absolute;
		top: 25px;
		left: 50%;
		height: 25px;
		color: #fff;
		font-size: 14px;
		transform: translate(-50%, 90%);
	}

	.start {
		position: absolute;
		top: 230px;
		width: 100%;
		text-align: center;

		&>button {
			width: 200px;
			border-radius: 20px;
			height: 48px;
			border: 1px solid #eee;
			background: #fff;

			&::after {
				border: none;
			}
		}
	}
}

.case-box {
	display: flex;
	width: 100%;
	margin: 10px;
	margin-top: 50px;

	.case {
		flex: 1;
		width: 100%;
		margin: 10px;
		font-size: 12px;
		height: 100px;
		padding: 10px;
		height: 80px;
		border: 1px solid #479EF8;
		padding: 10px 24px;

		.text {
			padding-top: 10px;
		}
	}
}

.time {
	display: flex;
	padding: 10px 0;

	.img-box-s {
		flex: 0 0 22px;
		height: 25px;
		overflow: hidden;

		&>img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	&>p {
		flex: 1;
		text-align: center;
		align-items: bottom;
	}
}

.index-icon {
	width: 100px;
	height: 100px;
	overflow: hidden;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-55%, -80%);

	img {
		width: 100%;
		height: 100%;
		transform: scale(0.5);
		object-fit: cover;
		z-index: 999;
	}
}
</style>
