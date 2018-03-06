import * as React from "react";
import * as TruffleContract from "truffle-contract";
import * as Web3 from "web3";

const MetaCoinContract = TruffleContract(require("adventurer-exchange/build/contracts/ResourceToken.json"));

interface IMetaWalletProps {
  web3: Web3;
}

interface IMetaWalletState {
  account: string;
  accountError: boolean;
  balance: string;
  contractAddress: string;
}

export default class ResourceWallet extends React.Component<IMetaWalletProps, IMetaWalletState> {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      accountError: false,
      balance: "",
      contractAddress: "",
    };
  }

  public async componentWillMount() {
    if (this.props.web3.eth.accounts.length === 0) {
      this.setState({
        account: "",
        accountError: true,
      });
      return;
    }
    MetaCoinContract.setProvider(this.props.web3.currentProvider);
    let instance: any;
    try {
      console.log(this.props.web3.eth.accounts);
      console.log(this.props.web3.isConnected());
      instance = await MetaCoinContract.deployed();
    } catch (err) {
      console.log(err);
      alert(err);
      return;
    }

    const balance  = await instance.getBalance(this.props.web3.eth.accounts[0]);
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
      <p>Account: {this.state.accountError ? "No accounts found" : this.state.account}</p>
      <p>Balance: {this.state.balance}</p>
    </div>
    );
  }
}
