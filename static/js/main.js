+ function($) {
    "use strict";

    const origin = window.location.origin
    const canvas = document.getElementById('canvas')
    const qrcodedraw = new QRCodeLib.QRCodeDraw()

    const $input_first = $('#input-first')

    function renderCode(content) {
        qrcodedraw.draw(canvas, content, function(err, canvas){
          if(err) return console.log(err);
          console.log('success!')
        })
    }

    $('#btn-sure-first').click(function(){
        const content = $input_first.val()
        if (content != '') {
            $.post('/send', {content: content}, function(res) {
                if (res.status && res.url) {
                    console.log(origin + res.url)
                    renderCode(origin + res.url)
                }
            })
        }
    })

}(jQuery)
