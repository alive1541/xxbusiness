<template>
  <div class="first-wraper">
    <div class="first-inner">
      <div class="first-title">第一步 网站注册</div>
      <div class="first-btn-wraper">
        <xButton type="primary" class="first-btn" @click.native="autoSign">一键注册</xButton>
        <xButton class="first-btn" @click.native="personalSign">手动注册</xButton>
      </div>
      <div class="first-info">提示：一键注册目前只支持liji、平博、12bet这三个网站。其他网站还需要您手动注册</div>
    </div>
    <confirm
      ref="confirm"
      v-model="show"
      title="选择国籍"
      @on-confirm="onConfirm"
      :close-on-confirm="false"
    >
      <group class="first-selector">
        <selector title="国籍" placeholder="请选择国籍" v-model="value" :options="nationalityOptions"></selector>
      </group>
    </confirm>
  </div>
</template>

<script>
import { XButton, Group, Selector, Confirm } from "vux";

export default {
  props: {
    nationalityOptions: Array
  },
  components: { XButton, Group, Selector, Confirm },
  data() {
    return { show: false, value: "" };
  },
  methods: {
    autoSign() {
      this.$router.push({ name: "AutoSign" });
    },
    personalSign() {
      this.show = true;
    },
    onConfirm() {
      if (this.value === "") {
        return this.$vux.toast.text("请选择国籍");
      }
      this.$router.push({
        name: "PersonalSign",
        params: {
          type: "personalSign",
          nationality_id: this.value
        }
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
  width: 115px;
  display: inline-block;
  margin: 5px 10px;
  font-size: 14px;
}
.first-info {
  color: #9e9e9e;
  margin-top: 20px;
}
.first-btn-wraper {
  margin: 10px;
}
.first-selector {
  margin-bottom: 15px;
}
</style>
