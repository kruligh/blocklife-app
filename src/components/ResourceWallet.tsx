import * as React from 'react';
import * as TruffleContract from 'truffle-contract';
import * as Web3 from 'web3';
import {Address, AnyNumber} from 'common';

const ResourceTokenContract = TruffleContract(require('blocklife-contracts/build/contracts/ResourceToken.json'));

interface MetaWalletProps {
  web3: Web3;
}

interface MetaWalletState {
  account: Address;
  accountError: boolean;
  balance: AnyNumber;
  contractAddress: Address;
}

export default class ResourceWallet extends React.Component<MetaWalletProps, MetaWalletState> {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      accountError: false,
      balance: '',
      contractAddress: '',
    };
  }

  public async componentWillMount() {
    if (this.props.web3.eth.accounts.length === 0) {
      this.setState({
        account: '',
        accountError: true,
      });
      return;
    }
    ResourceTokenContract.setProvider(this.props.web3.currentProvider);
    let instance: any;
    try {
      instance = await ResourceTokenContract.deployed();
    } catch (err) {
      alert(err);
      return;
    }
    const balance = await instance.balanceOf(this.props.web3.eth.accounts[0]);
    this.setState({
      account: this.props.web3.eth.accounts[0],
      accountError: false,
      balance: balance.toString(),
      contractAddress: instance.address,
    });
  }

  public render() {
    return (
      <div>
        <h3>MetaCoin</h3>
        <p>Contract address: {this.state.contractAddress}</p>
        <p>Account: {this.state.accountError ? 'No accounts found' : this.state.account}</p>
        <p>Balance: {this.state.balance}</p>
      </div>
    );
  }
}
