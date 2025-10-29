// import { hash, verify, type Options } from '@node-rs/argon2';
import { compare, hash } from 'bcrypt-ts';

// const opts: Options = {
//     memoryCost: 19456,
//     timeCost: 2,
//     outputLen: 32,
//     parallelism: 1
// };

// export async function hashPassword(password: string) {
//     const result = await hash(password, opts);
//     return result;
// }

// export async function verifyPassword(data: { password: string; hash: string }) {
//     const { password, hash } = data;

//     const result = await verify(hash, password, opts);
//     return result;
// }

export async function hashPassword(password: string) {
    const result = await hash(password, 10);
    return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
    const { password, hash } = data;

    const result = await compare(password, hash);
    return result;
}
