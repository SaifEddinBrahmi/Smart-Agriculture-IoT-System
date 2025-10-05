// ChartComponent.js
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text>No data available to display.</Text>;
  }

  const chartData = {
    labels: data.map(item => new Date(item.startdate || item.date).toLocaleDateString()),
    datasets: [
      {
        data: data.map(item =>item => item.period || item.distance),
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
    <View>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ChartComponent;
