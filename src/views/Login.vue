<template>
<el-container class="container">
    <el-container >
        <el-main height="">
            <el-button class="login-btn" type="info" size="default" @click="handleLogin">透過 Github 登入</el-button>
        </el-main>
    </el-container>
</el-container>

</template>

<script lang="ts">
import Vue from "vue";
import { githubOAuthUrl } from '../config/config'
import { getUser } from '../apis/user'
import router from '@/router';


export default Vue.extend({
    methods:{
        handleLogin: (e:any) => {
            window.location.assign(githubOAuthUrl)
            router.currentRoute.query
        }
    }
});
</script>

<style lang="scss">
.container{
    background-color: rgb(92, 92, 92);
    height: 100vh;
}
.login-btn{
    background-color: rgb(46, 46, 46);
}
</style>