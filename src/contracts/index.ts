import * as contract from 'truffle-contract';
import {Resource} from 'blocklife-contracts';

const resourceJson = require('blocklife-contracts/build/contracts/ResourceToken.json');

export const ResourceTokenContract = contract<Resource>({
  abi: resourceJson.abi
});


