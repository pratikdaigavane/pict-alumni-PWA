if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
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

    $('#form').submit((e) => {
        console.log('submit ok');
        e.preventDefault();
        data = $("#email").val();
        $("#loading").show();
        grecaptcha.ready(function () {
            grecaptcha.execute('6LehkMoUAAAAAEN6oCECJe5KtV_zU3U20_cpAMMt', {action: 'homepage'}).then(function (token) {
                $.ajax({
                    url: 'https://us-central1-pict-alumni.cloudfunctions.net/login',
                    method: "post",
                    crossDomain: true,
                    crossOrigin: true,
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify({"email": data, "g-recaptcha-response": token}),
                    success: function (res) {
                        $("#loading").hide();
                        M.toast({html: res.status});
                        document.cookie="feedback=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                        document.cookie="opendiscussion=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                        if(res.status == 'success')
                            setCookie('auth', res.token, 1);

                        if(findGetParameter('redirect'))
                            window.location = findGetParameter('redirect');
                        else
                            window.location = "/home.html"
                    },
                    error: function (err) {
                        $("#loading").hide();
                        console.log(err);
                        M.toast({html: JSON.parse(err.responseText).status})
                    }
                })
            });
        });
    })

});
