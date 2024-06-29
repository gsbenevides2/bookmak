function loadCoverInput() {
  const coverInputBtn = document.getElementById("coverInputBtn");
  /** @constant
   * @type {HTMLInputElement}
   */
  const coverInput = document.getElementById("coverInput");
  const coverPreview = document.getElementById("coverPreview");

  coverInputBtn.addEventListener("click", () => {
    coverInput.click();
  });
  coverInput.addEventListener("change", () => {
    const files = coverInput.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        coverPreview.src = e.target.result;
        coverPreview.classList.remove("d-none");
      };
      reader.readAsDataURL(file);
    }
  });
}

window.onload = () => {
  loadCoverInput();
};
