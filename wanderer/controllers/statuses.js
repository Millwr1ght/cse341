//Bad Request
export const err400 = (res, msg = 'Data can not be empty!') => {
    return res.status(400).send({
        message: msg,
    });
}

//none content
export const err404 = (res, msg = 'Nothing found :[') => {
    return res.status(404).send({
        message: msg,
    });
}

//Our bad
export const err500 = (res, msg = 'Something went wrong our our end. :[') => {
    return res.status(500).send({
        message: msg,
    });
}

//Not implemented
export const err501 = (res, msg = 'TODO: this') => {
    return res.status(501).send({
        message: msg,
    });
}

//OK
export const success200 = (res, body, msg = 'OK!') => {
    return res.status(200).send({
        message: msg,
        ...body
    })
}

//Created the thing!
export const success201 = (res, body, msg = 'OK!') => {
    return res.status(201).send({
        message: msg,
        ...body
    })
}

//It worked! (no content) (PUT/DELETE)
export const success204 = (res, msg = 'Success!') => {
    return res.status(204).send({
        message: msg
    })
}