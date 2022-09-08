<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card m-3">
            <img class="card-img-top" :src="content.imageurl" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title">{{content.title}}</h6>      
            </div>    
          </div>
        </div>
      </div>
    </div>    
</template>

<script>
export default {
  props: {
    content: {type: Object, required: true}
  },
    setup() {
        return {};
    },
};
</script>

<style>
</style>