<template>
  <div class="first-wraper">
    <div class="first-inner">
      <div class="first-title">1 {{$i18n.translate("Website registration")}}</div>
      <div class="first-btn-wraper">
        <xButton
          type="primary"
          class="first-btn"
          @click.native="autoSign"
        >{{$i18n.translate("One-click registration")}}</xButton>
        <xButton
          type="primary"
          class="first-btn"
          @click.native="personalSign"
        >{{$i18n.translate("Manual registration")}}</xButton>
      </div>
      <div class="first-info">Tip: {{$i18n.translate("One-click registration info")}}</div>
    </div>
    <confirm
      ref="confirm"
      v-model="show"
      :title="$i18n.translate('Please choose')"
      @on-confirm="onConfirm"
      :close-on-confirm="false"
    >
      <group class="first-selector">
        <selector
          :title="$i18n.translate('Country of Citizenship')"
          :placeholder="$i18n.translate('Please choose')"
          v-model="value"
          :options="nationalityOptions"
        ></selector>
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
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
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
