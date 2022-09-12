<template>
  <section class="container-fluid">
    <nav
      class="
        row
        navbar navbar-expand-lg navbar-dark
        bg-white
        border-bottom
        px-3
      "
    >
      <div class="col-12 d-flex justify-content-between">
        <div>
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
            <div class="d-flex flex-row align-items-center">
              <img
                alt="logo"
                src="../assets/img/bigInstaFlix2.png"
                height="45"
              />
            </div>
          </router-link>
        </div>

        <div
          class="
            col-6 col-md-3
            justify-content-evenly
            d-flex
            align-items-center
          "
        >
          <div>
            <router-link class="mdi mdi-home m-3" :to="{ name: 'Home' }">
              <i
                class=""
                data-bs-toggle="modal"
                data-bs-target="#create-group"
              ></i>
            </router-link>
          </div>
          <div>
            <i
              class="mdi mdi-plus-circle-outline m-3"
              data-bs-toggle="modal"
              data-bs-target="#create-group"
            ></i>
          </div>

          <div>
            <router-link class="mdi mdi-cog m-3" :to="{ name: 'Account' }">
              <i
                class=""
                data-bs-toggle="modal"
                data-bs-target="#create-group"
              ></i>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </section>
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
  color: black;
}
.mdi:hover {
  cursor: pointer;
}
</style>
