<template>
  <div class="first-wraper">
    <div class="first-inner">
      <div class="first-title">3 {{$i18n.translate("Account submission")}}</div>
      <group class="first-group-wraper">
        <div>
          <selector
            :title="$i18n.translate('Country of Citizenship')"
            :placeholder="$i18n.translate('Please choose')"
            @on-change="nationalityChange"
            v-model="nationality_id"
            :options="nationalityOptions"
          ></selector>
          <selector
            :title="$i18n.translate('website')"
            @on-change="websiteChange"
            :placeholder="$i18n.translate('Please choose')"
            v-model="website_id"
            :options="websiteKeyOptions"
          ></selector>
        </div>
      </group>
      <xButton
        class="first-btn"
        type="primary"
        @click.native="handleClick"
        :disabled="buttonDisabled"
      >{{$i18n.translate('submit')}}</xButton>
      <xButton
        class="first-btn"
        type="primary"
        @click.native="viewResult"
      >{{$i18n.translate('View the results')}}</xButton>
      <div class="first-info">Tips: {{$i18n.translate('Account submission info')}}</div>
    </div>
    <confirm
      ref="confirm"
      v-model="show"
      :title="handleTitle()"
      @on-confirm="onConfirm"
      @on-hide="onHide"
      :close-on-confirm="false"
    >
      <group>
        <x-input :title="$i18n.translate('username')" v-model="account"></x-input>
        <x-input :title="$i18n.translate('password')" v-model="password"></x-input>
        <x-input
          v-if="isYishengboWebsite(website_id)"
          :title="$i18n.translate('security code')"
          v-model="security_code"
        ></x-input>
      </group>
    </confirm>
    <div v-transfer-dom>
      <alert
        v-model="multipleSubmitAlertVisible"
        :title="$i18n.translate('Repeated submission')"
        :button-text="$i18n.translate('close')"
      >
        <br />
        <p>{{$i18n.translate('info15')}}</p>
        <p>{{$i18n.translate('info16')}}</p>
        <br />
        <p>{{$i18n.translate('info17')}}</p>
      </alert>
    </div>
  </div>
</template>

<script>
import { Selector, Group, XButton, XInput, Confirm, cookie, Alert } from "vux";
import Api from "../../../service/GetMoney";
export default {
  props: {
    nationalityOptions: Array,
    websiteOptions: Object
  },
  components: { Group, Selector, XButton, XInput, Confirm, Alert },
  data() {
    return {
      show: false,
      account: "",
      password: "",
      security_code: "",
      nationality_id: "",
      website_id: "",
      buttonDisabled: true,
      websiteKeyOptions: [],
      multipleSubmitAlertVisible: false
    };
  },
  methods: {
    isYishengboWebsite(id) {
      return id === 5;
    },
    alertMultipleSubmit() {
      this.multipleSubmitAlertVisible = true;
    },
    viewResult() {
      this.$router.push({ name: "SubmissionStatus" });
    },
    onHide() {
      this.account = "";
      this.password = "";
      this.security_code = "";
    },
    onConfirm() {
      if (this.account.trim() === "") {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      if (this.password.trim() === "") {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      const {
        nationality_id,
        website_id,
        account,
        password,
        security_code
      } = this;
      const params = {
        nationality_id,
        website_id,
        account,
        password
      };
      if (security_code) {
        params.security_code = security_code;
      }
      Api.accountSubmit(params, cookie.get("token"), this.$store.state.language)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$vux.toast.text(res.msg);
            this.$refs.confirm._onCancel();
          } else if (res.errorCode === 13) {
            this.$refs.confirm._onCancel();
            this.alertMultipleSubmit();
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "accountSubmit" + this.$i18n.translate("error info")
          );
        });
    },
    handleClick() {
      this.show = true;
    },
    handleTitle() {
      const website = this.websiteKeyOptions.find(value => {
        return value.key === this.website_id;
      });
      return website ? website.value : "";
    },
    nationalityChange(val) {
      const keyOptions = this.websiteOptions[val];

      if (keyOptions) {
        this.websiteKeyOptions = keyOptions;
        this.website_id = keyOptions[0].key;
      }
      this.websiteChange();
    },
    websiteChange(val) {
      if (this.nationality_id !== "" && this.website_id !== "") {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
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
  font-size: 14px;
  margin: 10px 0;
}
.first-info {
  color: #9e9e9e;
  margin-top: 20px;
}
.first-group-wraper {
  margin: 10px 0;
}
.first-group-wraper2 {
  height: 50px;
}
</style>
