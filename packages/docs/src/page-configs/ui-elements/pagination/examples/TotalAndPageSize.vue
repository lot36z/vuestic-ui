<template>
  <va-pagination
    :visible-pages="7"
    v-model="value"
    :total="100"
    boundary-numbers
    :page-size="10"
  />
  Current value: {{ value }}
</template>

<script>
export default {
  data () {
    return {
      value: 11,
    }
  },
}
</script>
