import FormandLand from "@assets/Buy/formLandForSale.svg";
import PropertyForSale from "@assets/Buy/propertyforSale.svg";
import Rebuilt from "@assets/Buy/reBuiltForsale.svg";
import Holydays from '@assets/icons/PostProperty/holydays.svg';
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
const index = () => {
  return (
    <View className="bg-white flex-1 " >
      <HeaderWithBack title="Buy" />
      <View style={{ marginHorizontal: hs(20), marginTop: vs(30) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={PropertyForSale}
            text="House"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyFilter",
                params: { type: "House",property_for:"sale" },
              });
            }}
            type={"Buy"}
          />
          <SideBarCard
            Svg={Rebuilt}
            text="Commercials"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyFilter",
                params: { type: "Commercial" ,property_for:"sale"},
              });
            }}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={FormandLand}
            text="Farm & Land"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyFilter",
                params: { type: "Farms/Lands",property_for:"sale" },
              });
            }}
            type={"Buy"}
          />
          <SideBarCard
  Svg={Holydays}
  text="Holidays"
  onPress={() => {
    router.navigate({
      pathname: "/(main)/BuyFilter",
      params: {
        type: "Holidays",
        property_for: "sale",
      },
    });
  }}
  type={"Buy"}
/>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end',marginTop:'auto',marginHorizontal:hs(20),marginBottom:hs(20)}}>
        <LargeButton text="Raise query to Buy" handleSubmit={() => {router.navigate({
        pathname:"/HomeValue",
        params:{type:"buy"}
      })} }/>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
