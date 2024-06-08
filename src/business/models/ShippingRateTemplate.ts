import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "shipping_rate_template" })
export class ShippingRateTemplate {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "pk_shipping_rate_template",
  })
  id!: string;

  @Column({
    name: "zip_code_start",
  })
  zipCodeStart!: string;

  @Column({
    name: "zip_code_end",
  })
  zipCodeEnd!: string;

  @Column({
    name: "weight_start",
    type: "float",
  })
  weightStart!: number;

  @Column({
    name: "weight_end",
    type: "float",
  })
  weightEnd!: number;

  @Column({
    name: "absolute_money_cost",
  })
  absoluteMoneyCost!: number;

  @Column({
    name: "price_percentage",
    type: "float",
  })
  pricePercentage!: number;

  @Column({
    name: "price_by_weight",
  })
  priceByWeight!: number;
}
