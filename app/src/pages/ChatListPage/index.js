import {
  IonPage,
  IonContent,
  IonHeader,
  IonList,
  IonSpinner,
  IonItem,
  IonAvatar,
  IonLabel,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { db } from "../../firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";

const ChatListPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();
  const uid = localStorage.getItem("currentUser");

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "channels"),
      where(`participantIds.${uid}`, "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const channels = [];
      querySnapshot.forEach((doc) => {
        channels.push({ ...doc.data(), id: doc.id });
      });
      setChannels(channels);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(channels);
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: "10px" }}>
          {loading ? (
            <IonSpinner />
          ) : (
            <IonList>
              {channels?.map((c, i) => (
                <IonItem
                  key={i}
                  button
                  href={`/chat/channel/${Object.keys(c?.participantIds).find(
                    (p) => p != uid
                  )}`}
                >
                  <IonAvatar slot="start">
                    <img
                      src={
                        c?.participants?.[
                          Object.keys(c?.participantIds).find((p) => p != uid)
                        ]?.photoUrl
                      }
                    ></img>
                  </IonAvatar>
                  <IonLabel>
                    {
                      c?.participants?.[
                        Object.keys(c?.participantIds).find((p) => p != uid)
                      ]?.name
                    }
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChatListPage;
