import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { CartProvider } from "./Context/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes/>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
