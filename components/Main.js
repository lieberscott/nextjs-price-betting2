import { contractAddresses, factoryAbi } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import MarketRow from "./MarketRow"


const batchLen = 5; // number of markets to query at a time

export default function Main() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();
    
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex) === 1337 ? 31337 : parseInt(chainIdHex)
    // const chainId = parseInt(chainIdHex)
    // const chainId = "31337"
    console.log("chainId : ", chainIdHex)
    console.log("account : ", account)
    // console.log(`ChainId is ${chainId}`)
    const bettingFactoryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const zeroXAddress = "0x0000000000000000000000000000000000000000"

    // State hooks
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    const [marketAddresses, setMarketAddresses] = useState([]);
    const [primaryTab, setPrimaryTab] = useState(0);
    const [offset, setOffset] = useState(0);


    const dispatch = useNotification()

    useEffect(() => {
      if (isWeb3Enabled) {
        console.log("bettingFactoryAddress : ", bettingFactoryAddress);
        updateUIValues();
      }
    }, [isWeb3Enabled, account]);

    // 1. Get numMarkets
    // 2. Get most recent 5 market addresses
    // 3. Get data for each market (asset, expTime, entryFee, etc.)
    // 4. onScroll, get next 5 markets

    // const {
    //     runContractFunction: enterRaffle,
    //     data: enterTxResponse,
    //     isLoading,
    //     isFetching,
    // } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: bettingFactoryAddress,
    //     functionName: "getContractFromMainAddress",
    //     msgValue: entranceFee,
    //     params: {},
    // })

    const updateUIValues = async() => {
      console.log("updateUIValues");
      const numMarketsFromCall = (await getNumMarkets()).toString()
      console.log("numMarketsFroMCall : ", numMarketsFromCall);

      // get markets
      console.log("get markets");
      const tempArr = [];
      for (let i = 0 ; i < 2; i++) {
        const readOptions = {
          contractAddress: bettingFactoryAddress,
          functionName: "getMarket",
          abi: factoryAbi,
          params: { _index: i }
        }
        const address = (await Moralis.executeFunction(readOptions)).toString();
        tempArr.push(address);
      }

      setMarketAddresses(prev => prev.concat(tempArr));

  }

    /* View Functions */

    const { runContractFunction: getNumMarkets, data: numMarkets } = useWeb3Contract({
      abi: factoryAbi,
      contractAddress: bettingFactoryAddress,
      functionName: "getNumMarkets",
      params: { },
    });

    // const { runContractFunction: getAddress, data: address } = useWeb3Contract({
    //   abi: factoryAbi,
    //   contractAddress: bettingFactoryAddress,
    //   functionName: "getMarket",
    //   params: { },
    // });



    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }



    return (
      <div className="p-5">
        <div>bettingFactoryAddress: {bettingFactoryAddress}</div>
        <div>numMarkets: {numMarkets ? numMarkets.toString() : "" }</div>
        <button onClick={ updateUIValues }>Get Num Markets</button>
        <img src="../assets/doge.png" alt="No img"/>
        {marketAddresses.map((address, i) => {
          return <MarketRow marketAddress={ address } />
        })}

      </div>
    )
}
