import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/", (_req, res) => {
  res.render("login", { error: null });
});

loginRouter.post("/", (req, res) => {
  const { email, password } = req.body;
  const MOCK_EMAIL = "gsbenevides2@gmail.com";
  const MOCK_PASSWORD = "12345678";
  const MOCK_ACCOUNT_ID = "123456";
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    res.cookie("accountId", MOCK_ACCOUNT_ID);
    res.redirect("/accounts/me");
  } else {
    res.render("login", {
      error: "Senha ou nome de usuário incorretos",
    });
  }
});

loginRouter.get("/logout", (_req, res) => {
  res.clearCookie("accountId");
  res.redirect("/");
});

export default loginRouter;
