import BuyAll from '@assets/icons/buy-all.svg'
import Constructed from '@assets/icons/newly-constructed.svg'
import Renovated from '@assets/icons/newly-renovated.svg'
import ReducePrice from '@assets/icons/price.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import QuickSerchCard from '@src/components/globals/QuickSerchCard'
import SerchBar from '@src/components/globals/SerchBar'
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
interface RentListing {
  mainHeading: String,
  redText: String,
  endText: String,
  subHeading: String,
  Picture: React.FC,
}
const index = () => {
      const { type } = useLocalSearchParams()
  let dataBuy: RentListing = {
    mainHeading: "",
    redText: "",
    endText: "",
    subHeading: "",
    Picture: BuyAll,

  }
    switch (type) {
    case "Homes":
      dataBuy = {
        mainHeading: "Helping homers to find their\n",
        redText: "LOVED",
        endText: "  home",
        subHeading: "All Sales",
        Picture: BuyAll
      }
      break;
    case "Commercial":
      dataBuy = {
        mainHeading: "Rebuilt homes that ",
        redText: "INSPIRES \n",
        endText: "economical homing",
        subHeading: "Re-built for sale",
        Picture: BuyAll
      }
      break;
          case "Holidays":
      dataBuy = {
        mainHeading: "Find your perfect ",
        redText: "HOLIDAY",
        endText: " home",
        subHeading: "Holiday properties for sale",
        Picture: BuyAll,
      };
      break;}
  return (
      <ScrollView>
      <View className='bg-white flex-1 pb-5'>
        <HeaderWithBack />
        <View style={{ marginHorizontal: hs(20) }} >
          <Text style={styles.mainHeading}>{dataBuy.mainHeading}
            <Text style={{ color: Colors.light.red ,  fontFamily: "PopinRegula",}}>{dataBuy.redText}</Text>
            {dataBuy.endText}
          </Text>
          <Text style={styles.subHeading}>{dataBuy.subHeading}</Text>
          <SerchBar />
          <View className='items-center justify-center'>
            <dataBuy.Picture />
          </View>
          <Text style={{
            fontSize: ms(20), fontWeight: 500,
            marginBottom: vs(10)
          }}>Quickly search your <Text style={{ color: Colors.light.red }}>dream</Text> living</Text>
        </View>
        <QuickSerchCard Image={ReducePrice} text="Reduced Price" onPress={() => { }} />
        <QuickSerchCard Image={Renovated} text="Newly renovated" onPress={() => { }} />
        <QuickSerchCard Image={Constructed} text="Newly Constructed" onPress={() => { }} />
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
   
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
      fontFamily: "PopinRegula",
  },
  subHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    marginBottom: vs(10),
    fontWeight: 500,
      fontFamily: "PopinRegula",
  }
})
