<template>
  <div id="app">
    <menu-bar
      @show-login="accountForm()"
      @show-signup="accountForm()"
      @logout-account="updateAccount()"
      :key="reloadMenu"
    />
    <router-view @reload-menu="updateAccount()" />
    <Footer />
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: { MenuBar, Footer },
  provide() {
    return {
      categoryUrl: `${this.backendUrl}/category`,
      menuUrl: `${this.backendUrl}/menu`,
      userUrl: `${this.backendUrl}/user`,
      account: null,
    };
  },
  data() {
    return {
      backendUrl: "https://kaofood.ddns.net/api",
      // backendUrl: "http://localhost:8080",
      showAccountForm: false,
      signupAccountForm: null,
      reloadMenu: 0,
    };
  },
  methods: {
    accountForm(i) {
      console.log(i);
      this.showAccountForm = true;
      this.signupAccountForm = i;
    },
    updateAccount() {
    if (localStorage.getItem("account")) {
      this.account = JSON.parse(localStorage.getItem("account"));
    } else {
      this.account = null;
    }
    this.account
    this.reloadMenu += 1;
  },
  },
  
  mounted() {
    if (localStorage.getItem("account")) {
      try {
        this.account = JSON.parse(localStorage.getItem("account"));
      } catch (e) {
        localStorage.removeItem("account");
      }
    }
  },
  created() {
    if (localStorage.getItem("account")) {
      try {
        this.account = JSON.parse(localStorage.getItem("account"));
      } catch (e) {
        localStorage.removeItem("account");
      }
    }
  },
};
</script>