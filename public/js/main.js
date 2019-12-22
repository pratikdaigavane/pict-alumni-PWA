if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/sw.js');
}
$(document).ready(() => {
    $('#send').submit((e)=>{
        e.preventDefault();
        var message = $('#message').val();
        $.ajax({
            url: 'https://us-central1-pict-alumni.cloudfunctions.net/messageMe',
            method: "post",
            crossDomain: true,
            crossOrigin: true,
            async: false,
            contentType: "application/json",
            data: JSON.stringify({
                text: message
            }),
            success: function (res) {
                M.toast({html: res.message.text});
            },
            error: function (err) {
                alert(err);
            }
        })
    })

});
