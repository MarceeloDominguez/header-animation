import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const constants = {
  padding: 16,
};

const { width: sWidth } = Dimensions.get("screen");

export default function HeaderAnimation() {
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const offsetValue = 100;

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const animatedHeader = useAnimatedStyle(() => {
    const headerInitialHeight = 120;
    const headerNextHeight = 60;

    const height = interpolate(
      scrollY.value,
      [0, offsetValue],
      [headerInitialHeight, headerNextHeight],
      Extrapolation.CLAMP
    );

    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, offsetValue],
      ["#1b1a1a", "#E74C3C"]
    );

    return { backgroundColor, height };
  });

  const animImage = useAnimatedStyle(() => {
    const yValue = 30;
    const translateY = interpolate(
      scrollY.value,
      [0, offsetValue],
      [0, -yValue],
      Extrapolation.CLAMP
    );

    const xValue = sWidth / 2 - 2 * constants.padding - 35;
    const translateX = interpolate(
      scrollY.value,
      [0, offsetValue],
      [0, -xValue],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, offsetValue],
      [1, 0.3],
      Extrapolation.CLAMP
    );

    return { transform: [{ translateY }, { translateX }, { scale }] };
  });

  const nameAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 70, offsetValue],
      [0, 0, 1],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, offsetValue],
      [-50, 0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, offsetValue],
      [50, 0],
      Extrapolation.CLAMP
    );

    return { opacity, transform: [{ translateX }, { translateY }] };
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E74C3C" translucent style="auto" />
      <Animated.View
        style={[styles.headerContainer, animatedHeader, { marginTop: top }]}
      >
        <View style={styles.containerIcon}>
          <AntDesign name="arrowleft" size={20} color="#fff" />
        </View>
        <Animated.View style={nameAnimatedStyles}>
          <Text style={styles.headerTitle}>Header Animated</Text>
        </Animated.View>
      </Animated.View>
      <Animated.Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={[styles.image, animImage, { top: top + 10 }]}
      />

      <Animated.ScrollView
        style={{ paddingHorizontal: constants.padding }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {[...Array(20)].map((item, index) => (
          <View key={index} style={styles.containerItem}>
            <Text style={styles.itemName}>Hello World</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1a1a",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 45,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    position: "absolute",
    alignSelf: "center",
  },
  containerItem: {
    backgroundColor: "#252020",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  itemName: {
    color: "#fff",
    fontWeight: "600",
  },
  containerIcon: {
    alignSelf: "flex-start",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    marginTop: 15,
  },
});
