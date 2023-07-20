import * as SQLite from "expo-sqlite";
import { SQLResultSetRowList } from "expo-sqlite";
import { Platform } from "react-native";
import { Meter } from "types/meter.interface";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {
            console.log("this is web, don't support SQLite");
          },
        };
      },
    };
  }

  return SQLite.openDatabase("data.db");
}

export function initRecordTable() {
  console.log("initRecordTable");
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(`
			CREATE TABLE IF NOT EXISTS records (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				tempo INTEGER NOT NULL,
				meterNumerator INTEGER NOT NULL,
				meterDenominator INTEGER NOT NULL,
				pattern INTEGER NOT NULL
			)`);
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log("load record table success");
    },
  );
}

export function insertRecord(tempo: number, meter: Meter, pattern: number) {
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        "INSERT INTO records (name, tempo, meterNumerator, meterDenominator, pattern) VALUES (?, ?, ?, ?, ?)",
        ["test", tempo, meter.numerator, meter.denominator, pattern],
      );
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log("insert record success");
    },
  );
}

export function findRecords(callback: (rows: SQLResultSetRowList) => void) {
  const db = openDatabase();
  return db.transaction(
    (tx) => {
      return tx.executeSql("SELECT * FROM records", [], (_, { rows }) => {
        console.log(rows);
        callback(rows);
      });
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log("find records success");
    },
  );
}
