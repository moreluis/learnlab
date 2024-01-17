<template>
    <div>
        <Navbar />
        <div v-if="errorMessage !== undefined && errorMessage !== null" class="max-w-3xl mx-auto px-2 sm:px-4 px-8 text-xl">
            <div class="mt-5 rounded-md bg-red-200 border border-red-500 p-5 overflow-hidden">
                <p class="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-red-500 mr-2 my-auto bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                    <div class="flex-grow"> <p class="font-regular text-sm sm:text-xl text-red-500"> {{ errorMessage }} </p> </div>
                </p>
            </div>
        </div>
        <div class="mt-5 max-w-3xl mx-auto px-2 sm:px-4 px-8">
            <div v-if="user !== null" class="rounded-md p-8 text-xl bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white via-secondaryaccent to-white">
                <div class="flex justify-between items-center">
                    <div class="flex left-item">    
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="mr-2 bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <p class="my-auto flex" v-if="!usernameEditActive">
                            {{ user.name }}
                            <svg @click.prevent="usernameEditActive = true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-auto ml-1 cursor-pointer bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </p>
                        <input v-else @blur="updateUsername" type="name" id="title" v-model="updateFormData.name" placeholder="Username ..." class="hover:opacity-75 transition-opacity border-none bg-transparent focus:outline-none placeholder-black" />
                    </div>
                    <div @click.prevent="deleteCookiesAndRedirect" class="hover:opacity-75 hover:border-transparent transition-all duration-300 delay-200 border border-secondaryaccent rounded-md p-2 px-4 cursor-pointer flex right-item">    
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="my-auto mr-1 bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <p class="my-auto flex text-base" v-if="!usernameEditActive">
                            Log out
                        </p>
                    </div>
                </div>
                <p class="my-auto mt-2 flex flex-col"> <span class="text-base translate-y-1">Created at</span> <span class="mono text-2xl">{{ new Date(user.createdAt).toLocaleDateString() }}</span></p>
            </div>
        </div>
        <div class="mt-5 max-w-3xl mx-auto px-2 sm:px-4 px-8">
            <StreakView class="p-8" :read-only="true"/>
        </div>
        <div class="mx-auto mt-5 w-fit px-2 sm:px-4 px-8 text-md flex">
            <div class="px-4 w-fit mx-auto flex mono hover:opacity-75 transition-opacity flex flex-col md:flex-row">
                <div>
                    <input type="radio" id="option1" value="1" @click.prevent="changeViewFormToOne" class="cursor-pointer" :checked="changeViewFormData.view === 1">
                    <label for="1" class="ml-1">New design <span class="opacity-60">(Simplified)</span></label>
                </div>

                <div>
                    <input type="radio" id="option2" value="2"  class="cursor-pointer md:ml-4 opacity-40" @click.prevent="changeViewFormToTwo" :checked="changeViewFormData.view === 2">
                    <label for="2" class="ml-1 opacity-40 line-through">Old design <span class="opacity-60">(More complicated, but more structured)</span></label>
                </div>
            </div>
        </div>
        <div class="mx-auto mt-5 w-fit px-2 sm:px-4 px-8 text-md flex flex-col sm:flex-row">
            <NuxtLink to="/invites" class="px-4 w-fit mx-auto flex mono hover:opacity-75 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>
                    </svg>
                <p class="underline">Invite someone</p>
            </NuxtLink>
            <div @click.prevent="setAccountDeletionVisibility" class="mt-2 sm:mt-0 cursor-pointer px-4 w-fit mx-auto flex mono hover:opacity-75 transition-opacity flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-1 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
                <p class="underline">Delete account</p>
            </div>
        </div>
        <div id="deleteAccountForm" class="max-w-3xl flex mx-auto px-2 sm:px-4 px-8 mt-5 hidden">
            <div class="flex flex-col p-4 rounded-md mx-auto bg-red-200 border border-red-500">
                <h2 class="text-red-500 text-xl">Account deletion</h2>
                <p class="mono leading-6"> Type '<strong>delete</strong>' to confirm the deletion of your account. All your data (notes, invites and profile) will be deleted. </p>
                <input @blur="deleteUser" type="name" id="title" v-model="deleteFormData.delete" placeholder="Confirmation word ..." class="mt-4 bg-transparent border border-red-500 p-2 rounded-md placeholder:text-zinc-700 focus:placeholder:text-zinc-500 transition-colors leading-tight focus:outline-none" required>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import UserObject from '~/interfaces/UserObject';
    const config = useRuntimeConfig();

    let user: globalThis.Ref<UserObject | null> = ref<UserObject | null>(null);
    let errorMessage: globalThis.Ref<string | null> = ref<string | null>(null);
    let usernameEditActive: globalThis.Ref<boolean | null> = ref<boolean | null>(null);
    let changeViewFormData: globalThis.Ref<{ view: number }> = ref<{ view: number }>({ view: 0 });

    const updateFormData = {
        name: ''
    }

    const deleteFormData = {
        delete: ''
    }

    const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

    onMounted(async () => {
        loadAccount();
    })

    async function loadAccount() {
        try {
            const response = await axios.get(`${url}/getAccount`, {
                withCredentials: true,
            });

            user.value = response.data.user;
            updateFormData.name = response.data.user.name;
            changeViewFormData.value.view = response.data.user.view;

            // console.log('Response:', response.data);
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.response.data.message);
        }
    }

    function deleteCookiesAndRedirect() {
        deleteCookies(document.cookie.split(";"));
        navigateTo('')
    }

    async function updateUsername() {
        try {
            const response = await axios.patch(`${url}/updateUser`, {
                withCredentials: true,
                name: updateFormData.name
            });

            user.value = response.data.user;

            // console.log('Response:', response.data);
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.response.data.message);
        } finally {
            usernameEditActive.value = false;
        }
    }

    async function deleteUser() {
        if (deleteFormData.delete !== 'delete') return "Error: 'delete' was not entered correctly.";

        try {
            const response = await axios.delete(`${url}/deleteAccount`, {
                withCredentials: true,
            });

            user.value = response.data.user;

            // console.log('Response:', response.data);
            
            deleteCookies(document.cookie.split(";"));
            
            if (response.status.toString().startsWith("2")) {
                navigateTo('')
            }
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.response.data.message);
        } finally {
            usernameEditActive.value = false;
        }
    }

    async function changeViewFormToTwo() {
        return;
        /* Removed due to upgrade to newView
        try {
            const response = await axios.patch(`${url}/updateUser`, {
                withCredentials: true,
                view: 2
            });

            user.value = response.data.user;

            changeViewFormData.value.view = 2;

            // console.log('Response:', response.data);
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.response.data.message);
        }*/
    }

    async function changeViewFormToOne() {
        try {
            const response = await axios.patch(`${url}/updateUser`, {
                withCredentials: true,
                view: 1
            });

            user.value = response.data.user;

            changeViewFormData.value.view = 1;

            // console.log('Response:', response.data);
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.response.data.message);
        }
    }

    function setAccountDeletionVisibility() {
        const element = document.getElementById('deleteAccountForm');

        element?.classList.remove("hidden");
    }
</script>