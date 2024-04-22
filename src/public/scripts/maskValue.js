function loadValueMasker(id) {
  const valueInput = document.getElementById(id);
  valueInput.addEventListener("input", () => {
    // Add dots to value
    if (valueInput.value.length > 2) {
      valueInput.value = valueInput.value
        .replace(/\D/g, "")
        .replace(/(\d{2})$/, ".$1");
    }
  });
}
