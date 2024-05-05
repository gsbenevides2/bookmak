function maskDDD(ddd) {
  return ddd.replace(/\D/g, "").slice(0, 2);
}

function autoMaskDDD() {
  const input = document.querySelector("#phoneAreaCode");
  input.addEventListener("input", (e) => {
    const value = input.value;
    input.value = maskDDD(value);
  });
}

function maskPhone(phone) {
  return phone
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .replace(/(\d{4})(\d{4})/, "$1-$2");
}
function autoMaskPhone() {
  const phone = document.querySelector("#phoneNumber");
  phone.addEventListener("input", (e) => {
    e.target.value = maskPhone(e.target.value);
  });
}

window.addEventListener("load", autoMaskPhone);
window.addEventListener("load", autoMaskDDD);
