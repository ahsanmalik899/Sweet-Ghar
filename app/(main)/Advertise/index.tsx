import {
  useGetUserAdvertisementsQuery,
  useGetUserWalletQuery,
  useLazyGetAdvatizementPriceQuery,
  usePostAdvatizementMutation,
  useUpdateAdvertisementMediaMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import communitySingleView from "@assets/AdsShowFolder/community singleview.jpg";
import communityListing from "@assets/AdsShowFolder/communityListing.jpg";
import connections from "@assets/AdsShowFolder/connections.jpg";
import Newsfeeed from "@assets/AdsShowFolder/newsfeed.jpg";
import profileListing from "@assets/AdsShowFolder/profilelisting.jpg";
import profileSingleview from "@assets/AdsShowFolder/profilesingleview.jpg";
import propertyListing from "@assets/AdsShowFolder/propertyListing.jpg";
import propertySingleView from "@assets/AdsShowFolder/propertySingleView.jpg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import AdvatiseBaner from "@assets/SideBar/advertisementpic.svg";
import Connection from "@assets/SideBar/connection.svg";
import HomeFeed from "@assets/SideBar/homeFeed.svg";
import Listipage1 from "@assets/SideBar/listingPage1.svg";
import Listipage2 from "@assets/SideBar/listinpage2.svg";
import TimeLine from "@assets/SideBar/timeline.svg";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

import { AdCardWithoutAnimation } from "@src/AdCardWithoutAnimation";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import PapPalPayment from "@src/components/globals/PapPalPayment";
import PromotionPricingCard from "@src/components/globals/PromotionPricingCard";
import TablikeButton from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Yup from "yup";
const index = () => {
  const user = useAppSelector(userdata);
  const [showInfoPage, setShowInfopage] = useState(false);
  const [showAdvatizeFrom, setShowAdvatizeForm] = useState(false);
  const [advatizeinfoType, setAdvatizeinfoType] = useState("Homefeed");
  const [listingInfo, setListingInfo] = useState("ListingDetail");
  const [EditAdData, setEditAdData] = useState(null);
  const [showMaintenanceOptions, setShowMaintenanceOptions] = useState(false);
  const [timePeriod, setTimeperiod] = useState("");
  const [EditAd, setEditAd] = useState(false);
  const [getprice, { data: promotionPrices, isFetching: pricesFetching }] =
    useLazyGetAdvatizementPriceQuery();
  const [PostAdvatizement, { isLoading }] = usePostAdvatizementMutation();
  const { data: Myadvatizemants, isFetching: myad_fetching } =
    useGetUserAdvertisementsQuery({ user_id: user.id });
  const [visible, setvisible] = useState(false);
  const [page, setpage] = useState("");
  const [updateAdvertisementMedia, { isLoading: updateadloading }] =
    useUpdateAdvertisementMediaMutation();
  const [subPage, setSubpage] = useState("");
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [showAdPreview, setShowAdPreview] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-2deg", "2deg"],
  });

  const AdvatizeSchema = Yup.object().shape({
    start_date: Yup.string().required("Start date is required"),

    end_date: Yup.string().required("Expiry date is required"),

    ad_link: Yup.string()
      .url("Please enter a valid URL")
      .required("Ad link is required"),
    business_cover: Yup.mixed().required("Image is required"),
    on_page: Yup.string()
      .required("Page selection is required")
      .test(
        "valid-page",
        "Please select a sub page",
        (value) =>
          value !== "listing" &&
          value !== "listing_details" &&
          value !== "maintenance_single" &&
          value !== "maintenance"
      ),
  });
  const EditAdvatizeSchema = Yup.object().shape({
    ad_link: Yup.string()
      .url("Please enter a valid URL")
      .required("Ad link is required"),
    business_cover: Yup.mixed().required("Image is required"),
  });
  const {
    data: amount,
    isLoading: AmountLoading,
    isFetching,
  } = useGetUserWalletQuery({
    id: user.id,
  });
  const [SelectedAmount, setSelectedAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderid, setOrderid] = useState("");
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  const Listingcomponenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <Listipage1 height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        When user view his love home then he will view your ad
      </Text>
      <Text
        style={{
          fontSize: ms(20),
          fontWeight: "600",
          fontFamily: "PopinRegula",
        }}
      >
        PKR 15 / Day
      </Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula" }}>
          • Another busiest segment where users search their homing needs and
          that where we will present your ad at top most prominent place.
          {"\n\n"}• Target your audience as per your ad requirements e.g. if
          broker then place ad at sale & rent ad's detailing page, if developer
          then place ad at new communities listing segment.
          {"\n\n"}• You can advertise your ad as per your budget reuirements
          i.e. how many days you want to run your advertisement.( * Promotion is
          based on minimum 1 day and maximum days you want)
          {"\n\n"}• Your ad will be place at top of listings details page which
          gives your ad a Must See.
        </Text>
      </View>
    </View>
  );
  const Listingcomponenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <Listipage2 height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Present your brand / business at core segment of portal
      </Text>
      <Text
        style={{
          fontSize: ms(20),
          fontWeight: "600",
          fontFamily: "PopinRegula",
        }}
      >
        PKR 10 / Day
      </Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula" }}>
          •You have 7 best choices to present your ad at Property for sale &
          rent , New communities, businesses profiles listing pages.
          {"\n\n"}•Target your audience as per your ad requirements e.g. if
          broker then place ad at sale & rent listing, if developer then place
          ad at new communities listing segment.
          {"\n\n"}• You can advertise your ad as per your budget reuirements
          i.e. how many days you want to run your advertisement.( * Promotion is
          based on minimum 1 day and maximum days you want)
          {"\n\n"}• Your ad will be place between listings which gives your
          brand projection to highly concerned viewership.
        </Text>
      </View>
    </View>
  );
  const componenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <HomeFeed height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Present your brand / business at most visited segment for
      </Text>
      <Text
        style={{
          fontSize: ms(20),
          fontWeight: "600",
          fontFamily: "PopinRegula",
        }}
      >
        PKR 5/ Day
      </Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula" }}>
          • Most busiest section where every user see all the activities of
          connections and preferred properties & communities.
          {"\n\n"}• No chance to miss your advertisement as your ad will be
          placed most prominent place of page.
          {"\n\n"}• You can promote your business as per your budget
          requirements i.e. how many days you want to run your advertisement. (*
          Promotion is based on minimum 1 day and maximum days you want) .
          {"\n\n"}• Far more reach of your business to get more connectivity
          with users means more engagements of your business.
        </Text>
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <TimeLine height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Market your brand to user's own timeline page for
      </Text>
      <Text
        style={{
          fontSize: ms(20),
          fontWeight: "600",
          fontFamily: "PopinRegula",
        }}
      >
        PKR 25 / Day
      </Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula" }}>
          • Every user view its own activities and thats where your ad will be
          placed.{"\n\n"}• Prominent place for your advertisement at our another
          busiest segement.{"\n\n"}• You can promote your business as per your
          budget reuirements i.e. how many days you want to run your
          advertisement.( * Promotion is based on minimum 1 day and maximum days
          you want)
          {"\n\n"}• Far more reach of your business to get more connectivity
          with users means more engagements of your business .
        </Text>
      </View>
    </View>
  );
  const componenet3 = (
    <View style={{ marginTop: vs(10) }}>
      <Connection height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Most economical yet results producing place for your ad at
      </Text>
      <Text
        style={{
          fontSize: ms(20),
          fontWeight: "600",
          fontFamily: "PopinRegula",
        }}
      >
        PKR 20 / Day
      </Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula" }}>
          • Your ad will be placed at user's list of connections at very
          economical rates.
          {"\n\n"}• Prominent place for your advertisement at another decent
          traffic segment.
          {"\n\n"}• You can promote your business as per your budget reuirements
          i.e. how many days you want to run your advertisement.( * Promotion is
          based on minimum 1 day and maximum days you want).
          {"\n\n"}• Far more reach of your business to get more connectivity
          with users means more engagements of your business .
        </Text>
      </View>
    </View>
  );
  if (showInfoPage) {
    return (
      <ScrollView>
        <View className="flex-1 bg-white">
          <HeaderWithBack
            onBackpress={() => {
              setShowInfopage(false);
            }}
          />
          <View style={{ marginHorizontal: hs(20), marginTop: vs(30) }}>
            <Text className="font-bold" style={{ fontFamily: "PopinRegula" }}>
              Market your Brand or Business on Nation's smartest real-estate
              platform Tranparent - Targeted- Economical
            </Text>
            <Text
              style={{
                marginTop: vs(30),
                marginBottom: vs(10),
                fontFamily: "PopinRegula",
              }}
            >
              Advertisement options at different segments to give you targeted
              audiences right for your marketing needs.We have five major
              segements where you can market your business
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(16),
              elevation: 5,
              marginHorizontal: hs(10),
              paddingBottom: vs(10),
              paddingHorizontal: hs(10),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TablikeButton
              btn1value="Homefeed"
              btn2value="Timeline"
              btn3value="Connections"
              btnTxt1="Homefeed"
              btnTxt2="Timeline"
              btnTxt3="Connections"
              Componet1={componenet1}
              Componet2={componenet2}
              Componet3={componenet3}
              value={advatizeinfoType}
              onPress={(value) => {
                setAdvatizeinfoType(value);
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(16),
              elevation: 5,
              marginTop: vs(20),
              marginHorizontal: hs(10),
              paddingBottom: vs(10),
              paddingHorizontal: hs(10),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TablikeButton
              btn1value="ListingDetail"
              btn2value="ListingPage"
              btnTxt1="Listing details pages"
              btnTxt2="Listing pages"
              Componet1={Listingcomponenet1}
              Componet2={Listingcomponenet2}
              value={listingInfo}
              onPress={(value) => {
                setListingInfo(value);
              }}
            />
          </View>
          <Text
            style={{
              marginTop: vs(20),
              fontSize: ms(12),
              fontWeight: "500",
              marginHorizontal: hs(20),
              fontFamily: "PopinRegula",
            }}
          >
            Let's start rolling your brand's marketing.Select best placement for
            your brand with best results!
          </Text>
          <Text
            style={{
              marginTop: vs(10),
              color: Colors.light.red,
              fontWeight: "500",
              marginHorizontal: hs(20),
              fontFamily: "PopinRegula",
            }}
          >
            So give new shine to your brand
          </Text>
          <View style={{ marginHorizontal: hs(20), marginVertical: vs(20) }}>
            <LargeButton
              handleSubmit={() => {
                setShowAdvatizeForm(true);
                setShowInfopage(false);
              }}
              text="Place your Ad"
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  const pageImages = {
    newsfeed: Newsfeeed,
    connections: connections,

    sale: propertyListing,
    sale_single: propertySingleView,

    rent: propertyListing,
    rent_single: propertySingleView,

    community: communityListing,
    community_single: communitySingleView,

    agent: profileListing,
    agent_single: profileSingleview,

    developer: profileListing,
    developer_single: profileSingleview,

    mortgage: profileListing,
    mortgage_single: profileSingleview,

    maintenance: profileListing,
    maintenance_single: profileSingleview,
  };
  const pageTypeMap: Record<string, string> = {
    newsfeed: "Newsfeed",
    connections: "Connection",
    listing: "Listing",
    listing_details: "Single View",
  };

  if (showAdvatizeFrom) {
    return (
      <>
        <ScrollView>
          <View className="flex-1 bg-white">
            <HeaderWithBack
              onBackpress={() => {
                setShowAdvatizeForm(false);
              }}
            />
            <View style={{ marginHorizontal: hs(20), marginVertical: vs(20) }}>
              <Text
                style={{
                  fontSize: ms(20),
                  fontWeight: "500",
                  fontFamily: "PopinRegula",
                }}
              >
                Making your brand more
                <Text
                  style={{ color: Colors.light.red, fontFamily: "PopinRegula" }}
                >
                  SHINING
                </Text>
                with us !
              </Text>
              <Formik
                initialValues={{
                  start_date: "",
                  end_date: "",
                  ad_link: "",
                  on_page: "",
                  business_cover: null,
                  user_id: user.id,
                  total_price: 0,
                  paymentMethod: "",
                  order_id: "",
                  ad_life: "",
                }}
                validationSchema={AdvatizeSchema}
                onSubmit={async (values) => {
                  try {
                    const formData = new FormData();

                    Object.keys(values).forEach((key) => {
                      if (
                        key !== "business_cover" &&
                        values[key] !== undefined &&
                        values[key] !== null
                      ) {
                        formData.append(key, String(values[key]));
                      }
                    });

                    // Append image
                    if (values.business_cover?.uri) {
                      formData.append("business_cover", {
                        uri: values.business_cover.uri,
                        name: values.business_cover.name ?? "advertisement.jpg",
                        type: values.business_cover.type ?? "image/jpeg",
                      } as any);
                    }
                    formData.append("total_price", SelectedAmount);
                    const response = await PostAdvatizement(formData).unwrap();

                    // ✅ SUCCESS TOAST
                    renderToastSuccess(
                      response?.message ||
                        "Advertisement submitted successfully"
                    );
                    router.back();
                  } catch (error: any) {
                    console.log("Submit error:", error);

                    if (error?.data?.errors) {
                      const firstError = Object.values(
                        error.data.errors
                      )[0] as string[];
                      renderToastError(firstError[0]);
                      return;
                    }

                    renderToastError(
                      error?.data?.message || "Something went wrong. Try again."
                    );
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <View
                      className="flex-row justify-between"
                      style={{ marginTop: vs(10), gap: hs(5) }}
                    >
                      <TouchableOpacity
                       activeOpacity={1}
                        style={[
                          styles.btn,
                          values.on_page === "newsfeed" && styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "newsfeed");

                          getprice({ type: pageTypeMap["newsfeed"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "newsfeed" ? "white" : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          News Feed
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                       activeOpacity={1}
                        style={[
                          styles.btn,
                          values.on_page === "connections" &&
                            styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "connections");
                          getprice({ type: pageTypeMap["connections"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "connections"
                                ? "white"
                                : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Connections
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      className="flex-row justify-between"
                      style={{ marginTop: vs(10), gap: hs(5) }}
                    >
                      <TouchableOpacity
                       activeOpacity={1}
                        style={[
                          styles.btn,
                          values.on_page === "listing" && styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "listing");
                          getprice({ type: pageTypeMap["listing"] });
                          setpage("listing");
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "listing" ? "white" : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Listing Pages
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                       activeOpacity={1}
                        style={[
                          styles.btn,
                          values.on_page === "listing_details" &&
                            styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "listing_details");
                          setpage("listing_details");
                          getprice({ type: pageTypeMap["listing_details"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "listing_details"
                                ? "white"
                                : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Listing deatil pages
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {values.on_page &&
                      values.on_page !== "newsfeed" &&
                      values.on_page !== "connections" && (
                        <>
                          <View
                            style={{
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              borderRightWidth: 1,
                              marginTop: vs(20),
                              marginBottom: vs(10),
                              opacity: 0.15,
                              borderColor: Colors.light.textGray,
                              borderRadius: ms(5),
                            }}
                          />
                          <Text
                            style={{
                              fontSize: ms(15),
                              fontWeight: "600",
                              fontFamily: "PopinRegula",
                            }}
                          >
                            {page === "listing"
                              ? "Listing Pages"
                              : "Detail Pages"}
                          </Text>
                          <View
                            className="flex-row justify-between"
                            style={{ marginTop: vs(10), gap: hs(5) }}
                          >
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "sale" ||
                                  values.on_page === "sale_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "sale")
                                    : setFieldValue("on_page", "sale_single");
                                }

                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "sale" ||
                                    values.on_page === "sale_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                For Sale
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "rent" ||
                                  values.on_page === "rent_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "rent")
                                    : setFieldValue("on_page", "rent_single");
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "rent" ||
                                    values.on_page === "rent_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                For Rent
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            className="flex-row justify-between"
                            style={{ marginTop: vs(10), gap: hs(5) }}
                          >
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "community" ||
                                  values.on_page === "community_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "community")
                                    : setFieldValue(
                                        "on_page",
                                        "community_single"
                                      );
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "community" ||
                                    values.on_page === "community_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                New Community
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "agent" ||
                                  values.on_page === "agent_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "agent")
                                    : setFieldValue("on_page", "agent_single");
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "agent" ||
                                    values.on_page === "agent_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Agents
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            className="flex-row justify-between"
                            style={{ marginTop: vs(10), gap: hs(5) }}
                          >
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "developer" ||
                                  values.on_page === "developer_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "developer")
                                    : setFieldValue(
                                        "on_page",
                                        "developer_single"
                                      );
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "developer" ||
                                    values.on_page === "developer_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Developers
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "mortgage" ||
                                  values.on_page === "mortgage_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "mortgage")
                                    : setFieldValue(
                                        "on_page",
                                        "mortgage_single"
                                      );
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "mortgage" ||
                                    values.on_page === "mortgage_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontSize: ms(11),
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Mortgage Providers
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            className="flex-row justify-between"
                            style={{ marginTop: vs(10), gap: hs(5) }}
                          >
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "investor" ||
                                  values.on_page === "investor_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "investor")
                                    : setFieldValue(
                                        "on_page",
                                        "investor_single"
                                      );
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "investor" ||
                                    values.on_page === "investor_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Investors
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                             activeOpacity={1}
                              style={[
                                styles.btn,
                                (values.on_page === "maintenance" ||
                                  values.on_page === "maintenance_single") &&
                                  styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setShowMaintenanceOptions(true);
                                {
                                  page === "listing"
                                    ? setFieldValue("on_page", "maintenance")
                                    : setFieldValue(
                                        "on_page",
                                        "maintenance_single"
                                      );
                                }
                                getprice({ type: pageTypeMap[page] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "maintenance" ||
                                    values.on_page === "maintenance_single"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Home maintenance
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    {values.on_page && showMaintenanceOptions && (
                      <View>
                           <View
                            style={{
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              borderRightWidth: 1,
                              marginTop: vs(20),
                              marginBottom: vs(10),
                              opacity: 0.15,
                              borderColor: Colors.light.textGray,
                              borderRadius: ms(5),
                            }}
                          />
                        <View
                          className="flex-row justify-between"
                          style={{ marginTop: vs(10), gap: hs(5) }}
                        >
                          <TouchableOpacity
                           activeOpacity={1}
                            style={[
                              styles.btn,
                              (values.on_page === "decor" ||
                                values.on_page === "decor_single") &&
                                  styles.btnselected,
                              { flex: 1 },
                            ]}
                            onPress={() => {
                              {
                                page === "listing"
                                  ? setFieldValue("on_page", "decor")
                                  : setFieldValue("on_page", "decor_single");
                              }
                              getprice({ type: pageTypeMap[page] });
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  values.on_page === "decor" ||
                                  values.on_page === "decor_single"
                                    ? "white"
                                    : "black",
                                fontWeight: 600,
                                fontFamily: "PopinRegula",
                              }}
                            >
                              Home decor
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                           activeOpacity={1}
                            style={[
                              styles.btn,
                              (values.on_page === "electrician" ||
                                values.on_page === "electrician_single") &&
                                styles.btnselected,
                              { flex: 1 },
                            ]}
                            onPress={() => {
                              {
                                page === "listing"
                                  ? setFieldValue("on_page", "electrician")
                                  : setFieldValue("on_page", "electrician_single");
                              }
                              getprice({ type: pageTypeMap[page] });
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  values.on_page === "electrician" ||
                                  values.on_page === "electrician_single"
                                    ? "white"
                                    : "black",
                                fontWeight: 600,
                                fontFamily: "PopinRegula",
                              }}
                            >
                              Electricians
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          className="flex-row justify-between"
                          style={{ marginTop: vs(10), gap: hs(5) }}
                        >
                          <TouchableOpacity
                           activeOpacity={1}
                            style={[
                              styles.btn,
                              (values.on_page === "plumber" ||
                                values.on_page === "plumber_single") &&
                                  styles.btnselected,
                              { flex: 1 },
                            ]}
                            onPress={() => {
                              {
                                page === "listing"
                                  ? setFieldValue("on_page", "plumber")
                                  : setFieldValue("on_page", "plumber_single");
                              }
                              getprice({ type: pageTypeMap[page] });
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  values.on_page === "plumber" ||
                                  values.on_page === "plumber_single"
                                    ? "white"
                                    : "black",
                                fontWeight: 600,
                                fontFamily: "PopinRegula",
                              }}
                            >
                              Plumbers
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                           activeOpacity={1}
                            style={[
                              styles.btn,
                              (values.on_page === "painter" ||
                                values.on_page === "painter_single") &&
                                styles.btnselected,
                              { flex: 1 },
                            ]}
                            onPress={() => {
                              {
                                page === "listing"
                                  ? setFieldValue("on_page", "painter")
                                  : setFieldValue("on_page", "painter_single");
                              }
                              getprice({ type: pageTypeMap[page] });
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  values.on_page === "painter" ||
                                  values.on_page === "painter_single"
                                    ? "white"
                                    : "black",
                                fontWeight: 600,
                                fontFamily: "PopinRegula",
                              }}
                            >
                              Painters
                            </Text>
                          </TouchableOpacity>
             
                        </View>
                                     <TouchableOpacity
                                     className="mt-3"
  activeOpacity={1}
  style={[
    styles.btn,
    (values.on_page === "material_supplier" ||
      values.on_page === "material_supplier_single") &&
      styles.btnselected,
    { flex: 1 },
  ]}
  onPress={() => {
    page === "listing"
      ? setFieldValue("on_page", "material_supplier")
      : setFieldValue("on_page", "material_supplier_single");

    getprice({ type: pageTypeMap[page] });
  }}
>
  <Text
    style={{
      color:
        values.on_page === "material_supplier" ||
        values.on_page === "material_supplier_single"
          ? "white"
          : "black",
      fontWeight: 600,
      fontFamily: "PopinRegula",
    }}
  >
    Material Supplier
  </Text>
</TouchableOpacity>
                      </View>
                    )}
                    {touched && errors && (
                      <Text
                        style={{
                          color: Colors.light.red,
                          marginTop: vs(5),
                          fontFamily: "PopinRegula",
                        }}
                      >
                        {errors.on_page}
                      </Text>
                    )}
                    <View
                      style={{
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                        marginVertical: vs(20),
                        opacity: 0.15,
                        borderColor: Colors.light.textGray,
                        borderRadius: ms(5),
                      }}
                    />

                    <FormikInput
                      title="Link of ad"
                      placeholder="www.abc.com"
                      onChangeText={handleChange("ad_link")}
                      onBlur={handleBlur("ad_link")}
                      value={values.ad_link}
                      touched={!!touched.ad_link}
                      errors={!!errors.ad_link}
                      required
                      errorText={errors.ad_link}
                    />
                    <View
                      style={{
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                        marginVertical: vs(20),
                        borderColor: Colors.light.textGray,
                        borderRadius: ms(5),
                        opacity: 0.15,
                      }}
                    />
                    <UploadPic
                      Logo={Profilelogo}
                      text1="Upload "
                      text2="Ad"
                      additionalText={
                        "Recomended size 1based on selection\n above plz discuss"
                      }
                      border
                      limt={1}
                      name="business_cover"
                      setValue={setFieldValue}
                      value={values.business_cover}
                    />
                    {errors.business_cover && (
                      <Text style={{ color: "red" }}>
                        {errors.business_cover}
                      </Text>
                    )}
                    <LargeButton
                      handleSubmit={() => {
                        setShowAdPreview(!showAdPreview);
                        console.log(values.on_page);
                      }}
                      text={showAdPreview ? "Hide your Ad" : "View your Ad"}
                    />
                    <Modal
                      visible={showAdPreview && !!values.business_cover}
                      transparent={true}
                      animationType="fade"
                      onRequestClose={() => setShowAdPreview(false)}
                    >
                                    <SafeAreaView
                          style={{ flex: 1 }}
                          edges={[ "bottom", "left", "right"]}
                        >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                      >
                        <ImageBackground
                          source={pageImages[values.on_page.toString()]}
                          style={styles.adContainer}
                          resizeMode="cover"
                        >
                          <View
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0,0,0,0.4)",
                            }}
                          />
                          {values.on_page === "newsfeed" ? (
                            <View style={{ marginTop: vs(260) }}>
                              <AdCardWithoutAnimation
                                isSqure={true}
                                ad={values}
                              />
                            </View>
                          ) : values.on_page === "connections" ? (
                            <View style={{ marginTop: vs(418) }}>
                              <AdCardWithoutAnimation
                                isSqure={false}
                                ad={values}
                              />
                            </View>
                          ) : values.on_page === "sale" ||
                            values.on_page === "rent" ? (
                            <View style={{ marginTop: vs(440) }}>
                              <AdCardWithoutAnimation
                                isSqure={false}
                                ad={values}
                              />
                            </View>
                          ) : values.on_page === "community" ? (
                            <View style={{ marginTop: vs(380) }}>
                              <AdCardWithoutAnimation
                                isSqure={false}
                                ad={values}
                              />
                            </View>
                          ) : values.on_page === "agent" ||
                            values.on_page === "developer" ||
                            values.on_page === "mortgage" ||
                            values.on_page === "maintenance" ? (
                            <View style={{ marginTop: vs(385) }}>
                              <AdCardWithoutAnimation
                                isSqure={false}
                                ad={values}
                              />
                            </View>
                          ) : (
                            <View style={{ marginTop: vs(50) }}>
                              <Animated.View
                                style={[
                                  styles.adCard,
                                  {
                                    transform: [
                                      { scale: scaleAnim },
                                      { rotateZ: rotate },
                                    ],
                                  },
                                ]}
                              >
                                <TouchableOpacity
                                 activeOpacity={1}
                                  style={{ backgroundColor: "black" }}
                                  onPress={() => {
                                    if (values.ad_link) {
                                      const finalUrl =
                                        values.ad_link.startsWith("https")
                                          ? values.ad_link
                                          : `https://${values.ad_link}`;
                                      WebBrowser.openBrowserAsync(finalUrl);
                                    }
                                  }}
                                >
                                  <Image
                                    source={{
                                      uri: values.business_cover?.uri,
                                    }}
                                    style={styles.adImage}
                                    resizeMode="contain"
                                  />
                                </TouchableOpacity>
                              </Animated.View>
                            </View>
                          )}

                          <TouchableOpacity
                           activeOpacity={1}
                            onPress={() => setShowAdPreview(false)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              backgroundColor: "rgba(0,0,0,0.3)",
                              padding: 10,
                              borderRadius: 50,
                            }}
                          >
                            <Text style={{ color: "#fff", fontSize: 18 }}>
                              ✕
                            </Text>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                      </SafeAreaView>
                    </Modal>

                    <View
                      style={{
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                        marginVertical: vs(20),
                        opacity: 0.15,
                        borderColor: Colors.light.textGray,
                        borderRadius: ms(5),
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingHorizontal: hs(5),
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: ms(10),
                          padding: hs(5),
                        }}
                      >
                        <PromotionPricingCard
                          promotionPrices={promotionPrices}
                          setSelectedtimeprd={setTimeperiod}
                          setprice={setSelectedAmount}
                          setfieldvalue={setFieldValue}
                        />
                        {touched.start_date &&
                          touched.end_date &&
                          (errors.start_date || errors.end_date) && (
                            <Text
                              style={{
                                color: Colors.light.red,
                                marginTop: vs(5),
                                fontFamily: "PopinRegula",
                              }}
                            >
                              {errors.start_date || errors.end_date}
                            </Text>
                          )}

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
                        <View style={styles.card} className="items-center">
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
                            <ActivityIndicator
                              size="small"
                              color={Colors.light.red}
                            />
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
                              {amount?.amount}
                            </Text>
                          )}
                          <Text
                            className="text-center mb-5"
                            style={{
                              color: Colors.light.textGray,
                              fontFamily: "PopinRegula",
                            }}
                          >
                            Have more ads to post then buy bundle and get extra
                            discount. You’ can use credit any time means no
                            expiry!
                          </Text>
                          <LargeButton
                            text="Add Credits"
                            handleSubmit={() => router.push("/BuyCredit")}
                          />
                        </View>

                        <View style={styles.card2}>
                          <Text style={styles.title}>
                            Pay and Ad post Atomaticlly
                          </Text>

                          <TouchableOpacity
  activeOpacity={0.85}
  className="mb-4"
  style={styles.paypalMainButton}
  onPress={async () => {
    if (!SelectedAmount) {
      renderToastError("Please select bundle first");
      return;
    }

    if (Object.keys(errors).length > 0) {
      renderToastError("Please fill all the fields");
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
                                renderToastError(
                                  "Please select date from and to"
                                );
                                return;
                              }
                              if (amount?.amount >= Number(SelectedAmount)) {
                                setFieldValue("paymentMethod", "Wallet");
                                handleSubmit();
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
                    <PapPalPayment
                      amount={SelectedAmount}
                      onPress={(order_id, setApproveUrl) => {
                        try {
                          setFieldValue("paymentMethod", "paypal");
                          setFieldValue("order_id", order_id);
                          handleSubmit();
                          setvisible(false);
                          setApproveUrl(null);
                        } catch {
                          renderToastError("Some thing went rong");
                        }
                      }}
                      setVisible={setvisible}
                      visible={visible}
                    />
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
        <Loading isLoading={isLoading} text="Posting Ad..." />
      </>
    );
  }
  return (
    <ScrollView scrollEnabled>
      <View className="flex-1 bg-white">
        <HeaderWithBack
          title="Advertisements"
          onBackpress={() => router.back()}
        />
        {myad_fetching ? (
          <ActivityIndicator size="small" color={Colors.light.red} />
        ) : (
          <>
            {Myadvatizemants?.data?.length > 0 ? (
              <View className="flex-1">
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: hs(16),
                    marginTop: vs(10),
                  }}
                >
                  <Text style={{ flex: 1, fontSize: ms(14), color: "#333" }}>
                    Want to promote your ad?
                  </Text>

                  <View style={{ width: hs(140) }}>
                    <LargeButton
                      text="Advertise new"
                      handleSubmit={() => setShowInfopage(true)}
                    />
                  </View>
                </View>

              <FlashList
  data={Myadvatizemants?.data ?? []}
  renderItem={({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: ms(14),
        marginHorizontal: hs(16),
        marginVertical: vs(8),
        overflow: "hidden",
        borderWidth: 0.5,
        borderColor: "#E0E0E0",
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: ImageFormater(item.ad_image) }}
          style={{
            height: vs(180),
            width: "100%",
            resizeMode: "cover",
            backgroundColor: "#C8C8C8",
          }}
        />

        <View
          style={{
            position: "absolute",
            top: vs(10),
            left: hs(10),
            backgroundColor: Colors.light.LightGreen,
            borderRadius: ms(20),
            paddingHorizontal: hs(10),
            paddingVertical: vs(3),
            borderWidth: 0.5,
            borderColor: Colors.light.DarkGreen,
          }}
        >
          <Text
            style={{
              fontFamily: "PopinRegula",
              fontSize: ms(11),
              color: "white",
            }}
          >
            on: {item.on_page}
          </Text>
        </View>
      </View>

      <View style={{ padding: ms(14) }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: vs(12),
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "PopinRegula",
                fontSize: ms(11),
                color: "#888",
              }}
            >
              Ad ID
            </Text>

            <Text
              style={{
                fontFamily: "PopinRegula",
                fontSize: ms(15),
                fontWeight: "500",
                color: "#1A1A1A",
              }}
            >
              #{item.advertisement_id}
            </Text>
          </View>

          <View
            style={{
              backgroundColor:
                item.status === "Active"
                  ? Colors.light.LightGreen
                  : Colors.light.lightGray,
              borderRadius: ms(20),
              paddingHorizontal: hs(12),
              paddingVertical: vs(4),
              borderWidth: 0.5,
              borderColor:
                item.status === "Active"
                  ? Colors.light.DarkGreen
                  : Colors.light.red,
            }}
          >
            <Text
              style={{
                fontFamily: "PopinRegula",
                fontSize: ms(11),
                fontWeight: "500",
                color:
                  item.status === "Active"
                    ? Colors.light.DarkGreen
                    : Colors.light.red,
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 0.5,
            borderTopColor: "#E0E0E0",
            paddingTop: vs(12),
            flexDirection: "row",
            flexWrap: "wrap",
            gap: ms(10),
          }}
        >
          {[
            {
              label: "Amount",
              value: `PKR ${item.amount_received}`,
            },
            {
              label: "Payment",
              value: item.payment_status,
            },
            {
              label: "Ad life",
              value: `${item.ad_life} days`,
            },
            {
              label: "Posted",
              value: item.date_posted?.slice(0, 10),
            },
            {
              label: "Expires on",
              value: item.expiry_date,
            },
          ].map(({ label, value }) => (
            <View key={label} style={{ width: "47%" }}>
              <Text
                style={{
                  fontFamily: "PopinRegula",
                  fontSize: ms(11),
                  color: "#888",
                }}
              >
                {label}
              </Text>

              <Text
                style={{
                  fontFamily: "PopinRegula",
                  fontSize: ms(13),
                  fontWeight: "500",
                  color: "#1A1A1A",
                }}
              >
                {value}
              </Text>
            </View>
          ))}
        </View>

        {item.ad_link ? (
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: Colors.light.DarkGreen,
              paddingVertical: vs(10),
              paddingHorizontal: hs(10),
              backgroundColor: Colors.light.DarkGreen,
              borderBottomRightRadius: ms(10),
              borderBottomLeftRadius: ms(10),
              marginTop: vs(12),
              flexDirection: "row",
              alignItems: "center",
              gap: hs(6),
            }}
          >
            <Feather
              name="link"
              size={ms(13)}
              color="white"
            />

            <Text
              style={{
                fontFamily: "PopinRegula",
                fontSize: ms(12),
                color: "white",
                flex: 1,
              }}
              numberOfLines={1}
            >
              {item.ad_link}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            gap: hs(8),
            marginTop: vs(14),
          }}
        >
          <TouchableOpacity
           activeOpacity={1}
            onPress={() => {
              setEditAdData(item);
              setEditAd(true);
            }}
            style={{
              flex: 1,
              paddingVertical: vs(9),
              borderRadius: ms(8),
              borderWidth: 0.5,
              borderColor: "#E0E0E0",
              backgroundColor: Colors.light.red,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: hs(6),
            }}
          >
            <Feather
              name="edit-2"
              size={ms(13)}
              color="white"
            />

            <Text
              style={{
                fontFamily: "PopinRegula",
                fontSize: ms(13),
                fontWeight: "500",
                color: "white",
              }}
            >
              Edit Ad
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}
  keyExtractor={(item) =>
    item.advertisement_id.toString()
  }
  showsVerticalScrollIndicator={false}
/>
              </View>
            ) : (
              <>
                <View
                  className="items-center"
                  style={{ marginHorizontal: hs(20), marginTop: vs(20) }}
                >
                  <AdvatiseBaner />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginTop: vs(30),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    You have no advertisement.
                  </Text>
                  <Text
                    style={{ marginTop: vs(20), fontFamily: "PopinRegula" }}
                  >
                    Why not advertise your business or brand at our website and
                    expand in no time and cost effectively
                  </Text>
                </View>
                <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
                  <LargeButton
                    text="Advertise now"
                    handleSubmit={() => {
                      setShowInfopage(true);
                    }}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>
      <Modal
        visible={EditAd}
        onRequestClose={() => setEditAd(false)}
        animationType="slide"
      >
                         <SafeAreaView
                          style={{ flex: 1 }}
                          edges={[ "bottom", "left", "right"]}
                        >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: hs(20),
          }}
        >
          <HeaderWithBack
            title="Edit Ad"
            onBackpress={() => setEditAd(false)}
          />
          <Formik
            initialValues={{
              ad_link: EditAdData?.ad_link,
              business_cover: EditAdData?.ad_image,
              advertisement_id: EditAdData?.advertisement_id,
              user_id: user.id,
            }}
            validationSchema={EditAdvatizeSchema}
            onSubmit={async (values) => {
              try {
                const formData = new FormData();

                formData.append(
                  "advertisement_id",
                  String(values.advertisement_id)
                );
                formData.append("ad_link", values.ad_link);

                if (
                  values.business_cover &&
                  typeof values.business_cover === "object" &&
                  values.business_cover.uri
                ) {
                  formData.append("business_cover", {
                    uri: values.business_cover.uri,
                    name: values.business_cover.name ?? "advertisement.jpg",
                    type: values.business_cover.type ?? "image/jpeg",
                  });
                }

                const response = await updateAdvertisementMedia(
                  formData
                ).unwrap();

                renderToastSuccess(response?.message);
                router.back();
              } catch (error) {
                console.log("ERROR FULL:", error?.data || error);

                if (error?.data?.errors) {
                  const firstError = Object.values(error.data.errors)[0];
                  renderToastError(firstError[0]);
                  return;
                }

                renderToastError("Something went wrong");
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <FormikInput
                  title="Link of ad"
                  placeholder="www.abc.com"
                  onChangeText={handleChange("ad_link")}
                  onBlur={handleBlur("ad_link")}
                  value={values.ad_link}
                  touched={!!touched.ad_link}
                  errors={!!errors.ad_link}
                  required
                  errorText={errors.ad_link}
                />
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    marginVertical: vs(20),
                    borderColor: Colors.light.textGray,
                    borderRadius: ms(5),
                    opacity: 0.15,
                  }}
                />
                <UploadPic
                  Logo={Profilelogo}
                  text1="Upload "
                  text2="Ad"
                  additionalText={
                    "Recomended size 1based on selection\n above plz discuss"
                  }
                  border
                  limt={1}
                  name="business_cover"
                  setValue={setFieldValue}
                  value={values.business_cover}
                />
                {errors.business_cover && (
                  <Text style={{ color: "red" }}>{errors.business_cover}</Text>
                )}

                <View
                  style={{
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    marginVertical: vs(20),
                    opacity: 0.15,
                    borderColor: Colors.light.textGray,
                    borderRadius: ms(5),
                  }}
                />

                <LargeButton
                  handleSubmit={() => {
                    handleSubmit();
                    console.log(values, "values");
                  }}
                  text="Update Ad"
                />
                <Loading isLoading={updateadloading} text="Updating Ad..." />
              </>
            )}
          </Formik>
        </ScrollView>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    padding: ms(12),

    backgroundColor: "#FFFFFF",
    borderRadius: ms(16),

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  stickyButton: {
    backgroundColor: "#fff",
    padding: 10,
    zIndex: 10,
  },
  btn: {
    borderWidth: 0.5,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: Colors.light.textGray,
    borderRadius: ms(5),
    paddingVertical: vs(10),
  },
  btnselected: {
    backgroundColor: Colors.light.DarkGreen,
  },
 
  adContainer: {
    width: "100%",
    height: "100%",
    marginTop: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  adImage: {
    width: "100%",
    height: vs(180),
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "PopinRegula",
  },
 
  adCard: {
    width: "100%",
    height: vs(100),
    marginVertical: vs(10),
    borderRadius: ms(16),
    overflow: "hidden",
    backgroundColor: "transparent",
    elevation: 0,
  },

 
  card2: {
    marginVertical: vs(20),
    backgroundColor: "white",
    borderRadius: ms(8),
    elevation: 5,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
