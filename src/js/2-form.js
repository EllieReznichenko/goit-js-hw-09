const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

initPage();

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value.trim();
  saveToLS(STORAGE_KEY, formData);
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const email = refs.email.value.trim();
  const message = refs.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  refs.form.reset();
});

function initPage() {
  const savedData = loadFromLS(STORAGE_KEY);
  if (savedData) {
    formData = savedData;
    refs.email.value = savedData.email || '';
    refs.message.value = savedData.message || '';
  }
}

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}
