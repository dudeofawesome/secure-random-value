# secure-random-value [![Travis CI Status](https://travis-ci.org/dudeofawesome/secure-random-value.svg?branch=master)](https://travis-ci.org/dudeofawesome/secure-random-value) [![NPM version](https://badge.fury.io/js/secure-random-value.svg)](https://www.npmjs.com/package/secure-random-value) [![codecov](https://codecov.io/gh/dudeofawesome/secure-random-value/branch/master/graph/badge.svg)](https://codecov.io/gh/dudeofawesome/secure-random-value)

Generates cryptographically secure random values

## Using Secure Random Value

#### 1. Install as a dependency
  ```shell
  yarn add secure-random-value
  ```
#### 2. Import package
  ```TypeScript
  import { RandomString } from 'secure-random-string';
  ```
#### 3. Get a random value
  ```TypeScript
  let random_string = await RandomString();
  ```

## Documentation

### Methods

#### `RandomNumber(min?: number, max?: number): Promise<number>`
- `min: number = 0`: Minimum value, inclusive
- `max: number = min + 100`: Maximum value, inclusive
- Returns a `Promise<number>` object.

#### `RandomString(length?: number, charsets?: string | string[]): Promise<string>`
- `length: number = 32`: The length of the string to generate
- `charsets: string | string[] = ['alpha', 'alpha_upper', 'numeric']`: The set of characters to pick from. [There are a few built in character sets](#built-in-character-sets). You can also pass in an array of charactes to pick from: `['a', 'b', 'c', '1', '2', '3']`
- Returns a `Promise<string>` object.

### Properties

#### Built in character sets
- `'alpha'`: `/[a-z]/`
- `'alpha_upper'`: `/[A-Z]/`
- `'numeric'`: `/[0-9]/`
- `'emojis'`: A selection of easily identifiable emojis, including 😀 👍 🐱 😎 🔥
