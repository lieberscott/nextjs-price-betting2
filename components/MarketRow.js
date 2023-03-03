import { erc20Abi, instanceAbi, myTokenAddress } from "../constants"
// dont export from moralis when using react
import Image from 'next/image'
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import Link from "next/link";
import { displayDate } from "../utils"

import Timer from "./Timer"


export default function MarketRow(props) {

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

  const marketOpenCSS = "bg-lime-100 flex items-center pl-4 pr-8 py-4 my-2"
  const marketPredictionsClosedCSS = "bg-orange-100 flex items-center pl-4 pr-8 py-4 my-2"
  const marketClosedCSS = "bg-red-100 flex items-center px-8 py-4 my-2"


  return (
    <Link href={{
      pathname: `/${props.index}`,
      query: {
        asset: asset ? asset.toString() : "",
        ethBalance: ethBalance ? ethBalance.toString() : "",
        expirationTime: expirationTime ? expirationTime.toString() : "",
        entryFee: entryFee ? entryFee.toString() : "",
        deployTime: deployTime ? deployTime.toString() : "",
        cutoffTime: cutoffTime ? cutoffTime.toString() : "",
        open: open ? open.toString(): "",
        numPlayers: numPlayers ? numPlayers.toString(): "",
        marketAddress
      }
    }}>
      <a>
        <div className={open ? open.toString() === "0" ? marketOpenCSS : marketClosedCSS : "" }>
          <div className="flex-shrink-0 mr-4">
            <img className="w-8 h-8 rounded-full" src={ asset && asset.toString() === "0" ? "/nextjs-price-betting2/ethereum.png" : asset && asset.toString() === "1" ? "/nextjs-price-betting2/bitcoin.png" : "/nextjs-price-betting2/doge.png" } />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
              Asset: { asset ? asset.toString() === "0" ? "ETH" : asset.toString() === "1" ? "BTC" : "DOGE" : "No asset" }
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
              Entry Fee: { entryFee ? ethers.utils.formatUnits(entryFee.toString()) + " ETH" : "None found" }
            </p>
            <p className="flex text-sm text-gray-500 truncate dark:text-gray-400">
              <span className="mr-5">Predictions Cut Off:</span> { cutoffTime ? <Timer cutoffTime={ cutoffTime.toString() } /> : "No cutoff Time" }
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
              What will the price be on: { expirationTime ? displayDate(expirationTime.toString()) : "No expiration time" }
            </p>
          </div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-400">
              <div>Entrants: { numPlayers ? numPlayers.toString() : "No num players" }</div>
              <div>Prize pool: {ethBalance ? ethers.utils.formatUnits(ethBalance.toString()) : "0"} ETH</div>
          </div>
        </div>
      </a>
    </Link>
  )
}
