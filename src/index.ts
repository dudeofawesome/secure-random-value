import { randomBytes } from 'crypto';
import { endianness } from 'os';
import { CHAR_SETS, DEFAULT_STRING_CHARS } from './char-sets';

const Uint32MAX = 65536;
const LITTLE_ENDIAN: boolean = endianness() === 'LE';

export function get_random_number(
  buffer: Buffer,
  position: number = 0,
): number {
  if (LITTLE_ENDIAN) {
    return buffer.readUInt16LE(position) / Uint32MAX;
  } else {
    return buffer.readUInt16BE(position) / Uint32MAX;
  }
}

export function RandomNumber(
  min: number = 0,
  max: number = min + 100,
): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const difference = max - min;
    randomBytes(Math.ceil(difference / Uint32MAX) + 1, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      const random_number: number = get_random_number(buffer);
      resolve(Math.round(random_number * difference + min));
    });
  });
}

export function RandomString(
  length: number = 32,
  charsets: string[] | CHAR_SETS | CHAR_SETS[] = [
    'alpha',
    'alpha_upper',
    'numeric',
  ],
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (typeof charsets === 'string') {
      charsets = [charsets];
    }

    let charset: string[] = [];

    if (charsets[0].length !== 1) {
      (charsets as string[]).forEach(set_name => {
        const selected_set = DEFAULT_STRING_CHARS[set_name];

        if (selected_set != null) {
          charset = charset.concat(selected_set);
        } else {
          return reject(new Error(`Unknown built-in char set.`));
        }
      });
    } else {
      charset = charsets;
    }

    randomBytes(length * 2, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      let result = '';

      while (result.length < length) {
        const random_number: number = get_random_number(buffer, result.length);

        result = result.concat(
          charset[Math.round(random_number * (charset.length - 1))],
        );
      }

      return resolve(result);
    });
  });
}
