<template>
  <va-button-toggle
    toggle-color="black"
    color="#7e06ae"
    v-model="model"
    :options="options"
    class="mb-4"
  />
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
        { label: "Three", value: "three" },
      ],
      model: "two",
    };
  },
};
</script>
