import {
  useDeletePostMutation,
  useGetPriceQuery,
  useGetUserWalletQuery,
  useUpgradePostApiMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import CommunitySatatus from "@assets/CreateProfile/construction-house.svg";
import Camera from "@assets/Feedimg/camera.svg";
import Area from "@assets/icons/MypostListing/area.svg";
import Bed from "@assets/icons/MypostListing/bed.svg";
import Delet from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import Shower from "@assets/icons/MypostListing/shower.svg";
import CommunityType from "@assets/SideBar/commercialGreen.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { formatPrice } from "@utils/PriceFormater";
import { router } from "expo-router";
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
import LargeButton from "../LaregeButton";
import Loading from "../Loading";
import PapPalPayment from "../PapPalPayment";
import { postDataType } from "./type";
const MyPostItem = ({
  item,
  type,
  user,
    id,
  setSingleView,
  setSinglePost,
  setSelectedImages,
  setShowImages,
  setscrollable,
  setShowoption,
  setUpgradeId,
  setSelectedPost,
 setUpgradePriceType,
  setDeleteModal,
  setDeleteType,
  handleDelete,
}: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
     activeOpacity={1}
      onPress={() => {
        setSingleView(true);
        setSinglePost({
          type,
          id:
            type === "community"
              ? item.post_community_id
              : item.post_property_id,
        });
      }}
    >
      <View className="bg-white" style={styles.card}>
             <View
                          className="flex-row justify-between items-center"
                          style={{
                            backgroundColor:
                              item?.post_type === "Trending"
                                ? Colors.light.LightGreen
                                : Colors.light.lightGray,
                            paddingHorizontal: hs(10),
                            paddingVertical: vs(10),
                            borderRadius: ms(10),
                            marginBottom: vs(10),
                          }}
                        >
                           {type === "community" ? (
                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                      fontWeight: 700,
                  fontSize: ms(20),
                    fontFamily: "PopinRegula",
                  }}
                >
                  From PKR {formatPrice(item.price1)}
                </Text>
              ) : (
                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                       fontWeight: 700,
                  fontSize: ms(20),
                    fontFamily: "PopinRegula",
                  }}
                >
                  PKR {formatPrice(item.asking_price)}{" "}
                  {type === "rent" && (
                    <Text
                      style={{
                        color: Colors.light.red,
                        fontFamily: "PopinRegula",
                            fontWeight: 700,
                                          fontSize: ms(20),
                      }}
                    >
                      /{item.rent_type}
                    </Text>
                  )}
                </Text>
              )}
                          {item?.post_type === "Trending" && (
                            <Text
                              style={{
                                    fontWeight: 700,
                  fontSize: ms(20),
                                color: Colors.light.DarkGreen,
                                fontFamily: "PopinRegular",
                              }}
                            >
                              Trending
                            </Text>
                          )}
                        </View>
            <View className="flex-row justify-between items-center">
       
              <View
                className="items-center"
                style={{ height: vs(40), width: hs(80) }}
              >
                <TouchableOpacity
                 activeOpacity={1}
                  className="justify-center"
                  style={{
                    height: vs(30),
                    width: hs(70),
                    backgroundColor: Colors.light.red,
                    borderRadius: 5,
                  }}
                  onPress={() => {}}
                >
                  <Text
                    className=" items-center text-white text-center"
                    style={{ fontFamily: "PopinRegula" }}
                  >
                    {type === "community" ? item.post_status : item.status}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {type === "community" ? (
              <Text
                style={{
                  color: Colors.light.textGray,
                  fontFamily: "PopinRegula",
                }}
              >
                {item.community_title}
              </Text>
            ) : (
              <Text
                style={{
                  color: Colors.light.textGray,
                  fontFamily: "PopinRegula",
                    fontWeight: 700,
                                  fontSize: ms(15),
                }}
              >
                {item.bedrooms} bedrooms {item.property_sub_type} for{" "}
                {item.property_for}
              </Text>
            )}
            <View>
              <Text style={styles.description}>
                {expanded
                  ? type === "community"
                    ? item.community_details
                    : item.property_details
                  : type === "community"
                  ? item.community_details?.slice(0, 70) +
                    (item.community_details?.length > 70 ? "...." : "")
                  : item.property_details?.slice(0, 70) +
                    (item.property_details?.length > 70 ? "...." : "")}

                {(type === "community"
                  ? item.community_details?.length
                  : item.property_details?.length) > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(!expanded)}
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
              >
                <Image
                  source={
                    item.images && item.images.length > 0
                      ? { uri: ImageFormater(item.images[0]) }
                      : NoImage
                  }
                  style={{
                    height: vs(180),
                    width: hs(320),
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
                    alignItems: "center",
                  }}
                  className="flex-row"
                >
                  <Camera />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontFamily: "PopinRegula",
                    }}
                  >
                    {" "}
                    {item.images ? item.images.length : 0}
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: vs(15),
                  marginTop: vs(10),
                }}
              >
                {type === "community" ? (
                  <>
                    <View className="flex-row items-center">
                      <CommunityType />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.community_type}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <CommunitySatatus />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.community_status}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View className="flex-row items-center">
                      <Bed />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.bedrooms}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Shower />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.bathrooms}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Area />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.land_area} sqft
                      </Text>
                    </View>
                  </>
                )}
              </View>

              <View
                className="flex-1 items-end"
                style={{
                  backgroundColor: Colors.light.cardgreenLight,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  marginTop: vs(8),
                  marginBottom: vs(10),
                }}
              >
                <CircleImage
                  source={{ uri: ImageFormater(item.profile_logo) }}
                  Size={35}
                />
              </View>
              {id===user.id.toString() &&(
                <>
              {item.post_type === "Normal" && (
 <LargeButton
  handleSubmit={() => {
    setSelectedPost(item);

    const isHoliday =
      item?.property_type?.trim().toLowerCase() === "holidays";

    let priceType = "";

    if (type === "community") {
      priceType = "community";
    } else if (isHoliday) {
      priceType =
        item?.property_for?.trim().toLowerCase() === "sale"
          ? "holiday_sale"
          : "holiday_rent";
    } else {
      priceType = item?.property_for?.trim().toLowerCase();
    }
console.log("FULL ITEM:", item);
    console.log("PROPERTY TYPE:", item?.property_type);
    console.log("PROPERTY FOR:", item?.property_for);
    console.log("PRICE TYPE SENT:", priceType);

    setUpgradePriceType(priceType);

    setUpgradeId(
      item.post_community_id || item.post_property_id
    );

    setShowoption(true);
  }}
  text="Upgrade ad to trending"
/>
              )}

              <View
                className="flex-row justify-between items-center"
                style={{ marginTop: vs(10), paddingHorizontal: hs(10) }}
              >
                <Text
                  style={{
                    color: Colors.light.textGray,
                    fontFamily: "PopinRegula",
                  }}
                >
                  Learn about trending ads
                </Text>
                <View className="flex-row ">
                  {((type === "community" && item.post_status === "Active") ||
  (type !== "community" && item.status === "Active")) &&(
                  <TouchableOpacity
                   activeOpacity={1}
                    style={{ marginRight: hs(10) }}
                    onPress={() => {
                      router.push({
                        params: {
                          edit: "true",
                          type: type,
                          id:
                            type === "community"
                              ? item.post_community_id
                              : item.post_property_id,
                        },
                        pathname:
                          type === "community"
                            ? "/(main)/postCommunity"
                            : "/(main)/PostProperty",
                      });
                    }}
                  >
                    <Edit />
                  </TouchableOpacity>)}
                  <TouchableOpacity
                   activeOpacity={1}
                    onPress={() => {
                      if (item.ad_by === "Agent") {
                         setSelectedPost(item);
                        setDeleteModal(true);
                       
                      } else {
                        setSelectedPost(item);
                        setDeleteType("Deleted");

                        Alert.alert(
                          "Confirm",
                          "Are you sure you want to delete?",
                          [
                            { text: "No" },
                            {
                              text: "Yes",
                              onPress: () => {
                                handleDelete(item, "Deleted", type);
                              },
                            },
                          ]
                        );
                      }
                    }}
                  >
                    <Delet />
                  </TouchableOpacity>
                </View>
              </View>
              </>)
  }
            </View>
          </View>
    </TouchableOpacity>
  );
};
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  type,
  hasmore,
  refetch,
  setpost,
  initialLoadDone,
  isShowpost,
  id,
  post_type,
}: postDataType) => {

  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [visible, setvisible] = useState(false);
  const [orderId, setOrderid] = useState("");
  const [upgradePriceType, setUpgradePriceType] = useState("");
  const[singlePost,setSinglePost] = useState<any>(null);
const [selectedPost, setSelectedPost] = useState<any>(null);
  const user = useAppSelector(userdata);
  const [singleView, setSingleView] = useState(false);
  const [upgradeId, setUpgradeId] = useState(0);
const priceType =
  type === "community"
    ? "community"
    : selectedPost?.property_type === "Holidays"
    ? selectedPost?.property_for === "sale"
      ? "holiday_sale"
      : "holiday_rent"
    : post_type?.toString();
const {
  data: advertisePrices,
  isLoading: PriceLoading,
  isFetching: PriceFetching,
} = useGetPriceQuery(
  {
    price_type: upgradePriceType,
  },
  {
    skip: !upgradePriceType,
  }
);


  const listRef = useRef<any>(null);
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const insets = useSafeAreaInsets();
  const [scrollable, setscrollable] = useState(true);
  const [timePeriod, setTimeperiod] = useState("");
  const [SelectedAmount, setSelectedAmount] = useState("");

  const [upgradePost, { isLoading: upgradeLoading }] =
    useUpgradePostApiMutation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    data: amount,
    isLoading: AmountLoading,
    isFetching,
  } = useGetUserWalletQuery({
    id: user.id,
  });
  const [showoption, setShowoption] = useState(false);
  const handleDelete = async (post, type, postType) => {
    try {
      await deletePost({
        post_id: post.post_property_id || post.post_community_id,
        type: postType,
        delete_type: type,
      });

      refetch();
      setpost((prev) =>
        prev.filter(
          (item) =>
            (item.post_property_id || item.post_community_id) !==
            (post.post_property_id || post.post_community_id)
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
 const handelSubmit = async (
  method: "Wallet" | "Paypal",
  paymentOrderId?: string
) => {
  try {
    const response = await upgradePost({
      post_id: upgradeId,
      type: type,
      days: timePeriod,
      user_id: user.id,
      paymentMethod: method,
      amount: SelectedAmount,

      // IMPORTANT
      order_id: paymentOrderId || null,
    }).unwrap();

    setShowoption(false);

    renderToastSuccess(
      response?.message || "Ad upgraded successfully"
    );

    refetch();

  } catch (e: any) {
    console.log("Upgrade error:", e);
    console.log("Upgrade error data:", e?.data);

    renderToastError(
      e?.data?.message || "Upgrade failed"
    );
  }
};
useEffect(() => {
  if (isShowpost) {
    setSingleView(true);
    setSinglePost({
      type: post_type,
      id,
    });
  }
}, [isShowpost, post_type, id]);
const renderItem = ({ item }: any) => (
 <MyPostItem
  item={item}
  type={type}
  user={user}
  id={id}
  setSingleView={setSingleView}
  setSinglePost={setSinglePost}
  setSelectedImages={setSelectedImages}
  setShowImages={setShowImages}
  setscrollable={setscrollable}
  setShowoption={setShowoption}
  setUpgradeId={setUpgradeId}
  setSelectedPost={setSelectedPost}
  setUpgradePriceType={setUpgradePriceType}
  setDeleteModal={setDeleteModal}
  setDeleteType={setDeleteType}
  handleDelete={handleDelete}
/>
);
  return (
    <View style={{ flex: 1, }}>
      {!initialLoadDone ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : data.length > 0 ? (
        <View className="flex-1">
      <FlashList
  data={data}
  scrollEnabled={scrollable}
  ref={listRef}
  renderItem={renderItem}
  keyExtractor={(item, index) =>
    `${item.post_property_id || item.post_community_id}-${index}`
  }
  onEndReached={() => {
    if (!isfetching && hasmore) {
      setPage((prev) => prev + 1);
    }
  }}
  onEndReachedThreshold={0.6}
  ListFooterComponent={
    isfetching ? <ActivityIndicator size="small" /> : null
  }
  refreshControl={
    <RefreshControl
      refreshing={isfetching}
      onRefresh={() => {
        setPage(1);
        refetch();
      }}
    />
  }
/>
        </View>
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "PopinRegula",
          }}
        >
          No Data Found
        </Text>
      )}

      {showImages && (
        <ImageSlider
          images={selectedImages}
          setShowImage={(val: boolean) => {
            setShowImages(val);
            setscrollable(true);
          }}
        />
      )}
      <Modal visible={showoption} animationType="fade" transparent={true}>
        <SafeAreaView
                                                                                                                     style={{ flex: 1 }}
                                                                                                                     edges={[ "bottom", "left", "right"]}
                                                                                                                   >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(31, 31, 31, 0.5)", // semi-transparent background
            justifyContent: "center",
            paddingHorizontal: hs(5),
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(10),
              padding: hs(5),
              maxHeight: "90%",
              flex:1
            }}
          >
            <TouchableOpacity
  activeOpacity={0.7}
  onPress={() => setShowoption(false)}
  style={{
    position: "absolute",
    top: vs(2),
    right: hs(10),
    zIndex: 50,

    width: ms(38),
    height: ms(38),
    borderRadius: ms(19),

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F2F2F2",
  }}
>
  <Text
    style={{
      fontSize: ms(28),
      fontWeight: "700",
      lineHeight: ms(30),
      color: "#222",
    }}
  >
    ×
  </Text>
</TouchableOpacity>
<>
  {PriceLoading || PriceFetching ? (
    <View
      style={{
        height: vs(120),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color={Colors.light.DarkGreen}
      />

      <Text
        style={{
          marginTop: vs(10),
          fontFamily: "PopinRegula",
          color: Colors.light.textGray,
        }}
      >
        Loading prices...
      </Text>
    </View>
  ) : (
            <FlashList
  data={advertisePrices?.data ?? []}
  keyExtractor={(item) => item.id.toString()}
  extraData={timePeriod}
  ListHeaderComponent={
    <View
      className="flex-row justify-between items-center"
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.light.textGray,
        borderRadius: ms(5),
        paddingHorizontal: hs(10),
        paddingVertical: vs(10),
      }}
    >
      <Text style={{ fontFamily: "PopinRegula" }}>
        Advertise Time
      </Text>

      <Text style={{ fontFamily: "PopinRegula" }}>
        Price
      </Text>
    </View>
  }
  renderItem={({ item: valueitem }) => (
    <View
      className="flex-row justify-between items-center"
      style={{
        paddingHorizontal: hs(10),
        paddingVertical: vs(10),
      }}
    >
      <View className="flex-row items-center">
        <TouchableOpacity
         activeOpacity={1}
          onPress={() => {
            setTimeperiod(valueitem.life);
            setSelectedAmount(valueitem.price);
          }}
        >
          <MaterialIcons
            size={20}
            color={Colors.light.DarkGreen}
            name={
              timePeriod === valueitem.life
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
          />
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: hs(10),
            fontFamily: "PopinRegula",
          }}
        >
          For {valueitem.life} Days
        </Text>
      </View>

      <Text style={{ fontFamily: "PopinRegula" }}>
        PKR {valueitem.price}
      </Text>
    </View>
  )}
/>
 )}
