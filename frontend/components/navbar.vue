<template>
    <div>
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-2 sm:px-4 divide-y divide-gray-200 px-8">
                <div class="relative h-14 pt-2 flex justify-between">
                    <div class="relative z-10 px-2 flex lg:px-0">
                        <div class="flex-shrink-0 flex items-center mono">
                            <NuxtLink to="app">LearnLab</NuxtLink>
                        </div>
                    </div>
                    <!--<div class="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                        <div class="w-full sm:max-w-xs">
                            <label for="search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </div>
                                <input id="search" name="search" class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-zinc-500 sm:text-sm transition-colors duration-300 delay-300" placeholder="Search" type="search">
                            </div>
                        </div>
                    </div>-->
                    <div class="relative z-10 px-2 flex lg:px-0">
                        <div class="flex-shrink-0 flex items-center">
                            <NuxtLink to="/profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-gray-400 hover:opacity-75 transition-opacity duration-300 bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <nav class="py-2 flex space-x-2" aria-label="Global">
                    <NuxtLink :to="'http://' + useRequestURL().hostname + ':' + useRequestURL().port + '/app'" class="bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium" aria-current="page"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-gray-500 bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                        </svg>
                    </NuxtLink>

                    <div v-for="(slug, index) in $route.params.slug" :key="index" class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-gray-500 mx-2 my-auto bi bi-chevron-right" viewBox="0 0 16 16">
                            <path stroke="currentColor" stroke-width="0.5" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <NuxtLink
                            :to="buildUrl(index, $route.params.slug)"
                            class="text-gray-900 hover:text-gray-900 rounded-md inline-flex items-center text-sm font-medium"
                            >
                            {{ $route.params.slug[index] }}
                        </NuxtLink>
                    </div>
                </nav>
                <div v-if="divide"></div>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        divide: {
            type: Boolean,
            required: false,
        },
    });

    const buildUrl = (index: number, path: string | string[]) => {
        let url = 'http://' + useRequestURL().hostname + ':' + useRequestURL().port;

        if (typeof path === 'string') return url + '/' + path;

        for (let i = 0; i < index + 1; i++) url = url + '/' + path[i];

        return url;
    };
</script>