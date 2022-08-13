import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import useCurrentUser from "../../hooks/useCurrentUser";
import AuthPrompt from "../../components/AuthPrompt";
import { db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const HomePage = () => {
  const currentUser = useCurrentUser();
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "ideas"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ideas = [];
      querySnapshot.forEach((doc) => {
        ideas.push({ ...doc.data(), id: doc.id });
      });
      setData(ideas);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!currentUser && (
          <AuthPrompt text={"Login to see Personalised content"} />
        )}
        {data?.map((idea, i) => (
          <IonCard key={i} href={`/idea/${idea?.id}`}>
            <IonCardHeader>
              <IonCardSubtitle>{idea?.authorName}</IonCardSubtitle>
              <IonCardTitle>{idea?.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{idea?.description}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
