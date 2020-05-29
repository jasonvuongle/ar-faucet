import React from "react";
import Arweave from "arweave/web";
import axios from "axios";
import { Decimal } from "decimal.js";
import {
  createTransaction,
  signAndDeployTransaction,
  getTransactionIds,
  getTransaction,
  walletDefaut,
  price,
} from "./utils/arweaveUtils";
import { Button, Result, Input } from "antd";
import "./App.css";

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  timeout: 50000,
  logging: false,
});

class App extends React.Component {
  state = {
    address: "",
    creatingTx: false,
    show: false,
    data: [],
    walletData: {
      kty: "RSA",
      e: "AQAB",
      n:
        "sYuO2sjp7Yb8oXazGbxo1VK3-QN3WXdrA76JWS-JT25PJWTKR_uWvbOfPlfefLs0giANRagGZdoxuXl8M1fPcqSOtlj_S01EZslULpcEIh-n9YZAhNjY_zGPbQF5AdH1s3HR-AXKuS0HbVMo47cWW8os6bwNs1I88DjUGryizHi0M9txmFxRKEqJqK7MQwGfjiU_90ooEBlLj_hevAL4QyDTZ47dBDeDuMhwVgO-sq6ZttI7CTslCfSJ5gW8o8YWI9kMJOiOjaCoh1bZ5FJ3_etw7wyQ99Im6VSVVUIbsfEaMyVuea9mTRNSSpak2_WEq8esFL52ZdMwVDj7nExbtmGyGXzfZ5g2FLV67rz7OQUDpZ1n_DmeXUSvdwUAH63gT_2S1yqImZu_2tGLOw1GiDSdPixnURSbUg3UT_5o-O-qe_NfJk--BEpLqBHA-DC0tuz3Txt8SdT1aG-8iQ3FUTWMqCIDmpEUt3BwotIHEQPaq45rvmO8hhbBIiBFV_pq3DHjeoHPjhbMOlpOAjF2gEz6WQyIiNUXiXnfsvsoalhZ49G3p19HtMK2ZHyfDynikPgsuhAlF2PhcQKDgh4lrAkldWmExab4OrJrCDD0K2UQD3w9XkiDkEhTkGy8jokOrnyauIq0DM3xWBOqknXZKBP5uW9g-SuwKQo3GYuojPk",
      d:
        "CkA61i8w5N0QQgkdJYvAzvkXLfv0WW7xKu0Td6asejCt-V4Jf3Pei-mbWwyhiAWBB-nucKQ9nLmnErfmb8p1BX__ZpzapJzh9nNPKaxGrOrmyWDGe3hPuX0OWszxqr68im9OBoPcsanDzenPjxJEarYdUL0VJ2wRbUDcUjmsLQhJ4A9rNOpQaNyg3rBOkw6jCToYwhNLuKsIaotJepGxugji29q34369dR8X77qiOVimZfooAwwhdjxijkYSuOJlGqdbmAsk8lChc_fHEQ07G1ok-Gn7BsWUWvcRjJokCJ3MlVsznTf_PQA0FjvLafdetFJZ56eCWE-3I-297UcyKX7ISaGHI6ykUjrPN_8Ipk37bPPfNxw6K6n6o_XxGUEf4Zvuncz-3M2jpJisPhrexlzjdZupQXfvriG7A1m3lVarX2hvps7iRc7x7pUTz6loEXHoZyH4R27UrvOIS9OKF7t_r25eqc5PRZMr96C87fD4ZZVrUSOWIzUINKZodc9ZX4A-xTXgjitfhuk13C9deQq8yGM20SESveHS9rABYOFYFxukBXe_bq16EYDqvMHWBvb3XrFnw5J24dZ9C6RxspNfmzvUY6jcgm3SIUy1yLUqFBXnbvAr4p8xWZmnm6WaKENFzd5nkjIZw1onwCfIASUF9_mFGxrNtTzCOJw_dBc",
      p:
        "-MmyC1LSm7NGLZUdkDhLbfogQ2xgZvA1dQbVDfuIv_fOcbIbgTSZSlLtakLDWY6VgDm7Amh3sZIqzM2wq-TjiAv2BiiX5T5csLgBjdnuYPwiP0t0jHD19akx3jJcVfhNPPVT-VOSjrCfqotmplYtjGs37A7mH8uzLCDYZQJCNxQ-vDBokr5s7N8VzZ-daTgAEz-j48WSsU6Ie-Zv-0Py3Gi4ERVqb4OYWl4PsWeCotBTS--NofuPCy0BMOpQykXA-HMNvITAssU6bxWCGATDIfpYH1DWqOY8BWlViD1syHtXfxRKjh_YD-CfWXAGOvdDXkTh1opwPbpMuWtN9rPG2w",
      q:
        "trEn8r7J5Na4pHHjxsSw-An6hgIXW7XNFtFpltJqtVpajJKvFx8KetBRJyul5WKv2bLwjB_23V3JBDwZI9ajqpArFCvwME9Qz5AR1D5KWKxTMJ8HxkUxXFmoTWhq53LyvyTeLaWpUjZB8j2QxeE3SM_J8o3e11seAI1hL8Ns6mkIvvVVnN5KVjM21Yw1OA9-YLlaVR9owUEZ9Yi0BPt_W5B5ikjRWMl5a04jDgfFzmM0JAGiEhRwdKERJqfN2Sw5m6Jx1ctl4UBKBL4MrJR20XIP4lFyrxXwM3bmIJEl9a86xrFjRrgr42gs_BPCqcIbd8mgPg9NdciqDNbhFbFRuw",
      dp:
        "xv9mF6Ke7YW_W5SLuiEdTJGmnuegUJZQ3BOj9XQ-FPcdPVoun_G3r3iXiMhwQ0FGmfMTf8CaBQIalAjvCP-jc93FY3Wy0d5I-92i-JjaEN98cU5kojV0t5QnXEjCDM340gqVqbfMYbArdpnceK4z7r6QU5QzRDmGToTTMjBVUIM0DwlVjBMfQ3TJltjWayQtAziDWhxd0s8zYo-XAM-AAgcNPDT6FsqW4amdOdTG7H5gMjwh-PAjodfUvRCfoLuct94nnaQ-EoCp1dLJZXbhslrxg9MAcMcAOX_gt4IScmYePXq4i-gyxbhxHXP6t82yKERGtHm1f9p1plaLXQq9ww",
      dq:
        "k84UQeJ1uTy3OeQiokez3ZlFJHJAr6QQf2uBf9JRHtQw-hYarhwhAGfVoFlB6KnFF94bm2Ko-UPNRC3TMRmQZIgrMjCyLIOfH66xngOfZspUq7ueMJz-aHbpIWdfRk3LczXCwy-KI8dd5zxECrRBZBkoi6KYLae8SDoZ7OixD51WxBf84eM-RSs-K9s5m1d9qYeMO94jhGbFN88Xxggra8shae2r4advIo-e8NT9BhNgtdjUZMhAiztcgue0NQYAvZfZfV0H2guHVvrjiiS7VIxxqWq33EtlgF2rpaGJEpJofSQ665ZJe7xm2LKsBWfTjUCE8nCy_J4SZjza8g_5zQ",
      qi:
        "AjltMT0ZP4mjF2gPS-uvFmfN3j19L7hHUNMnb-BEDJIAw7Jx7paV3-LY-56BDz2AnIe4cSS2Xbp1k2AZP4xgpzdlBINyrHcAn4qgfEIPoL1VWQm3qjFGt0DlI4c_xIMFAC5Idi0YPxaGoFD9_vKIkeuZ1Yag5jekxX2di7Mu7t8u_WsXlZdouz2-chpm2-xFENnaFPMywMwwv_L8fsUBoBrUD1uwKE85VR9a0lFNs6eRhDDF8fB6sd2IVkzm_D1kH4vKaw_VnBJ5-dYlBCPf-ziQI-UT6kyyyxk1eUeqFg-HfzIRbzJaQ2-mbmg03boJjFvlyQc4krDyml25AA0l2g",
    },
  };
  async componentDidMount() {
    const data = await this.getTxList();
    console.log(data);
    this.setState({ data });
  }

