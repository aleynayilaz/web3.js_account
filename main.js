if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
} else {
  console.log("Install Metamask");
}

const ethereumButton = document.querySelector(".enableEthereumButton");
const showAccount = document.querySelector(".showAccount");
const sendEthButton = document.querySelector(".sendEthButton");
const showBalance = document.querySelector(".showBalance");
const amount = document.getElementById("amount");

ethereumButton.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  showAccount.innerHTML = account;

  const balance = await ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  console.log(balance);
  const read = parseInt(balance) / 10 ** 18;
  console.log(read.toFixed(5));
  showBalance.innerHTML = read.toFixed(5);

  // const value = 200;
  // console.log(value)

  sendEthButton.addEventListener("click", () => {
    console.log(amount.value);
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: "0xef60234aaFD3884Bd5c1aD7e2a2d6Ff067F9c8e0",
            value: "0x" + (amount.value * 10 ** 18).toString(16),
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
  });
}
