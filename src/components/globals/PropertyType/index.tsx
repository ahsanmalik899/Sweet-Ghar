import Commercial from '@assets/icons/PostProperty/commercials.svg'
import Farm from '@assets/icons/PostProperty/farm-land.svg'
import Holydays from '@assets/icons/PostProperty/holydays.svg'
import Home from '@assets/icons/PostProperty/home.svg'
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RentAndSaleProps } from '../SelectRentAndSale/type'
const index = ({value,onPress,errorText}:RentAndSaleProps) => {
  return (
    <>
    <View className="flex-row justify-between">
         <TouchableOpacity 
          activeOpacity={1}className="items-center"

           style={[value === "House" ? styles.activeButton : styles.Button]}
           onPress={()=>onPress('House')}
         >
          <Home/>
           <Text style={[value === "House" ? styles.TextActive : styles.Text]}>House</Text>
         </TouchableOpacity>

         <TouchableOpacity
          activeOpacity={1}
         className="items-center"
           style={[value === "Commercial" ? styles.activeButton : styles.Button]}
          onPress={()=>onPress('Commercial')}
         >
          <Commercial/>
           <Text style={[value === "Commercial" ? styles.TextActive : styles.Text]}>Commercials</Text>
         </TouchableOpacity>
          <TouchableOpacity
           activeOpacity={1}
         className="items-center"
           style={[value === "Farms/Lands" ? styles.activeButton : styles.Button]}
          onPress={()=>onPress('Farms/Lands')}
         >
          <Farm/>
           <Text style={[value === "Farms/Lands" ? styles.TextActive : styles.Text]}>Farms/Lands</Text>
         </TouchableOpacity>
         
       </View>
       <TouchableOpacity
       
           activeOpacity={1}
         className="items-center mt-5"
           style={[value === "Holidays" ? styles.activeButton : styles.Button]}
          onPress={()=>onPress('Holidays')}
         >
             <Holydays/>
           <Text style={[value === "Holidays" ? styles.TextActive : styles.Text]}>Holidays</Text>
         </TouchableOpacity>
        { errorText && (
                             <Text
                               style={{ color: Colors.light.red, marginTop: vs(5) }}
                             >
                               {errorText}
                             </Text>
                           )}</>
  )
}

export default index

const styles = StyleSheet.create({
    activeButton: {
    backgroundColor: "#F4F0F0",
    width: hs(100),
    paddingVertical: vs(5),
    borderRadius:8,
  },
  Button: {
    borderWidth: ms(0.5),
    width: hs(100),
    paddingVertical: vs(5),
    borderColor:Colors.light.textGray,
    borderRadius:8,
  },

  TextActive: {
    fontWeight: 500,
    color: Colors.light.red,
    marginTop:vs(5),
    fontFamily: "PopinRegula",
  },
  Text: {
    fontWeight: 400,
     marginTop:vs(5),
     fontFamily: "PopinRegula",
  },
})