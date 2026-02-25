import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { calculateFare, FareResult } from "../utils/fareCalculator";

export default function CalculatorScreen() {
  const [distance, setDistance] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [result, setResult] = useState<FareResult | null>(null);

  // Handle Calculate button press
  const handleCalculate = () => {
    const distanceNum = parseFloat(distance) || 0;
    const waitTimeNum = parseFloat(waitTime) || 0;

    if (distanceNum < 0 || waitTimeNum < 0) {
      alert("กรุณากรอกตัวเลขที่ถูกต้อง");
      return;
    }

    const fareResult = calculateFare(distanceNum, waitTimeNum);
    setResult(fareResult);
  };

  // Handle Clear button press
  const handleClear = () => {
    setDistance("");
    setWaitTime("");
    setResult(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="car-sport" size={120} color="#FFD700" />
          <Text style={styles.headerTitle}>คำนวณค่าแท็กซี่</Text>
        </View>

        {/* Input Card - White rounded card */}
        <View style={styles.inputCard}>
          {/* Distance Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>ระยะทาง (กิโลเมตร)</Text>
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
              placeholder="0.0"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>

          {/* Wait Time Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>เวลารถติด (นาที)</Text>
            <TextInput
              style={styles.input}
              value={waitTime}
              onChangeText={setWaitTime}
              placeholder="0"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              returnKeyType="done"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.calculateButton]}
              onPress={handleCalculate}
            >
              <Text style={styles.calculateButtonText}>คำนวณราคา</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>ล้างค่า</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Result Card - Dark grey/blue background */}
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.totalFare}>
              {result.totalFare.toFixed(2)} บาท
            </Text>

            <View style={styles.breakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>ค่าโดยสารตามระยะทาง</Text>
                <Text style={styles.breakdownValue}>
                  {(result.baseFare + result.distanceCharge).toFixed(2)} ฿
                </Text>
              </View>

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>
                  ค่ารถติด ({waitTime} นาที)
                </Text>
                <Text style={styles.breakdownValue}>
                  {result.timeCharge.toFixed(2)} ฿
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ID and Name at Bottom */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>ID: 6652410031</Text>
          <Text style={styles.footerText}>Name: Napat Bunyarit</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light grey background
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFA500", // Orange/yellow
    marginTop: 10,
  },
  inputCard: {
    backgroundColor: "#FFFFFF", // White
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  calculateButton: {
    backgroundColor: "#4CAF50", // Green
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#f44336", // Red border
    marginTop: 10,
  },
  clearButtonText: {
    color: "#f44336",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#2D333F", // Dark grey/blue background
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
  },
  totalFare: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFD700", // Yellow
    marginBottom: 20,
  },
  breakdown: {
    width: "100%",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  breakdownValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    marginVertical: 2,
  },
});
