<template>
  <!-- Before formatting: Vue attributes are unsorted -->
  <!-- v- directives should be at top, @ handlers at bottom -->
  <div
    v-if="isVisible"
    v-model="value"
    :key="itemId"
    class="container"
    data-test="app"
    id="app"
    style="padding: 20px"
    @click="handleClick"
    @input="onInput"
  >
    <button
      v-show="showButton"
      v-tooltip="tooltipText"
      :disabled="isDisabled"
      class="btn"
      id="submitBtn"
      type="button"
      @click="submit"
      @mouseenter="onHover"
    >
      Submit
    </button>

    <input
      v-focus
      v-model="username"
      :value="inputValue"
      class="form-control"
      id="usernameInput"
      name="username"
      placeholder="Enter username"
      type="text"
      @focus="onFocus"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const value = ref('')
const username = ref('')
const isDisabled = ref(false)
const showButton = ref(true)

const handleClick = () => console.log('clicked')
const onInput = () => console.log('input')
const submit = () => console.log('submit')
const onHover = () => console.log('hover')
const handleInput = () => console.log('handleInput')
const onFocus = () => console.log('focus')
</script>
