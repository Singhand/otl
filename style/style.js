import { StyleSheet } from "react-native";

export const darkColors = {
  text: "#fff",
  bg: "#222",
  buttonClk: "#333",
  modal: "#333",
  modalBg: "#00000080",
  modalButtonClk: "#555",
  inputFocus: "#fff",
  inputBlur: "#888",
};

export const size = {
  round: 10,
};

export const text = {
  historySaved: "기록되었습니다",
  backup: "데이터를 내보냈습니다",
  addFolderTitle: "폴더 추가",
  addFolderInput: "폴더명을 입력하세요",
  add: "추가",
  close: "닫기",
};

export const englishText = {
  historySaved: "History saved",
  backup: "Data exported",
  addFolderTitle: "Add Folder",
  addFolderInput: "Write a title",
  add: "Add",
  close: "Close",
};

export const lightColors = {
  text: "#000",
  bg: "#eee",
  buttonClk: "#ddd",
  modal: "#ddd",
  modalBg: "#00000080",
  modalButtonClk: "#ccc",
  inputFocus: "#000",
  inputBlur: "#888",
};

export const common = StyleSheet.create({
  bg: {},
  text: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  fxr: {
    flexDirection: "row",
  },
  input: {},
  normal: {},
  bold: {
    fontWeight: "bold",
  },
  listGap: {
    gap: 10,
  },

  // Modal
  modalBg: {
    zIndex: 10,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "90%",
    height: "fit-content",
    padding: 20,
    backgroundColor: "#333",
    borderRadius: size.round,
  },
  round: {
    borderRadius: size.round,
  },
  topRound: {
    borderTopLeftRadius: size.round,
    borderTopRightRadius: size.round,
  },
});
