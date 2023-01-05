import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { TableData } from "./data/TableData";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TableData></TableData>
      </div>
    </QueryClientProvider>
  );
}

export default App;
