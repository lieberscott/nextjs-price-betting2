import { erc20Abi, instanceAbi, myTokenAddress } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import Link from "next/link";
import { displayDate } from "../utils"


export default function Timer(props) {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const now = Date.now();
    const cutoffTime = parseInt(props.cutoffTime) * 1000;

    const timeArr = cutoffTime - now < 0 ? [0, 0, 0] : msToTime(cutoffTime - now);
    
    setHours(timeArr[0]);
    setMinutes(timeArr[1]);
    setSeconds(timeArr[2]);

  }, []);

  const msToTime = (duration) => {
    let s = Math.floor((duration / 1000) % 60);
    let m = Math.floor((duration / (1000 * 60)) % 60);
    let h = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return [h, m, s];
  }


  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
          setSeconds(seconds - 1);
      }
      if (minutes === 0) {
        if (hours === 0) {
          clearInterval(myInterval);
        }
        else {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        }
        else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } 
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

    return (
        <div className="flex">
        { hours === 0 && minutes === 0 && seconds === 0
            ? "Entries Closed"
            : <p> {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p> 
        }
        </div>
    )
}