// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// var user;

// $(document).ready(() => {
//     if(getCookie('auth')=="" || getCookie('auth')==null)
//     {
//         window.location = "/";
//         M.toast({html: "Please login"})
//     }else
//     {
//         $.ajax({
//             url: 'https://us-central1-pict-alumni.cloudfunctions.net/check',
//             method: "post",
//             crossDomain: true,
//             crossOrigin: true,
//             async: true,
//             contentType: "application/json",
//             headers: {
//                 "Authorization": "Bearer " + getCookie('auth')
//             },
//             success: function(res){
//                 if(res.status == "success") {
//                     console.log("Auth successful");
//                     user = res.user;
//                     $(".email").text(user);
//                 }
//             },
//             error: function (err) {
//                 window.location = "/?redirect=" + window.location.href;
//                 M.toast({html: "Please login"})
//             }
//         })
//     }
// });