  transferCrypto = async () => {
    try {
      this.setState({ creatingTx: true });
      const { walletData, address } = this.state;
      const dataOld = this.state.data;
      const now = Date.now();
      const check = dataOld.some(
        (item) => item.address === address && now - item.timestamp < 86400
      );
      console.log(check);
      if (check) {
        this.setState({
          creatingTx: false,
          errSend: true,
          show: true,
          reason:
            "There is already a claim from your address in the past 24 hours!",
        });
        return;
      }
      const data = {
        address,
        timestamp: Date.now(),
      };
      let transaction = await createTransaction(
        address,
        price,
        walletData,
        JSON.stringify(data)
      );
      const rawBalance = await arweave.wallets.getBalance(walletDefaut);
      const balance = await arweave.ar.winstonToAr(rawBalance);

      transaction.addTag("appname", "ar-faucet");

      let fee = arweave.ar.winstonToAr(transaction.reward);
      let result = await Decimal.add(fee, price).valueOf();
      let newBalance = await Decimal.sub(balance, result).valueOf();
      console.log(transaction);

      if (newBalance < 0) {
        this.setState({
          creatingTx: false,
          errSend: true,
          show: true,
          reason: "Not Enough AR to Faucet",
        });
        return;
      }
      const response = await signAndDeployTransaction(transaction, walletData);
      if (response.data === "OK" && response.status === 200) {
        dataOld.push(data);
        this.setState({
          data: dataOld,
          creatingTx: false,
          errSend: false,
          show: true,
          txId: transaction.id,
        });
        return;
      } else {
        this.setState({ creatingTx: false, errSend: true, show: true });
      }
    } catch (err) {
      console.log("asdasd", err);
      this.setState({ creatingTx: false, errSend: true, show: true });
    }
  };

