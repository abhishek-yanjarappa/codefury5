import {
  IonContent,
  IonPage,
  IonList,
  IonItemDivider,
  IonItem,
  IonInput,
  IonTitle,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import AuthPrompt from "../../components/AuthPrompt";
import useCurrentUser from "../../hooks/useCurrentUser";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Create = () => {
  const currentUser = useCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lookingFor: {
      funds: { basePrice: 0, description: "" },
      coFounder: { description: "" },
      workforce: { description: "" },
      mentors: { description: "" },
      expertise: { description: "" },
    },
  });

  if (!currentUser?.user?.uid) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Create</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <AuthPrompt text={"Signin to Create"} />
        </IonContent>
      </IonPage>
    );
  }
  const handleFormSubmit = async () => {
    console.log(formData);
    try {
      const docRef = await addDoc(collection(db, "ideas"), {
        ...formData,
        authorName: currentUser?.user?.displayName,
        authorEmail: currentUser?.user?.email,
        authorId: currentUser?.user?.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ padding: "10px" }}>
          <h1>Write about your idea.</h1>
          <IonList>
            <IonItemDivider>Name</IonItemDivider>
            <IonItem>
              <IonInput
                value={formData?.name}
                placeholder="Enter Name"
                onIonChange={(e) =>
                  setFormData({ ...formData, name: e.detail.value })
                }
              ></IonInput>
            </IonItem>

            <IonItemDivider>Description</IonItemDivider>
            <IonItem>
              <IonTextarea
                value={formData.description}
                placeholder="Enter Description"
                onIonChange={(e) =>
                  setFormData({ ...formData, description: e.detail.value })
                }
                clearInput
              ></IonTextarea>
            </IonItem>

            <br />
            <br />
            <IonTitle>What do you seek</IonTitle>
            <br />
            {Object.keys(formData?.lookingFor).map((key, i) => (
              <div key={i}>
                <IonItem key={i}>
                  <IonLabel>{key}</IonLabel>
                  {key === "funds" && (
                    <IonInput
                      value={formData?.lookingFor?.funds?.basePrice}
                      placeholder="Enter Base Amount"
                      type="number"
                      clearInput={false}
                      onIonChange={(e) =>
                        setFormData((prev) => {
                          const next = prev;
                          next.lookingFor[key].basePrice = e.detail.value || 0;
                          return next;
                        })
                      }
                    ></IonInput>
                  )}
                </IonItem>

                <br />
                <IonItem>
                  <IonTextarea
                    value={formData.lookingFor[key].description}
                    placeholder="Enter Description"
                    onIonChange={(e) =>
                      setFormData((prev) => {
                        const next = prev;
                        next.lookingFor[key].description = e.detail.value;
                        return next;
                      })
                    }
                  ></IonTextarea>
                </IonItem>
              </div>
            ))}
          </IonList>
          <IonButton
            shape="round"
            expand="full"
            fill="outline"
            size="large"
            disabled={!formData?.name}
            onClick={handleFormSubmit}
          >
            Submit
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Create;
