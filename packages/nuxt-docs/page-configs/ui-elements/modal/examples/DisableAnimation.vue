<template>
  <p>
    <va-button @click="showModal = !showModal">
      Show modal (without animations)
    </va-button>
    <va-modal v-model="showModal" without-transitions :message="message" />
  </p>
</template>

<script>
import message from "./popup-message";

export default {
  data() {
    return {
      showModal: false,
      message,
    };
  },
};
</script>
