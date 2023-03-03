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
    const [numMarketsState, setNumMarketsState] = useState(0)


    const dispatch = useNotification()

    useEffect(() => {
      if (isWeb3Enabled) {
        console.log("bettingFactoryAddress : ", bettingFactoryAddress);
        readNumMarkets();
        updateUIValues();
      }
    }, [isWeb3Enabled, account]);
    

    /* View Functions */

    const { runContractFunction: getNumMarkets, data: numMarkets } = useWeb3Contract({
      abi: factoryAbi,
      contractAddress: bettingFactoryAddress,
      functionName: "getNumMarkets",
      params: { },
    });

    const readNumMarkets = async () => {
      const numMarketsFromCall = (await getNumMarkets()).toString();
    }

    const updateUIValues = async() => {
      console.log("updateUIValues");

      const numMarketsInt = parseInt(numMarkets);

      let marketsToSearch = offset + 5 > numMarketsInt ? numMarketsInt - offset : 5;
      console.log("marketsToSearch : ", marketsToSearch)

      // get markets
      console.log("get markets");
      const tempArr = [];
      for (let i = offset ; i < marketsToSearch + offset; i++) {
        const readOptions = {
          contractAddress: bettingFactoryAddress,
          functionName: "getMarket",
          abi: factoryAbi,
          params: { _index: i }
        }
        const address = (await Moralis.executeFunction(readOptions)).toString();
        tempArr.push(address);
      }

      setOffset(prev => prev + marketsToSearch);
      setMarketAddresses(prev => prev.concat(tempArr));

  }



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
        {marketAddresses.map((address, i) => {
          return <MarketRow key={address} marketAddress={ address } index={ i } />
        })}

        <button onClick={ updateUIValues } className="bg-transparent hover:bg-orange-500 text-orange-800 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded">
          Load More
        </button>

      </div>
    )
}
