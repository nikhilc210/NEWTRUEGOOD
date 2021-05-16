// RootNavigation.js

import * as React from "react";
import { CommonActions, DrawerActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// add other navigation functions that you need and export them
export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}
export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}
