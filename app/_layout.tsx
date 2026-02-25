import { Ionicons } from "@expo/vector-icons";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only navigate if navigation is ready
      if (rootNavigationState?.key != null && !hasNavigated.current) {
        hasNavigated.current = true;
        onFinish();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [rootNavigationState, onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.splashCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="car-sport" size={80} color="#1a1a1a" />
        </View>
        <Text style={styles.title}>TAXI METER</Text>
        <Text style={styles.subtitle}>THAI FARE CALCULATOR</Text>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>ID: 6652410031</Text>
        <Text style={styles.footerText}>Name: Napat Bunyarit</Text>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      )}
      <StatusBar style={showSplash ? "dark" : "light"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
  },
  splashCard: {
    backgroundColor: "#FFEB3B",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    width: "80%",
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D333F",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
  },
  spinnerContainer: {
    marginTop: 30,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
  footerText: {
    color: "#2D333F",
    fontSize: 14,
    fontWeight: "bold",
  },
});