</>
            <View
              style={{
                height: vs(1),
                marginTop: vs(20),
                marginBottom: vs(10),
                backgroundColor: Colors.light.textGray,
                opacity: 0.2,
              }}
            />

            <Text
              style={{
                fontSize: ms(15),
                fontWeight: "600",
                fontFamily: "PopinRegula",
              }}
            >
              Select your payment method
            </Text>
            <View style={styles.card2} className="items-center">
              <Text
                style={{
                  fontSize: ms(15),
                  fontWeight: "600",
                  fontFamily: "PopinRegula",
                }}
              >
                Your Homeilove account balance
              </Text>
              {AmountLoading || isFetching ? (
                <ActivityIndicator size="small" color={Colors.light.red} />
              ) : (
                <Text
                  style={{
                    marginVertical: vs(10),
                    color: Colors.light.red,
                    fontSize: ms(15),
                    fontWeight: "600",
                    fontFamily: "PopinRegula",
                  }}
                >
                  {amount.amount}
                </Text>
              )}
              <Text
                className="text-center mb-5"
                style={{
                  color: Colors.light.textGray,
                  fontFamily: "PopinRegula",
                }}
              >
                Have more ads to post then buy bundle and get extra discount.
                You’ can use credit any time means no expiry!
              </Text>
              <LargeButton
                text="Add Credits"
                handleSubmit={() => router.push("/BuyCredit")}
              />
            </View>

            <View style={styles.card2}>
              <Text style={styles.title}>Pay and Ad post Atomaticlly</Text>

            <TouchableOpacity
  activeOpacity={0.85}
  className="mb-4"
  style={styles.paypalMainButton}
  onPress={async () => {
    if (!SelectedAmount) {
      alert("Please select bundle first");
      return;
    }

    setvisible(true);
  }}
