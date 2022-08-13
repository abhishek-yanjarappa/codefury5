import { IonText, IonButton } from "@ionic/react";
import { FirebaseAuthentication as FireAuth } from "@capacitor-firebase/authentication";

const AuthPrompt = ({ text }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await FireAuth.signInWithGoogle();
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
