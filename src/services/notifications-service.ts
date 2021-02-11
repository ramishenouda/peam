import Swal from 'sweetalert2'

export const success = (title: string, message?: string, callback?: () => any) => {
    Swal.fire(
        title, message, 'success'
    ).then(() => {
        if (callback)
            callback();
    })
}

export const message = (title: string, message?: string, callback?: () => any) => {
    Swal.fire(title, message)
        .then(() => {
            if (callback)
                callback();
        })
}

export const error = (title: string, message?: string, callback?: () => any) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
    }).then(() => {
        if (callback)
            callback();
        console.log('here');
    })
}
