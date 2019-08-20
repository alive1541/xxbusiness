<template>
  <div class="money-wraper">
    <firstStep :nationalityOptions="nationalityOptions" />
    <thirdStep />
    <secondStep :nationalityOptions="nationalityOptions" :websiteOptions="websiteOptions" />
  </div>
</template>

<script>
import FirstStep from "./unit/firstStep.vue";
import SecondStep from "./unit/secondStep.vue";
import ThirdStep from "./unit/thirdStep.vue";
import Api from "../../service/GetMoney";
import { cookie } from "vux";

export default {
  components: {
    FirstStep,
    SecondStep,
    ThirdStep
  },
  data() {
    return {
      nationalityOptions: [],
      websiteOptions: {}
    };
  },
  methods: {
    init() {
      Api.getAllWebsites({}, cookie.get("token"), this.$store.state.language)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.setOptionsData(res.data);
          } else {
            this.errorHandler(res.msg, this.init);
            // this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.errorHandler(
            "getAllWebsites" + this.$i18n.translate("error info"),
            this.init
          );
          // this.$vux.toast.text(this.$i18n.translate("error info"));
        });
    },
    setOptionsData(data) {
      let nationalityOptions = [];
      let websiteOptions = {};
      data.forEach(item => {
        try {
          const nationalityIndex = nationalityOptions.findIndex(value => {
            return value.key === item.nationality_id;
          });
          if (nationalityIndex === -1) {
            nationalityOptions.push({
              key: item.nationality_id,
              value: item.nationality_name
            });
          }
          const websiteKey = item.nationality_id;
          if (websiteOptions[websiteKey]) {
            websiteOptions[websiteKey].push({
              key: item.website_id,
              value: item.website_name
            });
          } else {
            websiteOptions[websiteKey] = [
              {
                key: item.website_id,
                value: item.website_name
              }
            ];
          }
        } catch (e) {
          console.log("出错了--", e);
        }
      });
      this.nationalityOptions = nationalityOptions;
      this.websiteOptions = websiteOptions;
      console.log(
        "index-nationalityOptions",
        JSON.stringify(this.nationalityOptions)
      );
      console.log("index-websiteOptions", JSON.stringify(this.websiteOptions));
    },
    errorHandler(msg, cb) {
      // 显示
      this.$vux.confirm.show({
        title: msg,
        content: this.$i18n.translate("errorHandle info"),
        onConfirm() {
          cb();
        },
        onCancel() {
          // console.log("Plugin: I'm hiding");
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.money-wraper {
  padding-bottom: 75px;
}
</style>
