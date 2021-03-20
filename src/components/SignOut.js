import React from "react";

function SignOut({ auth }) {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()}>
        <i class="bi bi-box-arrow-right"></i>
      </button>
    ) // Sign out using the firebase.auth.signOut() method
  );
}

export default SignOut;
