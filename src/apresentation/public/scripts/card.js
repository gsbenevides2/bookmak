const cardFlags = {
  mastercard: /^5[1-5][0-9]{14}$/,
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  amex: /^3[47][0-9]{13}$/,
  diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
};

function maskCardNumber(cardNumber) {
  return cardNumber.replace(/(\d{4})/g, "$1 ").trim();
}

document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("cardNumber");
  const cardFlagSelector = document.getElementById("cardBrand");
  cardNumberInput.addEventListener("input", function (event) {
    const cardNumber = event.target.value.replace(/\s/g, "").replace(/\D/g, "");
    const completeCardNumber = cardNumber.padEnd(16, "0");
    const cardFlag = Object.keys(cardFlags).find((flag) =>
      cardFlags[flag].test(completeCardNumber),
    );
    if (cardFlag) {
      cardFlagSelector.value = cardFlag;
    }

    cardNumberInput.value = maskCardNumber(cardNumber);
  });
});