>
  <View style={styles.paypalContent}>
    <View style={styles.alfalahHeader}>
      <MaterialIcons
        name="account-balance-wallet"
        size={27}
        color="#FFFFFF"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.paypalText}>
          Pay via Bank Alfalah
        </Text>

        <Text style={styles.alfalahSubtitle}>
          Cards, Wallet & QR Payments
        </Text>
      </View>

      <MaterialIcons
        name="arrow-forward-ios"
        size={17}
        color="#FFFFFF"
      />
    </View>

    <View style={styles.alfalahDivider} />

    <View style={styles.alfalahMethods}>
      <View style={styles.alfalahMethod}>
        <MaterialIcons
          name="credit-card"
          size={22}
          color="#FFFFFF"
        />
        <Text style={styles.alfalahMethodText}>
          Debit / Credit Card
        </Text>
      </View>

      <View style={styles.alfalahMethod}>
        <MaterialIcons
          name="account-balance-wallet"
          size={22}
          color="#FFFFFF"
        />
        <Text style={styles.alfalahMethodText}>
          JazzCash Wallet
        </Text>
      </View>

      <View style={styles.alfalahMethod}>
        <MaterialIcons
          name="qr-code-2"
          size={22}
          color="#FFFFFF"
        />
        <Text style={styles.alfalahMethodText}>
          QR Code
        </Text>
      </View>
    </View>
  </View>
