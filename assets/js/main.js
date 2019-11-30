const socket = io()


//login
$('#submit_name').submit(e => {
    e.preventDefault()
    const username = $('#username').val()

    //check username jika kosong
    if (!username) {
        showValidate($('#username'))
        $('.danger').removeClass('hidden')
        $('.danger').text('username kosong')
        // $('#cobaLagi').removeClass('hidden')
        // $('#cobaLagi').addClass('gagal')
        // $('.login100-form-btn').append(' Lagi')
    } else if (/\s/.test(username)) {
        showValidate($('#username'))
        $('.danger').removeClass('hidden')
        $('.danger').text('username mengandung spasi..isi woy minta &nbsp; ditampol po..')
    } else {
        // kirim data username keserver
        // dengan membuat key and value
        socket.emit('loginUser', username)     
    }
})

socket.on('loginResponse', status => {
    if (status) {
        $('#login').addClass('hidden')
        $('#chatroom').removeClass('hidden')
    } 
})

const showValidate = input => {
    const alert = $(input).parent()

    $(alert).addClass('alert-validate')
}

// masih belum work

// $('.reset').submit(e1 => {
//     e1.preventDefault('.reset')
//     var username1 = $('#username').val()

//     $(username1).reset()
// })