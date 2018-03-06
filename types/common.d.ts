declare module 'common' {

  import {BigNumber} from 'bignumber.js';

  namespace common {

    type Callback<T> = (err: Error | null, value: T) => void;

    type Address = string;

    type AnyNumber = number | string | BigNumber;

  }

  export = common;
}
