import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { getTransactions } from "../KyzaAPI"; // ✅ You'll create this endpoint later

export default function AdminTransaction({ navigation, setUserRole }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      if (res.success) {
        setTransactions(res.data);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };



const exportToCSV = async (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    Alert.alert("No Data", "There are no transactions to export.");
    return;
  }

  try {
    // Step 1: CSV header
    const header = ["TransactionID", "UserID", "TransactionDate", "TotalAmount", "Status"];

    // Step 2: Convert transactions to CSV rows
    const rows = transactions.map((t) =>
      [t.TransactionID, t.UserID, t.TransactionDate, t.TotalAmount, t.Status].join(",")
    );

    const csvString = [header.join(","), ...rows].join("\n");

    // Step 3: File name and path
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `transactions_${timestamp}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${filename}`;

    // Step 4: Write CSV file (legacy API is stable)
    await FileSystem.writeAsStringAsync(fileUri, csvString);

    // Step 5: Share or alert user
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert("Export Complete", `File saved to: ${fileUri}`);
    }
  } catch (error) {
    console.error("CSV export error:", error);
    Alert.alert("Error", "Failed to export CSV. Please try again.");
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

        {/* Main Content */}
        <View style={styles.content}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <ScrollView>
              {[
                { name: "Dashboard", route: "AdminDashboard" },
                { name: "Add Stock", route: "AdminAddStock" },
                { name: "View Stock", route: "AdminViewStock" },
                { name: "Transaction", route: "AdminTransaction" },
                
              ].map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.sidebarButton}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <Text style={styles.sidebarText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

    {/* Main Area (Table) */}
    <View style={styles.mainArea}>
    <Text style={styles.sectionTitle}>View Transactions</Text>

    {/* Table Header */}
    <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.headerCell]}>T.ID</Text>
        {/*<Text style={[styles.tableCell, styles.headerCell]}>User ID</Text>*/}
        <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>
        Date
        </Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Total (RM)</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Status</Text>
    </View>

    {/* Scrollable Table Body */}
    <ScrollView style={styles.tableBody}>
        {transactions.length > 0 ? (
        transactions.map((item, index) => (
            <View
            key={index}
            style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? "#F0F0F0" : "#E6E6E6" },
            ]}
            >
            <Text style={styles.tableCell}>{item.TransactionID}</Text>
            {/*<Text style={styles.tableCell}>{item.UserID}</Text>*/}
            <Text style={[styles.tableCell, { flex: 2 }]}>
                {item.TransactionDate}
            </Text>
            <Text style={styles.tableCell}>RM{item.TotalAmount}</Text>
            <Text
                style={[
                styles.tableCell,
                { color: item.Status === "Paid" ? "green" : "red" },
                ]}
            >
                {item.Status}
            </Text>
            </View>
        ))
        ) : (
        <Text style={styles.noData}>No transactions found.</Text>
        )}
    </ScrollView>
    </View>
    </View>
            

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => exportToCSV(transactions)} // ✅ pass the transactions array
                
              >
                <Text style={styles.buttonText}>Export CSV</Text>
              </TouchableOpacity>

              
            {/*<TouchableOpacity style={styles.printButton}>
                <Text style={styles.buttonText}>Print Report</Text>
              </TouchableOpacity> */}

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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  exportButton: {
    backgroundColor: "#C9E6B3",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  printButton: {
    backgroundColor: "#C9E6B3",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
});