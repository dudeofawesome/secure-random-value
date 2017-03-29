import { expect } from 'chai';

import { RandomNumber, RandomString } from '../';

const MochaAsync = (fn) => {
  return (done) => {
    (async () => {
      try {
        await fn();
        done();
      } catch (err) {
        done(err);
      }
    })();
  };
};

describe(`RandomNumber`, () => {
  it(`should generate random numbers between 0 and 100`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomNumber();
        expect(result).to.be.at.least(0).and.at.most(100);
      }
    })
  );

  it(`should generate random numbers between 10 and 110`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomNumber(10);
        expect(result).to.be.at.least(10).and.at.most(110);
      }
    })
  );

  it(`should generate random numbers between 100 and 200`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomNumber(100);
        expect(result).to.be.at.least(100).and.at.most(200);
      }
    })
  );

  it(`should generate random numbers between 100 and 1000`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomNumber(100, 1000);
        expect(result).to.be.at.least(100).and.at.most(1000);
      }
    })
  );

  it(`should generate random numbers between -100 and 100`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomNumber(-100, 100);
        expect(result).to.be.at.least(-100).and.at.most(100);
      }
    })
  );
});

describe(`RandomString`, () => {
  it(`should generate random strings with length 32`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomString();
        expect(result.length).to.equal(32);
        expect(result).to.match(/^[a-zA-Z0-9]{32,32}$/);
      }
    })
  );

  it(`should generate random strings with length 14`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomString(14);
        expect(result.length).to.equal(14);
        expect(result).to.match(/^[a-zA-Z0-9]{14,14}$/);
      }
    })
  );

  it(`should generate random strings with length 32`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomString(32, ['a', 'b', 'c', '1', '2', '3']);
        expect(result.length).to.equal(32);
        expect(result).to.match(/^[a-z1-3]{32,32}$/);
      }
    })
  );

  it(`should generate random strings using custom char set with length 14`,
    MochaAsync(async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await RandomString(14, ['a', 'b', 'c', '1', '2', '3']);
        expect(result.length).to.equal(14);
        expect(result).to.match(/^[a-c1-3]{14,14}$/);
      }
    })
  );

  it(`should fail due to unknown char set`,
    MochaAsync(async () => {
      try {
        await (RandomString as any)(14, 'this is not a char set');
        throw new Error(`RandomString did not throw an error.`);
      } catch (err) {
        expect(err.message).to.equal(`Unknown built-in char set.`);
      }
    })
  );
});
