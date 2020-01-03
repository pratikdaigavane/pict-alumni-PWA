function getFormData($form, recaptcha) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    indexed_array['g-recaptcha-response'] = recaptcha;
    return indexed_array;
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, false);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

$(document).ready(() => {
    includeHTML();
    M.AutoInit();
    $('.sidenav').sidenav();
    $('img[src="./img/paa.png"]').on("load", () => {
        $(".user-view").height($(".sidenav-img").height());
    });
    scrollTo(0, 0);
    $("#loading").hide();
});