function downloadFileToBlob(url) {
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
  downloadFileToBlob(window.bookCoverUrl).then((blob) => {
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
function loadBookmarkStyleInput() {
  const bookmarkStyleInputBtn = document.getElementById(
    "bookmarkStyleInputBtn",
  );
  const bookmarkStyleInput = document.getElementById("bookmarkStyleInput");
  const bookmarkStylePreview = document.getElementById("bookmarkStylePreview");

  bookmarkStyleInputBtn.addEventListener("click", () => {
    bookmarkStyleInput.click();
  });
  bookmarkStyleInput.addEventListener("change", () => {
    const files = bookmarkStyleInput.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        bookmarkStylePreview.src = e.target.result;
        bookmarkStylePreview.classList.remove("d-none");
      };
      reader.readAsDataURL(file);
    }
  });
  downloadFileToBlob(window.bookmarkStyleUrl).then((blob) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      bookmarkStylePreview.src = e.target.result;
      bookmarkStylePreview.classList.remove("d-none");
    };
    reader.readAsDataURL(blob);

    const file = new File([blob], "bookmarkStyle.jpg", { type: "image/jpeg" });
    const container = new DataTransfer();
    container.items.add(file);

    bookmarkStyleInput.files = container.files;
  });
}

function loadAuthorsInput() {
  const authorsInput = document.getElementById("authorsInput");
  const authorsTag = UseBootstrapTag(authorsInput);
  authorsInput.classList.add("d-none");
  const authorsListBtns = document.querySelectorAll(".authorBtn");
  authorsListBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const author = event.target.textContent;
      authorsTag.addValue(author);
    });
  });
}
function loadCategoriesInput() {
  const categoriesInput = document.getElementById("categoriesInput");
  const categoriesTag = UseBootstrapTag(categoriesInput);
  categoriesInput.classList.add("d-none");
  const categoriesListBtns = document.querySelectorAll(".categoryBtn");
  categoriesListBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const category = event.target.textContent;
      categoriesTag.addValue(category);
    });
  });
}

window.onload = () => {
  loadCoverInput();
  loadBookmarkStyleInput();
  loadAuthorsInput();
  loadCategoriesInput();
};
