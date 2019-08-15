<template>
  <div>
    <div class="msg" v-if="noAuthority">
      <divider>暂未开放，敬请期待</divider>
    </div>
    <div v-if="!ifRenderScrollCom">
      <h-table :list="list"></h-table>
      <divider>已经加载全部数据</divider>
    </div>

    <scroller
      v-show="!noAuthority && ifRenderScrollCom"
      lock-x
      scrollbarY
      :height="getScrollHeight()"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <h-table :list="list"></h-table>
      <load-more class="load-more" tip="loading"></load-more>
      <divider v-if="ifNoData">已经加载全部数据</divider>
    </scroller>
  </div>
</template>

<script>
import Api from "@/service/Order";
import HTable from "./hTable";
import { XTable, cookie, Scroller, LoadMore, Divider } from "vux";

export default {
  components: { XTable, Scroller, LoadMore, Divider, HTable },
  data() {
    return {
      orderNumMark: 5,
      ifRenderScrollCom: true,
      orderId: -1,
      noAuthority: false,
      list: [],
      selectTeamBook: { left: "主", right: "客" },
      onFetching: false,
      ifNoData: false
    };
  },
  methods: {
    onScrollBottom() {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true;
        this.getHistory();
      }
    },
    getHistory() {
      Api.getHistory(
        {
          owner_id: window.localStorage.getItem("owner_id"),
          order_id: this.orderId
        },
        cookie.get("token")
      )
        .then(res => {
          if (!res) return;
          this.noAuthority = false;
          this.ifNoData = false;
          if (res.errorCode === 0) {
            // const result = this.addStyleTypeToList(res.data);
            const result = res.data;
            if (result.length > 0) {
              this.list = this.list.concat(result);
              this.orderId = this.list[this.list.length - 1].order_id;
              if (this.list.length >= this.orderNumMark) {
                this.ifRenderScrollCom = true;
                this.onFetching = false;
                this.$refs.scrollerBottom.reset();
              } else {
                this.ifRenderScrollCom = false;
              }
            } else {
              this.ifNoData = true;
              this.ifRenderScrollCom = false;
            }
          } else if (res.errorCode === 4) {
            this.noAuthority = true;
          } else {
            this.errorHandler(res.msg, this.getList);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    getScrollHeight() {
      const c_height = document.documentElement.clientHeight;
      const h = `${c_height - 46 - 15 - 30 - 20 - 53}px`;
      return h;
    }
  },
  mounted: function() {
    this.getHistory();
  }
};
</script>

<style>
.load-more {
  color: black;
}
.msg {
  margin-top: 20px;
  font-size: 16px;
}
.order-table-title {
  font-weight: 500;
  background-color: #f7f7f7;
  color: black;
}

.order-table {
  color: black;
  background-color: #fff;
}
.order-table th,
.order-table td {
  line-height: 20px;
}
</style>
