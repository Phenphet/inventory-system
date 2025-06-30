<script setup lang="ts">

  import { onMounted, ref, watch } from 'vue'

  interface TableInterface {
    idTable: string
    showData: any[]
    columns: {data: string, title: string}[]
    idField: string
    handleEdit: (id: any) => void
    handleDelete: (id: any) => void
  }

  const props = defineProps<TableInterface>()

  const renderActionButtons = (rowId: string | number): string => {
  return `
    <button class="btn btn-sm btn-warning edit-btn" data-id="${rowId}">
      <i class="fa-solid fa-pen-to-square"></i> Edit
    </button>
    <button class="btn btn-sm btn-danger delete-btn" data-id="${rowId}">
      <i class="fa-solid fa-delete-left"></i> Delete
    </button>
  `
}

  onMounted(() => {
    const dataTable = $(`#${props.idTable}`).DataTable({
      "responsive": true,
      "lengthChange": false,
      "autoWidth": false,
      "data": props.showData,
      columns: [
        ...props.columns,
        {
          data: null,
          title: "",
          orderable: false,
          render: (data: any, type: string, row: any) => {
            const id = row[props.idField]
            return renderActionButtons(id)
          }
        }
      ],
      // "buttons": [, "csv", "excel"]
    })

    $(`#${props.idTable} tbody`).on('click', '.edit-btn', function (this: HTMLElement) {
      const id = $(this).data('id')
      props.handleEdit(id)
    })

    $(`#${props.idTable} tbody`).on('click', '.delete-btn', function (this: HTMLElement) {
      const id = $(this).data('id')
      props.handleDelete(id)
    })

    watch(() => props.showData, (newData) => {
      dataTable.clear().rows.add(newData).draw()
    })
  })
</script>

<template>
 <table :id="props.idTable" class="table table-bordered table-striped "></table>
</template>
