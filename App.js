// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";

import LoginPage from "./screens/LoginPage";
import AdminDashboard from "./screens/AdminDashboard";
import CashierView from "./screens/CashierView";
import RegisterPage from "./screens/RegisterPage";
import AdminViewStock from "./screens/AdminViewStock";
import AdminAddStock from "./screens/AdminAddStock";
import EditProduct from "./screens/EditProduct";
import AdminTransaction from "./screens/AdminTransaction";
import PaymentView from "./screens/PaymentView";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <StripeProvider publishableKey="pk_test_51SJBrQROZUWZmITXd8fj2agcGJ5VHOOeiqYA8Aj4HwPjZxceZHQg1YVg7VJoHbEbgx2H35bbE8TaUUCHafU811ij00TIcPoDz2">
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userRole ? (
            <Stack.Screen name="LoginPage">
              {(props) => <LoginPage {...props} setUserRole={setUserRole} />}
            </Stack.Screen>
          ) : userRole === "Admin" ? (
            <>
              <Stack.Screen name="AdminDashboard">
                {(props) => (
                  <AdminDashboard {...props} setUserRole={setUserRole} />
                )}
              </Stack.Screen>

              <Stack.Screen name="AdminViewStock">
                {(props) => (
                  <AdminViewStock {...props} setUserRole={setUserRole} />
                )}
              </Stack.Screen>

              <Stack.Screen name="AdminTransaction">
                {(props) => (
                  <AdminTransaction {...props} setUserRole={setUserRole} />
                )}
              </Stack.Screen>

              <Stack.Screen name="AdminAddStock" component={AdminAddStock} />
              <Stack.Screen name="EditProduct" component={EditProduct} />
              <Stack.Screen name="RegisterPage" component={RegisterPage} />
            </>
          ) : (
            <>
              <Stack.Screen name="CashierView">
                {(props) => <CashierView {...props} setUserRole={setUserRole} />}
              </Stack.Screen>
              <Stack.Screen name="PaymentView" component={PaymentView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
