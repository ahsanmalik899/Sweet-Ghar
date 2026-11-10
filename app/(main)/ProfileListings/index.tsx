import { useGetProfileListingQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Threedot from "@assets/Buy/threedotwhite.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import ProfileFilter from "@src/components/globals/ProfileFilter";
import ProfileListingDesign from "@src/components/globals/ProfileListingDesign";
import SavedItems from "@src/components/globals/SavedItems";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as Yup from "yup";
const index = () => {
  const params = useLocalSearchParams();
  const user = useSelector(userdata);
  const [page, setpage] = useState(1);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [name, setname] = useState("");
  const [address, setAddress] = useState(params.address || "");
  const [lat, setLat] = useState(Number(params.lat) || 0);
  const [lng, setLng] = useState(Number(params.lng) || 0);
  const [state, setState] = useState(params.stateCode || "");
  const [city, setCity] = useState(params.city || "");
  const [zip, setZip] = useState(params.zip || "");
  const [showFilter, setShowFilter] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
const [showSaved, setShowSaved] = useState(false);
 
    const FilterSchema = Yup.object().shape({
      radius: Yup.string().nullable(),
     
    });
     const [filterValues, setFilterValues] = useState({
  radius: params.radius || "",
  material: params.material_type || "All Suppliers",
  services: params.services_type || "All Service Providers",
  sub_type: params.sub_type || "",
});
    
     const [apiFilters, setApiFilters] = useState({
  page,
  address,
  city,
  state,
  zip,
  lat,
  lng,
  name,
  user_id: user?.id,
  type: params.type,
  radius: params.radius || undefined,
  per_page: 10,
  material: params.material_type,
  services:params.services_type,
  sub_type: params.sub_type,
});
 const { data: profileList, isLoading, isFetching } =
  useGetProfileListingQuery(apiFilters);

 const mapToApiFilters = (values: any) => ({
  page: 1,
  address,
  city,
  state,
  zip,
  lat,
  lng,
  name,
  user_id: user?.id,
  type: params.type,
  radius: values.radius || undefined,
  per_page: 10,

  material: values.material,

  services: values.services,

  sub_type: values.sub_type || params.sub_type,
});
useEffect(() => {
  setApiFilters((prev) => ({
    ...prev,
    page,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    name,
    user_id: user?.id,
    per_page: 10,
    material: prev.material,
    services: prev.services,
    sub_type: prev.sub_type,
    radius: prev.radius,
  }));
}, [
  page,
  address,
  city,
  state,
  zip,
  lat,
  lng,
  name,
  user?.id,
]);

  useEffect(() => {
    if (!profileList) return;

    const newProfiles = profileList.data?? [];

    setHasMore(
      profileList.pagination.current_page < profileList.pagination.last_page
    );

    setProfiles((prev) =>
      page === 1 ? newProfiles : [...prev, ...newProfiles]
    );
      setInitialLoadDone(true);
  }, [profileList]);
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (params?.isSingleView === "true") {
        router.replace("/Home/Feeds/NewsFeed");
        return true;
      }

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }

      return true;
    };

    const sub = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => sub.remove();
  }, [params])
);
  
  return (
    <View className=" flex-1" style={{ backgroundColor: "#F4F0F0" }}>
       <HeaderWithBack onBackpress={()=>{params?.isSingleView=="true"? router.replace("/Home/Feeds/NewsFeed"): router.back()}} isSavedItem onpressSave={()=>setShowSaved(true) }/>
     <View style={styles.filterBar}>
 
  <View style={{ flex: 1 }}>
    <Text style={styles.resultTitle}>
      {params.type?.toString().toUpperCase()} Businesses
    </Text>
    <Text style={styles.resultSub}>
     <Text style={{fontWeight:700}}>{profileList?.pagination?.total}</Text>  results in {city || state || "Nearby"} 
    </Text>
  </View>
  <TouchableOpacity
   activeOpacity={1}
    style={styles.filterBtn}
    onPress={() => setShowFilter(true)}
  >
    <Text style={styles.filterText}>Filters</Text>
    <Threedot width={16} height={16} />
  </TouchableOpacity>
</View>

      <ProfileListingDesign
        data={profiles}
        isfetching={isFetching}
        setPage={setpage}
        type="community"
        hasmore={hasMore}
         initialLoadDone={initialLoadDone}
         isSingleView={params?.isSingleView=="true"}
         post_id={params?.id?.toString()}
         post_type={params?.type?.toString()}
      />
       {showFilter && (
              <Formik
                initialValues={filterValues}
                enableReinitialize
                validationSchema={FilterSchema}
                onSubmit={(values) => {
                  setFilterValues(values);
       console.log("FORM VALUES:", values);

  const filters = mapToApiFilters(values);

  console.log("API FILTERS:", filters);
                  setpage(1);
                  setApiFilters(mapToApiFilters(values));
                  setShowFilter(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  handleSubmit,
                  resetForm,
                  setFieldTouched,
                }) => (
                  <ProfileFilter
                  type={params.type.toString()}
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                    setshowFilter={setShowFilter}
                    setAddress={setAddress}
                    setCity={setCity}
                    setLat={setLat}
                    setLng={setLng}
                    setState={setState}
                    setZip={setZip}
                    onpress={() => {}}
                    latValue={lat}
                    longValue={lng}
                    value={address.toString()}
                    name={name.toString()}
                    setname={setname}
                  />
                )}
              </Formik>
            )}
                 <Modal visible={showSaved} onRequestClose={() => setShowSaved(false)} animationType="slide"  statusBarTranslucent>
                   <SafeAreaView
                                                style={{ flex: 1 }}
                                                edges={[ "bottom", "left", "right"]}
                                              >
        <SavedItems setShowSaved={setShowSaved} />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
   filterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: vs(16),
    marginBottom: vs(8),
    paddingVertical: vs(12),
    paddingHorizontal: hs(14),
    backgroundColor: "#fff",
    borderRadius: ms(12),

    // subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  resultTitle: {
    fontSize: ms(15),
    fontWeight: "700",
    color: "#111",
      fontFamily: "PopinRegula",
  },

  resultSub: {
    fontSize: ms(12),
    color: Colors.light.textGray,
    marginTop: vs(2),
      fontFamily: "PopinRegula",
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(6),
    paddingHorizontal: hs(12),
    paddingVertical: vs(8),
    borderRadius: ms(20),
    backgroundColor: Colors.light.red,
  },

  filterText: {
    color: "#fff",
    fontSize: ms(13),
    fontWeight: "600",
      fontFamily: "PopinRegula",
  },
});
