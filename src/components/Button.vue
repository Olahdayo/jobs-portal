<template>
  <button
    :class="['btn', buttonType, sizeClass]"
    :type="type"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon"></i>
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: 'btn-primary', // Default button type
    },
    size: {
      type: String,
      default: 'btn-lg', // Default size
    },
    icon: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    sizeClass() {
      return this.size; // Return the size class
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for the button here */
</style> 