import {
  useGetBlockedProfileMessageQuery,
  useGetProfilesQuery,
  useSendBlockedProfileMessageMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import MaterialSupply from "@assets/CreateProfile/material-supply.svg";
import Agent from "@assets/SideBar/agent.svg";
import Builder from "@assets/SideBar/builder.svg";
import Decore from "@assets/SideBar/decore.svg";
import Electrician from "@assets/SideBar/electricican.svg";
import Investor from "@assets/SideBar/investor.svg";
import Mortgagae from "@assets/SideBar/mortgage.svg";
import Painter from "@assets/SideBar/painter.svg";
import Plumber from "@assets/SideBar/plumber.svg";
import BlockedProfileModal from "@src/components/globals/BlockedUser";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Loading from "@src/components/globals/Loading";
import SideBarCard from "@src/components/globals/SideBarCard";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const index = () => {
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom;
  const user = useAppSelector(userdata);
  const [selectedProfile, setSelectedProfile] = useState<{
    id: number | null;
    profileType: string;
    generalPostId: number | null;
  } | null>(null);
  const [sendBlockedProfileMessage, { isLoading: sendingMessage }] =
    useSendBlockedProfileMessageMutation();
  const { data: blockedMessage, refetch,isLoading:gettingMessage } = useGetBlockedProfileMessageQuery(
    {
      post_id: selectedProfile?.generalPostId,
      post_of: "general_post",
    },
    {
      skip: !selectedProfile?.generalPostId,
    }
  );

  const { data, isLoading } = useGetProfilesQuery({ id: user.id });
  console.log(data);
  const [blockedModalVisible, setBlockedModalVisible] = useState(false);
  const handleBlockedProfile = (profileType: string, profile: any) => {
    setSelectedProfile({
      id: profile.profile_id,
      profileType,
      generalPostId: profile.general_post_id,
    });

    setBlockedModalVisible(true);
  };
  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Business Profiles" />

      <ScrollView
        style={{ paddingHorizontal: hs(20), paddingTop: vs(10) }}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row justify-between">
          <SideBarCard
            text="Mortgage Profile"
            Svg={Mortgagae}
            type={
              data?.profiles_exist?.mortgage?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.mortgage?.exists}
            id={data?.profiles_exist?.mortgage?.profile_id}
            profileType="mortgage"
            isBlocked={data?.profiles_exist?.mortgage?.status}
            onPress={() =>
              handleBlockedProfile("mortgage", data?.profiles_exist?.agent)
            }
          />

          <SideBarCard
            text="Builder Profile"
            Svg={Builder}
            type={
              data?.profiles_exist?.builder?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.builder?.exists}
            id={data?.profiles_exist?.builder?.profile_id}
            profileType="builder"
            isBlocked={data?.profiles_exist?.builder?.status}
            onPress={() =>
              handleBlockedProfile("builder", data?.profiles_exist?.agent)
            }
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Investor Profile"
            Svg={Investor}
            type={
              data?.profiles_exist?.investor?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.investor?.exists}
            id={data?.profiles_exist?.investor?.profile_id}
            profileType="investor"
            isBlocked={data?.profiles_exist?.investor?.status}
            onPress={() =>
              handleBlockedProfile("investor", data?.profiles_exist?.agent)
            }
          />
          <SideBarCard
            text="Agent Profile"
            Svg={Agent}
            type={
              data?.profiles_exist?.agent?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.agent?.exists}
            id={data?.profiles_exist?.agent?.profile_id}
            profileType="agent"
            isBlocked={data?.profiles_exist?.agent?.status}
            onPress={() =>
              handleBlockedProfile("agent", data?.profiles_exist?.agent)
            }
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Plumber Profile"
            Svg={Plumber}
            type={
              data?.profiles_exist?.plumber?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.plumber?.exists}
            id={data?.profiles_exist?.plumber?.profile_id}
            profileType="plumber"
            isBlocked={data?.profiles_exist?.plumber?.status}
            onPress={() =>
              handleBlockedProfile("plumber", data?.profiles_exist?.agent)
            }
          />
          <SideBarCard
            text="Painter Profile"
            Svg={Painter}
            type={
              data?.profiles_exist?.painter?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.painter?.exists}
            id={data?.profiles_exist?.painter?.profile_id}
            profileType="painter"
            isBlocked={data?.profiles_exist?.painter?.status}
            onPress={() =>
              handleBlockedProfile("painter", data?.profiles_exist?.agent)
            }
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Electrician Profile"
            Svg={Electrician}
            type={
              data?.profiles_exist?.electrician?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.electrician?.exists}
            id={data?.profiles_exist?.electrician?.profile_id}
            profileType="electrician"
            isBlocked={data?.profiles_exist?.electrician?.status}
            onPress={() =>
              handleBlockedProfile("electrician", data?.profiles_exist?.agent)
            }
          />
          <SideBarCard
            text="Decor Profile"
            Svg={Decore}
            type={
              data?.profiles_exist?.decor?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.decor?.exists}
            id={data?.profiles_exist?.decor?.profile_id}
            profileType="decor"
            isBlocked={data?.profiles_exist?.decor?.status}
            onPress={() =>
              handleBlockedProfile("decor", data?.profiles_exist?.agent)
            }
          />
        </View>
          <SideBarCard
            text="Material Supplier Profile"
            Svg={MaterialSupply}
            type={
              data?.profiles_exist?.material_supplier?.status === "Block"
                ? "Block"
                : "busenessProfile"
            }
            ProfileExist={data?.profiles_exist?.material_supplier?.exists}
            id={data?.profiles_exist?.material_supplier?.profile_id}
            profileType="material_supplier"
            isBlocked={data?.profiles_exist?.material_supplier?.status}
            onPress={() =>
              handleBlockedProfile("material_supplier", data?.profiles_exist?.agent)
            }
          />
      </ScrollView>
      <Loading isLoading={isLoading} text="Loading..." />
      <BlockedProfileModal
        visible={blockedModalVisible}
        profileType={selectedProfile?.profileType}
        profileId={selectedProfile?.id}
        initialMessage={blockedMessage?.messageToAdmin ?? ""}
        onClose={() => setBlockedModalVisible(false)}
        onEdit={() => {
          setBlockedModalVisible(false);

          router.push({
            pathname: "/CreateProfiles",
            params: {
              edit: "true",
              id: selectedProfile?.id,
              ProfileType: selectedProfile?.profileType,
              type: "busenessProfile",
            },
          });
        }}
        onSendMessage={async (adminMessage) => {
          try {
            const res = await sendBlockedProfileMessage({
              post_id: selectedProfile?.generalPostId,
              post_of: "general_post",
              message: adminMessage,
            }).unwrap();

            if (res.status) {
              alert(res.message);
              setBlockedModalVisible(false);
              refetch(); // Refresh saved message
            } else {
              alert(res.message);
            }
          } catch (error) {
            console.log(error);
            alert("Something went wrong.");
          }
        }}
      />
      <Loading text={"Loading..."} isLoading={sendingMessage||gettingMessage} />
    </View>
  );
};

export default index;
