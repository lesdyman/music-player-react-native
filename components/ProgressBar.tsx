import { Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { StyleSheet } from "react-native";

export const ProgressBar = () => (
  <View style={styles.progressBarBlock}>
  <Text style={styles.timerText}>00:48</Text>
  <View style={styles.progressBarShadow}>
    <Progress.Bar
      color="#FF611A"
      unfilledColor="#1b1b1b"
      borderColor="#CB340D"
      borderWidth={1}
      width={230}
      height={5}
      progress={0.3}
    />
  </View>
  <Text style={styles.timerText}>03:54</Text>
</View>
)

const styles = StyleSheet.create({

  timerText: {
    color: '#666666',
    fontFamily:'RussoOne_400Regular',
  },
  progressBarBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '100%',
  },

  progressBarShadow: {
    height: 5,
    shadowColor: "#CB340D",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
    elevation: 5,
  }, 
});
