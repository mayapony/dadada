import { Entypo } from "@expo/vector-icons";
import { Sheet } from "@tamagui/sheet";
import { DARK_THEME } from "constants/theme";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/file-widget.style";
import { Meter } from "types/meter.interface";
import { insertRecord } from "../db";

type FileWidgetProps = {
  tempo: number;
  meter: Meter;
  pattern: number;
};

function FileWidget({ tempo, meter, pattern }: FileWidgetProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  function handleSaveRecord() {
    console.log("handle save");
    insertRecord(tempo, meter, pattern);
  }

  // function handleListRecord() {
  //   console.log("handle list");
  //   findRecords((row) => {
  //     for (let i = 0; i < row.length; i++) {
  //       console.log(row.item(i));
  //     }
  //   });
  // }

  return (
    <>
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
            <TouchableOpacity>
              <Entypo name="list" size={20} color={DARK_THEME.text} />
            </TouchableOpacity>
            <Entypo name="add-to-list" size={20} color={DARK_THEME.text} />
            <TouchableOpacity onPress={handleSaveRecord}>
              <Entypo name="save" size={20} color={DARK_THEME.text} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.columnContainer}>
          <Entypo name="chevron-right" size={25} color={DARK_THEME.text} />
        </TouchableOpacity>
      </View>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={true}
        onOpenChange={setOpen}
        snapPoints={[85, 50, 25]}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame
          flex={1}
          padding="$4"
          justifyContent="center"
          alignItems="center"
          space="$5"
        >
          <Text>Hello World</Text>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

export default FileWidget;
