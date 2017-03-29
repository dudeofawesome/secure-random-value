import { randomBytes as RandomBytes } from 'crypto';
import { endianness as Endianness } from 'os';

export function RandomNumber (min: number = 0, max: number = min + 100): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const difference = max - min;
    RandomBytes(Math.ceil(difference / Uint32MAX) + 1, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      const random_number: number = get_random_number(buffer);
      resolve(Math.round((random_number * difference) + min));
    });
  });
}

export function RandomString (
  length: number = 32, charsets: string[] | CHAR_SETS | CHAR_SETS[] = ['alpha', 'alpha_upper', 'numeric']
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (typeof charsets === 'string') {
      charsets = [charsets];
    }

    let charset: string[] = [];

    if (charsets[0].length !== 1) {
      (charsets as string[]).forEach((set_name) => {
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

    RandomBytes(length * 2, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      let result: string = '';

      while (result.length < length) {
        const random_number: number = get_random_number(buffer, result.length);

        result = result.concat(charset[
          Math.round(random_number * (charset.length - 1))
        ]);
      }

      resolve(result);
    });
  });
}

const Uint32MAX = 65536;
const LITTLE_ENDIAN: boolean = Endianness() === 'LE';
function get_random_number (buffer: Buffer, position: number = 0): number {
  if (LITTLE_ENDIAN) {
    return buffer.readUInt16LE(position) / Uint32MAX;
  } else {
    return buffer.readUInt16BE(position) / Uint32MAX;
  }
}

export type CHAR_SETS = 'alpha' | 'alpha_upper' | 'numeric' | 'emoji';

const DEFAULT_STRING_CHARS: {[key: string]: string[]} = {
  alpha: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z'
  ],
  alpha_upper: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'
  ],
  numeric: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  emoji: ['😀', '👍', '🐱', '😎', '🔥']
};
