<template>
  <div class="first-wraper">
    <div class="first-inner">
      <div class="first-title">2 {{$i18n.translate('Deposit')}}</div>
      <div class="first-btn-wraper">
        <xButton class="first-btn" @click.native="submit">{{$i18n.translate('Deposit')}}</xButton>
      </div>
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
import { XButton, Confirm, Group, Selector } from "vux";
export default {
  props: {
    nationalityOptions: Array
  },
  components: { XButton, Confirm, Group, Selector },
  data() {
    return { show: false, value: "" };
  },
  methods: {
    onConfirm() {
      if (this.value === "") {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      this.$router.push({
        name: "PersonalRecharge",
        params: {
          type: "PersonalRecharge",
          nationality_id: this.value
        }
      });
    },
    submit() {
      this.show = true;
      // this.$router.push({
      //   name: "PersonalRecharge"
      // });
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
