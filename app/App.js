import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import "./ignoreWarning";
import AppNav from "./src/navigation/AppNav";
require("moment/locale/vi");


export default function App() {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
}
