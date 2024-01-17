<template>
    <div>
        <Navbar v-if="!props.newView" :divide="true" />
        <div class="w-full h-full bg-white p-2" style="filter: drop-shadow(0 2px 1px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));">
            <div class="max-w-7xl mx-auto px-2 sm:px-4 px-8">
                <div class="flex justify-between items-center left-item">
                    <h1 v-if="!updateStackName" class="text-2xl flex items-center right-item font-bold"> 
                        {{ props.stack.directory.slice(1).replace(/^[a-z]/, (match: string) => match.toUpperCase()) }} 
                        <svg @click.prevent="toggleUpdateStackName" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="cursor-pointer text-zinc-500 ml-1 mt-1 bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </h1> 
                    <div v-else class="flex items-center">
                        <input @blur="changeStackName" type="text" id="name" :placeholder="stackNameFormData.originalName.substring(1)" v-model="stackNameFormData.name" class="font-bold text-xl appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                        <svg @click.prevent="toggleUpdateStackName" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="cursor-pointer text-zinc-500 ml-1 mt-1 bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="block text-sm text-zinc-500 mono text-right"> Created: {{ new Date(props.stack.createdAt).toLocaleDateString() }} </p>
                        <p class="block text-sm text-zinc-500 mono text-right"> Updated: {{ new Date(props.stack.updatedAt).toLocaleDateString() }} </p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="errorMessage !== undefined && errorMessage !== null" class="max-w-7xl mx-auto px-2 sm:px-4 px-8 text-xl">
            <div class="mt-5 rounded-md bg-red-200 border border-red-500 p-5 col-span-3 overflow-hidden">
                <p class="flex"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-red-500 mr-2 my-auto bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                    <div class="flex-grow"> <p class="font-regular text-sm sm:text-xl text-red-500"> {{ errorMessage }} </p> </div>
                </p>
            </div>
        </div>
        <div v-if="card && !done" class="max-w-7xl mx-auto px-2 sm:px-4 px-8 mono flex justify-end">
            <div @click.prevent="toggleCreateNewContainer" class="cursor-pointer text-zinc-500 mt-2 float-right flex">
                Modify
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-1 mt-1 bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </div>
            <div @click.prevent="deleteCard" class="cursor-pointer text-zinc-500 mt-2 ml-2 float-right flex">
                Delete
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-1 mt-1 bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </div>
        </div>
        <div v-if="card && !done" class="cards mt-10 text-white mx-2 mt-8">
            <div class="w-full">
                <div v-if="last" class="w-11/12 sm:w-96 mx-auto">
                    <p class="mono w-fit text-transparent bg-clip-text bg-gradient-to-r from-primaryaccent via-secondaryaccent to-amber-800"> Recap ({{ maxRecapLength }}/{{ maxRecapLength }} cards) </p>
                </div>
                <div v-else class="w-11/12 sm:w-96 mx-auto">
                    <p v-if="recap.includes(card._id) && !fetching" class="mono w-fit text-transparent bg-clip-text bg-gradient-to-r from-primaryaccent via-secondaryaccent to-amber-800">Recap ({{ recapIndex }}/{{ maxRecapLength }} cards)</p>
                    <p v-else class="mono w-fit text-transparent bg-clip-text bg-gradient-to-r from-primaryaccent via-secondaryaccent to-amber-800"> {{ length }}/{{ stackLength }} Cards </p>
                </div>
                <div @click.prevent="flip()" id="view" class="cursor-pointer hover:scale-[1.025] transition duration-200 mx-auto mt-2 w-11/12 sm:w-96 h-36 bg-secondaryaccent rounded-md flex items-center justify-center p-3 text-clip overflow-hidden"> {{ currentView ?? 'Error fetching card.' }} </div>
                <div class="mx-auto mt-6 w-11/12 sm:w-96 grid grid-rows-2 sm:grid-rows-1 grid-flow-col gap-2">
                    <div @click.prevent="retrieveCard(false)" class="cursor-pointer hover:scale-[1.025] transition delay-100 duration-200 bg-gradient-to-tl from-red-500 via-rose-600 to-primaryaccent  p-2 px-3 rounded-md">Again</div>
                    <div @click.prevent="retrieveCard(true)" class="cursor-pointer hover:scale-[1.025] transition delay-100 duration-200 bg-gradient-to-br from-emerald-500 via-teal-600 to-secondaryaccent p-2 px-3 rounded-md">Easy</div>
                </div>
            </div>
        </div>
        <div v-if="done">
            <div class="w-fit mx-auto mt-20 text-center">
                <h1 class="text-3xl font-black text-primaryaccent">Done!</h1>
                <p class="text-xl font-bold text-black">{{ Math.round((length - recapIndex + 1) / length * 100) }}% instant!</p>
                <StreakView class="my-4 p-4 border-amber-400/50 border"/>
                <div class="flex mt-4">
                    <NuxtLink to="/app" class="flex w-max mr-1 p-2 bg-secondaryaccent/25 rounded-md border-solid border-[1px] border-primaryaccent/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-auto mr-1 bi bi-arrow-bar-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                        Back to Stacks
                    </NuxtLink>
                    <a @click.prevent="reload()" class="flex w-max cursor-pointer ml-1 p-2 bg-secondaryaccent/25 rounded-md border-solid border-[1px] border-primaryaccent/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-auto mr-1 bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                        Repeat this Stack
                    </a>
                </div>
            </div>
        </div>
        <div v-if="createNew && card" class="w-11/12 mx-auto mt-10 h-[0.5px] sm:m-0 sm:p-0">
            <div class="w-full h-full bg-slate-200 sm:bg-white mx-auto"></div>
        </div>
        <div class="w-11/12 sm:w-96 mx-auto" v-if="createNew && card">
            <h2 class="text-xl text-black mt-6">Update this card</h2>
            <div class="rounded-md border w-full flex mb-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="p-1 my-auto mx-2 bi card-text overflow-visible" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                </svg>
                <input type="text" id="name" placeholder="Question ..." v-model="updateFormData.question" class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
            </div>
            <div class="rounded-md border w-full flex mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="p-1 my-auto mx-2 bi bi-card-checklist overflow-visible" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                </svg>
                <input type="text" id="name" placeholder="Answer ..." v-model="updateFormData.answer" class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
            </div>
            <div class="flex items-center justify-between mb-5">
                <button @click.prevent="updateCard" class="flex justify-center rounded-md appearance-none border w-full py-2 px-3 bg-primaryaccent text-white leading-tight focus:outline-none">
                    <p style="transform: translateY(1px);">Submit</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="createNew && card" class="max-w-7xl mx-auto px-2 sm:px-4 px-8 mt-12 h-[0.5px]">
            <div class="w-full h-full bg-slate-200 mx-auto"></div>
        </div>
        <div v-if="createNew" class="transition-all max-w-7xl mx-auto px-2 sm:px-4 px-8 mt-4" :class="{ 'mt-12': card}">
            <h1 class="text-2xl font-bold mb-2">Create new cards</h1>
            <div class="sm:grid grid-rows-2 grid-flow-col gap-6 h-fit">
                <div class="col-span-1">
                    <h2 class="text-xl">Manually</h2>
                    <div class="mt-2">
                        <div class="rounded-md border w-full flex mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 bi card-text overflow-visible" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            <input type="text" id="name" placeholder="Question ..." v-model="manualFormData.question" class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                        </div>
                        <div class="rounded-md border w-full flex mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 bi bi-card-checklist overflow-visible" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                            </svg>
                            <input type="text" id="name" placeholder="Answer ..." v-model="manualFormData.answer" class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                        </div>
                        <div class="flex items-center justify-between mb-5 sm:mb-0">
                            <button @click.prevent="manualSubmit" class="flex justify-center rounded-md appearance-none border w-full py-2 px-3 bg-primaryaccent text-white leading-tight focus:outline-none">
                                <p style="transform: translateY(1px);">Submit</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row-span-2 col-span-1">
                    <h2 class="text-xl flex items-center">
                        <span>Paste from website </span>
                        <span class="ml-2 py-0.5 px-1.5 flex items-center font-medium mono bg-primaryaccent/25 rounded-md border-solid border-[1px] border-secondaryaccent/60 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars text-secondaryaccent" viewBox="0 0 16 16">
                                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                            </svg>
                            AI
                        </span>
                    </h2>
                    <div class="mt-2">
                        <div class="rounded-md border w-full flex mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 bi bi-card-checklist overflow-visible" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                            </svg>
                            <input type="url" id="name" placeholder="URL ..." v-model="autoFormData.url" class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                        </div>
                        <div class="flex items-center justify-between mb-5">
                            <button @click.prevent="autoSubmit" class="flex justify-center rounded-md appearance-none border w-full py-2 px-3 bg-primaryaccent text-white leading-tight focus:outline-none">
                                <svg v-if="generating === 'url'" class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">                          
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p v-if="generating === 'url'" style="transform: translateY(1px);">Processing</p>
                                <p v-else style="transform: translateY(1px);">Submit</p>
                                <svg v-if="generating !== 'url'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row-span-3">
                    <h2 class="text-xl flex items-center">
                        <span>Paste from text </span>
                        <span class="ml-2 py-0.5 px-1.5 flex items-center font-medium mono bg-primaryaccent/25 rounded-md border-solid border-[1px] border-secondaryaccent/60 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars text-secondaryaccent" viewBox="0 0 16 16">
                                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                            </svg>
                            AI
                        </span>
                    </h2>
                    <div class="mt-2 h-54 h-fit">
                        <div class="rounded-md border w-full h-full flex mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 mt-1 mx-2 bi bi-card-checklist overflow-visible" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                            </svg>
                            <textarea type="textarea" id="name" maxlength="90000" :placeholder="loremIpsum" v-model="textFormData.text" class="h-fullappearance-none w-full py-2 pr-3 mr-1 mb-1 leading-tight focus:outline-none max-h-56" rows="6" required></textarea>
                        </div>
                        <div class="flex items-center justify-between mb-5">
                            <button @click.prevent="autoSubmitFromText" class="flex justify-center rounded-md appearance-none border w-full py-2 px-3 bg-primaryaccent text-white leading-tight focus:outline-none">
                                <svg v-if="generating === 'text'" class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">                          
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p v-if="generating === 'text'" style="transform: translateY(1px);">Processing</p>
                                <p v-else style="transform: translateY(1px);">Submit</p>
                                <svg v-if="generating !== 'text'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import axios from 'axios';
    import CardObject from '~/interfaces/CardObject';

    const config = useRuntimeConfig();
    const { params } = useRoute();

    const props = defineProps({
        stack: {
            type: Object,
            required: true,
        },
        newView: {
            type: Boolean,
            required: true,
        },
    });

    onMounted(async () => {
        retrieveCard();
    });


    const manualFormData = {
        question: '',
        answer: '',
    };

    const updateFormData = {
        question: '',
        answer: '',
    };

    const autoFormData = {
        url: '',
    };

    const textFormData = {
        text: '',
    };

    const stackNameFormData = {
        originalName: '',
        name: '',
    }

    let errorMessage: globalThis.Ref<string | null> = ref<string | null>(null);
    let createNew: globalThis.Ref<boolean> = ref<boolean>(false);
    let generating: globalThis.Ref<boolean | string> = ref<boolean | string>(false);
    let fetching: globalThis.Ref<boolean> = ref<boolean>(false);
    let updateStackName: globalThis.Ref<boolean> = ref<boolean>(false);
    let card: globalThis.Ref<CardObject | undefined> = ref<CardObject | undefined>();
    let currentView: globalThis.Ref<string | undefined> = ref<string | undefined>();
    let recap: globalThis.Ref<string[]> = ref<string[]>([]);
    let maxRecapLength: globalThis.Ref<number> = ref<number>(0);
    let recapIndex: globalThis.Ref<number> = ref<number>(0);
    let length: globalThis.Ref<number> = ref<number>(0);
    let stackLength: globalThis.Ref<number> = ref<number>(0);
    let retrieveable: globalThis.Ref<boolean> = ref<boolean>(true);
    let last: globalThis.Ref<boolean> = ref<boolean>(false);
    let done: globalThis.Ref<boolean> = ref<boolean>(false);
    
    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor nisi non efficitur finibus. Aenean turpis neque, convallis at sem et, ultricies aliquam ante. Donec molestie nunc sit amet nibh facilisis bibendum.`;
    

    async function retrieveCard(status?: boolean) {
        if (!stackNameFormData.originalName) stackNameFormData.originalName = props.stack.directory;
        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');
        let nextId: string | undefined;
        
        if (!retrieveable.value) return;
        retrieveable.value = false;

        fetching.value = true;

        if (status !== undefined && !status) {
            if (card.value?._id) recap.value?.push(card.value._id);
            if (recapIndex.value === recap.value.length) {
                last.value = true;
                recapIndex.value++;
                maxRecapLength.value++;
                if (document.getElementById('view')?.classList.contains('bg-primaryaccent')) {
                    document.getElementById('view')?.classList.remove('bg-primaryaccent');
                    document.getElementById('view')?.classList.add('bg-secondaryaccent');
                }
                retrieveable.value = true;
                return;
            }
            maxRecapLength.value++;
        } 

        if (card.value && !card.value.next) {
            if (!recap.value) return setDone();
            nextId = recap.value[recapIndex.value];
            recapIndex.value++;
        }

        if (status !== undefined && status) {
            if (last.value) return setDone();
            recap.value = recap.value.filter(item => item !== card.value?._id);
        }

        if (card.value && !card.value?.next && recap.value.length < 1) {
            return setDone();
        }

        try {
            const response = await axios.post(`${url}/getCard`, {
                withCredentials: true,
                cardId: card.value?._id ?? undefined,
                nextId: nextId ?? card.value?.next ?? undefined,
                stack: card.value?.stack ?? props.stack.directory.substring(1) ?? undefined
            });

            // console.log('Response:', response.data);
            
            if (document.getElementById('view')?.classList.contains('bg-primaryaccent')) {
                document.getElementById('view')?.classList.remove('bg-primaryaccent');
                document.getElementById('view')?.classList.add('bg-secondaryaccent');
            }

            card.value = response.data.card;
            if (!stackLength.value) stackLength.value = response.data.stackLength;
            if (nextId && card.value) card.value.next = undefined;
            currentView.value = response.data.card.question;
            length.value++;

            await sleepAHalfSeconds();
        } catch (error: any) {
            if (error.response.status !== 404) errorMessage.value = error.response.data.message;

            if (!card.value) createNew.value = true;

            console.error('Error:', error.message);
        } finally {
            retrieveable.value = true;
            fetching.value = false;
        }
    }

    async function sleepAHalfSeconds() {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }

    async function manualSubmit() {
        if (manualFormData.question.trim() === '' && manualFormData.answer.trim() === '' ) return;

        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            const response = await axios.post(`${url}/newCard`, {
                withCredentials: true,
                question: manualFormData.question,
                answer: manualFormData.answer,
                stack: params.slug
            });

            // console.log('Response:', response.data);

            window.location.reload();
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }

    async function autoSubmit() {
        if (autoFormData.url.trim() === '') return;

        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            generating.value = "url";

            const response = await axios.post(`${url}/generateNewCards`, {
                withCredentials: true,
                url: autoFormData.url,
                stack: params.slug
            });

            generating.value = false;
            await sleepAHalfSeconds();
            window.location.reload();

            // console.log('Response:', response.data);
        } catch (error: any) {
            generating.value = false;
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }

    async function autoSubmitFromText() {
        if (textFormData.text.trim() === '') return;

        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            generating.value = "text";

            const response = await axios.post(`${url}/generateNewCards`, {
                withCredentials: true,
                text: textFormData.text,
                stack: params.slug
            });

            generating.value = false;
            await sleepAHalfSeconds();
            window.location.reload();

            // console.log('Response:', response.data);
        } catch (error: any) {
            generating.value = false;
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }
    
    async function deleteCard() {
        if (!card.value?._id) return;

        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            const response = await axios.post(`${url}/deleteCard`, {
                withCredentials: true,
                cardId: card.value._id
            });

            // console.log('Response:', response.data);

            window.location.reload();
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }
    
    async function updateCard() {
        if (!card.value?._id) return;
        if (updateFormData.question == card.value.question && updateFormData.answer == card.value.answer) return;

        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            const response = await axios.patch(`${url}/updateCard`, {
                withCredentials: true,
                cardId: card.value._id,
                question: updateFormData.question,
                answer: updateFormData.answer
            });

            // console.log('Response:', response.data);

            window.location.reload();
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }
    
    async function changeStackName() {
        if (!stackNameFormData.name) return;

        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            const response = await axios.patch(`${url}/updateNote`, {
                withCredentials: true,
                notepad: true,
                directory: stackNameFormData.name.startsWith("/") ? stackNameFormData.name : `/${stackNameFormData.name}`,
                originalTitle: stackNameFormData.originalName.startsWith("/") ? stackNameFormData.originalName : `/${stackNameFormData.originalName}`
            });

            // console.log('Response:', response.data);

            navigateTo(stackNameFormData.name.startsWith("/") ? stackNameFormData.name : `/${stackNameFormData.name}`)
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }

    function toggleCreateNewContainer() {
        createNew.value = !createNew.value;
    }

    function flip() {
        if (card.value == null) return;

        if (currentView.value == card.value.answer && currentView.value == card.value.question) {
            if (document.getElementById('view')?.classList.contains('bg-secondaryaccent')) {
                document.getElementById('view')?.classList.remove('bg-secondaryaccent');
                document.getElementById('view')?.classList.add('bg-primaryaccent');
            } else {
                document.getElementById('view')?.classList.remove('bg-primaryaccent');
                document.getElementById('view')?.classList.add('bg-secondaryaccent');
            }
        } else if (currentView.value == card.value.answer) {
            currentView.value = card.value.question;

            document.getElementById('view')?.classList.remove('bg-primaryaccent');
            document.getElementById('view')?.classList.add('bg-secondaryaccent');
        } else if (currentView.value == card.value.question) {
            currentView.value = card.value.answer;
            
            document.getElementById('view')?.classList.remove('bg-secondaryaccent');
            document.getElementById('view')?.classList.add('bg-primaryaccent');
        }
    }

    function toggleUpdateStackName() {
        updateStackName.value = !updateStackName.value;
    }

    async function setDone() {
        done.value = true;
    }

    function reload() {
        window.location.reload();
    }
</script>