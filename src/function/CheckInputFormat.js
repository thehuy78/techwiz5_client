export const InvalidString = (value) => {
    const namePattern = /^[A-Za-z\s]{1,15}$/;
    if (!value.match(namePattern)) {
        return false;
    }
    return true;
}




export const InvalidPhoneNumber = (value) => {
    const phonePattern = /^0\d{8,14}$/;
    if (!value.match(phonePattern)) {
        return false;
    }
    return true;
}



export const InvalidPassword = (value) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    if (!value.match(passwordPattern)) {
        return false;
    }
    return true;
}


