//const option = document.getElementById('settings__cust');

var primaryColor = document.querySelectorAll('.profile');


function themeColorChange(option){
    if(option.value === 'red'){
        redTheme();
    }else if(option.value === 'blue'){
        blueTheme();
    }else if(option.value === 'green'){
        greenTheme();
    }
}

function redTheme(){
    for(let i = 0; i< primaryColor.length ; i++){
      primaryColor[i].style.background = 'var(--color-profile-red-back)';
      primaryColor[i].style.backgroundImage = 'var(--color-profile-red)';
    }
  }
  function blueTheme(){
    for(let i = 0; i< primaryColor.length ; i++){
        primaryColor[i].style.background = 'var(--color-profile-blue-back)';
        primaryColor[i].style.backgroundImage = 'var(--color-profile-blue)';
    }
  }
  function greenTheme(){
    for(let i = 0; i< primaryColor.length; i++){
        primaryColor[i].style.background = 'var(--color-profile-green-back)';
        primaryColor[i].style.backgroundImage = 'var(--color-profile-green)';
    }
  }