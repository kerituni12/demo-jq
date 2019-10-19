$(document).ready(function () {

    /* animate first index */
    var imgGroup = $("#imgGroup");

    imgGroup.animate({
        left: 0,
        bottom: 0
    }, {
        step: function (now, fx) {
            $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 100
    });

    $('.blog-slider__title').fadeIn(1000);
    $('.blog-slider__text').fadeIn(1500);
    
    var placeholderText = [
        "Tìm hiểu jquery",
        "Nguyễn Văn Hiếu",
        "Ngô Xuân Hải",
        "Tạ Hoàng Trí",
        "Nguyễn Công Khanh"
    ];

    $('#typing').typingEf(placeholderText, $('#blog-text'));
    
    // ajax load all user
    $('.blog-slider__button').click(function () {
        $.ajax({
            url: 'users',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                var html = "";
                data.forEach(function (d, i) {
                    html += `<div class="blog-slider__img">
                                    <img id="imgPro" src="./img/${d[1].img}" alt="">
                                    <div style="padding: 12px;">
                                        <button class="view btn-pro" data-id="${i}"> view</button>
                                        <button class="edit btn-pro right" data-id="${i}"> edit</button>
                                    </div>                
                                </div>     `
                });
                $('.profile').html(html);
                $('.profile').css('display', 'flex');
                $('.blog-slider').css('margin-top', '50px');
            }
        });

    });

    /* Event view edit Profile */

    $('body').on('click', '.view', function () {

        event.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: 'users/' + id,
            type: 'GET',
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                $('#loading').show();
            },
            complete: function(){
                $('#loading').hide();
            },
            success: (data) => {
                // console.log(data);
                $('#view__name').val(data.name);
                $('#view__job').val(data.job);
                $('#view__des').val(data.des);
                $('.imgPreview').attr('src', './img/' + data.img);
                $('#imgpro').val("");
                $('#view').show();
            }
        });

        
    });

    $('body').on('click', '.edit', function (mem) {

        event.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: 'users/' + id,
            type: 'GET',
            dataType: 'json',
            cache: false,
            beforeSend: function(){
                $('#loading').show();
            },
            complete: function(){
                $('#loading').hide();
            },
            success: (data) => {

                // console.log(data);                    
                $('#edit__id').val(id);
                $('#edit__name').val(data.name);
                $('#edit__job').val(data.job);
                $('#edit__des').val(data.des);
                $('.imgPreview').attr('src', './img/' + data.img);
                $('#imgpro').val("");
                $('#edit').show();
            }
        });

       
    });

    /* Event modal */

    $('body').on('click', '.close', function () {
        $('.modal').hide();
    });

    $('#edit-form').submit(function (e) {
        e.preventDefault();
        var idpro = $('#edit__id').val();  
        var name = $('#edit__name');
        var job = $('#edit__job');
        var des = $('#edit__des');
       
        $(".error").remove();
        var check = true;
        if($(name).val().trim() == ''){
            name.after('<span class="error">Tên không được rỗng</span>')
            check=false;
        }
        if($(job).val().trim() == ''){
            job.after('<span class="error">Job không được rỗng</span>')
            check=false;
        }
        if($(des).val().trim() == ''){
            des.after('<span class="error">Des không được rỗng</span>')
            check=false;
        }

        if (check == true) {
            var data = {};
            data.id = idpro;            
    
            $(this).ajaxSubmit({
                url: 'users/' + idpro,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => {
                    
                    //must send data to run code here
                    location.reload();                   
                }
            });
        }       
        return check;

    });

    /* load preview file */
    function readURL(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();

            // console.log(input.files[0]);
            reader.onload = function (e) {
                $(".imgPreview").attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgpro").change(function () {
        readURL(this);
    });


});
