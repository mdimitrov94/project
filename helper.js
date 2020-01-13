export const partials = {
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs'

}

export function sessionInfo(data) {
    sessionStorage.setItem('id', data._id)
    sessionStorage.setItem('name', data.username);
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
}

export function getUserInfo(ctx) {
    ctx.name = sessionStorage.getItem('name')
    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
    ctx.id = sessionStorage.getItem('id')
}

export function checkInput() {
    return [ ...arguments ].some(x => x.trim() === '');
}

export function displaySucces(message){
    const successBox = document.getElementById('successBox')
    successBox.style.display = 'block'
    successBox.textContent = message
    setTimeout(()=>{
        successBox.style.display = 'none'
    }, 4000)
}
export function displayLoading(){
    const loadingBox = document.getElementById("loadingBox");
    loadingBox.style.display = "block";
    setTimeout(() => {
        loadingBox.style.display = "none"
    }, 2000);
}
export function displayError(message){
    const errorBox = document.getElementById("errorBox");
    errorBox.style.display = "block";
    errorBox.textContent = message;
    setTimeout(() => {
        errorBox.style.display = "none"
    }, 2000);
}