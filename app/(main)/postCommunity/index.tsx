import {
  useCaptureAlfalahPaymentMutation,
  useGetDataForEditQuery,
  useGetPriceQuery,
  useGetProfilesQuery,
  useGetUserWalletQuery,
  usePostCommunityMutation,
  useUpdateCommunityMutation,
  useVerifyAlfalahPaymentMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Bunchers from "@assets/CreateProfile/broucher.svg";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import Uploadlogo from "@assets/signupbg/solar_upload-bold-duotone.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { AdressInput } from "@src/components/globals/AddressInput";
import CommunityPropertys from "@src/components/globals/CommunityPropertys";
import CommunitySatatus from "@src/components/globals/CommunitySatatus";
import CommunityType from "@src/components/globals/CommunityType";
import DatePickerField from "@src/components/globals/DatePickerField";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import AlfalahPayment from "@src/components/globals/PapPalPayment";
import PdfPicker from "@src/components/globals/PdfPicker";
import SelecteAdType from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { formatPrice } from "@utils/PriceFormater";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
const index = () => {
  const user = useAppSelector(userdata);
  const [saleType, setSaleType] = useState(true);
  const [count, setCount] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [visible, setvisible] = useState(false);
  const params = useLocalSearchParams();
  const type = params.type as string;
  const id = Number(params.id);
  const edit = params.edit === "true";
  const { data: editData, isLoading: EditLoading } = useGetDataForEditQuery(
    { type, id },
    { skip: !edit }
  );
  const {
    data: amount,
    isLoading: AmountLoading,
    isFetching,
  } = useGetUserWalletQuery({
    id: user.id,
  });
 const {data:advertisePrices}=useGetPriceQuery({price_type:"community"})
  useEffect(() => {
    if (edit && editData) {
      const titlesLength = editData.post?.property_titles?.length;
      setCount(titlesLength != null ? titlesLength : 1);
    }
  }, [edit, editData]);

  const PostCommunitySchema = Yup.object().shape({
    community_title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Community title is required"),

    community_type: Yup.string().required("Community type is required"),

    community_status: Yup.string().required("Community status is required"),

    expected_delivery: Yup.string().nullable(),

    address: Yup.string().required("Address is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    zip: Yup.string().nullable(),

    lat: Yup.number()
      .typeError("Latitude must be a number")
      .required("Latitude is required"),

    lng: Yup.number()
      .typeError("Longitude must be a number")
      .required("Longitude is required"),

    community_details: Yup.string().nullable(),

    developer_name: Yup.string().required("Developer name is required"),

    project_logo: Yup.mixed().nullable(),

    developer_logo: Yup.mixed().nullable(),

    facts: Yup.string().nullable(),

    visit_date: Yup.string().nullable(),

    visit_time: Yup.string().nullable(),

    video_link: Yup.string().url("Enter a valid video URL").nullable(),

    user_id: Yup.number().required("User ID is required"),

    user_type: Yup.string().required("User type is required"),

    payment_method: Yup.string().nullable(),

    ad_life: Yup.number().nullable(),

    ad_by: Yup.string().required("Ad by is required"),

    post_status: Yup.string().required("Post status is required"),

    post_type: Yup.string().required("Post type is required"),

    approved_by: Yup.string().nullable(),

    created_date: Yup.string().nullable(),

    updated_date: Yup.string().nullable(),
    post_id: Yup.string().nullable(),
    expiry_date: Yup.string().nullable(),

    post_start_date: Yup.string().nullable(),

    post_end_date: Yup.string().nullable(),
    property_type1: Yup.string().required("Property type is required"),
    property_type2:
      count === 2
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_type3:
      count === 3
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_type4:
      count === 4
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_type5:
      count === 5
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_sub_type1: Yup.string().required("Property sub type is required"),
    property_sub_type2:
      count === 2
        ? Yup.string().required("Property sub type is required")
        : Yup.string().nullable(),
    property_sub_type3:
      count === 3
        ? Yup.string().required("Property sub type is required")
        : Yup.string().nullable(),
    property_sub_type4:
      count === 4
        ? Yup.string().required("Property sub type is required")
        : Yup.string().nullable(),
    property_sub_type5:
      count === 5
        ? Yup.string().required("Property sub type is required")
        : Yup.string().nullable(),
    property_title1: Yup.string().required("Title is required"),
    property_title2:
      count === 2
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    property_title3:
      count === 3
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    property_title4:
      count === 4
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    property_title5:
      count === 5
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    tenure1: Yup.string().required("Tenure is required"),
    tenure2:
      count === 2
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    tenure3:
      count === 3
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    tenure4:
      count === 4
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    tenure5:
      count === 5
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    land_area1: Yup.number()
      .required("Area is required")
      .typeError("Land area must be a number"),
    land_area5:
      count === 5
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
    land_area2:
      count === 2
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
    land_area3:
      count === 3
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
    land_area4:
      count === 4
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
order_id: Yup.string().nullable(),
amount: Yup.mixed().nullable(),
    price1: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    property_visit: Yup.string().nullable(),
    price2:
      count === 2
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),

    price3:
      count === 3
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),

    price4:
      count === 4
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),

    price5:
      count === 5
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),
    bedroom1: Yup.string().when("property_type1", {
      is: "House",
      then: (s) =>
        s
          .typeError("Bedrooms must be a number")
          .required("Bedrooms are required"),
      otherwise: (s) => s.notRequired().nullable(),
    }),
    bedroom2:
      count === 2
        ? Yup.string().when("property_type2", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bedrooms must be a number")
                .required("Bedrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bedroom3:
      count === 3
        ? Yup.string().when("property_type3", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bedrooms must be a number")
                .required("Bedrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bedroom4:
      count === 4
        ? Yup.string().when("property_type4", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bedrooms must be a number")
                .required("Bedrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bedroom5:
      count === 5
        ? Yup.string().when("property_type5", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bedrooms must be a number")
                .required("Bedrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bathroom1: Yup.number().when("property_type1", {
      is: "House",
      then: (s) =>
        s
          .typeError("Bathrooms must be a number")
          .positive("Invalid bathrooms")
          .required("Bathrooms are required"),
      otherwise: (s) => s.notRequired().nullable(),
    }),
    bathroom2:
      count === 2
        ? Yup.number().when("property_type2", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bathrooms must be a number")
                .positive("Invalid bathrooms")
                .required("Bathrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bathroom3:
      count === 3
        ? Yup.number().when("property_type3", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bathrooms must be a number")
                .positive("Invalid bathrooms")
                .required("Bathrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bathroom4:
      count === 4
        ? Yup.number().when("property_type4", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bathrooms must be a number")
                .positive("Invalid bathrooms")
                .required("Bathrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
    bathroom5:
      count === 5
        ? Yup.number().when("property_type5", {
            is: "House",
            then: (s) =>
              s
                .typeError("Bathrooms must be a number")
                .positive("Invalid bathrooms")
                .required("Bathrooms are required"),
            otherwise: (s) => s.notRequired().nullable(),
          })
        : Yup.string().nullable(),
  });
  const initialValues =
    edit && editData?.post
      ? {
          community_title: editData.post.community_title || "",
          community_type: editData.post.community_type || "",
          community_status: editData.post.community_status || "",
          expected_delivery: editData.post.expected_delivery || "",
          address: editData.post.address || "",
          city: editData.post.city || "",
          state: editData.post.state || "",
          zip: editData.post.zip || "",
          lat: editData.post.lat || 0,
          lng: editData.post.lng || 0,
          community_details: editData.post.community_details || "",
          developer_name: editData.post.developer_name || "",
          project_logo: editData.post.project_logo || null,
          developer_logo: editData.post.developer_logo || null,
          facts: editData.post.facts || "",
          visit_date: editData.post.visit_date || "",
          visit_time: editData.post.visit_time || "",
          property_visit: editData.post.property_visit || "",
          video_link: editData.post.video_link || "",
          user_id: editData.post.user_id,
          user_type: editData.post.user_type,
          payment_method: editData.post.payment_method,
          order_id: "",
amount: "",

          ad_life: editData.post.ad_life || 1,
          ad_by: editData.post.ad_by || "",
          post_status: editData.post.post_status || "Pending",
          post_type: editData.post.post_type || "Normal",
          approved_by: editData.post.approved_by || "",
          created_date: editData.post.created_date || "",
          updated_date: editData.post.updated_date || "",
          expiry_date: editData.post.expiry_date || "",
          post_start_date: editData.post.post_start_date || "",
          post_end_date: editData.post.post_end_date || "",
          property_type1: editData.post.property_types?.[0] || "",
          property_type2: editData.post.property_types?.[1] || "",
          property_type3: editData.post.property_types?.[2] || "",
          property_type4: editData.post.property_types?.[3] || "",
          property_type5: editData.post.property_types?.[4] || "",
          property_sub_type1: editData.post.property_sub_types?.[0] || "",
          property_sub_type2: editData.post.property_sub_types?.[1] || "",
          property_sub_type3: editData.post.property_sub_types?.[2] || "",
          property_sub_type4: editData.post.property_sub_types?.[3] || "",
          property_sub_type5: editData.post.property_sub_types?.[4] || "",
          property_title1: editData.post.property_titles?.[0] || "",
          property_title2: editData.post.property_titles?.[1] || "",
          property_title3: editData.post.property_titles?.[2] || "",
          property_title4: editData.post.property_titles?.[3] || "",
          property_title5: editData.post.property_titles?.[4] || "",
          tenure1: editData.post.tenures?.[0] || "",
          tenure2: editData.post.tenures?.[1] || "",
          tenure3: editData.post.tenures?.[2] || "",
          tenure4: editData.post.tenures?.[3] || "",
          tenure5: editData.post.tenures?.[4] || "",
          land_area1: editData.post.land_areas?.[0] || "",
          land_area2: editData.post.land_areas?.[1] || "",
          land_area3: editData.post.land_areas?.[2] || "",
          land_area4: editData.post.land_areas?.[3] || "",
          land_area5: editData.post.land_areas?.[4] || "",
          price1: editData.post.community_price?.[0] || "",
          price2: editData.post.community_price?.[1] || "",
          price3: editData.post.community_price?.[2] || "",
          price4: editData.post.community_price?.[3] || "",
          price5: editData.post.community_price?.[4] || "",
          bedroom1: editData.post.bedrooms?.[0] || "",
          bedroom2: editData.post.bedrooms?.[1] || "",
          bedroom3: editData.post.bedrooms?.[2] || "",
          bedroom4: editData.post.bedrooms?.[3] || "",
          bedroom5: editData.post.bedrooms?.[4] || "",
          bathroom1: editData.post.bathrooms?.[0] || "",
          bathroom2: editData.post.bathrooms?.[1] || "",
          bathroom3: editData.post.bathrooms?.[2] || "",
          bathroom4: editData.post.bathrooms?.[3] || "",
          bathroom5: editData.post.bathrooms?.[4] || "",
          propertyimg: editData.post_images || [],
          post_id: editData.post.post_community_id || "",
          floorimg: editData.floor_images || [],
          broucherimg: editData.brochures || [],
        }
      : {
          // default initialValues when creating new post
          community_title: "",
          community_type: "",
          community_status: "",
          expected_delivery: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          lat: 0,
          lng: 0,
          community_details: "",
          developer_name: "",
          project_logo: null,
          developer_logo: null,
          facts: "",
          visit_date: "",
          visit_time: "",
          property_visit: "",
          video_link: "",
          user_id: user.id,
          user_type: user.user_type,
          payment_method: "",
          order_id: "",
amount: "",

          ad_life: 1,
          ad_by: user.user_type === "Business" ? "" : "Private",
          post_status: "Pending",
          post_type: "Normal",
          approved_by: "",
          created_date: "",
          updated_date: "",
          expiry_date: "",
          post_start_date: "",
          post_end_date: "",
          property_type1: "",
          property_type2: "",
          property_type3: "",
          property_type4: "",
          property_type5: "",
          property_sub_type1: "",
          property_sub_type2: "",
          property_sub_type3: "",
          property_sub_type4: "",
          property_sub_type5: "",
          property_title1: "",
          property_title2: "",
          property_title3: "",
          property_title4: "",
          property_title5: "",
          tenure1: "",
          tenure2: "",
          tenure3: "",
          tenure4: "",
          tenure5: "",
          land_area1: "",
          land_area2: "",
          land_area3: "",
          land_area4: "",
          land_area5: "",
          price1: "",
          price2: "",
          price3: "",
          price4: "",
          price5: "",
          bedroom1: "",
          bedroom2: "",
          bedroom3: "",
          bedroom4: "",
          bedroom5: "",
          bathroom1: "",
          bathroom2: "",
          bathroom3: "",
          bathroom4: "",
          bathroom5: "",
          propertyimg: [],
          floorimg: [],
          broucherimg: [],
        };
 const [
  capturePayment,
  { isLoading: isCapturing },
] = useCaptureAlfalahPaymentMutation();

const [
  verifyAlfalahPayment,
  { isLoading: isVerifyingAlfalah },
] = useVerifyAlfalahPaymentMutation();
  const pickImage = async (setFieldValue: any, name: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const filename = uri.split("/").pop();
      const ext = filename?.split(".").pop();

      setFieldValue(name, {
        uri,
        name: filename,
        type: `image/${ext}`,
      });
    }
  };
  const { data } = useGetProfilesQuery({ id: user.id });

  const [UpdateCommunity, { isLoading: UpdateLoading }] =
    useUpdateCommunityMutation();
  const [postCommunity, { isLoading }] = usePostCommunityMutation();
  return (
    <View className="bg-white flex-1 pb-4 ">
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        className="bg-white flex-1"
      >
        <HeaderWithBack header="Post Community" />
        <View
          style={{
            marginHorizontal: hs(10),
            marginVertical: vs(20),
            paddingBottom: vs(10),
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: ms(15),
              marginBottom: vs(10),
              fontFamily: "PopinRegula",
            }}
          >
            Market your
            <Text
              style={{ color: Colors.light.red, fontFamily: "PopinRegula" }}
            >
              {" "}
              COMMUNITY PROJECT{" "}
            </Text>
            smartly across the US
          </Text>
          <View
            style={{
              paddingHorizontal: hs(10),
              paddingTop: vs(20),
              marginTop: vs(10),
              borderRadius: 15,
              elevation: 4,
              backgroundColor: "white",
            }}
          >
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={PostCommunitySchema}
              onSubmit={async (values) => {
                try {
                  const needsBankPayment =
  !edit &&
  values.post_type === "Trending" &&
  values.payment_method !== "Wallet";

if (
  needsBankPayment &&
  !values.order_id
) {
  renderToastError(
    "Please complete payment before posting the community."
  );

  return;
}
                  const formData = new FormData();
                  const existingPDFs: string[] = [];
                  Object.keys(values).forEach((key) => {
                    if (
                      key !== "propertyimg" &&
                      key !== "floorimg" &&
                      key !== "broucherimg" &&
                      values[key] !== undefined &&
                      values[key] !== null
                    ) {
                      formData.append(key, String(values[key]));
                    }
                  });

                  if (
                    Array.isArray(values.propertyimg) &&
                    values.propertyimg.length > 0
                  ) {
                    values.propertyimg.forEach((img, index) => {
                      if (img.uri) {
                        formData.append("propertyimg[]", {
                          uri: img.uri,
                          name: img.name || `property_${index}.jpg`,
                          type: img.type || "image/jpeg",
                        } as any);
                      }
                    });
                  } else {
                    formData.append("propertyimg", JSON.stringify([]));
                  }
                  if (
                    Array.isArray(values.floorimg) &&
                    values.floorimg.length > 0
                  ) {
                    values.floorimg.forEach((img, index) => {
                      if (img.uri) {
                        formData.append("floorimg[]", {
                          uri: img.uri,
                          name: img.name || `floor_${index}.jpg`,
                          type: img.type || "image/jpeg",
                        } as any);
                      }
                    });
                  } else {
                    formData.append("floorimg", JSON.stringify([]));
                  }

                  if (
                    Array.isArray(values.broucherimg) &&
                    values.broucherimg.length > 0
                  ) {
                    values.broucherimg.forEach((pdf: any, index: number) => {
                      if (!pdf) return;

                      if (typeof pdf === "object" && pdf.uri) {
                        if (pdf.uri.startsWith("file://")) {
                          formData.append("broucherimg[]", {
                            uri: pdf.uri,
                            name: pdf.name || `brochure_${index}.pdf`,
                            type: pdf.type || "application/pdf",
                          } as any);
                        } else {
                          existingPDFs.push(pdf.uri);
                        }
                      } else if (typeof pdf === "string") {
                        existingPDFs.push(pdf);
                      }
                    });

                    formData.append(
                      "existing_broucherimg",
                      JSON.stringify(existingPDFs)
                    );
                  } else {
                    formData.append("broucherimg", JSON.stringify([]));
                    formData.append("existing_broucherimg", JSON.stringify([]));
                  }

                  if (values.developer_logo?.uri) {
                    formData.append("developer_logo", {
                      uri: values.developer_logo?.uri,
                      type: values.developer_logo?.type || "image/jpeg",
                      name: values.developer_logo?.name || "logo.jpg",
                    } as any);
                  }

                  if (values.project_logo?.uri) {
                    formData.append("project_logo", {
                      uri: values.project_logo?.uri,
                      type: values.project_logo?.type || "image/jpeg",
                      name: values.project_logo?.name || "logo.jpg",
                    } as any);
                  }
                  for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                  }

                  const result = edit
                    ? await UpdateCommunity(formData)
                    : await postCommunity(formData);

                  if (result.data?.success) {
                    if (
                      edit ||
                      values.post_type === "Normal" ||
                      values.payment_method === "Wallet"
                    ) {
                      renderToastSuccess(result.data?.message);
                      router.replace({
                        pathname: "/MyPostListing",
                        params: {
                          type: "community",
                          id: result?.data?.post_id,
                          isShowpost: "true",
                        },
                      });
                    } else {
                      await capturePayment({
                        order_id: values.order_id,
                        user_id: user.id,
                        upgrade_type: "Post",
                        profile_type: values.ad_by || "",
                        upgrade_id: result?.data?.post_id,
                        upgrade_amount: selectedAmount || 0,
                      }).unwrap();
                      renderToastSuccess(result.data?.message);
                      router.replace({
                        pathname: "/MyPostListing",
                        params: {
                          type: "community",
                          id: result?.data?.post_id,
                          isShowpost: "true",
                        },
                      });
                    }
                  } else {
                    renderToastError(
                      result?.data?.message || "Something went wrong!"
                    );
                  }
                } catch (error) {
                  console.log("Error:", error);
                  renderToastError(
                    "Failed to upload property. Please try again."
                  );
                }
              }}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                setTouched,
                validateForm,
              }) => (
                <>
                  <CommunityType
                    value={values.community_type}
                    onPress={async (value) => {
                      setFieldValue("community_type", value);
                    }}
                  />
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
                      fontWeight: 700,
                      marginVertical: vs(10),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Property
                    <Text
                      style={{
                        color: Colors.light.red,
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {" "}
                      STATUS
                    </Text>
                  </Text>
                  <CommunitySatatus
                    errorText={errors.community_status || ""}
                    onPress={(value) =>
                      setFieldValue("community_status", value)
                    }
                    value={values.community_status}
                  />
                  {values.community_status !== "" &&
                    values.community_status !== "Completed" && (
                      <DatePickerField
                        errorText={errors.expected_delivery}
                        name="expected_delivery"
                        value={values.expected_delivery}
                        editable={true}
                        setValue={setFieldValue}
                        title="Expected Delievery date"
                        placeholder="dd/mm//yy"
                        touched={!!touched}
                        errors={!!errors}
                        required={false}
                      />
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

                  <AdressInput
                    city={"city"}
                    zip={"zip"}
                    state={"state"}
                    lat={"lat"}
                    long="lng"
                    latValue={values.lat}
                    longValue={values.lng}
                    name="address"
                    setValue={setFieldValue}
                    onSelect={() => {}}
                    title="Property Location"
                    placeholder="Enter complete address or street"
                    value={values.address}
                    touched={!!touched.address}
                    errors={!!errors.address}
                    required
                    errorText={errors.address}
                  />

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
                      fontWeight: 700,
                      marginBottom: vs(10),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Property <Text style={{ color: Colors.light.red }}>DETAILS</Text>
                  </Text>
                  <FormikInput
                    title="Title"
                    placeholder="Title"
                    onChangeText={handleChange("community_title")}
                    onBlur={handleBlur("community_title")}
                    value={values.community_title}
                    touched={!!touched.community_title}
                    errors={!!errors.community_title}
                    required
                    errorText={errors.community_title}
                  />

                  <View>
                    <Text
                      style={{
                        fontWeight: 700,
                        marginTop: vs(10),
                        fontSize:ms(16),
                        fontFamily: "PopinRegula",
                      }}
                    >
                      Add main features
                    </Text>
                    <Text style={{ fontFamily: "PopinRegula" }}>
                      (Type property feature and hit + sign. To add more
                      features repeat process)
                    </Text>
                    <FormikInput
                      title=""
                      placeholder="e.g Garden, Parking, Pool etc"
                      onChangeText={handleChange("facts")}
                      onBlur={handleBlur("facts")}
                      value={values.facts}
                      touched={!!touched.facts}
                      errors={!!errors.facts}
                      required={false}
                      mulipleFields
                      name="facts"
                      setValue={setFieldValue}
                      errorText={errors.facts}
                    />
                  </View>
                  <FormikInput
                    title="More Description"
                    placeholder="Write here (Upto 5000 characters)"
                    onChangeText={handleChange("community_details")}
                    onBlur={handleBlur("community_details")}
                    value={values.community_details}
                    touched={!!touched.community_details}
                    errors={!!errors.community_details}
                    required={false}
                    additonalText={"5000 words"}
                    multiline
                    errorText={errors.community_details}
                  />

                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  <Text style={{ fontWeight: 700, fontFamily: "PopinRegula" }}>
                    Add Community
                    <Text
                      style={{
                        color: Colors.light.red,
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {" "}
                      PROPERTIES
                    </Text>
                  </Text>
                  <CommunityPropertys
                    key={"communitypropertys"}
                    values={values}
                    count={count}
                    setCount={setCount}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize:ms(14),
                      marginTop: vs(10),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Visit <Text style={{ color: Colors.light.red }}>OPTION</Text>
                  </Text>
                  <Text style={{ fontFamily: "PopinRegula" }}>
                    Buyer can visit property physically?
                  </Text>
                  <View
                    className="flex-row"
                    style={{ marginTop: vs(10), marginBottom: vs(20) }}
                  >
                    <View className="flex-row items-center">
                      <TouchableOpacity
                       activeOpacity={1}
                        onPress={() => {
                          setFieldValue(
                            "property_visit",
                            values.property_visit === "Yes" ? "" : "Yes"
                          );
                        }}
                      >
                        <MaterialIcons
                          size={25}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_visit === "Yes"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text
                        style={{ marginLeft: hs(5), fontFamily: "PopinRegula" }}
                      >
                        Yes
                      </Text>
                    </View>

                    <View
                      className="flex-row items-center"
                      style={{ marginLeft: hs(20) }}
                    >
                      <TouchableOpacity
                       activeOpacity={1}
                        onPress={() => {
                          setFieldValue(
                            "property_visit",
                            values.property_visit === "No" ? "" : "No"
                          );
                        }}
                      >
                        <MaterialIcons
                          size={25}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_visit === "No"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{ marginLeft: hs(5), fontFamily: "PopinRegula" }}
                    >
                      No
                    </Text>
                  </View>

                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  {/* {values.property_visit === "Yes" && (
                    <>
                      <View className="flex-row justify-between gap-3">
                        <View className="flex-1">
                          <View
                            className="flex-1"
                            style={{ marginLeft: hs(5) }}
                          >
                            <DatePickerField
                              errorText={errors.visit_date}
                              name="visit_date"
                              required={false}
                              value={values.visit_date}
                              editable
                              setValue={setFieldValue}
                              title="Date for viewing"
                              placeholder="dd/mm/yy"
                              touched={!!touched}
                              errors={!!errors}
                            />
                          </View>
                        </View>
                        <View className="flex-1">
                          <TimePickerField
                            errorText={errors.visit_time}
                            name="visit_time"
                            required={false}
                            value={values.visit_time}
                            editable
                            setValue={setFieldValue}
                            title="Time for viewing"
                            placeholder="dd/mm/yy"
                            touched={!!touched}
                            errors={!!errors}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          height: vs(1),
                          marginTop: vs(20),
                          marginBottom: vs(10),
                          backgroundColor: Colors.light.textGray,
                          opacity: 0.2,
                        }}
                      />
                    </>
                  )} */}

                  <UploadPic
                    key="propertyimg"
                    Logo={Profilelogo}
                    text1="Upload IMAGES"
                    text2=""
                    additionalText={`Upload upto 30 images.\n More images get more attractions`}
                    value={values.propertyimg}
                    limt={30}
                    name="propertyimg"
                    border
                    setValue={setFieldValue}
                  />
                  <UploadPic
                    key="floorimg"
                    Logo={ImageUpload}
                    text1="Upload FLOOR plan"
                    text2=" "
                    text3=""
                    limt={5}
                    additionalText="Upload upto 5 floor images"
                    border
                    setValue={setFieldValue}
                    name={"floorimg"}
                    value={values.floorimg}
                  />
                  <PdfPicker
                    key="brochure"
                    Logo={Bunchers}
                    text1="Upload BROCHURE"
                    text2=" "
                    text3=""
                    limt={3}
                    additionalText="Can upload max 3"
                    border
                    setValue={setFieldValue}
                    name={"broucherimg"}
                    value={values.broucherimg}
                  />
                  <FormikInput
                    title="Provide youtube video link"
                    placeholder="youtube video link"
                    onChangeText={handleChange("video_link")}
                    onBlur={handleBlur("video_link")}
                    value={values.video_link}
                    touched={!!touched.video_link}
                    errors={!!errors.video_link}
                    required={false}
                    errorText={errors.video_link}
                  />
                    <View
                                      style={{
                                        height: vs(1),
                                        marginTop: vs(20),
                                        marginBottom: vs(10),
                                        backgroundColor: Colors.light.textGray,
                                        opacity: 0.2,
                                      }}
                                    />
                  <Text style={{ fontWeight: 700, fontFamily: "PopinRegula" }}>
                    About
                    <Text
                      style={{
                        color: Colors.light.red,
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {" "}
                      DEVELOPER
                    </Text>
                  </Text>
                  <FormikInput
                    title="Developer Name"
                    placeholder=""
                    onChangeText={handleChange("developer_name")}
                    onBlur={handleBlur("developer_name")}
                    value={values.developer_name}
                    touched={!!touched.developer_name}
                    errors={!!errors.developer_name}
                    required
                    errorText={errors.developer_name}
                  />
                  <View className="flex-row justify-between gap-3 mt-5">
                    <View className="flex-1">
                      <TouchableOpacity
                       activeOpacity={1}
                        style={{
                          backgroundColor: values.developer_logo
                            ? Colors.light.DarkGreen
                            : Colors.light.textGray,
                          height: vs(40),
                          width: "100%",
                          borderRadius: ms(10),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() =>
                          pickImage(setFieldValue, "developer_logo")
                        }
                      >
                        <View
                          className="flex-row items-center justify-center self-center"
                          style={styles.uploadbutton}
                        >
                          <Uploadlogo />
                          <Text style={styles.buttonText}>
                            {values.developer_logo
                              ? "Logo Uploaded"
                              : "Developer Logo"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View className="flex-1">
                      <TouchableOpacity
                       activeOpacity={1}
                        style={{
                          backgroundColor: values.project_logo
                            ? Colors.light.DarkGreen
                            : Colors.light.textGray,
                          height: vs(40),
                          width: "100%",
                          borderRadius: ms(10),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => pickImage(setFieldValue, "project_logo")}
                      >
                        <View
                          className="flex-row items-center justify-center"
                          style={styles.uploadbutton}
                        >
                          <Uploadlogo />
                          <Text style={styles.buttonText}>
                            {values.project_logo
                              ? "Logo Uploaded"
                              : "Community Logo"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {user.user_type === "Business" && (
                    <>
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
                        className="font-bold mt-3"
                        style={{ fontFamily: "PopinRegula" }}
                      >
                        Advertise as
                      </Text>
                      {data?.total_profiles !== 0 && (
                        <View>
                          {(data?.profiles_exist?.agent.exists && data?.profiles_exist?.agent.status==="Active") && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Agent" ? "" : "Agent"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Agent"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Agent
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.builder.exists && data?.profiles_exist?.builder.status==="Active" ) && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Builder" ? "" : "Builder"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Builder"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Builder
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.decor.exists && data?.profiles_exist?.decor.status==="Active") && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Decor" ? "" : "Decor"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Decor"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Decor
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.electrician.exists &&data?.profiles_exist?.electrician.status==="Active" ) && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Electrician"
                                    ? ""
                                    : "Electrician"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Electrician"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Electrician
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.investor.exists && data?.profiles_exist?.investor.status==="Active") && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Investor" ? "" : "Investor"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Investor"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Investor
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.mortgage.exists && data?.profiles_exist?.mortgage.status==="Active") && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Mortgage" ? "" : "Mortgage"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Mortgage"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Mortgage
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.painter.exists && data?.profiles_exist?.painter.status==="Active") && (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Painter" ? "" : "Painter"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Painter"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Painter
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {(data?.profiles_exist?.plumber.exists && data?.profiles_exist?.plumber.status==="Active")&& (
                            <TouchableOpacity
                             activeOpacity={1}
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Plumber" ? "" : "Plumber"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={25}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Plumber"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                    fontFamily: "PopinRegula",
                                  }}
                                >
                                  Plumber
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                           {(data?.profiles_exist?.material_supplier?.exists && data?.profiles_exist?.material_supplier?.status==="Active") && (
                                                      <TouchableOpacity
                                                       activeOpacity={1}
                                                        onPress={() => {
                                                          setFieldValue(
                                                            "ad_by",
                                                            values.ad_by === "Material_supplier" ? "" : "Material_supplier"
                                                          );
                                                        }}
                                                      >
                                                        <View className="flex-row mt-4 items-center">
                                                          <MaterialIcons
                                                            size={25}
                                                            color={Colors.light.DarkGreen}
                                                            name={
                                                              values.ad_by === "Material_supplier"
                                                                ? "check-box"
                                                                : "check-box-outline-blank"
                                                            }
                                                          />
                                                          <Text
                                                            style={{
                                                              marginLeft: hs(5),
                                                              fontWeight: "500",
                                                              fontFamily: "PopinRegula",
                                                            }}
                                                          >
                                                    Material Supplier
                                                          </Text>
                                                        </View>
                                                      </TouchableOpacity>
                                                    )}
                          {touched && errors && (
                            <Text
                              style={{
                                color: Colors.light.red,
                                marginTop: vs(5),
                                fontFamily: "PopinRegula",
                              }}
                            >
                              {errors.ad_by}
                            </Text>
                          )}
                        </View>
                      )}
                    </>
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
                  {edit ? (
                    <LargeButton
                      handleSubmit={() => {
                        handleSubmit();
                        console.log(errors);
                      }}
                      text="Submit Ad"
                    />
                  ) : (
                    <SelecteAdType
                      title1="Select Ad Type"
                      title2=""
                      btnTxt1="Free Ad"
                      btnTxt2="Trending Ad"
                      btn1value="Normal"
                      btn2value="Trending"
                      Componet1={
                        <>
                          <Text
                            style={{
                              marginTop: vs(10),
                              color: Colors.light.textGray,
                              fontFamily: "PopinRegula",
                              marginBottom: vs(10),
                            }}
                          >
                            Post your ad for free.You can upgrade your ad to
                            trending from your dashboard any time to make deal
                            done more quickly
                          </Text>
                          <LargeButton
                            handleSubmit={() => {
                              console.log(values);
                              handleSubmit();
                              console.log(errors);
                            }}
                            text="Submit Ad"
                          />
                        </>
                      }
                      Componet2={
                        <View className="flex-1">
                       <FlashList
  data={advertisePrices?.data ?? []}
  keyExtractor={(item) => item?.id?.toString()}
  extraData={values.ad_life}
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
  renderItem={({ item }) => (
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
            setFieldValue("ad_life", item?.life?.toString());
            setSelectedAmount(item?.price?.toString());
          }}
        >
          <MaterialIcons
            size={25}
            color={Colors.light.DarkGreen}
            name={
              values.ad_life === item?.life?.toString()
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
          For {item?.life?.toString()} Days
        </Text>
      </View>

      <Text style={{ fontFamily: "PopinRegula" }}>
        ${formatPrice(item?.price?.toString())}
      </Text>
    </View>
  )}
/>

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
                              Have more ads to post then buy bundle and get
                              extra discount. You’ can use credit any time means
                              no expiry!
                            </Text>
                            <LargeButton
                              text="Add Credits"
                              handleSubmit={() => {
                                router.push("/BuyCredit");
                              }}
                            />
                          </View>
                          <View>
                            <View style={styles.card}>
                              <Text style={styles.title}>
                                Pay and Ad post Atomaticlly
                              </Text>

                            <TouchableOpacity
  activeOpacity={0.85}
  className="mb-4"
  style={styles.paypalMainButton}
  onPress={async () => {
    const errors = await validateForm();

    setTouched({
      ad_life: true,
    });

    if (Object.keys(errors).length > 0) {
      console.log("Community validation:", errors);

      renderToastError("Please fill all required fields");
      return;
    }

    if (!selectedAmount) {
      renderToastError("Please select bundle first");
      return;
    }

    await setFieldValue(
      "payment_method",
      "Bank Alfalah",
      false
    );

    await setFieldValue(
      "amount",
      selectedAmount,
      false
    );

    await setFieldValue(
      "order_id",
      "",
      false
    );

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
  handleSubmit={async () => {
    if (!selectedAmount) {
      renderToastError(
        "Please select bundle first"
      );

      return;
    }

    const walletAmount =
      Number(
        amount?.amount ?? 0
      );

    if (
      walletAmount >=
      Number(selectedAmount)
    ) {
      await setFieldValue(
        "payment_method",
        "Wallet",
        false
      );

      await setFieldValue(
        "amount",
        selectedAmount,
        false
      );

      await setFieldValue(
        "order_id",
        "",
        false
      );

      handleSubmit();
    } else {
      renderToastError(
        "You don't have enough amount in wallet. Please recharge."
      );
    }
  }}
  text="Pay with wallet"
/>
                            </View>
                          </View>
                        </View>
                      }
                      value={values.post_type}
                      onPress={(selected) =>
                        setFieldValue("post_type", selected)
                      }
                    />
                  )}
                 
                <AlfalahPayment
  visible={visible}
  amount={selectedAmount}
  setVisible={setvisible}

  onPress={async (
    orderId,
    setApproveUrl
  ) => {
    try {
      console.log(
        "Community Alfalah payment success:",
        orderId
      );

      /**
       * ----------------------------------------
       * STEP 1:
       * Verify payment BEFORE community creation
       * ----------------------------------------
       */
      const verification =
        await verifyAlfalahPayment({
          order_id:
            String(orderId),
        }).unwrap();

      console.log(
        "Community payment verification:",
        verification
      );

      if (
        !verification?.success
      ) {
        renderToastError(
          verification?.message ||
            "Unable to verify payment."
        );

        return;
      }

      if (
        String(
          verification?.status
        ).toUpperCase() !==
        "PAID"
      ) {
        renderToastError(
          "Bank payment is not marked as paid."
        );

        return;
      }

      console.log(
        "COMMUNITY PAYMENT VERIFIED"
      );

      /**
       * ----------------------------------------
       * STEP 2:
       * Save payment info in Formik
       * ----------------------------------------
       */
      await setFieldValue(
        "order_id",
        String(orderId),
        false
      );

      await setFieldValue(
        "payment_method",
        "Bank Alfalah",
        false
      );

      await setFieldValue(
        "amount",
        selectedAmount,
        false
      );

      /**
       * Close payment modal
       */
      setApproveUrl(null);
      setvisible(false);

      /**
       * ----------------------------------------
       * STEP 3:
       * NOW community can be created
       * ----------------------------------------
       */
      setTimeout(() => {
        console.log(
          "Submitting community after verified payment"
        );

        handleSubmit();
      }, 200);

    } catch (error: any) {
      console.log(
        "Community Alfalah verification error:",
        error
      );

      console.log(
        "Verification response:",
        error?.data
      );

      renderToastError(
        error?.data?.message ||
          "Payment could not be verified. Community was not posted."
      );

      /**
       * IMPORTANT:
       * handleSubmit() yahan nahi karna.
       */
    }
  }}
/>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} text={"Creating Property Post"} />
      <Loading isLoading={EditLoading} text={"Loading..."} />

      <Loading isLoading={UpdateLoading} text={"Updating..."} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
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
  paypalMainButton: {
  backgroundColor: "#c21c1c",
  borderRadius: 14,
  paddingVertical: 16,
  paddingHorizontal: 15,
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
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
  title: {
    fontSize: ms(14),
    textAlign: "center",
    fontWeight: "500",
    marginBottom: vs(15),
    fontFamily: "PopinRegula",
  },
  paymentText: {
    color: "white",
    fontSize: ms(14),
    fontWeight: "600",
    marginLeft: hs(8),
  },

  paypalText: {
    marginLeft: hs(10),
    fontSize: ms(14),
    fontWeight: "600",
    color: "#003087",
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

  input: {
    borderWidth: 1,
    borderRadius: ms(8),
    fontSize: ms(14),
    fontFamily: "PopinRegula",
  },
  textview: {
    marginVertical: "auto",
    fontFamily: "PopinRegula",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
  uploadbutton: {
    color: "white",
    borderRadius: 8,
    alignItems: "center",
  },

 

});
