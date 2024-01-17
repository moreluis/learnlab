<template>
  <div>
    <div class="w-full">
      <p class="text-center text-xl sm:text-2xl uppercase mono font-light tracking-[-0.075em] mt-32">LearnLab</p>
      <h1 class="text-center text-3xl sm:text-5xl font-black tracking-tighter">Your AI tool to <span class="emoji-span">🧠</span> memorise</h1>
      <p class="w-96 ml-auto mr-auto mt-2 text-center mono opacity-75">LearnLab is the superior flashcard app that lets you create flashcards with ease.</p>
    </div>
    <div class="flex justify-center mt-5">
      <NuxtLink to="/login" class="px-2 flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
          <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        <p class="underline">Login</p>
      </NuxtLink>
      <NuxtLink to="/register" class="px-2 flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1 bi bi-person-plus" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
        <p class="underline">Register</p>
      </NuxtLink>
    </div>
    <!-- Alternative Background for Grid: bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 -->
    <div class="mt-10 w-11/12 md:w-[700px] mx-auto">
      <div class="rounded-lg p-1 bg-gradient-to-br from-primaryaccent via-secondaryaccent to-bgaccent sm:grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-1">
        <div class="rounded-t-md sm:rounded-md bg-white flex flex-col justify-center align-center p-2 col-span-2">
          <h3 class="text-lg sm:text-xl font-bold">AI-driven</h3>
          <p class="mono opacity-75 tracking-tighter">Make use of our AI generator: just enter a website adress and <span class="underline">let us do the rest</span>.</p>
        </div>
        <div class="sm:rounded-md bg-white flex flex-col justify-center align-center p-2">
          <h3 class="text-lg sm:text-xl font-bold">Open-source</h3>
          <p class="mono opacity-75 tracking-tighter">LearnLab relies on open-source and its source code is available on GitHub.</p>
        </div>
        <div class="sm:rounded-md bg-white flex flex-col justify-center align-center p-2">
          <h3 class="text-lg sm:text-xl font-bold">Private & free</h3>
          <p class="mono opacity-75 tracking-tighter">LearnLab is currently <span class="underline">invite-only</span>, but free. </p>
        </div>
        <div class="rounded-b-md sm:rounded-md bg-white flex flex-col justify-center align-center p-2 col-span-2">
          <h3 class="text-lg sm:text-xl font-bold">Research</h3>
          <p class="mono opacity-75 tracking-tighter">This is a <span class="underline">research project</span> to investigate the impact of artificial intelligence on the learning processes of students.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/fonts.css';

</script>