<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card m-3">
            <img class="card-img-top" src="https://thiscatdoesnotexist.com" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title">Movie Title</h6>      
            </div>    
          </div>
        </div>
      </div>
    </div>    
</template>

<script>
export default {
  props: {
    group: {type: Object, required: true}
  },
    setup() {
        return {};
    },
};
</script>

<style>
</style>