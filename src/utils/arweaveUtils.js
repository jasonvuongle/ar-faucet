import Arweave from "arweave/web";

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  timeout: 20000,
  logging: false,
});

const createTransaction = async (
  arReceiverAddress,
  arValue,
  walletData,
  data
) => {
  let transaction = await arweave.createTransaction(
    {
      data,
      target: arReceiverAddress,
      quantity: arweave.ar.arToWinston(arValue),
    },
    walletData
  );
  return transaction;
};

const signAndDeployTransaction = async (transaction, walletData) => {
  await arweave.transactions.sign(transaction, walletData);
  const response = await arweave.transactions.post(transaction);
  return response;
};

const walletDefaut = "4RKaLBrkGUtuAs_5IFEuIWMqnHMowNYimoCca2r6HoA";
const price = 0.1;

const getTransactionIds = async () => {
  const txids = await arweave.arql({
    op: "and",
    expr1: {
      op: "equals",
      expr1: "from",
      expr2: walletDefaut,
    },
    expr2: {
      op: "equals",
      expr1: "appname",
      expr2: `ar-faucet`,
    },
  });
  return txids;
};

const getTransaction = async (transactionId) => {
  const transaction = await arweave.transactions.get(transactionId);
  return transaction;
};

export {
  createTransaction,
  signAndDeployTransaction,
  getTransactionIds,
  getTransaction,
  walletDefaut,
  price,
};
