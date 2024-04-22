import { DatabaseConnection } from "../../dbConnection";
import { Coupon, CouponType } from "../../models/Coupon";
import { Customer } from "../../models/Customer";
import { getRandomCouponCode } from "../../utils/coupon";
import { validateCPF } from "../../utils/cpf";
import { throwErrorIfFalse } from "../../utils/errors";
import { stringIsNotEmpty } from "../../utils/string";

export default async function createCoupon(
  value: number,
  cpf?: string,
): Promise<string> {
  const parsedCPF = cpf != null ? cpf.replace(/\D/g, "") : null;

  if (parsedCPF != null && stringIsNotEmpty(parsedCPF)) {
    throwErrorIfFalse(validateCPF(parsedCPF), "O CPF informado é inválido");
  }
  throwErrorIfFalse(value > 0, "O valor do cupom deve ser maior que zero");

  const couponCode = getRandomCouponCode();
  const datasource = await DatabaseConnection.getDataSource();

  await datasource.transaction(async (manager) => {
    const couponRepository = manager.getRepository(Coupon);
    const customerRepository = manager.getRepository(Customer);
    const coupon = new Coupon();
    coupon.code = couponCode;
    coupon.value = value;
    coupon.type = CouponType.Discount;
    coupon.description = "Cupom de desconto";
    if (parsedCPF != null && stringIsNotEmpty(parsedCPF)) {
      const customer = await customerRepository.findOne({
        where: { cpf: parsedCPF },
      });
      if (customer == null) {
        throw new Error("CPF não encontrado");
      }
      coupon.attachedCustomer = customer;
    }
    await couponRepository.save(coupon);
  });

  return couponCode;
}
