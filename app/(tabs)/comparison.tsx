import LoanContext from "@/context/LoanContext";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function Comparison() {
  const loanContext = useContext(LoanContext)
  
  return (
    <View
      style={styles.sideBySide}
    >
      <View style={[styles.compareSlot, styles.leftCompare]}>
        <Text style={styles.header}>{loanContext.compareSlots.left?.name}</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 100
          }}
        />
        <Text style={styles.subHeader}>Terms</Text>
        <View style={styles.termsView}>
          <View>
            <Text style={styles.label}>Principal</Text>
            <Text style={styles.label}>Rate</Text>
            <Text style={styles.label}>Term</Text>
          </View>
          <View>
            <Text>{loanContext.compareSlots.left?.principal}</Text>
            <Text>{loanContext.compareSlots.left?.rate}</Text>
            <Text>{loanContext.compareSlots.left?.term}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 100
          }}
        />
        <Text style={styles.subHeader}>Details</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 100
          }}
        />
        <View style={styles.termsView}>
          <View>
            <Text style={styles.label}>Payoff Date</Text>
            <Text style={styles.label}>Monthly Pymt</Text>
            <Text style={styles.label}>Total Interest</Text>
            <Text style={styles.label}>Total Cost</Text>
          </View>
          <View>
            <Text>{new Date(loanContext.compareSlots.left?.payoffDate ?? '').toLocaleDateString()}</Text>
            <Text>${loanContext.compareSlots.left?.monthlyPayment}</Text>
            <Text>{(Number.parseFloat(loanContext.compareSlots.left?.totalCost ?? '')-loanContext.compareSlots.left?.principal).toFixed(2)}</Text>
            <Text>${loanContext.compareSlots.left?.totalCost}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.compareSlot, styles.rightCompare]}>
        <Text style={styles.header}>{loanContext.compareSlots.right?.name}</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 100
          }}
        />
        <Text style={styles.subHeader}>Terms</Text>
        <View style={styles.termsView}>
          <View>
            <Text style={styles.label}>Principal</Text>
            <Text style={styles.label}>Rate</Text>
            <Text style={styles.label}>Term</Text>
          </View>
          <View>
            <Text>{loanContext.compareSlots.right?.principal}</Text>
            <Text>{loanContext.compareSlots.right?.rate}</Text>
            <Text>{loanContext.compareSlots.right?.term}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 100
          }}
        />
        <Text style={styles.subHeader}>Details</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 100
          }}
        />
        <View style={styles.termsView}>
          <View>
            <Text style={styles.label}>Payoff Date</Text>
            <Text style={styles.label}>Monthly Pymt</Text>
            <Text style={styles.label}>Total Interest</Text>
            <Text style={styles.label}>Total Cost</Text>
          </View>
          <View>
            <Text>{new Date(loanContext.compareSlots.right?.payoffDate ?? '').toLocaleDateString()}</Text>
            <Text>${loanContext.compareSlots.right?.monthlyPayment}</Text>
            <Text>{(Number.parseFloat(loanContext.compareSlots.right?.totalCost ?? '')-loanContext.compareSlots.right?.principal).toFixed(2)}</Text>
            <Text>${loanContext.compareSlots.right?.totalCost}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideBySide: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  compareSlot: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftCompare: {
    borderRightWidth: 1,
    borderColor: '#999'
  },
  rightCompare: {
    borderLeftWidth: 1,
    borderColor: '#999'
  },
  header: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subHeader: {
    fontSize:20,
    margin: 5,
    fontWeight: 'bold'
  },
  termsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 5
  }
})