$(document).ready(function () {
    new $('#example').DataTable({
        "language": {
            "lengthMenu": "Hiển thị _MENU_ kết quả mỗi trang",
            "zeroRecords": "Không có bất kỳ kết quả nào",
            "info": "Hiển thị trang _PAGE_ trong _PAGES_ trang",
            "infoEmpty": "Không có thông tin",
            "infoFiltered": "(Lọc từ _MAX_ kết quả)",
            "paginate": {
                "first": "<<",
                "last": ">>",
                "next": ">",
                "previous": "<"
            },
            "search":"Tìm kiếm:",
        }
    })
});