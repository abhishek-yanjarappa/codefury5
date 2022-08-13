import { IonText, IonButton } from "@ionic/react";
import { FirebaseAuthentication as FireAuth } from "@capacitor-firebase/authentication";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthPrompt = ({ text }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await FireAuth.signInWithGoogle();
      localStorage.setItem("currentUser", result?.user?.uid);
      const userRef = doc(db, "users", result?.user?.uid);
      await setDoc(userRef, result?.user, { merge: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <IonText style={{ color: "#888" }}>{text}</IonText>
      <IonButton
        style={{ textDecoration: "none" }}
        onClick={signInWithGoogle}
        fill="outline"
      >
        Login
      </IonButton>
    </div>
  );
};

export default AuthPrompt;