</TouchableOpacity>
              <LargeButton
                handleSubmit={() => {
                  if (!SelectedAmount) {
                    alert("Please select bundle first");
                    return;
                  }
                  if (amount.amount >= Number(SelectedAmount)) {
                    setPaymentMethod("Wallet");
                    handelSubmit("Wallet");
                  } else {
                    renderToastError(
                      "You don't have enough amount in wallet, please recharge"
                    );
                  }
                }}
                text="Pay with wallet"
              />
            </View>
          </View>
        </View>
        </SafeAreaView>
            <Loading isLoading={upgradeLoading} text="Loading.." />
      </Modal>
      <Modal visible={deleteModal} transparent={true} animationType="fade">
         <SafeAreaView
                                                                                                                     style={{ flex: 1 }}
                                                                                                                     edges={[ "bottom", "left", "right"]}
                                                                                                                   >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(54, 52, 52, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "85%",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 15 }}>
              Delete Ad Options
            </Text>

            <TouchableOpacity
             activeOpacity={1}
              style={{ marginBottom: 15 }}
              onPress={() => {
                setDeleteType("Past");
                setDeleteModal(false);

                Alert.alert("Confirm", "Are you sure you want to delete?", [
                  { text: "No" },
                  {
                    text: "Yes",
                    onPress: () => {
                      handleDelete(selectedPost, "Past", type);
                    },
                  },
                ]);
              }}
            >
              <Text style={{ color: "black" }}>
                Delete but add to my profile as past deals
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
             activeOpacity={1}
              onPress={() => {
                setDeleteType("Deleted");
                setDeleteModal(false);

                Alert.alert("Confirm", "Are you sure you want to delete?", [
                  { text: "No" },
                  {
                    text: "Yes",
                    onPress: () => {
                      handleDelete(selectedPost, "Deleted", type);
                    },
                  },
                ]);
              }}
            >
              <Text style={{ color: "red" }}>
                Delete Ad & don't add to profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
             activeOpacity={1}
              style={{ marginTop: 20 }}
              onPress={() => setDeleteModal(false)}
            >
              <Text style={{ textAlign: "center", color: "gray" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
      </Modal>
      <Loading isLoading={isLoading} text="Deleting.." />
   
<PapPalPayment
  amount={SelectedAmount}
  onPress={async (order_id, setApproveUrl) => {
    try {
      console.log("PAYPAL ORDER ID:", order_id);

      setPaymentMethod("Paypal");
      setOrderid(String(order_id));

      // IMPORTANT: order id yahan directly pass karo
      await handelSubmit(
        "Paypal",
        String(order_id)
      );

      setvisible(false);
      setApproveUrl(null);

    } catch (error) {
      console.log("PAYPAL UPGRADE ERROR:", error);

      renderToastError("Something went wrong");
    }
  }}
  setVisible={setvisible}
  visible={visible}
/>
        <Modal visible={singleView} animationType="slide" onRequestClose={() => setSingleView(false)} transparent={true}
                      statusBarTranslucent={true}  >
                         <SafeAreaView
                                                                                                                     style={{ flex: 1 }}
                                                                                                                     edges={[ "bottom", "left", "right"]}
                                                                                                                   >
                      <AddSingleView id={singlePost?.id} type={singlePost?.type} setshowModel={setSingleView} />
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
  paypalMainButton: {
  backgroundColor: "#c21c1c",
  borderRadius: 14,
  paddingVertical: 16,
  paddingHorizontal: 15,
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.15,
  shadowRadius: 5,
},

paypalContent: {
  flexDirection: "column",
},

alfalahHeader: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

paypalText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

alfalahSubtitle: {
  color: "#D8EDE4",
  fontSize: 12,
  marginTop: 4,
},

alfalahDivider: {
  height: 1,
  backgroundColor: "rgba(255,255,255,0.25)",
  marginVertical: 14,
},

alfalahMethods: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
},

alfalahMethod: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
},

alfalahMethodText: {
  color: "#FFFFFF",
  fontSize: 10,
  fontWeight: "600",
  textAlign: "center",
},
  name: {
    fontWeight: "bold",
    fontFamily: "PopinRegula",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    fontFamily: "PopinRegula",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
  title: {
    fontSize: ms(14),
    textAlign: "center",
    fontWeight: "500",
    marginBottom: vs(15),
    fontFamily: "PopinRegula",
  },

  paymentOptions: {
    marginTop: vs(30),
  },
  paymentButton: {
    flexDirection: "row",
    borderRadius: ms(8),
    alignItems: "center",
    justifyContent: "center",
    height: vs(40),
    marginBottom: vs(10),
  },
  paymentText: {
    color: "white",
    fontSize: ms(14),
    fontWeight: "600",
    marginLeft: hs(8),
  },


  card2: {
    marginVertical: vs(20),
    backgroundColor: "white",
    borderRadius: ms(8),
    elevation: 5,
    paddingVertical: vs(10),
    paddingHorizontal: hs(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
