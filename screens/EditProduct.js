import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { updateProduct, deleteProduct } from "../KyzaAPI";

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params; // Get product data from navigation
  const [ProductID, setProductID] = useState(product.ProductID.toString());
  const [productName, setProductName] = useState(product.ProductName);
  const [quantity, setQuantity] = useState(product.Quantity.toString());
  const [price, setPrice] = useState(product.Price.toString());

  const handleUpdate = async () => {
    if (!productName || !quantity || !price) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const updatedData = {
        ProductID: ProductID,
        ProductName: productName,
        Quantity: parseInt(quantity),
        Price: parseFloat(price),
    };

    try {
      const result = await updateProduct(product.ProductID, updatedData);
      if (result.success) {
        Alert.alert("Success", "Product updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Failed to update product.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deleteProduct(product.ProductID);
              if (result.success) {
                Alert.alert("Deleted", "Product has been deleted.");
                navigation.goBack();
              } else {
                Alert.alert("Error", result.message || "Failed to delete product.");
              }
            } catch (error) {
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product ID</Text>
        <TextInput
          style={styles.input}
          value={ProductID}
          onChangeText={setProductID}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Price (RM)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
              style={{
                  marginTop: 15,
                  backgroundColor: "#89ABE3",
                  padding: 10,
                  borderRadius: 5,
              }}
              onPress={() => navigation.navigate("AdminViewStock")}
              >
              <Text style={{ color: "white", textAlign: "center" }}>Back to Dashboard</Text>
              </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
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
  updateButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditProduct;
