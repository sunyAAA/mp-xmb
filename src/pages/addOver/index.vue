<template>
    <div class="over-page">
        <div class="head-box">
            <div class="img-box-m">
                <img :src="headUrl" alt="">
            </div>
            <p>{{userName}}</p>
        </div>
        <div class="blank"></div>
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
                        <img :src="item" alt="">
                    </div>
                </div>
                <div class="icon-box" @click='upLoad'>
                    <img src="../../static/icon/icon/dptp3x.png" alt="">
                </div>
            </div>
            <div class="bottom-btn">
                <button @click='save'>保存凭证</button>
                <button class="add-btn">向好友发起结束</button>
            </div>
        </div>
        <div v-else>
            <div class="overTk over">
                <div class="over-head">
                    <div>结束凭证</div>
                    <div class="button-group">
                        <button :class="{active: overActive==1}" @click="changeStatus(1)">成功</button>
                        <button :class="{active: overActive==0}" @click="changeStatus(0)">失败</button>
                    </div>
                </div>
                <div class="choose-img-box">
                    <div class="img-box">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530181353793&di=3e8c04b2be23fcc5847ccfb7c276a4e7&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2014%2F064%2F21739CV5LP64.jpg" alt="">
                    </div>
                </div>
            </div>
            <p class="friends-desc">你的好友好发布了结束的小目标，快来看看是否完成了小目标吧。</p>
            <div  class="btn-group">
                <button @click='vote(1)'>成功</button>
                <button @click='vote(2)'>失败</button>
            </div>
        </div>


    </div>
</template>

<script>
import { _getU,upImgs, showSucc } from '../../utils';
import {getTargetDetail,saveTargetStatus,voteTarget} from '../../api'
import zcard from '../../components/card'
export default {
    components:{zcard},
    data(){
        return{
            headUrl:'',
            userName:'',
            active:null,
            overActive:1,
            loginType:2,
            imgList:[],
            isSelf:false
        }
    },
    onLoad(options){
        this.tid = options.tid;
        this.userId = options.uid
    },
    mounted(){
        var self = wx.getStorageSync('userId');
        if(self == this.userId){this.isSelf=true}
        getTargetDetail(this.tid).then(res=>{
            var d = res.data
            if(d.code == 1){
                this.headUrl = d.data.avatar;
                this.userName = d.data.name
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
                status
            }
            voteTarget(params).then(res=>{
                var d= res.data;
                if(d.code == 1){
                    showSucc('投票成功');
                    setTimeout(()=>{
                        wx.redirectTo({
                            url: '../../pages/index/main'
                            })
                    },800)
                }
            })
        }
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
        height 140px
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
.bottom-btn
    display  flex
    padding 0 20px
    button
        flex 1
        margin-right 10px
        height 40px
        line-height 40px
        font-size 14px
</style>
