let store = {
  user: {},
  messages: [],
};

$(() => {
  $('.js-button-login').on('click', clickLogin);
  $('.js-button-register').on('click', clickRegister);
  $('.js-user-container').on('click', '.js-button-logout', clickLogout);
});

function clickLogin() {
  login();
}

function clickRegister() {
  register();
}

function clickLogout() {
  $.ajax({
    type: 'POST',
    url: '/api/user/logout',
  })
    .then((response) => {
      emptyUserContainer();
      showAuthContainer();
      emptySecretMessages();
      clearError();
      clearForm();
    })
    .catch((err) => {
      showError('Error Logging Out!');
    });
}

function login(username, password) {
  const data = {
    username: username ? username : $('#js-form-username').val(),
    password: password ? password : $('#js-form-password').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/api/user/login',
    data,
  })
    .then((response) => {
      clearForm();
      clearError();
      getMessages();
      getUser();
    })
    .catch((err) => {
      clearForm();
      showError('Username or Password is incorrect');
    });
}

function register() {
  const data = {
    username: $('#js-form-username').val(),
    password: $('#js-form-password').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/api/user/register',
    data,
  })
    .then((response) => {
      clearForm();
      clearError();
      login(data.username, data.password);
    })
    .catch((err) => {
      clearForm();
      showError('Register Failed');
    });
}

function getUser() {
  $.ajax({
    type: 'GET',
    url: '/api/user/',
  })
    .then((response) => {
      store.user = response;
      hideAuthContainer();
      renderUserContainer();
      if (store.user.accessLevel > 0) getMessages();
    })
    .catch((err) => {
      showError('Error with the user.');
    });
}

function getMessages() {
  $.ajax({
    type: 'GET',
    url: '/api/messages/',
  })
    .then((response) => {
      console.log(response);
      store.messages = response;
      renderSecretMessages();
    })
    .catch((err) => {
      showError('Error with the messages.');
    });
}

function showError(message) {
  $('.warning').empty();
  $('.warning').append(`<p>${message}</p>`);
}

function clearError() {
  $('.warning').empty();
}

function clearForm() {
  $('#js-form-username').val('');
  $('#js-form-password').val('');
  $('#js-form-username').trigger('focus');
}

function hideAuthContainer() {
  $('.js-auth-container').hide();
}

function showAuthContainer() {
  $('.js-auth-container').show();
}

function renderUserContainer() {
  $('.js-user-container').empty();

  const accessLevel = store.user.access_level || 0;
  let accessMessage = '';

  if (accessLevel == 0) {
    accessMessage =
      'You currently have an access level of 0. You cannot see any of the messages.';
  } else if (accessLevel > 0) {
    accessMessage = `Secret Messages for Security Level: ${store.user.access_level}`;
  }

  $('.js-user-container').append(`
    <button class="js-button-logout">Logout</button>
    <h3>Hello, ${store.user.username.toUpperCase()}</h3>
    <p>${accessMessage}</p>
  `);
}

function emptyUserContainer() {
  $('.js-user-container').empty();
}

function renderSecretMessages() {
  $('.js-message-container').empty();
  $('.js-message-container').append(`<ul></ul>`);
  const $el = $('.js-message-container').children().last();
  for (let item of store.messages) {
    $el.append(`<li>${item.message}</li>`);
  }
}

function emptySecretMessages() {
  $('.js-message-container').empty();
}
