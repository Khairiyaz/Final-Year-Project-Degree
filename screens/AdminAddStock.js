import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from "react-native";
import { addStock } from "../KyzaAPI";

const AdminAddStock = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAddStock = async () => {
    if (!productName || !quantity || !price) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const productData = {
      ProductName: productName,
      Quantity: parseInt(quantity),
      Price: parseFloat(price),
    };

    try {
      const result = await addStock(productData);
      if (result.success) {
        Alert.alert("Success", "Product added successfully!");
        setProductName("");
        setQuantity("");
        setPrice("");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Failed to add product.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
          placeholder="Enter product name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="Enter quantity"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Price (RM)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Enter price"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddStock}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
      
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AdminAddStock;
