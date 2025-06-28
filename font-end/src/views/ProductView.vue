<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Product } from '@/controller/ProductController'
import { productQuery } from '@/controller/ProductController'


const showData = ref<Product[]>([])

onMounted(async () => {

  showData.value = await productQuery()

  const dataTable = $("#example1").DataTable({
    "responsive": true,
    "lengthChange": false,
    "autoWidth": false,
    "data": showData.value,
     columns: [
      { data: "product_name", title: "ชื่อสินค้า" },
      { data: "product_reorder_level", title: "สินค้าต่ำกว่า" },
      { data: "product_unit", title: "หน่วยเรียก" },
      {
        data: null,
         title: "",
        orderable: false,
        render: (data: Product, type: string, row: Product) => {
          return `
            <button class="btn btn-sm btn-warning edit-btn" data-id="${row.product_id}"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${row.product_id}"><i class="fa-solid fa-delete-left"></i> Delete</button>

          `
        }
      }
    ],
    "buttons": [, "csv", "excel"]
  })
  dataTable.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)')

   $('#example1 tbody').on('click', '.edit-btn', function (this: HTMLElement) {
    const id = $(this).data('id')
    handleEdit(id)
  })

  $('#example1 tbody').on('click', '.delete-btn', function (this: HTMLElement) {
    const id = $(this).data('id')
    handleDelete(id)
  })
})

const handleEdit = (id: Number) => {
  console.log(id)
}

const handleDelete = (id: Number) => {
  console.log(id)
}
</script>

<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Product</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <button class="btn btn-success">เพิ่มรายการสินค้า</button>
          </ol>
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
              <h3 class="card-title">DataTable with default features</h3>
            </div>
            <div class="card-body">
                <table id="example1" class="table table-bordered table-striped "></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
