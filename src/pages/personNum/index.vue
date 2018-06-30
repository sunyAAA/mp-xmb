<template>
    <div class="pay-page">
        <div class="select-box">
            <div class="item-group">
                <div class="item" :class="{active:selectIndex==1}" @click="select(1)">
                    1 人
                </div>
                <div class="item" :class="{active:selectIndex==2}" @click="select(2)">
                    2 人
                </div>
            </div>
            <div class="item-group">
                <div class="item" :class="{active:selectIndex==3}" @click="select(3)">
                    3 人
                </div>
                <div class="item" :class="{active:selectIndex==4}" @click="select(4)">
                    4 人
                </div>
            </div>
            <div class="item-group">
                <div class="item" :class="{active:selectIndex==5}" @click="select(5)">
                    5 人
                </div>
                <div class="item" :class="{active:selectIndex==6}" @click="select(6)">
                    <input type="number" maxlength='1' v-model="customMoney" placeholder="自定义">
                </div>
            </div>
        </div>
        <div class="btn-box">
            <button @click='send'>确定</button>
        </div>
    </div>
</template>

<script>
import {showSucc} from '../../utils'
export default {
    data(){
        return{
            targetMoney:16,
            selectIndex:4,
            customMoney:null,
        }
    },
    mounted(){
        this.moneyArr=['',1,2,3,4,5,0]
    },
    computed:{
        fixedMoney(){
            return this.selectIndex == 6 ? this.customMoney?this.customMoney:0 : this.targetMoney
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
        },
        send(){
            wx.setStorageSync('personNum',this.fixedMoney);
            showSucc('设置成功',()=>{
                wx.navigateBack({
                    delta: 1
                })
            })

        }
    }
}
</script>

<style lang="stylus" scoped>
.title
    padding 5px 
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

