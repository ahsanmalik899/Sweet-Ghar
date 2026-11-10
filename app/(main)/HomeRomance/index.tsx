import Decore from "@assets/HomeRomance/Interior.svg";

import MaterialSupply from "@assets/CreateProfile/material-supply.svg";
import Electrician from "@assets/HomeRomance/electrician.svg";
import Painter from "@assets/HomeRomance/painterh.svg";
import Plumber from "@assets/HomeRomance/plumberh.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack
        title="Home Romance"
       
      />
      <ScrollView style={{ paddingHorizontal: hs(20), paddingTop: vs(30) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Search Electricians"
            Svg={Electrician}
            type="Buy"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/HomeRomanceListing",
                params: { type: "electrician" },
              });
            }}
          />
          <SideBarCard
            text="Search Plumbers"
            Svg={Plumber}
            type="Buy"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/HomeRomanceListing",
                params: { type: "plumber" },
              });
            }}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Interior Decors"
            Svg={Decore}
            type="Buy"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/HomeRomanceListing",
                params: { type: "decor" },
              });
            }}
          />
          <SideBarCard
            text="Search Painters"
            Svg={Painter}
            type="Buy"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/HomeRomanceListing",
                params: { type: "painter" },
              });
            }}
          />
        </View>

          <View className="flex-row justify-between">
          <SideBarCard
            text="Material supplier"
            Svg={MaterialSupply}
            type="Buy"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/HomeRomanceListing",
                params: { type: "material_supplier" },
              });
            }}
          />
        </View>
         <View style={{justifyContent: 'flex-end',marginTop:'auto',marginHorizontal:hs(20),marginBottom:hs(20)}}>
        <LargeButton text="Raise query to Local Experts for free" handleSubmit={() => router.navigate({
               pathname:"/HomeValue",
               params:{type:"maintenance"}})} />
      </View>
      </ScrollView>
    </View>
  );
};

export default index;
