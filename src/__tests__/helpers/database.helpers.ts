import {CustomerRepository } from '../../repositories';
import {testdb} from '../../datasources/testdb.datasource';
import { Customer } from '../../models';

export async function givenEmptyDatabase() {
  await new CustomerRepository(testdb).deleteAll();
  // await new RoleRepository(testdb).deleteAll();
}

export async function givenCustomer(data: Partial<Customer>) {
    return new Customer(data)
}