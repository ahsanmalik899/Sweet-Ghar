import {
  useInsertInquiryMutation,
  useLazyGetInquieryAgentQuery,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { AdressInput } from "@src/components/globals/AddressInput";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import StarRating from "@src/components/globals/StarRating";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import {
  renderAlertError,
  renderToastError,
  renderToastSuccess,
} from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";
const Index = () => {
  const { type } = useLocalSearchParams();
  console.log(type);
  const [ids, setIds] = useState<number[]>([]);
  const [profiletype,setProfiletype]=useState("agent");
  const user = useAppSelector(userdata);
  const [postInqiery, { isLoading }] = useInsertInquiryMutation();
  const [showMessage, setShowMessage] = useState(false);
  const [selectAll, setSellectall] = useState(false);
  const handleSelect = (id: number | string) => {
    const numId = Number(id);
    setIds((prev) => {
      if (prev.includes(numId)) {
        return prev.filter((i) => i !== numId);
      } else {
        return [...prev, numId];
      }
    });
  };
const homeValuationOptions = [
  "Selling property",
  "Letting property",
  "Remortgaging - Renovation - Purchasing",
  "Others",
];

const agentInquiryOptions = [
  "Buying property",
  "Selling property",
  "Letting property",
  "Others",
];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
       activeOpacity={1}
        style={[
          styles.smallCard,
          ,
          {
            backgroundColor: ids.includes(Number(item.users_id))
              ? Colors.light.LightGreen
              : "white",
            elevation: ids.includes(Number(item.users_id)) ? 0 : 3,
          },
        ]}
        activeOpacity={0.9}
        onPress={() => handleSelect(item.users_id)}
      >
        <View style={styles.headerRow}>
          <CircleImage source={{ uri: ImageFormater(item.logo) }} Size={40} />

          <View style={{ marginLeft: hs(10), flex: 1 }}>
            <Text numberOfLines={1} style={styles.name}>
              {item.business_name}
            </Text>
            <Text style={styles.city}>{item.city}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={{ marginTop: vs(6) }}>
          {item.dealing_city ?(
          <Text numberOfLines={1} style={styles.area}>
            📍{item.dealing_city}
          </Text>
          ):(
            <Text numberOfLines={1} style={styles.area}>
              📍{item.dealing_areas}
            </Text>
          )}

          <View style={styles.ratingRow}>
            <StarRating rating={item.rating} size={20}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [fetch, { isFetching, data }] = useLazyGetInquieryAgentQuery();
  const [page, setPage] = useState(1);
  const [agents, setAgents] = useState([]);
  const [step1Data, setStep1Data] = useState<any>(null);
  useEffect(() => {}, [page]);
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();
  const ValueValidation = Yup.object().shape({
    minBed: Yup.number().nullable().min(0, "Invalid value"),
    maxBed: Yup.number()
      .nullable()
      .when("minBed", (minBed, schema) =>
        minBed ? schema.min(minBed, "Max must be ≥ Min") : schema
      ),

    property_type: Yup.string().when("inquiry_for", {
      is: (inquiry_for) =>
        type === "buy" ||
        type === "rent" ||
        inquiry_for === "Investment inquiry" ||
        inquiry_for === "Mortgage advice",
      then: (schema) => schema.required("Property type is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    property_subtype: Yup.string().when("inquiry_for", {
      is: (inquiry_for) =>
        type === "maintenance" ||
        inquiry_for === "Investment inquiry" ||
        inquiry_for === "Mortgage advice",
      then: (schema) => schema.required("Property subtype is required"),
      otherwise: (schema) => schema.nullable(),
    }),

    bedroom: Yup.string().nullable(),
    min_price: Yup.number()
      .typeError("Minimum price must be a number")
      .nullable(),
    max_price: Yup.number()
      .nullable()
      .min(Yup.ref("min_price"), "Max price must be greater than min price"),

    address: Yup.string().required("Address is required"),
    zip: Yup.string().nullable(),
    lat: Yup.number().required("Address is required"),
    lng: Yup.number().required("Address is required"),
    state: Yup.string().required("Address is required"),
    radius: Yup.string().nullable(),

    message:
      step === 1
        ? Yup.string().required("Message is required")
        : Yup.string().nullable(),

    inquiryType: Yup.string().nullable(),
    inquiry_for: Yup.string().required("Inquiry for is required"),
 rent_type:Yup.string().nullable(),
    inv_loan_amount: Yup.string().when("inquiry_for", {
      is: (inquiry_for) =>
        inquiry_for === "Investment inquiry" ||
        inquiry_for === "Mortgage advice",
      then: (schema) => schema.required("Inquiry for is required"),
      otherwise: (schema) => schema.nullable(),
    }),
  });
const map = {
  "Mortgage advice": "mortgage",
  "Investment inquiry": "investor",
  "Electrical work": "electrician",
  "Plumbing": "plumber",
  "Paint work": "painter",
  "Renovation & décor": "decor",
  "Home building & extensions": "builder",
  "Service providers":"service",
  "Material suppliers":"material",
};
  const messagevalidation = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });
  if (step === 0) {
    return (
      <View className="flex-1 bg-white ">
        <HeaderWithBack />
        <Formik
          initialValues={{
            location: "",
            radius: "",
            inquiryType: "",
            lat: 0,
            lng: 0,
            zip: "",
            state: "",
            address: "",
            min_price: "",
            max_price: "",
            min_rent: "",
            max_rent: "",
            property_type: "",
            minBed: "",
            maxBed: "",
            newtype: "",
            inquiry_for: type,
            property_subtype: "",
            inv_loan_amount: "",
            rent_type:"",
          }}
          onSubmit={async (values) => {
            setStep1Data(values);
         
  const selectedProfile = map[values.inquiry_for] || "agent";
  setProfiletype(selectedProfile);
           
            const result = await fetch({
              lat: values.lat,
              lng: values.lng,
              radius: values.radius,
              inquiry_type: values.inquiryType,
              per_page: 10,
              page,
              type: selectedProfile,
              user_id: user.id,
            });
            if (result.data?.success) {
              setStep(1);
              if (page === 1) {
                setAgents(result.data?.locations);
              } else {
                setAgents((prev) => prev + result.data?.locations);
              }
            }
          }}
          validationSchema={ValueValidation}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
            setFieldValue,
          }) => (
            <>
              <View style={{ marginHorizontal: hs(20) }}>
                <Text style={styles.mainHeading}>
                  Get smart with{" "}
                  <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}>BEST</Text>{" "}
                  valuation
                </Text>
                <Text
                  style={{ marginTop: vs(10), color: Colors.light.textGray,fontFamily: "PopinRegula", }}
                >
                  Get authentic home valuation from our local expert agents for
                  FREE
                </Text>
                {type === "rent" && (
                  <View className="flex-row" style={{ marginTop: vs(20) }}>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                       activeOpacity={1}
                        onPress={() => {
                          setFieldValue(
                            "rent_type",
                            values.rent_type === "for_rent"
                              ? ""
                              : "for_rent"
                          );
                        }}
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.rent_type === "for_rent"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5),fontFamily: "PopinRegula", }}>
                        Need property for rent
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
                            "rent_type",
                            values.rent_type === "rent_out"
                              ? ""
                              : "rent_out"
                          );
                        }}
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.rent_type === "rent_out"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={{ marginLeft: hs(5),fontFamily: "PopinRegula", }}>Need to rent out</Text>
                  </View>
                )}
                {type === "community" && (
                  <View className="flex-row" style={{ marginTop: vs(20) }}>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                       activeOpacity={1}
                        onPress={() => {
                          setFieldValue(
                            "inquiryType",
                            values.inquiryType === "New  homes"
                              ? ""
                              : "New homes"
                          );
                        }}
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.inquiryType === "New homes"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5),fontFamily: "PopinRegula", }}>New homes</Text>
                    </View>

                    <View
                      className="flex-row items-center"
                      style={{ marginLeft: hs(20) }}
                    >
                      <TouchableOpacity
                       activeOpacity={1}
                        onPress={() => {
                          setFieldValue(
                            "inquiryType",
                            values.inquiryType === "New estate"
                              ? ""
                              : "New estate"
                          );
                        }}
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.inquiryType === "New estate"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={{ marginLeft: hs(5),fontFamily: "PopinRegula", }}>New estate</Text>
                  </View>
                )}
                {touched.inquiryType && errors.inquiryType && (
                  <Text style={{ color: Colors.light.red, marginTop: vs(5) ,fontFamily: "PopinRegula",}}>
                    {errors.inquiryType}
                  </Text>
                )}
                <View className="flex-row justify-between gap-2">
                  <View className="flex-1 mt-4">
                    <AdressInput
                      city={"city"}
                      zip={"zip"}
                      state={"state"}
                      name="address"
                      latValue={values.lat}
                      longValue={values.lng}
                      lat="lat"
                      long="lng"
                      setValue={setFieldValue}
                      onSelect={() => {}}
                      title=""
                      withmap={false}
                      placeholder="Enter Location"
                      value={values.address}
                      touched={!!touched.address}
                      errors={!!errors.address}
                      required
                      errorText={errors.address}
                    />
                  </View>
                  <View className="flex-1 mt-3">
                    <FormikDropdownwithjson
                      title={""}
                      placeholder={"Radius (miles)"}
                      value={values.radius}
                      options={[
                        { label: "Radius (miles)", value: "" },
                        { label: "1 mile", value: "1" },
                        { label: "5 miles", value: "5" },
                        { label: "10 miles", value: "10" },
                        { label: "20 miles", value: "20" },
                        { label: "30 miles", value: "30" },
                        { label: "40 miles", value: "40" },
                        { label: "50 miles", value: "50" },
                      ]}
                      name="radius"
                      touched={!!touched.radius}
                      errors={!!errors}
                      errorText={errors.radius}
                      onSelect={() => {}}
                      setValue={setFieldValue}
                    />
                  </View>
                </View>
                {(type === "maintenance" || type === "get help") && (
                  <FormikDropdown
                    title={"Inquiry for"}
                    placeholder={"Select Type"}
                    value={values.inquiry_for}
                    setValue={setFieldValue}
                    name="inquiry_for"
                    options={
                      type === "maintenance"
                        ? [
                            "Select type",
                            "Electrical work",
                            "Plumbing",
                            "Paint work",
                            "Renovation & décor",
                             "Service providers",
                             "Material suppliers",
                          ]
                        : [
                            "Agent inquiry",
                            "Mortgage advice",
                            "Investment inquiry",
                             "Home building & extensions",
                           
                          ]
                    }
                    onSelect={() => {}}
                    touched={!!touched.inquiry_for}
                    errors={!!errors}
                    errorText={errors.inquiry_for}
                    required
                  />
                )}
                {(type === "home valuation" ||
                  values.inquiry_for === "Agent inquiry") && (
                  <FormikDropdown
                    title={"Inquiry type"}
                    placeholder={"Select Type"}
                    value={values.inquiryType}
                    setValue={setFieldValue}
                    name="inquiryType"
                      options={
      type === "home valuation"
        ? homeValuationOptions
        : agentInquiryOptions
    }
                    onSelect={() => {}}
                    touched={!!touched.inquiryType}
                    errors={!!errors}
                    errorText={errors.inquiryType}
                    required
                  />
                )}

                {(type === "buy" ||
                  type === "rent" ||
                  type === "maintenance" ||
                  type === "community" ||
                  values.inquiry_for === "Mortgage advice" || values.inquiry_for === "Home building & extensions"||
                  values.inquiry_for === "Investment inquiry") && (
                  <>
                    <View className="flex-row justify-between items-start gap-3">
                      {type !== "community" && (
                        <View className="flex-1">
                          <FormikDropdown
                            key={"propertytype"}
                            onSelect={(value) => {
                              setFieldValue("property_type", value);
                              setFieldValue("property_subtype", "");
                            }}
                            options={["House", "Commercial", "Farms/Lands","Holidays"]}
                            title="Property Type "
                            placeholder="Select"
                            value={values.property_type}
                            touched={!!touched.property_type}
                            errors={!!errors.property_type}
                            required
                            errorText={errors.property_type}
                          />
                        </View>
                      )}
                      {(type === "maintenance" ||
                        values.inquiry_for === "Mortgage advice" ||values.inquiry_for === "Home building & extensions"||
                        values.inquiry_for === "Investment inquiry") && (
                        <View className="flex-1 ">
                          <FormikDropdown
                            title={"Sub-type"}
                            key={values.property_type}
                            setValue={setFieldValue}
                            touched={!!touched.property_subtype}
                            errors={!!errors.property_subtype}
                            errorText={errors.property_subtype}
                            placeholder="Property sub type"
                            value={values.property_subtype}
                            required
                          options={
  values.property_type === "House"
    ? [
        "House",
        "Flat / Apartment",
        "Villa",
        "Bungalow",
        "Townhouse",
        "Duplex",
        "Penthouse",
        "Portion",
        "Other",
      ]
    : values.property_type === "Commercial"
    ? [
        "Shop",
        "Showroom",
        "Office",
        "Commercial Building",
        "Plaza",
        "Warehouse",
        "Factory",
        "Restaurant / Café",
        "Hotel",
        "Guest House",
        "Commercial Plot",
        "Mixed-Use Property",
        "Other",
      ]
    : values.property_type === "Farms/Lands"
    ? [
        "Land",
        "Commercial development",
        "Industrial development",
        "Residential development",
        "Farms",
      ]
    : [
        "Holiday Home",
        "Cottage",
        "Chalet",
        "Farmhouse",
        "Vacation Villa",
        "Resort",
        "Guest House",
        "Hotel",
        "Other",
      ]
}
                            name="property_subtype"
                            onSelect={() => {}}
                          />
                        </View>
                      )}
                    </View>
                    {(type === "buy" || type === "community"||type === "rent") && (
                      <View className="flex-row justify-between items-start gap-3">
                        <View className="flex-1">
                          <FormikDropdownwithjson
                           title={type === "rent" ? "Minimum rent" : "Minimum price"}
                            placeholder="No Selection"
                            value={values.min_price}
                            touched={!!touched.min_price}
                            errors={!!errors.min_price}
                            errorText={errors.min_price}
                                options={
          type === "rent"
            ? [
                { label: "No selection", value: "" },
                { label: "Below PKR 5,000", value: "0" },
                { label: "PKR 5,000", value: "5000" },
                { label: "PKR 10,000", value: "10000" },
                { label: "PKR 15,000", value: "15000" },
                { label: "PKR 20,000", value: "20000" },
                { label: "PKR 25,000", value: "25000" },
                { label: "PKR 30,000", value: "30000" },
                { label: "PKR 40,000", value: "40000" },
                { label: "PKR 50,000", value: "50000" },
                { label: "PKR 75,000", value: "75000" },
                { label: "PKR 1 Lac", value: "100000" },
                { label: "PKR 1.5 Lac", value: "150000" },
                { label: "PKR 2 Lac", value: "200000" },
                { label: "PKR 2.5 Lac", value: "250000" },
                { label: "PKR 3 Lac", value: "300000" },
                { label: "PKR 4 Lac", value: "400000" },
                { label: "PKR 5 Lac", value: "500000" },
                { label: "PKR 7.5 Lac", value: "750000" },
                { label: "PKR 1 Million", value: "1000000" },
              ]
            : type === "community"
            ? [
                { label: "No selection", value: "" },
                { label: "Below PKR 50 Lac", value: "0" },
                { label: "PKR 50 Lac", value: "5000000" },
                { label: "PKR 75 Lac", value: "7500000" },
                { label: "PKR 1 Crore", value: "10000000" },
                { label: "PKR 2 Crore", value: "20000000" },
                { label: "PKR 3 Crore", value: "30000000" },
                { label: "PKR 5 Crore", value: "50000000" },
                { label: "PKR 7.5 Crore", value: "75000000" },
                { label: "PKR 10 Crore", value: "100000000" },
                { label: "PKR 20 Crore", value: "200000000" },
                { label: "PKR 30 Crore", value: "300000000" },
                { label: "PKR 50 Crore", value: "500000000" },
                { label: "PKR 75 Crore", value: "750000000" },
                { label: "PKR 1 Arab", value: "1000000000" },
                { label: "PKR 2 Arab", value: "2000000000" },
                { label: "PKR 3 Arab", value: "3000000000" },
                { label: "PKR 5 Arab", value: "5000000000" },
              ]
            : [
                { label: "No selection", value: "" },
                { label: "Below PKR 10 Lac", value: "0" },
                { label: "PKR 10 Lac", value: "1000000" },
                { label: "PKR 15 Lac", value: "1500000" },
                { label: "PKR 20 Lac", value: "2000000" },
                { label: "PKR 25 Lac", value: "2500000" },
                { label: "PKR 30 Lac", value: "3000000" },
                { label: "PKR 40 Lac", value: "4000000" },
                { label: "PKR 50 Lac", value: "5000000" },
                { label: "PKR 75 Lac", value: "7500000" },
                { label: "PKR 1 Crore", value: "10000000" },
                { label: "PKR 1.5 Crore", value: "15000000" },
                { label: "PKR 2 Crore", value: "20000000" },
                { label: "PKR 3 Crore", value: "30000000" },
                { label: "PKR 5 Crore", value: "50000000" },
                { label: "PKR 7.5 Crore", value: "75000000" },
                { label: "PKR 10 Crore", value: "100000000" },
                { label: "PKR 20 Crore", value: "200000000" },
                { label: "PKR 30 Crore", value: "300000000" },
                { label: "PKR 50 Crore", value: "500000000" },
                { label: "PKR 75 Crore", value: "750000000" },
                { label: "PKR 1 Arab", value: "1000000000" },
              ]
        }
                            onSelect={(value) => {
                              setFieldValue("min_price", value);
                            }}
                          />
                        </View>

                        <View className="flex-1">
                          <FormikDropdownwithjson
                           title={type === "rent" ? "Maximum rent" : "Maximum price"}
                            placeholder="No Selction"
                            value={values.max_price}
                            touched={!!touched.max_price}
                            errors={!!errors.max_price}
                            errorText={errors.max_price}
                             options={
          type === "rent"
            ? [
                { label: "No selection", value: "" },
                { label: "PKR 5,000", value: "5000" },
                { label: "PKR 10,000", value: "10000" },
                { label: "PKR 15,000", value: "15000" },
                { label: "PKR 20,000", value: "20000" },
                { label: "PKR 25,000", value: "25000" },
                { label: "PKR 30,000", value: "30000" },
                { label: "PKR 40,000", value: "40000" },
                { label: "PKR 50,000", value: "50000" },
                { label: "PKR 75,000", value: "75000" },
                { label: "PKR 1 Lac", value: "100000" },
                { label: "PKR 1.5 Lac", value: "150000" },
                { label: "PKR 2 Lac", value: "200000" },
                { label: "PKR 2.5 Lac", value: "250000" },
                { label: "PKR 3 Lac", value: "300000" },
                { label: "PKR 4 Lac", value: "400000" },
                { label: "PKR 5 Lac", value: "500000" },
                { label: "PKR 7.5 Lac", value: "750000" },
                { label: "PKR 1 Million", value: "1000000" },
                { label: "Above PKR 1 Million", value: "1000001" },
              ]
            : type === "community"
            ? [
                { label: "No selection", value: "" },
                { label: "PKR 50 Lac", value: "5000000" },
                { label: "PKR 75 Lac", value: "7500000" },
                { label: "PKR 1 Crore", value: "10000000" },
                { label: "PKR 2 Crore", value: "20000000" },
                { label: "PKR 3 Crore", value: "30000000" },
                { label: "PKR 5 Crore", value: "50000000" },
                { label: "PKR 7.5 Crore", value: "75000000" },
                { label: "PKR 10 Crore", value: "100000000" },
                { label: "PKR 20 Crore", value: "200000000" },
                { label: "PKR 30 Crore", value: "300000000" },
                { label: "PKR 50 Crore", value: "500000000" },
                { label: "PKR 75 Crore", value: "750000000" },
                { label: "PKR 1 Arab", value: "1000000000" },
                { label: "PKR 2 Arab", value: "2000000000" },
                { label: "PKR 3 Arab", value: "3000000000" },
                { label: "PKR 5 Arab", value: "5000000000" },
                { label: "Above PKR 5 Arab", value: "5000000001" },
              ]
            : [
                { label: "No selection", value: "" },
                { label: "PKR 10 Lac", value: "1000000" },
                { label: "PKR 15 Lac", value: "1500000" },
                { label: "PKR 20 Lac", value: "2000000" },
                { label: "PKR 25 Lac", value: "2500000" },
                { label: "PKR 30 Lac", value: "3000000" },
                { label: "PKR 40 Lac", value: "4000000" },
                { label: "PKR 50 Lac", value: "5000000" },
                { label: "PKR 75 Lac", value: "7500000" },
                { label: "PKR 1 Crore", value: "10000000" },
                { label: "PKR 1.5 Crore", value: "15000000" },
                { label: "PKR 2 Crore", value: "20000000" },
                { label: "PKR 3 Crore", value: "30000000" },
                { label: "PKR 5 Crore", value: "50000000" },
                { label: "PKR 7.5 Crore", value: "75000000" },
                { label: "PKR 10 Crore", value: "100000000" },
                { label: "PKR 20 Crore", value: "200000000" },
                { label: "PKR 30 Crore", value: "300000000" },
                { label: "PKR 50 Crore", value: "500000000" },
                { label: "PKR 75 Crore", value: "750000000" },
                { label: "PKR 1 Arab", value: "1000000000" },
                { label: "Above PKR 1 Arab", value: "1000000001" },
              ]
        }
                            onSelect={(value) =>
                              setFieldValue("max_price", value)
                            }
                          />
                        </View>
                      </View>
                    )}
                 
                    {(type === "buy" ||
                      type === "rent" ||
                      type === "community") && (
                      <View className="flex-row justify-between items-start gap-3">
                        <View className="flex-1">
                          <FormikDropdown
                            onSelect={() => {}}
                            options={[
                              "Studio",
                              "0",
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "10+",
                            ]}
                            title="Minimum Beds"
                            name="minBed"
                            openDirection="TOP"
                            setValue={setFieldValue}
                            placeholder="Beds"
                            value={values.minBed}
                            touched={!!touched.minBed}
                            errors={!!errors.minBed}
                            errorText={errors.minBed}
                          />
                        </View>
                        <View className="flex-1">
                          <FormikDropdown
                            onSelect={() => {}}
                            options={[
                              "0",
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "10+",
                            ]}
                            title="Maximum Beds"
                            placeholder="Beds"
                            name="maxBed"
                            openDirection="TOP"
                            setValue={setFieldValue}
                            value={values.maxBed}
                            touched={!!touched.maxBed}
                            errors={!!errors.maxBed}
                            errorText={errors.maxBed}
                          />
                        </View>
                      </View>
                    )}
                    {(values.inquiry_for === "Mortgage advice" ||
                      values.inquiry_for === "Investment inquiry") && (
                       
                      <View className="flex-1 mt-5">
                        <FormikDropdownwithjson
                          title="Select amount"
                          placeholder={"select amount"}
                          value={values.inv_loan_amount}
                          options={[
                            { label: "upto 100,000", value: "100000" },
                            { label: "upto 500,000", value: "500000" },
                            { label: "upto 1 million", value: "1000000" },
                            { label: "upto 5 million", value: "5000000" },
                            { label: "upto 10 million", value: "10000000" },
                          ]}
                          name="inv_loan_amount"
                          touched={!!touched.inv_loan_amount}
                          errors={!!errors.inv_loan_amount}
                          errorText={errors.inv_loan_amount}
                          onSelect={() => {}}
                          setValue={setFieldValue}
                        />
                      </View>
                    )}
                  </>
                )}
              </View>

              <View className="mt-auto mb-5 px-[20px]">
                <LargeButton
                  text="Next"
                  handleSubmit={() => {
                    handleSubmit();
                    console.log(errors);
                  }}
                />
              </View>
            </>
          )}
        </Formik>
        <Loading isLoading={isFetching} text="serching...." />
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-white">
        <HeaderWithBack
          onBackpress={() => {
            setStep(0);
            setIds([]);
          }}
        />

        <View style={{ flex: 1, marginHorizontal: hs(20) }}>
          <Text style={styles.mainHeading}>Select agents for valuation</Text>
          <View
            style={{
              height: vs(1),
              marginTop: vs(20),
              marginBottom: vs(10),
              backgroundColor: Colors.light.textGray,
              opacity: 0.2,
            }}
          />
          <TouchableOpacity
           activeOpacity={1}
            className="flex-row gap-3 mb-3"
            onPress={() => {
              const newSelectAll = !selectAll;
              setSellectall(newSelectAll);
              console.log(data);
              setIds(newSelectAll ? data?.all_profile_ids ?? [] : []);
            }}
          >
            <MaterialIcons
              size={18}
              color={Colors.light.DarkGreen}
              name={selectAll ? "check-box" : "check-box-outline-blank"}
            />
            <Text style={{fontFamily: "PopinRegula",}}>Select All</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              {!isFetching && agents?.length === 0 ? (
                <View style={{ alignItems: "center", marginTop: 120 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" ,fontFamily: "PopinRegula",}}
                  >
                    No Data Found
                  </Text>
                </View>
              ) : (
                <View className="flex-1">
            <FlashList
 
  data={agents ?? []}
  extraData={ids}
  renderItem={renderItem}
  keyExtractor={(item) => item.id?.toString()}
  onEndReachedThreshold={1}
  onEndReached={() => {
    if (!isFetching && agents?.length > 9) {
      setPage((prev) => prev + 1);
    }
  }}
  ListFooterComponent={
    isFetching && page > 1 ? (
      <ActivityIndicator size="small" />
    ) : null
  }
  refreshControl={
    <RefreshControl
      refreshing={isFetching && page === 1}
      onRefresh={() => setPage(1)}
    />
  }
/>
                </View>
              )}
            </View>

            <View style={{ paddingVertical: 10 }}>
              <LargeButton
                text={`Send Message to ${ids.length}`}
                handleSubmit={() => {
                  if (ids.length < 1) {
                    renderAlertError("Atleast select one agent");
                  } else {
                    setShowMessage(true);
                  }
                }}
              />
            </View>
          </View>
        </View>

        {showMessage && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              zIndex: 1000,
            }}
          >
            <HeaderWithBack
              onBackpress={() => {
                setShowMessage(false);
              }}
            />
            <View style={{ marginHorizontal: hs(20) }}>
              <Formik
                initialValues={{ message: "" }}
                onSubmit={async (values) => {
                  const formData = new FormData();

// ===== BASIC =====
formData.append("type", profiletype); // agent, mortgage, investor etc
formData.append("message", values.message);
formData.append("user_id", user.id.toString());
formData.append("locationIds", ids.join(","));

// ===== STEP1 DATA =====
formData.append("full_address", step1Data.address || "");
formData.append("state", step1Data.state || "");
formData.append("zip", step1Data.zip || "");
formData.append("lat", step1Data.lat || "");
formData.append("lng", step1Data.lng || "");
formData.append("radius", step1Data.radius || "");

formData.append("inquiry_type", step1Data.inquiryType || "");
formData.append("inquiry_for", step1Data.inquiry_for || "");

// ===== PROPERTY =====
formData.append("property_type", step1Data.property_type || "");
formData.append("property_subtype", step1Data.property_subtype || "");

formData.append("min_price", step1Data.min_price || "");
formData.append("max_price", step1Data.max_price || "");
formData.append("min_rent", step1Data.min_rent || "");
formData.append("max_rent", step1Data.max_rent || "");

formData.append("min_bed", step1Data.minBed || "");
formData.append("max_bed", step1Data.maxBed || "");
formData.append("rent_type", step1Data.rent_type || "");

// ===== INVESTMENT / MORTGAGE =====
formData.append("inv_loan_amount", step1Data.inv_loan_amount || "");

                  try {
                    const result = await postInqiery(formData).unwrap();

                    renderToastSuccess("Inquiry sent successfully!");
                    router.back()
                  } catch (err) {
                    console.log("Error:", err);
                    renderToastError("Failed to send inquiry");
                  }
                }}
                validationSchema={messagevalidation}
              >
                {({
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <>
                    <FormikInput
                      title="Write Message"
                      placeholder="Write..."
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                      value={values.message}
                      touched={!!touched.message}
                      errors={!!errors.message}
                      required
                      multiline
                      errorText={errors.message}
                    />
                    <Text  style={{fontFamily: "PopinRegula",}} className="mt-5">
                      by proceeding,you consent to receive ccalls and texts at
                      the number you provided, including marketing by autodialer
                      and prerecorded and artificial voice, and email, from
                      homeilove,agents,mortgage advisors and others about your
                      inquiry and other home-related matters,but not as a
                      condition or any purchase. You also agree to our Terms of
                      Use, and to our Privacy Policy regarding the information
                      relating to you. Message data rates may apply. This
                      consent applies even if you are on a corporate, state or
                      national Do Not Call list.
                    </Text>
                    <View className=" mb-5 mt-5 ">
                      <LargeButton
                        text="Send Now"
                        handleSubmit={() => {
                          handleSubmit();
                        }}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <Loading isLoading={isLoading} text="Sending inqiry..." />
          </View>
        )}
      </View>
    );
  }
};

export default Index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
    fontFamily: "PopinRegula",
  },

  uperSection: {
    marginLeft: hs(10),
  },

  connection: {
    fontSize: ms(12),
    color: "#666",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontWeight: "600",
    color: "#333",
    fontFamily: "PopinRegula",
  },

  value: {
    color: "#666",
  },

  smallCard: {
    padding: ms(12),
    borderRadius: 14,
    marginVertical: vs(6),
    marginHorizontal: hs(2),
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    fontSize: ms(14),
    fontWeight: "700",
    color: "#000",
    fontFamily: "PopinRegula",
  },

  city: {
    fontSize: ms(12),
    color: "#666",
    marginTop: 2,
    fontFamily: "PopinRegula",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: vs(8),
  },

  area: {
    fontSize: ms(12),
    color: "#444",
    fontFamily: "PopinRegula",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: vs(6),
  },

  ratingText: {
    marginLeft: hs(6),
    fontSize: ms(12),
    fontWeight: "600",
    color: "#0A84FF",
  },

  bottomRow: {
    alignItems: "flex-end",
    marginTop: vs(8),
  },
});
