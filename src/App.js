import "./App.css";
import "./App.scss";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Cart } from "./components/Cart_Modal/Cart";
import { Rutas } from "./routes/Rutas";
import { ContextoCarritoProvider } from "./contexts/ContextoCarrito";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseconfig";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <UserAuthContextProvider value={{currentUser, timeActive, setTimeActive}}>
      <ContextoCarritoProvider>
        <>
          <div className="container-app d-flex flex-column min-vh-100">
            <Toaster position="bottom-right" reverseOrder={false} />
            <NavBar />
            <Cart />
            <Rutas />
            <Footer />
          </div>
        </>
      </ContextoCarritoProvider>
    </UserAuthContextProvider>
  );
}

export default App;
