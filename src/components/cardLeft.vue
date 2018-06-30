    <template>
        <div class="case-box">
            <div class="desc">
                <h2>提现</h2>
                <p>2018-4-24 14:00:00</p>
            </div>
            <div class="count">
                -140.00
            </div>
        </div>
    </template>
    
    <script>
import { _getU } from "../utils";
export default {
  data() {
    return {
      headUrl: ""
    };
  },
  mounted() {
    this.headUrl = _getU().avatarUrl;
  }
};
</script>
    
<style lang="stylus" scoped>
.case-box 
    height: 50px;
    padding 15px 30px
    display  flex
    align-items center
    border-bottom 1px solid #eee
    .desc
        flex 1
        h2
            font-size 16px
            margin-bottom 10px
        p
            font-size 12px
    .count 
        flex 0 0 60px
        height 80px
        line-height 80px
        font-size 20px
</style>

    