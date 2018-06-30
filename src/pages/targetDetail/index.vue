<template>
    <div>
        <div class="img-box-m">
            <img :src="data.avatar" alt="">
        </div>
        <div class="table-view" >
            <div class="label">目标名</div>
            <div class="val">{{data.name}}</div>
        </div>
        <div class="table-view" >
            <div class="label">目标值</div>
            <div class="val">{{data.targetValue}}</div>
        </div>
        <div class="table-view" >
            <div class="label">当前值</div>
            <div class="val">{{data.curValue}}</div>
        </div>
        <div class="table-view" >
            <div class="label">目标时间</div>
            <div class="val">{{data.time}}</div>
        </div>
        <div class="table-view" >
            <div class="label">监督人</div>
            <div class="val">{{data.superviseNum}} 人</div>
        </div>
        <div class="friends-box">
            <div v-for="(item,index) in friends" :key="index">
                <div class="img-box-m" >
                    <img :src="item.avatar" alt="">
                </div>
                <p>{{item.name}}</p>
                <p class="friends-check">{{item.check?'成功':'失败'}}</p>
            </div>
        </div>
        <div v-if='isLogin'>
                <button class="addDaely" @click='addDaely'>心情日记</button>
                <div class="btn-group"  v-show="status == 2">
                    <button  @click="goOver">发起结束</button>
                    <button open-type="share" @click='share'>邀请好友前来监督</button>
                </div>
                <button class="shareBtn" v-show="status == 4">分享我的成就</button>
        </div>
        <login-box v-else></login-box>
    </div>
</template>

<script>
import {_getU,msg,fromartTargetDate} from '../../utils/index.js'
import loginBox from '../../components/loginBox'
import {getTargetDetail} from '../../api'

export default {
  components:{loginBox},
  data() {
    return {
        data:{},
        isLogin:true,
        status:null
    };
  },
  onLoad(options){
      this.tid = options.tid
  },
  mounted() {
    var t = wx.getStorageSync('_token');
    if(t){
        this.headUrl = _getU().avatarUrl;
        this.friends=[
            {avatar:this.headUrl,name:'小猪',check:false},
            {avatar:this.headUrl,name:'小皮',check:false},
            {avatar:this.headUrl,name:'小明明',check:false},
        ]
        this.getTargetDetail()
    }else{
        this.isLogin = false
    }
  },
  methods: {
    getTargetDetail(){
        if(!this.tid){
            msg('目标信息获取失败，请稍后再试')
        }else{
            getTargetDetail(this.tid).then(res => {
                this.data = res.data.data;
                this.data.time = fromartTargetDate(this.data.beginTime,this.data.endTime)
                this.status = this.data.status
            })
        }
    },
    addDaely(){
        wx.navigateTo({ url: '../../pages/addDaely/main?uid='+this.data.userId+'&tid='+this.data.targetId});
    },
    goOver(){
        wx.navigateTo({ url: '../../pages/addOver/main?tid='+this.tid+"&uid="+this.data.userId});
    }
  },
  onShareAppMessage: function() {
    return {
      title: '先定一个小目标，砥砺奋进一个亿',
      path: "/pages/index/main?tid="+this.tid+"&share=1",
    //   query:'tid='+this.tid
    };
  }
};
</script>

<style lang="stylus" scoped>
.img-box-m
    margin 20px auto

.table-view {
    display: flex;
    font-size: 14px;
    padding: 10px 10px;
    border-bottom 1px solid #eee
    margin 0 20px
    .label {
        flex 0  0 95px
    }   

    .val {
        flex 1
        text-align: left ;
        padding-left 40px;
        line-height 20px
    }
}
.friends-box
    padding 10px 20px
    &>div
        display inline-block
        margin-right 20px
        p
            color black
            font-size 14px
            text-align center
.addDaely
    width 85%
    margin 0 auto
    text-align left
    border 1px solid #eee
    font-size 14px
    margin-top 20px
.shareBtn
    width 80%
    margin 20px auto
    font-size 16px
.shareBtn
    background  #479EF8
    color #fff
.friends-check 
    width 40px
    margin-left 10px
    margin-top 10px
    height 20px
    line-height 20px
    font-size 12px
    border-radius 4px
    border 1px solid #eee
.btn-group
    margin-top 20px
    button
        display inline-blcok
        width 80%
        margin 10px auto
        font-size 14px
        height 40px
        line-height 40px
        color:#fff
        background #479EF8
</style>

