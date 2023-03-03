import { erc20Abi, instanceAbi, myTokenAddress } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"


export default function IndividualMarket(props) {

  const { account, chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex)
  // const chainId = "31337"

  const marketAddress = props.marketAddress

  const dispatch = useNotification()


  /* View Functions */


  const { data: asset, runContractFunction: getAsset } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getAsset",
    params: { },
  });

  const { data: ethBalance, runContractFunction: getEthBalance } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getEthBalance",
    params: { },
  });

  const { data: expirationTime, runContractFunction: getExpirationTime } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getExpirationTime",
    params: { },
  });

  const { data: entryFee, runContractFunction: getEntryFee } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getEntryFee",
    params: { },
  });

  const { data: deployTime, runContractFunction: getDeployTime } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getDeployTime",
    params: { },
  });

  const { data: cutoffTime, runContractFunction: getCutoffTime } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getCutoffTime",
    params: { },
  });

  const { data: open, runContractFunction: isOpen } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getIsOpen",
    params: { },
  });

  const { data: numPlayers, runContractFunction: getNumPlayes } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "getNumPlayers",
    params: { },
  });


  const getMarketData = async () => {
    // 2. call each submarket to get the details of each market
      // get asset

      const assetFromCall = (await getAsset()).toString();

      // getEthBalance
      const ethBalanceFromCall = (await getEthBalance()).toString();

      // getExpirationTime
      const expirationTimeFromCall = (await getExpirationTime()).toString();

      // getEntryFee
      const entryFeeFromCall = (await getEntryFee()).toString();

      // getDeployTime
      // const deployTimeFromCall = (await getDeployTime()).toString();

      // getCutoffTime
      const getCutoffTimeFromCall = (await getCutoffTime()).toString();

      // getIsOpen
      const isOpenFromCall = (await isOpen()).toString();

      // getNumPlayers
      const numPlayersFromCall = (await getNumPlayes()).toString();
  }

  useEffect(() => {
    getMarketData();
  }, []);


  const handleNewNotification = () => {
    dispatch({
        type: "info",
        message: "Transaction Complete!",
        title: "Transaction Notification",
        position: "topR",
        icon: "bell",
    })
  }

  const handleSuccess = async (tx, updateType) => {
    try {
        await tx.wait(1)
        handleNewNotification(tx)
    } catch (error) {
        console.log(error)
    }
  }


  const displayDate = (seconds) => {
    const sec = parseInt(seconds) * 1000;
    const d = new Date(sec);
    const month = d.getMonth();
    const date = d.getDate();
    const year = d.getFullYear();
    const hour0 = parseInt(d.getHours());
    const hour = hour0 % 12 === 0 ? 12 : hour0 % 12;
    const amPm = hour0 >= 12 ? "p.m." : "a.m.";
    const minute = parseInt(d.getMinutes()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    return `${month}/${date}/${year}, ${hour}:${minute} ${amPm}`;
  }

  const marketOpenCSS = "bg-lime-100 flex items-center pl-4 pr-8 py-4 my-2"
  const marketClosedCSS = "bg-red-100 flex items-center px-8 py-4 my-2"


  return (
    <div className={open.toString() === "0" ? marketOpenCSS : marketClosedCSS }>
      <div className="flex-shrink-0 mr-4">
          <img className="w-8 h-8 rounded-full" src={ asset && asset.toString() === "0" ? "/ethereum.png" : asset && asset.toString() === "1" ? "/bitcoin.png" : "/doge.png" } />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
            Asset: { asset ? asset.toString() === "0" ? "ETH" : asset.toString() === "1" ? "BTC" : "DOGE" : "No asset" }
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Predictions Cut Off: { cutoffTime ? displayDate(cutoffTime.toString()) : "No cutoff Time" }
          </p>
          <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
            Asset Price Date: { expirationTime ? displayDate(expirationTime.toString()) : "No expiration time" }
          </p>
      </div>
      <div className="text-base font-semibold text-gray-900 dark:text-gray-400">
          <div>Entrants: { numPlayers ? numPlayers.toString() : "No num players" }</div>
          <div>Prize pool: {ethBalance ? ethers.utils.formatUnits(ethBalance.toString()) : "0"} ETH</div>
      </div>
    </div>
        
  )
}
