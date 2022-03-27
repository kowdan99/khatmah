import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import QuestionScreen from './screens/QuestionScreen';
import LogScreen from './screens/LogScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{
          title: 'May Allah swt accept your deeds ✨',
          headerStyle: {
            backgroundColor: '#E5E5E5',
          },
          headerTintColor: '#6667AB',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
        }} name="Questions" component={QuestionScreen} />
        <Stack.Screen options={{headerShown:false}} name="Log" component={LogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


