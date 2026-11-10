import { useGetTrendingProfilesQuery } from "@/store/api/user/MainApi";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LeadingList from "@src/components/globals/LeadingList";
import SerchBar from "@src/components/globals/SerchBar";
import { SearchProfile } from "@src/components/globals/SerchProfile";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const index = () => {
  const { type } = useLocalSearchParams();
    const { data: profileList, isLoading, isFetching } =useGetTrendingProfilesQuery({type:type})
    const [name, setname] = useState("");
    const [propertyType, setPropertyType] = useState(type.toString());
    const [address, setaddress] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [selectedType, setSelectedType] = useState("material_supplier");
    const [materil_type,setMaterilType] = useState("All Suppliers");
    const [service_type,setService_type] = useState("All Service Providers");
    const [zip, setZip] = useState("");
    const [radius, setRadius] = useState("");
  switch (type) {
    case "electrician":
      return (
        <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Keep<Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> LIGHTENING </Text>
              your home
            </Text>
            <Text style={{fontFamily: "PopinRegula",}}>
              Keep maintaining your home electrifying equipment with our expert
              electricians.Simply search best & economical electricians around
              you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced Electricians
            </Text>
          
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"electrician"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
          <FormikDropdownwithjson
                        title={""}
                        placeholder={"Radius (miles)"}
                        value={radius}
                        options={[
                          { label: "Radius (miles)", value: "0" },
                          { label: "1 mile", value: "1" },
                          { label: "5 miles", value: "5" },
                          { label: "10 miles", value: "10" },
                          { label: "20 miles", value: "20" },
                          { label: "30 miles", value: "30" },
                          { label: "40 miles", value: "40" },
                          { label: "50 miles", value: "50" },
                        ]}
                        name="radius"
                        touched={false}
                        errors={false}
                        errorText={""}
                        onSelect={(val) => {
                          setRadius(val);
                        }}
                        setValue={setRadius}
                      />
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text style={{fontFamily:"PopinRegula"}}>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="electrician"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
         
            <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}> ELECTRICIANS</Text>
            </Text>
              <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "plumber":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Fix home to<Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> LIVE </Text>
              with comfort
            </Text>
            <Text style={{fontFamily: "PopinRegula",}}>
              Keep maintaining your home with our expert plumbers.Simply search
              local plumbers around you.
            </Text>
            <Text style={styles.subHeading}>Search experienced Plumbers</Text>
         
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"plumber"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
          <FormikDropdownwithjson
                        title={""}
                        placeholder={"Radius (miles)"}
                        value={radius}
                        options={[
                          { label: "Radius (miles)", value: "0" },
                          { label: "1 mile", value: "1" },
                          { label: "5 miles", value: "5" },
                          { label: "10 miles", value: "10" },
                          { label: "20 miles", value: "20" },
                          { label: "30 miles", value: "30" },
                          { label: "40 miles", value: "40" },
                          { label: "50 miles", value: "50" },
                        ]}
                        name="radius"
                        touched={false}
                        errors={false}
                        errorText={""}
                        onSelect={(val) => {
                          setRadius(val);
                        }}
                        setValue={setRadius}
                      />
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text style={{fontFamily: "PopinRegula",}}>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="plumber"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> PLUMBERS</Text>
            </Text>
             <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;

    case "decor":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Home at<Text style={{ color: Colors.light.red }}> GLANCE </Text>
              with love
            </Text>
            <Text style={{fontFamily: "PopinRegula",}}>
              Re-invent your home with our expert interior decors. Simply search
              local home stagers around you.
            </Text>
            <Text style={styles.subHeading}>
              Search shining Interior Decors
            </Text>
             
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"decor"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
          <FormikDropdownwithjson
                        title={""}
                        placeholder={"Radius (miles)"}
                        value={radius}
                        options={[
                          { label: "Radius (miles)", value: "0" },
                          { label: "1 mile", value: "1" },
                          { label: "5 miles", value: "5" },
                          { label: "10 miles", value: "10" },
                          { label: "20 miles", value: "20" },
                          { label: "30 miles", value: "30" },
                          { label: "40 miles", value: "40" },
                          { label: "50 miles", value: "50" },
                        ]}
                        name="radius"
                        touched={false}
                        errors={false}
                        errorText={""}
                        onSelect={(val) => {
                          setRadius(val);
                        }}
                        setValue={setRadius}
                      />
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text style={{fontFamily: "PopinRegula",}}>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="decor"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> DECORS</Text>
            </Text>
               <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "painter":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Give new<Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> LOOKS </Text>
              to your home
            </Text>
            <Text style={{fontFamily: "PopinRegula",}}>
              Give new look to your home with our expert painters. Simply search
              local painters around you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced{" "}
              <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}>Painters</Text>
            </Text>
           
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"painter"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
          <FormikDropdownwithjson
                        title={""}
                        placeholder={"Radius (miles)"}
                        value={radius}
                        options={[
                          { label: "Radius (miles)", value: "0" },
                          { label: "1 mile", value: "1" },
                          { label: "5 miles", value: "5" },
                          { label: "10 miles", value: "10" },
                          { label: "20 miles", value: "20" },
                          { label: "30 miles", value: "30" },
                          { label: "40 miles", value: "40" },
                          { label: "50 miles", value: "50" },
                        ]}
                        name="radius"
                        touched={false}
                        errors={false}
                        errorText={""}
                        onSelect={(val) => {
                          setRadius(val);
                        }}
                        setValue={setRadius}
                      />
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text style={{fontFamily: "PopinRegula",}}>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="painter"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> PAINTERS</Text>
            </Text>
              <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "material_supplier":
  return (
    <ScrollView className="bg-white">
      <View className="bg-white flex-1">
        <HeaderWithBack />

        <View style={{ marginHorizontal: hs(20) }}>
          <Text style={styles.mainHeading}>
            <Text
              style={{
                color: Colors.light.red,
                fontFamily: "PopinRegula",
              }}
            >
              BUILD
            </Text>
            {" or "}
            <Text
              style={{
                color: Colors.light.red,
                fontFamily: "PopinRegula",
              }}
            >
              RE-BUILD
            </Text>
            {" your home"}
          </Text>

          <Text style={{ fontFamily: "PopinRegula" }}>
            Find trusted material suppliers near you for your construction and
            renovation needs.
          </Text>

          <Text style={styles.subHeading}>
            Search experienced{" "}
            <Text
              style={{
                color: Colors.light.red,
                fontFamily: "PopinRegula",
              }}
            >
              Material Suppliers
            </Text>
          </Text>

          <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name: name,
                  sub_type: selectedType,
                  type: "material_supplier",
                  material_type:materil_type,
                  services_type:service_type,
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />

          <FormikDropdownwithjson
            title=""
            placeholder="Radius (miles)"
            value={radius}
            options={[
              { label: "Radius (miles)", value: "0" },
              { label: "1 mile", value: "1" },
              { label: "5 miles", value: "5" },
              { label: "10 miles", value: "10" },
              { label: "20 miles", value: "20" },
              { label: "30 miles", value: "30" },
              { label: "40 miles", value: "40" },
              { label: "50 miles", value: "50" },
            ]}
            name="radius"
            touched={false}
            errors={false}
            errorText=""
            onSelect={(val) => {
              setRadius(val);
            }}
            setValue={setRadius}
          />
 <View className="flex-row justify-between mt-4">

  {/* Services Card */}
  <TouchableOpacity
    activeOpacity={0.8}
    style={[
      styles.typeCard,
      selectedType === "services" && styles.activeTypeCard,
    ]}
    onPress={() => {
      setSelectedType("services");
      setMaterilType("All Suppliers");
    }}
  >
    <View
      style={[
        styles.iconBox,
        selectedType === "services" && styles.activeIconBox,
      ]}
    >
      <MaterialCommunityIcons
        name="tools"
        size={28}
        color={
          selectedType === "services"
            ? "#FFFFFF"
            : Colors.light.red
        }
      />
    </View>

    <Text
      style={[
        styles.typeCardText,
        selectedType === "services" && styles.activeTypeCardText,
      ]}
    >
      Services
    </Text>
  </TouchableOpacity>


  {/* Material Supplier Card */}
  <TouchableOpacity
    activeOpacity={0.8}
    style={[
      styles.typeCard,
      selectedType === "material_supplier" && styles.activeTypeCard,
    ]}
    onPress={() => {
      setSelectedType("material_supplier");
      setService_type("All Service Providers");
    }}
  >
    <View
      style={[
        styles.iconBox,
        selectedType === "material_supplier" && styles.activeIconBox,
      ]}
    >
      <FontAwesome5
        name="boxes"
        size={26}
        color={
          selectedType === "material_supplier"
            ? "#FFFFFF"
            : Colors.light.red
        }
      />
    </View>

    <Text
      style={[
        styles.typeCardText,
        selectedType === "material_supplier" &&
          styles.activeTypeCardText,
      ]}
    >
      Material Supplier
    </Text>
  </TouchableOpacity>

</View>
{selectedType === "material_supplier" && (
  <View className="flex-row flex-wrap mt-4" style={{ gap: 8 }}>
    {[
      { label: "All Suppliers", value: "All Suppliers" },
      { label: "Building Materials", value: "Building Materials" },
      { label: "Tiles & Flooring", value: "Tiles, Marble & Flooring" },
      { label: "Wall Finishes", value: "Paint & Wall Finishes" },
      { label: "Doors & Windows", value: "Doors, Windows & Glass" },
      {
        label: "Kitchen & Wardrobe",
        value: "Kitchen & Wardrobe Suppliers",
      },
      { label: "Sanitary", value: "Sanitary & Bathroom" },
      { label: "Electrical", value: "Electrical & Lighting" },
      { label: "Plumbing", value: "Plumbing & Water" },
      { label: "Appliances", value: "Home Appliances" },
    ].map((item) => {
      const active = materil_type === item.value;

      return (
        <TouchableOpacity
          key={item.value}
          activeOpacity={0.8}
          style={[
            styles.filterChip,
            active && styles.activeFilterChip,
          ]}
          onPress={() => setMaterilType(item.value)}
        >
          <Text
            style={[
              styles.filterChipText,
              active && styles.activeFilterChipText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
)}

{selectedType === "services" && (
  <View className="flex-row flex-wrap mt-4" style={{ gap: 8 }}>
    {[
      { label: "All Services", value: "All Service Providers" },
      { label: "Construction", value: "Construction & Renovation" },
      { label: "Architects", value: "Architects & Design" },
      { label: "Surveying", value: "Surveying & Inspection" },
      { label: "Carpentry", value: "Carpentry & Woodwork" },
      {
        label: "Kitchen",
        value: "Kitchen & Wardrobe Services",
      },
      {
        label: "Metal Work",
        value: "Glass, Aluminium & Metal Work",
      },
      { label: "Solar", value: "Solar & Energy Services" },
      { label: "HVAC", value: "HVAC & Cooling" },
      { label: "Security", value: "Security & Smart Home" },
      {
        label: "Maintenance",
        value: "Outdoor & Property Maintenance",
      },
      { label: "Moving", value: "Moving & Storage" },
    ].map((item) => {
      const active = service_type === item.value;

      return (
        <TouchableOpacity
          key={item.value}
          activeOpacity={0.8}
          style={[
            styles.filterChip,
            active && styles.activeFilterChip,
          ]}
          onPress={() => setService_type(item.value)}
        >
          <Text
            style={[
              styles.filterChipText,
              active && styles.activeFilterChipText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
)}
          <View className="flex-row justify-between items-center mt-3">
            <View style={styles.line} />
            <Text style={{ fontFamily: "PopinRegula" }}>OR</Text>
            <View style={styles.line} />
          </View>

          <SearchProfile
            type="material_supplier"
            onSelect={(val) => {
              setname(val.business_name);
              setCity("");
              setLat(0);
              setLng(0);
              setRadius("");
              setState("");
              setZip("");
              setaddress("");
            }}
            value={name}
          />

          <Text style={styles.mainHeading}>
            Leading{" "}
            <Text
              style={{
                color: Colors.light.red,
                fontFamily: "PopinRegula",
              }}
            >
              MATERIAL SUPPLIERS
            </Text>
          </Text>

          <LeadingList
            data={profileList?.data}
            isFetching={isFetching}
          />
        </View>
      </View>
    </ScrollView>
  );
      break;
  }
};

export default index;

const styles = StyleSheet.create({
  typeCard: {
  width: "48%",
  minHeight: 125,
  borderWidth: 1,
  borderColor: "#E5E5E5",
  borderRadius: 14,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  paddingVertical: 16,
},

activeTypeCard: {
  borderColor: Colors.light.DarkGreen,
  backgroundColor: "#F2F8F5",
},

iconBox: {
  width: 55,
  height: 55,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EEF6F1",
  marginBottom: 10,
},

activeIconBox: {
  backgroundColor: Colors.light.DarkGreen,
},

typeCardText: {
  fontSize: 14,
  fontFamily: "PopinRegula",
  color: "#333333",
  textAlign: "center",
},

activeTypeCardText: {
  color: Colors.light.DarkGreen,
  fontFamily: "PopinSemiBold",
},

filterChip: {
  paddingHorizontal: 11,
  paddingVertical: 6,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: "#E1E1E1",
  backgroundColor: "#FFFFFF",
},

activeFilterChip: {
  backgroundColor: Colors.light.DarkGreen,
  borderColor: Colors.light.DarkGreen,
},

filterChipText: {
  fontSize: 10,
  fontFamily: "PopinRegula",
  color: "#555555",
},

activeFilterChipText: {
  color: "#FFFFFF",
},
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
    fontFamily: "PopinRegula",
  },
  subHeading: {
    marginTop: vs(10),
    fontSize: ms(20),
    fontWeight: 500,
    fontFamily: "PopinRegula",
  },
   line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
    activeButton: {
    backgroundColor: Colors.light.DarkGreen,
    width: hs(150),
    paddingVertical: vs(10),
    borderRadius: 8,
    alignItems: "center",
  },

  Button: {
    borderWidth: ms(0.5),
    width: hs(150),
    paddingVertical: vs(10),
    borderColor: Colors.light.textGray,
    borderRadius: 8,
    alignItems: "center",
  },

  TextActive: {
    fontWeight: "500",
    color: "white",
    fontFamily: "PopinRegula",
  },

  Text: {
    fontWeight: "400",
    fontFamily: "PopinRegula",
  },

  subButton: {
  width: hs(150),
  minHeight: vs(60),
  borderWidth: ms(0.5),
  borderColor: Colors.light.textGray,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: hs(5),
  marginBottom: vs(10),
},

subActiveButton: {
  width: hs(150),
  minHeight: vs(60),
  backgroundColor: Colors.light.DarkGreen,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: hs(5),
  marginBottom: vs(10),
},

subText: {
  fontFamily: "PopinRegula",
  textAlign: "center",
},

subTextActive: {
  fontFamily: "PopinRegula",
  color: "white",
  textAlign: "center",
},
});
