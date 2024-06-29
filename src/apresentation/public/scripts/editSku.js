function downloadFileToBlob(url) {
  console.log(url);
  return fetch(url).then((response) => response.blob());
}

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
  downloadFileToBlob(window.skuCoverUrl).then((blob) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverPreview.src = e.target.result;
      coverPreview.classList.remove("d-none");
    };
    reader.readAsDataURL(blob);

    const file = new File([blob], "cover.jpg", { type: "image/jpeg" });
    const container = new DataTransfer();
    container.items.add(file);
    coverInput.files = container.files;
  });
}

window.onload = () => {
  loadCoverInput();
};
