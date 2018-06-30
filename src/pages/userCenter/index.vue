<template>
    <div class="over-page">
        <div class="head-box">
            <div class="img-box-m">
                <img :src="headUrl" alt="">
            </div>
            <p>{{userName}}</p>
        </div>  
        <div class="blank"></div>
        <div class="safeMoney">
            我的保证金
            <div class="icon-box">
                <img src="../../../static/money.png" alt="">
            </div>
            <p class="ye"> <span class="unit">￥</span> 120.00</p>
        </div>
        <div class="myBag safeMoney">
            <div class="icon-box">
                <img src="../../../static/money.png" alt="">
            </div>
            <p class="ye"> <span class="unit">￥</span> 30.00</p>
            <button class="myBagBtn" @click='goMyBag'>我的钱包</button>
        </div>
    </div>
</template>

<script>
import { _getU } from '../../utils';
import zcard from '../../components/card'
export default {
    components:{zcard},
    data(){
        return{
            headUrl:'',
            userName:'',
        }
    },
    mounted(){
        this.headUrl = _getU().avatarUrl
        this.userName = _getU().nickName
    },
    methods:{
        goMyBag(){
            wx.navigateTo({ url: '../../pages/myBag/main' });
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
    height 2px
    background #eee
.safeMoney
    margin  20px 
    padding 10px
    font-size 16px
    border 1px solid #A3CEFB
    border-radius 5px
    .icon-box
        width 50px
        height 50px
        overflow hidden
        margin 0 auto 
        margin-top 20px
        &>img
            width 100%
            height 100%
            object-fit cover
    .ye
        font-size 40px
        text-align center
        font-weight bold
        margin-top 10px
        transform translate(-5%,0)
        .unit
            font-size 20px
            vertical-align top
.myBagBtn
    width 150px
    height 40px
    line-height 40px
    font-size 14px
    margin o auto
    margin-top 20px
    background #479EF8
    color #fff
</style>
