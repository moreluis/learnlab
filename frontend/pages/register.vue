<template>
  <div>
      <div class="flex items-center justify-center h-screen">
          <div class="mx-auto w-9/10 xl:w-2/5 max-w-[520px] px-10 py-20 mb-20">
              <h1 class="font-bold text-2xl text-center pb-2"> Register </h1>
              <form>
                  <div class="flex flex-col mb-2.5">
                      <label for="name" class="font-sm text-gray-700"> Username </label>
                      <div class="rounded-md border w-full flex">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 bi bi-person-dash-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                          </svg>
                          <input @input="evaluateUsername(formData.name)" type="text" id="name" v-model="formData.name" placeholder="Username ..." class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                      </div>
                      <div class="text-xs pt-0.5">
                        <div class="md:flex">
                          <div class="flex px-1 opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-sort-numeric-up-alt mr-1 md:flex-auto" style="transform: translateY(1px);" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                              <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                            </svg>
                            <p>Numbers allowed</p>
                          </div>
                          <div class="flex px-1 opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-spellcheck mr-1 md:flex-auto" style="transform: translateY(1px);" viewBox="0 0 16 16">
                              <path d="M8.217 11.068c1.216 0 1.948-.869 1.948-2.31v-.702c0-1.44-.727-2.305-1.929-2.305-.742 0-1.328.347-1.499.889h-.063V3.983h-1.29V11h1.27v-.791h.064c.21.532.776.86 1.499.86zm-.43-1.025c-.66 0-1.113-.518-1.113-1.28V8.12c0-.825.42-1.343 1.098-1.343.684 0 1.075.518 1.075 1.416v.45c0 .888-.386 1.401-1.06 1.401zm-5.583 1.035c.767 0 1.201-.356 1.406-.737h.059V11h1.216V7.519c0-1.314-.947-1.783-2.11-1.783C1.355 5.736.75 6.42.69 7.27h1.216c.064-.323.313-.552.84-.552.527 0 .864.249.864.771v.464H2.346C1.145 7.953.5 8.568.5 9.496c0 .977.693 1.582 1.704 1.582zm.42-.947c-.44 0-.845-.235-.845-.718 0-.395.269-.684.84-.684h.991v.538c0 .503-.444.864-.986.864zm8.897.567c-.577-.4-.9-1.088-.9-1.983v-.65c0-1.42.894-2.338 2.305-2.338 1.352 0 2.119.82 2.139 1.806h-1.187c-.04-.351-.283-.776-.918-.776-.674 0-1.045.517-1.045 1.328v.625c0 .468.121.834.343 1.067l-.737.92z"/>
                              <path d="M14.469 9.414a.75.75 0 0 1 .117 1.055l-4 5a.75.75 0 0 1-1.116.061l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.908 1.907 3.476-4.346a.75.75 0 0 1 1.055-.117z"/>
                            </svg>
                            <p>Underscores allowed</p>
                          </div>
                        </div>
                        <div class="md:flex">
                          <div class="flex px-1 opacity-50" id="usernameLength">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-123 mr-1 md:flex-auto" style="transform: translateY(2px);" viewBox="0 0 16 16">
                              <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
                            </svg>
                            <p>3&ndash;25 Characters</p>
                          </div>
                          <div class="flex px-1 opacity-50" id="usernameLowercase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-type mr-1" style="transform: translateY(1px);" viewBox="0 0 16 16">
                              <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
                            </svg>
                            <p>Only Lowercase Letters</p>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div class="flex flex-col mb-2.5">
                      <label for="password" class="font-sm text-gray-700"> Password </label>
                      <div class="rounded-md border w-full flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 scale-x-125 bi bi-lock-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                        </svg>
                        <input @input="evaluatePassword(formData.password)" type="password" id="password" v-model="formData.password" placeholder="Password ..." class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                      </div>
                      <div class="text-xs pt-0.5">
                          <div class="flex px-1 opacity-50" id="passwordLength">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-123 mr-1" style="transform: translateY(2px);" viewBox="0 0 16 16">
                              <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
                            </svg>
                            <p>8&ndash;60 Characters</p>
                          </div>
                          <div class="md:flex">
                            <div class="flex px-1 opacity-50" id="passwordLowerAndUppercase">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-type mr-1 md:flex-auto" style="transform: translateY(1px);" viewBox="0 0 16 16">
                                <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
                              </svg>
                              <p>Lower- and Uppercase Letters</p>
                            </div>
                            <div class="flex px-1 opacity-50" id="passwordNumber">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-sort-numeric-up-alt mr-1 md:flex-auto" style="transform: translateY(1px);" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                                <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                              </svg>
                              <p>Numbers</p>
                            </div>
                            <div class="flex px-1 opacity-50" id="passwordSpecialCharacters">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-regex mr-1 md:flex-auto" style="transform: translateY(1px);" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 1 1 .707.707Zm9.9-.707a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.314.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707ZM6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5-6.5a.5.5 0 0 0-1 0v2.117L8.257 5.57a.5.5 0 0 0-.514.858L9.528 7.5 7.743 8.571a.5.5 0 1 0 .514.858L10 8.383V10.5a.5.5 0 1 0 1 0V8.383l1.743 1.046a.5.5 0 0 0 .514-.858L11.472 7.5l1.785-1.071a.5.5 0 1 0-.514-.858L11 6.617V4.5Z"/>
                              </svg>
                              <p>Special Characters</p>
                            </div>
                          </div>
                        </div>
                  </div>
                  <div class="flex flex-col mb-5">
                      <label for="invitecode" class="font-sm text-gray-700"> Invite Code </label>
                      <div class="rounded-md border w-full flex">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 -rotate-[22.5deg] bi bi-ticket-detailed-fill" viewBox="0 0 16 16">
                            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z"/>
                          </svg>
                          <input type="invitecode" id="invitecode" v-model="formData.inviteCode" placeholder="Invite Code ..." class="appearance-none w-full py-2 pr-3 mr-1 leading-tight focus:outline-none" required>
                      </div>
                  </div>
                  <!-- INVITE CODE 2 <div class="flex flex-col mb-5">
                      <label for="invitecode" class="font-sm text-gray-700"> Invite Code </label>
                      <div class="rounded-md border w-full flex">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="p-1 my-auto mx-2 -rotate-[22.5deg] bi bi-ticket-detailed-fill" viewBox="0 0 16 16">
                            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z"/>
                          </svg>
                          <div class="ml-auto">
                            <input v-for="n in inviteCodeLength" :key="n" @input="handleInput(n, $event.target.value)" @keydown.delete="handleDelete(n, $event)" type="invitecode" id="invitecode" v-model="formData.inviteCode" maxlength="1" placeholder="-" class="custom-placeholder-color appearance-none w-5 py-2 px-1 leading-tight focus:outline-none" required>
                          </div>
                      </div>
                  </div> -->
                  <div class="flex items-center justify-between mb-5">
                      <button @click.prevent="submitForm" class="flex justify-center rounded-md appearance-none border w-full py-2 px-3 bg-primaryaccent text-white leading-tight focus:outline-none">
                          <p style="transform: translateY(1px);">Register</p>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                          </svg>
                      </button>
                  </div>
              </form>
              <div v-if="registerFailure" class="rounded-md border border-red-500 bg-red-200 text-red-500 w-full py-1.5 px-1 flex flex items-center justify-between">
                  <p class="mx-auto flex">
                      <svg v-if="registerFailureServersideError" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto bi bi-bug-fill" viewBox="0 0 16 16">
                          <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
                          <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="p-1 my-auto bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                      <span class="pl-1">{{ errorMessage }}</span> 
                  </p>
              </div>
              <span class="text-sm text-red-500" v-if="registerFailureServersideError"> This error is not your fault. Reload the page or try again later. </span> 
          </div>
      </div>
  </div>
