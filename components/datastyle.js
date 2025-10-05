// src/datastyles.js
import { StyleSheet } from "react-native";

const datastyles = StyleSheet.create({   
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    itemContainer: {
      backgroundColor: '#ffffff',
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    itemText: {
      fontSize: 16,
      marginBottom: 8,
    },
    emptyText: {
      textAlign: 'center',
      marginVertical: 20,
      fontSize: 18,
      color: '#888',
    },
  });
  
  

export default datastyles;
