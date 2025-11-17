// screens/AdminViewStock.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getProducts } from "../KyzaAPI";
import ScreenContainer from "../components/ScreenContainer";

export default function AdminViewStock({ navigation, setUserRole }) {
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
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
            onPress={() => setUserRole(null)}
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
                        onPress={() => navigation.navigate("AdminDashboard")}
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
                      </TouchableOpacity>
        
                      {/* Register User Button 
                      <TouchableOpacity
                        style={[styles.sidebarButton, { backgroundColor: "#4CAF50" }]}
                        onPress={() => navigation.navigate("RegisterPage")}
                      >
                        <Text style={styles.sidebarText}>Register User</Text>
                      </TouchableOpacity>*/}
                    </ScrollView>
                  </View>

          {/* Main Area (Table) */}
          <View style={styles.mainArea}>
            <Text style={styles.sectionTitle}>View Stock</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell]}>P.ID</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 3 }]}>
                Product Name
              </Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Qty</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Price</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Action</Text>
            </View>

            {/* Scrollable Table Body */}
            <ScrollView style={styles.tableBody}>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      { backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#E6E6E6" },
                    ]}
                  >
                    <Text style={styles.tableCell}>{item.ProductID}</Text>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {item.ProductName}
                    </Text>
                    <Text style={styles.tableCell}>{item.Quantity}</Text>
                    <Text style={styles.tableCell}>RM{item.Price}</Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate("EditProduct", { product: item })}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noData}>No products found.</Text>
              )}
            </ScrollView>
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
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#C5C5C5",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableBody: {
    maxHeight: 400,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  headerCell: {
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  editButtonText: { color: "#fff", fontWeight: "bold" },
  noData: {
    textAlign: "center",
    marginVertical: 20,
    fontStyle: "italic",
  },
});
