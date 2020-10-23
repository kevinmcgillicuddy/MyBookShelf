
<template>
  <v-app class="grey lighten-4">
    <v-main class="mx-4 mb-4">
      <Navbar></Navbar>
      <router-view></router-view>
    </v-main>
    
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar
    
  },

  data: () => ({
    //
  }),
};
</script>
