import { FirebaseAuthentication as fireAuth } from "@capacitor-firebase/authentication";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import AuthPrompt from "../../components/AuthPrompt";
import useCurrentUser from "../../hooks/useCurrentUser";
const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const data = currentUser?.user;
  const handleLogout = async () => {
    await fireAuth.signOut();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!currentUser?.user?.uid ? (
          <AuthPrompt />
        ) : (
          <>
            <IonItem>
              <IonAvatar slot="start">
                <img src={data?.photoUrl}></img>
              </IonAvatar>
              <br></br>
              <IonLabel>{data?.displayName}</IonLabel>
            </IonItem>
            {currentUser?.user?.uid && (
              <IonButton shape="round" fill="outline" onClick={handleLogout}>
                Logout
              </IonButton>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
