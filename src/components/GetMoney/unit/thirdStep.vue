<template>
  <div class="first-wraper">
    <div class="first-inner">
      <div class="first-title">2 {{$i18n.translate('Deposit')}}</div>
      <div class="first-btn-wraper">
        <xButton class="first-btn" @click.native="submit">{{$i18n.translate('Deposit')}}</xButton>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  components: { XButton },
  data() {
    return {};
  },
  methods: {
    submit() {
      this.$router.push({
        name: "PersonalRecharge"
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";

.first-wraper {
  font-size: 14px;
  padding: 10px 0;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e0e0e0;
  padding: 5px;
}
.first-inner {
  padding: 15px;
}
.first-title {
  font-size: 18px;
  font-weight: 500;
}
.first-btn {
  display: inline-block;
  width: 115px;
  font-size: 14px;
  margin: 0;
}
.first-btn-wraper {
  padding: 20px;
}
</style>
