if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(document).ready(() => {

    M.AutoInit();
    $('.sidenav').sidenav();
    $(".user-view").height($(".sidenav-img").height());
    $("#loading").hide();

    $('#form').submit((e) => {
        console.log('submit ok');
        e.preventDefault();
        data = getFormData($('#form'));

        console.log(data);
        $("#loading").show();
      
        $.ajax({
            url: 'https://us-central1-pict-alumni.cloudfunctions.net/form1',
            method: "post",
            crossDomain: true,
            crossOrigin: true,
            async: true,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (res) {
                $("#loading").hide();
                M.toast({html: res.status});
            },
            error: function (err) {
                $("#loading").hide();
                console.log(err)
                M.toast({html: err})
            }
        })
    })

});
