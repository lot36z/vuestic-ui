<template>
  <div class="flex lg6 xs12">
    <va-progress-circle class="mr-4" :modelValue="value">
      {{ value + "%" }}
    </va-progress-circle>
    <va-progress-circle indeterminate> ... </va-progress-circle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 65,
    };
  },
};
</script>
