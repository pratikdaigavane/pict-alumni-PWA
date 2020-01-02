if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

function getFormData1($form, recaptcha) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        if(indexed_array[n['name'].split('-')[0]] == undefined)
            indexed_array[n['name'].split('-')[0]] = '';
        indexed_array[n['name'].split('-')[0]] += (n['value'] + ", ");
    });
    for(let i in indexed_array)
        indexed_array[i] = indexed_array[i].substr(0, indexed_array[i].length - 2);
    indexed_array['g-recaptcha-response'] = recaptcha;
    return indexed_array;
}

$(document).ready(() => {

    $('#form').submit((e) => {
        console.log('submit ok');
        e.preventDefault();
        data = getFormData1($('#form'), "");

        console.log(data);
        $("#loading").show();
        console.log('l');
        grecaptcha.ready(function () {
            grecaptcha.execute('6LehkMoUAAAAAEN6oCECJe5KtV_zU3U20_cpAMMt', {action: 'homepage'}).then(function (token) {
                data['g-recaptcha-response'] = token;
                $.ajax({
                    url: 'https://us-central1-pict-alumni.cloudfunctions.net/opendiscussion',
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
