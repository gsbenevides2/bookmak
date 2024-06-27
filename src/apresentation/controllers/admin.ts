import { type Controller } from "./types";

import adminUseCases from "../../business/useCases/admin";

export const getOrders: Controller = (req, res) => {
  const filters = req.query as {
    orderId: string;
    customerCPF: string;
    status: string;
  };

  adminUseCases
    .getAllOrders(filters)
    .then((orders) => {
      res.render("admin/orders", {
        orders,
        filters,
      });
    })
    .catch((err) => {
      res.redirect(`/login?error=${err.message}`);
    });
};

export const getDataFromOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .getOrder(orderId)
    .then((order) => {
      res.render("admin/order", {
        order,
      });
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const checkOrderIsPayable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .checkOrderIsPayable(orderId)
    .then((isPayable) => {
      if (!isPayable) {
        res.redirect("/admin");
        return;
      }
      const view = req.originalUrl.includes("reject")
        ? "admin/rejectPayment"
        : "admin/aprovePayment";
      res.render(view, {
        orderId,
      });
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const aprovePayment: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .aprovePayment(orderId)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const rejectPayment: Controller = (req, res) => {
  const orderId = req.params.orderId;
  interface Body {
    reason: string;
  }
  const { reason } = req.body as Body;
  adminUseCases
    .rejectPayment(orderId, reason)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const checkOrderIsPayed: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .checkOrderIsPayed(orderId)
    .then((isPayed) => {
      if (!isPayed) {
        res.redirect("/admin");
        return;
      }
      res.render("admin/startPreparing", {
        orderId,
      });
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const registerOrderPreparing: Controller = (req, res) => {
  adminUseCases
    .startPreparing(req.params.orderId)
    .then(() => {
      res.redirect(`/admin/order/${req.params.orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const checkOrderIsInPreparableState: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .checkOrderIsPreparing(orderId)
    .then((isPreparing) => {
      if (isPreparing) {
        res.render("admin/sendOrder", {
          orderId,
        });
      } else {
        res.redirect("/admin");
      }
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const sendOrder: Controller = (req, res) => {
  interface Body {
    transporter: string;
    trackingCode: string;
  }
  const orderId = req.params.orderId;
  const { transporter, trackingCode } = req.body as Body;

  adminUseCases
    .sendOrder(orderId, transporter, trackingCode)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const checkOrderIsSended: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .checkOrderIsSended(orderId)
    .then((isSended) => {
      if (isSended) {
        res.render("admin/sendedOrder", {
          orderId,
        });
      } else {
        res.redirect("/admin");
      }
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const finishOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .finishOrder(orderId)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const checkOrderIsExchangeable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .checkOrderIsExchangeable(orderId)
    .then((isExchangeable) => {
      if (isExchangeable) {
        const view = req.originalUrl.includes("reject")
          ? "admin/rejectExchange"
          : "admin/aproveExchange";
        res.render(view, {
          orderId,
        });
      } else {
        res.redirect("/admin");
      }
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const aproveExchange: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .aproveExchange(orderId)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const rejectExchange: Controller = (req, res) => {
  const orderId = req.params.orderId;
  interface Body {
    reason: string;
  }
  const { reason } = req.body as Body;

  adminUseCases
    .rejectExchange(orderId, reason)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const listCoupons: Controller = (req, res) => {
  adminUseCases
    .listCoupons()
    .then((coupons) => {
      res.render("admin/coupons", {
        coupons,
        success: req.query.success,
      });
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const createCoupon: Controller = (req, res) => {
  interface Body {
    value: string;
    cpf: string;
  }
  const { value, cpf } = req.body as Body;
  const parsedValue = parseInt((parseFloat(value) * 100).toFixed(0), 10);
  adminUseCases
    .createCoupon(parsedValue, cpf)
    .then((code) => {
      res.redirect(`/admin/coupons?success=Cupom criado com sucesso: ${code}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const checkOrderIsCancelable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const isReject = req.originalUrl.includes("reject");
  adminUseCases
    .checkOrderIsCancelable(orderId)
    .then((isCancelable) => {
      if (isCancelable) {
        res.render(isReject ? "admin/rejectCancel" : "admin/aproveCancel", {
          orderId,
        });
      } else {
        res.redirect("/admin");
      }
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const cancelOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  adminUseCases
    .cancelOrder(orderId)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const rejectCanceling: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const { reason } = req.body as { reason: string };
  adminUseCases
    .rejectCancel(orderId, reason)
    .then(() => {
      res.redirect(`/admin/order/${orderId}`);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const getProductsToAnalyse: Controller = (req, res) => {
  const filters = req.query as {
    category: string | undefined;
    end: string | undefined;
    start: string | undefined;
  };
  let startDate, endDate;
  const categories: string[] = [];
  if (filters.start != null && filters.start.length > 0) {
    startDate = new Date(filters.start);
  }
  if (filters.end != null && filters.end.length > 0) {
    endDate = new Date(filters.end);
  }
  if (filters.category != null && filters.category.length > 0) {
    categories.push(filters.category);
  }

  adminUseCases
    .getOrdersToAnalysis({
      authors: [],
      categories,
      endDate,
      startDate,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const getBooks: Controller = (req, res) => {
  const searchQuery = req.query.searchQuery as string | undefined;
  adminUseCases
    .getBooks(searchQuery)
    .then((books) => {
      res.render("admin/books", {
        books,
        searchQuery: searchQuery ?? "",
      });
    })
    .catch((err) => {
      console.error(err);
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const getNewBookPage: Controller = (_req, res) => {
  const promises = [adminUseCases.getAuthors(), adminUseCases.getCategories()];
  Promise.all(promises)
    .then(([authors, categories]) => {
      res.render("admin/newBook", {
        authors,
        categories,
      });
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const createBook: Controller = (req, res) => {
  interface Body {
    title: string;
    description: string;
    authors: string;
    categories: string;
    cover: string;
    bookmarkStyle: string;
  }
  const {
    title,
    authors: authorsStr,
    categories: categoriesStr,
    description,
  } = req.body as Partial<Body>;

  if (title === undefined) {
    res.redirect("/admin?error=Titulo não enviado");
    return;
  }
  if (authorsStr === undefined) {
    res.redirect("/admin?error=Autor não enviado");
    return;
  }
  if (categoriesStr === undefined) {
    res.redirect("/admin?error=Categoria não enviada");
    return;
  }
  if (description === undefined) {
    res.redirect("/admin?error=Descrição não enviada");
    return;
  }
  const authors = authorsStr.split(",");
  const categories = categoriesStr.split(",");
  const files = req.files;
  if (files === null || files === undefined) {
    res.redirect("/admin?error=Arquivos não enviado");
    return;
  }
  const cover = files.cover;
  const bookmarkStyle = files.bookmarkStyle;

  if (Array.isArray(cover)) {
    res.redirect("/admin?error=Mutilpos arquivos enviados para capa");
    return;
  }
  if (cover.mimetype !== "image/jpeg" && cover.mimetype !== "image/png") {
    res.redirect("/admin?error=Formato de imagem inválido");
  }
  if (Array.isArray(bookmarkStyle)) {
    res.redirect("/admin?error=Mutilpos arquivos enviados para marcador");
    return;
  }
  if (
    bookmarkStyle.mimetype !== "image/jpeg" &&
    bookmarkStyle.mimetype !== "image/png"
  ) {
    res.redirect("/admin?error=Formato de imagem inválido");
  }

  const coverFile = {
    filePath: cover.tempFilePath,
    type: cover.mimetype,
  };
  const bookmarkStyleFile = {
    filePath: bookmarkStyle.tempFilePath,
    type: bookmarkStyle.mimetype,
  };

  adminUseCases
    .createBook({
      title,
      authors,
      categories,
      description,
      cover: coverFile,
      bookmarkStyle: bookmarkStyleFile,
    })
    .then((id) => {
      res.redirect("/admin/products?searchQuery=" + id);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const getEditBookPage: Controller = (req, res) => {
  const id = req.params.bookId;
  const promises = [
    adminUseCases.getBook(id),
    adminUseCases.getAuthors(),
    adminUseCases.getCategories(),
  ];
  Promise.all(promises)
    .then(([book, authors, categories]) => {
      res.render("admin/editBook", {
        book,
        authors,
        categories,
      });
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const editBook: Controller = (req, res) => {
  interface Body {
    title: string;
    description: string;
    authors: string;
    categories: string;
    cover: string;
    bookmarkStyle: string;
  }
  const {
    title,
    authors: authorsStr,
    categories: categoriesStr,
    description,
  } = req.body as Partial<Body>;

  const bookId = req.params.bookId;

  if (title === undefined) {
    res.redirect("/admin?error=Titulo não enviado");
    return;
  }
  if (authorsStr === undefined) {
    res.redirect("/admin?error=Autor não enviado");
    return;
  }
  if (categoriesStr === undefined) {
    res.redirect("/admin?error=Categoria não enviada");
    return;
  }
  if (description === undefined) {
    res.redirect("/admin?error=Descrição não enviada");
    return;
  }
  const authors = authorsStr.split(",");
  const categories = categoriesStr.split(",");
  const files = req.files;
  if (files === null || files === undefined) {
    res.redirect("/admin?error=Arquivos não enviado");
    return;
  }
  const cover = files.cover;
  const bookmarkStyle = files.bookmarkStyle;

  if (Array.isArray(cover)) {
    res.redirect("/admin?error=Mutilpos arquivos enviados para capa");
    return;
  }
  if (cover.mimetype !== "image/jpeg" && cover.mimetype !== "image/png") {
    res.redirect("/admin?error=Formato de imagem inválido");
  }
  if (Array.isArray(bookmarkStyle)) {
    res.redirect("/admin?error=Mutilpos arquivos enviados para marcador");
    return;
  }
  if (
    bookmarkStyle.mimetype !== "image/jpeg" &&
    bookmarkStyle.mimetype !== "image/png"
  ) {
    res.redirect("/admin?error=Formato de imagem inválido");
  }

  const coverFile = {
    filePath: cover.tempFilePath,
    type: cover.mimetype,
  };
  const bookmarkStyleFile = {
    filePath: bookmarkStyle.tempFilePath,
    type: bookmarkStyle.mimetype,
  };

  adminUseCases
    .editBook({
      bookId,
      title,
      authors,
      categories,
      description,
      cover: coverFile,
      bookmarkStyle: bookmarkStyleFile,
    })
    .then((id) => {
      res.redirect("/admin/products?searchQuery=" + id);
    })
    .catch((err) => {
      res.redirect(`/admin?error=${err.message}`);
    });
};

export const disableBook: Controller = (req, res) => {
  const bookId = req.params.bookId;
  adminUseCases
    .disableBook(bookId)
    .then(() => {
      res.status(200).send("Livro desativado com sucesso");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export const activateBook: Controller = (req, res) => {
  const bookId = req.params.bookId;
  adminUseCases
    .activateBook(bookId)
    .then(() => {
      res.status(200).send("Livro ativado com sucesso");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export const activateSku: Controller = (req, res) => {
  const skuId = req.params.skuId;
  adminUseCases
    .activateSku(skuId)
    .then(() => {
      res.status(200).send("Sku ativado com sucesso");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
export const disableSku: Controller = (req, res) => {
  const skuId = req.params.skuId;
  adminUseCases
    .disableSku(skuId)
    .then(() => {
      res.status(200).send("Sku desativado com sucesso");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
