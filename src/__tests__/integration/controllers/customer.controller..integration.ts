import {expect} from '@loopback/testlab';
import {testdb} from '../../../datasources';
import {CustomerRepository} from '../../../repositories';
import {
  givenCustomer,
  givenEmptyDatabase,
} from '../../helpers/database.helpers';

describe('CustomerRepository (integration)', () => {
  before(givenEmptyDatabase);
  describe('findByName(name)', () => {
    it('return the correct customer', async () => {
      const stationery = await givenCustomer({id: 1 , name: 'jeff', website: "https://google.com", address: "home town"});
      const repository = new CustomerRepository(testdb);
      await repository.create(stationery);
      const found = await repository.findByName('jeff');

      expect(found).to.deepEqual(stationery);
    });
  });
});
