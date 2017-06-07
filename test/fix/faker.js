import faker from 'faker';

export function mockIdToken() {
  return { payload: { name: faker.internet.userName() } };
}

export default faker;
