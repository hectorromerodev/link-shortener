<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useClipboard } from "@vueuse/core";

const toast = useToast();
const { copy } = useClipboard();

const longUrl = ref("");
const shortUrl = ref("");
const isCopied = ref(false);
const isLoading = ref(false);

const createShortUrl = async () => {
  if (!isValidUrl.value) {
    toast.warning("Please enter a valid URL");
    toast.info("Click Here See an Example", {
      timeout: 10000,
      hideProgressBar: true,
      onClick(closeToast) {
        longUrl.value = "https://www.hr-webdev.com";
        closeToast();
      },
      showCloseButtonOnHover: true,
    });
    return;
  }
  isLoading.value = true;
  try {
    shortUrl.value = await shortener(longUrl.value);
  } catch (e) {
    toast.error("Something went wrong, please try again later");
  } finally {
    isLoading.value = false;
  }
};

const copyShortUrl = async () => {
  try {
    await copy(shortUrl.value);
    isCopied.value = true;
    toast.info("Copied to clipboard");
  } catch (e) {
    toast.error("We could not copy to clipboard, please try again later");
  }
};

const shortener = async (url: string) => {
  const API_KEY = import.meta.env.VITE_X_RAPID_API_KEY;
  const encodedParams = new URLSearchParams();
  encodedParams.append("url", url);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
    },
    body: encodedParams,
  };

  return await fetch(
    "https://url-shortener-service.p.rapidapi.com/shorten",
    options
  )
    .then((response) => {
      if (response.ok) {
        toast.success("Url shortened successfully");
        clear();
        return response.json();
      } else {
        throw new Error("Something went wrong, please try again later");
      }
    })
    .then((result) => {
      const { result_url } = result;
      return result_url.toString();
    });
};

const isValidUrl = computed(() => {
  const validUrl: RegExp = /^(https):\/\/[^ "]+$/;
  return longUrl.value && validUrl.test(longUrl.value);
});

const clear = () => {
  longUrl.value = "";
  shortUrl.value = "";
  isCopied.value = false;
  isLoading.value = false;
};
</script>

<template>
  <div class="container">
    <div class="form">
      <input type="text" placeholder="https://" v-model="longUrl" />
      <button class="short-btn" type="button" @click="createShortUrl()">
        <span v-if="isLoading">LOADING...</span>
        <span v-else>SHORT</span>
      </button>
    </div>
    <div class="result">
      <span v-if="shortUrl" class="url">{{ shortUrl }}</span>
      <button
        class="copy-btn"
        v-if="shortUrl"
        type="button"
        @click="copyShortUrl"
      >
        <span v-if="isCopied">COPIED</span>
        <span v-else>COPY</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/base.css";

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
  flex-wrap: wrap;
}

.form input {
  width: 20rem;
  height: 3rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 0 1rem;
  background: var(--color-background-soft);
  box-shadow: 15px 15px 30px var(--color-background-mute),
    -15px -15px 30px var(--color-background);
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

button.short-btn {
  text-decoration: none;
  border: none;
  font-size: 14px;
  font-family: inherit;
  color: #fff;
  width: 9em;
  height: 3em;
  line-height: 2em;
  text-align: center;
  background: linear-gradient(
    90deg,
    var(--hr-accent),
    var(--hr-primary),
    var(--hr-complement),
    var(--hr-secondary)
  );
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
}

button.short-btn:hover {
  animation: ani 8s linear infinite;
  border: none;
}

@keyframes ani {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 200%;
  }
}

button.short-btn:before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(
    90deg,
    var(--hr-accent),
    var(--hr-primary),
    var(--hr-complement),
    var(--hr-secondary)
  );
  background-size: 200%;
  border-radius: 35px;
  transition: 1s;
}

button.short-btn:hover::before {
  filter: blur(20px);
}

button.short-btn:active {
  background: linear-gradient(
    32deg,
    var(--hr-accent),
    var(--hr-primary),
    var(--hr-complement),
    var(--hr-secondary)
  );
}

button.copy-btn {
  text-decoration: none;
  border: none;
  font-size: 14px;
  font-family: inherit;
  color: #fff;
  width: 9em;
  height: 3em;
  line-height: 2em;
  text-align: center;
  background: var(--hr-complement);
  border-radius: 0.5rem;
}
</style>
