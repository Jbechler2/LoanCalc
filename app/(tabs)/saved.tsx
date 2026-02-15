import LoanContext from "@/context/LoanContext";
import { Loan } from "@/types/LoanTypes";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const loanContext = useContext(LoanContext)
  let savedLoanListItems = []
  const [compareModalVisible, setCompareModalVisible] = useState(false)
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null)

  savedLoanListItems = loanContext.savedLoans.map(loan => (
    <View style={styles.loanListItem} key={loan.id}>
      <View>
        <Text style={styles.header}>{loan.name}</Text>
        <View style={styles.subHeaders}>
          <Text style={styles.subHeader}>Prin: {loan.principal}</Text>
          <Text style={styles.subHeader}>Rate: {loan.rate}</Text>
          <Text style={styles.subHeader}>Term: {loan.term}</Text>
        </View>
      </View>
      <View style={styles.listItemActions}>
        <Pressable style={styles.button} onPress={() => {setCurrentLoan(loan);setCompareModalVisible(true)}}>
          <MaterialIcons style={styles.icons} size={15} name='compare'/>
        </Pressable>
        <Pressable style={styles.button} onPress={() => loanContext.deleteLoan(loan.id)}>
          <Ionicons style={styles.icons} name='close'/>
        </Pressable>
      </View>
    </View>
  ))

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {savedLoanListItems}
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
                <Pressable style={styles.button} onPress={() => {if(currentLoan)loanContext.setLeftCompare(currentLoan);setCompareModalVisible(false)}}>
                  <Text style={styles.buttonText}>Left</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {if(currentLoan)loanContext.setRightCompare(currentLoan);setCompareModalVisible(false)}}>
                  <Text style={styles.buttonText}>Right</Text>
                </Pressable>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loanListItem: {
    backgroundColor: '#FFF',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    width: 375,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  subHeaders: {
    display: 'flex',
    flexDirection: 'row',
  },
  subHeader: {
    margin: 2
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
  listItemActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: 75,
    margin: 'auto',
  },
  icons: {
    color: '#fff',
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