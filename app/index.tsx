import { useSaveNotificationTokenMutation } from "@/store/api/user/MainApi";
import { registerForPushNotificationsAsync } from "@/store/Notification/usePushNotification";
import { Onboarding } from "@/store/slices/selector/OnBoarding";
import { userdata } from "@/store/slices/selector/user";

import AZ from "@assets/splash/AZ.png";
import HAS from "@assets/splash/HAS.png";
import SplashBackground from "@assets/splash/sweetghar-bg.png";
import SweetGharLogo from "@assets/splash/sweetghar-logo.png";
import ZAR from "@assets/splash/ZAR.png";

import { useAppSelector } from "@src/hooks/useReduxHooks";

import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

import {
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const SPLASH_DURATION = 5200;

const Index = () => {
  const router = useRouter();

  const user = useAppSelector(userdata);
  const isOnboarding = useAppSelector(Onboarding);

  const [saveUserToken] = useSaveNotificationTokenMutation();

  const latestUserId = useRef(user?.id);
  const latestOnboarding = useRef(isOnboarding?.isOnboarding);

  // ============================================================
  // ANIMATION VALUES
  // ============================================================

  const backgroundScale = useSharedValue(1.08);
  const backgroundOpacity = useSharedValue(0);

  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(-80);
  const logoScale = useSharedValue(0.82);

  const zarOpacity = useSharedValue(0);
  const zarTranslateX = useSharedValue(-SCREEN_WIDTH * 0.65);
  const zarRotate = useSharedValue(-8);

  const hasOpacity = useSharedValue(0);
  const hasTranslateY = useSharedValue(220);
  const hasScale = useSharedValue(0.82);

  const azOpacity = useSharedValue(0);
  const azTranslateX = useSharedValue(SCREEN_WIDTH * 0.65);
  const azRotate = useSharedValue(8);

  const charactersScale = useSharedValue(1);

  const glowScale = useSharedValue(0.85);
  const glowOpacity = useSharedValue(0);

  const screenOpacity = useSharedValue(1);

  // ============================================================
  // KEEP LATEST AUTH STATE
  // ============================================================

  useEffect(() => {
    latestUserId.current = user?.id;
  }, [user?.id]);

  useEffect(() => {
    latestOnboarding.current = isOnboarding?.isOnboarding;
  }, [isOnboarding?.isOnboarding]);

  // ============================================================
  // SPLASH ANIMATION + ROUTING
  // ============================================================

  useEffect(() => {
    // Background fade + slow zoom
    backgroundOpacity.value = withTiming(1, {
      duration: 500,
    });

    backgroundScale.value = withTiming(1, {
      duration: SPLASH_DURATION,
      easing: Easing.out(Easing.ease),
    });

    // Pink glow behind characters
    glowOpacity.value = withDelay(
      500,
      withTiming(0.28, {
        duration: 900,
      })
    );

    glowScale.value = withDelay(
      500,
      withRepeat(
        withSequence(
          withTiming(1.06, {
            duration: 900,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.96, {
            duration: 900,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      )
    );

    // Logo
    logoOpacity.value = withDelay(
      150,
      withTiming(1, {
        duration: 400,
      })
    );

    logoTranslateY.value = withDelay(
      150,
      withTiming(0, {
        duration: 750,
        easing: Easing.out(Easing.back(1.2)),
      })
    );

    logoScale.value = withDelay(
      150,
      withSequence(
        withTiming(1.05, {
          duration: 650,
          easing: Easing.out(Easing.back(1.15)),
        }),
        withTiming(1, {
          duration: 180,
        })
      )
    );

    // ZAR from left
    zarOpacity.value = withDelay(
      850,
      withTiming(1, {
        duration: 250,
      })
    );

    zarTranslateX.value = withDelay(
      850,
      withTiming(0, {
        duration: 850,
        easing: Easing.out(Easing.back(1.1)),
      })
    );

    zarRotate.value = withDelay(
      850,
      withTiming(0, {
        duration: 850,
        easing: Easing.out(Easing.back(1.1)),
      })
    );

    // HAS from bottom
    hasOpacity.value = withDelay(
      1100,
      withTiming(1, {
        duration: 250,
      })
    );

    hasTranslateY.value = withDelay(
      1100,
      withTiming(0, {
        duration: 900,
        easing: Easing.out(Easing.back(1.18)),
      })
    );

    hasScale.value = withDelay(
      1100,
      withSequence(
        withTiming(1.07, {
          duration: 700,
          easing: Easing.out(Easing.back(1.1)),
        }),
        withTiming(1, {
          duration: 200,
        })
      )
    );

    // AZ from right
    azOpacity.value = withDelay(
      1350,
      withTiming(1, {
        duration: 250,
      })
    );

    azTranslateX.value = withDelay(
      1350,
      withTiming(0, {
        duration: 850,
        easing: Easing.out(Easing.back(1.1)),
      })
    );

    azRotate.value = withDelay(
      1350,
      withTiming(0, {
        duration: 850,
        easing: Easing.out(Easing.back(1.1)),
      })
    );

    // Gentle breathing after all arrive
    charactersScale.value = withDelay(
      2400,
      withRepeat(
        withSequence(
          withTiming(1.025, {
            duration: 650,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 650,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      )
    );

    // Fade entire splash before navigation
    screenOpacity.value = withDelay(
      SPLASH_DURATION - 500,
      withTiming(0, {
        duration: 450,
      })
    );

    const routeTimer = setTimeout(() => {
      if (latestUserId.current) {
        router.replace("/(main)/Home");
        return;
      }

      if (latestOnboarding.current) {
        router.replace("/(auth)/signin");
        return;
      }

      router.replace("/(auth)/welcome");
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(routeTimer);
    };
  }, []);

  // ============================================================
  // ANIMATED STYLES
  // ============================================================

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
    transform: [
      {
        scale: backgroundScale.value,
      },
    ],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      {
        translateY: logoTranslateY.value,
      },
      {
        scale: logoScale.value,
      },
    ],
  }));

  const zarStyle = useAnimatedStyle(() => ({
    opacity: zarOpacity.value,
    transform: [
      {
        translateX: zarTranslateX.value,
      },
      {
        rotate: `${zarRotate.value}deg`,
      },
      {
        scale: charactersScale.value,
      },
    ],
  }));

  const hasStyle = useAnimatedStyle(() => ({
    opacity: hasOpacity.value,
    transform: [
      {
        translateY: hasTranslateY.value,
      },
      {
        scale: hasScale.value * charactersScale.value,
      },
    ],
  }));

  const azStyle = useAnimatedStyle(() => ({
    opacity: azOpacity.value,
    transform: [
      {
        translateX: azTranslateX.value,
      },
      {
        rotate: `${azRotate.value}deg`,
      },
      {
        scale: charactersScale.value,
      },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [
      {
        scale: glowScale.value,
      },
    ],
  }));

  // ============================================================
  // PUSH NOTIFICATION TOKEN
  // ============================================================

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const setupPush = async () => {
      try {
        const token = await registerForPushNotificationsAsync();

        console.log("Expo Token:", token);

        if (token) {
          await saveUserToken({
            user_id: user.id,
            expo_token: token,
          }).unwrap();
        }
      } catch (error) {
        console.log("Push setup error:", error);
      }
    };

    setupPush();
  }, [user?.id, saveUserToken]);

  // ============================================================
  // NOTIFICATION CLICK
  // ============================================================

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        console.log("Notification Clicked:", data);

        if (data) {
          setTimeout(() => {
            router.replace("/(auth)/CreateNewpass");
          }, 800);
        }
      });

    return () => {
      subscription.remove();
    };
  }, [router]);

  // ============================================================
  // UI
  // ============================================================

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      {/* MAIN BACKGROUND */}
      <Animated.Image
        source={SplashBackground}
        resizeMode="cover"
        style={[styles.background, backgroundStyle]}
      />

      {/* SOFT WHITE OVERLAY */}
      <View pointerEvents="none" style={styles.softOverlay} />

      {/* GLOW */}
      <Animated.View
        pointerEvents="none"
        style={[styles.characterGlow, glowStyle]}
      />

      {/* LOGO */}
      <Animated.Image
        source={SweetGharLogo}
        resizeMode="contain"
        style={[styles.logo, logoStyle]}
      />

      {/* CHARACTERS */}
      <View pointerEvents="none" style={styles.charactersContainer}>
        {/* ZAR */}
        <Animated.Image
          source={ZAR}
          resizeMode="contain"
          style={[styles.zar, zarStyle]}
        />

        {/* HAS */}
        <Animated.Image
          source={HAS}
          resizeMode="contain"
          style={[styles.has, hasStyle]}
        />

        {/* AZ */}
        <Animated.Image
          source={AZ}
          resizeMode="contain"
          style={[styles.az, azStyle]}
        />
      </View>

      {/* BOTTOM FADE */}
      <View pointerEvents="none" style={styles.bottomGlow} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF7FF",
    overflow: "hidden",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  softOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.04)",
    zIndex: 2,
  },

  logo: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.035,
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.76,
    height: SCREEN_HEIGHT * 0.14,
    zIndex: 30,
  },

  characterGlow: {
    position: "absolute",
    alignSelf: "center",
    bottom: SCREEN_HEIGHT * 0.15,
    width: SCREEN_WIDTH * 0.92,
    height: SCREEN_WIDTH * 0.92,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: "rgba(255, 0, 122, 0.18)",
    zIndex: 8,
  },

  charactersContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: SCREEN_HEIGHT * 0.105,
    height: SCREEN_HEIGHT * 0.52,
    zIndex: 20,
  },

  zar: {
    position: "absolute",
    left: -SCREEN_WIDTH * 0.04,
    bottom: 0,
    width: SCREEN_WIDTH * 0.44,
    height: "88%",
    zIndex: 12,
  },

  has: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: SCREEN_WIDTH * 0.48,
    height: "100%",
    zIndex: 20,
  },

  az: {
    position: "absolute",
    right: -SCREEN_WIDTH * 0.04,
    bottom: 0,
    width: SCREEN_WIDTH * 0.42,
    height: "86%",
    zIndex: 12,
  },

  bottomGlow: {
    position: "absolute",
    left: -SCREEN_WIDTH * 0.2,
    right: -SCREEN_WIDTH * 0.2,
    bottom: -SCREEN_HEIGHT * 0.05,
    height: SCREEN_HEIGHT * 0.18,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: "rgba(255,255,255,0.18)",
    zIndex: 5,
  },
});

export default Index;