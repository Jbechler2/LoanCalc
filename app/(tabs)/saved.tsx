import LoanContext from "@/context/LoanContext";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const loanContext = useContext(LoanContext)
  let savedLoanListItems = []

  savedLoanListItems = loanContext.savedLoans.map(loan => (
    <View key={loan.id}>
      <Text>{loan.name}</Text>
      <Text>{loan.id}</Text>
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
