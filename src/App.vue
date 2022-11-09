<script setup lang="ts">
import UrlShortener from './components/UrlShortener.vue';
import HeaderComponent from './components/HeaderComponent.vue';

</script>
 
<template>
  <header>
    <img alt="HR logo" class="logo" src="./assets/logo.svg" width="175" />

    <div class="wrapper">
      <HeaderComponent 
        title="Simple Link Shortener" 
        description="A simple to use app to short your long url to be nice and share a short one. 🎉"
        :socialMedia="{ 
          twitter: 'hectorromerodev',
          github: 'hectorromerodev',
          linkedin: 'hectorromerodev',
          email: 'hectorromerodev@gmail.com'
        }"
        />
    </div>
  </header>

  <main>
    <UrlShortener />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
