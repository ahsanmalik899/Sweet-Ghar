import MortgageExpert from "@assets/GetHelp/mortgageexpert.svg";
import PropertyInvestor from "@assets/GetHelp/propertyInvestor.svg";
import ReputedAgent from "@assets/GetHelp/reputeAgent.svg";
import Builder from "@assets/HomeRomance/builderh.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack title="Find Expert"  />
      <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
        
          <SideBarCard
            Svg={ReputedAgent}
            text="Reputed Agents"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "agent" },
              });
            }}
            type={"Buy"}
          />
          
          <SideBarCard
            text="Home Builders"
            Svg={Builder}
            type="Buy"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "builder" },
              });
            }}
          />
      
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={PropertyInvestor}
            text="Property Investors"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "investor" },
              });
            }}
            type={"Buy"}
          />
            <SideBarCard
            Svg={MortgageExpert}
            text="Mortgage Experts"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "mortgage" },
              });
            }}
            type={"Buy"}
          />
        </View>
      </View>
           <View style={{justifyContent: 'flex-end',marginTop:'auto',marginHorizontal:hs(20),marginBottom:hs(20)}}>
        <LargeButton text="Raise query to Local Experts for free" handleSubmit={() => router.navigate({pathname:"/HomeValue",params:{type:"get help"}})} />
      </View>
    </View>
  );
};

export default index;


