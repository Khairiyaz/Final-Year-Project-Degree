import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { getProducts } from "../KyzaAPI";
import ScreenContainer from "../components/ScreenContainer";

export default function CashierView({ navigation, setUserRole }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityInput, setQuantityInput] = useState("1");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (res.success) setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // === Add to cart with quantity modal ===
  const addToCart = (product) => {
    setSelectedProduct(product);
    setQuantityInput("1");
    setModalVisible(true);
  };

  const confirmAddToCart = () => {
  const qty = parseInt(quantityInput) || 1;
  if (qty <= 0) {
    Alert.alert("Invalid quantity", "Please enter a number greater than 0.");
    return;
  }

  setCart((prevCart) => {
    const existing = prevCart.find(
      (item) => item.ProductID === selectedProduct.ProductID
    );

    if (existing) {
      // 🧩 If we are editing (product already exists in cart)
      return prevCart.map((item) =>
        item.ProductID === selectedProduct.ProductID
          ? {
              ...item,
              quantity: qty, // ✅ Replace quantity, don’t add
              total: qty * item.Price,
            }
          : item
      );
    } else {
      // 🆕 If adding new product
      return [
        ...prevCart,
        {
          ...selectedProduct,
          quantity: qty,
          total: qty * selectedProduct.Price,
        },
      ];
    }
  });

  setModalVisible(false);
};


  // === Handle cart item tap ===
  const handleCartItemPress = (item) => {
    Alert.alert(
      item.ProductName,
      `Quantity: ${item.quantity}\nPrice: RM${item.Price}`,
      [
        {
          text: "Edit Quantity",
          onPress: () => {
            setSelectedProduct(item);
            setQuantityInput(item.quantity.toString());
            setModalVisible(true);
          },
        },
        {
          text: "Delete Item",
          style: "destructive",
          onPress: () => {
            setCart((prevCart) =>
              prevCart.filter((cartItem) => cartItem.ProductID !== item.ProductID)
            );
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.Price) * item.quantity,
    0
  );

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kyza Bahulu Store</Text>
        <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => setUserRole(null)} // ✅ Logout
                  >
                    <Text style={styles.logoutText}>Logout</Text>
                  </TouchableOpacity>

      </View>

      <View style={styles.container}>
        {/* Left Panel - Cart */}
        <View style={styles.leftPanel}>
          <ScrollView style={{ flex: 1 }}>
            {cart.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cartItem}
                onPress={() => handleCartItemPress(item)}
              >
                <Text>{item.ProductName}</Text>
                <Text>x{item.quantity}</Text>
                <Text>RM{(item.Price * item.quantity).toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.totalBox}>
            <Text style={{ fontWeight: "bold" }}>Total</Text>
            <Text>RM{total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate("PaymentView", { totalAmount: total, cart })
            }
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Checkout</Text>
          </TouchableOpacity>
        </View>

        {/* Right Panel - Products */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.ProductID.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => addToCart(item)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {item.ProductName}
              </Text>
              <Text style={{ color: "white" }}>RM{item.Price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Quantity Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {selectedProduct ? selectedProduct.ProductName : ""}
            </Text>
            <Text style={{ marginBottom: 5 }}>Enter Quantity:</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={quantityInput}
              onChangeText={setQuantityInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#E53935" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#4CAF50" }]}
                onPress={confirmAddToCart}
              >
                <Text style={{ color: "#fff" }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1A73E8",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#E53935",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  container: { flex: 1, flexDirection: "row", backgroundColor: "#B7D3F2" },
  leftPanel: { width: "30%", backgroundColor: "#E6E6E6", padding: 10 },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#C4C4C4",
    marginBottom: 5,
    padding: 10,
    borderRadius: 6,
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#B3B3B3",
    marginTop: 5,
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 6,
  },
  grid: { flexGrow: 1, justifyContent: "center", padding: 10 },
  productCard: {
    backgroundColor: "#333",
    flex: 1,
    margin: 10,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 280,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});
