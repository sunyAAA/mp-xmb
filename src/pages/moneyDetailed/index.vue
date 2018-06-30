<template>
    <div class="over-page">
        <div class="top-bar">
            <div class="case" :class="{active:active==0}"
                @click='toggle(0)'
            >收入明细</div>
            <div class="case" :class="{active:active==1}"
                @click='toggle(1)'
            >提现明细</div>
        </div>
        <card-right></card-right>
        <card-left></card-left>
    </div>
</template>

<script>
import { _getU } from '../../utils';
import cardRight from '../../components/caseRight'
import cardLeft from '../../components/cardLeft'
export default {
    components:{cardRight,cardLeft},
    data(){
       return{
           active:0
       }
    },
    methods:{
        toggle(i){
            this.active = i;
        }
    }
}
</script>

<style lang="stylus" scoped>
.top-bar
    display flex
    height 50px
    border 1px solid #eee
    .case
        flex 1
        text-align center
        height 50px
        line-height 50px
        font-size 14px
        &:nth-child(1)
            border-right 1px solid #eee
        &.active
            color #479EF8
</style>
