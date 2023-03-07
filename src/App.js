import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Layout } from "./components";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
