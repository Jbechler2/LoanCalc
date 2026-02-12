import LoanContext from "@/context/LoanContext";
import { useContext } from "react";
import { Text, View } from "react-native";


export default function Comparison() {
  const loanContext = useContext(LoanContext)
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{loanContext.compareSlots.left?.name}</Text>
      <Text>{loanContext.compareSlots.right?.name}</Text>
    </View>
  );
}
