<template>
  <el-button class="login-btn" type="info" size="default" @click="handleLogin">透過 Github 登入</el-button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    methods:{
        handleLogin: () => {
            console.log("click")
        }
    }
});
</script>

<style lang="scss">
.login-btn{
    background-color: rgb(46, 46, 46);
}
</style>