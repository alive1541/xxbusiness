<template>
  <div class="new-user-wraper">
    <div class="new-user-padding">
      <p class="new-user-info">{{$i18n.translate("info9")}}</p>
      <p class="new-user-info">{{$i18n.translate("info10")}}</p>
      <p class="new-user-info">{{$i18n.translate("info11")}}</p>
      <p class="new-user-info">{{$i18n.translate("info12")}}</p>
      <p class="new-user-info">{{$i18n.translate("info13")}}</p>
      <p class="new-user-info">{{$i18n.translate("info14")}}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.new-user-wraper {
  font-size: 14px;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  margin-bottom: 70px;
  box-shadow: 0 2px 8px #e0e0e0;
}
.new-user-padding {
  padding: 40px;
}
.new-user-info {
  text-align: center;
  margin-bottom: 15px;
}
</style>
