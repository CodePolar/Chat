import "./App.css";
import ChatRoom from "./components/ChatRoom";
import SignOut from "./components/SignOut";
import SignIn from "./components/SingIn";
import { firebaseConfig } from "./config/firebase";
// Firebase SDK
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Hooks to work more easier with react/firebase
import { useAuthState } from "react-firebase-hooks/auth";

// Web Application Firebase Config
firebase.initializeApp(firebaseConfig);

// Global Variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <i class="bi bi-chat"></i> Chat App
        </h1>
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? (
          <ChatRoom firestore={firestore} auth={auth} />
        ) : (
          <SignIn auth={auth} firebase={firebase} />
        )}
      </section>
    </div>
  );
}

export default App;
