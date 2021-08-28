<template>
  <div id="app">
    <menu-bar @show-login="accountForm()" @show-signup="accountForm()"/>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue'
import Footer from '@/components/Footer.vue'
export default {
    name: "App",
    components: { MenuBar, Footer },
    provide(){
        return{
            categoryUrl: `${this.dbUrl}/category`,
            userUrl: `${this.dbUrl}/user`,
            userDetailUrl: `${this.dbUrl}/userdetail`
        }
    },
    data() {
        return {
            dbUrl: "https://kaofood-spring.azurewebsites.net",
            showAccountForm: false,
            signupAccountForm: null,
        };
    },
    methods: {
        accountForm(i){
            console.log(i);
            this.showAccountForm = true
            this.signupAccountForm = i
        }
    },
}
</script>