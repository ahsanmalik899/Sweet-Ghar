import {
  useDeletePostMutation,
  useSaveItemApiMutation,
  useUnsaveItemApiMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Camera from "@assets/Feedimg/camera.svg";
import Delet from "@assets/icons/MypostListing/delet.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { FlashList } from "@shopify/flash-list";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { formatPrice } from "@utils/PriceFormater";
import { timeAgo } from "@utils/Timeago";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AddSingleView from "../AddSingleView";
import CircleImage from "../CircleImage/CircleImage";
import ImageSlider from "../ImageSlider";
import Loading from "../Loading";
import { postDataType } from "./type";
const PastDealsagent = ({
  data,
  setPage,
  isfetching,
  setposts,
  type,
  hasmore,
  initialLoadDone,
}: postDataType) => {
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [imageNo, setImageNo] = useState(0);
  const insets = useSafeAreaInsets();
  const [saveItemApi] = useSaveItemApiMutation();
    const [deleteType, setDeleteType] = useState("");
   const [selectedPost, setSelectedPost] = useState(null);
    const [showpostPostData, setShowpostPostData] = useState<any>(null);
      const [showpost, setShowpost] = useState(false);
  const [unsaveItemApi] = useUnsaveItemApiMutation();
  const [savedItems, setSavedItems] = useState<{ [key: number]: boolean }>({});
  const [savingItems, setSavingItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const initialSaved: { [key: number]: boolean } = {};
    data.forEach((item) => {
      const id = item.post_property_id || item.post_community_id;
      initialSaved[id] = item.is_saved ?? false;
    });
    setSavedItems(initialSaved);
  }, [data]);
  const handleDelete = async (post, type, postType) => {
    try {
      await deletePost({
        post_id: post.id,
        type: postType,
        delete_type: type,
      }).unwrap();

  
    } catch (e) {
      console.log(e);
    }
  };
  const [scrollable, setscrollable] = useState(true);
  const renderItem = ({ item }) => {
    const itemId = item.post_property_id || item.post_community_id;
    const isSaved = savedItems[itemId] ?? false;
  const [expanded, setExpanded] = useState(false);
    const toggleSave = async () => {
      setSavedItems((prev) => ({ ...prev, [itemId]: !isSaved }));
      setSavingItems((prev) => ({ ...prev, [itemId]: true }));

      try {
        if (isSaved) {
          await unsaveItemApi({
            saved_id: itemId,
            user_id: user.id,
            type: item.property_for || "sale",
          }).unwrap();
        } else {
          await saveItemApi({
            saved_id: itemId,
            user_id: user.id,
            type: item.property_for || "sale",
          }).unwrap();
        }
      } catch (error) {
        console.log("Error saving/unsaving item:", error);
        setSavedItems((prev) => ({ ...prev, [itemId]: isSaved }));
      } finally {
        setSavingItems((prev) => ({ ...prev, [itemId]: false }));
      }
    };
    const openslider = (index: number) => {
      setSelectedImages(item.images || []);
      setShowImages(true);
      setscrollable(false);
      setImageNo(index);
    };
    const facts = item.imp_facts ?? item.facts ?? "";
    return (
      <>
        <TouchableOpacity
         activeOpacity={1}
          className="bg-white"
          style={styles.card}
          onPress={() => {
            setShowpostPostData(item);
            setShowpost(true);

          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row">
              <CircleImage
                source={{ uri: ImageFormater(item.posted_by?.logo) }}
                Size={40}
              />
              <View style={styles.uperSection}>
                <View className="flex-row">
                  <Text style={styles.name}>
                    {item.posted_by?.business_name || item.posted_by?.name}
                  </Text>
                  {item.ad_by && (
                    <Text style={{ fontFamily: "PopinRegula" }}>
                      {" "}
                      ({item.ad_by})
                    </Text>
                  )}
                </View>
                <Text style={{ fontFamily: "PopinRegula" }}>
                  {timeAgo(item.post_created_date || item.created_date)}
                </Text>
              </View>
             
            </View>
   <TouchableOpacity
    activeOpacity={1}
    onPress={() => {
      Alert.alert(
        "Confirm",
        "Are you sure you want to delete?",
        [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => handleDelete(item, "Deleted", item.type==="community"?"community":"property"),
          },
        ]
      );
    }}
    style={{
      padding: 6,
      borderRadius: 20,
      
    }}
  >
    <Delet width={20} height={20} />
  </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.description}>
              {expanded
                ? item.details
                : item.details?.slice(0, 70) +
                (item.details?.length > 70 ? "...." : " ")}
              {item.details?.length > 70 && (
                <Text
                  style={styles.moreText}
                  onPress={() => {setExpanded(!expanded)}}
                >
                  {expanded ? " Show Less" : " Read More"}
                </Text>
              )}
            </Text>
            <TouchableOpacity
             activeOpacity={1}
              onPress={() => {
                setSelectedImages(item.images || []);
                setShowImages(true);
                setscrollable(false);
              }}
              style={{ alignSelf: "center" }}
            >
              <Image
                source={
                  item.images && item.images.length > 0
                    ? { uri: ImageFormater(item.images[0]) }
                    : NoImage
                }
                style={{
                  height: vs(250),
                  width: hs(350),
                  borderRadius: ms(12),
                  resizeMode: "cover",
                  backgroundColor: "gray",
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: hs(350),
                  backgroundColor: "rgba(0,0,0,0.55)",
                  paddingHorizontal: hs(10),
                  paddingVertical: vs(8),
                  borderBottomLeftRadius: ms(12),
                  borderBottomRightRadius: ms(12),
                }}
                className="flex-row justify-between items-center"
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    width: "65%",
                    fontFamily: "PopinRegula",
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontFamily: "PopinRegula",
                  }}
                >
                  PKR {item.type==="community"?formatPrice(item.property_types?.price1):formatPrice(item.price1)}
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: vs(8),
                  left: hs(8),
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  paddingHorizontal: hs(8),
                  paddingVertical: vs(4),
                  borderRadius: ms(20),
                }}
              >
                <Camera />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 4,
                    fontWeight: "600",
                    fontFamily: "PopinRegular",
                  }}
                >
                  {item.images ? item.images.length : 0}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: vs(8),
                  right: hs(8),
                  alignItems: "flex-end",
                  gap: vs(5),
                }}
              >
                {item.saleprice_type === "Reduced Price" && (
                  <Text
                    style={{
                      backgroundColor: "rgba(241,28,28,0.85)",
                      paddingHorizontal: hs(8),
                      paddingVertical: vs(5),
                      color: "white",
                      fontWeight: "600",
                      borderRadius: ms(8),
                      fontFamily: "PopinRegular",
                    }}
                  >
                    Reduced Price
                  </Text>
                )}
              </View>
            </TouchableOpacity>

          
         
          
          </View>
      
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={{ flex: 1, marginBottom: insets.bottom }}>
      {!initialLoadDone ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : data.length > 0 ? (
      <FlashList
  data={data}
  scrollEnabled={scrollable}
  ref={listRef}
  renderItem={renderItem}
  keyExtractor={(item, index) =>
    `${item.post_property_id || item.post_community_id}-${index}`
  }
  onEndReachedThreshold={0.8}
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
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "PopinRegular",
          }}
        >
          No Data Found
        </Text>
      )}

      {showImages && (
        <ImageSlider
          imageNo={imageNo}
          images={selectedImages}
          setShowImage={(val: boolean) => {
            setShowImages(val);
            setscrollable(true);
          }}
        />
      )}
            <Modal visible={showpost} animationType="slide" onRequestClose={() => setShowpost(false)} transparent={true}
              statusBarTranslucent={true}  >      
                  <SafeAreaView
                      style={{ flex: 1 }}
                      edges={[ "bottom", "left", "right"]}
                    >
                 <AddSingleView id={showpostPostData?.id} type={showpostPostData?.type} setshowModel={setShowpost} />
                 </SafeAreaView>     
            </Modal>
            <Loading isLoading={isLoading} text="Deleting..."/>
    </View>
  );
};

export default PastDealsagent;

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
    fontWeight: "bold",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    color: Colors.light.textGray,
    fontFamily: "PopinRegular",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegular",
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
