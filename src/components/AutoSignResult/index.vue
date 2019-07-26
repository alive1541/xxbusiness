<template>
  <div class="result-wraper">
    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
      <thead>
        <tr style="background-color: #F7F7F7">
          <th>网站</th>
          <th>手机尾号</th>
          <th>提交时间</th>
          <th>注册状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in list">
          <td>{{item.website_name}}</td>
          <td>{{item.phone_last_four}}</td>
          <td>{{item.submit_time}}</td>
          <td>{{statusBook[item.status]}}</td>
          <td>
            <x-button
              v-if="item.extra_info!==null"
              mini
              type="primary"
              @click.native="extraMsg(item)"
            >查看</x-button>
          </td>
        </tr>
      </tbody>
    </x-table>
    <div class="result-btn">
      <x-button type="primary" @click.native="signNewUser">注册新的用户</x-button>
    </div>
    <confirm
      ref="confirm"
      v-model="show"
      :title="extraTitle"
      :show-cancel-button="false"
      :show-confirm-button="false"
    >
      <div class="result-confirm-content">
        <div :key="i + 'key'" v-for="(item,i) in extraData">
          <span class="result-confirm-content-item">{{item.keyName}}</span>:
          <span class="result-confirm-content-item">{{item.value}}</span>
        </div>
      </div>
      <div class="result-btn-group">
        <div class="result-concel" @click="concel()">取消</div>
        <div
          class="result-clip"
          v-clipboard:copy="copyExt()"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</div>
      </div>
      <div class="result-pad"></div>
    </confirm>
  </div>
</template>

<script>
import { XButton, XTable, cookie, Confirm } from "vux";
import Api from "../../service/AutoSignResult";

export default {
  components: { XButton, XTable, Confirm },
  data() {
    return {
      statusBook: { 1: "注册中", 2: "注册成功", 3: "注册失败" },
      list: [],
      extraData: [],
      extraTitle: "",
      show: false
    };
  },
  methods: {
    onError(e) {
      this.$vux.toast.text(`复制出错:${e}`);
    },
    onCopy(e) {
      this.$vux.toast.text(`复制成功`);
      this.concel();
    },
    copyExt() {
      let data = this.extraData;
      let str = "";
      for (let i = 0; i < data.length; i++) {
        str += `${data[i].keyName}: ${data[i].value};
        `;
      }
      return str;
    },
    concel() {
      this.$refs.confirm._onCancel();
    },
    onConfirm() {
      this.$refs.confirm._onCancel();
    },
    init() {
      const h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const wraper = document.getElementsByClassName("result-wraper")[0];
      // 99 = header + tabbar; 15 = margin; 150 = padding;
      wraper.style.minHeight = h - 99 - 15 - 150 + "px";
    },
    signNewUser() {
      this.$router.push({ name: "AutoSign" });
    },
    registerInfoList() {
      Api.registerInfoList({
        a: 2,
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token")
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.list = res.data;
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    extraMsg(item) {
      let extData;
      try {
        extData = JSON.parse(item.extra_info);
      } catch (e) {
        console.log(e);
      }
      const title = item.website_name;
      this.extraTitle = title;
      this.extraData = extData;
      this.show = true;
    }
  },
  mounted: function() {
    this.init();
    this.registerInfoList();
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.result-wraper {
  position: relative;
  margin-top: 15px;
  padding-bottom: 150px;
}
.result-btn {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translate(-50%);
  width: 90%;
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
.result-pad {
  height: 48px;
}
.result-clip {
  flex: 1;
  border-left: 1px solid #d5d5d6;
  color: #0bb20c;
}
.result-concel {
  flex: 1;
}
.result-confirm-content {
  margin-bottom: 15px;
}
.result-confirm-content-item {
  display: inline-block;
  margin: 5px;
}
</style>
<style lang="less">
.weui-dialog__bd {
  padding-bottom: 0 !important;
}
</style>

