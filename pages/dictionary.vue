<template>
  <div>
    <div class="flex h-screen flex-col items-center justify-center p-10">
      <div class="flex h-1/2 w-full flex-col items-center justify-center p-10">
        <p class="text-center text-4xl font-bold tracking-tight 2xl:text-8xl">
          Urban(ist) Dictionary {{ selectedComponentName }}
        </p>
        <div class="mt-4 w-full md:mt-8 md:w-1/2">
          <HeadlessCombobox v-model="selected">
            <div class="relative mt-1">
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
              >
                <HeadlessComboboxButton class="absolute inset-y-0 flex items-center pl-2">
                  <Icon name="material-symbols:search" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </HeadlessComboboxButton>
                <HeadlessComboboxInput
                  class="w-full border-none bg-white py-2 pl-10 pr-3 text-sm leading-5 text-gray-900 focus:ring-0"
                  :display-value="(term) => term.title"
                  @change="query = $event.target.value"
                />
              </div>
              <HeadlessTransitionRoot
                leave="transition ease-in duration-100"
                leave-from="opacity-100"
                leave-to="opacity-0"
                @after-leave="query = ''"
              >
                <HeadlessComboboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredTerms.length === 0 && query !== ''"
                    class="relative cursor-default select-none px-4 py-2 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <HeadlessComboboxOption
                    v-for="term in filteredTerms"
                    :key="term.id"
                    v-slot="{ active }"
                    as="template"
                    :value="term"
                  >
                    <li
                      class="relative cursor-default select-none px-4 py-2"
                      :class="{
                        'bg-teal-600 text-white': active,
                        'text-gray-900': !active
                      }"
                    >
                      <span class="block truncate font-medium">
                        {{ term.title }}
                        <span
                          class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                        >
                          {{ term.category }}
                        </span>
                        <span class="pl-2 font-normal" :class="{ 'text-gray-100': active, 'text-gray-600': !active }">
                          {{ term.description }}
                        </span>
                      </span>
                    </li>
                  </HeadlessComboboxOption>
                </HeadlessComboboxOptions>
              </HeadlessTransitionRoot>
            </div>
          </HeadlessCombobox>
        </div>
      </div>
    </div>
    <info :term="selectedComponentName" />
  </div>
</template>

<script setup lang="ts">
import termsJson from '~/assets/data/terms.json'

const terms: Term[] = termsJson

const selected = ref(terms[0])
const query = ref('')
const selectedComponentName = computed(() => {
  const selectedWithoutSpaces = selected.value.title.replace(/\s+/g, '')
  return 'Dictionary' + selectedWithoutSpaces
})

const filteredTerms = computed(() =>
  query.value === ''
    ? terms
    : terms.filter((person) => {
        const lowercaseQuery = query.value.toLowerCase().replace(/\s+/g, '')
        const lowercaseTitle = person.title.toLowerCase().replace(/\s+/g, '')
        const lowercaseAlts = person.alts.map((alt) => alt.toLowerCase().replace(/\s+/g, ''))

        return lowercaseTitle.includes(lowercaseQuery) || lowercaseAlts.some((alt) => alt.includes(lowercaseQuery))
      })
)
</script>
