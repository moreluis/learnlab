<template>
    <div class="p-2">
        <p> {{ message }} </p>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
const config = useRuntimeConfig();

let message: globalThis.Ref<string> = ref<string>(' ');

onMounted(async () => {
  try {
    const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

    const response = await axios.post(`${url}/inviteWave`, {
      session_id: getSessionCookie()
    });

    message.value = response.data.message;

    // console.log('Response:', response.data);

    await sleepFiveSeconds();
    navigateTo("/app")
  } catch (error: any) {
    message.value = error.response.data.message;

    console.error('Error:', error.message);
  }
});

async function sleepFiveSeconds() {
  return new Promise<void>(resolve => {
      setTimeout(() => {
          resolve();
      }, 5000);
  });
}
</script>