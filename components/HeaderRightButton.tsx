import { useDispatch } from "react-redux";
import { DropDownMenuOption } from "./DropDownMenuOption";
import { DropMenu } from "./DropMenu";
import { NavigationButton } from "./NavigationButton";
import { AppDispatch } from "../data/store";
import { setPlaylist } from "../features/Playlist";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  isMenuVisible: boolean;
  toggleMenu: () => void;
  setIsMenuVisible: (isVisible: boolean) => void;
}

export const HeaderRightButton: React.FC<Props> = ({
  isMenuVisible,
  toggleMenu,
  setIsMenuVisible,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <DropMenu
      visible={isMenuVisible}
      handleClose={toggleMenu}
      trigger={
        <NavigationButton
          icon_name="ellipsis-vertical-outline"
          height={35}
          width={35}
          onPress={toggleMenu}
        />
      }
    >
      <DropDownMenuOption
        onSelect={() => {
          console.log("Option 1 is selected");
          dispatch(setPlaylist("all"));
          setIsMenuVisible(false);
        }}
      >
        <View
          style={[
            styles.menuCell,
            {
              borderBottomWidth: 1,
              borderBottomColor: "#0E1013",
              paddingBottom: 10,
            },
          ]}
        >
          <Ionicons name="shuffle" size={20} color={"#999999"} />
          <Text style={styles.menuText}>Play Shuffle</Text>
        </View>
      </DropDownMenuOption>
      <DropDownMenuOption
        onSelect={() => {
          console.log("Option 2 is selected");
          dispatch(setPlaylist("favorites"));
          setIsMenuVisible(false);
        }}
      >
        <View style={[styles.menuCell]}>
          <Ionicons name="heart" size={20} color={"#FE251B"} />
          <Text style={styles.menuText}>Play Favorites</Text>
        </View>
      </DropDownMenuOption>
    </DropMenu>
  );
};

const styles = StyleSheet.create({
  menuCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    gap: 10,
  },
  menuText: {
    color: "#999999",
    fontSize: 15,
    fontFamily: "RussoOne_400Regular",
  },
});
