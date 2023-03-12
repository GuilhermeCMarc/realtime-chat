import { compare, hash } from 'bcrypt';

export async function hashAsync (thing: string) {
  return hash(thing, 10);
}

export async function compareAsync (thing: string, real: string) {
  return compare(thing, real);
}