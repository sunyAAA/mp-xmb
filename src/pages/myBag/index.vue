<template>
    <div class="my-bag-page">
        <div class="icon-box-rect">
            <img src="../../../static/bag.png" alt="">
        </div>
        <p class="title">我的零钱</p>
        <p class="money"> 
            <span class="unit">￥</span>
            0.00
        </p>
        <div class="blank"></div>
        <p class="left">申请提现（元）</p>
        <div class="box">
            <p class="unit">￥</p>
            <div class="ctrol"><input type="number" v-model="money" placeholder="请输入提现金额（整数）"
                placeholder-style="color:#999;font-size:12px"
            ></div>
            <p class="desc">全部提现</p>
        </div>
        <div class="ye-box" @click='goMoneyDetail'>
            余额明细   <span class="arrow">></span>
        </div>
        <button class="btn" @click='take'>申请提现</button>
        <confirm ref='conf' @send='catchSend'></confirm>
    </div>
</template>
<script>
import confirm from '../../components/confirm'
export default {    
    components:{confirm},
    data(){
        return {
            money:null,
        }
    },
    methods:{
        goMoneyDetail(){
            wx.navigateTo({ url: '../../pages/moneyDetailed/main' });
        },
        catchSend(state){
        },
        take(){
            this.$refs.conf.show()
        }
    }
}
</script>

<style lang="stylus" scoped>
.icon-box-rect
    width 50px
    height 50px
    overflow hidden
    margin 20px auto
    &>img
        width 100%
        height 100%
        object-fit cover
.title
    text-align center
    padding 10px
.money
    text-align center
    font-size 40px
    font-weight bold
    transform translate(0,0)
    .unit
        font-size 20px
        vertical-align top
.blank
    margin-top 44px
    height 1px
    background #eee
.left
    padding 10px 15px
    font-size 14px
.box
    display flex
    align-items flex-end
    padding-bottom 20px
    border-bottom 1px solid #eee
    .unit
        flex 0 0 44px
        padding-left 30px
        font-size 26px
        font-weight bold
    .ctrol
        flex 1
        input
            text-align center
            font-size 26px
    .desc
        flex 0 0 60px
        padding-right 20px
        font-size 12px
        transform translate(0,-35%)
        color #3743B2
.ye-box
    height 60px
    padding 0 30px
    line-height 60px
    font-size 14px
    border-bottom 1px solid #eee
    .arrow
        font-weight bold
        float right 
.btn
    width 70%
    margin 0 auto
    height 40px
    line-height 40px
    color #fff
    background #479EF8
    margin-top 30px
</style>
