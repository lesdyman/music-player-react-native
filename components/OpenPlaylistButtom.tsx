import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

interface Props {
  handlePlaylistOpen: () => void;
}

export const OpenPlaylistButton: React.FC<Props> = ({ handlePlaylistOpen }) => (
  <TouchableWithoutFeedback onPress={handlePlaylistOpen}>
    <View
      style={{
        gap: 5,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../assets/pull-icon.png')}
        style={{
          height: 5,
          width: "100%",
          objectFit: "contain",
        }}
      />
      <Text
        style={{
          color: "#666666",
          fontSize: 12,
          fontFamily: "RussoOne_400Regular",
          textTransform: "uppercase",
          width: '100%', 
          textAlign: 'center',
        }}
      >
        Press to open the song list
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
