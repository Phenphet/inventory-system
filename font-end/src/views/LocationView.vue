<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

import ModalComponents from '@/components/ModalComponents.vue'
import TableComponents from '@/components/TableComponents.vue'

import type { Location } from '@/controller/LocationController'
import { locationQuery, loactionCreate, locationUpdate, locationDelete } from '@/controller/LocationController'

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

const saveBtnFunc = async () => {
  if (isStatusModal.value === 'Add') {

    const lcation_save = await loactionCreate(fromLocation.value)

    if (lcation_save) {
      showData.value = await locationQuery()
      showModal.value = !showModal.value
      clearFrom()

      Swal.fire({
        icon: 'success',
        title: 'ทำการบันทึกข้อมูลเรียบร้อย',
        timer: 2000,
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารบันทึกข้อมูลได้',
        timer: 2000,
      })
    }
  } else {

    const location_update = await locationUpdate(fromLocation.value)

    if (location_update) {
      showData.value = await locationQuery()
      showModal.value = !showModal.value
      clearFrom()

      Swal.fire({
        icon: 'success',
        title: 'ทำการแก้ไขข้อมูลเรียบร้อย',
        timer: 2000,
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถแก้ไขข้อมูลได้',
        timer: 2000,
      })
    }
  }
}

const handleEdit = (id: Number) => {
  Swal.fire({
    icon: 'question',
    title: 'คุณต้องการแก้ไขข้อมูลหรือไม่',
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    showCloseButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      isStatusModal.value = 'Edit'
      showModal.value = !showModal.value

      const data = showData.value.find((items) => items.location_id === id)

      fromLocation.value.location_id = data!.location_id
      fromLocation.value.location_name = data!.location_name
      fromLocation.value.location_province = data!.location_province
    }
  })
}
const handleDelete = (id: Number) => {

  const location_id = id

  Swal.fire({
    icon: 'question',
    title: 'คุณต้องการลบข้อมูลหรือไม่',
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    showCloseButton: true
  }).then(async (result) => {
    if (result.isConfirmed) {

      const location_delete= await locationDelete(location_id)

      if (location_delete) {
        Swal.fire({
          icon: 'success',
          title: 'ทำการลบข้อมูลเรียบร้อย',
          timer: 2000,
        })

        showData.value = await locationQuery()

      } else {
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถลบข้อมูลได้',
          timer: 2000,
        })
      }

    }
  })
}

const clearFrom = () => {
  fromLocation.value.location_name = ''
  fromLocation.value.location_province = ''
}
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
              <TableComponents :idTable="'showDataProduct'" :idField="'location_id'" :showData="showData"
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
      <input type="text" class="form-control" placeholder="ชื่อโรงงาน" v-model="fromLocation.location_province">
    </div>
  </ModalComponents>

  <div :class="showModal ? 'modal-backdrop fade show' : ''" style="transition: 0s ease-in-out ;"></div>
</template>
