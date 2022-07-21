import { toContainElement } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider, makeStyles, CircularProgress } from "@material-ui/core";
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { ethers } from "ethers";



import abi from "../constants/abi.json"
import classes from "./EnterLottery.module.css"

const EnterLottery = (props) => {
    const { enableWeb3, isWeb3Enabled } = useMoralis()

    const [entranceFee, setEntranceFee] = useState(0)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [recentWinner, setRecentWinner] = useState()

    // !functions all called internally
    const { runContractFunction: getEntranceFeeFunction } = useWeb3Contract({
        abi: abi,
        contractAddress: "0xba29eb644831a801e86eefae9bacf87332335659",
        functionName: "getEntranceFee",
        params: {}
    })

    const { runContractFunction: getNumberOfPlayersFunction } = useWeb3Contract({
        abi: abi,
        contractAddress: "0xba29eb644831a801e86eefae9bacf87332335659",
        functionName: "getNumberOfPlayers",
        params: {}
    })

    const { runContractFunction: getRecentWinnerFunction } = useWeb3Contract({
        abi: abi,
        contractAddress: "0xba29eb644831a801e86eefae9bacf87332335659",
        functionName: "getRecentWinner",
        params: {}
    })

    const updateUiValues = async () => {
        const returnedEntranceFee = await getEntranceFeeFunction()
        setEntranceFee(returnedEntranceFee.toString())
        const returnedNumberOfPlayers = await getNumberOfPlayersFunction()
        setNumberOfPlayers(returnedNumberOfPlayers.toString())
        const returnedRecentWinner = await getRecentWinnerFunction()
        setRecentWinner(returnedRecentWinner.toString())
        console.log("returned entrance fee value:", returnedEntranceFee.toString())
        console.log("returned number of players value:", returnedNumberOfPlayers.toString())
        console.log("returned recent winner value:", returnedRecentWinner.toString())

    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUiValues()
        }
    }, [isWeb3Enabled])

    // !functions called by the user
    const { runContractFunction: enterLotteryFunction } = useWeb3Contract({
        abi: abi,
        contractAddress: "0xba29eb644831a801e86eefae9bacf87332335659",
        functionName: "enterLottery",
        msgValue: entranceFee,
        params: {},
    })

    const handleSuccess = async (tx) => {
        tx.wait(1)
        console.log("transaction was successful")
        updateUiValues()
    }

    if (isWeb3Enabled) {
        return (
            <div>
                <div className={classes.lotteryDataDiv}>
                    <h1>Lottery Data</h1>
                    {entranceFee && recentWinner && numberOfPlayers
                        ?
                        <div>
                            <h2>Most recent lottery winner: {recentWinner}</h2>
                            <h2>Current number of players (3 required): {numberOfPlayers}</h2>

                            <h2>Cost to enter: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</h2>
                        </div>
                        :
                        <CircularProgress color="secondary" />
                    }
                    {console.log(ethers.utils.formatUnits(entranceFee, "ether"))}
                    {/* <h2>Cost to enter: {entranceFee ? ethers.utils.formatUnits(entranceFee, "ether") : } ETH</h2> */}
                </div>
                <div className={classes.enterLotteryButtonDiv}>
                    <Button type="submit" color="secondary" variant="contained"
                        onClick={
                            async () =>
                                await enterLotteryFunction(
                                    {
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log("error:", error)
                                    })}>
                        Enter lottery
                    </Button>
                </div>
            </div>
        )
    } else {
        return <p>Please install and connect metamask on RINKEBY</p>
    }
}

export default EnterLottery