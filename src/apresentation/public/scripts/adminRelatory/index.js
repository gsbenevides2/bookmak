function loadRequestData(requestData) {
  const startTime = moment(requestData[0].selledTimestamp);
  let currentMonth = startTime.clone().startOf("month");
  let currentOrder = 0;
  let currentMonthIndex = 0;
  const monthsOrders = [];
  const monthsText = [];

  while (true) {
    if (currentOrder >= requestData.length) {
      break;
    }
    if (!monthsOrders[currentMonthIndex]) {
      monthsOrders[currentMonthIndex] = [];
      monthsText[currentMonthIndex] = currentMonth
        .locale("pt-br")
        .format("MMMM/YYYY");
    }
    const order = requestData[currentOrder];
    const orderMonth = moment(order.selledTimestamp).startOf("month");

    if (orderMonth.isSame(currentMonth)) {
      monthsOrders[currentMonthIndex].push(order);

      currentOrder++;
    } else {
      currentMonth = currentMonth.add(1, "month");
      currentMonthIndex++;
    }
  }

  return { monthsOrders, monthsText, bruteData: requestData };
}
async function loadData() {
  const { data } = await axios.get("/admin/analysis");
  return loadRequestData(data);
}

async function parseToChart(data) {
  const labels = data.monthsText;

  const selledBooks = new Map();
  data.bruteData.forEach((order) => {
    const bookId = order.bookId;
    const bookTitle = order.bookTitle;
    selledBooks.set(bookId, bookTitle);
  });
  const selledBooksKeys = Array.from(selledBooks.keys());
  const datasets = selledBooksKeys.map((bookId) => {
    const filtedData = data.monthsOrders.map((monthOrders) => {
      const monthSelledBooks = monthOrders.filter(
        (order) => order.bookId === bookId,
      );
      const total =
        monthSelledBooks.reduce(
          (acc, order) => acc + order.quantity * order.unitSellPrice,
          0,
        ) / 100;
      return total;
    });
    const label = selledBooks.get(bookId);
    return {
      label,
      data: filtedData,
      borderWidth: 1,
    };
  });

  return { labels, datasets };
}

async function defineInputs(data) {
  const dateStartInput = document.getElementById("dateStart");
  const dateEndInput = document.getElementById("dateEnd");
  const startDate = moment(data.bruteData[0].selledTimestamp).format(
    "YYYY-MM-DD",
  );
  const endDate = moment(
    data.bruteData[data.bruteData.length - 1].selledTimestamp,
  ).format("YYYY-MM-DD");

  dateStartInput.value = startDate;
  dateEndInput.value = endDate;

  dateStartInput.min = startDate;
  dateStartInput.max = endDate;
  dateEndInput.min = startDate;
  dateEndInput.max = endDate;
}

async function loadCategories() {
  const { data } = await axios.get("/books/categories");
  const categorySelect = document.getElementById("category");
  data.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

window.onload = async function () {
  const loading = document.getElementById("loading");
  const chartContainer = document.getElementById("chartContainer");
  const form = document.getElementById("form");

  const data = await loadData();
  await defineInputs(data);
  const { labels, datasets } = await parseToChart(data);
  const ctx = document.getElementById("myChart");
  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      plugins: {
        legend: {
          position: "right",
          title: {
            display: true,
            text: "Coleções de Livros",
          },
        },
        title: {
          display: true,
          text: "Vendas por mês",
        },
      },
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Mês",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Valor (R$)",
          },
        },
      },
    },
  });

  loading.classList.add("d-none");
  chartContainer.classList.remove("d-none");
  form.classList.remove("d-none");

  form.addEventListener("submit", reloadData);
  await loadCategories();
};

async function reloadData(event) {
  event.preventDefault();
  const dateStartInput = document.getElementById("dateStart");
  const dateEndInput = document.getElementById("dateEnd");
  const categorySelect = document.getElementById("category");
  const corretStartDateToServer = moment(dateStartInput.value)
    .add(1, "day")
    .format("YYYY-MM-DD");
  const corretEndDateToServer = moment(dateEndInput.value).format("YYYY-MM-DD");
  const { data } = await axios.get(
    `/admin/analysis?start=${corretStartDateToServer}&end=${corretEndDateToServer}&category=${categorySelect.value}`,
  );
  const chart = window.chart;
  const { labels, datasets } = await parseToChart(loadRequestData(data));
  chart.data.labels = labels;
  chart.data.datasets = datasets;
  chart.update();
}
