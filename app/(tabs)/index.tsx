import LoanContext from "@/context/LoanContext";
import { Loan } from "@/types/LoanTypes";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const loanContext = useContext(LoanContext)
  let Loan1: Loan = {
    id: 2,
    name: 'Testing Loan',
    term: 48,
    rate: 0.25,
    principal: 1000,
    monthlyPayment: 0,
    totalCost: 0,
    payoffDate: '',
    createdAt: ''
  }

  const handleCompare = (loan: Loan, slot: 'left' | 'right') => {
    let replacedLoan = slot === 'left' ? loanContext.compareSlots.left: loanContext.compareSlots.right

    if(replacedLoan && !loanContext.isLoanSaved(replacedLoan.id)){
      console.log("Need to save loan before overwriting")
    } else {
      slot === 'left' ? loanContext.setLeftCompare(loan) : loanContext.setRightCompare(loan);
    }
  }

  const calculateLoanDetails = (principal: number, rate: number, term: number) => {
    if(principal > 0 && rate > 0 && term > 0){
      Loan1 = {
        id: 2,
        name: '',
        term,
        rate,
        principal,
        monthlyPayment: calcMonthlyPayment(principal, rate, term),
        totalCost: calcTotalCost(principal, rate, term),
        payoffDate: calcPayoffDate(principal, rate, term),
        createdAt: new Date().toISOString()
      }
    } else {
      //Todo: Add error handling
    }
  }

  const calcMonthlyPayment = (principal: number, rate: number, term: number) => {

  }
  const calcTotalCost = (principal: number, rate: number, term: number) => {
    
  }
  const calcPayoffDate = (principal: number, rate: number, term: number) => {
    
  }
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text style={styles.header}>Principal</Text>
      <TextInput placeholderTextColor="#c0c0c0" style={styles.inputField} placeholder="1000" />
      <Text style={styles.header}>Rate</Text>
      <TextInput placeholderTextColor="#c0c0c0" style={styles.inputField} placeholder="0.25"/>
      <Text style={styles.header}>Term</Text>
      <TextInput placeholderTextColor="#c0c0c0" style={styles.inputField} placeholder="48"/>
      <View style={styles.inputView}>
        <Pressable style={styles.button} onPress={() => console.log("calculate loan details")}>
          <Text style={styles.buttonText}>Calculate</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: 100,
    color: '#666'
  },
  header: {
    fontSize: 50,
    marginTop: 10,
  },
  inputView: {
    paddingTop: 10
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20
  }
})