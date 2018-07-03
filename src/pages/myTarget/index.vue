 <template>
    <div class="my-target-page">
        <ztab :tabList='tabList' @tabChange='tabChange'></ztab>
        <scroll-view scroll-y style="height:100%" lower-threshold='50' v-show="status==2 || status==3" v-if='data.length'>
            <dcard  v-for="(item,index) in data" :key="index" :data='item'></dcard>
        </scroll-view>
        <div v-show="status==4 || status == 5" v-if='data.length'>
            <zcard  v-for="(item,index) in data" :key="index"></zcard>
        </div>
        <div v-else class="no-result" >计划列表空空如也</div>
        <p v-show='!isEmp' class="load-more" @click='loadMore'>{{loadText}}</p>
    </div>
</template>

<script>
import zcard from '../../components/card'
import dcard from '../../components/dcard'
import ztab from '../../components/tabBar'
import {getMytarget} from '../../api'
import {_loading,msg} from '../../utils'
export default {
    components:{zcard,ztab,dcard},
    data(){
        return {
            tabList:[{name:'进行中',status:2},{name:'投票中',status:3},{name:'已完成',status:4},{name:'已失败',status:5}],
            status:2,
            data:[],
            loadText:'加载更多',
            hasMore:true,
            isEmp:false
        }
    },
    created(){
        this.pageSize =8,this.pageNum = 1;
    },
    onShow(){
        this.getTargetData();
    },
    computed:{
        renderData(){
            return this.data.filter(item=>item.status == this.status)
        }
    },
    methods:{
        getTargetData(){
            _loading('正在加载...')
            getMytarget(this.pageSize,this.pageNum,this.status).then(res=>{
                if(res.data.code == 1){
                    if(this.pageNum > 1 ){
                        if(res.data.data.length){
                            this.hasMore = true
                            this.data =  this.data.concat(res.data.data)
                        }
                        if(res.data.data.length < this.pageSize){
                            this.hasMore = false;
                            msg('没有更多数据了')
                            this.loadText = '没有更多数据了'
                        }
                    }else{
                        this.data = res.data.data
                        if(!res.data.data.length){
                            this.hasMore = false;
                            this.isEmp=true;
                            this.loadText = '没有更多数据了'
                        }
                        if(res.data.data.length < this.pageSize){
                            this.hasMore = false;
                            this.loadText = '没有更多数据了'
                        }
                    }
                }
                _loading()
            }).catch(()=>{
                _loading()
            })
        },
        tabChange(status){
            this.status = status,
            this.pageSize =8,this.pageNum = 1;
            this.loadText = '加载更多'
            this.getTargetData();
        },
        loadMore(){
            if(this.hasMore){
                this.pageNum ++ ;
                this.getTargetData()
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.my-target-page
    margin-top 40px
.no-result
    height 300px
    line-height 300px
    font-size 14px
    text-align center
    color #999
.load-more 
    height 40px
    line-height 40px
    font-size 12px
    text-align center
    color: #A3CEFB
</style>
