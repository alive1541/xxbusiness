<template>
  <div class="personal-white-wraper">
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">{{$i18n.translate('Deposit Tips')}}</div>
        <p
          class="personal-content"
          style="color: #e80707"
        >1、{{$i18n.translate('Deposit Tips info1')}}</p>
        <p class="personal-content">2、{{$i18n.translate('Deposit Tips info2')}}</p>
        <p class="personal-content">3、{{$i18n.translate('Deposit Tips info3')}}</p>
        <p class="personal-content">4、{{$i18n.translate('Deposit Tips info4')}}</p>
      </div>
    </div>
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">{{$i18n.translate('Registration website')}}</div>
        <div class="personal-flex">
          <div
            @click="openModal(item)"
            class="personal-item"
            :key="i + 'key'"
            v-for="(item,i) in websiteObj"
          >{{item.website_name}}</div>
        </div>
      </div>
    </div>
    <!-- <confirm
      v-model="currentWebsiteVisile"
      :show-cancel-button="false"
      :title="website_name"
      @on-confirm="onConfirm"
    >
      <p class="personal-website-info">{{this.currentWebsite}}</p>
      <p style="text-align:center;">{{ $i18n.translate('website info') }}</p>
    </confirm>-->
    <confirm
      ref="confirm"
      v-model="currentWebsiteVisile"
      :title="website_name"
      :show-cancel-button="false"
      :show-confirm-button="false"
    >
      <div class="result-confirm-content">
        <div :key="i + 'key'" v-for="(item,i) in extraData">
          <span class="result-confirm-content-item">{{item.keyName}}</span>:
          <span class="result-confirm-content-item">{{item.value}}</span>
        </div>
      </div>
      <p class="personal-website-info">{{this.currentWebsite}}</p>
      <p style="text-align:center;margin-bottom: 10px;">{{ $i18n.translate('website info') }}</p>
      <div class="result-btn-group">
        <div class="result-concel" @click="concel()">{{$i18n.translate('vux.search.cancel_text')}}</div>
        <div
          class="result-clip"
          v-clipboard:copy="copyExt()"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >{{$i18n.translate('copy')}}</div>
      </div>
      <div class="result-pad"></div>
    </confirm>
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">{{$i18n.translate('Deposit guide')}}</div>
        <p class="personal-content">{{$i18n.translate('Deposit guide info')}}</p>
        <group>
          <x-input :placeholder="$i18n.translate('Please enter')" is-type="email" v-model="mail"></x-input>
        </group>
        <x-button
          class="personal-btn"
          type="primary"
          @click.native="getInstruction"
        >{{$i18n.translate('Getting guide')}}</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, cookie, Confirm } from "vux";
import Api from "../../service/PersonalSign";

export default {
  components: { Group, XInput, XButton, Confirm },
  data() {
    return {
      mail: "",
      websiteObj: [],
      currentWebsiteVisile: false,
      website_name: "",
      currentWebsite: ""
    };
  },
  methods: {
    copyExt() {
      return this.currentWebsite;
    },
    onError(e) {
      this.$vux.toast.text(this.$i18n.translate("Failed"));
    },
    onCopy(e) {
      this.$vux.toast.text(this.$i18n.translate("Successed"));
      this.concel();
    },
    concel() {
      this.$refs.confirm._onCancel();
    },
    openModal(item) {
      this.currentWebsiteVisile = true;
      this.website_name = item.website_name;
      this.currentWebsite = item.url;
    },
    getWebsiteUrl() {
      let params = {
        nationality_id: this.$route.params.nationality_id || "",
        type: 2
      };
      Api.getWebsiteUrl(params, cookie.get("token"), this.$store.state.language)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.websiteObj = res.data;
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "getWebsiteUrl" + this.$i18n.translate("error info")
          );
        });
    },
    getInstruction() {
      if (this.mail === "") {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      let params = {
        mail: this.mail,
        nationality_id: this.$route.params.nationality_id,
        type: 2
      };
      Api.getInstruction(
        params,
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$vux.toast.text(res.msg);
          } else {
            this.$vux.toast.text(res.msg);
          }
          this.mail = "";
        })
        .catch(e => {
          this.$vux.toast.text(
            "getInstruction" + this.$i18n.translate("error info")
          );
        });
    }
  },
  mounted() {
    this.getWebsiteUrl();
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.result-confirm-content {
  margin-bottom: 15px;
}
.result-confirm-content-item {
  display: inline-block;
  margin: 5px;
}
.result-btn-group {
  position: absolute;
  display: flex;
  left: 0;
  border-top: 1px solid #d5d5d6;
  width: 100%;
  color: #353535;
  transform-origin: 0 0;
  line-height: 48px;
  height: 48px;
  font-size: 18px;
  @media (min-resolution: 2dppx) {
    width: 200%;
    line-height: 96px;
    height: 96px;
    font-size: 36px;
    transform: scale(0.5);
  }
  @media (min-resolution: 3dppx) {
    width: 300%;
    line-height: 144px;
    height: 144px;
    font-size: 54px;
    transform: scale(0.33);
  }
}
.result-concel {
  flex: 1;
}
.result-clip {
  flex: 1;
  border-left: 1px solid #d5d5d6;
  color: #0bb20c;
}
.result-pad {
  height: 48px;
}

.personal-white-wraper {
  padding-bottom: 75px;
}
.personal-wraper {
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
.personal-wraper-inner {
  padding: 15px;
}
.personal-website-info {
  color: #0288d1;
  margin-bottom: 10px;
}
.personal-title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
}
.personal-content {
  margin-bottom: 5px;
}
.personal-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.personal-item {
  display: inline-block;
  padding: 10px 5px;
  margin: 10px 0;
  width: 70px;
  text-align: center;
  color: #673ab7;
  border: 2px solid #673ab7;
}
.personal-btn {
  margin: auto;
  margin-top: 25px;
}
</style>
