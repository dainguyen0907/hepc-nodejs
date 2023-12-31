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
  var updateCatalogueModal = document.getElementById('updateCatalogueModal')
  if (updateCatalogueModal) {
    updateCatalogueModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var name = button.getAttribute('data-name')
      var department = button.getAttribute('data-department')
      var status = button.getAttribute('data-status')
      var object_id = updateCatalogueModal.querySelector('#object_id')
      var object_name = updateCatalogueModal.querySelector("#catalogue_name")
      var object_department = updateCatalogueModal.querySelector("#catalogue_department")
      var object_status_true = updateCatalogueModal.querySelector("#catalogue_status_true")
      var object_status_false = updateCatalogueModal.querySelector("#catalogue_status_false")
      object_id.value = id
      object_name.value=name
      object_department.value=department
      if (status == 1) {
        object_status_true.setAttribute('checked', 'checked')
      } else {
        object_status_false.setAttribute('checked', 'checked')
      }
    });
  }

var updatePhotoModal = document.getElementById('updatePhotoModal')
  if (updatePhotoModal) {
    updatePhotoModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var content = button.getAttribute('data-content')
      var department = button.getAttribute('data-department')
      var status = button.getAttribute('data-status')
      var censor = button.getAttribute('data-censor')
      var object_id = updatePhotoModal.querySelector('#object_id')
      var object_content = updatePhotoModal.querySelector("#photo_content")
      var object_department = updatePhotoModal.querySelector("#photo_department")
      var object_status_true = updatePhotoModal.querySelector("#photo_status_true")
      var object_status_false = updatePhotoModal.querySelector("#photo_status_false")
      var object_censor_true = updatePhotoModal.querySelector("#photo_censor_true")
      var object_censor_false = updatePhotoModal.querySelector("#photo_censor_false")
      object_id.value = id
      object_content.value=content
      if(object_department)
      {
        object_department.value=department
      }
      if (status == 1) {
        object_status_true.setAttribute('checked', 'checked')
      } else {
        object_status_false.setAttribute('checked', 'checked')
      }
      if(censor==1){
        object_censor_true.setAttribute('checked', 'checked')
      } else {
        object_censor_false.setAttribute('checked', 'checked')
      }
    });
  }
  var censorArticleModal = document.getElementById('censorArticleModal')
  if (censorArticleModal) {
    censorArticleModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget
      var id = button.getAttribute('data-id')
      var object_id = censorArticleModal.querySelector('#object_id')
      object_id.value = id
    });
  }
});