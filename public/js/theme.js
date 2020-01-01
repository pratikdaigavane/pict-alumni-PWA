function getFormData($form, recaptcha) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    indexed_array['g-recaptcha-response'] = recaptcha;
    return indexed_array;
}

$(document).ready(() => {
    M.AutoInit();
    $('.sidenav').sidenav();
    $(".user-view").height($(".sidenav-img").height());
    $("#loading").hide();
});