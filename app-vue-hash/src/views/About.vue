<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>订阅通道不配置 { relay: 1 }</p>
    <p>可以通过点主项目的切换账号来获取下次的值</p>
    <span class="block underline">{{showName}}</span>
  </div>
</template>

<script>
import { subscribeUser } from 'common/observables/user/channel-norelay';

let unsubscribe = null;

export default {
  computed: {
    showName(){
      return `您的账号是：${this.user.name}`;
    },
  },
  data() {
    return {
      user: {
        name: "subapp-value",
        email: "subapp-value"
      },
    }
  },
  created: function () {
    unsubscribe = subscribeUser((userData) => {
      this.user = userData;
    });
  },
  destroyed: function() {
    unsubscribe && unsubscribe();
  }
}
</script>