function allGoodToGo() {
    let form = document.querySelector('#form_element');
    let emailValid = checkEmail();
    let passwordValid = checkPassword();

    if (emailValid && passwordValid) {
        let allGoodPara = document.createElement('p');
        allGoodPara.classList.add('correct');
        allGoodPara.innerText = `All good to go!`;

        form.appendChild(allGoodPara);
    }
}

function checkEmail(){
    let inputValue = document.getElementById("email").value;
    let errorPara = document.querySelector('#para1');
    
    if(inputValue.length > 2 && inputValue.includes('@') && inputValue.includes('.')){
        errorPara.style.display = `none`;
        return true;
    }
    else{
        errorPara.style.display  = `block`;
        return false;
    }
}


function checkPassword(){
    let inputValue2 = document.getElementById('password').value;
    let errorPara2 = document.getElementById('para2');

    if(inputValue2.length > 7){
        errorPara2.style.display = `none`;
        return true;
    }
    else{
        errorPara2.style.display = `block`;
        return false;
    }
}

function confirmWindow(){
    let confirm = window.confirm('Are you sure you want to submit?');

    if(confirm === true){
        alert("successful signup!");
    }
    else{
        location.reload();
    }
}