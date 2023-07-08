import { Entypo } from "@expo/vector-icons";
import { DARK_THEME } from "constants/theme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/file-widget.style";

function FileWidget() {
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.columnContainer}>
        <Entypo name="chevron-left" size={25} color={DARK_THEME.text} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fileName}>未命名</Text>
          <Text style={styles.time}>15:30</Text>
        </View>
        <View style={styles.centerBottomContainer}>
          <Entypo name="trash" size={20} color={DARK_THEME.maroon} />
          <Entypo name="list" size={20} color={DARK_THEME.text} />
          <Entypo name="add-to-list" size={20} color={DARK_THEME.text} />
          <Entypo name="save" size={20} color={DARK_THEME.text} />
        </View>
      </View>
      <TouchableOpacity style={styles.columnContainer}>
        <Entypo name="chevron-right" size={25} color={DARK_THEME.text} />
      </TouchableOpacity>
    </View>
  );
}

export default FileWidget;
