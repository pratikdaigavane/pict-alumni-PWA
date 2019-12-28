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

    var token;
    grecaptcha.ready(function () {
        grecaptcha.execute('6LehkMoUAAAAAEN6oCECJe5KtV_zU3U20_cpAMMt', {action: 'homepage'}).then(function (t) {
            token = t;
        });
    });
        $('.sidenav').sidenav();
        $(".user-view").height($(".sidenav-img").height());

    $("#loading").hide();

    $('#form').submit((e) => {
        console.log('submit ok');
        e.preventDefault();
        data = getFormData($('#form'));
        if (data.q7 == 'yes') {
            if ($("#text_q7").val() == '') {
                M.toast({html: "In Q7, if yes please mention"});
                return;
            }
            data.q7 = $("#text_q7").val()
        }
        if (data.q8 == 'yes') {
            if ($("#text_q8").val() == '') {
                M.toast({html: "In Q8, if yes please mention"});
                return;
            }
            data.q8 = $("#text_q8").val()
        }
        if (data.q9 == 'yes') {
            if ($("#text_q9").val() == '') {
                M.toast({html: "In Q9, if yes please mention"});
                return;
            }
            data.q9 = $("#text_q9").val()
        }
        data['g-recaptcha-response'] = token;
        console.log(data);
        $("#loading").show();
        console.log('l')
        $.ajax({
            url: 'https://us-central1-pict-alumni.cloudfunctions.net/form2',
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
