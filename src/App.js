import React from "react";
import axios from "axios";
import { Button, Result, Input } from "antd";
import "./App.css";
class App extends React.Component {
  state = {
    address: "",
    creatingTx: false,
    show: false,
    result: null,
  };
  async componentDidMount() {}
  transferCrypto = async () => {
    this.setState({
      creatingTx: true,
    });
    const { address } = this.state;
    const res = await axios({
      method: "post",
      url: "http://18.221.225.34:1995/api/faucet",
      data: { address },
    });
    this.setState({
      result: res && res.data,
      creatingTx: false,
    });
  };
  render() {
    const { result, creatingTx, txId } = this.state;
    const reason = result && result.error && result.error.code;
    let showErr = "";
    switch (reason) {
      case "NOT_OK":
      case "SEND_WRONG":
        showErr = "Sorry Faucet Failed. Please try again!";
        break;
      case "NOT_ENOUGH_AR":
        showErr = "Sorry Faucet Failed. The wallet not enough AR";
        break;
      case "WRONG_ADDRESS":
        showErr = "Sorry Faucet Failed. Wrong address";
        break;
      default:
        break;
    }
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <div style={{ paddingBottom: "2.5rem" }}>
          <div className="header-container">
            <h1 className="header-text"> Arweave Mainnet Faucet </h1>
          </div>
          <div className="body-container">
            <div className="airdrop-container">
              <h5 className="airdrop-label">Enter your Arweave Address</h5>
              <Input
                id="address"
                onChange={(e) => this.setState({ address: e.target.value })}
                name="address"
                placeholder="Your Arweave Address"
                type="text"
              />
            </div>
            <Button
              type="primary"
              size="large"
              loading={creatingTx}
              disabled={creatingTx}
              onClick={async () => await this.transferCrypto()}
            >
              Send Me AR
            </Button>
          </div>
          {result && (
            <Result
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                maxWidth: "720px",
                margin: "40px auto",
              }}
              status={result && result.success ? "success" : "error"}
              title={
                result && result.success
                  ? "Successfully Faucet Arweave To Your Account"
                  : "Error Faucet Arweave"
              }
              subTitle={
                result && result.success ? (
                  <p>
                    Transaction ID:{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://viewblock.io/arweave/tx/${txId}`}
                    >
                      {txId}
                    </a>
                    . Amount: 0.0001 AR. <br></br>Please wait transaction is
                    submitted to blockchain!
                  </p>
                ) : (
                  showErr || "Sorry Faucet Failed. Please try again!"
                )
              }
            />
          )}
          <div className="qr-cossde">
            <h3 style={{ fontSize: "1.75rem" }}>Give Us Your AR Super Power</h3>
            <br />
            Pool Address:
            <div>Sg8FtnAstBCsCj_N6yNoNgEdWm8tX_nkSfLC5vqbG8w</div>
            <img
              src="https://chart.googleapis.com/chart?cht=qr&chl=Sg8FtnAstBCsCj_N6yNoNgEdWm8tX_nkSfLC5vqbG8w&chs=180x180&choe=UTF-8&chld=L|2"
              alt=""
            ></img>
          </div>
        </div>
        <div className="footer-container">
          <div className="footer-trademark"> © Arweave Community Product </div>
        </div>
      </div>
    );
  }
}

export default App;
