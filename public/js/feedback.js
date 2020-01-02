if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

$(document).ready(() => {

    $('#form').submit((e) => {
        console.log('submit ok');
        e.preventDefault();
        data = getFormData($('#form'), "");
        console.log(data);
        $("#loading").show();
        console.log('l');
        grecaptcha.ready(function () {
            grecaptcha.execute('6LehkMoUAAAAAEN6oCECJe5KtV_zU3U20_cpAMMt', {action: 'homepage'}).then(function (token) {
                data['g-recaptcha-response'] = token;
                $.ajax({
                    url: 'https://us-central1-pict-alumni.cloudfunctions.net/form2',
                    method: "post",
                    crossDomain: true,
                    crossOrigin: true,
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": "Bearer " + getCookie('auth')
                    },
                    success: function (res) {
                        $("#loading").hide();
                        M.toast({html: res.status});
                        window.location = '/response.html'
                    },
                    error: function (err) {
                        $("#loading").hide();
                        console.log(err)
                        M.toast({html: JSON.parse(err.responseText).status})
                    }
                });
            });
        });
    })

});
