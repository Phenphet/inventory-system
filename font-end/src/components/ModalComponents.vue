<script setup lang="ts">
import { onMounted, ref } from 'vue'

  interface ModalInterface {
    titleModal?: String
    showModal: Boolean
    closeBtn: () => void
    saveBtn: () => void
  }

  defineProps<ModalInterface>()

</script>
<template>
    <div class="modal fade" :class="showModal ? 'show ' : ''" id="modal-lg" :aria-modal="showModal ? true : false" :style="showModal ? 'display: block; padding-right: 15px;': ''"
    role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Large Modal</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeBtn">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <slot>

          </slot>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeBtn">Close</button>
          <button type="button" class="btn btn-primary" @click="saveBtn">Save changes</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
