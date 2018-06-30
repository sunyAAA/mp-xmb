<template>
    <div class="edit-page">
         <textarea v-model="content" class="text" id="" cols="30" rows="20" placeholder="记录您的目标日记"></textarea>
         <div class="img-box">
             <div class="show-box">
                  <img v-for="(item,index) in renderUrl"  :key="index"
                     class='item' :src="item" alt="">
             </div>
            <div class="icon-box" @click.stop='upLoadImg'>
                <img src="../../static/icon/icon/dptp3x.png" alt="">
            </div>
         </div>

        <div class="btn-box">
            <button @click="cencel">取消</button>
            <button @click="send">发布</button>
        </div>
    </div>
</template>

<script>
import {upImgs, showSucc,dateForm} from '../../utils'
import {addNewDaely} from '../../api'
export default {
    data(){
        return{
            imgUrl:[],
            content:''
        }
    },
    onLoad(options){
        this.tid = options.tid;
    },
    computed:{
        renderUrl(){
            return this.imgUrl.slice(-2)
        }
    },
    methods:{
        upLoadImg(){
            upImgs(2,this.imgUrl)
        },
        send(){
            let params = {
                targetId:this.tid,
                content:this.content,
                images:this.renderUrl.join(',')
            }
            if(!this.content){msg('日记内容不得为空');return}
            addNewDaely(params).then(res=>{
                if(res.data.code == 1){
                    showSucc('发布成功');
                    setTimeout(()=>{
                        wx.navigateBack({
                          delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                        });
                    },800)
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.text
    width 80%
    margin 20px auto
    font-size 14px
    padding 20px
    border 1px solid #eee
.edit-page
    .img-box
        position relative
        height 150px
        margin 0 20px
        margin-top 20px
        border 1px solid #eee
        .icon-box
            position absolute
            bottom 10px
            right 10px
            z-index 999 class='item'
        img.item
            width 100px
            height 120px
            object-fit cover
            margin-right 10px
            margin-left 10px
            margin-top 20px
            vertical-align bottom
.btn-box
    padding 10px 30px 
    &>button
        display inline-block
        width 100px
        font-size 14px
        &:nth-child(2)
            float right 

</style>
