import "./App.css";
import './App.scss';
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Cart } from "./components/Cart/Cart";
import { Rutas } from "./routes/Rutas";
import { ContextoCarritoProvider } from "./contexts/ContextoCarrito";
import { ContextoProvider } from './contexts/Contexto';


function App() {

  return (
    <ContextoProvider>
      <ContextoCarritoProvider>
        <>
          <div className="container-app d-flex flex-column min-vh-100">
            <NavBar />
            <Cart />
            <Rutas />
            <Footer />
          </div>
        </>
      </ContextoCarritoProvider>
    </ContextoProvider>
  );
}

export default App;
