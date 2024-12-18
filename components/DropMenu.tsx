import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  visible: boolean;
  handleClose: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const DropMenu: React.FC<Props> = ({
  visible,
  handleClose,
  trigger,
  children,
}) => {
  

  return (
    <View>
      {/* Trigger button */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <View>{trigger}</View>
      </TouchableWithoutFeedback>

      {/* Menu */}
      {visible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={visible}
          onRequestClose={handleClose}
        >
          <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={styles.overlay}>
                <View
                  style={[
                    styles.menu,
                    {
                      top: 110,
                      right: 20,
                    },
                  ]}
                >
                  {children}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </GestureHandlerRootView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    backgroundColor: "#30353D",
    borderRadius: 10,
    opacity: 0.8,
    padding: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
