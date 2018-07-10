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
                <p class="name">{{item.nickname}}</p>
                <p v-if='status>3' class="friends-check">{{item.check?'成功':'失败'}}</p>
            </div>
        </div>
        <div>
                <div>
                <button class="addDaily" @click='addDaily'>心情日记</button>
                <div class="addIcon"></div>
                </div>
                <div class="btn-group"  v-show="status == 2 && isSelf">
                    <button  @click="goOver">发起结束</button>
                    <button open-type="share" @click='share'>邀请好友成为我的监督人</button>
                </div>
                    <button class="shareBtn" @click='goOver' v-show='status == 3'>投票中</button>
                <button class="shareBtn" v-show="status == 4 && isSelf">分享我的成就</button>
        </div>
    </div>
</template>

<script>
import {_getU,msg,fromartTargetDate} from '../../utils/index.js'
import loginBox from '../../components/loginBox'
import {getTargetDetail} from '../../api'
const shareBg = require('../../../static/shareBg.jpg')
export default {
  components:{loginBox},
  data() {
    return {
        data:{},
        status:null,
        friends:[],
        status:null,
        isSelf:true
    };
  },
  onLoad(options){
      this.tid = options.tid
  },
  mounted() {
        this.headUrl = _getU().avatarUrl;
        this.getTargetDetail()
  },
  methods: {
    getTargetDetail(){
        if(!this.tid){
            msg('目标信息获取失败，请稍后再试')
        }else{
            var userId = wx.getStorageSync('userId');
            getTargetDetail(this.tid).then(res => {
                this.data = res.data.data;
                this.data.time = fromartTargetDate(this.data.beginTime,this.data.endTime)
                this.status = this.data.status;
                this.friends = this.data.relationList
                this.isSelf = userId == res.data.data.userId?true:false
            })
        }
    },
    addDaily(){
        wx.navigateTo({ url: '../../pages/addDaily/main?uid='+this.data.userId+'&tid='+this.data.targetId});
    },
    goOver(){
        wx.navigateTo({ url: '../../pages/addOver/main?tid='+this.tid+"&uid="+this.data.userId});
    }
  },
  onShareAppMessage: function() {
    return {
      title: '先定一个小目标，砥砺奋进一个亿',
      path: "/pages/index/main?tid="+this.tid+"&share=1",
      imageUrl:shareBg
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
    align-items center
    .label {
        flex 0  0 95px
    }   

    .val {
        flex 1
        text-align: left ;
        padding-left 40px;
        line-height 20px
        max-height: 60px;
        padding: 10px 20px;
        overflow:hidden;
        text-overflow:ellipsis; 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
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
.addDaily
    width 85%
    margin 0 auto
    text-align left
    height 45px
    line-height 45px
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
.name
    max-width 100px
    overflow hidden
    text-overflow: ellipsis;
    white-space: nowrap;
</style>

