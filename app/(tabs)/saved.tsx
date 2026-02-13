import LoanContext from "@/context/LoanContext";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const loanContext = useContext(LoanContext)
  let savedLoanListItems = []

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
        <Pressable style={styles.button}>
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
  }
})