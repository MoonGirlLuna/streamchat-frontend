let uname = document.querySelector('#uname').value; // grabbing the username submitted and putting it in the variable uname
let pin = document.querySelector('#pin').value; // grabbing the pin submitted and putting it in the variable pin
let selected = document.querySelector('#selected').value;
let custom = document.querySelector('#custom').value;
let pronouns = ''
let responseText;
const form = document.querySelector('form'); // grabbing an element on the page
const API_URL = `http://127.0.0.1:8000`

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(form);

    uname = formData.get('uname');
    pin = formData.get('pin');
    selected = formData.get('selected');
    custom = formData.get('custom')

    if (custom !== '') {
      pronouns = custom
    } else {
      pronouns = selected
    }
    
    const isTaken = await getUname();

    if (isTaken === `User ${uname}`) {
      console.log("This username is taken.")
      document.querySelector("#taken").innerHTML = `${uname} is already taken.`
    } else {
      register()
    }
})

async function getUname() {
  let response = await fetch(`${API_URL}/api/users/${uname}`);
  responseText = await response.text();
  return responseText;
}

async function register() {
const rawResponse = await fetch(`${API_URL}/api/register/${uname.toString().toLowerCase()}/${pin.toString()}/${pronouns.toString().toLowerCase().replace("/", ".")}`, {
    method: 'POST',
    headers: {
      'Accept': 'text/plain'
    },
    body: ""
});
//rawResponse.then(window.location.replace("http://127.0.0.1:5500/login.html"))
}

