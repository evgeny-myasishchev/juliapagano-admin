import faker from './faker';

export default function () {
  return {
    auth: {
      fakeProp1: faker.fake('fakeProp1-{{lorem.word}}'),
    },
  };
}
