<template>
    <div class="Daily-page">
        <div class="title-box">
            <div class="img-box-l">
                <img :src="headUrl" alt="">
            </div>
            <p>{{name}}</p>
        </div>
        <div class="add-box" v-show="isSelf">
            <p>{{today}}</p>
            <div class="addBtn"  @click='goEdit'>
                <img src="../../static/icon/icon/dptp3x.png" alt="">
                <p class="text">添加日记</p>
            </div>
        </div>
        <div class="item-box" v-for='(item,index) in renderList' :key="index">
            <span class="delete" v-show="isSelf"  @click='removeDaily(item.logId)'>
                删除
            </span>
            <div class="daily-box">
                <p class="time">{{item.time}}</p>
                <p class="text">{{item.content}}</p>
                <div class="img-box" v-if="item.showImg">
                    <img v-if='item.imgList[0]' :src=" oss +item.imgList[0]" alt="">
                    <img v-if='item.imgList[1]' :src=" oss +item.imgList[1]" alt="">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { _getU, dateForm, formatTime, showSucc,showModel } from "../../utils";
import { getDailyByTid, getTargetDetail, removeLogById } from "../../api";

export default {
  data() {
    return {
      headUrl: "",
      name:'',
      isSelf: false,
      DailyList: [],
      oss: this.$oss
    };
  },
  onLoad(options) {
    this.uid = options.uid;
    this.tid = options.tid;
    this.self = wx.getStorageSync("userId");
    this.isSelf = this.uid == this.self?true:false
  },
  onShow() {
    this.getDailyList();
  },
  computed: {
    today() {
      return formatTime(new Date());
    },
    renderList() {
      return this.DailyList.filter(item => {
        item.time = formatTime(new Date(item.createTime));
        item.imgList = item.images.split(",");
        item.showImg = item.images ? true : false;
        return item;
      });
    }
  },
  methods: {
    getDailyList() {
      this.pageSize = 8;
      this.pageNum = 1;
      getTargetDetail(this.tid).then(res => {
        var d = res.data;
        if (d.code == 1) {
          this.headUrl = d.data.avatar;
          this.name = d.data.name
        } else {
          msg("数据请求失败~！");
        }
      });
      getDailyByTid(this.tid, this.pageSize, this.pageNum).then(res => {
        var d = res.data;
        if (d.code == 1) {
          this.DailyList = d.data;
        } else {
          msg("数据请求失败~！");
        }
      });
    },
    removeDaily(id) {
      showModel("确定要删除这条日记吗？").then(res => {
        if (res) {
          removeLogById(id).then(res => {
            var d = res.data;
            if (d.code == 1) {
              showSucc("删除成功");
              this.getDailyList();
              this.isEdit = false;
            } else {
              msg("数据请求失败~！");
            }
          });
        }
      });
    },
    edit() {
      this.isEdit = !this.isEdit;
    },
    eidtAll() {
      var result = null;
      if (!this.selectAll) {
        result = true;
      } else {
        result = false;
      }
      for (var val of this.items) {
        val.checked = result ? "true" : "";
      }
      this.selectAll = result;
    },
    goEdit() {
      wx.navigateTo({ url: "../../pages/editDaily/main?tid=" + this.tid });
    }
  }
};
</script>

<style lang="stylus" scoped>
.title-box {
    border-bottom: 1px soldi #eee;
    font-size: 16px;
    text-align: center;
    position: relative;

    .img-box-l {
        margin: 0 auto 10px auto;
    }

    .edit {
        position: absolute;
        right: 20px;
        top: 0;
    }
}

.checkbox {
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.card {
    flex: 0 0 300px;
    float: right;
}

.add-box {
    padding: 20px;

    p {
        margin-bottom: 20px;
        font-size: 14px;
    }

    .addBtn {
        height: 98px;
        overflow: hidden;
        line-height 98px
        text-align: left ;
        border: 1px solid #eee;
        position relative
        .text{
          height 98px
          line-height 98px
          text-align center
          font-size 16px
          padding-right 24px
          color #999
        } 

        img {
            position absolute
            left 0
            width: 48px;
            height: 48px;
            margin 20px 0;
            padding-left : 40px;
            object-fit: contain;
        }
    }
}

.daily-box {
    border  1px solid #eee
    margin 0 auto
    padding: 10px;
    flex: 0 0 70%;
    position: relative;
    font-size: 14px;
    color #333

    .time {
        margin-bottom: 10px;
    }

    .text {
        max-height: 80px;
        padding: 10px 20px;
        overflow:hidden;
        text-overflow:ellipsis; 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
}

.item-box {
    position: relative;
    border-top 2px solid #eee
}
.item-box:nth-child(1){
  border-top 1px solid #eee
}

.btn-box {
    padding: 10px 30px;

    &>button {
        display: inline-block;
        width: 100px;
        font-size: 14px;

        &:nth-child(2) {
            float: right;
        }
    }
}

.delete {
    position: absolute;
    right : 10px;
    padding 10px
    font-size: 14px;
    color: #A3CEFB;
    z-index 999
    color #333
}

.img-box {
    height: 100px;
    padding: 20px;

    img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        margin-right: 10px;
    }
}
</style>
