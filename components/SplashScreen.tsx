import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    <LinearGradient
      colors={["#2563eb", "#1d4ed8"]}
      className="flex-1 justify-center items-center"
    >
      {/* Notch */}
      <View className="absolute top-0 w-[150px] h-[30px] bg-black rounded-b-[20px]" />

      {/* Animated Logo */}
      <Animated.View style={{ opacity: fadeAnim }} className="items-center">
        <Image
          source={require("../assets/images/sahamind.png")}
          className="w-52 h-52"
          resizeMode="contain"
        />
      </Animated.View>
    </LinearGradient>
  );
}
