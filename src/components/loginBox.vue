<template>
    <div class="login-box">
         <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
    </div>
</template>
<script>
import { _login, _getUserInfo,_loading } from "../utils";
export default {
  data() {
    return {};
  },
  methods: {
      //  用户主动授权 并存入userInfo信息
    getUserInfo(e) {
      _loading("加载中.....");
      var res =  e.mp.detail.userInfo
      wx.setStorageSync("userInfo", res);
      _loading();
      this.$emit("succ");
    }
  },
  mounted() {
      //  如果用户有过登录并授权，则更新本地用户信息并返回，否则返回 null
    _login(res => {
      if (res) {
        this.$emit("succ");
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
.login-box {
    width: 80%;
    padding: 0 20px;
    margin: 20px auto;

    button {
        background: #479EF8;
        color: #fff;
        height: 40px;
        line-height: 40px;
    }
}
</style>

