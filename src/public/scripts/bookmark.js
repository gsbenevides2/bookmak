const elements = {
  body: document.body,
  pageTitle: document.getElementById("pageTitle"),
  bookmarkForm: document.getElementById("bookmarkForm"),
  errorAlert: document.getElementById("errorAlert"),
  aiBookmarks: document.getElementById("aiBookmarks"),
  inputCustomText: document.getElementById("text-bookmark"),
  loadingSpinner: document.getElementById("loadingSpinner"),
  styleBookmark: document.getElementById("style-bookmark"),
};

async function fetchData() {
  const response = await fetch("/checkout/bookmark/getInfo");
  if (response.ok) {
    return await response.json();
  } else {
    elements.pageTitle.innerHTML = "Ocorreu um erro inesperado";
    elements.loadingSpinner.style.display = "none";
    const json = await response.json();
    dispatchError(json.error);
  }
}
async function sendData(bookmarkStyle, bookmarkText) {
  const formData = new FormData();
  formData.append("bookmarkStyle", bookmarkStyle);
  formData.append("bookmarkText", bookmarkText);

  const response = await fetch("/checkout/bookmark", {
    method: "POST",
    body: JSON.stringify({
      bookmarkStyle,
      bookmarkText,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.location.href = "/checkout/addresses";
  } else if (response.status === 400) {
    const json = await response.json();
    dispatchError(json.error);
  } else {
    dispatchError("Ocorreu um erro inesperado");
  }
}
function dispatchError(message) {
  elements.errorAlert.innerHTML = message;
  elements.errorAlert.style.display = "block";
}
window.addEventListener("load", async () => {
  elements.pageTitle.innerHTML =
    "Estamos preparando uma surpresa para você! <br/>Aguarde...";
  elements.bookmarkForm.style.display = "none";
  elements.errorAlert.style.display = "none";
  elements.body.style.display = "block";
  elements.loadingSpinner.style.display = "flex";
  const data = await fetchData();
  const aiBookmarksTexts = data.aiBookmarkTexts;
  for (const aiBookmarksText of aiBookmarksTexts) {
    console.log(aiBookmarksText);
    const div = document.createElement("div");
    const input = document.createElement("input");
    div.classList.add("form-check");
    input.classList.add("form-check-input");
    input.type = "radio";
    input.name = "text";
    input.id = `text${aiBookmarksText}`;
    input.value = aiBookmarksText;
    div.appendChild(input);
    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.htmlFor = `text${aiBookmarksText}`;
    label.innerHTML = aiBookmarksText;
    div.appendChild(label);
    elements.aiBookmarks.insertBefore(div, elements.inputCustomText);
  }
  const bookmarkStyles = data.bookmarkStyles;
  for (const bookmarkStyle of bookmarkStyles) {
    const option = document.createElement("option");
    option.value = bookmarkStyle;
    option.text = bookmarkStyle;
    elements.styleBookmark.appendChild(option);
  }

  elements.bookmarkForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const style = elements.styleBookmark.value;
    if (style === "Escolha...")
      return dispatchError("Escolha um estilo de marca página");
    const inputChecks = document.getElementsByClassName("form-check-input");
    let text = "";
    for (const inputCheck of inputChecks) {
      if (inputCheck.checked) {
        text = inputCheck.value;
        break;
      }
    }
    if (!text) text = elements.inputCustomText.value;
    if (!text) return dispatchError("Escolha um texto para o marca página");
    await sendData(style, text);
  });

  elements.pageTitle.innerHTML =
    "Escolha o seu marca página<br/>personalizado!";
  elements.bookmarkForm.style.display = "block";
  elements.loadingSpinner.style.display = "none";
  elements.inputCustomText.addEventListener("input", () => {
    const inputChecks = document.getElementsByClassName("form-check-input");
    for (const inputCheck of inputChecks) {
      inputCheck.checked = false;
    }
  });
});
