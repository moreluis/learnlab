<template>
    <div>
      <div v-if="!note">
        <Navbar />
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
      <div v-if="!note && !newView" class="mt-5 max-w-7xl mx-auto px-2 sm:px-4 px-8 text-xl">
        <div class="flex justify-between items-center">
          <h1 v-if="directory" class="left-item flex"> 
            <div v-if="notepadsCache === null">
              <span> {{ params.slug[0] ?? 'Notes' }} </span>
            </div>
            <div v-else>
              <input @blur="updateNotepadName" type="name" id="title" v-model="updateFormData.title" placeholder="Notepad Name ..." />
            </div>
            <span class="ml-2 my-auto text-sm mono" v-if="notes"> {{ convertToMegabytes(noteLength!) }} </span>
            <svg v-if="params.slug[0] !== undefined && params.slug.length === 1" @click.prevent="changeNotepadName(params.slug[0])" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-2 ml-2 bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </h1>
          <svg v-if="directory" @click.prevent="setElementVisibility" id="new-notepad-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer right-item bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </div>
      </div>
      <div v-if="!note" class="max-w-7xl my-1 mx-auto px-2 sm:px-4 px-8">
        <div v-if="notes === undefined && !illegalSlug" class="mt-2 animate-pulse rounded-full bg-slate-200 h-5 w-48 md:w-96"></div>
        <p v-if="illegalSlug"> There is nothing here yet. </p>
      </div>
      <div v-if="notes !== undefined && directory" v-for="note in notes" class="max-w-7xl my-1 mx-auto px-2 sm:px-4 px-8 underline">
        <NuxtLink v-if="note.title.trim() !== ''" :to="note.title.startsWith('/') ? $route.params.slug + note.title : $route.params.slug + '/' + note.title" class="rounded-md border border-white hover:border-zinc-300 transition-colors py-1 px-4 flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-file-earmark-richtext" viewBox="0 0 16 16">
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
            <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
          </svg>
          {{ note.title.startsWith("/") ? note.title.slice(1) : note.title }}
          <div class="flex ml-auto">
            <svg v-if="noteDeletionConfirmationActive !== note.title" @click.prevent="changeSvg(note.title)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
            <div v-else class="flex mr-1">
              <svg @click.prevent="deleteNote(note.title)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="translate-y-[1px] text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-check2" viewBox="0 0 16 16">
                <path stroke="currentColor" stroke-width="0.1" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              <svg @click.prevent="changeSvg(note.title)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-x" viewBox="0 0 16 16">
                <path stroke="currentColor" stroke-width="0.5" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </div>
            <svg @click.prevent="changeName(note.title)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-zinc-400 hover:text-black transition-color duration-300 cursor-pointer my-auto ml-auto bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </div>
        </NuxtLink>
      </div>
      <div v-if="note && !newView" v-for="note in notes">
        <editor :stack="note" :newView="false"/>
      </div>
      <div v-if="newView" v-for="note in notes">
        <editor :stack="note" :newView="true"/>
      </div>
      <div id="createNotepadForm" class="max-w-7xl flex mx-auto px-2 sm:px-4 px-8 hidden">
        <div class="rounded-md border bg-blue-50 flex flex-col mb-5 py-0.5 px-4">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-file-earmark-richtext-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM7 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V9.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9s1.54-1.274 1.639-1.208zM5 11h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
              </svg>
              <input @blur="createNewNote" type="name" id="title" v-model="formData.title" placeholder="Note Name ..." class="bg-blue-50 w-full appearance-none pr-3 leading-tight focus:outline-none" required>
            </div>
        </div>
      </div>
      <div id="updateNoteNameForm" class="max-w-7xl flex mx-auto px-2 sm:px-4 px-8 hidden">
        <div class="rounded-md border bg-blue-50 flex flex-col mb-5 py-0.5 px-4">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto mx-2 bi bi-folder" viewBox="0 0 16 16">
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
              </svg>
              <input @blur="updateNoteName" type="name" id="title" v-model="renameFormData.title" placeholder="Notepad Name ..." class="bg-blue-50 w-full appearance-none pr-3 leading-tight focus:outline-none" required>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import axios from 'axios';
    import NoteObject from '~/interfaces/NoteObject';

    const config = useRuntimeConfig();

    const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');
    const { params } = useRoute();
  
    let illegalSlug: globalThis.Ref<boolean | undefined> = ref<boolean | undefined>();
    let notes: globalThis.Ref<NoteObject[] | undefined> = ref<NoteObject[] | undefined>();
    let directory: globalThis.Ref<boolean | undefined> = ref<boolean | undefined>();
    let note: globalThis.Ref<boolean | undefined> = ref<boolean | undefined>();
    let newNoteVisible: globalThis.Ref<boolean | undefined> = ref<boolean | undefined>(false);
    let noteLength: globalThis.Ref<number | undefined> = ref<number | undefined>();
    let errorMessage: globalThis.Ref<string | null> = ref<string | null>(null);
    let noteDeletionConfirmationActive: globalThis.Ref<string | undefined> = ref<string | undefined>();
    let newView: globalThis.Ref<boolean> = ref<boolean>(true);
    
    let notepadsCache: globalThis.Ref<string | null> = ref<string | null>(null);
    let noteCache: globalThis.Ref<NoteObject | undefined> = ref<NoteObject | undefined>();
    const updateFormData = {
      title: '',
      originalTitle: ''
    }

    const renameFormData = {
        title: '',
        originalTitle: ''
    }

    const formData = {
        title: '',
        content: '',
        directory: ''
    }
  
    onMounted(async () => {
        setElementVisibility();
        loadNotes();
        getView();
    });

    async function getView() {
      try {
          const response = await axios.get(`${url}/getAccount`, {
              withCredentials: true,
          });

          newView.value = response.data.user.view === 1 ? true : false;

          // console.log('Response:', response.data);
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          console.error('Error:', error.response.data.message);
      }
    }
    
    async function loadNotes() {
        try {
            if (Array.isArray(params.slug) && params.slug.length > 2) {
                illegalSlug.value = true;
                directory.value = false;
                note.value = false;
            };


            const response = await axios.post(`${url}/getNotesBySlug`, {
                withCredentials: true,
                directory: params.slug ?? params.slug[0],
                note: params.slug[1] ?? null,
            });

            notes.value = response.data.notes;

            directory.value = response.data.directory;
            note.value = response.data.note;

            if (directory) {
                noteLength.value = estimateObjectSize(notes);
            } else {
                noteLength.value = estimateObjectSize(note);
            }

            // console.log('Response:', response.data);
        } catch (error: any) {
            illegalSlug.value = error.response.status === 404;
            if (!(error.response.data.message === 'You have no note here.')) errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }

    function changeNotepadName(notepadName: string) {
      updateFormData.title = notepadName;
      updateFormData.originalTitle = notepadName;
      notepadsCache.value = notepadName;
    }
    
    async function createNewNote() {
        if (!Array.isArray(params.slug)) formData.directory = params.slug;
        if (formData.title.trim() === '') return errorMessage.value = 'Note title cannot be empty.';
        if (params.slug.length !== 1) return errorMessage.value = 'Unable to perform the action at this location.';

        try {
            const response = await axios.post(`${url}/newNote`, {
                withCredentials: true,
                title: formData.title,
                content: '',
                directory: formData.title.startsWith("/") ? `/${params.slug[0]}${formData.title}` : `/${params.slug[0]}/${formData.title}`
            });

            // console.log('Response:', response.data);

            loadNotes();
            setElementVisibility();
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }
  
    function setElementVisibility() {
      return;
      /* Removed due to upgrade to newView
      const element = document.getElementById('createNotepadForm');
      const elementClose = document.getElementById('new-notepad-svg');
  
      element?.classList.remove("hidden");
  
      if (element) {
        element.style.display = newNoteVisible.value ? 'block' : 'none' ;
        newNoteVisible.value = !newNoteVisible.value;
      } else {
        console.error(`Element '${element}' not found.`);
      }
  
      if (elementClose) {
        elementClose.style.transform = !newNoteVisible.value ? "rotate(-45deg)" : "rotate(0deg)";
      } else {
        console.error(`Element '${elementClose}' not found.`);
      }*/
    }
  
    function convertToMegabytes(kilobytes: number): string {
      if (kilobytes >= 1024) {
          const megabytes = kilobytes / 1024;
          return megabytes.toFixed(3) + ' MB';
      } else {
          return kilobytes.toFixed(3) + ' KB';
      }
    }

    function changeSvg(note?: string) {
      if (noteDeletionConfirmationActive.value !== undefined) {
        noteDeletionConfirmationActive.value = undefined;
      } else {
        noteDeletionConfirmationActive.value = note;
      }
    }

    async function updateNotepadName() {
      if (updateFormData.title.trim() === '') return;

      try {
          const response = await axios.patch(`${url}/updateNote`, {
              withCredentials: true,
              notepad: true,
              directory: updateFormData.title.startsWith("/") ? updateFormData.title : `/${updateFormData.title}`,
              originalTitle: updateFormData.originalTitle.startsWith("/") ? updateFormData.originalTitle : `/${updateFormData.originalTitle}`
          });

          // console.log('Response:', response.data);

          notepadsCache.value = null;
          
          if (response.status === 200) navigateTo(updateFormData.title.startsWith("/") ? updateFormData.title : `/${updateFormData.title}`);
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          notepadsCache.value = null;

          console.error('Error:', error.message);
      }
    }

    /* DELETE NOTE */
    async function deleteNote(noteName: string) {
        let notepadId: string | undefined = noteNameToId(noteName);
        if (notepadId === undefined) return;

        try {
            const response = await axios.post(`${url}/deleteNote`, {
                withCredentials: true,
                note_id: notepadId
            });

            // console.log('Response:', response.data);

            loadNotes();
        } catch (error: any) {
            errorMessage.value = error.response.data.message;

            console.error('Error:', error.message);
        }
    }

    function noteNameToId(noteName: string): string | undefined {
      if (notes === undefined) return undefined;

      for (let i = 0; i < notes!.value!.length; i++) {
        if (notes!.value![i].title === noteName) return notes!.value![i]._id;
      }

      return undefined;
    }

    /* CHANGE NOTE NAME */

    function changeName(note: string) {
      if (noteCache !== undefined) {
        notes.value?.push(noteCache.value!);
      }

      const noteObj: NoteObject | undefined = getNoteObjectByName(note);
      if (notes.value === undefined || notes.value.length < 1 || noteObj === undefined) console.error("Error editing name of note.");
      const index = notes.value!.indexOf(noteObj!);
      if (index !== -1) {
        let items: globalThis.Ref<NoteObject[] | undefined> = ref<NoteObject[] | undefined>();
        items.value = notes.value?.splice(index, 1);
        // console.log(items.value)

        notes.value!.splice(index, 1);
      }

      // console.log(notes.value)

      noteCache.value = noteObj as NoteObject;

      renameFormData.title = note;
      renameFormData.originalTitle = note;

      setChangeNoteNameVisibility(true);
    }

    async function updateNoteName() {
      if (renameFormData.title.trim() === '') return;

      try {
          const response = await axios.patch(`${url}/updateNote`, {
              withCredentials: true,
              notepad: false,
              title: renameFormData.title.startsWith("/") ? renameFormData.title : `/${renameFormData.title}`,
              originalTitle: renameFormData.originalTitle.startsWith("/") ? renameFormData.originalTitle : `/${renameFormData.originalTitle}`
          });

          // console.log('Response:', response.data);

          noteCache.value = undefined;
          setChangeNoteNameVisibility(false);
          
          if (response.status === 200) loadNotes();
      } catch (error: any) {
          errorMessage.value = error.response.data.message;

          notepadsCache.value = null;

          console.error('Error:', error.message);
      }
    }

    /* UTILITY */
    
    function getNoteObjectByName(noteTitle: string): NoteObject | undefined {
      if (notes.value === undefined || notes.value.length < 1) return undefined;

      for (let i = 0; i < notes.value.length; i++) {
        if (notes.value[i].title === noteTitle) return notes.value[i];
      }

      return undefined;
    }

    function setChangeNoteNameVisibility(visibile: boolean) {
      const element = document.getElementById('updateNoteNameForm');

      element?.classList.remove("hidden");

      if (element) {
        element.style.display = visibile ? 'block' : 'none';
      } else {
        console.error(`Element '${element}' not found.`);
      }
    }
  </script>