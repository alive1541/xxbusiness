<template>
  <div class="website-wraper">
    <div class="titleBar">
      <button-tab>
        <button-tab-item :selected="selectedIndex === 0" @on-item-click="tabChange">按网站排序</button-tab-item>
        <button-tab-item :selected="selectedIndex === 1" @on-item-click="tabChange">按余额从小到大</button-tab-item>
      </button-tab>
    </div>
    <flexbox class="website-header">
      <flexbox-item>
        <div class="flex-demo">网站</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">账户名</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="demo-title-p">余额</div>
          <div class="demo-title-p">昨日收益</div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">状态操作</div>
      </flexbox-item>
    </flexbox>
    <div>
      <flexbox :key="i + 'key'" v-for="(item,i) in websiteData" class="website-content">
        <flexbox-item>
          <div class="flex-demo">{{item.website}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">{{item.account}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">{{item.balance}}</div>
          <div v-if="!isNagtiveNum(item.yes_profit)" class="flex-demo red">+{{item.yes_profit}}</div>
          <div v-if="isNagtiveNum(item.yes_profit)" class="flex-demo green">{{item.yes_profit}}</div>
        </flexbox-item>
        <flexbox-item>
          <div v-if="isOnline(item.is_online)" class="flex-demo">系统在线</div>
          <div class="website-mini-btn-wrap" v-if="isOnline(item.is_online)">
            <x-button
              class="website-mini-btn"
              mini
              type="warn"
              @click.native="onOffLine(item.website, -1, item.account)"
            >下线</x-button>
          </div>
          <div v-if="isOffline(item.is_online)" class="flex-demo">系统下线</div>
          <div v-if="isDisable(item.is_online)" class="flex-demo">禁用</div>
          <div
            class="website-mini-btn-wrap"
            v-if="isOffline(item.is_online) || isDisable(item.is_online)"
          >
            <x-button
              class="website-mini-btn"
              mini
              type="primary"
              @click.native="onOffLine(item.website, 2,item.account)"
            >上线</x-button>
          </div>
        </flexbox-item>
      </flexbox>
      <divider v-if="websiteData.length === 0">暂无数据</divider>
    </div>
    <confirm v-model="show" title="系统下线操作" @on-confirm="onConfirm">
      <p
        style="text-align:center;"
      >确定让系统{{websiteStatusBook[toWebsiteStatus]}}{{website}}／{{balance}}的账号吗?</p>
    </confirm>
  </div>
</template>

<script>
import Api from "@/service/Account";
import {
  ButtonTab,
  ButtonTabItem,
  cookie,
  Divider,
  XButton,
  Confirm
} from "vux";
const orderNameBook = ["Website_code", "balance"];

export default {
  components: {
    Confirm,
    ButtonTab,
    ButtonTabItem,
    Divider,
    XButton
  },
  data() {
    return {
      show: false,
      website: "",
      balance: "",
      toWebsiteStatus: "",
      websiteStatusBook: {
        "-1": "下线",
        "2": "上线"
      },
      selectedIndex: 0,
      websiteData: []
    };
  },
  methods: {
    isOnline(status) {
      return status !== -1 && status !== -2;
    },
    isOffline(status) {
      return status === -1;
    },
    isDisable(status) {
      return status === -2;
    },
    onConfirm() {
      Api.turnWebsiteStatus({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token"),
        website: this.website,
        to_website_status: this.toWebsiteStatus
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.show = false;
            this.getWebsiteBalance(orderNameBook[this.selectedIndex]);
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    onOffLine(website, to_website_status, balance) {
      this.show = true;
      this.website = website;
      this.balance = balance;
      this.toWebsiteStatus = to_website_status;
    },
    tabChange(index) {
      this.selectedIndex = index;
      this.getWebsiteBalance(orderNameBook[this.selectedIndex]);
    },
    getWebsiteBalance(order_name = "Website_code") {
      Api.websiteBalance({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token"),
        order_name
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const data = res.data;
            this.websiteData = data;
          } else {
            this.errorHandler(res.msg, this.getWebsiteBalance);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    errorHandler(msg, cb) {
      // 显示
      this.$vux.confirm.show({
        title: msg,
        content: "点击确定可以重新获取内容",
        onConfirm() {
          cb();
        },
        onCancel() {
          // console.log("Plugin: I'm hiding");
        }
      });
    },
    // - : true
    isNagtiveNum(value) {
      if (!value) return false;
      value = value.toString();
      return value.slice(0, 1) === "-";
    }
  },
  mounted: function() {
    this.getWebsiteBalance();
  }
};
</script>

<style>
.titleBar {
  margin: 20px auto 0px auto;
  width: 90%;
}
.demo-title-p {
  line-height: 16px;
}
.website-mini-btn-wrap {
  text-align: center;
}
.website-mini-btn {
  font-size: 10px;
  height: 30px;
}
.website-wraper {
  font-size: 14px;
  padding-bottom: 53px;
}
.website-header {
  line-height: 60px;
}
.flex-demo {
  text-align: center;
}
.red {
  color: #f74c31;
}
.green {
  color: #04be02;
}
.website-content {
  background-color: #ffffff;
  height: 60px;
  margin-bottom: 2px;
  box-shadow: 0 1px 1px #e0e0e0;
}
</style>
