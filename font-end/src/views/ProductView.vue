<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'

import type { Product } from '@/controller/ProductController'
import { productQuery, productCreate, productUpdate, productDelete } from '@/controller/ProductController'

import ModalComponents from '@/components/ModalComponents.vue'
import TableComponents from '@/components/TableComponents.vue'

const showData = ref<Product[]>([])
const showModal = ref<Boolean>(false)
const isloadData = ref<Boolean>(true)
const isStatusModal = ref<String>('Add')

const formProduct = ref<Product>({
  product_id: 0,
  product_name: "",
  product_reorder_level: 0,
  product_unit: ""
});

const columns = [
  { data: 'product_name', title: 'ชื่อสินค้า' },
  { data: 'product_reorder_level', title: 'สินค้าต่ำกว่า' },
  { data: 'product_unit', title: 'ประเภท' },
]

onMounted(async () => {
  setTimeout(() => {
    isloadData.value = false
  }, 100)

  showData.value = await productQuery()
})

const openModalfunc = () => {
  isStatusModal.value = 'Add'
  showModal.value = !showModal.value
  clearFrom()
}

const saveBtnFunc = async () => {
  if (isStatusModal.value === 'Add') {
    const product_save = productCreate(formProduct.value)

    if (await product_save) {
      showData.value = await productQuery()
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
    const product_update = await productUpdate(formProduct.value)

    if (product_update) {
      showData.value = await productQuery()
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

const closeModalFunc = () => { showModal.value = !showModal.value }

const handleEdit = (id: Number) => {
  Swal.fire({
    icon: 'question',
    title: 'คุณต้องการแก้ไขข้อมูลหรือไม่',
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    showCloseButton: true
  }).then((result) => {
    if(result.isConfirmed){
      isStatusModal.value = 'Edit'

      showModal.value = !showModal.value

      const data = showData.value.find((items) => items.product_id === id)

      formProduct.value.product_id = data!.product_id
      formProduct.value.product_name = data!.product_name
      formProduct.value.product_reorder_level = data!.product_reorder_level
      formProduct.value.product_unit = data!.product_unit

      console.log(id)
    }
  })

}

const handleDelete = (id: Number) => {
   Swal.fire({
    icon: 'question',
    title: 'คุณต้องการลบข้อมูลหรือไม่',
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    showCloseButton: true
  }).then(async(result) => {
    if(result.isConfirmed){
      const product_delete = await productDelete(id)
      if(product_delete){
        Swal.fire({
          icon: 'success',
          title: 'ทำการลบข้อมูลเรียบร้อย',
          timer: 2000,
        })

        showData.value = await productQuery()

      }else {
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
  formProduct.value.product_id = 0
  formProduct.value.product_name = ''
  formProduct.value.product_reorder_level = 0
  formProduct.value.product_unit = ''
}
</script>

<template>
  <div v-if="isloadData" style="height: 100px;"></div>

  <section v-else class="content-header" :class="showModal ? 'modal-open ' : ''">
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

  <div class="content" v-if="isloadData">
    <div class="container-fluid">
      <div class="d-flex justify-content-center align-items-center" style="height: 500px;">
        <div class="spinner-border" role="status">
          <span class="visually-hidden"></span>
        </div>
        <p class="mt-3">&nbsp;&nbsp;&nbsp;Loading...</p>
      </div>
    </div>
  </div>

  <div class="content" v-else>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">DataTable with default features show product</h3>
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
  <div class="content">
    <div class="container-fluid">
      <ModalComponents :showModal="showModal" :closeBtn="closeModalFunc" :saveBtn="saveBtnFunc">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label>ชื่อสินค้า</label>
              <input type="text" class="form-control" placeholder="ชื่อสินค้า" v-model="formProduct.product_name">
            </div>
            <div class="form-group">
              <label>จำนวนคงเหลือ</label>
              <input type="number" class="form-control" placeholder="จำนวนคงเหลือ"
                v-model="formProduct.product_reorder_level">
            </div>
            <div class="form-group">
              <label>หน่วยของสินค้า</label>
              <input type="text" class="form-control" placeholder="หน่วย / ประเภท" v-model="formProduct.product_unit">
            </div>
          </div>
        </div>
      </ModalComponents>
    </div>
  </div>


  <div :class="showModal ? 'modal-backdrop fade show' : ''" style="transition: 0s ease-in-out ;"></div>

</template>
