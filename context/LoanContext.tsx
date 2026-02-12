import { Loan, LoanContextType } from "@/types/LoanTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

const LoanContext = createContext({} as LoanContextType);

interface LoanProviderProps {
  children: ReactNode
}

export const LoanProvider = ({ children }: LoanProviderProps) => {
  const [compareSlots, setCompareSlots] = useState<{left: Loan | null, right: Loan | null}>({left: null, right: null})
  const [savedLoans, setSavedLoans] = useState<Loan[]>([])
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null)

  useEffect(() => {
    const loadLoans = async () => {
      let savedLoansString: string | null = await AsyncStorage.getItem("saved_loans")
      if(savedLoansString){
        setSavedLoans(JSON.parse(savedLoansString))
      }
    }
    loadLoans()
  }, [])

  const deleteLoan = async (id: number) => {
    const updatedLoans = savedLoans.filter((loan) => {return loan.id !== id})

    setSavedLoans(updatedLoans)

    await AsyncStorage.setItem('saved_loans', JSON.stringify(updatedLoans))
  }

  const saveLoan = async (loan: Loan) => {
    const updatedLoans = [...savedLoans, loan]

    setSavedLoans(updatedLoans)
        
    await AsyncStorage.setItem('saved_loans', JSON.stringify(updatedLoans))
  }

  const isLoanSaved = (id: number) => {
    return savedLoans.some(saved => saved.id === id)
  }
  
  const setLeftCompare = (loan: Loan) => {
    setCompareSlots(prev => ({...prev, left: loan, }))
  }
  const setRightCompare = (loan: Loan) => {
    setCompareSlots(prev => ({...prev, right: loan}))
  }

  const loanContext = useMemo (() => {
    return {
      compareSlots,
      setCompareSlots,
      setLeftCompare,
      setRightCompare,
      savedLoans,
      setSavedLoans,
      isLoanSaved,
      saveLoan,
      deleteLoan,
      setCurrentLoan
    } as LoanContextType
  }, [compareSlots, savedLoans, currentLoan])

  return (
    <LoanContext.Provider value={loanContext}>
      { children }
    </LoanContext.Provider>
  )
}

export default LoanContext;