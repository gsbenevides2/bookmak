import { DatabaseConnection } from "../../dbConnection";
import { Customer } from "../../models/Customer";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
  accountId: string;
}

export default async function changePassword({
  oldPassword,
  newPassword,
  passwordConfirm,
  accountId,
}: ChangePasswordData): Promise<void> {
  if (passwordConfirm !== newPassword) {
    throw new Error("Nova senha e confirmação de senha não conferem");
  }

  const dataSource = await DatabaseConnection.getDataSource();

  const customerRepository = dataSource.getRepository(Customer);

  const customer = await customerRepository.findOne({
    where: { id: accountId, password: oldPassword },
  });

  if (customer == null) {
    throw new Error("Senha antiga inválida");
  }

  customer.password = newPassword;

  await customerRepository.save(customer).catch(() => {
    throw new Error("Erro ao salvar nova senha");
  });
}
