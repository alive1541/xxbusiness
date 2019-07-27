<template>
  <div class="first-wraper">
    <div class="first-inner">
      <div class="first-title">第二步 账号提交</div>
      <group class="first-group-wraper">
        <div>
          <selector
            title="国籍"
            placeholder="请选择注册国籍"
            @on-change="nationalityChange"
            v-model="nationality_id"
            :options="nationalityOptions"
          ></selector>
          <selector
            title="网站"
            @on-change="websiteChange"
            placeholder="请选择网站"
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
      >提交</xButton>
      <div class="first-info">提示：手动注册需要提交账号密码；修改了密码的也需要提交账号密码，否则系统无法完成自动下单</div>
    </div>
    <confirm
      ref="confirm"
      v-model="show"
      :title="handleTitle()"
      @on-confirm="onConfirm"
      :close-on-confirm="false"
    >
      <group>
        <x-input title="账户名" v-model="account"></x-input>
        <x-input title="密码" v-model="password"></x-input>
      </group>
    </confirm>
  </div>
</template>

<script>
import { Selector, Group, XButton, XInput, Confirm, cookie } from "vux";
import Api from "../../../service/GetMoney";
export default {
  props: {
    nationalityOptions: Array,
    websiteOptions: Object
  },
  components: { Group, Selector, XButton, XInput, Confirm },
  data() {
    return {
      show: false,
      account: "",
      password: "",
      nationality_id: "",
      website_id: "",
      buttonDisabled: true,
      websiteKeyOptions: []
    };
  },
  methods: {
    onConfirm() {
      if (this.account.trim() === "") {
        return this.$vux.toast.text("请填写账户名");
      }
      if (this.password.trim() === "") {
        return this.$vux.toast.text("请填写密码");
      }
      const { nationality_id, website_id, account, password } = this;
      const owner_id = window.localStorage.getItem("owner_id");
      Api.accountSubmit(
        {
          owner_id,
          nationality_id,
          website_id,
          account,
          password
        },
        {
          owner_id,
          token: cookie.get("token")
        }
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$vux.toast.text(res.msg);
            this.$refs.confirm._onCancel();
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
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
  },
  mounted() {}
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
