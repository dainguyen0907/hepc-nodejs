$(document).ready(function () {
    $('#article_department').change(function (e) {
        e.preventDefault();
        var department_id=$('#article_department').val();
        $.ajax({
            url:"/ajax/getDatatableFromSelectBox",
            type:"POST",
            data:{
                "department_id":department_id,
            },
            success: function(data){
                $('#example').html(data.strData);
                $('#example').DataTable({
                    destroy: true,   
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
                    },
                    "columnDefs":[
                        { target:2,
                            render:function(data,type,row){
                                return data.length>50?
                                data.substr(0,50)+'...':
                                data;
                            }
                        }
                    ]
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(JSON.stringify(jqXHR));
                console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
         }
        });
    })
})