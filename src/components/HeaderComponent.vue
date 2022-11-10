<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  socialMedia?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}>();
</script>

<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <h3 class="description">{{ description }}</h3>
    <div class="social-media-container">
      <h4 class="social-media-header"
        v-if="socialMedia?.twitter || socialMedia?.github || socialMedia?.linkedin || socialMedia?.email">Feedback on:</h4>
      <div class="social-media" v-if="socialMedia?.twitter">
        <a
          :href="'https://twitter.com/' + socialMedia.twitter"
          target="_blank"
          rel="noopener"
          >Twitter</a
        >
      </div>
      <div class="social-media" v-if="socialMedia?.github">
        <a
          :href="'https://github.com/' + socialMedia.github"
          target="_blank"
          rel="noopener"
          >Github</a
        >
      </div>
      <div class="social-media" v-if="socialMedia?.linkedin">
        <a
          :href="'https://linkedin.com/in/' + socialMedia.linkedin"
          target="_blank"
          rel="noopener"
          >LinkedIn</a
        >
      </div>
      <div class="social-media" v-if="socialMedia?.email">
        <a
          :href="'mailto:' + socialMedia.email"
          target="_blank"
          rel="noopener"
          >{{ socialMedia.email }}</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/base.css";

.social-media-header {
  display: block;
  margin: 0.5rem 0;
  color: var(--hr-accent);
}
.header h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  color: var(--hr-complement);
}

.header h3 {
  font-size: 1.2rem;
}

.header h1,
h3 {
  text-align: center;
}

.description {
  color: var(--hr-primary);
}

@media (min-width: 1024px) {
  .header h1,
  h3 {
    text-align: left;
  }
}

.social-media-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.social-media a {
  color: var(--hr-complement);
  font-weight: 500;
}
</style>
