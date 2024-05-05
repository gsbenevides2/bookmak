function maskCPF(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

function loadCPFMasker(elementID) {
  const element = document.getElementById(elementID);
  element.addEventListener("input", (e) => {
    e.target.value = maskCPF(e.target.value);
  });
}
