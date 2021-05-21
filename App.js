import * as React from "react";
//Navigation Imports
import AppNavigator from "./src/navigations";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/navigations/RootNavigation";
//Theme Imports
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { COLORS } from "./src/constants/theme";
//Redux Import
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "./src/components/inc/NoInternet";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
  },
};

const App = () => {
  const netInfo = useNetInfo();

  if (!netInfo) {
    return null;
  }

  if (!(netInfo.isConnected && netInfo.isInternetReachable)) {
    return <NoInternet />;
  }

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};
export default App;
