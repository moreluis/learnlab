  <template>
    <div>
      <Navbar />
      <div class="mt-5 max-w-7xl mx-auto px-2 sm:px-4 px-8">
        <div>
          <h1 class="text-xl">Invites</h1>
          <p v-if="invitesExist" class="mb-2"> Hover over an invite to reveal it. Copy and send it to a friend so they can start using the service! </p>
          <p v-else class="line-through"> Hover over an invite to reveal it. Copy and send it to a friend so they can start using the service! </p>
        </div>
        <div v-if="invitesExist === undefined" class="mt-4 ml-4 animate-pulse rounded-full bg-slate-200 h-5 w-64"></div>
        <div v-if="invitesExist === undefined" class="mt-4 ml-4 animate-pulse rounded-full bg-slate-200 h-5 w-64"></div>
        <div v-if="invitesExist === undefined" class="mt-4 ml-4 animate-pulse rounded-full bg-slate-200 h-5 w-64"></div>
        <div v-if="invitesExist" class="mt-2">
          <p v-for="invite in invites" class="select-all blur-[5px] hover:blur-none rounded-md mono border border-white hover:border-zinc-300 transition-colors py-1 px-4 flex">
            {{ invite }} 
          </p>
        </div>
        <div v-if="invitesExist !== undefined && !invitesExist && errorMessage === undefined" class="max-w-7xl mx-auto">
          <p> You do not have a invite right now. </p>
        </div>
        <div v-if="errorMessage !== undefined" class="max-w-7xl mx-auto">
          <p> {{ errorMessage }} </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import axios from 'axios';
    const config = useRuntimeConfig();
  
    const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');
  
    let invites: globalThis.Ref<string[] | undefined> = ref<string[] | undefined>();
    let errorMessage: globalThis.Ref<string | undefined> = ref<string | undefined>();
    let invitesExist: globalThis.Ref<boolean | undefined> = ref<boolean | undefined>();
  
    onMounted(async () => {
        try {
          const response = await axios.get(`${url}/seeInvites`, {
            withCredentials: true,
          });
  
          let invs = response.data.inviteCodes;
  
          invites.value = new Array;
          for (let inv of invs) {
            invites.value!.push(inv);
          }
  
          if (invites.value.length > 0) {
            invitesExist.value = true;
          } else {
            invitesExist.value = false;
          }

          // console.log('Response:', response.data);
        } catch (error: any) {
          invitesExist.value = false;

          if (!(error.response.data.message === 'You have no invites.')) {
            errorMessage.value = error.response.data.message;
          }

          console.error('Error:', error.message);
        }
    });
  </script>