import { Dashboard } from "@/components/Dashboard";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return <Dashboard />;
};
export default App;
