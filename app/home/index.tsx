import { usePsychiatristsList } from "@/api/psychiatristsList";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Psychiatrist {
  id: number;
  username: string;
  specialty: string;
  keywords: string[];
}

export default function HomePage() {
  const { user: userData } = useUserStore();

  const { loadPsychiatrists, psychiatrists, error } = usePsychiatristsList();

  useEffect(() => {
    loadPsychiatrists();
  }, []);

  if (!psychiatrists && !error) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ color: "red", fontSize: 16 }}>
            Failed to load psychiatrists
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>{userData?.username}</Text>
          <Text style={styles.subtitle}>Here are our psychiatrists:</Text>
        </View>

        {/* Psychiatrists List */}
        {psychiatrists &&
          psychiatrists.map((psych: Psychiatrist) => (
            <View key={psych.id} style={styles.psychiatristCard}>
              <View style={styles.psychiatristAvatar}>
                <Text style={styles.avatarText}>
                  {psych.username.split(" ")[1]?.[0] || "D"}
                </Text>
              </View>
              <View style={styles.psychiatristInfo}>
                <Text style={styles.psychiatristName}>{psych.username}</Text>
                <Text style={styles.psychiatristSpecialty}>
                  {psych.specialty}
                </Text>
                <View style={styles.keywordsContainer}>
                  {psych.keywords.slice(0, 3).map((keyword, idx) => (
                    <View key={idx} style={styles.keywordBadge}>
                      <Text style={styles.keywordText}>{keyword}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#2196F3",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  moodSection: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 12,
  },
  moodGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  moodButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  moodButtonSelected: {
    borderColor: "#2196F3",
    backgroundColor: "#E3F2FD",
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 9,
    color: "#4A5568",
    fontWeight: "600",
    textAlign: "center",
  },
  suggestionsSection: {
    padding: 20,
  },
  suggestionSubtitle: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 16,
  },
  psychiatristCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  psychiatristAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  psychiatristInfo: {
    alignItems: "center",
  },
  psychiatristName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
    textAlign: "center",
  },
  psychiatristSpecialty: {
    fontSize: 13,
    color: "#2196F3",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
    marginBottom: 12,
  },
  keywordBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  keywordText: {
    fontSize: 10,
    color: "#1976D2",
    fontWeight: "500",
  },
  bookButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#4A5568",
    fontWeight: "600",
  },
});
