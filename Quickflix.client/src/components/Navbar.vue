<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-white border-bottom px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-row align-items-center">
        <img alt="logo" src="../assets/img/bigInstaFlix2.png" height="45" />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <div>
      <i
        class="mdi mdi-plus-circle-outline m-3"
        data-bs-toggle="modal"
        data-bs-target="#create-group"
      ></i>
    </div>
    <div class="show">
      <i class="mdi mdi-cog"></i>
      <a
        class="dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-bs-toggle="dropdown"
      ></a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <router-link :to="{ name: 'Account' }">
          <span class="dropdown-item">My Account</span>
        </router-link>
        <a class="dropdown-item">Something Else</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.mdi {
  font-size: 25px;
}
</style>
