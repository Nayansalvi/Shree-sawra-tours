document.querySelector('#contactform').addEventListener('submit', async function(event){
  event.preventDefault();
  let email = document.querySelector('#email').value;
  let phone = document.querySelector('#phone').value;
  let err = document.querySelector('#error');
  let err2 = document.querySelector('#error2');

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phonePattern = /^[6-9]\d{9}$/;

if(!emailPattern.test(email)){
  err.textContent = "Your email might missing some characters!";
  return;
}else if(!phonePattern.test(phone)) {
  err.textContent = "Your number might not have 10 digit!";
  return;
}else{
  error.textContent = ""
}

     });