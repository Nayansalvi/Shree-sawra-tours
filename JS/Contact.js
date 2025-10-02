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
try{
const PhoneRes = await
fetch(`https://apilayer.net/api/validate?access_key=YOUR_API_KEY&number=${phone}&country_code=IN`)
    const phonedata = await PhoneRes.json;
      if(!PhoneData.valid){
        err2.textContent = "❌ Enter a valid phone number!";
        return;
    } else {
       err2.textContent = "";
    }
document.querySelector("#contactform").submit();
}catch(error){
  console.error(`Validation error API : ${error}`)
  alert("Something went wrong. Please try again")
}
     });