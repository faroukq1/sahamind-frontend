import { usePsychiatristsList } from "@/api/psychiatristsList";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Psychiatrist {
  id: number;
  username: string;
  specialty: string;
  keywords: string[];
}

const MOODS = [
  { emoji: "😔", label: "Sad" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😆", label: "Excited" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HomePage() {
  const { user: userData, clearUser } = useUserStore();
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const { loadPsychiatrists, psychiatrists, error } = usePsychiatristsList();

  useEffect(() => {
    loadPsychiatrists();
  }, []);

  if (!psychiatrists && !error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6B5CE7" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Failed to load psychiatrists</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Purple Header Section */}
        <View style={styles.purpleHeader}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Button
              onPress={() => {
                clearUser();
                router.push("/login");
              }}
            >
              <Text>Log out</Text>
            </Button>
            <TextInput
              style={styles.searchInput}
              placeholder="Search about anything..."
              placeholderTextColor="rgba(255,255,255,0.6)"
            />
          </View>

          {/* Greeting */}
          <Text style={styles.greeting}>
            Good Morning, {userData?.username || "Dhira"} 👋
          </Text>
          <Text style={styles.question}>How are you today?</Text>

          {/* Mood Selector */}
          <View style={styles.moodRow}>
            {MOODS.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === index && styles.moodButtonSelected,
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* White Content Area */}
        <View style={styles.whiteContent}>
          {/* Mood Tracking */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mood Tracking</Text>
              <Text style={styles.viewDetails}>View Details</Text>
            </View>
            <View style={styles.weekMoodContainer}>
              {DAYS.map((day, index) => (
                <View key={index} style={styles.dayMood}>
                  <Text style={styles.dayMoodEmoji}>😊</Text>
                  <Text style={styles.dayLabel}>{day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Start Your Day */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Start Your Day</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>
            <View style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityIconText}>🏠</Text>
                </View>
                <View>
                  <Text style={styles.activityTitle}>
                    Take pleasure in five
                  </Text>
                  <Text style={styles.activityTitle}>deep breaths</Text>
                  <View style={styles.activityMeta}>
                    <Text style={styles.activityType}>Mindful Activity</Text>
                    <Text style={styles.activityDuration}>⏱ 1 min</Text>
                  </View>
                </View>
              </View>
              <View style={styles.activityIconRight}>
                <Text style={styles.breathIcon}>💨</Text>
              </View>
            </View>
          </View>

          {/* Psychiatrists List */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Psychiatrists</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>
            {psychiatrists &&
              psychiatrists.map((psych: Psychiatrist) => (
                <View key={psych.id} style={styles.psychiatristCard}>
                  <View style={styles.psychiatristAvatar}>
                    <Text style={styles.avatarText}>
                      {psych.username.split(" ")[1]?.[0] || "D"}
                    </Text>
                  </View>
                  <View style={styles.psychiatristInfo}>
                    <Text style={styles.psychiatristName}>
                      {psych.username}
                    </Text>
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
                    <Text style={styles.bookButtonText}>Book</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navLabel}>Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navLabel}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Calendar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6B5CE7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  purpleHeader: {
    backgroundColor: "#6B5CE7",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  yellowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFD93D",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },
  greeting: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 12,
  },
  moodButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  moodButtonSelected: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  whiteContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  viewDetails: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  viewAll: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  weekMoodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayMood: {
    alignItems: "center",
  },
  dayMoodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  dayLabel: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 24,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  activityMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  activityType: {
    fontSize: 11,
    color: "#666",
    marginRight: 10,
  },
  activityDuration: {
    fontSize: 11,
    color: "#666",
  },
  activityIconRight: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  breathIcon: {
    fontSize: 24,
  },
  psychiatristCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  psychiatristAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6B5CE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  psychiatristInfo: {
    flex: 1,
  },
  psychiatristName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 3,
  },
  psychiatristSpecialty: {
    fontSize: 12,
    color: "#6B5CE7",
    marginBottom: 6,
    fontWeight: "500",
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  keywordBadge: {
    backgroundColor: "#F0EDFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  keywordText: {
    fontSize: 9,
    color: "#6B5CE7",
    fontWeight: "500",
  },
  bookButton: {
    backgroundColor: "#6B5CE7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "500",
  },
  navLabelActive: {
    color: "#6B5CE7",
    fontWeight: "600",
  },
});
