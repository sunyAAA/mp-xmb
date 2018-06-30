<template>
    <div class="share-page">
        <div class="bg-box">
            <img src="../../../static/bg.png" alt="">
        </div>
        <div class="desc">
             <p class="row1">{{data.name}}</p>
             <p class="row2">倒计时 <span class="count">{{data.rightDays}}</span> <span class="day">天</span></p>
             <!-- <p class="row3">小目标保证金 <span class="unit">￥</span> <span class="money">50</span></p> -->
             <p class="row4">{{data.cTime}}</p>
        </div>
        <div class="avatar">
            <img :src="data.avatar" alt="">
        </div>
        <p class="text">Hi，您的好友发起了小目标，邀请你成为监督人。</p>
        <div class="btn-group" v-if='login'>
            <button @click="join">同意</button>
            <button @click='noJoin'>狠心拒绝</button>
        </div>
        <login-box v-else @succ="loginSucc"></login-box>
    </div>
</template>

<script>
import { _getU,getLeftDays,getRightDays,formatTime, showSucc } from '../../utils';
import zcard from '../../components/card'
import loginBox from '../../components/loginBox'
import {getTargetDetail,joinTarget} from '../../api'
export default {
    components:{zcard,loginBox},
    data(){
        return{
            data:{},
            login:false,
        }
    },
    onLoad(options){
        this.tid = options.tid;
        getTargetDetail(this.tid).then(res=>{
            var d= res.data;
            console.log(d)
            if(d.code == 1){
                this.data = d.data;
                this.data.rightDays = getRightDays(this.data.endTime);
                this.data.cTime = formatTime(new Date(this.data.createTime))
            }
        })
    },
    methods:{
        loginSucc(){
            this.login = true
        },
        join(){
            joinTarget(this.tid).then(res=>{
                var d= res.data;
                console.log(res)
                if(d.code == 1){
                    showSucc('参与成功');
                    setTimeout(()=>{
                        wx.navigateBack({
                          delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                        });
                    },800)
                }
            })
        },
        noJoin(){
            wx.navigateBack({
                delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
.share-page
    position relative
.bg-box
    width 375px
    height 280px
    margin 0 auto
    overflow hidden
    text-align center
    img
        width 100%
        height 100%
        object-fit contain  
.avatar
    width 72px
    height 72px
    margin 15px auto
    overflow hidden
    border-radius 50% 
    img 
        width 100%
        height 100%
        object-fit cover    
.text
    font-size 14px
    text-align center
.desc
    position absolute
    top 24px
    left 30px
    .row1
        font-size 20px
        margin-bottom 27px
    .row2
        font-size 15px
        margin-bottom 27px
        .count
            font-size 35px
        .day
            font-size 20px
    .row3
        margin-bottom 27px
        font-size 15px
        .unit
            font-size 10px
            vertical-align top
        .money
            font-weight bold
    .row4
        font-size 10px
.btn-group
    margin-top 60px
    padding 0px 30px
    display flex
    button
        display inline-block
        height 40px
        line-height 40px
        flex 1
        border 1px solid #479EF8
    button:nth-child(1)
        margin-right 20px
</style>
