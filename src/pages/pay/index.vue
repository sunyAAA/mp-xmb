<template>
    <div class="pay-page">
        <div class="top-bar">
            <div class="img-box-s">
                <img src="../../../static/user.png" alt="">
            </div>
            <div class="text-box">
                目标保证金：{{fixedMoney}}
            </div>
        </div>
        <div class="select-box">
            <div class="item-group">
                <div class="item" :class="{active:selectIndex==1}" @click="select(1)">
                    1 元
                </div>
                <div class="item" :class="{active:selectIndex==2}" @click="select(2)">
                    6 元
                </div>
            </div>
            <div class="item-group">
                <div class="item" :class="{active:selectIndex==3}" @click="select(3)">
                    12 元
                </div>
                <div class="item" :class="{active:selectIndex==4}" @click="select(4)">
                    16 元
                </div>
            </div>
            <div class="item-group">
                <div class="item" :class="{active:selectIndex==5}" @click="select(5)">
                    26 元
                </div>
                <div class="item" :class="{active:selectIndex==6}" @click="select(6)">
                    <input type="number" v-model="customMoney" placeholder="自定义">
                </div>
            </div>
        </div>
        <div class="btn-box">
            <button>立刻充值</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            targetMoney:0,
            selectIndex:1,
            customMoney:null,
        }
    },
    mounted(){
        this.moneyArr=['',1,6,12,16,26,0]
    },
    computed:{
        fixedMoney(){
            return this.selectIndex == 6 ? this.customMoney?this.customMoney+'.00':'0.00': this.targetMoney.toFixed(2)
        }
    },
    methods:{
        select(i){
            this.selectIndex = i;
            if(i == 0 ){
                return
            }else{
                this.targetMoney = this.moneyArr[i]
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.top-bar
    display flex
    margin 20px 60px
    padding 10px
    padding-left 20px
    align-items center
    border 1px solid #479EF8
    border-radius 4px
    .img-box-s 
        flex 0 0 20px
        height 20px
        overflow hidden
        img
            width 100%
            height 100%
            object-fit cover
    .text-box
        flex 1
        color #999
        padding-left 20px
        font-size 16px
.select-box
    margin 25px
    .item-group
        display flex
        margin-bottom 20px
        .item
            flex 1
            border 1px solid #479EF8
            border-radius 4px
            height 75px
            line-height 75px
            text-align center
            &:nth-child(1)
                margin-right 20px
            &>input
                height 75px
                line-height 75px
                z-index 100
        .item.active
            background #A3CEFB 
            color  #479EF8
.btn-box
    margin 0 40px
    margin-top 50px
    button
        background  #479EF8 
        color #fff
</style>

