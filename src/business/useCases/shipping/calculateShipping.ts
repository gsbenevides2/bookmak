/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { throwErrorIfNull } from "../../../utils/errors";
import { ShippingRateTemplate } from "../../models/ShippingRateTemplate";

const WEIGHT_PER_ITEM = 1;

export default async function calculateShippingForOrder(
  zipCode: string,
  quantityOfItems: number,
  subtotal: number,
): Promise<number> {
  const dataSource = await DatabaseConnection.getDataSource();

  const shippingRateTemplateRepository =
    dataSource.getRepository(ShippingRateTemplate);

  const weight = quantityOfItems * WEIGHT_PER_ITEM;
  const shippingRateTemplateOrNot =
    await shippingRateTemplateRepository.findOne({
      where: {
        zipCodeStart: LessThanOrEqual(zipCode),
        zipCodeEnd: MoreThanOrEqual(zipCode),
        weightStart: LessThanOrEqual(weight),
        weightEnd: MoreThanOrEqual(weight),
      },
    });

  throwErrorIfNull(
    shippingRateTemplateOrNot,
    "Shipping is not available for this address and weight",
  );

  const shippingRateTemplate = shippingRateTemplateOrNot!;

  const decimalPricePercent = shippingRateTemplate.pricePercentage / 100;
  const fixedCost = shippingRateTemplate.absoluteMoneyCost;
  const extraPricePerWeight = shippingRateTemplate.priceByWeight * weight;

  const shippingCost = parseInt(
    (fixedCost + extraPricePerWeight + decimalPricePercent * subtotal).toFixed(
      0,
    ),
  );

  return shippingCost;
}
