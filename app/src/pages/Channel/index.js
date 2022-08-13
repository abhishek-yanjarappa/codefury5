import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonInput,
  IonTextarea,
  IonButton,
  IonItem,
  IonLabel,
  IonChip,
  IonText,
  IonCard,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDoc,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const Channel = () => {
  const { id } = useParams();
  const uid = localStorage.getItem("currentUser");
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "channels"),
      where(`participantIds.${id}`, "==", true),
      where(`participantIds.${uid}`, "==", true)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      console.log("snapshot triggered", data);

      if (querySnapshot.empty) {
        console.log("snapshot is empty");
        const otherUser = (await getDoc(doc(db, "users", `${id}`))).data();
        console.log("other user", otherUser);
        await addDoc(collection(db, "channels"), {
          participantIds: {
            [uid]: true,
            [id]: true,
          },
          participants: {
            [uid]: {
              photoUrl: `${currentUser?.user?.photoUrl}`,
              name: `${currentUser?.user?.displayName}`,
            },
            [id]: {
              photoUrl: `${otherUser?.photoUrl}`,
              name: `${otherUser?.user?.displayName}`,
            },
          },
          messages: [
            {
              text: "start",
            },
          ],
        });
      } else {
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            setData({ ...doc?.data(), id: doc.id });
          }
          setLoading(false);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSendMessage = async () => {
    const channelRef = doc(db, "channels", `${data?.id}`);
    await setDoc(
      channelRef,
      {
        messages: [
          ...data?.messages,
          {
            text: `${message}`,
            authorId: `${uid}`,
            authorName: `${currentUser?.user?.displayName}`,
            photoUrl: `${currentUser?.user?.photoUrl}`,
          },
        ],
      },
      { merge: true }
    );
    setMessage("");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Message</IonTitle>
          </IonToolbar>
        </IonHeader>
        {data?.messages?.map((m, i) => (
          <IonCard key={i} style={{ margin: "10px" }}>
            {m?.authorName && (
              <IonChip style={{ margin: "10px" }}>{m?.authorName}</IonChip>
            )}
            <br />
            <p style={{ margin: "20px" }}>{m?.text}</p>
            <br />
          </IonCard>
        ))}
        <IonFooter style={{ padding: "20px" }}>
          <IonInput
            value={message}
            placeholder="Enter Message"
            onIonChange={(e) => setMessage(e.detail.value)}
            clearInput
          ></IonInput>
          <br />
          <IonButton fill="outline" onClick={handleSendMessage}>
            Send
          </IonButton>
        </IonFooter>
        <IonContent style={{ padding: "" }}></IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Channel;
