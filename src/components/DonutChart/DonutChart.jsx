import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

// each category is given a certain percentage
// e.g. food is 10%, transport 10%, tech is 10%, misc is 70%
const DonutChart = ({ props }) => {

  const [foodPercent, transportPercent, techPercent, miscPercent] = props;

  console.log(foodPercent);
  console.log(transportPercent);
  console.log(techPercent)

  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  // const leftToSpendAmount = 600;
  // const targetAmount = 1000;

  // const spentAmount = targetAmount - leftToSpendAmount;
  // const percentage = (spentAmount / targetAmount) * 100;

    const strokeDasharray = circleCircumference;

    // this is the last category, spanning the whole donut
    // prolly misc
    const strokeDashoffset1 = circleCircumference - (circleCircumference * (100)) / 100;

    // third category, spanning 75% of the donut
    // food
    const strokeDashoffset2 = circleCircumference - (circleCircumference * (foodPercent)) / 100;

    // second category, spanning 50% of the donut
    // transport
    const strokeDashoffset3 = circleCircumference - (circleCircumference * (transportPercent + foodPercent)) / 100;

    // this is the first category, spanning the 40%
    // tech
    const strokeDashoffset4 = circleCircumference - (circleCircumference * (transportPercent + foodPercent + techPercent)) / 100;



  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="240" width="240" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#B4E4FF" // blue, misc
              fill="transparent"
              strokeWidth="40"
              strokeDashoffset={strokeDashoffset1}
              strokeDasharray={[strokeDasharray]}
              //strokeLinecap="round"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#FFFAA0" // yellow, tech
              fill="transparent"
              strokeWidth="40"
              strokeDashoffset={strokeDashoffset4}
              strokeDasharray={[strokeDasharray]}
              //strokeLinecap="round"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F7C8E0" // pink, transport
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={[strokeDasharray]}
              strokeDashoffset={strokeDashoffset3}
              //strokeLinecap="round"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#C1E1C1" // green, food
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={[strokeDasharray]}
              strokeDashoffset={strokeDashoffset2}
              //strokeLinecap="round"
            />
          </G>
        </Svg>
        {/* <Text style={styles.text}>{spentAmount}€</Text> */}
        {/* <Text style = { styles.text}>$1607.18</Text> */}
      </View>
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
});