import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from "@ionic/react";

import { calendar, personCircle, map, informationCircle } from "ionicons/icons";
import Home from "./pages/Home";
import Create from "./pages/Create";
import IdeaPage from "./pages/IdeaPage";

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

setupIonicReact();

const App: React.FC = () => {
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
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={calendar} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="search" href="/profile">
              <IonIcon icon={personCircle} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>

            <IonTabButton tab="create" href="/create">
              <IonIcon icon={map} />
              <IonLabel>Create</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/home">
              <IonIcon icon={informationCircle} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>

            <IonTabButton tab="chat" href="/home">
              <IonIcon icon={informationCircle} />
              <IonLabel>Chat</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
