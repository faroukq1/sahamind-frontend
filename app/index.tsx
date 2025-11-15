import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#2563eb", "#1d4ed8"]} style={styles.container}>
      <View style={styles.notch} />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/sahamind.png")}
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notch: {
    position: "absolute",
    top: 0,
    width: 150,
    height: 30,
    backgroundColor: "#000",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    alignItems: "center",
  },
  logo: {
    fontSize: 56,
    fontWeight: "300",
    color: "#fff",
    letterSpacing: 1,
  },
  logoStyle: {
    height: 200,
    width: 200,
  },
});
