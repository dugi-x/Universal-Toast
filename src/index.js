import Toast from "./Toast.js";

function toast(options) {
  
  return Toast({ ...options });
}

window.Toast = Toast;
window.toast = toast;