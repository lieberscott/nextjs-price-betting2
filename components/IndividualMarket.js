import { useMoralis, useWeb3Contract } from "react-moralis"
import Link from "next/link";
import { instanceAbi } from "../constants"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers"
import { displayDate } from "../utils";
import { useNotification } from "web3uikit";

import Timer from "./Timer";

function IndividualMarket() {

  const router = useRouter();

  const [estimate, setEstimate] = useState("");
  const [formattedEst, setFormattedEst] = useState("0");

  const { market, marketAddress, asset, ethBalance, expirationTime, cutoffTime, deployTime, entryFee, open, numPlayers } = router.query;
  const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();

  const entryFeeNum = parseFloat(ethers.utils.formatUnits(entryFee)); // 0.1
  const ethBalanceNum = parseFloat(ethers.utils.formatUnits(ethBalance)); // 0.1
  
  const [ethBalanceState, setEthBalanceState] = useState(ethBalanceNum);
  const [numPlayersState, setNumPlayersState] = useState(numPlayers);

  const dispatch = useNotification();


  // positive decimals and numbers
  const regex = /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/
  
  const checkNum = async () => {
    const isNum = regex.test(estimate);
    if (isNum) {
      // convert token amount with decimals
      const formattedNum = ethers.utils.parseUnits(estimate).toString()
      console.log("isNum : ");
      console.log("formattedNum : ", formattedNum);

      setFormattedEst(formattedNum);


      // try {
      //   const readOptions = {
      //     contractAddress: marketAddress,
      //     functionName: "makePrediction",
      //     abi: instanceAbi,
      //     params: { _price: formattedNum },
      //     msgValue: entryFee
      //   }
      //   const response = (await Moralis.executeFunction(readOptions)).toString();
      //   console.log("Response : ", response);
      // }
      // catch (e) {
      //   console.log(e);
      //   window.alert("Error: Please try again")
      // }
    }
    else {
      window.alert("Estimate is not a valid number")
    }
  }

  useEffect(() => {
    if (formattedEst > 0) {
      makeCall();
    }
  }, [formattedEst])

  const handleSuccess = async (tx) => {
    await tx.wait(1)
    setEthBalanceState(prev => prev + entryFeeNum);
    setNumPlayersState(prev => parseInt(prev) + 1);
    handleNewNotification(tx);
  }

  const handleNewNotification = async () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Tx Notification",
      position: "topR",
      icon: "bell"
    })
  }

  const makeCall = async () => {
    await makePrediction({
      onSuccess: handleSuccess,
      onError: (e) => console.log(e)
    })
  }


  const { data: prediction, runContractFunction: makePrediction } = useWeb3Contract({
    abi: instanceAbi,
    contractAddress: marketAddress,
    functionName: "makePrediction",
    params: { _price: formattedEst },
    msgValue: entryFee
  });

  const marketOpenCSS = "max-w-xl p-6 bg-lime-100 border border-gray-200 rounded-lg shadow dark:bg-lime-800 dark:border-lime-700"
  const marketClosedCSS = "max-w-xl p-6 bg-red-100 border border-gray-200 rounded-lg shadow dark:bg-red-800 dark:border-red-700"

  return (
    <div>
      <Link href="/">
        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red">
          Back
            {/* <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> */}
          </a>
      </Link>
      <div className={ open ? marketOpenCSS : marketClosedCSS }>
        <div className="flex-shrink-0 mr-4">
          <img className="w-8 h-8 rounded-full" src={ asset === "0" ? "/ethereum.png" : asset === "1" ? "/bitcoin.png" : "/doge.png" } />
        </div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What will { asset === "0" ? "ETH's" : asset === "1" ? "BTC's" : "DOGE's" } price be by { displayDate(expirationTime)}?</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Entry Fee: {ethers.utils.formatUnits(entryFee)} ETH (entry fees are ALWAYS paid in ETH, regardless of market)</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Number of Entrants: {numPlayersState}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Current prize pool: {ethBalanceState} ETH </p>
        <p className="flex mb-3 font-normal text-gray-700 dark:text-gray-400">Predictions Must be in by: { displayDate(cutoffTime) } <span className="ml-6"><Timer cutoffTime={cutoffTime} /></span></p>
        <div className="mb-8">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your price prediction (US Dollars)</label>
          <p className="flex items-center font-normal text-gray-700 dark:text-gray-400 bg-white px-5 rounded-lg">$<input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 bg-white dark:text-white ml-2" onChange={(e) => setEstimate(e.target.value)} value={estimate} placeholder="2000" required /></p>
        </div>
        <button onClick={checkNum} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Make Prediction
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <p className="flex items-center font-normal text-gray-700 dark:text-gray-400">Will be rejected if past the close time</p>
      </div>
    </div>
  )
}

export default IndividualMarket;