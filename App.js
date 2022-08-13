import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Play from "./src/play";
export default function App() {
  return (
    <SafeAreaProvider>
      <Play />
      <StatusBar />
    </SafeAreaProvider>
  );
}
