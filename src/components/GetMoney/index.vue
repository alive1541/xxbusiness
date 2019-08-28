<template>
  <div id="money-wraper" class="money-wraper">
    <firstStep :nationalityOptions="nationalityOptions" />
    <thirdStep :nationalityOptions="nationalityOptions" />
    <secondStep :nationalityOptions="nationalityOptions" :websiteOptions="websiteOptions" />
    <div v-if="isNewUser" v-transfer-dom>
      <x-dialog v-model="showDialog" class="dialog-demo">
        <div class="accout-dialog">
          <br />
          <p class="account-info">{{$i18n.translate("info1")}}</p>
          <br />
          <p class="account-info">{{$i18n.translate("info2")}}</p>
          <br />
          <p class="account-info-strong">{{$i18n.translate("title1")}}</p>
          <p class="account-info-strong">{{$i18n.translate("info3")}}</p>
          <br />
          <p class="account-info-strong">{{$i18n.translate("title2")}}</p>
          <p class="account-info-strong">{{$i18n.translate("info4")}}</p>
          <br />
          <p class="account-info-strong">{{$i18n.translate("title3")}}</p>
          <p class="account-info-strong">{{$i18n.translate("info5")}}</p>
          <br />
          <p class="account-info">{{$i18n.translate("info6")}}</p>
          <br />
          <p class="account-info-small">{{$i18n.translate("info7")}}</p>
          <br />
        </div>
        <x-icon class="vux-close" @click="showDialog = false" type="ios-close-outline"></x-icon>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import FirstStep from "./unit/firstStep.vue";
import SecondStep from "./unit/secondStep.vue";
import ThirdStep from "./unit/thirdStep.vue";
import Api from "../../service/GetMoney";
import { cookie, XDialog } from "vux";
import { initFromOfficialWebsite } from "../../assets/util/index";
import qs from "qs";

export default {
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    XDialog
  },
  data() {
    return {
      nationalityOptions: [],
      websiteOptions: {},
      isNewUser: false,
      showDialog: true
    };
  },
  methods: {
    checkNewUser() {
      const query = location.href.split("?")[1];
      try {
        const { isNewUser } = qs.parse(query);
        if (isNewUser === "true") {
          this.isNewUser = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
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
  beforeMount: function() {
    this.checkNewUser();
    initFromOfficialWebsite(this);
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
// .accout-dialog {
// overflow-y: scroll;
// height: 100%;
// padding: 56px 10px 20px 10px;
// }

.account-info,
.account-info-small {
  text-align: center;
  font-weight: 500;
  font-size: 14px;
}
.account-info-strong {
  font-weight: 700;
  font-size: 25px;
}
.account-info-small {
  font-size: 12px;
}
.money-wraper {
  padding-bottom: 75px;
}

.dialog-demo {
  .dialog-title {
    line-height: 30px;
    color: #666;
  }

  .accout-dialog {
    height: 94%;
    padding: 10px 15px;
    overflow-y: scroll;
  }

  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
