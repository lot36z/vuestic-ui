<template>
  <va-sidebar-item
    v-for="(route, idx) in items"
    :key="idx"
    @click="setRouteActive(route)"
    :active="isRouteActive(route)"
  >
    <va-sidebar-item-content>
      <va-sidebar-item-title>
        {{ tie(route.name) }}
      </va-sidebar-item-title>
    </va-sidebar-item-content>
  </va-sidebar-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup: () => useI18n(),
  data() {
    return {
      items: [
        {
          name: "Home",
        },
        {
          name: "Docs",
        },
      ],
      activeRouteName: "Docs",
    };
  },
  methods: {
    isRouteActive(route: { name: string }) {
      return this.activeRouteName === route.name;
    },
    setRouteActive(route: { name: string }) {
      this.activeRouteName = route.name;
    },
  },
});
</script>
