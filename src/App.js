import "./App.css";
import './App.scss';
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Cart } from './components/Cart_Modal/Cart';
import { Rutas } from "./routes/Rutas";
import { ContextoCarritoProvider } from "./contexts/ContextoCarrito";
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <ContextoCarritoProvider>
      <>
        <div className="container-app d-flex flex-column min-vh-100">
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
          <NavBar />
          <Cart />
          <Rutas />
          <Footer />
        </div>
      </>
    </ContextoCarritoProvider>
  );
}

export default App;
