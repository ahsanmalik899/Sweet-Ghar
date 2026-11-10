import {
  useCaptureAlfalahPaymentMutation,
  useCreateProfileMutation,
  useGetPriceQuery,
  useGetSingleProfileQuery,
  useGetUserWalletQuery,
  useUpdateProfileMutation,
  useVerifyAlfalahPaymentMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { AdressInput } from "@src/components/globals/AddressInput";
import DatePickerField from "@src/components/globals/DatePickerField";
import { DealingAreas } from "@src/components/globals/DealingAreas";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import AlfalahPayment from "@src/components/globals/PapPalPayment";
import SelecteAdType from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";

import { FlashList } from "@shopify/flash-list";
import { formatPrice } from "@utils/PriceFormater";
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
interface ProfileConfig {
  profileType: string;
  title: string;
  serviceTitle: string;
  licenceNoTitle: string;
  serviceDefault: string;
  serviceOption: string[];
  isService: Boolean;
  isLicenceIssue: Boolean;
  isInvestor: Boolean;
  servingas: boolean;
  institution: boolean;
  licExpiry: boolean;
  licState: boolean;
  valuation: boolean;
  licence: boolean;
  multilicence: boolean;
}
const Index = () => {
  let dataAccordingType: ProfileConfig = {
    profileType: "",
    title: "Profile",
    licenceNoTitle: "License No",
    serviceTitle: "",
    serviceDefault: "",
    serviceOption: [],
    isService: false,
    isLicenceIssue: true,
    isInvestor: false,
    servingas: false,
    institution: false,
    licExpiry: false,
    licState: false,
    valuation: false,
    multilicence: true,
    licence: true,
  };
  
  const user = useAppSelector(userdata);
  const { type } = useLocalSearchParams();
  const [valuationFor, setValuationFor] = useState(false);
  const params = useLocalSearchParams();

  const [capturePayment, { isLoading: isCapturing }] =
    useCaptureAlfalahPaymentMutation();

  const [verifyAlfalahPayment, { isLoading: isVerifyingAlfalah }] =
    useVerifyAlfalahPaymentMutation();
  const ProfileType = params.ProfileType as string;
  const id = Number(params.id);
  const edit = params.edit === "true";
     
  const [selectedAmount, setSelectedAmount] = useState("");
  const [visible, setvisible] = useState(false);
  const { data, isLoading: LodingEditData } = useGetSingleProfileQuery(
    { type: ProfileType, id },
    { skip: !edit }
  );
  const {
    data: amount,
    isLoading: AmountLoading,
    isFetching,
  } = useGetUserWalletQuery(
    { id: user.id },
    { skip: !user?.id }
  );
  switch (type) {
    case "Builder Profile":
      dataAccordingType = {
        profileType: "Builder",
        title: "Builder",
        licenceNoTitle: "License No",
        serviceTitle: "Services for",
        serviceDefault: "",
        serviceOption: [
          "All type of developments",
          "Home developments",
          "Commercial developments",
          "Housing estates developments",
          "Home renovation",
          "Home re-build",
          "Home extensions",
          "Other",
        ],
        multilicence: true,
        isLicenceIssue: true,
        isService: true,
        isInvestor: false,
        servingas: true,
        institution: false,
        licExpiry: false,
        licState: false,
        valuation: false,
        licence: true,
      };
      break;

    case "Mortgage Profile":
      dataAccordingType = {
        profileType: "Mortgage",
        title: "Mortgage Advisor",
        serviceTitle: "Serving as ",
        serviceDefault: "",
        isService: true,
        serviceOption: ["Loan officer", "Mortgage broker", "Mortgage lender"],
        isLicenceIssue: false,
        licenceNoTitle: "NMLS License No",
        isInvestor: false,
        servingas: false,
        institution: true,
        licExpiry: false,
        multilicence: false,
        licState: false,
        licence: true,
        valuation: false,
      };
      break;

    case "Decor Profile":
      dataAccordingType = {
        profileType: "Decor",
        title: "Home Decor",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        licenceNoTitle: "License No",
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licence: true,
        licState: false,
        valuation: false,
      };
      
      break;
  case "Material Supplier Profile":
      dataAccordingType = {
        profileType: "Material_supplier",
        title: "Material Supplier",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        licenceNoTitle: "License No",
        serviceOption: [],
        isLicenceIssue: false,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licence: false,
        licState: false,
        valuation: false,
      };
      break;
    case "Plumber Profile":
      dataAccordingType = {
        profileType: "Plumber",
        title: "Plumber",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        licence: true,
        institution: false,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;

    case "Painter Profile":
      dataAccordingType = {
        profileType: "Painter",
        title: "Painter",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licence: true,
        licState: false,
        valuation: false,
      };
      break;

    case "Investor Profile":
      dataAccordingType = {
        profileType: "Investor",
        title: "Investor",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        serviceOption: [],
        isLicenceIssue: false,
        isInvestor: true,
        servingas: false,
        licence: false,
        institution: false,
        multilicence: true,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;

    case "Electrician Profile":
      dataAccordingType = {
        profileType: "Electrician",
        title: "Electrician",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        licence: true,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;
    case "Agent Profile":
      dataAccordingType = {
        profileType: "Agent",
        title: "Agent",
        serviceTitle: "Services for",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: true,
        licence: true,
        serviceOption: [
          "Listing agent",
          "Letting agent",
          "Relocation",
          "Foreclosure",
          "Short sale",
          "Consulting",
        ],
        isLicenceIssue: false,
        isInvestor: false,
        servingas: true,
        institution: false,
        licExpiry: true,
        multilicence: false,
        licState: true,
        valuation: true,
      };
      break;

    default:
      dataAccordingType = {
        profileType: "Builder",
        title: "Profile",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        licenceNoTitle: "License No",
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        licence: true,
        institution: false,
        multilicence: true,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;
  }
 const {data:advertisePrices}=useGetPriceQuery({price_type:"Profile",profile_type:dataAccordingType?.profileType?.toLowerCase()})
  const [createprofile, { isLoading }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: UpdateLoading }] =
    useUpdateProfileMutation();
  const ProfileSchema = Yup.object().shape({
    business_name: Yup.string()
      .min(2, "Too short!")
      .required("Business name is required"),

    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .min(10, "Too short!")
      .max(15, "Too long!")
      .required("Contact number is required"),

    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),

    zip: Yup.string().nullable(),

    user_lat: Yup.number().required("Latituted is required"),
    user_lng: Yup.number().nullable("Longitude is required"),

    web: Yup.string().url("Invalid website URL").nullable(),
    license_no: dataAccordingType.licence
      ? Yup.string().required("License no is required")
      : Yup.string().nullable(),
    lic_state: dataAccordingType.licState
      ? Yup.string().required("License state is required")
      : Yup.string().nullable(),
    lic_expiry: dataAccordingType.licExpiry
      ? Yup.string().required("License expiry is required")
      : Yup.string().nullable(),

    dealing_areas: Yup.string().required("Dealing areas are required"),
    dealing_city: Yup.string().nullable(),

    latitude: Yup.string().nullable(),
    longitude: Yup.string().nullable(),
    issuing_authority: Yup.string().nullable(),
    investor_type: dataAccordingType.isInvestor
      ? Yup.string().required("Please select investor type")
      : Yup.string().nullable(),

    invest_in: dataAccordingType.isInvestor
      ? Yup.string().required("Please select where you invest")
      : Yup.string().nullable(),

    min_invest: dataAccordingType.isInvestor
      ? Yup.number()
          .typeError("Minimum investment must be a number")
          .required("Please enter minimum investment")
          .positive("Must be a positive number")
      : Yup.number().nullable(),

    max_invest: dataAccordingType.isInvestor
      ? Yup.number()
          .typeError("Maximum investment must be a number")
          .required("Please enter maximum investment")
          .moreThan(
            Yup.ref("min_invest"),
            "Must be greater than minimum investment"
          )
      : Yup.number().nullable(),

    advisory_service: dataAccordingType.valuation
      ? Yup.string().required(
          "Please select whether you offer valuation service"
        )
      : Yup.string().required(
          "Please select whether you offer advisory service"
        ),

    remarks: Yup.string()
      .nullable()
      .max(5000, "Maximum 5000 characters allowed"),
 MaterialService:
  dataAccordingType.profileType === "Material_supplier"
    ? Yup.string().required("Please select Material or Services")
    : Yup.string().nullable(),

suppleryservices: Yup.string().when("MaterialService", {
  is: "services",
  then: (schema) =>
    schema.required("Please select at least one service"),
  otherwise: (schema) => schema.nullable(),
}),

suplertsmaterial: Yup.string().when("MaterialService", {
  is: "material",
  then: (schema) =>
    schema.required("Please select at least one material"),
  otherwise: (schema) => schema.nullable(),
}),
    youtube_link: Yup.string().url("Invalid YouTube URL").nullable(),
    institution: Yup.string().nullable(),
    users_id: Yup.number(),
    post_type: Yup.string().required("Please select add type"),
    payment_method: Yup.string().nullable(),
    order_id: Yup.string().nullable(),
    amount: Yup.mixed().nullable(),
    logo: Yup.mixed().nullable(),
    cover: Yup.mixed().nullable(),
    valuation_for: valuationFor
      ? Yup.string().required("Valuation for is required")
      : Yup.string().nullable(),
    services: dataAccordingType.isService
      ? Yup.string().required("Please select a service")
      : Yup.string().nullable(),
  });
  useEffect(() => {
    if (edit && data?.data) {
      setValuationFor(!!data.data.valuation_for);
    }
  }, [edit, data]);
  return (
    <View className="bg-white flex-1 ">
      <ScrollView>
        <HeaderWithBack />
        <Text
          style={{
            marginTop: vs(30),
            marginHorizontal: hs(20),
            fontSize: ms(20),
            fontWeight: 500,
            fontFamily: "PopinRegula",
          }}
        >
          Create your{" "}
          <Text style={{ color: Colors.light.red, fontFamily: "PopinRegula" }}>
            {dataAccordingType.title}
          </Text>{" "}
          profile
        </Text>

        <View
          style={{
            marginHorizontal: hs(20),
            marginTop: vs(20),
            marginBottom: vs(20),
          }}
        >
          <Formik
            initialValues={{
              business_name: edit ? data?.data?.business_name || "" : "",
              contact: edit ? data?.data?.contact || "" : "",
              address: edit ? data?.data?.address || "" : "",
              city: edit ? data?.data?.city || "" : "",
              state: edit ? data?.data?.state || "" : "",
              zip: edit ? data?.data?.zip || "" : "",
              user_lat: edit ? data?.data?.user_lat || 0 : 0,
              user_lng: edit ? data?.data?.user_lng || 0 : 0,
              web: edit ? data?.data?.web || "" : "",

              license_no: edit ? data?.data?.license_no || "" : "",
              lic_state: edit ? data?.data?.lic_state || "" : "",
              lic_expiry: edit ? data?.data?.lic_expiry || "" : "",

              dealing_areas: edit ? data?.data?.dealing_areas || "" : "",
              dealing_city: edit ? data?.data?.dealing_city || "" : "",

              latitude: edit ? data?.data?.latitude : null,
              longitude: edit ? data?.data?.longitude : null,

              investor_type: "",
              invest_in: "",
suppleryservices: edit
  ? data?.data?.services || ""
  : "",

suplertsmaterial: edit
  ? data?.data?.material || ""
  : "",
   MaterialService: edit
  ? data?.data?.material
    ? "material"
    : data?.data?.services
      ? "services"
      : ""
  : "",
              issuing_authority: edit ? data?.data?.issuing_authority : "",

              min_invest: edit ? data?.data?.min_invest : "",
              max_invest: edit ? data?.data?.max_invest : "",

              advisory_service: edit
                ? data?.data?.valuation_for
                  ? "Yes"
                  : data?.data?.advisory_service
                : "",
             
              remarks: edit ? data?.data?.remarks || "" : "",

              youtube_link: edit ? data?.data?.youtube_link || "" : "",

              services: edit
                ? data?.data?.services || data?.data?.agent_for
                : "",

              users_id: user.id,

              post_type: edit ? data?.data?.post_type || "Normal" : "Normal",
              payment_method: edit ? data?.data?.payment_method || "" : "",
              order_id: "",
              amount: "",

              logo: edit ? data?.data?.logo : null,
              cover: edit ? data?.data?.cover : null,

              institution: edit ? data?.data?.institution : "",
              id: edit ? data?.data?.id : "",
              valuation_for: edit ? data?.data?.valuation_for || "" : "",
              time_period: edit ? data?.data?.time_period || "" : "", 
            }}
            validationSchema={ProfileSchema}
            onSubmit={async (values) => {
              try {
                const needsBankPayment =
                  !edit &&
                  values.post_type === "Trending" &&
                  values.payment_method !== "Wallet";

                if (needsBankPayment && !values.order_id) {
                  renderToastError(
                    "Please complete payment before creating the profile."
                  );
                  return;
                }

                const formData = new FormData();

                // Append profile type
                formData.append("profileType", dataAccordingType.profileType);

                // Append all fields except files
                Object.entries(values).forEach(([key, value]) => {
                  if (
                    key !== "logo" &&
                    key !== "cover" &&
                    value != null &&
                    value !== ""
                  ) {
                    if (key === "services" && type === "Agent Profile") {
                      formData.append("agent_for", String(value));
                    } else {
                      formData.append(key, String(value));
                    }
                  }
                });

                // Append logo if selected
                if (values.logo?.uri) {
                  formData.append("logo", {
                    uri: values.logo.uri,
                    type: values.logo.type || "image/jpeg",
                    name: values.logo.name || "logo.jpg",
                  } as any);
                }

                // Append cover if selected
                if (values.cover?.uri) {
                  formData.append("cover", {
                    uri: values.cover.uri,
                    type: values.cover.type || "image/jpeg",
                    name: values.cover.name || "cover.jpg",
                  } as any);
                }

                const res = edit
                  ? await updateProfile(formData).unwrap()
                  : await createprofile(formData).unwrap();

                if (res?.success) {
                    if(edit||values.post_type ==="Normal"||values.payment_method==="Wallet"){
                  renderToastSuccess(
                    res?.message || "Profile created successfully"
                  );
                  router.replace("/BusenessProfiles");
                }
                else{
                   await capturePayment({
                    order_id:values.order_id,
                    user_id: user.id,
                    upgrade_type: "Profile",
                    profile_type:dataAccordingType.profileType  || "",
                    upgrade_id:res?.data?.id  ,
                    upgrade_amount: selectedAmount || 0,
                  }).unwrap();
                    renderToastSuccess(
                    res?.message || "Profile created successfully"
                  );
                  
                  router.replace("/BusenessProfiles");
                }
                } else {
                  renderToastError(res?.message || "Profile creation failed");
                }
              } catch (err: any) {
                renderToastError(
                  err?.data?.message || err?.message || "Network error"
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
              setTouched,
              validateForm,
            }) => (
              <>
                {dataAccordingType.isInvestor && (
                  <>
                    <FormikDropdown
                      title={"Investor Type"}
                      setValue={setFieldValue}
                      placeholder={"Nothing selected"}
                      value={values.investor_type}
                      options={[
                        "Private investor",
                        "REIT",
                        "Institude",
                        "Crowd fund",
                        "Others",
                      ]}
                      name="investor_type"
                      onSelect={(val) => setFieldValue("investor_type", val)}
                      touched={!!touched.investor_type}
                      errors={!!errors.investor_type}
                      errorText={errors.investor_type}
                      required
                    />

                    <FormikDropdown
                      title={"Invest in"}
                      placeholder={"Nothing selected"}
                      value={values.invest_in}
                      name="invest_in"
                      setValue={setFieldValue}
                      options={[
                        "Residential",
                        "Commercial",
                        "Institude",
                        "Residential & Commercial",
                        "Land",
                        "Community development",
                        "Others",
                      ]}
                      onSelect={(val) => setFieldValue("invest_in", val)}
                      touched={!!touched.invest_in}
                      errors={!!errors.invest_in}
                      errorText={errors.invest_in}
                      multipleFields
                      required
                    />
                    <View className="flex-row justify-between">
                      <View className="flex-1" style={{ marginRight: hs(5) }}>
                        <FormikDropdownwithjson
                          title={"Investment amount"}
                          placeholder={"From"}
                          value={values.min_invest}
                          options={[
                            { label: "Any", value: 1 },
                            { label: "from 1 million", value: 1000000 },
                            { label: "from 20 million", value: 2000000 },
                            { label: "from 50 million", value: 5000000 },
                            { label: "from 60 million", value: 6000000 },
                          ]}
                          onSelect={(val) => setFieldValue("min_invest", val)}
                          touched={!!touched.min_invest}
                          errors={!!errors.min_invest}
                          errorText={errors.min_invest}
                          required
                        />
                      </View>

                      <View
                        className="flex-1"
                        style={{ marginLeft: hs(5), marginTop: vs(30) }}
                      >
                        <FormikDropdownwithjson
                          title={""}
                          placeholder={"To"}
                          value={values.max_invest}
                          options={[
                            { label: "upto 1 million", value: 1000000 },
                            { label: "upto 20 million", value: 2000000 },
                            { label: "upto 50 million", value: 5000000 },
                            { label: "upto 60 million", value: 6000000 },
                            { label: "Above 60 million", value: 60000001 },
                          ]}
                          onSelect={(val) => setFieldValue("max_invest", val)}
                          touched={!!touched.max_invest}
                          errors={!!errors.max_invest}
                          required
                          errorText={errors.max_invest}
                        />
                      </View>
                    </View>
                  </>
                )}

                <FormikInput
                  title="Display name"
                  placeholder="Name"
                  onChangeText={handleChange("business_name")}
                  onBlur={handleBlur("business_name")}
                  value={values.business_name}
                  touched={!!touched.business_name}
                  errors={!!errors.business_name}
                  additonalText="This will displayed on profile"
                  required
                  errorText={errors.business_name}
                />
               {dataAccordingType.profileType === "Material_supplier" && (
  <>
    <View
      className="flex-row"
      style={{ marginTop: vs(10), marginBottom: vs(20) }}
    >
      {/* Material Supplies */}
      <View className="flex-row items-center">
        <TouchableOpacity
          activeOpacity={1}
         onPress={() => {
  setFieldValue(
    "MaterialService",
    values.MaterialService === "material" ? "" : "material"
  );

  setFieldValue("suppleryservices", "");
}}
        >
          <MaterialIcons
            size={18}
            color={Colors.light.DarkGreen}
            name={
              values.MaterialService === "material"
                ? "check-box"
                : "check-box-outline-blank"
            }
          />
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: hs(5),
            fontFamily: "PopinRegula",
          }}
        >
          Material Supplies
        </Text>
      </View>

      {/* Services */}
      <View
        className="flex-row items-center"
        style={{ marginLeft: hs(20) }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
  setFieldValue(
    "MaterialService",
    values.MaterialService === "services" ? "" : "services"
  );

  setFieldValue("suplertsmaterial", "");
}}
        >
          <MaterialIcons
            size={18}
            color={Colors.light.DarkGreen}
            name={
              values.MaterialService === "services"
                ? "check-box"
                : "check-box-outline-blank"
            }
          />
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: hs(5),
            fontFamily: "PopinRegula",
          }}
        >
          Services
        </Text>
      </View>
  
    </View>
    {touched.MaterialService && errors.MaterialService && (
  <Text className="text-red-500">
    {String(errors.MaterialService)}
  </Text>
)}
  
  {values.MaterialService === "material" && (
  <FormikDropdown
    title="Material For"
    placeholder="Material For"
    value={values.suplertsmaterial}
    options={[
      "Building Materials",
      "Tiles | Marble & Flooring",
      "Paint & Wall Finishes",
      "Doors | Windows & Glass",
      "Kitchen & Wardrobe Suppliers",
      "Sanitary & Bathroom",
      "Electrical & Lighting",
      "Plumbing & Water",
      "Solar & Energy",
      "Home Appliances",
    ]}
    onSelect={(val) => setFieldValue("suplertsmaterial", val)}
    touched={!!touched.suplertsmaterial}
    errors={!!errors.suplertsmaterial}
    errorText={errors.suplertsmaterial}
    required
    multipleFields
    name="suplertsmaterial"
    setValue={setFieldValue}
    
  />
)}

   {values.MaterialService === "services" && (
  <FormikDropdown
    title="Services For"
    placeholder="Services For"
    value={values.suppleryservices}
    options={[
      "Construction & Renovation",
      "Architects & Design",
      "Surveying & Inspection",
      "Carpentry & Woodwork",
      "Kitchen & Wardrobe Services",
      "Glass | Aluminium & Metal Work",
      "Solar & Energy Services",
      "HVAC & Cooling",
      "Security & Smart Home",
      "Outdoor & Property Maintenance",
      "Moving & Storage",
    ]}
    onSelect={(val) => setFieldValue("suppleryservices", val)}
    touched={!!touched.suppleryservices}
    errors={!!errors.suppleryservices}
    errorText={errors.suppleryservices}
    required
    multipleFields
    name="suppleryservices"
    setValue={setFieldValue}
  />
)}
  </>
)}
                {dataAccordingType.isService && (
                  <>
                    <FormikDropdown
                      title={dataAccordingType.serviceTitle}
                      placeholder={dataAccordingType.serviceTitle}
                      value={values.services}
                      options={dataAccordingType.serviceOption}
                      onSelect={(val) => setFieldValue("services", val)}
                      touched={!!touched.services}
                      errors={!!errors.services}
                      errorText={errors.services}
                      required
                      multipleFields={dataAccordingType.servingas}
                      name="services"
                      setValue={setFieldValue}
                    />
                    {values.services === "Loan officer" && (
                      <FormikInput
                        title="Institution"
                        placeholder="institution"
                        onChangeText={handleChange("institution")}
                        onBlur={handleBlur("institution")}
                        value={values.institution}
                        touched={!!touched.institution}
                        errors={!!errors.institution}
                        required={false}
                        errorText={errors.institution}
                      />
                    )}
                  </>
                )}
                <FormikInput
                  title="Contact No"
                  placeholder="Contact"
                  onChangeText={handleChange("contact")}
                  onBlur={handleBlur("contact")}
                  value={values.contact}
                  touched={!!touched.contact}
                  errors={!!errors.contact}
                  required
                  errorText={errors.contact}
                />
                <AdressInput
                  city={"city"}
                  zip={"zip"}
                  state={"state"}
                  name="address"
                  latValue={values.user_lat}
                  longValue={values.user_lng}
                  lat="user_lat"
                  long="user_lng"
                  setValue={setFieldValue}
                  onSelect={() => {}}
                  title="Address"
                  placeholder="Enter Location"
                  value={values.address}
                  touched={!!touched.address}
                  errors={!!errors.address}
                  required
                  errorText={errors.address}
                />

                <FormikInput
                  title="Web Address"
                  placeholder="web Address"
                  onChangeText={handleChange("web")}
                  onBlur={handleBlur("web")}
                  value={values.web}
                  touched={!!touched.web}
                  errors={!!errors.web}
                  required={false}
                  errorText={errors.web}
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
                {dataAccordingType.isLicenceIssue && (
                  <FormikInput
                    title="License Issuing authority"
                    placeholder="License"
                    additonalText="If any-optional"
                    onChangeText={handleChange("issuing_authority")}
                    onBlur={handleBlur("issuing_authority")}
                    value={values.issuing_authority}
                    touched={!!touched.issuing_authority}
                    errors={!!errors.issuing_authority}
                    required={false}
                    errorText={errors.issuing_authority}
                  />
                )}
                {dataAccordingType.licence && (
                  <FormikInput
                    title={dataAccordingType.licenceNoTitle}
                    placeholder="License number"
                    onChangeText={handleChange("license_no")}
                    onBlur={handleBlur("license_no")}
                    value={values.license_no}
                    touched={!!touched.license_no}
                    errors={!!errors.license_no}
                    required
                    mulipleFields={dataAccordingType.multilicence}
                    name="license_no"
                    setValue={setFieldValue}
                    errorText={errors.license_no}
                  />
                )}

                {!dataAccordingType.multilicence && (
                  <View className="flex-row justify-between">
                    <View className="flex-1" style={{ marginRight: hs(5) }}>
                      <FormikInput
                        title="State"
                        placeholder="License State"
                        onChangeText={handleChange("lic_state")}
                        onBlur={handleBlur("lic_state")}
                        value={values.lic_state}
                        touched={!!touched.lic_state}
                        errors={!!errors.lic_state}
                        required
                        errorText={errors.lic_state}
                      />
                    </View>
                    {dataAccordingType?.licExpiry && (
                      <View className="flex-1" style={{ marginLeft: hs(5) }}>
                        <DatePickerField
                          errorText={errors.lic_expiry}
                          name="lic_expiry"
                          required
                          value={values.lic_expiry}
                          editable
                          setValue={setFieldValue}
                          title="Licence Expiry"
                          placeholder="Expiry Date"
                          touched={!!touched}
                          errors={!!errors}
                        />
                      </View>
                    )}
                  </View>
                )}
                <DealingAreas
                  city="dealing_city"
                  onSelect={() => {}}
                  state="state"
                  title="Dealin Areas"
                  value={values.dealing_areas}
                  touched={!!touched.dealing_areas}
                  errors={!!errors.dealing_areas}
                  name="dealing_areas"
                  zip="zip code"
                  setValue={setFieldValue}
                  errorText={errors.dealing_areas}
                  placeholder="Please enter City, State or Zip code"
                />

                <Text
                  style={{
                    width: hs(250),
                    marginTop: vs(10),
                    fontFamily: "PopinRegula",
                  }}
                >
                  {dataAccordingType.valuation
                    ? "Do you provide valuaition services in your locality?"
                    : "Do you provide advisory services in your locality?"}
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
                          "advisory_service",
                          values.advisory_service === "Yes" ? "" : "Yes"
                        );
                        if (type === "Agent Profile") {
                          setValuationFor(true);
                        }
                      }}
                    >
                      <MaterialIcons
                        size={18}
                        color={Colors.light.DarkGreen}
                        name={
                          values.advisory_service === "Yes"
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
                          "advisory_service",
                          values.advisory_service === "No" ? "" : "No"
                        );
                        setValuationFor(false);
                      }}
                    >
                      <MaterialIcons
                        size={18}
                        color={Colors.light.DarkGreen}
                        name={
                          values.advisory_service === "No"
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
                {touched.advisory_service && errors.advisory_service && (
                  <Text
                    style={{
                      color: Colors.light.red,
                      fontFamily: "PopinRegula",
                    }}
                  >
                    {errors.advisory_service}
                  </Text>
                )}
                {valuationFor && (
                  <FormikDropdown
                    title="Valuation for"
                    placeholder="Valuation for"
                    value={values.valuation_for}
                    options={[
                      "Home buying/selling valuation",
                      "Home rent valuation",
                    ]}
                    onSelect={(val) => setFieldValue("valuation_for", val)}
                    touched={!!touched.valuation_for}
                    errors={!!errors.valuation_for}
                    errorText={errors.valuation_for}
                    required
                    multipleFields={true}
                    name="valuation_for"
                    setValue={setFieldValue}
                  />
                )}

                <FormikInput
                  title="More Description"
                  placeholder="Write here (Upto 5000 characters)"
                  onChangeText={handleChange("remarks")}
                  onBlur={handleBlur("remarks")}
                  value={values.remarks}
                  touched={!!touched.remarks}
                  errors={!!errors.remarks}
                  required={false}
                  additonalText={"5000 words"}
                  multiline
                  errorText={errors.remarks}
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

                <UploadPic
                  Logo={Profilelogo}
                  text1="Upload "
                  text2="Logo/Pic"
                  value={values.logo}
                  withCircule
                  limt={1}
                  name="logo"
                  setValue={setFieldValue}
                />

                <UploadPic
                  Logo={ImageUpload}
                  text1="Upload "
                  text2="Cover "
                  text3="Image "
                  limt={1}
                  additionalText="Recommended size 760x300"
                  border
                  setValue={setFieldValue}
                  name={"cover"}
                  value={values.cover}
                />
                <FormikInput
                  title="Provide youtube video link"
                  placeholder="Enter link"
                  onChangeText={handleChange("youtube_link")}
                  onBlur={handleBlur("youtube_link")}
                  value={values.youtube_link}
                  touched={!!touched.youtube_link}
                  errors={!!errors.youtube_link}
                  required={false}
                  errorText={errors.youtube_link}
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
                {edit ? (
                  <LargeButton
                    text="Update Ad"
                    handleSubmit={() => {
                      handleSubmit();
                    }}
                  />
                ) : (
                  <View style={{ marginTop: vs(10), flex: 1 }}>
                    <SelecteAdType
                      title1="Select Ad "
                      title2="Type"
                      btnTxt1="Normal Ad"
                      btnTxt2="Trending Ad"
                      btn1value="Normal"
                      btn2value="Trending"
                      Componet1={
                        <>
                          <Text
                            style={{
                              marginTop: vs(10),
                              fontSize: ms(11),
                              color: Colors.light.textGray,
                              fontFamily: "PopinRegula",
                            }}
                          >
                            Post your ad for free.You can upgrade your ad to
                            trending from your dashboard any time to make deal
                            done more quickly
                          </Text>
                          <LargeButton
                            text="Submit Ad"
                            handleSubmit={() => {
                              handleSubmit();
                            }}
                          />
                        </>
                      }
                      Componet2={
                        <View>
                         <FlashList
  data={advertisePrices?.data ?? []}
  keyExtractor={(item) => item.id.toString()}
  extraData={values.time_period}
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
            setFieldValue("time_period", item.life);
            setSelectedAmount(String(item.price));
          }}
        >
          <MaterialIcons
            size={20}
            color={Colors.light.DarkGreen}
            name={
              values.time_period === item.life
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
          For {item.life} Days
        </Text>
      </View>

      <Text style={{ fontFamily: "PopinRegula" }}>
        PKR{formatPrice(item.price)}
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
      time_period: true,
    });

    if (Object.keys(errors).length > 0) {
      console.log(errors);
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
          Secure Online Payment
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

                                  const walletAmount = Number(amount?.amount ?? 0);

                                  if (walletAmount >= Number(selectedAmount)) {
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
                  </View>
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
                <AlfalahPayment
                  amount={selectedAmount}
                  visible={visible}
                  setVisible={setvisible}
                  onPress={async (orderId, setApproveUrl) => {
                    try {
                      console.log(
                        "Profile Bank Alfalah payment success:",
                        orderId
                      );

                      const verification =
                        await verifyAlfalahPayment({
                          order_id: String(orderId),
                        }).unwrap();

                      console.log(
                        "Profile Bank Alfalah verification:",
                        verification
                      );

                      if (!verification?.success) {
                        renderToastError(
                          verification?.message ||
                            "Unable to verify payment."
                        );
                        return;
                      }

                      if (
                        String(verification?.status).toUpperCase() !==
                        "PAID"
                      ) {
                        renderToastError(
                          "Bank payment is not marked as paid."
                        );
                        return;
                      }

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

                      setApproveUrl(null);
                      setvisible(false);

                      setTimeout(() => {
                        handleSubmit();
                      }, 200);
                    } catch (error: any) {
                      console.log(
                        "Profile Bank Alfalah verification error:",
                        error
                      );

                      renderToastError(
                        error?.data?.message ||
                          "Payment could not be verified. Profile was not created."
                      );
                    }
                  }}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Loading
        isLoading={isLoading || isVerifyingAlfalah || isCapturing}
        text={isVerifyingAlfalah ? "Verifying payment..." : `Creating ${type}....`}
      />
      <Loading isLoading={LodingEditData||UpdateLoading} text="Loading..." />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: 600 },
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
 
});
