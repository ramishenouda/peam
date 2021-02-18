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

export const confirm = (title: string, text: string) => {
    return Swal.fire({
        title: title,
        html: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#64ce60',
        confirmButtonText: 'Yes, delete it!'
    })
}

export const confirmText = (title: string, text: string, placeHolder: string, confirmationText: string) => {
    return Swal.fire({
        title: title,
        html: text,
        input: 'text',
        inputPlaceholder: placeHolder,
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#64ce60',
        confirmButtonText: 'Confirm',
      })
}

export const error = (title: string, message?: string, callback?: () => any) => {
    Swal.fire({
        icon: 'error',
        title: title,
        html: message,
    }).then(() => {
        if (callback)
            callback();
    })
}
