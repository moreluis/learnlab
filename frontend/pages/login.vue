<template>
    <div>
        <div class="flex items-center justify-center h-screen">
            <div class="mx-auto w-9/10 lg:w-1/3 px-10 py-20 mb-20">
                <h1 class="font-bold text-2xl text-center pb-2"> Login </h1>
                <form>
                    <div class="flex flex-col mb-2.5">
                        <label for="name" class="font-sm text-gray-700"> Username </label>
                        <div class="rounded-md border w-full flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-person-dash-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                            <input type="text" id="name" v-model="formData.name" placeholder="Username ..." class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                        </div>
                    </div>
                    <div class="flex flex-col mb-5">
                        <label for="password" class="font-sm text-gray-700"> Password </label>
                        <div class="rounded-md border w-full flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 scale-x-125 bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            <input type="password" id="password" v-model="formData.password" placeholder="Password ..." class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                        </div>
                    </div>
                    <div class="flex items-center justify-between mb-5">
                        <button @click.prevent="submitForm" class="flex justify-center rounded-md appearance-none border w-full py-2 px-3 bg-primaryaccent text-white leading-tight focus:outline-none">
                            <p style="transform: translateY(1px);">Sign In</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                        </button>
                    </div>
                </form>    
                <div v-if="loginFailure" class="rounded-md border border-red-500 bg-red-200 text-red-500 w-full py-1.5 px-1 flex flex items-center justify-between">
                    <p class="mx-auto flex">
                        <svg v-if="loginFailureServersideError" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto bi bi-bug-fill" viewBox="0 0 16 16">
                            <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
                            <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                        <span class="pl-1">{{ errorMessage }}</span> 
                    </p>
                </div>
                <span class="text-sm text-red-500" v-if="loginFailureServersideError"> This error is not your fault. Reload the page or try again later. </span> 
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    const config = useRuntimeConfig();

    const formData = {
        name: '',
        password: '',
    };

    let loginFailure: globalThis.Ref<boolean> = ref<boolean>(false);
    let loginFailureServersideError: globalThis.Ref<boolean> = ref<boolean>(false);
    let errorMessage: globalThis.Ref<string | null> = ref<string | null>(null);

    async function submitForm() {
        try {
            const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

            const response = await axios.post(`${url}/login`, {
                username: formData.name.toLowerCase(),
                password: formData.password
            }, {
                withCredentials: true,
            });
            
            if (response.status.toString().startsWith("2")) {
                navigateTo('app')
            }
        } catch (error: any) {
            loginFailure.value = true;

            if (error.message.slice(-3).startsWith("5")) {
                loginFailureServersideError.value = true;
            }

            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }
</script>