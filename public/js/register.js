if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}


$(document).ready(() => {

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
            headers: {
                "Authorization": "Bearer " + getCookie('auth')
            },
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
