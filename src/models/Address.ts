import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

export enum HouseType {
  House = "house",
  Apartment = "apartment",
  Farm = "farm",
}

export const houseTypesTexts = {
  [HouseType.House]: "Casa",
  [HouseType.Apartment]: "Apartamento",
  [HouseType.Farm]: "Fazenda",
};

export enum StreetType {
  Street = "street",
  Avenue = "avenue",
  Road = "road",
  Alley = "alley",
}

export const streetTypesTexts = {
  [StreetType.Street]: "Rua",
  [StreetType.Avenue]: "Avenida",
  [StreetType.Road]: "Estrada",
  [StreetType.Alley]: "Beco",
};

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  customer?: Customer;

  @Column({
    type: "enum",
    enum: HouseType,
  })
  houseType: HouseType;

  @Column({
    type: "enum",
    enum: StreetType,
  })
  streetType: StreetType;

  @Column()
  nickname: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({
    nullable: true,
  })
  observations?: string;

  @Column({
    default: true,
  })
  active: boolean = true;

  public constructor(
    houseType: HouseType,
    streetType: StreetType,
    nickname: string,
    street: string,
    number: string,
    district: string,
    zipCode: string,
    city: string,
    state: string,
    country: string,
    observations?: string,
    customer?: Customer,
  ) {
    this.customer = customer;
    this.houseType = houseType;
    this.streetType = streetType;
    this.nickname = nickname;
    this.street = street;
    this.number = number;
    this.district = district;
    this.zipCode = zipCode;
    this.city = city;
    this.state = state;
    this.country = country;
    this.observations = observations;
  }
}
