import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import { createCheckoutSession } from "../KyzaAPI";

export default function PaymentView({ navigation }) {
  const route = useRoute();
  const { totalAmount, cart } = route.params || { totalAmount: 0, cart: [] };
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  useEffect(() => {
  createCheckoutSessionHandler();
}, []);

const createCheckoutSessionHandler = async () => {
  try {
    const json = await createCheckoutSession(totalAmount, cart); // 🆕 send cart
    console.log("Stripe Checkout:", json);
    console.log("Sending cart data:", cart);


    if (json.success && json.checkout_url) {
      setCheckoutUrl(json.checkout_url);
    } else {
      Alert.alert("Error", json.error || "Unable to start payment session");
    }
  } catch (error) {
    Alert.alert("Error", "Network or server issue.");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      <Text style={styles.amountText}>Total: RM {totalAmount}</Text>

      {checkoutUrl ? (
        <View style={styles.qrContainer}>
          <QRCode value={checkoutUrl} size={200} />
          <Text style={styles.instructionText}>Scan this QR to pay via Stripe</Text>
        </View>
      ) : (
        <Text>Generating payment link...</Text>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("CashierView")}
      >
        <Text style={styles.backText}>Back to Cashier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E6E6E6" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  amountText: { fontSize: 18, marginBottom: 20 },
  qrContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  instructionText: { marginTop: 10, fontSize: 14, color: "gray" },
  backButton: { marginTop: 30, backgroundColor: "#89ABE3", padding: 10, borderRadius: 8 },
  backText: { color: "#fff", fontWeight: "bold" },
});
