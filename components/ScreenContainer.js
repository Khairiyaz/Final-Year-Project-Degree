// components/ScreenContainer.js
import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

export default function ScreenContainer({ children }) {
  const { landscape } = useDeviceOrientation(); // ✅ Detect orientation

  return (
    <View
      style={[
        styles.root,
        landscape ? styles.landscapeRoot : styles.portraitRoot,
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#cbe0fa" />
      <View
        style={[
          styles.innerContainer,
          {
            height: landscape ? "50%" : "100%", // ✅ Height adjustment
            width: landscape ? "85%" : "95%",   // ✅ Width adjustment
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#cbe0fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    maxWidth: 900,
    minHeight: 300,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: "center",
  },
  portraitRoot: {
    flexDirection: "column",
  },
  landscapeRoot: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
