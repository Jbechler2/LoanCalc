import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Loan Terms',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name='calculator' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name="comparison"
        options={{
          title: 'Compare',
          tabBarIcon: ({ color, size}) => (
            <MaterialIcons name='compare' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name="saved"
        options={{
          title: 'Saved Loans',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name='bookmark' size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}