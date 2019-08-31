<template>
  <div>
    <div class="msg" v-if="noAuthority">
      <divider>{{$i18n.translate("We are not open yet")}}</divider>
    </div>
    <div v-if="!ifRenderScrollCom">
      <h-table :list="list"></h-table>
      <divider>{{$i18n.translate("All data loaded")}}</divider>
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
      <load-more v-if="list.length>0" class="load-more" tip="loading"></load-more>
      <divider v-if="ifNoData">{{$i18n.translate("All data loaded")}}</divider>
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
      selectTeamBook: {
        left: this.$i18n.translate("Host"),
        right: this.$i18n.translate("Guest")
      },
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
          order_id: this.orderId
        },
        cookie.get("token"),
        this.$store.state.language
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
          } else if (res.errorCode === 3) {
            //权限不足不作处理
          } else {
            this.errorHandler(res.msg, this.getHistory);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "getHistory" + this.$i18n.translate("error info")
          );
        });
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
