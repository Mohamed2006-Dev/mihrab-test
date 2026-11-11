const params = new URLSearchParams(location.search);
const languageButton = document.getElementById('language');
const handoff = document.getElementById('handoff');
const steps = document.getElementById('steps');
const showSteps = document.getElementById('show-steps');
const qr = document.getElementById('qr');

function setLanguage(language) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  languageButton.textContent = language === 'ar' ? 'English' : 'العربية';
  languageButton.lang = language === 'ar' ? 'en' : 'ar';
  qr.src = language === 'ar' ? './qr-ar.png' : './qr-en.png';
  qr.alt = language === 'ar' ? 'رمز QR لفتح خطوات الاختبار على أندرويد' : 'QR code for the Android test instructions';
  params.set('lang', language);
  try {
    history.replaceState(null, '', '?' + params.toString());
  } catch {
    // Language switching also works in local previews.
  }
}

setLanguage(params.get('lang') === 'en' ? 'en' : 'ar');
languageButton.hidden = false;
languageButton.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
});

const isAndroid = [navigator.userAgentData?.platform, navigator.userAgent]
  .some(value => /Android/i.test(value || ''));
if (!isAndroid && params.get('steps') !== '1') {
  handoff.hidden = false;
  steps.hidden = true;
}
showSteps.addEventListener('click', () => {
  steps.hidden = !steps.hidden;
  showSteps.setAttribute('aria-expanded', String(!steps.hidden));
});
