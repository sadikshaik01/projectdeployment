import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NewsBoard from "./Components/NewsBoard";
import LoginPage from "./Components/LoginPage";
import SigninPage from "./Components/SigninPage";

const App = () => {
  const [category, setCategory] = useState("general");
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Toggle between Login and SignUp

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <Navbar setCategory={setCategory} setModalOpen={setModalOpen} />
      <NewsBoard category={category} />
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={closeModal}>×</button>
            {showLogin ? (
              <LoginPage
                switchToSignup={() => setShowLogin(false)}
              />
            ) : (
              <SigninPage
                switchToLogin={() => setShowLogin(true)}
              />
            )}
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
