import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { BasicButton } from "./BasicButton";

interface Props {
  author: string;
  songTitle: string;
}

export const BasicCell: React.FC<Props> = ({ author, songTitle }) => {
  return (
    <View
      style={{
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        padding: 5,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          width: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#999999",
            fontFamily: "RussoOne_400Regular",
            textTransform: "uppercase",
          }}
        >
          {songTitle}
        </Text>
        <Text
          style={{
            color: "#666666",
            fontSize: 12,
            fontFamily: "RussoOne_400Regular",
            textTransform: "uppercase",
          }}
        >
          {author}
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#41464B", "#0E1013"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: "50%",
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BasicButton
            icon_name={"play"}
            height={26}
            width={26}
            color={"#797C7F"}
            bColor={"#1A1C20"}
            size={20}
          />
        </LinearGradient>
      </View>
    </View>
  );
};
