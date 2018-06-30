<template>
    <div class="tab">
       <div v-for="(k,i) in tabList" :key="i"
        :class="{active:active==i}" @click='tabTo(i,k.status)'>{{k.name}}</div>
    </div>
</template>

<script>
export default {
    props:{
        tabList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            active:0
        }
    },
    methods:{
        tabTo(index,status){
            this.active = index;
            this.$emit('tabChange',status)
        },
    }
}
</script>

<style lang="stylus" scoped>
.tab
    display  flex
    align-items center
    padding 0 50px
    &>div
        flex 1
        text-align center
        font-size 14px
        height 40px
        line-height 40px
        margin 0 10px
        border-bottom 2px solid transparent
    &>div.icon
        flex 0 0 80px
    &>div.active
        border-bottom 2px solid  #479EF8
</style>
