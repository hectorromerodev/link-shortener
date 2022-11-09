<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification';
import { useClipboard } from '@vueuse/core';

const toast = useToast();
const { copy } = useClipboard();

const longUrl = ref('')
const shortUrl = ref('')
const isCopied = ref(false)
const isLoading = ref(false)

const createShortUrl = async () => {
  isLoading.value = true
  try {
    shortUrl.value = await shortener(longUrl.value);
  } catch (e) {
    toast.error('Something went wrong, please try again later');
  } finally {
    isLoading.value = false
  }
}

const copyShortUrl = async () => {
  try {
    await copy(shortUrl.value)
    isCopied.value = true
    toast.info('Copied to clipboard');
  } catch (e) {
    toast.error('We could not copy to clipboard, please try again later');
  }
}

const shortener = async (url: string) => {
  const API_KEY = import.meta.env.VITE_X_RAPID_API_KEY;
  const encodedParams = new URLSearchParams();
  encodedParams.append("url", url);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
    },
    body: encodedParams
  };

  return await fetch('https://url-shortener-service.p.rapidapi.com/shorten', options)
    .then(response => {
      if (response.ok) {
        toast.success('Url shortened successfully');
        return response.json()
      } else {
        throw new Error('Something went wrong, please try again later');
      }
    })
    .then(result => <string>result.result_url);
}

</script>

<template>
  <div class="container">
    <div class="form">
      <input type="text" placeholder="https://" v-model="longUrl"/>
      <button type="button" @click="createShortUrl()">
        <template v-if="isLoading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="visually-hidden">Loading...</span>
        </template>
        <template v-else>
          Shorten
        </template>
      </button>
    </div>
    <div class="result">
      <span v-if="shortUrl" class="url">{{ shortUrl }}</span>
      <button v-if="shortUrl" type="button" @click="copyShortUrl"> {{ isCopied ? 'copied' : 'copy'}}  </button>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 4rem 0;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.form input {
  width: 30rem;
  height: 3rem;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  padding: 0 1rem;
}

.form button {
  width: 10rem;
  height: 3rem;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 500;
}

.result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.result .url {
  color: var(--color-primary);
  font-weight: 500;
}

.result button {
  width: 10rem;
  height: 3rem;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 500;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}

</style>