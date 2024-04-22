import { type Controller } from "../types/controller";

import adminUseCases from "../useCases/admin";

export const getOrders: Controller = (_req, res) => {
  adminUseCases
    .getAllOrders()
    .then((orders) => {
      res.render("admin/orders", {
        orders,
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
