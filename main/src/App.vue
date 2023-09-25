<template>
  <div id="app">
    <header>
      <router-link to="/app-vue-hash/">app-vue-hash</router-link>
      <!-- <router-link to="/app-vue-history/">app-vue-history</router-link> -->
      <router-link to="/about">about</router-link>
      <h3 @click="change">主项目用户：{{ loading ? 'loading...' : user.name }}【点击切换账号】</h3>
      <span class="block" @click="changeParentState">主项目的数据：{{ commonData.parent }}，点击变回1</span>
    </header>
    <div id="appContainer"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserData } from './mock/user';
import { storeUser } from 'common/observables/user';
import { subscribeUser } from 'common/observables/user/channel';

let unsubscribe = null;

export default {
  computed: {
    commonData(){
      return this.$store.state.commonData;
    }
  },
  methods: {
    changeParentState(){
      this.$store.commit('setCommonData',{ parent: 1 });
    },
    change(){
      this.loading = true;
      setTimeout(() => {
        storeUser(getUserData());
        this.loading = false;
      }, 1000);
    }
  },
  data: function() {
    return {
      user: {
        name: "default-value",
        email: "default-value"
      },
      loading: false,
    }
  },
  created: function () {
    unsubscribe = subscribeUser((userData) => {
      this.user = userData;
    });

    this.change();
  },
  destroyed: function() {
    unsubscribe && unsubscribe();
  }
}
</script>

<style scoped>
#app{
  height: 100vh;
  text-align: center;
  position: relative;
}
header>a{
  margin: 0 20px;
}
.appContainer{
  background: #ccc;
  padding: 20px;
}
.underline{
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}
.block {
  display: block;
  padding: 10px 0;
}
h3 {
  cursor: pointer;
}
</style>
