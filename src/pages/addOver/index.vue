<template>
    <div class="over-page">
        <div class="head-box">
            <div class="img-box-m">
                <img :src="headUrl" alt="">
            </div>
            <p>{{userName}}</p>
        </div>
        <div class="blank"></div>
        <scard  :data='data'></scard>
        <div v-if='isSelf'>
            <div class="overTk self">
                <div class="over-head">
                    <div>结束凭证</div>
                    <div class="button-group">
                        <button :class="{active: active==1}" @click="changeStatus(1)">成功</button>
                        <button :class="{active: active==0}" @click="changeStatus(0)">失败</button>
                    </div>
                </div>
                <div class="choose-img-box">
                    <div class="img-box" v-for="(item,index) in renderList" :key="index">
                        <img :src="oss + item" alt="">
                    </div>
                </div>
                <div class="icon-box" @click='upLoad'>
                    <img src="../../static/icon/icon/dptp3x.png" alt="">
                </div>
            </div>
            <div class="btn-box">
                <button @click='save'>保存凭证</button>
                <button v-show='active' open-type='share' class="add-btn" @click="sendOver">向好友发起结束</button>
            </div>
        </div>
        <div v-else>
            <div class="overTk over">
                <div class="over-head">
                    <div>结束凭证</div>
                    <div class="button-group" v-show='isWacther'>
                        <button :class="{active: overActive==1}" >成功</button>
                        <button :class="{active: overActive==0}" >失败</button>
                    </div>
                </div>
                <div class="choose-img-box">
                    <div class="img-box" v-for="(item,index) in renderList" :key="index">
                        <img :src="oss + item" alt="">
                    </div>
                </div>
            </div>
            <p class="friends-desc">你的好友好发布了结束的小目标，快来看看是否完成了小目标吧。</p>
            <div  class="btn-box" v-show='!watcherResult'>
                <button @click='vote(1)'>成功</button>
                <button @click='vote(2)'>失败</button>
            </div>
            <div class="watcher-result" v-show="watcherResult">
                您的投票结果是：<span>{{watcherResult}}</span>
            </div>
        </div>


    </div>
</template>

<script>
import { _getU,upImgs, showSucc,strToArray,msg } from '../../utils';
import {getTargetDetail,saveTargetStatus,voteTarget} from '../../api'
import dcard from '../../components/card'
const shareBg = require('../../../static/shareBg.jpg')
export default {
    components:{dcard},
    data(){
        return{
            headUrl:'',
            userName:'',
            active:null,
            overActive:1,
            loginType:2,
            imgList:[],
            isSelf:false,
            oss:this.$oss,
            isWacther:false,
            watcherResult:null,
            data:null
        }
    },
    onLoad(options){
        this.tid = options.tid;
        this.userId = options.uid;
        
    },
    onUnload(){
        this.isWacther = false;
        this.isSelf=false;
    },
    mounted(){
        var self = wx.getStorageSync('userId');
        if(self == this.userId){this.isSelf=true}
        getTargetDetail(this.tid).then(res=>{
            var d = res.data
            this.imgList = strToArray(d.data.images)
            if(d.code == 1 ){
                this.data = d.data
                this.headUrl = d.data.avatar;
                this.userName = d.data.name
                this.active = d.data.sucStr == '成功'?1:0;
            }
            for(var item of d.data.relationList){
                if(item.userId == self){
                    this.isWacther = true
                    this.watcherResult = item.targetResult?item.targetResult ==1 ? '成功':'失败':null
                    return
                }
            }
        })
    },
    computed:{
        renderList(){
            return this.imgList.slice(-2)
        }
    },
    methods:{
        changeStatus(n){
            this.active = n
        },
        upLoad(){
            upImgs(2,this.imgList)
        },
        save(){
            if(this.active === null){msg('请填写自我评价');return}
            var params={
                targetId:this.tid,
                images:this.renderList.join(','),
                sucStr:this.active?'成功':'失败'
            }
            saveTargetStatus(params).then(res=>{
                var d = res.data;
                if(d.code == 1){
                    showSucc('保存成功')
                }
            })
        },
        vote(status){
            var params = {
                targetId : this.tid,
                status:status
            }
            voteTarget(params).then(res=>{
                var d= res.data;
                if(d.code == 1){
                    showSucc('投票成功');
                    setTimeout(()=>{
                        wx.navigateBack({
                          delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                        });
                    },800)
                }
            })
        }  
    },
    onShareAppMessage: function() {
        return {
            title: '先定一个小目标，砥砺奋进一个亿',
            path: "/pages/index/main?tid="+this.tid+"&over=1",
            imageUrl:shareBg
        };
  }
}
</script>

<style lang="stylus" scoped>
.head-box
    padding 10px 20px
    display flex
    align-items center
    .img-box-m
        margin-left 20px
        flex 0 0 60px
    p
        padding-left 20px
        flex 1
.blank
    height 1px
    background #ccc
.overTk
    margin 20px 10px
    padding 20px 10px
    border 1px solid #eee
    position relative
    &.self
        height 300px
    .over-head
        display flex
        align-items center
        font-size 14px
        &>div
            flex 1
        .button-group
            display flex
            &>button
                flex 1
                font-size 14px
                margin 0 10px
                border 1px solid #fff
                &.active
                    background  #479EF8
                    color #fff
    .choose-img-box
        height 250px
        position relative
    .icon-box
        position absolute
        right 10px
        bottom 10px
.overTk
    .chose-img-box
        height 200px
    .img-box
        width 120px
        height 120px
        overflow hidden
        display inline-block
        margin 0 20px
        margin-top 50px
    img
        width 100%
        height 100%
        object-fit cover
.add-btn
    width 70%
    margin 0 auto
    height 40px
    line-height 40px
    background #479EF8
    color #fff
.friends-desc
    font-size 12px
    text-align center
.btn-box {
    padding: 20px 30px;

    &>button {
        display: inline-block;
        width: 100px;
        font-size: 14px;


        &:nth-child(2) {
            float: right;
        }
        &:nth-child(1) {
            background #479EF8
            color #fff
        }
    }
}
.icon-box-i
    position absolute
    bottom 10px
    right 10px
    overflow hidden
    img
        width 50px
        height 50px
.watcher-result
    height 100px
    line-height 100px
    text-align center
    font-size 16px

</style>
