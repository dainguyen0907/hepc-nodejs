$(document).ready(function () {
  var deleteModal = document.getElementById('deleteModal')
  if (deleteModal) {
    deleteModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var object_id = deleteModal.querySelector('#object_id')
      var object_id_modal = deleteModal.querySelector('#object_id_modal')

      object_id_modal.textContent = id
      object_id.value = id
    });
  }

  var resetModal = document.getElementById('resetPasswordModal')
  if (resetModal) {
    resetModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var object_id = resetModal.querySelector('#object_id')
      object_id.value = id
    });
  }

  var updateDepartmentModal = document.getElementById('updateDepartmentModal')
  if (updateDepartmentModal) {
    updateDepartmentModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var name = button.getAttribute('data-name')
      var status = button.getAttribute('data-status')
      var object_id = updateDepartmentModal.querySelector('#object_id')
      var object_name = updateDepartmentModal.querySelector("#department_name")
      var object_status_true = updateDepartmentModal.querySelector("#department_status_true")
      var object_status_false = updateDepartmentModal.querySelector("#department_status_false")
      object_id.value = id
      object_name.value = name
      if (status == 1) {
        object_status_true.setAttribute('checked', 'checked')
      } else {
        object_status_false.setAttribute('checked', 'checked')
      }
    });
  }

  var updateBannerModal = document.getElementById('updatebannerModal')
  if (updateBannerModal) {
    updateBannerModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var content = button.getAttribute('data-content')
      var status = button.getAttribute('data-status')
      var object_id = updateBannerModal.querySelector('#object_id')
      var object_content = updateBannerModal.querySelector("#banner_content")
      var object_status_true = updateBannerModal.querySelector("#banner_status_true")
      var object_status_false = updateBannerModal.querySelector("#banner_status_false")
      object_id.value = id
      object_content.value=content
      if (status == 1) {
        object_status_true.setAttribute('checked', 'checked')
      } else {
        object_status_false.setAttribute('checked', 'checked')
      }
    });
  }

});