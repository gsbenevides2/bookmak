// Multiple Cards
const cardSelect = document.getElementById("card");
const valueInput = document.getElementById("value");
const addCardBtn = document.getElementById("addCard");
const cardListInput = document.getElementById("cards");
const totalPriceDiv = document.getElementsByClassName("totalPrice")[0];

function formatMoney(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const MIN_VALUE = 1000;

window.addEventListener("load", () => {
  addCardBtn.addEventListener("click", () => {
    const cardId = cardSelect.value;
    const cardText = cardSelect.options[cardSelect.selectedIndex].text;
    const valueForPay = parseInt(valueInput.value.replace(/\D/g, ""));
    const orderTotal = parseInt(totalPriceDiv.dataset.totalprice);

    if (cardSelect.selectedIndex === 0) {
      alert("Selecione um cartão");
      return;
    }

    if (valueForPay < MIN_VALUE) {
      if (orderTotal > MIN_VALUE) {
        alert(
          `Valor mínimo para pagamento é de ${formatMoney(MIN_VALUE / 100)}`,
        );
        return;
      }
    }

    const cardsListInputValue = JSON.parse(cardListInput.value);

    const totalPayedWithCards = cardsListInputValue.reduce(
      (acc, card) => acc + card.value,
      0,
    );

    const totalPayed = totalPayedWithCards + valueForPay;
    if (totalPayed > orderTotal) {
      alert("Valor total excedido");
      return;
    }

    const thisCardIncludes =
      cardsListInputValue.findIndex((card) => card.id === cardId) !== -1;

    if (thisCardIncludes) {
      alert("Cartão já utlizado");
      return;
    }

    const newCard = {
      id: cardId,
      value: valueForPay,
    };

    cardsListInputValue.push(newCard);
    cardListInput.value = JSON.stringify(cardsListInputValue);

    const cardList = document.getElementById("usedCardsList");
    const cardItem = document.createElement("li");

    cardItem.textContent = `${cardText} - ${formatMoney(valueForPay / 100)}`;
    cardList.appendChild(cardItem);
  });
  valueInput.addEventListener("input", () => {
    // Add dots to value
    if (valueInput.value.length > 2) {
      valueInput.value = valueInput.value
        .replace(/\D/g, "")
        .replace(/(\d{2})$/, ".$1");
    }
  });
});
