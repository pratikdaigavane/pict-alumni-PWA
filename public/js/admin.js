
var gameplaying = true;
var openform = true;

$(document).ready(()=>{
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function showInTable(joshi,selector){
    
    var joshi = Object.values(joshi);
    var cols = Headers(joshi,selector);
    for(var i=0;i<joshi.length;i++) {
        var row = $('<tr/>');
        for(var colIndex =0;colIndex<cols.length;colIndex++) {
            var val = joshi[i][cols[colIndex]];
            if(val == null) val ="";
                row.append($('<td/>').html(val));
        }
        $(selector).append(row);
    }

}

function Headers(joshi,selector) {
    var columns = [];
    var header = $('<tr/>');
    for(var i=0;i<joshi.length;i++) {
        var row = joshi[i];

        for (var k in row ) {
            if($.inArray(k,columns) == -1) {
                columns.push(k);


                header.append($('<th/>').html(k));
            }
        }
    }

    $(selector).append(header);
    return columns;
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
            
            $('#fourth').css('display','none')
            $('#third').css('display','block')
            if(gameplaying) {
           showInTable(res.status,'#third');
           gameplaying = false;
            }
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
            
            $('#third').css('display','none')
            $('#fourth').css('display','block')
            if(openform) {
            showInTable(res.status, '#fourth');
            openform = false;
            
            }
        },
        error: function (err) {
            console.log(err)
        }
    });
})
$('#login').submit((e) => {
    e.preventDefault()
  
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
            alert('invalid login details')
        }
    })

})


})

