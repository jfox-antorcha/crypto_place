import React, { createContext, useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../utils/contants'

interface TransactionProps {
  connectWallet: () => void
  currentAccount: string
  formData: FormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
  isLoading: boolean
  sendTransaction: () => void
  transactions: [] | never[]
}

interface FormData {
  addressTo: string
  amount: string
  keyword: string
  message: string
}

const INITIAL_FORMDATA = {
  addressTo: '',
  amount: '',
  keyword: '',
  message: '',
} as FormData

export const TransactionContext = createContext({} as TransactionProps)

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  return transactionContract
}

export const TransactionProvider = ({ children }: any) => {
  const [formData, setFormData] = useState(INITIAL_FORMDATA)
  const [currentAccount, setcurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
  const [transactions, setTransactions] = useState([])

  const checkWalletConnected = async () => {
    if (!ethereum) return alert('First you need to install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length) {
      setcurrentAccount(accounts[0])
      getAllTransactions()
    }
  }

  const checkTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract()
      const transactionCount = await transactionContract.getTansactionCount()

      window.localStorage.setItem('transactionCount', transactionCount)
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('First you need to install Metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setcurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const getAllTransactions = async () => {
    if (!ethereum) return alert('First you need to install Metamask')

    const transactionContract = getEthereumContract()
    const availableTransactions = await transactionContract.getAllTransactions()
    const structuredTransactions = availableTransactions.map(
      (transaction: {
        receiver: string
        sender: string
        timestamp: { toNumber: () => number }
        message: string
        keyword: string
        amount: { _hex: string }
      }) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
      })
    )
    setTransactions(structuredTransactions)
  }

  const sendTransaction = async () => {
    setIsLoading(true)
    try {
      if (!ethereum) return alert('Please install Metamask')
      const { addressTo, amount, keyword, message } = formData
      const hexAmount = ethers.utils.parseEther(amount)._hex
      const transactionContract = getEthereumContract()
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', //21000 GWEI
            amount: hexAmount,
          },
        ],
      })
      const transactionHash = await transactionContract.addToBlockChain(addressTo, hexAmount, message, keyword)
      console.log(`Loading - ${transactionHash.hash}`)
      await transactionHash.wait()
      console.log(`Success - ${transactionHash.hash}`)
      const transactionCount = await transactionContract.getTansactionCount()
      setTransactionCount(transactionCount.toNumber())
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
    setIsLoading(false)
  }

  const transactionContextData = useMemo(
    () => ({
      connectWallet,
      currentAccount,
      formData,
      handleChange,
      isLoading,
      sendTransaction,
      transactions,
    }),
    [formData, currentAccount, isLoading, transactions]
  )

  useEffect(() => {
    checkWalletConnected()
    checkTransactionsExist()
  }, [])

  return <TransactionContext.Provider value={transactionContextData}>{children}</TransactionContext.Provider>
}
