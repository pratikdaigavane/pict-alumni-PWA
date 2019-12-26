// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/pict-alumni-PWA/public/sw.js');
// }

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(document).ready(() => {

    $('#form').submit((e)=>{
        console.log('submit ok')
        e.preventDefault();
        data = getFormData($('#form'))
        if(data.q7 == 'yes')
            data.q7 = $("#text_q7").val()
        if(data.q8 == 'yes')
            data.q8 = $("#text_q8").val()
        if(data.q9 == 'yes')
            data.q9 = $("#text_q9").val()
        console.log(data)
        // var message = $('#message').val();
        $.ajax({
            url: 'https://us-central1-pict-alumni.cloudfunctions.net/form2',
            method: "post",
            crossDomain: true,
            crossOrigin: true,
            async: false,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (res) {
                M.toast({html: res.status});
            },
            error: function (err) {
                console.log(err)
            }
        })
    })

});
