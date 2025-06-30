<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { Product } from '@/controller/ProductController'
import { productQuery } from '@/controller/ProductController'

import ModalComponents from '@/components/ModalComponents.vue'
import TableComponents from '@/components/TableComponents.vue'
const showData = ref<Product[]>([])
const showModal = ref<Boolean>(false)
const isFocus = ref<any>(null)
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
  showData.value = await productQuery()
})

const openModalfunc = () => {
  showModal.value = !showModal.value
  clearFrom()
}
const saveBtnFunc = () => { console.log('save data') }
const closeModalFunc = () => { showModal.value = !showModal.value }

const handleEdit = (id: Number) => {
  console.log(id)
}

const handleDelete = (id: Number) => {
  console.log(id)
}

const clearFrom = () => {
  formProduct.value.product_id = 0
  formProduct.value.product_name = ''
  formProduct.value.product_reorder_level = 0
  formProduct.value.product_unit = ''
  // isFocus.value.focus()
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
  <ModalComponents :showModal="showModal" :closeBtn="closeModalFunc" :saveBtn="saveBtnFunc">
    <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="exampleInputFile">File input</label>
            <div class="input-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="exampleInputFile">
                <label class="custom-file-label" for="exampleInputFile">Choose file</label>
              </div>
              <div class="input-group-append">
                <span class="input-group-text">Upload</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </ModalComponents>
  <div :class="showModal ? 'modal-backdrop fade show' : ''" style="transition: 0s ease-in-out ;"></div>
</template>