</template>

<style>
.custom-placeholder-color::placeholder {
  color: #000000;
}
</style>

<script setup lang="ts">
  import axios from 'axios';
  const config = useRuntimeConfig();

  let usernameLength: boolean = false;
  let usernameLowercase: boolean = false;
  let usernameUnderscore: boolean = false;
  
  let passwordLength: boolean = false;
  let passwordLowercase: boolean = false;
  let passwordUppercase: boolean = false;
  let passwordDigit: boolean = false;
  let passwordSpecialCharacters: boolean = false;

  const formData = {
    name: '',
    password: '',
    inviteCode: '',
  };

  
  let registerFailure: globalThis.Ref<boolean> = ref<boolean>(false);
  let registerFailureServersideError: globalThis.Ref<boolean> = ref<boolean>(false);
  let errorMessage: globalThis.Ref<string | null> = ref<string | null>(null);

  async function submitForm() {
    try {
      const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

      const response = await axios.post(`${url}/register`, {
        username: formData.name.toLowerCase(),
        password: formData.password,
        inviteCode: formData.inviteCode,
      });
            
      if (response.status.toString().startsWith("2")) {
          navigateTo('login')
      }
    } catch (error: any) {
      registerFailure.value = true;

      if (error.message.slice(-3).startsWith("5")) {
          registerFailureServersideError.value = true;
      }

      errorMessage.value = error.response.data.message;

      console.error('Error:', error.message);
    }
  }

  /* Username requirements
      - Can contain lowercase letters (a-z), digits (0-9) and underscores ("_")
      - Is at least 3 characters long and at most 25 characters long
  
    Password requirements
      - Contains at least one lowercase letter (a-z)
      - Contains at least one uppercase letter (A-Z)
      - Contains at least one digit (0-9)
      - Contains at least one special character like (!@#$%^&*()-_=+[]{}|;:'",.<>?/~`)

      - Is at least 8 characters long and at most 60 characters long
  
    const usernamePattern: RegExp = /^[a-z0-9_]{3,25}$/;
    const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`])[a-zA-Z\d!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`]{8,60}$/;
  */

  function evaluateUsername(usernameParameter: string) {
    usernameLength = usernameParameter.length >= 3 && usernameParameter.length <= 25;
    usernameLowercase = /^[a-z]+$/.test(usernameParameter);
    usernameUnderscore = /_/.test(usernameParameter);

    if (usernameLength) {
      setElementOpacity("usernameLength", 1);
    } else {
      setElementOpacity("usernameLength", 0.5);
    }

    if (usernameLowercase) {
      setElementOpacity("usernameLowercase", 1);
    } else {
      setElementOpacity("usernameLowercase", 0.5);
    }
  }

  function evaluatePassword(passwordParameter: string) {
    passwordLength = passwordParameter.length >= 8 && passwordParameter.length <= 60;
    passwordLowercase = /[a-z]/.test(passwordParameter);
    passwordUppercase = /[A-Z]/.test(passwordParameter);
    passwordDigit = /\d/.test(passwordParameter);
    passwordSpecialCharacters = /[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`]/.test(passwordParameter);

    if (passwordLength) {
      setElementOpacity("passwordLength", 1);
    } else {
      setElementOpacity("passwordLength", 0.5);
    }

    if (passwordLowercase && passwordUppercase) {
      setElementOpacity("passwordLowerAndUppercase", 1);
    } else {
      setElementOpacity("passwordLowerAndUppercase", 0.5);
    }

    if (passwordDigit) {
      setElementOpacity("passwordNumber", 1);
    } else {
      setElementOpacity("passwordNumber", 0.5);
    }

    if (passwordSpecialCharacters) {
      setElementOpacity("passwordSpecialCharacters", 1);
    } else {
      setElementOpacity("passwordSpecialCharacters", 0.5);
    }
  }

  function setElementOpacity(elementId: string, value: number) {
    const element = document.getElementById(elementId);

    if (element) {
      element.style.opacity = String(value);
    } else {
      console.error(`Element '${element}' not found.`);
    }
  }

</script>