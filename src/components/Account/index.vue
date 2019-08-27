<template>
  <div>
    <userInfo />
    <websiteInfo />
  </div>
</template>

<script>
import UserInfo from "./unit/userInfo";
import WebsiteInfo from "./unit/websiteInfo";
import { initFromOfficialWebsite } from "../../assets/util/index";

export default {
  components: {
    UserInfo,
    WebsiteInfo
  },
  data() {
    return {
      showDialog: true
    };
  },
  methods: {},
  beforeMount: function() {
    initFromOfficialWebsite(this);
  },
  mounted: function() {}
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";

.vux-demo {
  text-align: center;
}
</style>
