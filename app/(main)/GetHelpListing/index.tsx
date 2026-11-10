import { useGetTrendingProfilesQuery } from "@/store/api/user/MainApi";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LeadingList from "@src/components/globals/LeadingList";
import SerchBar from "@src/components/globals/SerchBar";
import { SearchProfile } from "@src/components/globals/SerchProfile";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { type } = useLocalSearchParams();
  const [name, setname] = useState("");
  const [propertyType, setPropertyType] = useState(type.toString());
  const [address, setaddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState("");
  const { data: profileList, isLoading, isFetching } =useGetTrendingProfilesQuery({type:type})
  switch (type) {
    case "mortgage":
      return (
     <ScrollView  showsVerticalScrollIndicator={false}  style={styles.section}>
          <HeaderWithBack />
      <View style={{paddingHorizontal:hs(20)}}>
            <Text style={styles.mainHeading}>
              Experts to <Text style={{ color: Colors.light.red }}> MOVE </Text>
              you with {"\n"}love
            </Text>
            <Text style={styles.description}>
              Find best mortgage advisors near you.They love to help you in
              finding best mortgage solution tailored to your financail
              position.
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
                    type: "mortgage",
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
              type="mortgage"
              onSelect={(val) => {
                setname(val.business_name);
                setCity("");
                setLat(0);
                setLng(0);
                setRadius(""), setState(""), setZip(""), setaddress("");
              }}
              value={name}
            />
            <Text style={styles.subHeading}>Mortgage Experts</Text>
              <LeadingList data={profileList?.data} isFetching={isFetching}/>
      </View>
        </ScrollView>
      );
      break;
    case "agent":
      return (
        <ScrollView showsVerticalScrollIndicator={false}  style={styles.section}>
          <HeaderWithBack />
                <View style={{paddingHorizontal:hs(20)}}>
            <Text style={styles.mainHeading}>
              Always<Text style={{ color: Colors.light.red }}> BETTER </Text>
              to consult {"\n"}experts
            </Text>
            <Text style={styles.description}>
              Our expert agents are always there to keep you loving your
              homing.Consult local agents for your home needs on simple clicks
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
                    type: "agent",
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
              type="agent"
              onSelect={(val) => {
                setname(val.business_name);
                setCity("");
                setLat(0);
                setLng(0);
                setRadius(""), setState(""), setZip(""), setaddress("");
              }}
              value={name}
            />
            <Text style={styles.subHeading}>Agent Experts</Text>
              <LeadingList data={profileList?.data} isFetching={isFetching}/>
              </View>
         </ScrollView>
   
      );
      break;
    case "investor":
      return (
       <ScrollView showsVerticalScrollIndicator={false}  style={styles.section}>
          <HeaderWithBack />
              <View style={{paddingHorizontal:hs(20)}}>
            <Text style={styles.mainHeading}>
              Get<Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> BETTER </Text>
              rates from {"\n"}investors
            </Text>
              <Text style={styles.description}>
              Leading investors are always there to keep you loving your
              homing.Consult local or nationwide investors for your home needs
              on simple clicks.
            </Text>
            <Text style={styles.subHeading}>Property Investors</Text>
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
                    type: "investor",
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
              type="investor"
              onSelect={(val) => {
                setname(val.business_name);
                setCity("");
                setLat(0);
                setLng(0);
                setRadius(""), setState(""), setZip(""), setaddress("");
              }}
              value={name}
            />
            <Text style={styles.subHeading}>Investor Experts</Text>
              <LeadingList data={profileList?.data} isFetching={isFetching} />
              </View>
          </ScrollView>
   
      );

      break;
      case "builder":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}>BUILD</Text>or
              <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> RE-BUILD </Text>
              your home
            </Text>
            <Text style={{fontFamily: "PopinRegula",}}>
              Give structural change or build your home with our leading expert
              builders. Simply search local home builders around you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced{" "}
              <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}>Home Builders</Text>
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
                  type:"builder"
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
                        type="builder"
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
              <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> BUILDERS</Text>
            </Text>
               <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
  }
};

export default Index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(24), 
    fontSize: ms(20),
    fontWeight: "500",
    lineHeight: vs(22),
    fontFamily: "PopinRegula",
  },
  description: {
    fontSize: ms(14),
    color: Colors.light.textGray,
    marginTop: vs(5),
    marginBottom: vs(16),
    lineHeight: vs(20),
    fontFamily: "PopinRegula",
  },
  subHeading: {
    marginTop: vs(20),
    fontSize: ms(18),
    fontWeight: "500",
    marginBottom: vs(10),
    fontFamily: "PopinRegula",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  section: {
    
    backgroundColor:'white'
  },



});

