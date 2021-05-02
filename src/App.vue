<template>
 
  <v-app class="grey lighten-4">
     <outline></outline>
    <v-main class="mx-4 mb-4">
        <router-view></router-view>
    </v-main>
    
  </v-app>
</template>

<script>
import outline from './views/Outline'
export default {
  name: 'App',

  components: {
     outline

  },

  data: () => ({
    //
  }),
};
</script>
