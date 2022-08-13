import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonButton,
  IonChip,
  IonSpinner,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

const IdeaPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "ideas", id);
      getDoc(docRef).then((doc) => {
        if (doc.exists()) setData(doc.data());
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Idea</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoading ? (
          <IonSpinner />
        ) : (
          <div style={{ padding: "10px" }}>
            <h1>{data?.name}</h1>
            <IonText>
              {"by "}
              {data?.authorName}
            </IonText>
            <br />
            <br />
            <br />
            <IonText>{data?.description}</IonText>
            {Object.keys(data?.lookingFor || {}).map(
              (key, i) =>
                (!!data?.lookingFor?.[key]?.basePrice ||
                  !!data?.lookingFor?.[key]?.description) && (
                  <div key={i}>
                    <h6>{key}</h6>
                    <p>{data?.lookingFor?.[key]?.description}</p>
                    {key === "funds" && (
                      <IonChip color={"success"}>
                        {data?.lookingFor?.[key]?.basePrice}
                      </IonChip>
                    )}
                  </div>
                )
            )}
            <IonButton
              shape="round"
              fill="outline"
              size="large"
              href={`/chat/channel/${data?.authorId}`}
            >
              Start Conversation
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default IdeaPage;
