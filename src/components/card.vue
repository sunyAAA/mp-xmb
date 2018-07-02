<template>
    <div class="card" @click='godetail'>
            <div class="icon">
                <img :src="renderData.url" alt="">
            </div>
            <div class="desc">
                <h2>{{renderData.nickname}}</h2>
                <p>已坚持{{renderData.hasDay}}天</p>
            </div>
            <div class="time">
                <h2>{{renderData.leftDay}}天</h2>
                <p>距离目标</p>
            </div>
    </div>
</template>

<script>
import {_getU,getLeftDays,getRightDays} from './../utils'
export default {
    props:{
        readOnly:{
            type:Boolean,
            default:false
        },
        data:{
            type:Object,
            default:function(){
                return{}
            }
        }
    },
    data(){
        return {
        }
    },
    computed:{
        renderData(){
            return {
                name : this.data.name,
                hasDay: getLeftDays(this.data.beginTime),
                leftDay:getRightDays(this.data.endTime),
                url:this.data.avatar,
                nickname:this.data.user?this.data.user.nickname:''
            }
        }
    },
    methods:{
        godetail(){
            if(this.readOnly){
                return
            }
            wx.navigateTo({
                url:'../../pages/targetDetail/main?tid='+this.data.targetId
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.card
    display flex
    align-items center
    height 55px
    padding 10px
    margin 10px 20px
    border-right 4px
    border-radius 4px
    border 1px solid #eee
    background #A3CEFB 
    .icon
        flex 0 0 50px
        height 50px
        overflow hidden
        margin-right 20px
        margin-left 20px
        border-radius 50%
        img
            width 100%;
            height 100%
            object-fit cover
    .desc
        flex 1
        h2
            font-size 14px
            margin-bottom 6px
        p
            font-size 10px
    .time
        text-align center
        flex 0 0 60px
        h2
            font-size 20px
        p
            font-size 10px
</style>

