import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import {
  personCircle,
  homeOutline,
  searchOutline,
  addCircleOutline,
  chatboxEllipses,
} from "ionicons/icons";
import Home from "./pages/Home";
import Create from "./pages/Create";
import IdeaPage from "./pages/IdeaPage";
import ChatsListPage from "./pages/ChatListPage";
import ProfilePage from "./pages/Profile";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useState, useEffect } from "react";
import Channel from "./pages/Channel";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const fcm = async () => {
      await FirebaseMessaging.requestPermissions();
      await FirebaseMessaging.getToken();
      await FirebaseMessaging.subscribeToTopic({ topic: "news" });
      await FirebaseMessaging.addListener("notificationReceived", (event) => {
        console.log("notificationReceived", { event });
      });
    };
    console.log(fcm());
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route path="/home">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/idea/:id">
              <IdeaPage />
            </Route>
            <Route exact path="/chat">
              <ChatsListPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/chat/channel/:id">
              <Channel />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="search" href="/search">
              <IonIcon icon={searchOutline} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>

            <IonTabButton tab="create" href="/create">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Create</IonLabel>
            </IonTabButton>

            <IonTabButton tab="chat" href="/chat">
              <IonIcon icon={chatboxEllipses} />
              <IonLabel>Chats</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Profile" href="/profile">
              <IonIcon icon={personCircle} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
