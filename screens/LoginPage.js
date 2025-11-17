import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { loginUser } from "../KyzaAPI";
import ScreenContainer from "../components/ScreenContainer";

export default function LoginPage({ navigation, setUserRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await loginUser(username, password);
    if (res.success) {
      setUserRole(res.role); // ✅ this alone triggers navigation change
    } else {
      Alert.alert("Login Failed", "Invalid username or password");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Could not connect to server");
  }
};


  return (
    <ScreenContainer>
    <View style={styles.container}>
      <Text style={styles.title}>Kyza Bahulu Asli</Text>
      <Text style={styles.title}>Stock Inventory System</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
    </ScreenContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbe0fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
