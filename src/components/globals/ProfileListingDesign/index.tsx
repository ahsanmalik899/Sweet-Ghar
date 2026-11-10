import { useSaveItemApiMutation, useUnsaveItemApiMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Call from "@assets/Buy/call.svg";
import Mail from "@assets/Buy/email-open.svg";
import RedHeart from "@assets/CreateProfile/heart-red.svg";
import UnSelecteHeart from "@assets/Feedimg/unselected_heart.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { FlashList } from "@shopify/flash-list";
import { AdCardWithoutAnimation } from "@src/AdCardWithoutAnimation";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CircleImage from "../CircleImage/CircleImage";
import ProfileSingleView from "../ProfileSingleView";
import StarRating from "../StarRating";
import { postDataType } from "./type";
const ProfileListItem = ({
  item,
  user,
  openProfileModal,
  saveItemApi,
  unsaveItemApi,
    isSaved,
  onSavedChange,
}: any) => {
  const [expanded, setExpanded] = useState(false);

  const profileId = item?.data?.id;
  const profileType = item?.data?.type?.toLowerCase();

const toggleSave = async () => {
  const nextSavedValue = !isSaved;

  try {
    if (isSaved) {
      await unsaveItemApi({
        saved_id: profileId,
        user_id: user.id,
        type: profileType,
      }).unwrap();
    } else {
      await saveItemApi({
        saved_id: profileId,
        user_id: user.id,
        type: profileType,
      }).unwrap();
    }

    onSavedChange(nextSavedValue);
  } catch (error) {
    console.log("Error saving/unsaving profile:", error);
  }
};

  if (item?.type !== "post") {
    return <AdCardWithoutAnimation ad={item?.data} />;
  }

  return (
    <TouchableOpacity
     activeOpacity={1}
      onPress={() => openProfileModal(item?.data)}
      onLongPress={() => openProfileModal(item?.data)}
    >
      <View className="bg-white" style={styles.card}>
            <View
              className="flex-row justify-between items-center"
              style={{
                backgroundColor:
                (item?.data?.post_type === "Trending" ||
      item?.data?.post_type === "Promoted")
                    ? Colors.light.LightGreen
                    : "white",
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                borderRadius: ms(10),
                marginBottom: item?.data?.post_type === "Trending" ? vs(10) : vs(0),
              }}
            >
           <Text
  style={{
    color:
      (item?.data?.post_type === "Trending" ||
      item?.data?.post_type === "Promoted")
        ? Colors.light.DarkGreen
        : "black",
    fontWeight: 700,
    fontSize: ms(18),
    fontFamily: "PopinRegula",
  }}
  numberOfLines={1}
  ellipsizeMode="tail"
>
 
  {item?.data?.business_name?.length > 20
    ? item?.data?.business_name.slice(0, 20) + "..."
    : item?.data?.business_name}

  {item?.data?.property_for === "rent" && (
    <Text
      style={{
        color: Colors.light.red,
        fontSize: ms(18),
        fontFamily: "PopinRegula",
      }}
    >
      /{item?.data?.rent_type}
    </Text>
  )}
</Text>
              {(item?.data?.post_type === "Trending"||item?.data?.post_type ==="Promoted")&& (
                <Text
                  style={{ fontWeight: 600, color: Colors.light.DarkGreen,fontFamily: "PopinRegula", }}
                >
                  Trending
                </Text>
              )}
                 
            </View>
            <View className="flex-row justify-between">
           
             
            </View>
            <View className="flex-row justify-between">
              <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }}>
                {item?.data?.address?.length > 25
                  ? item?.data?.address?.slice(0, 25) + "..."
                  : item?.data?.address}
              </Text>
{item?.data?.license_no&&(
              <Text style={{ color: Colors.light.textGray, marginTop: vs(5) ,fontFamily: "PopinRegula",}}>
                License# {item?.data?.license_no}
              </Text>)}
            </View>
            <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }} >{item?.data?.contact}</Text>
             <View className="flex-row items-center " >
                <StarRating rating={item?.data?.rating} size={10} />
                <Text style={{ color: Colors.light.textGray, fontWeight: 700,fontFamily: "PopinRegula",marginLeft:ms(5) }}>
                  {item?.data?.total_reviews} reviews
                </Text>
              </View>
            <View
              style={{
                height: vs(1),
                marginTop: vs(5),

                backgroundColor: Colors.light.textGray,
                opacity: 0.2,
              }}
            />
            <View>
              {item?.data?.remarks&&(
              <Text style={styles.description}>
                {expanded
                  ? item?.data?.remarks
                  : item?.data?.remarks?.slice(0, 70) +
                    (item?.data?.remarks?.length > 70 ? "..." : "")}

                {item?.data?.remarks?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(expanded ? false : true)}
                  >
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>)}

              <TouchableOpacity
               activeOpacity={1}
                onPress={() => {
                 
                }}
              >
                <Image
                  source={
                    item?.data?.cover ? { uri: ImageFormater(item?.data?.cover) } : NoImage
                  }
                  style={{
                    height: vs(250),
                    width: hs(350),
                    borderRadius: ms(10),
                    resizeMode: "cover",
                    alignSelf: "center",
                    backgroundColor: "gray",
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: vs(5),
                    left: hs(10),
                    right: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                ></View>
                <View
                  style={{
                    position: "absolute",
                    top: vs(5),
                    right: hs(10),
                    left: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  <TouchableOpacity
                   activeOpacity={1}
                                     style={{ marginLeft: "auto" }}
                                     onPress={toggleSave}
                                   >
                                     { isSaved ? (
                                       <RedHeart />
                                     ) : (
                                       <UnSelecteHeart />
                                     )}
                                   </TouchableOpacity>
                </View>
              </TouchableOpacity>

              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(10),
                  paddingHorizontal: vs(25),
                  marginTop: vs(10),
                }}
              >
             <Text style={{fontWeight:600,fontSize:ms(15),fontFamily: "PopinRegula",}}>{item?.data?.sale_posts} Sale ads</Text>
             <Text style={{fontWeight:600,fontSize:ms(15),fontFamily: "PopinRegula",}}>{item?.data?.rent_posts} Rent ads</Text>
              </View>

              <View
                className="flex-row justify-between"
                style={{
        backgroundColor: "#ff007b1f",
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: hs(10),
                  marginTop: vs(8),
                }}
              >
                <TouchableOpacity
                 activeOpacity={1}>
                  <Mail />
                </TouchableOpacity>
                <TouchableOpacity
                 activeOpacity={1}>
                  <Call />
                </TouchableOpacity>

                <CircleImage
                  source={{ uri: ImageFormater(item?.data?.logo) }}
                  Size={40}
                />
              </View>
            </View>
          </View>
    </TouchableOpacity>
  );
};
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  setposts,
  type,
  hasmore,
   initialLoadDone,
   isSingleView,
   post_id,
   post_type,
}: postDataType) => {
 

  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const [scrollable, setscrollable] = useState(true);
    const [singleView, setSingleView] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
      const [saveItemApi] = useSaveItemApiMutation();
      const [unsaveItemApi] = useUnsaveItemApiMutation();
       const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
useEffect(() => {
  if (isSingleView && post_id && post_type) {
    const normalizedType = post_type.toLowerCase();

    setProfileData({
      id: post_id,
      type: post_type,
      itemKey: `${normalizedType}-${post_id}`,
    });

    setSingleView(true);
  }
}, [isSingleView, post_id, post_type]);
const openProfileModal = (item: any) => {
  const normalizedType = item?.type?.toLowerCase();
  const itemKey = `${normalizedType}-${item?.id}`;

  setProfileData({
    type: item?.type,
    id: item?.id,
    userid: item?.users_id,
    itemKey,
  });

  setSingleView(true);
};
const renderItem = ({ item, index }: any) => {
  const profileId = item?.data?.id;
  const profileType = item?.data?.type?.toLowerCase();
  const itemKey = `${profileType}-${profileId ?? index}`;

  const isSaved =
    savedItems[itemKey] ??
    item?.data?.is_saved ??
    false;

  return (
    <ProfileListItem
      item={item}
      user={user}
      openProfileModal={openProfileModal}
      saveItemApi={saveItemApi}
      unsaveItemApi={unsaveItemApi}
      isSaved={isSaved}
      onSavedChange={(nextSavedValue: boolean) => {
        setSavedItems((prev) => ({
          ...prev,
          [itemKey]: nextSavedValue,
        }));
      }}
    />
  );
};
  
  return (
      <View style={{ flex: 1}}>
         {!initialLoadDone ? (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          ) : data.length > 0 ? (
            <View className="flex-1">
           <FlashList
  data={data}
  scrollEnabled={scrollable}
  ref={listRef}
  renderItem={renderItem}
    extraData={savedItems}
keyExtractor={(item, index) =>
  item?.type === "post"
    ? `profile-${item?.data?.type}-${item?.data?.id}`
    : `ad-${item?.data?.advertisement_id ?? index}`
}
  onEndReachedThreshold={2}
  onEndReached={() => {
    if (!isfetching && hasmore) {
      setPage((prev) => prev + 1);
    }
  }}
  ListFooterComponent={
    isfetching ? <ActivityIndicator size="small" /> : null
  }
  refreshControl={
    <RefreshControl
      refreshing={isfetching}
      onRefresh={() => setPage(1)}
    />
  }
/>
            </View>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, fontFamily: 'PopinRegular', }}>
              No Data Found
            </Text>
          )}
          <Modal
            visible={singleView}
            animationType="slide"
            onRequestClose={() => setSingleView(false)}
            transparent={true}
            statusBarTranslucent={true}
          >
             <SafeAreaView
                                                 style={{ flex: 1 }}
                                                 edges={[ "bottom", "left", "right"]}
                                               >
    <ProfileSingleView
  id={profileData?.id}
  type={profileData?.type}
  setshowModel={setSingleView}
  onSavedChange={(nextSavedValue) => {
    const normalizedType = profileData?.type?.toLowerCase();

    const itemKey =
      profileData?.itemKey ||
      (normalizedType && profileData?.id
        ? `${normalizedType}-${profileData.id}`
        : null);

    if (!itemKey) return;

    setSavedItems((prev) => ({
      ...prev,
      [itemKey]: nextSavedValue,
    }));
  }}
/>
     </SafeAreaView>
          </Modal>
          
        </View>
  );
};

export default YourAdsPostDesign;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
    borderRadius: ms(20),
    elevation: 5,
  },
  name: {
    fontWeight: "bold",fontFamily: "PopinRegula",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    color: Colors.light.textGray,
    fontFamily: "PopinRegula",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
  card2: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: vs(15),
    paddingHorizontal: hs(15),
    marginTop: vs(10),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