  getTxList = async () => {
    try {
      const txids = await getTransactionIds();
      const jsonDatas = await Promise.all(
        txids.map(async (txid) => {
          const res = await axios.get(`https://arweave.net/tx/${txid}/data`);
          const transactionData = await getTransaction(txid);
          transactionData.data = res.data;
          const data = transactionData.get("data", {
            decode: true,
            string: true,
          });
          const data2 = JSON.parse(data);
          return { ...data2 };
        })
      );
      return jsonDatas;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  render() {
    const { address, show, errSend, creatingTx, reason, txId } = this.state;
    return (
      <div>
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
            disabled={!address || address.length !== 43 || creatingTx}
            onClick={() => this.transferCrypto()}
          >
            Send Me AR
          </Button>
        </div>
        {show && (
          <Result
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "2px",
              maxWidth: "720px",
              margin: "30px auto",
            }}
            status={errSend ? "error" : "success"}
            title={
              errSend
                ? "Error Faucet Arweave"
                : "Successfully Faucet Arweave To Your Account"
            }
            subTitle={
              errSend ? (
                reason || "Sorry Faucet Failed. Please try again!"
              ) : (
                <p>
                  Transaction ID:{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://viewblock.io/arweave/tx/${txId}`}
                  >
                    {txId}
                  </a>
                  . Amount: 0.1 AR. <br></br>Please wait transaction is
                  submitted to blockchain!
                </p>
              )
            }
          />
        )}
        <div
          style={{ paddingTop: "100px", fontSize: "larger", color: "#1e3548" }}
        >
          <h3 style={{ fontSize: "1.75rem" }}>Give Us Your AR Super Power</h3>
          <br />
          Pool Address:
          <div>4RKaLBrkGUtuAs_5IFEuIWMqnHMowNYimoCca2r6HoA</div>
          <img
            style={{ width: "20%" }}
            src="https://chart.googleapis.com/chart?cht=qr&chl=4RKaLBrkGUtuAs_5IFEuIWMqnHMowNYimoCca2r6HoA&chs=180x180&choe=UTF-8&chld=L|2"
            alt=""
          ></img>
        </div>

        <div className="footer-container">
          <div className="footer-trademark"> © Arweave Community Product </div>
        </div>
      </div>
    );
  }
}

export default App;
