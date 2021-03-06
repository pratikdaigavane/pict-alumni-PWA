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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(() => {
    if(getCookie('opendiscussion'))
        document.location = 'home.html';

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
                        setCookie('opendiscussion', true, 2);
                        window.location = './response.html'
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
