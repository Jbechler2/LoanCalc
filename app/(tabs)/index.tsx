import LoanContext from "@/context/LoanContext";
import { Loan } from "@/types/LoanTypes";
import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const loanContext = useContext(LoanContext)
  const [principalInput, setPrincipalInput] = useState('')
  const [rateInput, setRateInput] = useState('')
  const [termInput, setTermInput] = useState('')
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null)
  const [nameModalVisible, setNameModalVisible] = useState(false)
  const [loanName, setLoanName] = useState('')
  const [compareModalVisible, setCompareModalVisible] = useState(false)

  const calculateLoanDetails = (principal: number, rate: number, term: number) => {

    if(principal > 0 && rate > 0 && term > 0){
      const newLoan: Loan = {
        id: new Date().getTime(),
        name: '',
        term,
        rate,
        principal,
        monthlyPayment: '',
        totalCost: '',
        payoffDate: '',
        createdAt: new Date().toISOString()
      }

      newLoan.monthlyPayment = calcMonthlyPayment(principal, rate, term)
      newLoan.totalCost = calcTotalCost(Number.parseFloat(newLoan.monthlyPayment), term)
      newLoan.payoffDate = calcPayoffDate(newLoan.createdAt, newLoan.term)

      setCurrentLoan(newLoan)
    } else {
      //Todo: Add error handling
    }
  }

  const calcMonthlyPayment = (principal: number, rate: number, term: number): string => {
    let monthlyRate = (rate/100) / 12;
    let top = ((1 + monthlyRate)**term)*monthlyRate
    let bottom = ((1+monthlyRate)**term)-1
    let payment = principal*(top/bottom)

    return payment.toFixed(2);
  }
  const calcTotalCost = (monthlyPayment: number, term: number): string => {
    return (monthlyPayment*term).toFixed(2);
  }
  const calcPayoffDate = (createdAt: string, term: number) => {
    const loanStart = new Date(createdAt)
    loanStart.setMonth(loanStart.getMonth() + term)

    return loanStart.toISOString()
  }
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {currentLoan ? (
        <View>
          <Text style={styles.label}>Principal: </Text>
          <Text style={styles.labelValue}>{currentLoan.principal}</Text>
          <Text style={styles.label}>Rate: </Text>
          <Text style={styles.labelValue}>{currentLoan.rate}</Text>
          <Text style={styles.label}>Term: </Text>
          <Text style={styles.labelValue}>{currentLoan.term}</Text>
          <Text style={styles.label}>Monthly Payment: </Text>
          <Text style={styles.labelValue}>{currentLoan.monthlyPayment}</Text>
          <Text style={styles.label}>Payoff Date: </Text>
          <Text style={styles.labelValue}>{new Date(currentLoan.payoffDate).toLocaleDateString()}</Text>
          <Text style={styles.label}>Total Cost: </Text>
          <Text style={styles.labelValue}>{currentLoan.totalCost}</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText} onPress={() => setCompareModalVisible(true)}>Compare</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setNameModalVisible(true)}>
            <Text style={styles.buttonText}>Save Loan</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCurrentLoan(null)}>
            <Text style={styles.buttonText}>Back to Loan Terms</Text>
          </Pressable>

          <Modal 
            visible={nameModalVisible} 
            onRequestClose={() => setNameModalVisible(false)}
            transparent={true}
          >
            <View
              style={styles.modalOverlay}
            >
              <View
                style={styles.modalContent}
              >
                <Text style={styles.modalHeader}>Loan Name:</Text>
                  <TextInput 
                    style={styles.modalInput} 
                    placeholderTextColor="#c0c0c0" 
                    placeholder="New Auto Loan"
                    onChangeText={(newLoanName) => setLoanName(newLoanName)}
                  />
                  <View style={styles.modalButtons}>
                    <Pressable style={styles.button} onPress={() => setNameModalVisible(false)}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => {currentLoan.name = loanName; loanContext.saveLoan(currentLoan); setNameModalVisible(false)}}>
                      <Text style={styles.buttonText}>Save Loan</Text>
                    </Pressable>
                  </View>
              </View>
            </View>
          </Modal>
          <Modal 
            visible={compareModalVisible} 
            onRequestClose={() => setCompareModalVisible(false)}
            transparent={true}
          >
            <View
              style={styles.modalOverlay}
            >
              <View
                style={styles.modalContent}
              >
                <Text style={styles.modalHeader}>Which Slot?</Text>
                  <View style={styles.modalButtons}>
                    <Pressable style={styles.button} onPress={() => {loanContext.setLeftCompare(currentLoan);setCompareModalVisible(false)}}>
                      <Text style={styles.buttonText}>Left</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => {loanContext.setRightCompare(currentLoan);setCompareModalVisible(false)}}>
                      <Text style={styles.buttonText}>Right</Text>
                    </Pressable>
                  </View>
              </View>
            </View>
          </Modal>
        </View>
      ) 
      : (
        <View>
          <Text style={styles.header}>Principal</Text>
          <TextInput placeholderTextColor="#c0c0c0" style={styles.inputField} placeholder="1000" onChangeText={(newPrincipal) => setPrincipalInput(newPrincipal)} />
          <Text style={styles.header}>Rate</Text>
          <TextInput placeholderTextColor="#c0c0c0" style={styles.inputField} placeholder="0.25" onChangeText={(newRate) => setRateInput(newRate)}/>
          <Text style={styles.header}>Term</Text>
          <TextInput placeholderTextColor="#c0c0c0" style={styles.inputField} placeholder="48" onChangeText={(newTerm) => setTermInput(newTerm)}/>
          <View style={styles.inputView}>
            <Pressable style={styles.button} onPress={() => calculateLoanDetails(Number.parseFloat(principalInput), Number.parseFloat(rateInput), Number.parseFloat(termInput))}>
              <Text style={styles.buttonText}>Calculate</Text>
            </Pressable>
          </View>
        </View>
       )}
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
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  labelValue: {
    fontSize: 15
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
    color: '#666'
  },
  modalHeader: { 
    fontSize: 25,
    marginBottom: 10
  }
})