<template>
  <div class="news-wraper">
    <div class="news-wraper-inner">
      <p class="news-title">{{data.title}}</p>
      <p class="news-time">{{time}}</p>
      <div class="news-content" v-html="data.body"></div>
    </div>
  </div>
</template>

<script>
import Api from "@/service/NewsDetail";
import qs from "qs";
import dayjs from "dayjs";

export default {
  components: {},
  data() {
    return { data: { body: "", publish_time: "", title: "" } };
  },
  computed: {
    // 计算属性的 getter
    time: function() {
      // `this` 指向 vm 实例
      return this.data.publish_time === ""
        ? ""
        : dayjs(this.data.publish_time).format("YYYY-MM-DD HH-mm-ss");
    }
  },
  methods: {
    getQuery() {
      try {
        const query = location.href.split("?")[1];
        return qs.parse(query);
      } catch (e) {
        console.log(e);
      }
      return {};
    },
    init() {
      const { news_id, token } = this.getQuery();
      if (news_id) {
        Api.getNewsDetail({ news_id }, token)
          .then(res => {
            if (!res) return;
            if (res.code === 2000) {
              this.data = res.data;
            } else {
              this.$vux.toast.text(res.msg);
            }
          })
          .catch(e => {
            this.$vux.toast.text(
              "getNewsDetail" + this.$i18n.translate("error info")
            );
          });
      } else {
        this.$vux.toast.text("news_id is required");
      }
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style>
.news-wraper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.news-wraper-inner {
  margin: 15px;
}
.news-title {
  font-size: 24px;
  font-weight: 500;
}
.news-time {
  font-size: 16px;
  color: gray;
  margin: 5px 0;
}
.news-content {
  position: relative;
  font-size: 16px;
}
.news-content img {
  width: 100%;
  height: auto;
  margin: 5px 0;
}
.news-content ul,
li {
  padding: 0 !important;
  margin: 0 !important;
  list-style: none !important;
}
</style>
