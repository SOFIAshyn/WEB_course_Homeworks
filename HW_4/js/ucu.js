// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces between words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,

function lengthValidator(defNode, defErrors, bottomLimit, upperLimit) {
  // email is between 5 and 50 chars long
  if (defNode.value.length < bottomLimit) {
      let li = document.createElement('li');
      li.innerText = 'Length is not proper';
      defErrors.appendChild(li);
      return 0
  }
  if (upperLimit) {
      if (defNode.value.length > upperLimit) {
        let li = document.createElement('li');
        li.innerText = 'Length is not proper';
        defErrors.appendChild(li);
        return 0
      }
    }
}

function formatValidator(defNode, defErrors, regx) {
  let li = document.createElement('li');
  if (defNode.value.match(regx)) {
    if (defNode.id === 'message')
      li.innerText = 'Message includes bad words';
    defErrors.appendChild(li)
  }
  if (!defNode.value.match(regx)) {
    if (defNode.id === 'phone')
      li.innerText = 'Phone doesn\'t match the pattern: +38032 000 000 00, +380(32) 000 000 00, +380(32)-000-000-00, 0380(32) 000 000 00.';
    if (defNode.id === 'email')
      li.innerText = 'Email is not in valid format.';
    defErrors.appendChild(li)
  }
}

function emailValidator(event) {
  const emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block');
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  // email is between 5 and 50 chars long
  lengthValidator(emailNode, emailErrors, 5, 50);

  // email format is correct
  formatValidator(emailNode, emailErrors, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }
}

function nameValidator(event) {
  const nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block');
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  // name has 0 or 2 whitespaces between words
  if (!(nameNode.value.split(' ').length === 1 || nameNode.value.split(' ').length === 3)) {
    let li = document.createElement('li');
    li.innerText = 'Name has not a valid number [0 or 2] of whitespaces';
    nameErrors.appendChild(li)
  }

  // name length is 1 or more chars
  lengthValidator(nameNode, nameErrors, 1, false);

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }
}

function phoneValidator(event) {
  const phoneNode = event.target.elements['phone'];
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block');
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute('role', 'alert');

  // phone length is 12 or more digits
  lengthValidator(phoneNode, phoneErrors, 12, false);

  // phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
  formatValidator(phoneNode, phoneErrors, /[+0]?380(\([2, 3]{2}\)|[2, 3]{2})((\s\d{3}){2}\s\d{2}|(-\d{3}){2}-\d{2})/);

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }
}

function messageValidator(event) {
  const messageNode = event.target.elements['message'];
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block');
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute('role', 'alert');

  // message is 10 or more characters.
  lengthValidator(messageNode, messageErrors, 10, false);

  // message must not include bad language: ugly, dumm, stupid, pig, ignorant
  formatValidator(messageNode, messageErrors, /(ugly|dumm|stupid|pig|ignorant)/);

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors);
  }
}

function validateMe(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  nameInput.addEventListener(   'change', () => nameValidator(event));
  emailInput.addEventListener(  'change', () => emailValidator(event));
  phoneInput.addEventListener(  'change', () => phoneValidator(event));
  messageInput.addEventListener('change', () => messageValidator(event));

  return false;
}

