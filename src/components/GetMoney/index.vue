<template>
  <div class="money-wraper">
    <firstStep :nationalityOptions="nationalityOptions" />
    <secondStep :nationalityOptions="nationalityOptions" :websiteOptions="websiteOptions" />
    <thirdStep />
  </div>
</template>

<script>
import FirstStep from "./unit/firstStep.vue";
import SecondStep from "./unit/secondStep.vue";
import ThirdStep from "./unit/thirdStep.vue";
import Api from "../../service/GetMoney";

export default {
  components: {
    FirstStep,
    SecondStep,
    ThirdStep
  },
  data() {
    return {
      nationalityOptions: [],
      websiteOptions: []
    };
  },
  methods: {
    init() {
      Api.getAllWebsites()
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.setOptionsData(res.data);
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    setOptionsData(data) {
      let nationalityOptions = [];
      let websiteOptions = [];
      data.forEach(item => {
        const nationalityIndex = nationalityOptions.findIndex(value => {
          return value.key === item.nationality_id;
        });
        const websiteIndex = websiteOptions.findIndex(value => {
          return value.key === item.website_id;
        });
        if (nationalityIndex === -1) {
          nationalityOptions.push({
            key: item.nationality_id,
            value: item.nationality_name
          });
        }
        if (websiteIndex === -1) {
          websiteOptions.push({
            key: item.website_id,
            value: item.website_name
          });
        }
      });
      this.nationalityOptions = nationalityOptions;
      this.websiteOptions = websiteOptions;
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
