import React, {useContext, useState, useEffect} from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import NavContext from "../data/NavContext";

const LinkButton = ({icon, title}) => {
  const { page, changePage} = useContext(NavContext);
  const [style, setStyle] = useState(styles.inactivebtn);

  useEffect(() => {
    if(title === page){
      setStyle(styles.activebtn);
    }else{
      setStyle(styles.inactivebtn);
    }
  }, [page])

  return (
    <Pressable style={style} onPressIn={() => changePage(title)}>
        {icon}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  activebtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
    width: "90%",
    height: 180,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  inactivebtn: {
    backgroundColor: "rgba(255,255,255,0)",
    width: "90%",
    height: 180,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
    textTransform: "uppercase"
  },
});

export default LinkButton;
