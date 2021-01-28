import axios from "axios";

const apiKeyAmberData = "UAK16ae85fb02d2d450f570a5ff7d409ca0";

export async function apiGetAccountAssets(address, chainId) {
  const {
    data,
    data: {
      payload: { records },
    },
  } = await axios({
    method: "get",
    url: `https://web3api.io/api/v1/addresses/${address}/tokens`,
    headers: {
      "x-api-key": apiKeyAmberData,
      "x-amberdata-blockchain-id": "ethereum-rinkeby",
    },
  });
  console.log(data);

  return records;
}
