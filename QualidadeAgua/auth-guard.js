firebase.auth().onAuthStateChanged(user =>{
    const privateElements = document.querySelectorAll('.private');
    const publicElements = document.querySelectorAll('.public');
    const isRoutePrivate = document.querySelector('#private_route') !== null;

    if(privateElements.length){
        privateElements.forEach((element) => {
            element.style.display = user ? "block" : "none";
        });
        publicElements.forEach((element) => {
            element.style.display = user ? "none" : "block";
        });

        document.querySelector('.logout').addEventListener('click', () => {
            firebase.auth().signOut().then(() => {
                console.log('Deslogou');
                window.location.href = isRoutePrivate ? "../../index.html" : "index.html";
            }).catch((error) => {
                console.error(error);
            });
        });
    }else if(isRoutePrivate && !user){
        window.location.href = "pages/credentialManager/login.html"
    }
    else if(user){
        window.location.href = "index.html"
    }
})