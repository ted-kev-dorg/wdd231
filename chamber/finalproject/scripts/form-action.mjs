// form-action.mjs - reads the query string submitted from contact.html and displays it
const params = new URLSearchParams(window.location.search);
const list = document.querySelector('#submittedData');

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  recipeType: 'Recipe Suggestion Type',
  message: 'Message',
};

const entries = Object.entries(fieldLabels)
  .filter(([key]) => params.has(key) && params.get(key).trim() !== '')
  .map(([key, label]) => `<li><strong>${label}:</strong> ${params.get(key)}</li>`);

list.innerHTML =
  entries.length > 0
    ? entries.join('')
    : `<li>No form data was found. Please submit the <a href="contact.html">contact form</a> first.</li>`;
