const baseSize = 37.5;
function setRem() {
  const scale = document.documentElement.clientWidth / 375;
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
setRem();
window.onresize = function () {
  console.log('rem');
  setRem();
};
