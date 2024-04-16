function maskCPF(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

function autoMaskCPF() {
  const cpf = document.querySelector("#cpf");
  cpf.addEventListener("input", (e) => {
    e.target.value = maskCPF(e.target.value);
  });
}

window.addEventListener("load", autoMaskCPF);
