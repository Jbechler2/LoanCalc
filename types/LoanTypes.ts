export type Loan = {
  id: number,
  name: string,
  principal: number,
  rate: number,
  term: number,
  createdAt: string
  //Calc'd fields
  monthlyPayment: string,
  totalCost: string,
  payoffDate: string
}

export type LoanContextType = {
  compareSlots: {
    left: Loan | null;
    right: Loan | null;
  };
  setCompareSlots: (slots: {left: Loan | null; right: Loan | null }) => void;
  setLeftCompare: (loan: Loan) => void
  setRightCompare: (loan: Loan) => void
  savedLoans: Loan[]
  saveLoan: (loan: Loan) => Promise<void>
  deleteLoan: (id: number) => Promise<void>
  isLoanSaved: (id: number) => boolean
  currentLoan: Loan | null
}

