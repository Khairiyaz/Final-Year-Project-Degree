// screens/RegisterPage.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { registerUser } from "../KyzaAPI";
import ScreenContainer from "../components/ScreenContainer";

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Cashier"); // Default role

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const res = await registerUser(username, password, role);
      if (res.success) {
        Alert.alert("Success", res.message, [
          { text: "OK", onPress: () => navigation.navigate("AdminDashboard") },
        ]);
      } else {
        Alert.alert("Registration Failed", res.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <ScreenContainer>
    <View style={styles.container}>
      <Text style={styles.title}>Register New User</Text>

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

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "Admin" && styles.activeRole]}
          onPress={() => setRole("Admin")}
        >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "Cashier" && styles.activeRole]}
          onPress={() => setRole("Cashier")}
        >
          <Text style={styles.roleText}>Cashier</Text>
        </TouchableOpacity>
      </View>

      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity
        style={{
            marginTop: 15,
            backgroundColor: "#89ABE3",
            padding: 10,
            borderRadius: 5,
        }}
        onPress={() => navigation.navigate("AdminDashboard")}
        >
        <Text style={{ color: "white", textAlign: "center" }}>Back to Dashboard</Text>
        </TouchableOpacity>
        
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
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
  },
  activeRole: {
    backgroundColor: "#4e73df",
  },
  roleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    marginTop: 15,
  },
});
