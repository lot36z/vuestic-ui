<template>
  <div class="va-file-upload-undo">
    <span>File was successfully deleted</span>
    <va-button
      class="va-file-upload-undo__button"
      size="small"
      outline
      @click="$emit('recover')"
    >
      Undo
    </va-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { VaButton } from '../../va-button'

export default defineComponent({
  name: 'VaFileUploadUndo',
  components: {
    VaButton,
  },
  emits: ['recover'],
})
</script>

<style lang="scss">
@import 'variables';

.va-file-upload-undo {
  height: var(--va-file-upload-undo-height);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    line-height: var(--va-file-upload-undo-button-line-height);
    margin-left: var(--va-file-upload-undo-margin-left);
    margin-top: var(--va-file-upload-undo-button-margin-top);
    margin-bottom: var(--va-file-upload-undo-button-margin-bottom);
  }
}
</style>
