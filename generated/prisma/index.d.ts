
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model RegistrationToken
 * 
 */
export type RegistrationToken = $Result.DefaultSelection<Prisma.$RegistrationTokenPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model TwoFactorConfirmation
 * 
 */
export type TwoFactorConfirmation = $Result.DefaultSelection<Prisma.$TwoFactorConfirmationPayload>
/**
 * Model Meeting
 * 
 */
export type Meeting = $Result.DefaultSelection<Prisma.$MeetingPayload>
/**
 * Model Whisky
 * 
 */
export type Whisky = $Result.DefaultSelection<Prisma.$WhiskyPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const Status: {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registrationToken`: Exposes CRUD operations for the **RegistrationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegistrationTokens
    * const registrationTokens = await prisma.registrationToken.findMany()
    * ```
    */
  get registrationToken(): Prisma.RegistrationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.twoFactorConfirmation`: Exposes CRUD operations for the **TwoFactorConfirmation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TwoFactorConfirmations
    * const twoFactorConfirmations = await prisma.twoFactorConfirmation.findMany()
    * ```
    */
  get twoFactorConfirmation(): Prisma.TwoFactorConfirmationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meetings
    * const meetings = await prisma.meeting.findMany()
    * ```
    */
  get meeting(): Prisma.MeetingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.whisky`: Exposes CRUD operations for the **Whisky** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Whiskies
    * const whiskies = await prisma.whisky.findMany()
    * ```
    */
  get whisky(): Prisma.WhiskyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    RegistrationToken: 'RegistrationToken',
    VerificationToken: 'VerificationToken',
    PasswordResetToken: 'PasswordResetToken',
    TwoFactorConfirmation: 'TwoFactorConfirmation',
    Meeting: 'Meeting',
    Whisky: 'Whisky',
    Review: 'Review'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "registrationToken" | "verificationToken" | "passwordResetToken" | "twoFactorConfirmation" | "meeting" | "whisky" | "review"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      RegistrationToken: {
        payload: Prisma.$RegistrationTokenPayload<ExtArgs>
        fields: Prisma.RegistrationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>
          }
          findFirst: {
            args: Prisma.RegistrationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>
          }
          findMany: {
            args: Prisma.RegistrationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>[]
          }
          create: {
            args: Prisma.RegistrationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>
          }
          createMany: {
            args: Prisma.RegistrationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistrationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>[]
          }
          delete: {
            args: Prisma.RegistrationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>
          }
          update: {
            args: Prisma.RegistrationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>
          }
          deleteMany: {
            args: Prisma.RegistrationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistrationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>[]
          }
          upsert: {
            args: Prisma.RegistrationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationTokenPayload>
          }
          aggregate: {
            args: Prisma.RegistrationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistrationToken>
          }
          groupBy: {
            args: Prisma.RegistrationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistrationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationTokenCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      TwoFactorConfirmation: {
        payload: Prisma.$TwoFactorConfirmationPayload<ExtArgs>
        fields: Prisma.TwoFactorConfirmationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TwoFactorConfirmationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TwoFactorConfirmationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          findFirst: {
            args: Prisma.TwoFactorConfirmationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TwoFactorConfirmationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          findMany: {
            args: Prisma.TwoFactorConfirmationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>[]
          }
          create: {
            args: Prisma.TwoFactorConfirmationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          createMany: {
            args: Prisma.TwoFactorConfirmationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TwoFactorConfirmationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>[]
          }
          delete: {
            args: Prisma.TwoFactorConfirmationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          update: {
            args: Prisma.TwoFactorConfirmationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          deleteMany: {
            args: Prisma.TwoFactorConfirmationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TwoFactorConfirmationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TwoFactorConfirmationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>[]
          }
          upsert: {
            args: Prisma.TwoFactorConfirmationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwoFactorConfirmationPayload>
          }
          aggregate: {
            args: Prisma.TwoFactorConfirmationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwoFactorConfirmation>
          }
          groupBy: {
            args: Prisma.TwoFactorConfirmationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorConfirmationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TwoFactorConfirmationCountArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorConfirmationCountAggregateOutputType> | number
          }
        }
      }
      Meeting: {
        payload: Prisma.$MeetingPayload<ExtArgs>
        fields: Prisma.MeetingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findFirst: {
            args: Prisma.MeetingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findMany: {
            args: Prisma.MeetingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          create: {
            args: Prisma.MeetingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          createMany: {
            args: Prisma.MeetingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeetingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          delete: {
            args: Prisma.MeetingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          update: {
            args: Prisma.MeetingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeetingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          upsert: {
            args: Prisma.MeetingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          aggregate: {
            args: Prisma.MeetingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting>
          }
          groupBy: {
            args: Prisma.MeetingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingCountAggregateOutputType> | number
          }
        }
      }
      Whisky: {
        payload: Prisma.$WhiskyPayload<ExtArgs>
        fields: Prisma.WhiskyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WhiskyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WhiskyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>
          }
          findFirst: {
            args: Prisma.WhiskyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WhiskyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>
          }
          findMany: {
            args: Prisma.WhiskyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>[]
          }
          create: {
            args: Prisma.WhiskyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>
          }
          createMany: {
            args: Prisma.WhiskyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WhiskyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>[]
          }
          delete: {
            args: Prisma.WhiskyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>
          }
          update: {
            args: Prisma.WhiskyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>
          }
          deleteMany: {
            args: Prisma.WhiskyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WhiskyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WhiskyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>[]
          }
          upsert: {
            args: Prisma.WhiskyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhiskyPayload>
          }
          aggregate: {
            args: Prisma.WhiskyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWhisky>
          }
          groupBy: {
            args: Prisma.WhiskyGroupByArgs<ExtArgs>
            result: $Utils.Optional<WhiskyGroupByOutputType>[]
          }
          count: {
            args: Prisma.WhiskyCountArgs<ExtArgs>
            result: $Utils.Optional<WhiskyCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    registrationToken?: RegistrationTokenOmit
    verificationToken?: VerificationTokenOmit
    passwordResetToken?: PasswordResetTokenOmit
    twoFactorConfirmation?: TwoFactorConfirmationOmit
    meeting?: MeetingOmit
    whisky?: WhiskyOmit
    review?: ReviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    reviews: number
    meetings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    meetings?: boolean | UserCountOutputTypeCountMeetingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
  }


  /**
   * Count Type MeetingCountOutputType
   */

  export type MeetingCountOutputType = {
    whiskies: number
    users: number
  }

  export type MeetingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    whiskies?: boolean | MeetingCountOutputTypeCountWhiskiesArgs
    users?: boolean | MeetingCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingCountOutputType
     */
    select?: MeetingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountWhiskiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WhiskyWhereInput
  }

  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type WhiskyCountOutputType
   */

  export type WhiskyCountOutputType = {
    reviews: number
  }

  export type WhiskyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | WhiskyCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * WhiskyCountOutputType without action
   */
  export type WhiskyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhiskyCountOutputType
     */
    select?: WhiskyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WhiskyCountOutputType without action
   */
  export type WhiskyCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    emailVerified: Date | null
    registered: boolean | null
    image: string | null
    password: string | null
    role: $Enums.UserRole | null
    emailOld: string | null
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    otpEnabled: boolean | null
    otpVerified: boolean | null
    otpBase32: string | null
    otpAuthUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    emailVerified: Date | null
    registered: boolean | null
    image: string | null
    password: string | null
    role: $Enums.UserRole | null
    emailOld: string | null
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    otpEnabled: boolean | null
    otpVerified: boolean | null
    otpBase32: string | null
    otpAuthUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    emailVerified: number
    registered: number
    image: number
    password: number
    role: number
    emailOld: number
    passwordResetToken: number
    passwordResetExpires: number
    otpEnabled: number
    otpVerified: number
    otpBase32: number
    otpAuthUrl: number
    otpBackups: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    emailVerified?: true
    registered?: true
    image?: true
    password?: true
    role?: true
    emailOld?: true
    passwordResetToken?: true
    passwordResetExpires?: true
    otpEnabled?: true
    otpVerified?: true
    otpBase32?: true
    otpAuthUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    emailVerified?: true
    registered?: true
    image?: true
    password?: true
    role?: true
    emailOld?: true
    passwordResetToken?: true
    passwordResetExpires?: true
    otpEnabled?: true
    otpVerified?: true
    otpBase32?: true
    otpAuthUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    emailVerified?: true
    registered?: true
    image?: true
    password?: true
    role?: true
    emailOld?: true
    passwordResetToken?: true
    passwordResetExpires?: true
    otpEnabled?: true
    otpVerified?: true
    otpBase32?: true
    otpAuthUrl?: true
    otpBackups?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string | null
    lastName: string | null
    email: string | null
    emailVerified: Date | null
    registered: boolean
    image: string | null
    password: string | null
    role: $Enums.UserRole
    emailOld: string | null
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    otpEnabled: boolean
    otpVerified: boolean
    otpBase32: string | null
    otpAuthUrl: string | null
    otpBackups: string[]
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailVerified?: boolean
    registered?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    emailOld?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: boolean
    otpAuthUrl?: boolean
    otpBackups?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    twoFactorConfirmation?: boolean | User$twoFactorConfirmationArgs<ExtArgs>
    meetings?: boolean | User$meetingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailVerified?: boolean
    registered?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    emailOld?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: boolean
    otpAuthUrl?: boolean
    otpBackups?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailVerified?: boolean
    registered?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    emailOld?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: boolean
    otpAuthUrl?: boolean
    otpBackups?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailVerified?: boolean
    registered?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    emailOld?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: boolean
    otpAuthUrl?: boolean
    otpBackups?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "emailVerified" | "registered" | "image" | "password" | "role" | "emailOld" | "passwordResetToken" | "passwordResetExpires" | "otpEnabled" | "otpVerified" | "otpBase32" | "otpAuthUrl" | "otpBackups" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    twoFactorConfirmation?: boolean | User$twoFactorConfirmationArgs<ExtArgs>
    meetings?: boolean | User$meetingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      twoFactorConfirmation: Prisma.$TwoFactorConfirmationPayload<ExtArgs> | null
      meetings: Prisma.$MeetingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string | null
      lastName: string | null
      email: string | null
      emailVerified: Date | null
      registered: boolean
      image: string | null
      password: string | null
      role: $Enums.UserRole
      emailOld: string | null
      passwordResetToken: string | null
      passwordResetExpires: Date | null
      otpEnabled: boolean
      otpVerified: boolean
      otpBase32: string | null
      otpAuthUrl: string | null
      otpBackups: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    twoFactorConfirmation<T extends User$twoFactorConfirmationArgs<ExtArgs> = {}>(args?: Subset<T, User$twoFactorConfirmationArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    meetings<T extends User$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, User$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly registered: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly emailOld: FieldRef<"User", 'String'>
    readonly passwordResetToken: FieldRef<"User", 'String'>
    readonly passwordResetExpires: FieldRef<"User", 'DateTime'>
    readonly otpEnabled: FieldRef<"User", 'Boolean'>
    readonly otpVerified: FieldRef<"User", 'Boolean'>
    readonly otpBase32: FieldRef<"User", 'String'>
    readonly otpAuthUrl: FieldRef<"User", 'String'>
    readonly otpBackups: FieldRef<"User", 'String[]'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.twoFactorConfirmation
   */
  export type User$twoFactorConfirmationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    where?: TwoFactorConfirmationWhereInput
  }

  /**
   * User.meetings
   */
  export type User$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    cursor?: MeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model RegistrationToken
   */

  export type AggregateRegistrationToken = {
    _count: RegistrationTokenCountAggregateOutputType | null
    _min: RegistrationTokenMinAggregateOutputType | null
    _max: RegistrationTokenMaxAggregateOutputType | null
  }

  export type RegistrationTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
  }

  export type RegistrationTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
  }

  export type RegistrationTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    _all: number
  }


  export type RegistrationTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
  }

  export type RegistrationTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
  }

  export type RegistrationTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    _all?: true
  }

  export type RegistrationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistrationToken to aggregate.
     */
    where?: RegistrationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationTokens to fetch.
     */
    orderBy?: RegistrationTokenOrderByWithRelationInput | RegistrationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegistrationTokens
    **/
    _count?: true | RegistrationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationTokenMaxAggregateInputType
  }

  export type GetRegistrationTokenAggregateType<T extends RegistrationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistrationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistrationToken[P]>
      : GetScalarType<T[P], AggregateRegistrationToken[P]>
  }




  export type RegistrationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationTokenWhereInput
    orderBy?: RegistrationTokenOrderByWithAggregationInput | RegistrationTokenOrderByWithAggregationInput[]
    by: RegistrationTokenScalarFieldEnum[] | RegistrationTokenScalarFieldEnum
    having?: RegistrationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationTokenCountAggregateInputType | true
    _min?: RegistrationTokenMinAggregateInputType
    _max?: RegistrationTokenMaxAggregateInputType
  }

  export type RegistrationTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    _count: RegistrationTokenCountAggregateOutputType | null
    _min: RegistrationTokenMinAggregateOutputType | null
    _max: RegistrationTokenMaxAggregateOutputType | null
  }

  type GetRegistrationTokenGroupByPayload<T extends RegistrationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationTokenGroupByOutputType[P]>
        }
      >
    >


  export type RegistrationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
  }, ExtArgs["result"]["registrationToken"]>

  export type RegistrationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
  }, ExtArgs["result"]["registrationToken"]>

  export type RegistrationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
  }, ExtArgs["result"]["registrationToken"]>

  export type RegistrationTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
  }

  export type RegistrationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token", ExtArgs["result"]["registrationToken"]>

  export type $RegistrationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegistrationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
    }, ExtArgs["result"]["registrationToken"]>
    composites: {}
  }

  type RegistrationTokenGetPayload<S extends boolean | null | undefined | RegistrationTokenDefaultArgs> = $Result.GetResult<Prisma.$RegistrationTokenPayload, S>

  type RegistrationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationTokenCountAggregateInputType | true
    }

  export interface RegistrationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegistrationToken'], meta: { name: 'RegistrationToken' } }
    /**
     * Find zero or one RegistrationToken that matches the filter.
     * @param {RegistrationTokenFindUniqueArgs} args - Arguments to find a RegistrationToken
     * @example
     * // Get one RegistrationToken
     * const registrationToken = await prisma.registrationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationTokenFindUniqueArgs>(args: SelectSubset<T, RegistrationTokenFindUniqueArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegistrationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationTokenFindUniqueOrThrowArgs} args - Arguments to find a RegistrationToken
     * @example
     * // Get one RegistrationToken
     * const registrationToken = await prisma.registrationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistrationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenFindFirstArgs} args - Arguments to find a RegistrationToken
     * @example
     * // Get one RegistrationToken
     * const registrationToken = await prisma.registrationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationTokenFindFirstArgs>(args?: SelectSubset<T, RegistrationTokenFindFirstArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistrationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenFindFirstOrThrowArgs} args - Arguments to find a RegistrationToken
     * @example
     * // Get one RegistrationToken
     * const registrationToken = await prisma.registrationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegistrationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistrationTokens
     * const registrationTokens = await prisma.registrationToken.findMany()
     * 
     * // Get first 10 RegistrationTokens
     * const registrationTokens = await prisma.registrationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationTokenWithIdOnly = await prisma.registrationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistrationTokenFindManyArgs>(args?: SelectSubset<T, RegistrationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegistrationToken.
     * @param {RegistrationTokenCreateArgs} args - Arguments to create a RegistrationToken.
     * @example
     * // Create one RegistrationToken
     * const RegistrationToken = await prisma.registrationToken.create({
     *   data: {
     *     // ... data to create a RegistrationToken
     *   }
     * })
     * 
     */
    create<T extends RegistrationTokenCreateArgs>(args: SelectSubset<T, RegistrationTokenCreateArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegistrationTokens.
     * @param {RegistrationTokenCreateManyArgs} args - Arguments to create many RegistrationTokens.
     * @example
     * // Create many RegistrationTokens
     * const registrationToken = await prisma.registrationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrationTokenCreateManyArgs>(args?: SelectSubset<T, RegistrationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegistrationTokens and returns the data saved in the database.
     * @param {RegistrationTokenCreateManyAndReturnArgs} args - Arguments to create many RegistrationTokens.
     * @example
     * // Create many RegistrationTokens
     * const registrationToken = await prisma.registrationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegistrationTokens and only return the `id`
     * const registrationTokenWithIdOnly = await prisma.registrationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistrationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RegistrationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegistrationToken.
     * @param {RegistrationTokenDeleteArgs} args - Arguments to delete one RegistrationToken.
     * @example
     * // Delete one RegistrationToken
     * const RegistrationToken = await prisma.registrationToken.delete({
     *   where: {
     *     // ... filter to delete one RegistrationToken
     *   }
     * })
     * 
     */
    delete<T extends RegistrationTokenDeleteArgs>(args: SelectSubset<T, RegistrationTokenDeleteArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegistrationToken.
     * @param {RegistrationTokenUpdateArgs} args - Arguments to update one RegistrationToken.
     * @example
     * // Update one RegistrationToken
     * const registrationToken = await prisma.registrationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrationTokenUpdateArgs>(args: SelectSubset<T, RegistrationTokenUpdateArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegistrationTokens.
     * @param {RegistrationTokenDeleteManyArgs} args - Arguments to filter RegistrationTokens to delete.
     * @example
     * // Delete a few RegistrationTokens
     * const { count } = await prisma.registrationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrationTokenDeleteManyArgs>(args?: SelectSubset<T, RegistrationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistrationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistrationTokens
     * const registrationToken = await prisma.registrationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrationTokenUpdateManyArgs>(args: SelectSubset<T, RegistrationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistrationTokens and returns the data updated in the database.
     * @param {RegistrationTokenUpdateManyAndReturnArgs} args - Arguments to update many RegistrationTokens.
     * @example
     * // Update many RegistrationTokens
     * const registrationToken = await prisma.registrationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegistrationTokens and only return the `id`
     * const registrationTokenWithIdOnly = await prisma.registrationToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistrationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RegistrationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegistrationToken.
     * @param {RegistrationTokenUpsertArgs} args - Arguments to update or create a RegistrationToken.
     * @example
     * // Update or create a RegistrationToken
     * const registrationToken = await prisma.registrationToken.upsert({
     *   create: {
     *     // ... data to create a RegistrationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistrationToken we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationTokenUpsertArgs>(args: SelectSubset<T, RegistrationTokenUpsertArgs<ExtArgs>>): Prisma__RegistrationTokenClient<$Result.GetResult<Prisma.$RegistrationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegistrationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenCountArgs} args - Arguments to filter RegistrationTokens to count.
     * @example
     * // Count the number of RegistrationTokens
     * const count = await prisma.registrationToken.count({
     *   where: {
     *     // ... the filter for the RegistrationTokens we want to count
     *   }
     * })
    **/
    count<T extends RegistrationTokenCountArgs>(
      args?: Subset<T, RegistrationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegistrationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationTokenAggregateArgs>(args: Subset<T, RegistrationTokenAggregateArgs>): Prisma.PrismaPromise<GetRegistrationTokenAggregateType<T>>

    /**
     * Group by RegistrationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistrationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrationTokenGroupByArgs['orderBy'] }
        : { orderBy?: RegistrationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistrationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegistrationToken model
   */
  readonly fields: RegistrationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegistrationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegistrationToken model
   */
  interface RegistrationTokenFieldRefs {
    readonly id: FieldRef<"RegistrationToken", 'String'>
    readonly email: FieldRef<"RegistrationToken", 'String'>
    readonly token: FieldRef<"RegistrationToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RegistrationToken findUnique
   */
  export type RegistrationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * Filter, which RegistrationToken to fetch.
     */
    where: RegistrationTokenWhereUniqueInput
  }

  /**
   * RegistrationToken findUniqueOrThrow
   */
  export type RegistrationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * Filter, which RegistrationToken to fetch.
     */
    where: RegistrationTokenWhereUniqueInput
  }

  /**
   * RegistrationToken findFirst
   */
  export type RegistrationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * Filter, which RegistrationToken to fetch.
     */
    where?: RegistrationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationTokens to fetch.
     */
    orderBy?: RegistrationTokenOrderByWithRelationInput | RegistrationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistrationTokens.
     */
    cursor?: RegistrationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistrationTokens.
     */
    distinct?: RegistrationTokenScalarFieldEnum | RegistrationTokenScalarFieldEnum[]
  }

  /**
   * RegistrationToken findFirstOrThrow
   */
  export type RegistrationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * Filter, which RegistrationToken to fetch.
     */
    where?: RegistrationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationTokens to fetch.
     */
    orderBy?: RegistrationTokenOrderByWithRelationInput | RegistrationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistrationTokens.
     */
    cursor?: RegistrationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistrationTokens.
     */
    distinct?: RegistrationTokenScalarFieldEnum | RegistrationTokenScalarFieldEnum[]
  }

  /**
   * RegistrationToken findMany
   */
  export type RegistrationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * Filter, which RegistrationTokens to fetch.
     */
    where?: RegistrationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationTokens to fetch.
     */
    orderBy?: RegistrationTokenOrderByWithRelationInput | RegistrationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegistrationTokens.
     */
    cursor?: RegistrationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationTokens.
     */
    skip?: number
    distinct?: RegistrationTokenScalarFieldEnum | RegistrationTokenScalarFieldEnum[]
  }

  /**
   * RegistrationToken create
   */
  export type RegistrationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a RegistrationToken.
     */
    data: XOR<RegistrationTokenCreateInput, RegistrationTokenUncheckedCreateInput>
  }

  /**
   * RegistrationToken createMany
   */
  export type RegistrationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistrationTokens.
     */
    data: RegistrationTokenCreateManyInput | RegistrationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistrationToken createManyAndReturn
   */
  export type RegistrationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RegistrationTokens.
     */
    data: RegistrationTokenCreateManyInput | RegistrationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistrationToken update
   */
  export type RegistrationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a RegistrationToken.
     */
    data: XOR<RegistrationTokenUpdateInput, RegistrationTokenUncheckedUpdateInput>
    /**
     * Choose, which RegistrationToken to update.
     */
    where: RegistrationTokenWhereUniqueInput
  }

  /**
   * RegistrationToken updateMany
   */
  export type RegistrationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistrationTokens.
     */
    data: XOR<RegistrationTokenUpdateManyMutationInput, RegistrationTokenUncheckedUpdateManyInput>
    /**
     * Filter which RegistrationTokens to update
     */
    where?: RegistrationTokenWhereInput
    /**
     * Limit how many RegistrationTokens to update.
     */
    limit?: number
  }

  /**
   * RegistrationToken updateManyAndReturn
   */
  export type RegistrationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * The data used to update RegistrationTokens.
     */
    data: XOR<RegistrationTokenUpdateManyMutationInput, RegistrationTokenUncheckedUpdateManyInput>
    /**
     * Filter which RegistrationTokens to update
     */
    where?: RegistrationTokenWhereInput
    /**
     * Limit how many RegistrationTokens to update.
     */
    limit?: number
  }

  /**
   * RegistrationToken upsert
   */
  export type RegistrationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the RegistrationToken to update in case it exists.
     */
    where: RegistrationTokenWhereUniqueInput
    /**
     * In case the RegistrationToken found by the `where` argument doesn't exist, create a new RegistrationToken with this data.
     */
    create: XOR<RegistrationTokenCreateInput, RegistrationTokenUncheckedCreateInput>
    /**
     * In case the RegistrationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrationTokenUpdateInput, RegistrationTokenUncheckedUpdateInput>
  }

  /**
   * RegistrationToken delete
   */
  export type RegistrationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
    /**
     * Filter which RegistrationToken to delete.
     */
    where: RegistrationTokenWhereUniqueInput
  }

  /**
   * RegistrationToken deleteMany
   */
  export type RegistrationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistrationTokens to delete
     */
    where?: RegistrationTokenWhereInput
    /**
     * Limit how many RegistrationTokens to delete.
     */
    limit?: number
  }

  /**
   * RegistrationToken without action
   */
  export type RegistrationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationToken
     */
    select?: RegistrationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationToken
     */
    omit?: RegistrationTokenOmit<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly id: FieldRef<"VerificationToken", 'String'>
    readonly email: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expires: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    email: string
    token: string
    expires: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expires?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expires", ExtArgs["result"]["passwordResetToken"]>

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expires: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly email: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly expires: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
  }


  /**
   * Model TwoFactorConfirmation
   */

  export type AggregateTwoFactorConfirmation = {
    _count: TwoFactorConfirmationCountAggregateOutputType | null
    _min: TwoFactorConfirmationMinAggregateOutputType | null
    _max: TwoFactorConfirmationMaxAggregateOutputType | null
  }

  export type TwoFactorConfirmationMinAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type TwoFactorConfirmationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type TwoFactorConfirmationCountAggregateOutputType = {
    id: number
    userId: number
    _all: number
  }


  export type TwoFactorConfirmationMinAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TwoFactorConfirmationMaxAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TwoFactorConfirmationCountAggregateInputType = {
    id?: true
    userId?: true
    _all?: true
  }

  export type TwoFactorConfirmationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwoFactorConfirmation to aggregate.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TwoFactorConfirmations
    **/
    _count?: true | TwoFactorConfirmationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TwoFactorConfirmationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TwoFactorConfirmationMaxAggregateInputType
  }

  export type GetTwoFactorConfirmationAggregateType<T extends TwoFactorConfirmationAggregateArgs> = {
        [P in keyof T & keyof AggregateTwoFactorConfirmation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwoFactorConfirmation[P]>
      : GetScalarType<T[P], AggregateTwoFactorConfirmation[P]>
  }




  export type TwoFactorConfirmationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TwoFactorConfirmationWhereInput
    orderBy?: TwoFactorConfirmationOrderByWithAggregationInput | TwoFactorConfirmationOrderByWithAggregationInput[]
    by: TwoFactorConfirmationScalarFieldEnum[] | TwoFactorConfirmationScalarFieldEnum
    having?: TwoFactorConfirmationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TwoFactorConfirmationCountAggregateInputType | true
    _min?: TwoFactorConfirmationMinAggregateInputType
    _max?: TwoFactorConfirmationMaxAggregateInputType
  }

  export type TwoFactorConfirmationGroupByOutputType = {
    id: string
    userId: string
    _count: TwoFactorConfirmationCountAggregateOutputType | null
    _min: TwoFactorConfirmationMinAggregateOutputType | null
    _max: TwoFactorConfirmationMaxAggregateOutputType | null
  }

  type GetTwoFactorConfirmationGroupByPayload<T extends TwoFactorConfirmationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TwoFactorConfirmationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TwoFactorConfirmationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TwoFactorConfirmationGroupByOutputType[P]>
            : GetScalarType<T[P], TwoFactorConfirmationGroupByOutputType[P]>
        }
      >
    >


  export type TwoFactorConfirmationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactorConfirmation"]>

  export type TwoFactorConfirmationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactorConfirmation"]>

  export type TwoFactorConfirmationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactorConfirmation"]>

  export type TwoFactorConfirmationSelectScalar = {
    id?: boolean
    userId?: boolean
  }

  export type TwoFactorConfirmationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId", ExtArgs["result"]["twoFactorConfirmation"]>
  export type TwoFactorConfirmationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TwoFactorConfirmationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TwoFactorConfirmationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TwoFactorConfirmationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TwoFactorConfirmation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
    }, ExtArgs["result"]["twoFactorConfirmation"]>
    composites: {}
  }

  type TwoFactorConfirmationGetPayload<S extends boolean | null | undefined | TwoFactorConfirmationDefaultArgs> = $Result.GetResult<Prisma.$TwoFactorConfirmationPayload, S>

  type TwoFactorConfirmationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TwoFactorConfirmationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TwoFactorConfirmationCountAggregateInputType | true
    }

  export interface TwoFactorConfirmationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TwoFactorConfirmation'], meta: { name: 'TwoFactorConfirmation' } }
    /**
     * Find zero or one TwoFactorConfirmation that matches the filter.
     * @param {TwoFactorConfirmationFindUniqueArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TwoFactorConfirmationFindUniqueArgs>(args: SelectSubset<T, TwoFactorConfirmationFindUniqueArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TwoFactorConfirmation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TwoFactorConfirmationFindUniqueOrThrowArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TwoFactorConfirmationFindUniqueOrThrowArgs>(args: SelectSubset<T, TwoFactorConfirmationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactorConfirmation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationFindFirstArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TwoFactorConfirmationFindFirstArgs>(args?: SelectSubset<T, TwoFactorConfirmationFindFirstArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactorConfirmation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationFindFirstOrThrowArgs} args - Arguments to find a TwoFactorConfirmation
     * @example
     * // Get one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TwoFactorConfirmationFindFirstOrThrowArgs>(args?: SelectSubset<T, TwoFactorConfirmationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TwoFactorConfirmations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TwoFactorConfirmations
     * const twoFactorConfirmations = await prisma.twoFactorConfirmation.findMany()
     * 
     * // Get first 10 TwoFactorConfirmations
     * const twoFactorConfirmations = await prisma.twoFactorConfirmation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twoFactorConfirmationWithIdOnly = await prisma.twoFactorConfirmation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TwoFactorConfirmationFindManyArgs>(args?: SelectSubset<T, TwoFactorConfirmationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TwoFactorConfirmation.
     * @param {TwoFactorConfirmationCreateArgs} args - Arguments to create a TwoFactorConfirmation.
     * @example
     * // Create one TwoFactorConfirmation
     * const TwoFactorConfirmation = await prisma.twoFactorConfirmation.create({
     *   data: {
     *     // ... data to create a TwoFactorConfirmation
     *   }
     * })
     * 
     */
    create<T extends TwoFactorConfirmationCreateArgs>(args: SelectSubset<T, TwoFactorConfirmationCreateArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TwoFactorConfirmations.
     * @param {TwoFactorConfirmationCreateManyArgs} args - Arguments to create many TwoFactorConfirmations.
     * @example
     * // Create many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TwoFactorConfirmationCreateManyArgs>(args?: SelectSubset<T, TwoFactorConfirmationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TwoFactorConfirmations and returns the data saved in the database.
     * @param {TwoFactorConfirmationCreateManyAndReturnArgs} args - Arguments to create many TwoFactorConfirmations.
     * @example
     * // Create many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TwoFactorConfirmations and only return the `id`
     * const twoFactorConfirmationWithIdOnly = await prisma.twoFactorConfirmation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TwoFactorConfirmationCreateManyAndReturnArgs>(args?: SelectSubset<T, TwoFactorConfirmationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TwoFactorConfirmation.
     * @param {TwoFactorConfirmationDeleteArgs} args - Arguments to delete one TwoFactorConfirmation.
     * @example
     * // Delete one TwoFactorConfirmation
     * const TwoFactorConfirmation = await prisma.twoFactorConfirmation.delete({
     *   where: {
     *     // ... filter to delete one TwoFactorConfirmation
     *   }
     * })
     * 
     */
    delete<T extends TwoFactorConfirmationDeleteArgs>(args: SelectSubset<T, TwoFactorConfirmationDeleteArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TwoFactorConfirmation.
     * @param {TwoFactorConfirmationUpdateArgs} args - Arguments to update one TwoFactorConfirmation.
     * @example
     * // Update one TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TwoFactorConfirmationUpdateArgs>(args: SelectSubset<T, TwoFactorConfirmationUpdateArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TwoFactorConfirmations.
     * @param {TwoFactorConfirmationDeleteManyArgs} args - Arguments to filter TwoFactorConfirmations to delete.
     * @example
     * // Delete a few TwoFactorConfirmations
     * const { count } = await prisma.twoFactorConfirmation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TwoFactorConfirmationDeleteManyArgs>(args?: SelectSubset<T, TwoFactorConfirmationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactorConfirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TwoFactorConfirmationUpdateManyArgs>(args: SelectSubset<T, TwoFactorConfirmationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactorConfirmations and returns the data updated in the database.
     * @param {TwoFactorConfirmationUpdateManyAndReturnArgs} args - Arguments to update many TwoFactorConfirmations.
     * @example
     * // Update many TwoFactorConfirmations
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TwoFactorConfirmations and only return the `id`
     * const twoFactorConfirmationWithIdOnly = await prisma.twoFactorConfirmation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TwoFactorConfirmationUpdateManyAndReturnArgs>(args: SelectSubset<T, TwoFactorConfirmationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TwoFactorConfirmation.
     * @param {TwoFactorConfirmationUpsertArgs} args - Arguments to update or create a TwoFactorConfirmation.
     * @example
     * // Update or create a TwoFactorConfirmation
     * const twoFactorConfirmation = await prisma.twoFactorConfirmation.upsert({
     *   create: {
     *     // ... data to create a TwoFactorConfirmation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TwoFactorConfirmation we want to update
     *   }
     * })
     */
    upsert<T extends TwoFactorConfirmationUpsertArgs>(args: SelectSubset<T, TwoFactorConfirmationUpsertArgs<ExtArgs>>): Prisma__TwoFactorConfirmationClient<$Result.GetResult<Prisma.$TwoFactorConfirmationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TwoFactorConfirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationCountArgs} args - Arguments to filter TwoFactorConfirmations to count.
     * @example
     * // Count the number of TwoFactorConfirmations
     * const count = await prisma.twoFactorConfirmation.count({
     *   where: {
     *     // ... the filter for the TwoFactorConfirmations we want to count
     *   }
     * })
    **/
    count<T extends TwoFactorConfirmationCountArgs>(
      args?: Subset<T, TwoFactorConfirmationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TwoFactorConfirmationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TwoFactorConfirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TwoFactorConfirmationAggregateArgs>(args: Subset<T, TwoFactorConfirmationAggregateArgs>): Prisma.PrismaPromise<GetTwoFactorConfirmationAggregateType<T>>

    /**
     * Group by TwoFactorConfirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorConfirmationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TwoFactorConfirmationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TwoFactorConfirmationGroupByArgs['orderBy'] }
        : { orderBy?: TwoFactorConfirmationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TwoFactorConfirmationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwoFactorConfirmationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TwoFactorConfirmation model
   */
  readonly fields: TwoFactorConfirmationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TwoFactorConfirmation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TwoFactorConfirmationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TwoFactorConfirmation model
   */
  interface TwoFactorConfirmationFieldRefs {
    readonly id: FieldRef<"TwoFactorConfirmation", 'String'>
    readonly userId: FieldRef<"TwoFactorConfirmation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TwoFactorConfirmation findUnique
   */
  export type TwoFactorConfirmationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation findUniqueOrThrow
   */
  export type TwoFactorConfirmationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation findFirst
   */
  export type TwoFactorConfirmationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwoFactorConfirmations.
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwoFactorConfirmations.
     */
    distinct?: TwoFactorConfirmationScalarFieldEnum | TwoFactorConfirmationScalarFieldEnum[]
  }

  /**
   * TwoFactorConfirmation findFirstOrThrow
   */
  export type TwoFactorConfirmationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmation to fetch.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwoFactorConfirmations.
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwoFactorConfirmations.
     */
    distinct?: TwoFactorConfirmationScalarFieldEnum | TwoFactorConfirmationScalarFieldEnum[]
  }

  /**
   * TwoFactorConfirmation findMany
   */
  export type TwoFactorConfirmationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which TwoFactorConfirmations to fetch.
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwoFactorConfirmations to fetch.
     */
    orderBy?: TwoFactorConfirmationOrderByWithRelationInput | TwoFactorConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TwoFactorConfirmations.
     */
    cursor?: TwoFactorConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwoFactorConfirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwoFactorConfirmations.
     */
    skip?: number
    distinct?: TwoFactorConfirmationScalarFieldEnum | TwoFactorConfirmationScalarFieldEnum[]
  }

  /**
   * TwoFactorConfirmation create
   */
  export type TwoFactorConfirmationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to create a TwoFactorConfirmation.
     */
    data: XOR<TwoFactorConfirmationCreateInput, TwoFactorConfirmationUncheckedCreateInput>
  }

  /**
   * TwoFactorConfirmation createMany
   */
  export type TwoFactorConfirmationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TwoFactorConfirmations.
     */
    data: TwoFactorConfirmationCreateManyInput | TwoFactorConfirmationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TwoFactorConfirmation createManyAndReturn
   */
  export type TwoFactorConfirmationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * The data used to create many TwoFactorConfirmations.
     */
    data: TwoFactorConfirmationCreateManyInput | TwoFactorConfirmationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TwoFactorConfirmation update
   */
  export type TwoFactorConfirmationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to update a TwoFactorConfirmation.
     */
    data: XOR<TwoFactorConfirmationUpdateInput, TwoFactorConfirmationUncheckedUpdateInput>
    /**
     * Choose, which TwoFactorConfirmation to update.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation updateMany
   */
  export type TwoFactorConfirmationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TwoFactorConfirmations.
     */
    data: XOR<TwoFactorConfirmationUpdateManyMutationInput, TwoFactorConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which TwoFactorConfirmations to update
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * Limit how many TwoFactorConfirmations to update.
     */
    limit?: number
  }

  /**
   * TwoFactorConfirmation updateManyAndReturn
   */
  export type TwoFactorConfirmationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * The data used to update TwoFactorConfirmations.
     */
    data: XOR<TwoFactorConfirmationUpdateManyMutationInput, TwoFactorConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which TwoFactorConfirmations to update
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * Limit how many TwoFactorConfirmations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TwoFactorConfirmation upsert
   */
  export type TwoFactorConfirmationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * The filter to search for the TwoFactorConfirmation to update in case it exists.
     */
    where: TwoFactorConfirmationWhereUniqueInput
    /**
     * In case the TwoFactorConfirmation found by the `where` argument doesn't exist, create a new TwoFactorConfirmation with this data.
     */
    create: XOR<TwoFactorConfirmationCreateInput, TwoFactorConfirmationUncheckedCreateInput>
    /**
     * In case the TwoFactorConfirmation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TwoFactorConfirmationUpdateInput, TwoFactorConfirmationUncheckedUpdateInput>
  }

  /**
   * TwoFactorConfirmation delete
   */
  export type TwoFactorConfirmationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
    /**
     * Filter which TwoFactorConfirmation to delete.
     */
    where: TwoFactorConfirmationWhereUniqueInput
  }

  /**
   * TwoFactorConfirmation deleteMany
   */
  export type TwoFactorConfirmationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwoFactorConfirmations to delete
     */
    where?: TwoFactorConfirmationWhereInput
    /**
     * Limit how many TwoFactorConfirmations to delete.
     */
    limit?: number
  }

  /**
   * TwoFactorConfirmation without action
   */
  export type TwoFactorConfirmationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorConfirmation
     */
    select?: TwoFactorConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwoFactorConfirmation
     */
    omit?: TwoFactorConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TwoFactorConfirmationInclude<ExtArgs> | null
  }


  /**
   * Model Meeting
   */

  export type AggregateMeeting = {
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  export type MeetingMinAggregateOutputType = {
    id: string | null
    date: string | null
    location: string | null
    status: $Enums.Status | null
    quaich: string | null
  }

  export type MeetingMaxAggregateOutputType = {
    id: string | null
    date: string | null
    location: string | null
    status: $Enums.Status | null
    quaich: string | null
  }

  export type MeetingCountAggregateOutputType = {
    id: number
    date: number
    location: number
    status: number
    quaich: number
    _all: number
  }


  export type MeetingMinAggregateInputType = {
    id?: true
    date?: true
    location?: true
    status?: true
    quaich?: true
  }

  export type MeetingMaxAggregateInputType = {
    id?: true
    date?: true
    location?: true
    status?: true
    quaich?: true
  }

  export type MeetingCountAggregateInputType = {
    id?: true
    date?: true
    location?: true
    status?: true
    quaich?: true
    _all?: true
  }

  export type MeetingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meeting to aggregate.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meetings
    **/
    _count?: true | MeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingMaxAggregateInputType
  }

  export type GetMeetingAggregateType<T extends MeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting[P]>
      : GetScalarType<T[P], AggregateMeeting[P]>
  }




  export type MeetingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithAggregationInput | MeetingOrderByWithAggregationInput[]
    by: MeetingScalarFieldEnum[] | MeetingScalarFieldEnum
    having?: MeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingCountAggregateInputType | true
    _min?: MeetingMinAggregateInputType
    _max?: MeetingMaxAggregateInputType
  }

  export type MeetingGroupByOutputType = {
    id: string
    date: string
    location: string
    status: $Enums.Status
    quaich: string | null
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  type GetMeetingGroupByPayload<T extends MeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    location?: boolean
    status?: boolean
    quaich?: boolean
    whiskies?: boolean | Meeting$whiskiesArgs<ExtArgs>
    users?: boolean | Meeting$usersArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    location?: boolean
    status?: boolean
    quaich?: boolean
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    location?: boolean
    status?: boolean
    quaich?: boolean
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectScalar = {
    id?: boolean
    date?: boolean
    location?: boolean
    status?: boolean
    quaich?: boolean
  }

  export type MeetingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "location" | "status" | "quaich", ExtArgs["result"]["meeting"]>
  export type MeetingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    whiskies?: boolean | Meeting$whiskiesArgs<ExtArgs>
    users?: boolean | Meeting$usersArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MeetingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MeetingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MeetingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meeting"
    objects: {
      whiskies: Prisma.$WhiskyPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: string
      location: string
      status: $Enums.Status
      quaich: string | null
    }, ExtArgs["result"]["meeting"]>
    composites: {}
  }

  type MeetingGetPayload<S extends boolean | null | undefined | MeetingDefaultArgs> = $Result.GetResult<Prisma.$MeetingPayload, S>

  type MeetingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingCountAggregateInputType | true
    }

  export interface MeetingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meeting'], meta: { name: 'Meeting' } }
    /**
     * Find zero or one Meeting that matches the filter.
     * @param {MeetingFindUniqueArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingFindUniqueArgs>(args: SelectSubset<T, MeetingFindUniqueArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meeting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingFindUniqueOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingFindFirstArgs>(args?: SelectSubset<T, MeetingFindFirstArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meetings
     * const meetings = await prisma.meeting.findMany()
     * 
     * // Get first 10 Meetings
     * const meetings = await prisma.meeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingWithIdOnly = await prisma.meeting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingFindManyArgs>(args?: SelectSubset<T, MeetingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meeting.
     * @param {MeetingCreateArgs} args - Arguments to create a Meeting.
     * @example
     * // Create one Meeting
     * const Meeting = await prisma.meeting.create({
     *   data: {
     *     // ... data to create a Meeting
     *   }
     * })
     * 
     */
    create<T extends MeetingCreateArgs>(args: SelectSubset<T, MeetingCreateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meetings.
     * @param {MeetingCreateManyArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingCreateManyArgs>(args?: SelectSubset<T, MeetingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meetings and returns the data saved in the database.
     * @param {MeetingCreateManyAndReturnArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meetings and only return the `id`
     * const meetingWithIdOnly = await prisma.meeting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeetingCreateManyAndReturnArgs>(args?: SelectSubset<T, MeetingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meeting.
     * @param {MeetingDeleteArgs} args - Arguments to delete one Meeting.
     * @example
     * // Delete one Meeting
     * const Meeting = await prisma.meeting.delete({
     *   where: {
     *     // ... filter to delete one Meeting
     *   }
     * })
     * 
     */
    delete<T extends MeetingDeleteArgs>(args: SelectSubset<T, MeetingDeleteArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meeting.
     * @param {MeetingUpdateArgs} args - Arguments to update one Meeting.
     * @example
     * // Update one Meeting
     * const meeting = await prisma.meeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingUpdateArgs>(args: SelectSubset<T, MeetingUpdateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meetings.
     * @param {MeetingDeleteManyArgs} args - Arguments to filter Meetings to delete.
     * @example
     * // Delete a few Meetings
     * const { count } = await prisma.meeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingDeleteManyArgs>(args?: SelectSubset<T, MeetingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingUpdateManyArgs>(args: SelectSubset<T, MeetingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings and returns the data updated in the database.
     * @param {MeetingUpdateManyAndReturnArgs} args - Arguments to update many Meetings.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meetings and only return the `id`
     * const meetingWithIdOnly = await prisma.meeting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeetingUpdateManyAndReturnArgs>(args: SelectSubset<T, MeetingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meeting.
     * @param {MeetingUpsertArgs} args - Arguments to update or create a Meeting.
     * @example
     * // Update or create a Meeting
     * const meeting = await prisma.meeting.upsert({
     *   create: {
     *     // ... data to create a Meeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting we want to update
     *   }
     * })
     */
    upsert<T extends MeetingUpsertArgs>(args: SelectSubset<T, MeetingUpsertArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingCountArgs} args - Arguments to filter Meetings to count.
     * @example
     * // Count the number of Meetings
     * const count = await prisma.meeting.count({
     *   where: {
     *     // ... the filter for the Meetings we want to count
     *   }
     * })
    **/
    count<T extends MeetingCountArgs>(
      args?: Subset<T, MeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingAggregateArgs>(args: Subset<T, MeetingAggregateArgs>): Prisma.PrismaPromise<GetMeetingAggregateType<T>>

    /**
     * Group by Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meeting model
   */
  readonly fields: MeetingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    whiskies<T extends Meeting$whiskiesArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$whiskiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Meeting$usersArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Meeting model
   */
  interface MeetingFieldRefs {
    readonly id: FieldRef<"Meeting", 'String'>
    readonly date: FieldRef<"Meeting", 'String'>
    readonly location: FieldRef<"Meeting", 'String'>
    readonly status: FieldRef<"Meeting", 'Status'>
    readonly quaich: FieldRef<"Meeting", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Meeting findUnique
   */
  export type MeetingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findUniqueOrThrow
   */
  export type MeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findFirst
   */
  export type MeetingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findFirstOrThrow
   */
  export type MeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findMany
   */
  export type MeetingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meetings to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting create
   */
  export type MeetingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a Meeting.
     */
    data: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
  }

  /**
   * Meeting createMany
   */
  export type MeetingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meeting createManyAndReturn
   */
  export type MeetingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meeting update
   */
  export type MeetingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a Meeting.
     */
    data: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
    /**
     * Choose, which Meeting to update.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting updateMany
   */
  export type MeetingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
  }

  /**
   * Meeting updateManyAndReturn
   */
  export type MeetingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
  }

  /**
   * Meeting upsert
   */
  export type MeetingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the Meeting to update in case it exists.
     */
    where: MeetingWhereUniqueInput
    /**
     * In case the Meeting found by the `where` argument doesn't exist, create a new Meeting with this data.
     */
    create: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
    /**
     * In case the Meeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
  }

  /**
   * Meeting delete
   */
  export type MeetingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter which Meeting to delete.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting deleteMany
   */
  export type MeetingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meetings to delete
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to delete.
     */
    limit?: number
  }

  /**
   * Meeting.whiskies
   */
  export type Meeting$whiskiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    where?: WhiskyWhereInput
    orderBy?: WhiskyOrderByWithRelationInput | WhiskyOrderByWithRelationInput[]
    cursor?: WhiskyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WhiskyScalarFieldEnum | WhiskyScalarFieldEnum[]
  }

  /**
   * Meeting.users
   */
  export type Meeting$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Meeting without action
   */
  export type MeetingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
  }


  /**
   * Model Whisky
   */

  export type AggregateWhisky = {
    _count: WhiskyCountAggregateOutputType | null
    _avg: WhiskyAvgAggregateOutputType | null
    _sum: WhiskySumAggregateOutputType | null
    _min: WhiskyMinAggregateOutputType | null
    _max: WhiskyMaxAggregateOutputType | null
  }

  export type WhiskyAvgAggregateOutputType = {
    order: number | null
  }

  export type WhiskySumAggregateOutputType = {
    order: number | null
  }

  export type WhiskyMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    image: string | null
    quaich: boolean | null
    order: number | null
    meetingId: string | null
  }

  export type WhiskyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    image: string | null
    quaich: boolean | null
    order: number | null
    meetingId: string | null
  }

  export type WhiskyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    image: number
    quaich: number
    order: number
    meetingId: number
    _all: number
  }


  export type WhiskyAvgAggregateInputType = {
    order?: true
  }

  export type WhiskySumAggregateInputType = {
    order?: true
  }

  export type WhiskyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    image?: true
    quaich?: true
    order?: true
    meetingId?: true
  }

  export type WhiskyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    image?: true
    quaich?: true
    order?: true
    meetingId?: true
  }

  export type WhiskyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    image?: true
    quaich?: true
    order?: true
    meetingId?: true
    _all?: true
  }

  export type WhiskyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Whisky to aggregate.
     */
    where?: WhiskyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Whiskies to fetch.
     */
    orderBy?: WhiskyOrderByWithRelationInput | WhiskyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WhiskyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Whiskies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Whiskies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Whiskies
    **/
    _count?: true | WhiskyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WhiskyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WhiskySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WhiskyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WhiskyMaxAggregateInputType
  }

  export type GetWhiskyAggregateType<T extends WhiskyAggregateArgs> = {
        [P in keyof T & keyof AggregateWhisky]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhisky[P]>
      : GetScalarType<T[P], AggregateWhisky[P]>
  }




  export type WhiskyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WhiskyWhereInput
    orderBy?: WhiskyOrderByWithAggregationInput | WhiskyOrderByWithAggregationInput[]
    by: WhiskyScalarFieldEnum[] | WhiskyScalarFieldEnum
    having?: WhiskyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WhiskyCountAggregateInputType | true
    _avg?: WhiskyAvgAggregateInputType
    _sum?: WhiskySumAggregateInputType
    _min?: WhiskyMinAggregateInputType
    _max?: WhiskyMaxAggregateInputType
  }

  export type WhiskyGroupByOutputType = {
    id: string
    name: string
    description: string | null
    image: string | null
    quaich: boolean
    order: number
    meetingId: string
    _count: WhiskyCountAggregateOutputType | null
    _avg: WhiskyAvgAggregateOutputType | null
    _sum: WhiskySumAggregateOutputType | null
    _min: WhiskyMinAggregateOutputType | null
    _max: WhiskyMaxAggregateOutputType | null
  }

  type GetWhiskyGroupByPayload<T extends WhiskyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WhiskyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WhiskyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WhiskyGroupByOutputType[P]>
            : GetScalarType<T[P], WhiskyGroupByOutputType[P]>
        }
      >
    >


  export type WhiskySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    quaich?: boolean
    order?: boolean
    meetingId?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    reviews?: boolean | Whisky$reviewsArgs<ExtArgs>
    _count?: boolean | WhiskyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whisky"]>

  export type WhiskySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    quaich?: boolean
    order?: boolean
    meetingId?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whisky"]>

  export type WhiskySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    quaich?: boolean
    order?: boolean
    meetingId?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whisky"]>

  export type WhiskySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    quaich?: boolean
    order?: boolean
    meetingId?: boolean
  }

  export type WhiskyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "image" | "quaich" | "order" | "meetingId", ExtArgs["result"]["whisky"]>
  export type WhiskyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    reviews?: boolean | Whisky$reviewsArgs<ExtArgs>
    _count?: boolean | WhiskyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WhiskyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }
  export type WhiskyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }

  export type $WhiskyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Whisky"
    objects: {
      meeting: Prisma.$MeetingPayload<ExtArgs>
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      image: string | null
      quaich: boolean
      order: number
      meetingId: string
    }, ExtArgs["result"]["whisky"]>
    composites: {}
  }

  type WhiskyGetPayload<S extends boolean | null | undefined | WhiskyDefaultArgs> = $Result.GetResult<Prisma.$WhiskyPayload, S>

  type WhiskyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WhiskyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WhiskyCountAggregateInputType | true
    }

  export interface WhiskyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Whisky'], meta: { name: 'Whisky' } }
    /**
     * Find zero or one Whisky that matches the filter.
     * @param {WhiskyFindUniqueArgs} args - Arguments to find a Whisky
     * @example
     * // Get one Whisky
     * const whisky = await prisma.whisky.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WhiskyFindUniqueArgs>(args: SelectSubset<T, WhiskyFindUniqueArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Whisky that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WhiskyFindUniqueOrThrowArgs} args - Arguments to find a Whisky
     * @example
     * // Get one Whisky
     * const whisky = await prisma.whisky.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WhiskyFindUniqueOrThrowArgs>(args: SelectSubset<T, WhiskyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Whisky that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyFindFirstArgs} args - Arguments to find a Whisky
     * @example
     * // Get one Whisky
     * const whisky = await prisma.whisky.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WhiskyFindFirstArgs>(args?: SelectSubset<T, WhiskyFindFirstArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Whisky that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyFindFirstOrThrowArgs} args - Arguments to find a Whisky
     * @example
     * // Get one Whisky
     * const whisky = await prisma.whisky.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WhiskyFindFirstOrThrowArgs>(args?: SelectSubset<T, WhiskyFindFirstOrThrowArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Whiskies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Whiskies
     * const whiskies = await prisma.whisky.findMany()
     * 
     * // Get first 10 Whiskies
     * const whiskies = await prisma.whisky.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whiskyWithIdOnly = await prisma.whisky.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WhiskyFindManyArgs>(args?: SelectSubset<T, WhiskyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Whisky.
     * @param {WhiskyCreateArgs} args - Arguments to create a Whisky.
     * @example
     * // Create one Whisky
     * const Whisky = await prisma.whisky.create({
     *   data: {
     *     // ... data to create a Whisky
     *   }
     * })
     * 
     */
    create<T extends WhiskyCreateArgs>(args: SelectSubset<T, WhiskyCreateArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Whiskies.
     * @param {WhiskyCreateManyArgs} args - Arguments to create many Whiskies.
     * @example
     * // Create many Whiskies
     * const whisky = await prisma.whisky.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WhiskyCreateManyArgs>(args?: SelectSubset<T, WhiskyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Whiskies and returns the data saved in the database.
     * @param {WhiskyCreateManyAndReturnArgs} args - Arguments to create many Whiskies.
     * @example
     * // Create many Whiskies
     * const whisky = await prisma.whisky.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Whiskies and only return the `id`
     * const whiskyWithIdOnly = await prisma.whisky.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WhiskyCreateManyAndReturnArgs>(args?: SelectSubset<T, WhiskyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Whisky.
     * @param {WhiskyDeleteArgs} args - Arguments to delete one Whisky.
     * @example
     * // Delete one Whisky
     * const Whisky = await prisma.whisky.delete({
     *   where: {
     *     // ... filter to delete one Whisky
     *   }
     * })
     * 
     */
    delete<T extends WhiskyDeleteArgs>(args: SelectSubset<T, WhiskyDeleteArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Whisky.
     * @param {WhiskyUpdateArgs} args - Arguments to update one Whisky.
     * @example
     * // Update one Whisky
     * const whisky = await prisma.whisky.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WhiskyUpdateArgs>(args: SelectSubset<T, WhiskyUpdateArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Whiskies.
     * @param {WhiskyDeleteManyArgs} args - Arguments to filter Whiskies to delete.
     * @example
     * // Delete a few Whiskies
     * const { count } = await prisma.whisky.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WhiskyDeleteManyArgs>(args?: SelectSubset<T, WhiskyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Whiskies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Whiskies
     * const whisky = await prisma.whisky.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WhiskyUpdateManyArgs>(args: SelectSubset<T, WhiskyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Whiskies and returns the data updated in the database.
     * @param {WhiskyUpdateManyAndReturnArgs} args - Arguments to update many Whiskies.
     * @example
     * // Update many Whiskies
     * const whisky = await prisma.whisky.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Whiskies and only return the `id`
     * const whiskyWithIdOnly = await prisma.whisky.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WhiskyUpdateManyAndReturnArgs>(args: SelectSubset<T, WhiskyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Whisky.
     * @param {WhiskyUpsertArgs} args - Arguments to update or create a Whisky.
     * @example
     * // Update or create a Whisky
     * const whisky = await prisma.whisky.upsert({
     *   create: {
     *     // ... data to create a Whisky
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Whisky we want to update
     *   }
     * })
     */
    upsert<T extends WhiskyUpsertArgs>(args: SelectSubset<T, WhiskyUpsertArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Whiskies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyCountArgs} args - Arguments to filter Whiskies to count.
     * @example
     * // Count the number of Whiskies
     * const count = await prisma.whisky.count({
     *   where: {
     *     // ... the filter for the Whiskies we want to count
     *   }
     * })
    **/
    count<T extends WhiskyCountArgs>(
      args?: Subset<T, WhiskyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WhiskyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Whisky.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WhiskyAggregateArgs>(args: Subset<T, WhiskyAggregateArgs>): Prisma.PrismaPromise<GetWhiskyAggregateType<T>>

    /**
     * Group by Whisky.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhiskyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WhiskyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhiskyGroupByArgs['orderBy'] }
        : { orderBy?: WhiskyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WhiskyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhiskyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Whisky model
   */
  readonly fields: WhiskyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Whisky.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WhiskyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting<T extends MeetingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MeetingDefaultArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviews<T extends Whisky$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Whisky$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Whisky model
   */
  interface WhiskyFieldRefs {
    readonly id: FieldRef<"Whisky", 'String'>
    readonly name: FieldRef<"Whisky", 'String'>
    readonly description: FieldRef<"Whisky", 'String'>
    readonly image: FieldRef<"Whisky", 'String'>
    readonly quaich: FieldRef<"Whisky", 'Boolean'>
    readonly order: FieldRef<"Whisky", 'Int'>
    readonly meetingId: FieldRef<"Whisky", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Whisky findUnique
   */
  export type WhiskyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * Filter, which Whisky to fetch.
     */
    where: WhiskyWhereUniqueInput
  }

  /**
   * Whisky findUniqueOrThrow
   */
  export type WhiskyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * Filter, which Whisky to fetch.
     */
    where: WhiskyWhereUniqueInput
  }

  /**
   * Whisky findFirst
   */
  export type WhiskyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * Filter, which Whisky to fetch.
     */
    where?: WhiskyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Whiskies to fetch.
     */
    orderBy?: WhiskyOrderByWithRelationInput | WhiskyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Whiskies.
     */
    cursor?: WhiskyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Whiskies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Whiskies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Whiskies.
     */
    distinct?: WhiskyScalarFieldEnum | WhiskyScalarFieldEnum[]
  }

  /**
   * Whisky findFirstOrThrow
   */
  export type WhiskyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * Filter, which Whisky to fetch.
     */
    where?: WhiskyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Whiskies to fetch.
     */
    orderBy?: WhiskyOrderByWithRelationInput | WhiskyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Whiskies.
     */
    cursor?: WhiskyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Whiskies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Whiskies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Whiskies.
     */
    distinct?: WhiskyScalarFieldEnum | WhiskyScalarFieldEnum[]
  }

  /**
   * Whisky findMany
   */
  export type WhiskyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * Filter, which Whiskies to fetch.
     */
    where?: WhiskyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Whiskies to fetch.
     */
    orderBy?: WhiskyOrderByWithRelationInput | WhiskyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Whiskies.
     */
    cursor?: WhiskyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Whiskies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Whiskies.
     */
    skip?: number
    distinct?: WhiskyScalarFieldEnum | WhiskyScalarFieldEnum[]
  }

  /**
   * Whisky create
   */
  export type WhiskyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * The data needed to create a Whisky.
     */
    data: XOR<WhiskyCreateInput, WhiskyUncheckedCreateInput>
  }

  /**
   * Whisky createMany
   */
  export type WhiskyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Whiskies.
     */
    data: WhiskyCreateManyInput | WhiskyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Whisky createManyAndReturn
   */
  export type WhiskyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * The data used to create many Whiskies.
     */
    data: WhiskyCreateManyInput | WhiskyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Whisky update
   */
  export type WhiskyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * The data needed to update a Whisky.
     */
    data: XOR<WhiskyUpdateInput, WhiskyUncheckedUpdateInput>
    /**
     * Choose, which Whisky to update.
     */
    where: WhiskyWhereUniqueInput
  }

  /**
   * Whisky updateMany
   */
  export type WhiskyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Whiskies.
     */
    data: XOR<WhiskyUpdateManyMutationInput, WhiskyUncheckedUpdateManyInput>
    /**
     * Filter which Whiskies to update
     */
    where?: WhiskyWhereInput
    /**
     * Limit how many Whiskies to update.
     */
    limit?: number
  }

  /**
   * Whisky updateManyAndReturn
   */
  export type WhiskyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * The data used to update Whiskies.
     */
    data: XOR<WhiskyUpdateManyMutationInput, WhiskyUncheckedUpdateManyInput>
    /**
     * Filter which Whiskies to update
     */
    where?: WhiskyWhereInput
    /**
     * Limit how many Whiskies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Whisky upsert
   */
  export type WhiskyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * The filter to search for the Whisky to update in case it exists.
     */
    where: WhiskyWhereUniqueInput
    /**
     * In case the Whisky found by the `where` argument doesn't exist, create a new Whisky with this data.
     */
    create: XOR<WhiskyCreateInput, WhiskyUncheckedCreateInput>
    /**
     * In case the Whisky was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WhiskyUpdateInput, WhiskyUncheckedUpdateInput>
  }

  /**
   * Whisky delete
   */
  export type WhiskyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
    /**
     * Filter which Whisky to delete.
     */
    where: WhiskyWhereUniqueInput
  }

  /**
   * Whisky deleteMany
   */
  export type WhiskyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Whiskies to delete
     */
    where?: WhiskyWhereInput
    /**
     * Limit how many Whiskies to delete.
     */
    limit?: number
  }

  /**
   * Whisky.reviews
   */
  export type Whisky$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Whisky without action
   */
  export type WhiskyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Whisky
     */
    select?: WhiskySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Whisky
     */
    omit?: WhiskyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WhiskyInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    userId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
    whiskyId: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
    whiskyId: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    userId: number
    rating: number
    comment: number
    createdAt: number
    updatedAt: number
    whiskyId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    userId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    whiskyId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    userId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    whiskyId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    userId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    whiskyId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    userId: string
    rating: number
    comment: string
    createdAt: Date
    updatedAt: Date
    whiskyId: string
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whiskyId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    whisky?: boolean | WhiskyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whiskyId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    whisky?: boolean | WhiskyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whiskyId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    whisky?: boolean | WhiskyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whiskyId?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "rating" | "comment" | "createdAt" | "updatedAt" | "whiskyId", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    whisky?: boolean | WhiskyDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    whisky?: boolean | WhiskyDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    whisky?: boolean | WhiskyDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      whisky: Prisma.$WhiskyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      rating: number
      comment: string
      createdAt: Date
      updatedAt: Date
      whiskyId: string
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    whisky<T extends WhiskyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WhiskyDefaultArgs<ExtArgs>>): Prisma__WhiskyClient<$Result.GetResult<Prisma.$WhiskyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly userId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Float'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
    readonly whiskyId: FieldRef<"Review", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    emailVerified: 'emailVerified',
    registered: 'registered',
    image: 'image',
    password: 'password',
    role: 'role',
    emailOld: 'emailOld',
    passwordResetToken: 'passwordResetToken',
    passwordResetExpires: 'passwordResetExpires',
    otpEnabled: 'otpEnabled',
    otpVerified: 'otpVerified',
    otpBase32: 'otpBase32',
    otpAuthUrl: 'otpAuthUrl',
    otpBackups: 'otpBackups',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const RegistrationTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token'
  };

  export type RegistrationTokenScalarFieldEnum = (typeof RegistrationTokenScalarFieldEnum)[keyof typeof RegistrationTokenScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expires: 'expires'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const TwoFactorConfirmationScalarFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type TwoFactorConfirmationScalarFieldEnum = (typeof TwoFactorConfirmationScalarFieldEnum)[keyof typeof TwoFactorConfirmationScalarFieldEnum]


  export const MeetingScalarFieldEnum: {
    id: 'id',
    date: 'date',
    location: 'location',
    status: 'status',
    quaich: 'quaich'
  };

  export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum]


  export const WhiskyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    image: 'image',
    quaich: 'quaich',
    order: 'order',
    meetingId: 'meetingId'
  };

  export type WhiskyScalarFieldEnum = (typeof WhiskyScalarFieldEnum)[keyof typeof WhiskyScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    whiskyId: 'whiskyId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    image: 'image',
    password: 'password',
    emailOld: 'emailOld',
    passwordResetToken: 'passwordResetToken',
    otpBase32: 'otpBase32',
    otpAuthUrl: 'otpAuthUrl',
    otpBackups: 'otpBackups'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const AccountOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountOrderByRelevanceFieldEnum = (typeof AccountOrderByRelevanceFieldEnum)[keyof typeof AccountOrderByRelevanceFieldEnum]


  export const RegistrationTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token'
  };

  export type RegistrationTokenOrderByRelevanceFieldEnum = (typeof RegistrationTokenOrderByRelevanceFieldEnum)[keyof typeof RegistrationTokenOrderByRelevanceFieldEnum]


  export const VerificationTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token'
  };

  export type VerificationTokenOrderByRelevanceFieldEnum = (typeof VerificationTokenOrderByRelevanceFieldEnum)[keyof typeof VerificationTokenOrderByRelevanceFieldEnum]


  export const PasswordResetTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token'
  };

  export type PasswordResetTokenOrderByRelevanceFieldEnum = (typeof PasswordResetTokenOrderByRelevanceFieldEnum)[keyof typeof PasswordResetTokenOrderByRelevanceFieldEnum]


  export const TwoFactorConfirmationOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type TwoFactorConfirmationOrderByRelevanceFieldEnum = (typeof TwoFactorConfirmationOrderByRelevanceFieldEnum)[keyof typeof TwoFactorConfirmationOrderByRelevanceFieldEnum]


  export const MeetingOrderByRelevanceFieldEnum: {
    id: 'id',
    date: 'date',
    location: 'location',
    quaich: 'quaich'
  };

  export type MeetingOrderByRelevanceFieldEnum = (typeof MeetingOrderByRelevanceFieldEnum)[keyof typeof MeetingOrderByRelevanceFieldEnum]


  export const WhiskyOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    image: 'image',
    meetingId: 'meetingId'
  };

  export type WhiskyOrderByRelevanceFieldEnum = (typeof WhiskyOrderByRelevanceFieldEnum)[keyof typeof WhiskyOrderByRelevanceFieldEnum]


  export const ReviewOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    comment: 'comment',
    whiskyId: 'whiskyId'
  };

  export type ReviewOrderByRelevanceFieldEnum = (typeof ReviewOrderByRelevanceFieldEnum)[keyof typeof ReviewOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    registered?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    emailOld?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    otpEnabled?: BoolFilter<"User"> | boolean
    otpVerified?: BoolFilter<"User"> | boolean
    otpBase32?: StringNullableFilter<"User"> | string | null
    otpAuthUrl?: StringNullableFilter<"User"> | string | null
    otpBackups?: StringNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    reviews?: ReviewListRelationFilter
    twoFactorConfirmation?: XOR<TwoFactorConfirmationNullableScalarRelationFilter, TwoFactorConfirmationWhereInput> | null
    meetings?: MeetingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    registered?: SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    emailOld?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpires?: SortOrderInput | SortOrder
    otpEnabled?: SortOrder
    otpVerified?: SortOrder
    otpBase32?: SortOrderInput | SortOrder
    otpAuthUrl?: SortOrderInput | SortOrder
    otpBackups?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    twoFactorConfirmation?: TwoFactorConfirmationOrderByWithRelationInput
    meetings?: MeetingOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    registered?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    emailOld?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    otpEnabled?: BoolFilter<"User"> | boolean
    otpVerified?: BoolFilter<"User"> | boolean
    otpBase32?: StringNullableFilter<"User"> | string | null
    otpAuthUrl?: StringNullableFilter<"User"> | string | null
    otpBackups?: StringNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    reviews?: ReviewListRelationFilter
    twoFactorConfirmation?: XOR<TwoFactorConfirmationNullableScalarRelationFilter, TwoFactorConfirmationWhereInput> | null
    meetings?: MeetingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    registered?: SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    emailOld?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpires?: SortOrderInput | SortOrder
    otpEnabled?: SortOrder
    otpVerified?: SortOrder
    otpBase32?: SortOrderInput | SortOrder
    otpAuthUrl?: SortOrderInput | SortOrder
    otpBackups?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    registered?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    emailOld?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    otpEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    otpVerified?: BoolWithAggregatesFilter<"User"> | boolean
    otpBase32?: StringNullableWithAggregatesFilter<"User"> | string | null
    otpAuthUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    otpBackups?: StringNullableListFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: AccountOrderByRelevanceInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type RegistrationTokenWhereInput = {
    AND?: RegistrationTokenWhereInput | RegistrationTokenWhereInput[]
    OR?: RegistrationTokenWhereInput[]
    NOT?: RegistrationTokenWhereInput | RegistrationTokenWhereInput[]
    id?: StringFilter<"RegistrationToken"> | string
    email?: StringFilter<"RegistrationToken"> | string
    token?: StringFilter<"RegistrationToken"> | string
  }

  export type RegistrationTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    _relevance?: RegistrationTokenOrderByRelevanceInput
  }

  export type RegistrationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_token?: RegistrationTokenEmailTokenCompoundUniqueInput
    AND?: RegistrationTokenWhereInput | RegistrationTokenWhereInput[]
    OR?: RegistrationTokenWhereInput[]
    NOT?: RegistrationTokenWhereInput | RegistrationTokenWhereInput[]
    email?: StringFilter<"RegistrationToken"> | string
  }, "id" | "token" | "email_token">

  export type RegistrationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    _count?: RegistrationTokenCountOrderByAggregateInput
    _max?: RegistrationTokenMaxOrderByAggregateInput
    _min?: RegistrationTokenMinOrderByAggregateInput
  }

  export type RegistrationTokenScalarWhereWithAggregatesInput = {
    AND?: RegistrationTokenScalarWhereWithAggregatesInput | RegistrationTokenScalarWhereWithAggregatesInput[]
    OR?: RegistrationTokenScalarWhereWithAggregatesInput[]
    NOT?: RegistrationTokenScalarWhereWithAggregatesInput | RegistrationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RegistrationToken"> | string
    email?: StringWithAggregatesFilter<"RegistrationToken"> | string
    token?: StringWithAggregatesFilter<"RegistrationToken"> | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    id?: StringFilter<"VerificationToken"> | string
    email?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _relevance?: VerificationTokenOrderByRelevanceInput
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_token?: VerificationTokenEmailTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    email?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "id" | "token" | "email_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationToken"> | string
    email?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    email?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expires?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _relevance?: PasswordResetTokenOrderByRelevanceInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_token?: PasswordResetTokenEmailTokenCompoundUniqueInput
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    email?: StringFilter<"PasswordResetToken"> | string
    expires?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }, "id" | "token" | "email_token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    email?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expires?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type TwoFactorConfirmationWhereInput = {
    AND?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    OR?: TwoFactorConfirmationWhereInput[]
    NOT?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    id?: StringFilter<"TwoFactorConfirmation"> | string
    userId?: StringFilter<"TwoFactorConfirmation"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TwoFactorConfirmationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: TwoFactorConfirmationOrderByRelevanceInput
  }

  export type TwoFactorConfirmationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    OR?: TwoFactorConfirmationWhereInput[]
    NOT?: TwoFactorConfirmationWhereInput | TwoFactorConfirmationWhereInput[]
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type TwoFactorConfirmationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    _count?: TwoFactorConfirmationCountOrderByAggregateInput
    _max?: TwoFactorConfirmationMaxOrderByAggregateInput
    _min?: TwoFactorConfirmationMinOrderByAggregateInput
  }

  export type TwoFactorConfirmationScalarWhereWithAggregatesInput = {
    AND?: TwoFactorConfirmationScalarWhereWithAggregatesInput | TwoFactorConfirmationScalarWhereWithAggregatesInput[]
    OR?: TwoFactorConfirmationScalarWhereWithAggregatesInput[]
    NOT?: TwoFactorConfirmationScalarWhereWithAggregatesInput | TwoFactorConfirmationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TwoFactorConfirmation"> | string
    userId?: StringWithAggregatesFilter<"TwoFactorConfirmation"> | string
  }

  export type MeetingWhereInput = {
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    id?: StringFilter<"Meeting"> | string
    date?: StringFilter<"Meeting"> | string
    location?: StringFilter<"Meeting"> | string
    status?: EnumStatusFilter<"Meeting"> | $Enums.Status
    quaich?: StringNullableFilter<"Meeting"> | string | null
    whiskies?: WhiskyListRelationFilter
    users?: UserListRelationFilter
  }

  export type MeetingOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    location?: SortOrder
    status?: SortOrder
    quaich?: SortOrderInput | SortOrder
    whiskies?: WhiskyOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
    _relevance?: MeetingOrderByRelevanceInput
  }

  export type MeetingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    date?: StringFilter<"Meeting"> | string
    location?: StringFilter<"Meeting"> | string
    status?: EnumStatusFilter<"Meeting"> | $Enums.Status
    quaich?: StringNullableFilter<"Meeting"> | string | null
    whiskies?: WhiskyListRelationFilter
    users?: UserListRelationFilter
  }, "id">

  export type MeetingOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    location?: SortOrder
    status?: SortOrder
    quaich?: SortOrderInput | SortOrder
    _count?: MeetingCountOrderByAggregateInput
    _max?: MeetingMaxOrderByAggregateInput
    _min?: MeetingMinOrderByAggregateInput
  }

  export type MeetingScalarWhereWithAggregatesInput = {
    AND?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    OR?: MeetingScalarWhereWithAggregatesInput[]
    NOT?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Meeting"> | string
    date?: StringWithAggregatesFilter<"Meeting"> | string
    location?: StringWithAggregatesFilter<"Meeting"> | string
    status?: EnumStatusWithAggregatesFilter<"Meeting"> | $Enums.Status
    quaich?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
  }

  export type WhiskyWhereInput = {
    AND?: WhiskyWhereInput | WhiskyWhereInput[]
    OR?: WhiskyWhereInput[]
    NOT?: WhiskyWhereInput | WhiskyWhereInput[]
    id?: StringFilter<"Whisky"> | string
    name?: StringFilter<"Whisky"> | string
    description?: StringNullableFilter<"Whisky"> | string | null
    image?: StringNullableFilter<"Whisky"> | string | null
    quaich?: BoolFilter<"Whisky"> | boolean
    order?: IntFilter<"Whisky"> | number
    meetingId?: StringFilter<"Whisky"> | string
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
    reviews?: ReviewListRelationFilter
  }

  export type WhiskyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    quaich?: SortOrder
    order?: SortOrder
    meetingId?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
    reviews?: ReviewOrderByRelationAggregateInput
    _relevance?: WhiskyOrderByRelevanceInput
  }

  export type WhiskyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WhiskyWhereInput | WhiskyWhereInput[]
    OR?: WhiskyWhereInput[]
    NOT?: WhiskyWhereInput | WhiskyWhereInput[]
    name?: StringFilter<"Whisky"> | string
    description?: StringNullableFilter<"Whisky"> | string | null
    image?: StringNullableFilter<"Whisky"> | string | null
    quaich?: BoolFilter<"Whisky"> | boolean
    order?: IntFilter<"Whisky"> | number
    meetingId?: StringFilter<"Whisky"> | string
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
    reviews?: ReviewListRelationFilter
  }, "id">

  export type WhiskyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    quaich?: SortOrder
    order?: SortOrder
    meetingId?: SortOrder
    _count?: WhiskyCountOrderByAggregateInput
    _avg?: WhiskyAvgOrderByAggregateInput
    _max?: WhiskyMaxOrderByAggregateInput
    _min?: WhiskyMinOrderByAggregateInput
    _sum?: WhiskySumOrderByAggregateInput
  }

  export type WhiskyScalarWhereWithAggregatesInput = {
    AND?: WhiskyScalarWhereWithAggregatesInput | WhiskyScalarWhereWithAggregatesInput[]
    OR?: WhiskyScalarWhereWithAggregatesInput[]
    NOT?: WhiskyScalarWhereWithAggregatesInput | WhiskyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Whisky"> | string
    name?: StringWithAggregatesFilter<"Whisky"> | string
    description?: StringNullableWithAggregatesFilter<"Whisky"> | string | null
    image?: StringNullableWithAggregatesFilter<"Whisky"> | string | null
    quaich?: BoolWithAggregatesFilter<"Whisky"> | boolean
    order?: IntWithAggregatesFilter<"Whisky"> | number
    meetingId?: StringWithAggregatesFilter<"Whisky"> | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: FloatFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    whiskyId?: StringFilter<"Review"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    whisky?: XOR<WhiskyScalarRelationFilter, WhiskyWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whiskyId?: SortOrder
    user?: UserOrderByWithRelationInput
    whisky?: WhiskyOrderByWithRelationInput
    _relevance?: ReviewOrderByRelevanceInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    userId?: StringFilter<"Review"> | string
    rating?: FloatFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    whiskyId?: StringFilter<"Review"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    whisky?: XOR<WhiskyScalarRelationFilter, WhiskyWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whiskyId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    userId?: StringWithAggregatesFilter<"Review"> | string
    rating?: FloatWithAggregatesFilter<"Review"> | number
    comment?: StringWithAggregatesFilter<"Review"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    whiskyId?: StringWithAggregatesFilter<"Review"> | string
  }

  export type UserCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    meetings?: MeetingCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    meetings?: MeetingUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationTokenCreateInput = {
    id?: string
    email: string
    token: string
  }

  export type RegistrationTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
  }

  export type RegistrationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegistrationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegistrationTokenCreateManyInput = {
    id?: string
    email: string
    token: string
  }

  export type RegistrationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegistrationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type VerificationTokenCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    email: string
    token: string
    expires: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwoFactorConfirmationCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutTwoFactorConfirmationInput
  }

  export type TwoFactorConfirmationUncheckedCreateInput = {
    id?: string
    userId: string
  }

  export type TwoFactorConfirmationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTwoFactorConfirmationNestedInput
  }

  export type TwoFactorConfirmationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TwoFactorConfirmationCreateManyInput = {
    id?: string
    userId: string
  }

  export type TwoFactorConfirmationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TwoFactorConfirmationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingCreateInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
    whiskies?: WhiskyCreateNestedManyWithoutMeetingInput
    users?: UserCreateNestedManyWithoutMeetingsInput
  }

  export type MeetingUncheckedCreateInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
    whiskies?: WhiskyUncheckedCreateNestedManyWithoutMeetingInput
    users?: UserUncheckedCreateNestedManyWithoutMeetingsInput
  }

  export type MeetingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
    whiskies?: WhiskyUpdateManyWithoutMeetingNestedInput
    users?: UserUpdateManyWithoutMeetingsNestedInput
  }

  export type MeetingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
    whiskies?: WhiskyUncheckedUpdateManyWithoutMeetingNestedInput
    users?: UserUncheckedUpdateManyWithoutMeetingsNestedInput
  }

  export type MeetingCreateManyInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
  }

  export type MeetingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WhiskyCreateInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    meeting: MeetingCreateNestedOneWithoutWhiskiesInput
    reviews?: ReviewCreateNestedManyWithoutWhiskyInput
  }

  export type WhiskyUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    meetingId: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutWhiskyInput
  }

  export type WhiskyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    meeting?: MeetingUpdateOneRequiredWithoutWhiskiesNestedInput
    reviews?: ReviewUpdateManyWithoutWhiskyNestedInput
  }

  export type WhiskyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    meetingId?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutWhiskyNestedInput
  }

  export type WhiskyCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    meetingId: string
  }

  export type WhiskyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type WhiskyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    meetingId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
    whisky: WhiskyCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    userId: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whiskyId: string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    whisky?: WhiskyUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whiskyId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    userId: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whiskyId: string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whiskyId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type TwoFactorConfirmationNullableScalarRelationFilter = {
    is?: TwoFactorConfirmationWhereInput | null
    isNot?: TwoFactorConfirmationWhereInput | null
  }

  export type MeetingListRelationFilter = {
    every?: MeetingWhereInput
    some?: MeetingWhereInput
    none?: MeetingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    registered?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailOld?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpires?: SortOrder
    otpEnabled?: SortOrder
    otpVerified?: SortOrder
    otpBase32?: SortOrder
    otpAuthUrl?: SortOrder
    otpBackups?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    registered?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailOld?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpires?: SortOrder
    otpEnabled?: SortOrder
    otpVerified?: SortOrder
    otpBase32?: SortOrder
    otpAuthUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    registered?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailOld?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpires?: SortOrder
    otpEnabled?: SortOrder
    otpVerified?: SortOrder
    otpBase32?: SortOrder
    otpAuthUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountOrderByRelevanceInput = {
    fields: AccountOrderByRelevanceFieldEnum | AccountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type RegistrationTokenOrderByRelevanceInput = {
    fields: RegistrationTokenOrderByRelevanceFieldEnum | RegistrationTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RegistrationTokenEmailTokenCompoundUniqueInput = {
    email: string
    token: string
  }

  export type RegistrationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
  }

  export type RegistrationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
  }

  export type RegistrationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
  }

  export type VerificationTokenOrderByRelevanceInput = {
    fields: VerificationTokenOrderByRelevanceFieldEnum | VerificationTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VerificationTokenEmailTokenCompoundUniqueInput = {
    email: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type PasswordResetTokenOrderByRelevanceInput = {
    fields: PasswordResetTokenOrderByRelevanceFieldEnum | PasswordResetTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PasswordResetTokenEmailTokenCompoundUniqueInput = {
    email: string
    token: string
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type TwoFactorConfirmationOrderByRelevanceInput = {
    fields: TwoFactorConfirmationOrderByRelevanceFieldEnum | TwoFactorConfirmationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TwoFactorConfirmationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TwoFactorConfirmationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TwoFactorConfirmationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type WhiskyListRelationFilter = {
    every?: WhiskyWhereInput
    some?: WhiskyWhereInput
    none?: WhiskyWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type WhiskyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingOrderByRelevanceInput = {
    fields: MeetingOrderByRelevanceFieldEnum | MeetingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MeetingCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    location?: SortOrder
    status?: SortOrder
    quaich?: SortOrder
  }

  export type MeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    location?: SortOrder
    status?: SortOrder
    quaich?: SortOrder
  }

  export type MeetingMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    location?: SortOrder
    status?: SortOrder
    quaich?: SortOrder
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MeetingScalarRelationFilter = {
    is?: MeetingWhereInput
    isNot?: MeetingWhereInput
  }

  export type WhiskyOrderByRelevanceInput = {
    fields: WhiskyOrderByRelevanceFieldEnum | WhiskyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WhiskyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    quaich?: SortOrder
    order?: SortOrder
    meetingId?: SortOrder
  }

  export type WhiskyAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type WhiskyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    quaich?: SortOrder
    order?: SortOrder
    meetingId?: SortOrder
  }

  export type WhiskyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    quaich?: SortOrder
    order?: SortOrder
    meetingId?: SortOrder
  }

  export type WhiskySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WhiskyScalarRelationFilter = {
    is?: WhiskyWhereInput
    isNot?: WhiskyWhereInput
  }

  export type ReviewOrderByRelevanceInput = {
    fields: ReviewOrderByRelevanceFieldEnum | ReviewOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whiskyId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whiskyId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whiskyId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserCreateotpBackupsInput = {
    set: string[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type TwoFactorConfirmationCreateNestedOneWithoutUserInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    connect?: TwoFactorConfirmationWhereUniqueInput
  }

  export type MeetingCreateNestedManyWithoutUsersInput = {
    create?: XOR<MeetingCreateWithoutUsersInput, MeetingUncheckedCreateWithoutUsersInput> | MeetingCreateWithoutUsersInput[] | MeetingUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutUsersInput | MeetingCreateOrConnectWithoutUsersInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    connect?: TwoFactorConfirmationWhereUniqueInput
  }

  export type MeetingUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<MeetingCreateWithoutUsersInput, MeetingUncheckedCreateWithoutUsersInput> | MeetingCreateWithoutUsersInput[] | MeetingUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutUsersInput | MeetingCreateOrConnectWithoutUsersInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type UserUpdateotpBackupsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type TwoFactorConfirmationUpdateOneWithoutUserNestedInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    upsert?: TwoFactorConfirmationUpsertWithoutUserInput
    disconnect?: TwoFactorConfirmationWhereInput | boolean
    delete?: TwoFactorConfirmationWhereInput | boolean
    connect?: TwoFactorConfirmationWhereUniqueInput
    update?: XOR<XOR<TwoFactorConfirmationUpdateToOneWithWhereWithoutUserInput, TwoFactorConfirmationUpdateWithoutUserInput>, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
  }

  export type MeetingUpdateManyWithoutUsersNestedInput = {
    create?: XOR<MeetingCreateWithoutUsersInput, MeetingUncheckedCreateWithoutUsersInput> | MeetingCreateWithoutUsersInput[] | MeetingUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutUsersInput | MeetingCreateOrConnectWithoutUsersInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutUsersInput | MeetingUpsertWithWhereUniqueWithoutUsersInput[]
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutUsersInput | MeetingUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutUsersInput | MeetingUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    connectOrCreate?: TwoFactorConfirmationCreateOrConnectWithoutUserInput
    upsert?: TwoFactorConfirmationUpsertWithoutUserInput
    disconnect?: TwoFactorConfirmationWhereInput | boolean
    delete?: TwoFactorConfirmationWhereInput | boolean
    connect?: TwoFactorConfirmationWhereUniqueInput
    update?: XOR<XOR<TwoFactorConfirmationUpdateToOneWithWhereWithoutUserInput, TwoFactorConfirmationUpdateWithoutUserInput>, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
  }

  export type MeetingUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<MeetingCreateWithoutUsersInput, MeetingUncheckedCreateWithoutUsersInput> | MeetingCreateWithoutUsersInput[] | MeetingUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutUsersInput | MeetingCreateOrConnectWithoutUsersInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutUsersInput | MeetingUpsertWithWhereUniqueWithoutUsersInput[]
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutUsersInput | MeetingUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutUsersInput | MeetingUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutTwoFactorConfirmationInput = {
    create?: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
    connectOrCreate?: UserCreateOrConnectWithoutTwoFactorConfirmationInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTwoFactorConfirmationNestedInput = {
    create?: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
    connectOrCreate?: UserCreateOrConnectWithoutTwoFactorConfirmationInput
    upsert?: UserUpsertWithoutTwoFactorConfirmationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTwoFactorConfirmationInput, UserUpdateWithoutTwoFactorConfirmationInput>, UserUncheckedUpdateWithoutTwoFactorConfirmationInput>
  }

  export type WhiskyCreateNestedManyWithoutMeetingInput = {
    create?: XOR<WhiskyCreateWithoutMeetingInput, WhiskyUncheckedCreateWithoutMeetingInput> | WhiskyCreateWithoutMeetingInput[] | WhiskyUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: WhiskyCreateOrConnectWithoutMeetingInput | WhiskyCreateOrConnectWithoutMeetingInput[]
    createMany?: WhiskyCreateManyMeetingInputEnvelope
    connect?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutMeetingsInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput> | UserCreateWithoutMeetingsInput[] | UserUncheckedCreateWithoutMeetingsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput | UserCreateOrConnectWithoutMeetingsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type WhiskyUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<WhiskyCreateWithoutMeetingInput, WhiskyUncheckedCreateWithoutMeetingInput> | WhiskyCreateWithoutMeetingInput[] | WhiskyUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: WhiskyCreateOrConnectWithoutMeetingInput | WhiskyCreateOrConnectWithoutMeetingInput[]
    createMany?: WhiskyCreateManyMeetingInputEnvelope
    connect?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutMeetingsInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput> | UserCreateWithoutMeetingsInput[] | UserUncheckedCreateWithoutMeetingsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput | UserCreateOrConnectWithoutMeetingsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type WhiskyUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<WhiskyCreateWithoutMeetingInput, WhiskyUncheckedCreateWithoutMeetingInput> | WhiskyCreateWithoutMeetingInput[] | WhiskyUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: WhiskyCreateOrConnectWithoutMeetingInput | WhiskyCreateOrConnectWithoutMeetingInput[]
    upsert?: WhiskyUpsertWithWhereUniqueWithoutMeetingInput | WhiskyUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: WhiskyCreateManyMeetingInputEnvelope
    set?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    disconnect?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    delete?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    connect?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    update?: WhiskyUpdateWithWhereUniqueWithoutMeetingInput | WhiskyUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: WhiskyUpdateManyWithWhereWithoutMeetingInput | WhiskyUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: WhiskyScalarWhereInput | WhiskyScalarWhereInput[]
  }

  export type UserUpdateManyWithoutMeetingsNestedInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput> | UserCreateWithoutMeetingsInput[] | UserUncheckedCreateWithoutMeetingsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput | UserCreateOrConnectWithoutMeetingsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutMeetingsInput | UserUpsertWithWhereUniqueWithoutMeetingsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutMeetingsInput | UserUpdateWithWhereUniqueWithoutMeetingsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutMeetingsInput | UserUpdateManyWithWhereWithoutMeetingsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type WhiskyUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<WhiskyCreateWithoutMeetingInput, WhiskyUncheckedCreateWithoutMeetingInput> | WhiskyCreateWithoutMeetingInput[] | WhiskyUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: WhiskyCreateOrConnectWithoutMeetingInput | WhiskyCreateOrConnectWithoutMeetingInput[]
    upsert?: WhiskyUpsertWithWhereUniqueWithoutMeetingInput | WhiskyUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: WhiskyCreateManyMeetingInputEnvelope
    set?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    disconnect?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    delete?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    connect?: WhiskyWhereUniqueInput | WhiskyWhereUniqueInput[]
    update?: WhiskyUpdateWithWhereUniqueWithoutMeetingInput | WhiskyUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: WhiskyUpdateManyWithWhereWithoutMeetingInput | WhiskyUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: WhiskyScalarWhereInput | WhiskyScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutMeetingsNestedInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput> | UserCreateWithoutMeetingsInput[] | UserUncheckedCreateWithoutMeetingsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput | UserCreateOrConnectWithoutMeetingsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutMeetingsInput | UserUpsertWithWhereUniqueWithoutMeetingsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutMeetingsInput | UserUpdateWithWhereUniqueWithoutMeetingsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutMeetingsInput | UserUpdateManyWithWhereWithoutMeetingsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type MeetingCreateNestedOneWithoutWhiskiesInput = {
    create?: XOR<MeetingCreateWithoutWhiskiesInput, MeetingUncheckedCreateWithoutWhiskiesInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutWhiskiesInput
    connect?: MeetingWhereUniqueInput
  }

  export type ReviewCreateNestedManyWithoutWhiskyInput = {
    create?: XOR<ReviewCreateWithoutWhiskyInput, ReviewUncheckedCreateWithoutWhiskyInput> | ReviewCreateWithoutWhiskyInput[] | ReviewUncheckedCreateWithoutWhiskyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutWhiskyInput | ReviewCreateOrConnectWithoutWhiskyInput[]
    createMany?: ReviewCreateManyWhiskyInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutWhiskyInput = {
    create?: XOR<ReviewCreateWithoutWhiskyInput, ReviewUncheckedCreateWithoutWhiskyInput> | ReviewCreateWithoutWhiskyInput[] | ReviewUncheckedCreateWithoutWhiskyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutWhiskyInput | ReviewCreateOrConnectWithoutWhiskyInput[]
    createMany?: ReviewCreateManyWhiskyInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MeetingUpdateOneRequiredWithoutWhiskiesNestedInput = {
    create?: XOR<MeetingCreateWithoutWhiskiesInput, MeetingUncheckedCreateWithoutWhiskiesInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutWhiskiesInput
    upsert?: MeetingUpsertWithoutWhiskiesInput
    connect?: MeetingWhereUniqueInput
    update?: XOR<XOR<MeetingUpdateToOneWithWhereWithoutWhiskiesInput, MeetingUpdateWithoutWhiskiesInput>, MeetingUncheckedUpdateWithoutWhiskiesInput>
  }

  export type ReviewUpdateManyWithoutWhiskyNestedInput = {
    create?: XOR<ReviewCreateWithoutWhiskyInput, ReviewUncheckedCreateWithoutWhiskyInput> | ReviewCreateWithoutWhiskyInput[] | ReviewUncheckedCreateWithoutWhiskyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutWhiskyInput | ReviewCreateOrConnectWithoutWhiskyInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutWhiskyInput | ReviewUpsertWithWhereUniqueWithoutWhiskyInput[]
    createMany?: ReviewCreateManyWhiskyInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutWhiskyInput | ReviewUpdateWithWhereUniqueWithoutWhiskyInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutWhiskyInput | ReviewUpdateManyWithWhereWithoutWhiskyInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutWhiskyNestedInput = {
    create?: XOR<ReviewCreateWithoutWhiskyInput, ReviewUncheckedCreateWithoutWhiskyInput> | ReviewCreateWithoutWhiskyInput[] | ReviewUncheckedCreateWithoutWhiskyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutWhiskyInput | ReviewCreateOrConnectWithoutWhiskyInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutWhiskyInput | ReviewUpsertWithWhereUniqueWithoutWhiskyInput[]
    createMany?: ReviewCreateManyWhiskyInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutWhiskyInput | ReviewUpdateWithWhereUniqueWithoutWhiskyInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutWhiskyInput | ReviewUpdateManyWithWhereWithoutWhiskyInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type WhiskyCreateNestedOneWithoutReviewsInput = {
    create?: XOR<WhiskyCreateWithoutReviewsInput, WhiskyUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: WhiskyCreateOrConnectWithoutReviewsInput
    connect?: WhiskyWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type WhiskyUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<WhiskyCreateWithoutReviewsInput, WhiskyUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: WhiskyCreateOrConnectWithoutReviewsInput
    upsert?: WhiskyUpsertWithoutReviewsInput
    connect?: WhiskyWhereUniqueInput
    update?: XOR<XOR<WhiskyUpdateToOneWithWhereWithoutReviewsInput, WhiskyUpdateWithoutReviewsInput>, WhiskyUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutUserInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whisky: WhiskyCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whiskyId: string
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TwoFactorConfirmationCreateWithoutUserInput = {
    id?: string
  }

  export type TwoFactorConfirmationUncheckedCreateWithoutUserInput = {
    id?: string
  }

  export type TwoFactorConfirmationCreateOrConnectWithoutUserInput = {
    where: TwoFactorConfirmationWhereUniqueInput
    create: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
  }

  export type MeetingCreateWithoutUsersInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
    whiskies?: WhiskyCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutUsersInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
    whiskies?: WhiskyUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutUsersInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutUsersInput, MeetingUncheckedCreateWithoutUsersInput>
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: FloatFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    whiskyId?: StringFilter<"Review"> | string
  }

  export type TwoFactorConfirmationUpsertWithoutUserInput = {
    update: XOR<TwoFactorConfirmationUpdateWithoutUserInput, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
    create: XOR<TwoFactorConfirmationCreateWithoutUserInput, TwoFactorConfirmationUncheckedCreateWithoutUserInput>
    where?: TwoFactorConfirmationWhereInput
  }

  export type TwoFactorConfirmationUpdateToOneWithWhereWithoutUserInput = {
    where?: TwoFactorConfirmationWhereInput
    data: XOR<TwoFactorConfirmationUpdateWithoutUserInput, TwoFactorConfirmationUncheckedUpdateWithoutUserInput>
  }

  export type TwoFactorConfirmationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type TwoFactorConfirmationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingUpsertWithWhereUniqueWithoutUsersInput = {
    where: MeetingWhereUniqueInput
    update: XOR<MeetingUpdateWithoutUsersInput, MeetingUncheckedUpdateWithoutUsersInput>
    create: XOR<MeetingCreateWithoutUsersInput, MeetingUncheckedCreateWithoutUsersInput>
  }

  export type MeetingUpdateWithWhereUniqueWithoutUsersInput = {
    where: MeetingWhereUniqueInput
    data: XOR<MeetingUpdateWithoutUsersInput, MeetingUncheckedUpdateWithoutUsersInput>
  }

  export type MeetingUpdateManyWithWhereWithoutUsersInput = {
    where: MeetingScalarWhereInput
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyWithoutUsersInput>
  }

  export type MeetingScalarWhereInput = {
    AND?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    OR?: MeetingScalarWhereInput[]
    NOT?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    id?: StringFilter<"Meeting"> | string
    date?: StringFilter<"Meeting"> | string
    location?: StringFilter<"Meeting"> | string
    status?: EnumStatusFilter<"Meeting"> | $Enums.Status
    quaich?: StringNullableFilter<"Meeting"> | string | null
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    meetings?: MeetingCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    meetings?: MeetingUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateWithoutTwoFactorConfirmationInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    meetings?: MeetingCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutTwoFactorConfirmationInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutTwoFactorConfirmationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
  }

  export type UserUpsertWithoutTwoFactorConfirmationInput = {
    update: XOR<UserUpdateWithoutTwoFactorConfirmationInput, UserUncheckedUpdateWithoutTwoFactorConfirmationInput>
    create: XOR<UserCreateWithoutTwoFactorConfirmationInput, UserUncheckedCreateWithoutTwoFactorConfirmationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTwoFactorConfirmationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTwoFactorConfirmationInput, UserUncheckedUpdateWithoutTwoFactorConfirmationInput>
  }

  export type UserUpdateWithoutTwoFactorConfirmationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    meetings?: MeetingUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutTwoFactorConfirmationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type WhiskyCreateWithoutMeetingInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    reviews?: ReviewCreateNestedManyWithoutWhiskyInput
  }

  export type WhiskyUncheckedCreateWithoutMeetingInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    reviews?: ReviewUncheckedCreateNestedManyWithoutWhiskyInput
  }

  export type WhiskyCreateOrConnectWithoutMeetingInput = {
    where: WhiskyWhereUniqueInput
    create: XOR<WhiskyCreateWithoutMeetingInput, WhiskyUncheckedCreateWithoutMeetingInput>
  }

  export type WhiskyCreateManyMeetingInputEnvelope = {
    data: WhiskyCreateManyMeetingInput | WhiskyCreateManyMeetingInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutMeetingsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMeetingsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMeetingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
  }

  export type WhiskyUpsertWithWhereUniqueWithoutMeetingInput = {
    where: WhiskyWhereUniqueInput
    update: XOR<WhiskyUpdateWithoutMeetingInput, WhiskyUncheckedUpdateWithoutMeetingInput>
    create: XOR<WhiskyCreateWithoutMeetingInput, WhiskyUncheckedCreateWithoutMeetingInput>
  }

  export type WhiskyUpdateWithWhereUniqueWithoutMeetingInput = {
    where: WhiskyWhereUniqueInput
    data: XOR<WhiskyUpdateWithoutMeetingInput, WhiskyUncheckedUpdateWithoutMeetingInput>
  }

  export type WhiskyUpdateManyWithWhereWithoutMeetingInput = {
    where: WhiskyScalarWhereInput
    data: XOR<WhiskyUpdateManyMutationInput, WhiskyUncheckedUpdateManyWithoutMeetingInput>
  }

  export type WhiskyScalarWhereInput = {
    AND?: WhiskyScalarWhereInput | WhiskyScalarWhereInput[]
    OR?: WhiskyScalarWhereInput[]
    NOT?: WhiskyScalarWhereInput | WhiskyScalarWhereInput[]
    id?: StringFilter<"Whisky"> | string
    name?: StringFilter<"Whisky"> | string
    description?: StringNullableFilter<"Whisky"> | string | null
    image?: StringNullableFilter<"Whisky"> | string | null
    quaich?: BoolFilter<"Whisky"> | boolean
    order?: IntFilter<"Whisky"> | number
    meetingId?: StringFilter<"Whisky"> | string
  }

  export type UserUpsertWithWhereUniqueWithoutMeetingsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutMeetingsInput, UserUncheckedUpdateWithoutMeetingsInput>
    create: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutMeetingsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutMeetingsInput, UserUncheckedUpdateWithoutMeetingsInput>
  }

  export type UserUpdateManyWithWhereWithoutMeetingsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutMeetingsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    registered?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    emailOld?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    otpEnabled?: BoolFilter<"User"> | boolean
    otpVerified?: BoolFilter<"User"> | boolean
    otpBase32?: StringNullableFilter<"User"> | string | null
    otpAuthUrl?: StringNullableFilter<"User"> | string | null
    otpBackups?: StringNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type MeetingCreateWithoutWhiskiesInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
    users?: UserCreateNestedManyWithoutMeetingsInput
  }

  export type MeetingUncheckedCreateWithoutWhiskiesInput = {
    id?: string
    date: string
    location: string
    status?: $Enums.Status
    quaich?: string | null
    users?: UserUncheckedCreateNestedManyWithoutMeetingsInput
  }

  export type MeetingCreateOrConnectWithoutWhiskiesInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutWhiskiesInput, MeetingUncheckedCreateWithoutWhiskiesInput>
  }

  export type ReviewCreateWithoutWhiskyInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutWhiskyInput = {
    id?: string
    userId: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutWhiskyInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutWhiskyInput, ReviewUncheckedCreateWithoutWhiskyInput>
  }

  export type ReviewCreateManyWhiskyInputEnvelope = {
    data: ReviewCreateManyWhiskyInput | ReviewCreateManyWhiskyInput[]
    skipDuplicates?: boolean
  }

  export type MeetingUpsertWithoutWhiskiesInput = {
    update: XOR<MeetingUpdateWithoutWhiskiesInput, MeetingUncheckedUpdateWithoutWhiskiesInput>
    create: XOR<MeetingCreateWithoutWhiskiesInput, MeetingUncheckedCreateWithoutWhiskiesInput>
    where?: MeetingWhereInput
  }

  export type MeetingUpdateToOneWithWhereWithoutWhiskiesInput = {
    where?: MeetingWhereInput
    data: XOR<MeetingUpdateWithoutWhiskiesInput, MeetingUncheckedUpdateWithoutWhiskiesInput>
  }

  export type MeetingUpdateWithoutWhiskiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutMeetingsNestedInput
  }

  export type MeetingUncheckedUpdateWithoutWhiskiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutMeetingsNestedInput
  }

  export type ReviewUpsertWithWhereUniqueWithoutWhiskyInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutWhiskyInput, ReviewUncheckedUpdateWithoutWhiskyInput>
    create: XOR<ReviewCreateWithoutWhiskyInput, ReviewUncheckedCreateWithoutWhiskyInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutWhiskyInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutWhiskyInput, ReviewUncheckedUpdateWithoutWhiskyInput>
  }

  export type ReviewUpdateManyWithWhereWithoutWhiskyInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutWhiskyInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationCreateNestedOneWithoutUserInput
    meetings?: MeetingCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    registered?: boolean
    image?: string | null
    password?: string | null
    role?: $Enums.UserRole
    emailOld?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    otpEnabled?: boolean
    otpVerified?: boolean
    otpBase32?: string | null
    otpAuthUrl?: string | null
    otpBackups?: UserCreateotpBackupsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedCreateNestedOneWithoutUserInput
    meetings?: MeetingUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type WhiskyCreateWithoutReviewsInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    meeting: MeetingCreateNestedOneWithoutWhiskiesInput
  }

  export type WhiskyUncheckedCreateWithoutReviewsInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
    meetingId: string
  }

  export type WhiskyCreateOrConnectWithoutReviewsInput = {
    where: WhiskyWhereUniqueInput
    create: XOR<WhiskyCreateWithoutReviewsInput, WhiskyUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
    meetings?: MeetingUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
    meetings?: MeetingUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type WhiskyUpsertWithoutReviewsInput = {
    update: XOR<WhiskyUpdateWithoutReviewsInput, WhiskyUncheckedUpdateWithoutReviewsInput>
    create: XOR<WhiskyCreateWithoutReviewsInput, WhiskyUncheckedCreateWithoutReviewsInput>
    where?: WhiskyWhereInput
  }

  export type WhiskyUpdateToOneWithWhereWithoutReviewsInput = {
    where?: WhiskyWhereInput
    data: XOR<WhiskyUpdateWithoutReviewsInput, WhiskyUncheckedUpdateWithoutReviewsInput>
  }

  export type WhiskyUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    meeting?: MeetingUpdateOneRequiredWithoutWhiskiesNestedInput
  }

  export type WhiskyUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    meetingId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyUserInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whiskyId: string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whisky?: WhiskyUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whiskyId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whiskyId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
    whiskies?: WhiskyUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
    whiskies?: WhiskyUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    quaich?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WhiskyCreateManyMeetingInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    quaich?: boolean
    order?: number
  }

  export type WhiskyUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    reviews?: ReviewUpdateManyWithoutWhiskyNestedInput
  }

  export type WhiskyUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    reviews?: ReviewUncheckedUpdateManyWithoutWhiskyNestedInput
  }

  export type WhiskyUncheckedUpdateManyWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    quaich?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    twoFactorConfirmation?: TwoFactorConfirmationUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registered?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    emailOld?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    otpEnabled?: BoolFieldUpdateOperationsInput | boolean
    otpVerified?: BoolFieldUpdateOperationsInput | boolean
    otpBase32?: NullableStringFieldUpdateOperationsInput | string | null
    otpAuthUrl?: NullableStringFieldUpdateOperationsInput | string | null
    otpBackups?: UserUpdateotpBackupsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyWhiskyInput = {
    id?: string
    userId: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateWithoutWhiskyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutWhiskyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutWhiskyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}