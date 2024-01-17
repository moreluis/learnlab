<template>
    <div class="p-2">
        <form>
          <input class="border" type="username" id="username" v-model="username" placeholder="Username ..." required>
          <button class="border" @click.prevent="submitForm">
              Give Invite
          </button>
        </form>
        <p> {{ message }} </p>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import getSessionCookie from '~/utils/getSessionCookie';
const config = useRuntimeConfig();

let message: globalThis.Ref<string> = ref<string>(' ');
let username: string;

async function submitForm() {
  try {

    const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

    const response = await axios.post(`${url}/giveInvite`, {
      withCredentials: true,
      username: username,
    });

    message.value = response.data.message;

    // console.log('Response:', response.data);
  } catch (error: any) {
    message.value = error.response.data.message;

    console.error('Error:', error.message);
  }
};
</script>