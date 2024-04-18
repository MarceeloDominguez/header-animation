import { SafeAreaProvider } from "react-native-safe-area-context";
import HeaderAnimation from "./src/screen/HeaderAnimation";

export default function App() {
  return (
    <SafeAreaProvider>
      <HeaderAnimation />
    </SafeAreaProvider>
  );
}
