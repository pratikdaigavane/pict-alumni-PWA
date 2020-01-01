$(document).ready(()=>{
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function showInTable(joshi){
    console.log(JSON.parse)
    $('body').html(JSON.stringify(joshi))

}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
$('#form1').click(()=>{
    $.ajax({
        url: 'https://us-central1-pict-alumni.cloudfunctions.net/getData',
        method: "post",
        crossDomain: true,
        crossOrigin: true,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({form: 'form1'}),
        headers: {
            "Authorization": "Bearer " + getCookie('auth')
        },
        success: function (res) {
           showInTable(res.status)
        },
        error: function (err) {
            console.log(err)
        }
    });
})

$('#form2').click(()=>{
    $.ajax({
        url: 'https://us-central1-pict-alumni.cloudfunctions.net/getData',
        method: "post",
        crossDomain: true,
        crossOrigin: true,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({form: 'form2'}),
        headers: {
            "Authorization": "Bearer " + getCookie('auth')
        },
        success: function (res) {
            showInTable(res.status)
        },
        error: function (err) {
            console.log(err)
        }
    });
})
$('#login').submit((e) => {
    e.preventDefault()
    $('#submit_button').addClass("disabled")
  
    var email = $('#email').val()
    var password = $('#password').val()
    console.log(email);
    console.log(password);
    $.ajax({
        url: 'https://us-central1-pict-alumni.cloudfunctions.net/adminLogin',
        method: "post",
        crossDomain: true,
        crossOrigin: true,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({"email": email, "password":password }),
        success: function (res) {          
            if(res.status == 'success')
                setCookie('auth', res.token, 1);
                $('#first').css('display','none')
                $('#second').css('display','block')
                
                    },
        error: function (err) {
            console.log(err);
            alert('Invalid Credentials')
            $('#submit_button').removeClass("disabled")
        }
    })

})


})
