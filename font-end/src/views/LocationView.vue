<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import ModalComponents from '@/components/ModalComponents.vue'
import TableComponents from '@/components/TableComponents.vue'

import type { Location } from '@/controller/LocationController'
import { locationQuery } from '@/controller/LocationController'

const showData = ref<Location[]>([])
const showModal = ref<Boolean>(false)
const isStatusModal = ref<String>('Add')
const fromLocation = ref<Location>({
  location_id: 0,
  location_name: '',
  location_province: ''
})

const columns = [
  { data: 'location_name', title: 'ตำแหน่ง' },
  { data: 'location_province', title: 'โรงงาน' },
]

onMounted(async () => {
  showData.value = await locationQuery()
})



const openModalfunc = () => {
  isStatusModal.value = 'Add'
  showModal.value = !showModal.value
}

const closeModalFunc = () => {
  showModal.value = !showModal.value
}

const saveBtnFunc = () => {
  if( isStatusModal.value === 'Add') {
    console.log('save-data')
  }else{
    console.log('edit-data')
  }
 }

const handleEdit = () => {}
const handleDelete = () => {}
</script>

<template>
  <section class="content-header" :class="showModal ? 'modal-open ' : ''">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Product</h1>
        </div>
        <div class="col-sm-6">
          <div class="float-sm-right">
            <button type="button" class="btn btn-success" @click="openModalfunc">เพิ่มรายการสินค้า</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">DataTable with default features show location</h3>
            </div>
            <div class="card-body">
              <TableComponents :idTable="'showDataProduct'" :idField="'product_id'" :showData="showData"
                :columns="columns" :handleEdit="handleEdit" :handleDelete="handleDelete"></TableComponents>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalComponents :showModal="showModal" :closeBtn="closeModalFunc" :saveBtn="saveBtnFunc">
    <div class="form-group">
      <label>ชื่อคลัง</label>
      <input type="text" class="form-control" placeholder="ชื่อคลัง" v-model="fromLocation.location_name">
    </div>
    <div class="form-group">
      <label>ชื่อโรงงาน</label>
      <input type="text" class="form-control" placeholder="ชื่อโรงงาน"  v-model="fromLocation.location_province">
    </div>
  </ModalComponents>

  <div :class="showModal ? 'modal-backdrop fade show' : ''" style="transition: 0s ease-in-out ;"></div>
</template>
