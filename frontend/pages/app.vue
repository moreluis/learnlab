<template>
  <div>
    <Navbar />
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
    <div class="sm:grid grid-flow-row-dense grid-cols-6 grid-rows-1 gap-4 mx-auto mt-5 max-w-7xl mx-auto px-2 sm:px-4 px-8 text-xl" :class="{ 'grid-cols-3': streak }">
      <div class="rounded-md bg-zinc-100 border border-zinc-600 p-5 col-span-4 xl:col-span-3 overflow-hidden">
        <p v-if="!foldersExist && newView" class="p-4"> Create a new stack by clicking on the '+' below. </p>
        <p v-if="!foldersExist && !newView" class="p-4"> Create a new folder by clicking on the '+' below. </p>
        <p v-if="foldersExist" class="flex"> 
          <div class="flex-grow"><span class="font-bold text-xl"> Used storage: </span> <br> <span class="mono text-3xl"> {{ convertToMegabytes(notepadsSize!) ?? '0 KB' }} </span></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-300 mr-2 translate-y-[75px] scale-[5] -rotate-[22.5deg] bi bi-sd-card-fill" viewBox="0 0 16 16">
            <path d="M12.5 0H5.914a1.5 1.5 0 0 0-1.06.44L2.439 2.853A1.5 1.5 0 0 0 2 3.914V14.5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 12.5 0Zm-7 2.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm2 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm2.75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 1.5 0Zm1.25-.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z"/>
          </svg>
        </p>
      </div>
      <a href="invites" class="mt-5 sm:mt-0 rounded-md bg-zinc-100 hover:opacity-80 transition-opacity col-span-2 border border-zinc-600 px-2 flex overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-300 mr-2 translate-y-[62.5px] lg:translate-y-[50px] sm:translate-x-[-25px] lg:translate-x-[0px] scale-[4.5] md:scale-[5] -rotate-[22.5deg] bi bi-ticket-detailed-fill" viewBox="0 0 16 16">
          <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z"/>
        </svg>
        <p class="mx-auto my-auto p-5 flex">
          <div class="flex flex-col">
            <span class="font-bold text-xl">Invite someone</span>
            <span class="mono text-sm"> {{ inviteLength ?? 0 }} invites left. </span>  
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="hover:translate-x-1 transition-transform duration-500 ml-2 translate-y-0.5 my-auto bi bi-box-arrow-in-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>
          </svg>
        </p>
      </a>
      <!-- Hide streak on smaller screens, so that the information does not take up too much space -->
      <div class="hidden xl:flex col-span-2 xl:col-span-1 mt-5 sm:mt-0 rounded-md bg-zinc-100 border border-zinc-600 p-5 flex overflow-hidden">
        <div class="flex flex-col">
          <span class="font-bold text-xl">Streak</span>
          <span v-if="streak === undefined" class="mono text-3xl"> 0 days </span>  
          <div v-else>
            <span v-if="streak > 1" class="mono text-3xl"> {{ streak }} days </span>  
            <span v-else class="mono text-3xl"> {{ streak }} day </span>  
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-300 ml-2 translate-y-[62.5px] lg:translate-y-[50px] md:translate-x-[10vw] lg:translate-x-[15vw] xl:translate-x-[25px] scale-[4.5] md:scale-[5] rotate-[-12.5deg] bi bi-fire" viewBox="0 0 16 16">
          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
        </svg>
      </div>
    </div>
    <div id="deleteStackForm" class="max-w-3xl flex mx-auto px-2 sm:px-4 px-8 mt-5 hidden">
      <div class="flex flex-col p-4 rounded-md mx-auto bg-red-200 border border-red-500">
        <h2 class="text-red-500 text-xl">Card stack deletion</h2>
        <p class="mono leading-6"> Type '<strong>delete</strong>' to confirm the deletion of the stack. All cards within will be deleted. </p>
        <input @blur="deleteStack" type="name" id="title" v-model="deleteFormData.delete" placeholder="Confirmation word ..." class="mt-4 bg-transparent border border-red-500 p-2 rounded-md placeholder:text-zinc-700 focus:placeholder:text-zinc-500 transition-colors leading-tight focus:outline-none" required>
      </div>
    </div>
    <div class="mt-5 max-w-7xl mx-auto px-2 sm:px-4 px-8">
      <h1 v-if="newView" class="left-item flex text-xl mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-collection-fill opacity-40 my-auto mr-2" viewBox="0 0 16 16">
          <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1"/>
        </svg>  
        Stacks
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div @click.prevent="newDesignToggleCreateDiv()" id="newstack" class="cursor-pointer sm:w-full h-32 rounded-md bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white via-primaryaccent to-white border border-secondaryaccent shadow saturate-150 brightness-110 hover:scale-[1.025] transition delay-100 duration-200">
          <div class="w-full h-full text-center pt-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-plus-square mx-auto mb-2" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            New Stack
          </div>
        </div>
        <div v-if="stackCreationActive" class="cursor-pointer sm:w-full h-32 rounded-md transition-all shadow bg-primaryaccent border border-secondaryaccent hover:scale-[1.025] transition delay-100 duration-200">
          <div class="w-full h-full text-center pt-10 text-xl font-semibold text-white">
            <input @blur="createStack()" type="text" id="newstackinput" v-model="formData.title" placeholder="Stack name ..." class="appearance-none bg-transparent text-center placeholder:text-slate-200 w-full p-2 leading-tight focus:outline-none" required>
          </div>
        </div>
        <NuxtLink :to="notepad" v-if="foldersExist" v-for="notepad in notepads" :id="notepad" class="cursor-pointer sm:w-full h-32 rounded-md transition-all shadow bg-primaryaccent border border-secondaryaccent hover:scale-[1.025] transition delay-100 duration-200">
          <div class="flex m-1 justify-end items-center">
            <div class="flex">
              <svg @click.prevent="setStackDeletionVisibility(notepad)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3-fill mr-0.5 opacity-60 hover:opacity-100 transition-all" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
              </svg>
              <!--<svg @click.prevent="newDesignToggleRenameDiv(notepad)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square ml-0.5 opacity-60 hover:opacity-100 transition-all" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>-->
            </div>
          </div>
          <div class="w-full h-full text-center pt-6 text-xl font-semibold text-white">
            <!--<div v-if="stackRenameActive === notepad">
              <input @blur="renameStack(notepad)" type="text" v-model="formData.title" placeholder="Stack name ..." class="appearance-none bg-transparent text-center placeholder:text-slate-200 w-full px-2 leading-tight focus:outline-none" required>
            </div>-->
            <div>
              {{ notepad.slice(1).replace(/^[a-z]/, (match) => match.toUpperCase()) }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-if="!newView" class="mt-5 max-w-7xl mx-auto px-2 sm:px-4 px-8 text-xl">
      <div class="flex justify-between items-center">
        <h1 class="left-item">Folders</h1>
        <svg @click.prevent="setElementVisibility" id="new-notepad-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer right-item bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </div>
      <div v-if="foldersExist === undefined" class="mt-2 ml-4 animate-pulse rounded-full bg-slate-200 h-5 w-64"></div>
      <div v-if="foldersExist === undefined" class="mt-2 ml-4 animate-pulse rounded-full bg-slate-200 h-5 w-64"></div>
      <div v-if="foldersExist === undefined" class="mt-2 ml-4 animate-pulse rounded-full bg-slate-200 h-5 w-64"></div>
    </div>
    <div v-if="foldersExist && !newView" v-for="notepad in notepads" class="max-w-7xl my-1 mx-auto px-2 sm:px-4 px-8 underline">
      <NuxtLink :to="notepad" class="rounded-md border border-white hover:border-zinc-300 transition-colors py-1 px-4 flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-folder-fill" viewBox="0 0 16 16">
          <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
        </svg>
        {{ notepad.slice(1).replace(/^[a-z]/, (match) => match.toUpperCase()) }}
        <div class="flex ml-auto">
          <svg v-if="notepadDeletionConfirmationActive !== notepad" @click.prevent="changeSvg(notepad)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
          <div v-else class="flex mr-1">
            <svg @click.prevent="deleteNotepad(notepad)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="translate-y-[1px] text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-check2" viewBox="0 0 16 16">
              <path stroke="currentColor" stroke-width="0.1" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            <svg @click.prevent="changeSvg(notepad)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-x" viewBox="0 0 16 16">
              <path stroke="currentColor" stroke-width="0.5" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </div>
          <svg @click.prevent="changeName(notepad)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </div>
      </NuxtLink>
    </div>
    <div v-if="foldersExist !== undefined && !foldersExist" class="max-w-7xl mx-auto px-2 sm:px-4 px-8">
      <p> You do not have a notepad yet. </p>
    </div>
    <div id="createNotepadForm" class="max-w-7xl flex mx-auto px-2 sm:px-4 px-8 hidden">
      <div class="rounded-md border bg-blue-50 flex flex-col mb-5 py-0.5 px-4">
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-folder" viewBox="0 0 16 16">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
            </svg>
            <input @blur="createNewNotepad" type="name" id="title" v-model="formData.title" placeholder="Notepad Name ..." class="bg-blue-50 w-full appearance-none pr-3 leading-tight focus:outline-none" required>
          </div>
      </div>
    </div>
    <div id="updateNotepadNameForm" class="max-w-7xl flex mx-auto px-2 sm:px-4 px-8 hidden">
      <div class="rounded-md border bg-blue-50 flex flex-col mb-5 py-0.5 px-4">
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-folder" viewBox="0 0 16 16">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
            </svg>
            <input @blur="updateNotepadName" type="name" id="title" v-model="formData.title" placeholder="Notepad Name ..." class="bg-blue-50 w-full appearance-none pr-3 leading-tight focus:outline-none" required>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import NoteObject from '~/interfaces/NoteObject';
import isOlderThanYesterday from '~/utils/isOlderThanYesterday';
  const config = useRuntimeConfig();

  const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

  let notepads: globalThis.Ref<string[] | undefined> = ref<string[] | undefined>();
  let notesArr: globalThis.Ref<NoteObject[] | undefined> = ref<NoteObject[] | undefined>();
  let foldersExist: globalThis.Ref<boolean | undefined> = ref<boolean | undefined>();
  let notepadDeletionConfirmationActive: globalThis.Ref<string | undefined> = ref<string | undefined>();
  let notepadsSize: globalThis.Ref<number | undefined> = ref<number | undefined>();
  let inviteLength: globalThis.Ref<number | undefined> = ref<number | undefined>();
  let newNotepadVisible: boolean = true;
  let errorMessage: globalThis.Ref<string | null> = ref<string | null>(null);
  let newView: globalThis.Ref<boolean> = ref<boolean>(true);
  let streak: globalThis.Ref<number | undefined> = ref<number | undefined>();
  let stackCreationActive: globalThis.Ref<boolean> = ref<boolean>(false);
  //let stackRenameActive: globalThis.Ref<string | undefined> = ref<string | undefined>();
  let currentId: globalThis.Ref<string | undefined> = ref<string | undefined>();

  let notepadsCache: string | undefined;
  const formData = {
    originalTitle: '',
    title: ''
  }
  const deleteFormData = {
    delete: ''
  }

  onMounted(async () => {
      setElementVisibility();
      getAccount();
      loadNotepads();
      loadCards();
      getInviteCount();
  });

  async function getAccount() {
    try {
        const response = await axios.get(`${url}/getAccount`, {
            withCredentials: true,
        });

        newView.value = response.data.user.view === 1 ? true : false;
        if (!isOlderThanYesterday(response.data.user.streakLastUpdatedAt)) {
            streak.value = response.data.user.streak;
        } else {
            streak.value = 0;
            if (response.data.user.streak !== 0) {
                await axios.patch(`${url}/resetStreak`, {
                    withCredentials: true,
                });
            }
        }

        // console.log('Response:', response.data);
    } catch (error: any) {
        errorMessage.value = error.response.data.message;

        console.error('Error:', error.response.data.message);
    }
  }

  async function loadNotepads() {
    try {
        const response = await axios.get(`${url}/getNotes`, {
          withCredentials: true,
        });

        let notes = response.data.notes ?? 0;

        notepads.value = new Array;
        notesArr.value = new Array;
        for (let note of notes) {
          if ((note.directory.match(/\//g) || []).length < 2 && !notepads.value!.includes(note.directory)) {
            // console.log(true)
            notepads.value.push(note.directory);
          } /* else if (note.directory.substring(0, note.directory.lastIndexOf("/")).trim() !== '' && !notepads.value!.includes(note.directory.substring(0, note.directory.lastIndexOf("/")))) {
            notepads.value!.push(note.directory.substring(0, note.directory.lastIndexOf("/")));
          } */
          notesArr.value!.push(note);
        }

        if (notepads.value.length > 0) {
          foldersExist.value = true;
          //notepadsSize.value = estimateObjectSize(notes);
        } else {
          foldersExist.value = false;
        }

        // console.log('Response:', response.data);
    } catch (error: any) {
        notepads.value = undefined;
        if (!(error.response.data.message === 'You have no notes.')) errorMessage.value = error.response.data.message;
        if (!(error.response.data.message === 'You have no notes.')) foldersExist.value = false;

        console.error('Error:', error.response.data.message);
    }
  }

  async function loadCards() {
    try {
        const response = await axios.get(`${url}/getCards`, {
          withCredentials: true,
        });

        if (response.data.cards) notepadsSize.value = estimateObjectSize(response.data.cards);

        // console.log('Response:', response.data);
    } catch (error: any) {
        console.error('Error:', error.response.data.message);
    }
  }

  async function getInviteCount() {
    try {
      const response = await axios.get(`${url}/seeInvites`, {
        withCredentials: true,
      });

      inviteLength.value = response.data.inviteCodes.length;

      // console.log('Response:', response.data);
    } catch (error: any) {
        if (errorMessage.value === undefined) errorMessage.value = error.response.data.message;

        console.error('Error:', error.message);
    }
  }

  async function createNewNotepad() {
      if (formData.title.trim() === '') return;

      try {
          const response = await axios.post(`${url}/newNotepad`, {
              withCredentials: true,
              title: formData.title
          });

          // console.log('Response:', response.data);

          loadNotepads();
          setElementVisibility();
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          console.error('Error:', error.message);
      }
  }

  function changeSvg(notepad?: string) {
    if (notepad === undefined && notepadDeletionConfirmationActive.value !== undefined) notepadDeletionConfirmationActive.value = undefined;
    notepadDeletionConfirmationActive.value = notepad;
  }
  
  async function deleteNotepad(notepadName: string) {
      let notepadId: string | undefined = notepadNameToId(notepadName);
      if (notepadId === undefined) return;

      try {
          const response = await axios.post(`${url}/deleteNote`, {
              withCredentials: true,
              note_id: notepadId
          });

          // console.log('Response:', response.data);

          loadNotepads();
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          console.error('Error:', error.message);
      }
  }

  function notepadNameToId(notepadName: string): string | undefined {
    if (notepads === undefined || notesArr === undefined) return undefined;

    for (let i = 0; i < notesArr!.value!.length; i++) {
      if (notesArr!.value![i].directory === notepadName) return notesArr!.value![i]._id;
    }

    return undefined;
  }

  function setElementVisibility() {
    return;
    /* Removed due to upgrade to newView
    const element = document.getElementById('createNotepadForm');
    const elementClose = document.getElementById('new-notepad-svg');

    element?.classList.remove("hidden");

    if (element) {
      element.style.display = newNotepadVisible ? 'none' : 'block';
      newNotepadVisible = !newNotepadVisible;
    } else {
      console.error(`Element '${element}' not found.`);
    }

    if (elementClose) {
      elementClose.style.transform = newNotepadVisible ? "rotate(-45deg)" : "rotate(0deg)";
    } else {
      console.error(`Element '${elementClose}' not found.`);
    }*/
  }

  function convertToMegabytes(kilobytes: number): string {
    if (kilobytes === undefined) return ' 0 KB.'
    if (kilobytes >= 1024) {
        const megabytes = kilobytes / 1024;
        return megabytes.toFixed(3) + ' MB';
    } else {
        return kilobytes.toFixed(3) + ' KB';
    }
  }

  async function updateNotepadName() {
    if (formData.title.trim() === '') return;

    try {
        const response = await axios.patch(`${url}/updateNote`, {
            withCredentials: true,
            notepad: true,
            directory: formData.title.startsWith("/") ? formData.title : `/${formData.title}`,
            originalTitle: formData.originalTitle.startsWith("/") ? formData.originalTitle : `/${formData.originalTitle}`
        });

        // console.log('Response:', response.data);

        notepadsCache = undefined;

        loadNotepads();
        setChangeNotepadNameVisibility(false);
    } catch (error: any) {
        errorMessage.value = error.response.data.message;

        console.error('Error:', error.message);
    }
  }

  function changeName(notepad: string) {
    if (notepadsCache !== undefined) {
      notepads.value?.push(notepadsCache);
    }

    if (notepads.value === undefined) console.error("Error editing name of notebook.");
    const index = notepads.value!.indexOf(notepad);
    if (index !== -1) {
      notepads.value!.splice(index, 1);
    }

    notepadsCache = notepad;

    formData.title = notepad;
    formData.originalTitle = notepad;

    setChangeNotepadNameVisibility(true);
  }

  function setChangeNotepadNameVisibility(visibile: boolean) {
    const element = document.getElementById('updateNotepadNameForm');

    element?.classList.remove("hidden");

    if (element) {
      element.style.display = visibile ? 'block' : 'none';
    } else {
      console.error(`Element '${element}' not found.`);
    }
  }

  function newDesignToggleCreateDiv() {
    stackCreationActive.value = !stackCreationActive.value;
  }

  /*function newDesignToggleRenameDiv(notepad?: string) {
    stackRenameActive.value = notepad ?? undefined;

    if (!notepad) return;
    formData.title = notepad.slice(1);
    document.getElementById(`/${notepad}`)?.removeAttribute('href');
  }*/

  async function createStack() {
      if (formData.title.trim() === '') return;

      try {
          const response = await axios.post(`${url}/newNotepad`, {
              withCredentials: true,
              title: formData.title
          });

          // console.log('Response:', response.data);

          loadNotepads();
          newDesignToggleCreateDiv();
          formData.title = '';
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          console.error('Error:', error.message);
      }
  }

  function setStackDeletionVisibility(stackName: string) {
      const element = document.getElementById('deleteStackForm');

      element?.classList.remove("hidden");

      currentId.value = stackName;
  }

  function setStackDeletionHidden() {
      const element = document.getElementById('deleteStackForm');

      element?.classList.add("hidden");

      currentId.value = undefined;
  }

  async function deleteStack() {
      if (deleteFormData.delete !== 'delete') return "Error: 'delete' was not entered correctly.";
      if (currentId.value === undefined) return "Error: No stack selected..";

      let notepadId: string | undefined = notepadNameToId(currentId.value);
      if (notepadId === undefined) return;

      try {
          const response = await axios.post(`${url}/deleteNote`, {
              withCredentials: true,
              note_id: notepadId
          });

          // console.log('Response:', response.data);

          loadNotepads();
          setStackDeletionHidden();
          deleteFormData.delete = '';
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          console.error('Error:', error.message);
      }
  }

  /*async function renameStack(notepad: string) {
      if (notepad.trim() === '') return;
      if (formData.title.trim() === '') return;

      try {
          const response = await axios.patch(`${url}/updateNote`, {
              withCredentials: true,
              notepad: true,
              originalTitle: notepad.startsWith("/") ? notepad : `/${notepad}`,
              directory: formData.originalTitle.startsWith("/") ? formData.originalTitle : `/${formData.originalTitle}`
          });

          // console.log('Response:', response.data);

          notepadsCache = undefined;

          formData.originalTitle = '';

          loadNotepads();
          setChangeNotepadNameVisibility(false);
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          console.error('Error:', error.message);
      }
  }*/
</script>