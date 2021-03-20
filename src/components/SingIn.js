import React from "react";

function SingIn({ auth, firebase }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider(); // Create a new provider for the google Sign In
    auth.signInWithPopup(provider); // Calls the Popup for Sign In
  };

  return (
    <>
      <button className="signIn" onClick={signInWithGoogle}>
        <i style={{ color: "#fffff" }} class="bi bi-google"></i> Google
      </button>
    </>
  );
}

export default SingIn;
