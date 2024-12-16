<template>
  <router-link :to="to" class="btn" :class="buttonType" :size="size">
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: 'btn-primary',
    },
    size: {
      type: String,
      default: 'btn-md',
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for the button here */
</style> 