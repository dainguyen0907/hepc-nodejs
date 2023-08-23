var deleteModal = document.getElementById('deleteModal')
deleteModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget
  var id = button.getAttribute('data-id')
  var object_id = deleteModal.querySelector('#object_id')
  var object_id_modal = deleteModal.querySelector('#object_id_modal')

  object_id_modal.textContent = id
  object_id.value = id
})