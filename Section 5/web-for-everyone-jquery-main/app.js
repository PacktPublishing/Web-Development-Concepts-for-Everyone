$(() => {
  // jQuery + JavaScript
  $('body').append(`<h1>Hello from jQuery!</h1>`);

  // Vanilla JavaScript (JavaScript with a Library)
  const vanillaJavaScriptElement = document.createElement('h1');
  vanillaJavaScriptElement.innerText = 'Hello from Vanilla JavaScript!';
  document.body.append(vanillaJavaScriptElement);
});
