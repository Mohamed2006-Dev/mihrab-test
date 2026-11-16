const params = new URLSearchParams(location.search);
const handoff = document.getElementById('handoff');
const steps = document.getElementById('steps');
const showSteps = document.getElementById('show-steps');

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
