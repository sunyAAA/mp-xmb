<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.img-box-l {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
}
.img-box-m {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
}
.icon-box {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
}
.img-box-l>img,.img-box-m>img,.icon-box>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
button::after{
  border: none
}
button::before{
  border: none
}

</style>
