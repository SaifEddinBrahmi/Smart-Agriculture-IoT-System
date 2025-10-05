import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

const SondeChartT = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text>No data available to display.</Text>;
  }

  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        data: data.map(item => item.tempLevel1),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // red
        strokeWidth: 2,
      },
      {
        data: data.map(item => item.tempLevel2),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // green
        strokeWidth: 2,
      },
      {
        data: data.map(item => item.tempLevel3),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      {/* Y-axis label */}
      <View style={styles.yAxisLabelContainer}>
        <Text style={styles.label}>Temperature Levels</Text>
      </View>

      {/* Chart and X-axis label */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Text style={styles.xAxisLabel}>Date</Text>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'rgba(255, 0, 0, 1)' }]} />
          <Text>Temp Level 1</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'rgba(0, 255, 0, 1)' }]} />
          <Text>Temp Level 2</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'rgba(0, 0, 255, 1)' }]} />
          <Text>Temp Level 3</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  yAxisLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    zIndex: 1,
  },
  chartContainer: {
    marginVertical: 8,
    borderRadius: 16,
    position: 'relative',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  xAxisLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: -30, 
    right: 0, 
    padding: 8,
    zIndex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    width: screenWidth - 32,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColorBox: {
    width: 10,
    height: 10,
    marginRight: 8,
  },
});

export default SondeChartT;
