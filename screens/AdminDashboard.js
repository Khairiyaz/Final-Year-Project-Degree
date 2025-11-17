// screens/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getProducts, getSalesSummary } from "../KyzaAPI";
import ScreenContainer from "../components/ScreenContainer";

export default function AdminDashboard({ navigation, setUserRole }) {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);


  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  try {
    const [productRes, salesRes] = await Promise.all([getProducts(), getSalesSummary()]);

    if (productRes.success) {
      setTotalProducts(productRes.data.length);
    }

    if (salesRes.success) {
      setTotalSales(salesRes.total_sales);
      setDailySales(salesRes.daily_sales);
      setMonthlySales(salesRes.monthly_sales);
    } else {
      console.warn("Failed to load sales summary:", salesRes.error || salesRes.message);
    }
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
  }
};


  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stock Inventory System</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setUserRole(null)} // ✅ Logout
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <ScrollView>
              {/* Navigation Menu */}
              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => console.log("Dashboard pressed")}
              >
                <Text style={styles.sidebarText}>Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => navigation.navigate("AdminAddStock")} // ✅ Navigate to AdminAddStock screen
              >
                <Text style={styles.sidebarText}>Add Product</Text>
              </TouchableOpacity>

              {/* ✅ Navigate to AdminViewStock screen */}
              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => navigation.navigate("AdminViewStock")}
              >
                <Text style={styles.sidebarText}>View Stock</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => navigation.navigate("AdminTransaction")} // ✅ Navigate to AdminTransaction screen
              >
                <Text style={styles.sidebarText}>Transaction</Text>
              </TouchableOpacity>

              {/*<TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => console.log("Report pressed")}
              >
                <Text style={styles.sidebarText}>Report</Text>
              </TouchableOpacity>*/}

              {/* Register User Button */}
              <TouchableOpacity
                style={[styles.sidebarButton, { backgroundColor: "#4CAF50" }]}
                onPress={() => navigation.navigate("RegisterPage")}
              >
                <Text style={styles.sidebarText}>Register User</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Dashboard Cards */}
          <View style={styles.mainArea}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total Products</Text>
              <Text style={styles.cardValue}>{totalProducts}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Daily Sales</Text>
              <Text style={styles.cardValue}>RM{dailySales.toFixed(2)}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Monthly Sales</Text>
              <Text style={styles.cardValue}>RM{monthlySales.toFixed(2)}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total Sales</Text>
              <Text style={styles.cardValue}>RM{totalSales.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#B7D3F2" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#E6E6E6",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  logoutButton: {
    backgroundColor: "#FF7B7B",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  logoutText: { color: "white", fontWeight: "bold" },
  content: { flexDirection: "row", flex: 1 },
  sidebar: { width: "25%", padding: 10 },
  sidebarButton: {
    backgroundColor: "#89ABE3",
    padding: 15,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 3,
  },
  sidebarText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  mainArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainArea: {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  alignItems: "center",
  padding: 20,
  },
  card: {
    backgroundColor: "#E6E6E6",
    padding: 30,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
    marginVertical: 10,
  },
  cardTitle: { fontSize: 16 },
  cardValue: { fontSize: 32, fontWeight: "bold", marginTop: 10 },
});
