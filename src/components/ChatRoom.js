import React, { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ firestore, auth }) {
  const messageRef = firestore.collection("messages");
  const [messages] = useCollectionData(
    messageRef.orderBy("createdAt", "desc").limit(25),
    {
      idField: "id",
    }
  );
  const [value, setValue] = useState("");
  const dummy = useRef();
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messageRef.add({
      text: value,
      createdAt: new Date().getTime(),
      uid,
      photoURL,
      displayName,
    });
    dummy.current.scrollIntoView({ behavior: "smooth" });

    setValue("");
  };
  console.log(messages);

  return (
    <>
      <main>
        {" "}
        <div ref={dummy}></div>
        {messages &&
          messages.map((msg) => (
            <Message key={msg.id} auth={auth} message={msg} />
          ))}
      </main>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">
          <i class="bi bi-arrow-up-right-circle"></i>
        </button>
      </form>
    </>
  );
}

function Message({ message, auth }) {
  const { text, uid, photoURL, displayName } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="" />

      <p>{text}</p>
    </div>
  );
}

export default ChatRoom;
