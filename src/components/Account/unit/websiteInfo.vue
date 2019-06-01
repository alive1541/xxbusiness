<template>
  <div class="website-wraper">
    <flexbox class="website-header">
      <flexbox-item>
        <div class="flex-demo">网站</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">账户名</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">余额昨日收益</div>
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
          <div v-if="!isNagtiveNum(item.profit)" class="flex-demo red">{{item.profit}}</div>
          <div v-if="isNagtiveNum(item.profit)" class="flex-demo green">{{item.profit}}</div>
        </flexbox-item>
      </flexbox>
      <divider v-if="websiteData.length === 0">暂无数据</divider>
    </div>
  </div>
</template>

<script>
import Api from "@/service/Account";
import { cookie, Divider } from "vux";

export default {
  components: {
    Divider
  },
  data() {
    return {
      websiteData: []
    };
  },
  methods: {
    getWebsiteBalance() {
      Api.websiteBalance({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token")
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
.website-wraper {
  font-size: 14px;
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
