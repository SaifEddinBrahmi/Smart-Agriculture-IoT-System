import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text>No data available to display.</Text>;
  }

  const chartData = {
    labels: data.map(item => new Date(item.startdate).toLocaleDateString()),
    datasets: [
      {
        data: data.map(item => item.period),
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      {/* Y-axis label */}
      <View style={styles.yAxisLabelContainer}>
        <Text style={styles.label}>Period</Text>
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
        <Text style={styles.xAxisLabel}>Start Date</Text>
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
    bottom: -30, // Adjust this value to place it correctly
    right: 0, // Align to the right edge
    padding: 8,
    zIndex: 1,
  },
});

export default ChartComponent;
