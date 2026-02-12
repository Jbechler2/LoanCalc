import LoanContext from "@/context/LoanContext";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const loanContext = useContext(LoanContext)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(loanContext.savedLoans)}</Text>
    </View>
  );
}
