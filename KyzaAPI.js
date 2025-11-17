import axios from "axios";

const API_URL = "http://192.168.100.17/KyzaStoreAPI/"; // change to your actual IP/path

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}getProducts.php`);
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_URL}loginUser.php`, { username, password });
  return res.data;
};

export const addTransaction = async (transactionData) => {
  const res = await axios.post(`${API_URL}addTransaction.php`, transactionData);
  return res.data;
};

export const registerUser = async (username, password, role = "Cashier") => {
  const res = await axios.post(`${API_URL}registerUser.php`, {
    username,
    password,
    role,
  });
  return res.data;
};

/* ✅ New function for adding stock */
export const addStock = async (productData) => {
  try {
    const res = await axios.post(`${API_URL}addProduct.php`, productData);
    return res.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    return { success: false, message: "Network or server error" };
  }
};

// Update Product
export const updateProduct = async (ProductID, updateProduct) => {
  const res = await axios.put(`${API_URL}updateProduct.php?ProductID=${ProductID}`, updateProduct);
  return res.data;
};

// Delete Product (use POST instead of DELETE for PHP compatibility)
export const deleteProduct = async (ProductID) => {
  const res = await axios.post(`${API_URL}deleteProduct.php`, { ProductID });
  return res.data;
};

export const getTransactions = async () => {
  const res = await axios.get(`${API_URL}getTransactions.php`);
  return res.data;
};

export const createCheckoutSession = async (amount, cart) => {
  const formData = new FormData();
  formData.append("amount", amount);
  formData.append("cart", JSON.stringify(cart)); // ✅ send cart as string

  try {
    const res = await fetch("http://192.168.100.17/KyzaStoreAPI/createPaymentIntent.php", { // change to your actual IP/path
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Payment error:", error);
    return { success: false, error: "Network error" };
  }
};

export const getSalesSummary = async () => {
  try {
    const res = await fetch("http://192.168.100.17/KyzaStoreAPI/getSalesSummary.php"); // change to your actual IP/path
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching sales summary:", error);
    return { success: false, error };
  }
};



