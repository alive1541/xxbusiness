<template>
  <div class="sign-wraper">
    <div class="sign-wraper-inner">
      <div class="sign-info">注意：请提交真实的信息，否则将无法注册成功</div>
      <group>
        <selector title="居住地" :options="neighborhood_list" v-model="neighborhood_id"></selector>
        <selector title="国籍" :options="nationality_list" v-model="nationality_id"></selector>
        <x-input title="姓    " v-model="last_name" :show-clear="false"></x-input>
        <x-input title="名    " v-model="first_name" :show-clear="false"></x-input>
        <popup-radio title="性别" :options="genderOptions" v-model="gender"></popup-radio>
        <datetime title="出生日期" min-year="1900" v-model="birthdate" @on-confirm="onDateConfirm"></datetime>
        <x-input title="邮箱   " is-type="email" v-model="mail" :show-clear="false"></x-input>
        <div class="sign-group-wraper">
          <div></div>
          <selector class="sign-prefix" :options="phone_prefix_list" v-model="phone_prefix"></selector>
          <x-input class="sign-phone" v-model="phone" :show-clear="false"></x-input>
        </div>
      </group>
      <div class="sign-agreement">
        <div class="sign-agreement-inner">点击代表您同意《注册协议》</div>
      </div>
      <xButton type="primary" @click.native="submit">点击提交</xButton>
    </div>
  </div>
</template>

<script>
import {
  Selector,
  Group,
  XButton,
  XInput,
  PopupRadio,
  Datetime,
  cookie
} from "vux";
import Api from "../../service/AutoSign";

export default {
  components: { Group, Selector, XButton, XInput, PopupRadio, Datetime },
  data() {
    return {
      neighborhood_id: "",
      nationality_id: "",
      last_name: "",
      first_name: "",
      nationality_list: [],
      neighborhood_list: [],
      phone_prefix_list: [],
      gender: "1",
      genderOptions: [{ key: "1", value: "男" }, { key: "2", value: "女" }],
      birthdate: "",
      mail: "",
      phone_prefix: "",
      phone: ""
    };
  },
  methods: {
    // dateChange() {},
    submit() {
      const {
        neighborhood_id,
        nationality_id,
        last_name,
        first_name,
        gender,
        birthdate,
        mail,
        phone_prefix,
        phone
      } = this;
      const ifHasEmpty = this.nonEmptyCheck(
        neighborhood_id,
        nationality_id,
        last_name,
        first_name,
        gender,
        birthdate,
        mail,
        phone_prefix,
        phone
      );
      if (ifHasEmpty) {
        return this.$vux.toast.text("请将信息填写完整");
      }
      const owner_id = window.localStorage.getItem("owner_id");
      Api.registerWebsites(
        {
          owner_id,
          neighborhood_id,
          nationality_id,
          last_name,
          first_name,
          gender,
          birthdate,
          mail,
          phone_prefix,
          phone
        },
        cookie.get("token")
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$router.push({ name: "AutoSignResult" });
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          console.log(2);
          this.$vux.toast.text(e);
        });
    },
    nonEmptyCheck(...args) {
      let result = false;
      args.forEach(item => {
        if (item === "") {
          result = true;
        }
      });
      return result;
    },
    onDateConfirm(value) {
      this.birthdate = value;
    },
    init() {
      Api.registerFilledInfoRange(
        {
          owner_id: window.localStorage.getItem("owner_id")
        },
        cookie.get("token")
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const {
              nationality_list,
              neighborhood_list,
              phone_prefix_list
            } = res.data;
            this.nationality_list = nationality_list.map(v => {
              v.key = v.id;
              return v;
            });
            this.nationality_id = this.nationality_list[0].id;

            this.neighborhood_list = neighborhood_list.map(v => {
              v.key = v.id;
              return v;
            });
            this.neighborhood_id = this.neighborhood_list[0].id;

            this.phone_prefix_list = phone_prefix_list.map(v => {
              v.key = v.id;
              return v;
            });
            this.phone_prefix = this.phone_prefix_list[0].id;
          } else {
            this.$vux.toast.text(res.msg);
          }
          this.mail = "";
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.sign-wraper {
  font-size: 14px;
  padding: 10px 0;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e0e0e0;
  padding: 5px;
  padding-bottom: 80px;
}
.sign-wraper-inner {
  padding: 15px;
}
.sign-info {
  color: #c62828;
}
.sign-group-wraper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.sign-prefix {
  width: 100px;
  margin-right: 15px;
}
.sign-phone {
  flex: 1;
  padding: 10px 0;
  &:before {
    width: 100%;
    left: 0;
  }
}
.sign-agreement {
  height: 50px;
  color: #424242;
  margin-bottom: 30px;
}
.sign-agreement-inner {
  float: right;
  height: 50px;
  line-height: 50px;
}
</style>
