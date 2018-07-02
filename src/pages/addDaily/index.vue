<template>
    <div class="Daily-page">
        <div class="title-box">
            <div class="img-box-l">
                <img :src="headUrl" alt="">
            </div>
            <p>每天十一点睡觉</p>
            <span class="edit" @click='edit' v-show='isSelf'>编辑</span>
        </div>
        <div class="add-box" v-show="!isEdit && isSelf">
            <p>{{today}}</p>
            <div class="addBtn" @click='goEdit'>
                <img src="../../static/icon/icon/dptp3x.png" alt="">
            </div>
        </div>
        <div class="item-box" v-for='(item,index) in renderList' :key="index">
            <span class="delete" v-show='isEdit' @click='removeDaily(item.logId)'>
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
import { _getU, dateForm, formatTime, showSucc } from "../../utils";
import { getDailyByTid, getTargetDetail, removeLogById } from "../../api";

export default {
  data() {
    return {
      headUrl: "",
      isEdit: false,
      selectAll: false,
      isSelf: false,
      DailyList: [],
      oss: this.$oss
    };
  },
  onLoad(options) {
    this.uid = options.uid;
    this.tid = options.tid;
    this.self = wx.getStorageSync("userId");
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
          if (this.uid == d.data.userId) {
            this.isSelf = true;
          }
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
    checkboxChange(e) {
      console.log("checkbox发生change事件，携带value值为：", e.mp.detail.value);
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
        text-align: center;
        border: 1px solid #eee;

        img {
            width: 78px;
            height: 78px;
            margin: 10px auto;
            object-fit: contain;
        }
    }
}

.daily-box {
    background: #A3CEFB;
    padding: 10px;
    flex: 0 0 70%;
    margin-bottom: 20px;
    position: relative;
    font-size: 14px;
    transform: translate(10%, 0);

    .time {
        margin-bottom: 10px;
    }

    .text {
        max-height: 80px;
        padding: 10px 20px;
        overflow: hidden;
    }
}

.item-box {
    margin-top: 40px;
    position: relative;
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
    left: 20px;
    top: -30px;
    font-size: 14px;
    color: #A3CEFB;
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
