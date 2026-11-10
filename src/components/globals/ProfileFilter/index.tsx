import Cross from "@assets/CreateProfile/cross.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormikDropdownwithjson } from "../FormikDropdownwithjson";
import LargeButton from "../LaregeButton";
import SerchBar from "../SerchBar";
import { SearchProfile } from "../SerchProfile";
import { filtertype } from "./type";
const index = ({
  errors,
  handleSubmit,
  resetForm,
  setFieldValue,
  touched,
  values,
  setshowFilter,
  setAddress,
  setCity,
  setLat,
  setLng,
  setState,
  setZip,
  onpress,
  value,
  latValue,
  longValue,
  name,
  setname,
  type,
  
}: filtertype) => {
  const toggleValue = (
    field: string,
    value: string,
    values: any,
    setFieldValue: any
  ) => {
    const current = values[field] || [];

    if (value === "All") {
      setFieldValue(field, ["All"]);
      return;
    }

    const filtered = current.filter((v: string) => v !== "All");

    if (filtered.includes(value)) {
      setFieldValue(
        field,
        filtered.filter((v: string) => v !== value)
      );
    } else {
      setFieldValue(field, [...filtered, value]);
    }
  };

  const [cardshow, setcardShow] = useState("");
  return (
    <View style={styles.card}>
      <TouchableOpacity
       activeOpacity={1}
        style={{
          backgroundColor: Colors.light.lightGray,
          alignSelf: "flex-end",
          borderRadius: ms(20),
          paddingHorizontal: hs(2),
          paddingVertical: vs(2),
          marginTop: vs(40),
        }}
        onPress={() => setshowFilter(false)}
      >
        <Cross />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: "center",
          fontWeight: 700,
          fontFamily: "PopinRegula",
          fontSize: ms(15),
          marginBottom: vs(20),
          
        }}
      >
        Filter
      </Text>

      <SerchBar
        setAddress={setAddress}
        setCity={setCity}
        setLat={setLat}
        setLng={setLng}
        setState={setState}
        setZip={setZip}
        onpress={() => {
          handleSubmit();
        }}
        latValue={latValue}
        longValue={longValue}
        value={value.toString()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
         
          <View className="mt-3">
            <FormikDropdownwithjson
              title={""}
              placeholder={"Radius (miles)"}
              value={values.radius}
              options={[
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
              onSelect={(val) => {}}
              setValue={setFieldValue}
            />
          </View>
           <SearchProfile
            onSelect={(val) => {
              setname(val.business_name);
              setCity("");
              setLat(0);
              setLng(0);
              setState("");
              setZip("");
              setAddress("");
              setFieldValue("radius", "");
            } }
            value={name} type={type}          />
        </View>
        <View>
         
        
        

         
          <View
            style={{
              height: vs(1),
              marginTop: vs(20),

              backgroundColor: Colors.light.textGray,
              opacity: 0.2,
            }}
          />
       

         
        </View>
{values.sub_type === "material_supplier" && (
  <View style={styles.optionsGrid}>
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
      {
        label: "Sanitary & Bathroom",
        value: "Sanitary & Bathroom",
      },
      {
        label: "Electrical & Lighting",
        value: "Electrical & Lighting",
      },
      {
        label: "Plumbing & Water",
        value: "Plumbing & Water",
      },
      {
        label: "Home Appliances",
        value: "Home Appliances",
      },
    ].map((item) => {
      const selected = values.material === item.value;

      return (
        <TouchableOpacity
          key={item.value}
          activeOpacity={0.8}
          style={[
            styles.filterOption,
            selected && styles.selectedOption,
          ]}
          onPress={() => setFieldValue("material", item.value)}
        >
          <Text
            numberOfLines={2}
            style={[
              styles.optionText,
              selected && styles.selectedText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
)}
{values.sub_type === "services" && (
  <View style={{ marginTop: vs(15) }}>
    <Text style={styles.filterHeading}>Services</Text>

    <View style={styles.optionsGrid}>
      {[
        { label: "All Services", value: "All Service Providers" },
        { label: "Construction", value: "Construction & Renovation" },
        { label: "Architects & Design", value: "Architects & Design" },
        { label: "Surveying", value: "Surveying & Inspection" },
        { label: "Carpentry", value: "Carpentry & Woodwork" },
        {
          label: "Kitchen & Wardrobe",
          value: "Kitchen & Wardrobe Services",
        },
        {
          label: "Aluminium & Metal",
          value: "Glass, Aluminium & Metal Work",
        },
        { label: "Solar Services", value: "Solar & Energy Services" },
        { label: "HVAC & Cooling", value: "HVAC & Cooling" },
        { label: "Security", value: "Security & Smart Home" },
        {
          label: "Maintenance",
          value: "Outdoor & Property Maintenance",
        },
        { label: "Moving & Storage", value: "Moving & Storage" },
      ].map((item) => {
        const selected = values.services === item.value;

        return (
          <TouchableOpacity
            key={item.value}
            activeOpacity={0.8}
            style={[
              styles.filterOption,
              selected && styles.selectedOption,
            ]}
            onPress={() => setFieldValue("services", item.value)}
          >
            <Text
              numberOfLines={2}
              style={[
                styles.optionText,
                selected && styles.selectedText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
)}
        <LargeButton
  handleSubmit={() => {

    const empty = {
  radius: "",
  material: "All Suppliers",
  services: "All Service Providers",
  sub_type: values.sub_type,
};

    resetForm({ values: empty });

    setname("");
    setAddress("");
    setCity("");
    setLat(0);
    setLng(0);
    setState("");
    setZip("");
  }}
  text="Reset Values"
/>

      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    position: "absolute",

    top: vs(0),
    bottom: vs(0),
    left: hs(0),
    right: hs(0),
    paddingHorizontal: hs(20),
    backgroundColor: "#fff",
    borderRadius: ms(5),
    paddingBottom: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 100,
  },
  Smallcard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: ms(5),
    width: hs(100),
    paddingHorizontal: hs(3),
    paddingVertical: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: vs(20),
  },

  counterBtn: {
    width: hs(40),
    height: hs(40),
    borderRadius: hs(10),
    backgroundColor: Colors.light.DarkGreen,
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    fontSize: ms(28),
    fontWeight: "600",
    color: "white",
  },
optionsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: vs(12),
},

filterOption: {
  width: "48%",
  minHeight: vs(48),

  paddingHorizontal: hs(10),
  paddingVertical: vs(8),

  borderRadius: ms(10),
  borderWidth: 1,
  borderColor: "#E2E2E2",

  backgroundColor: "#FFFFFF",

  alignItems: "center",
  justifyContent: "center",

  marginBottom: vs(10),

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.04,
  shadowRadius: 2,
  elevation: 1,
},

selectedOption: {
  backgroundColor: Colors.light.DarkGreen,
  borderColor: Colors.light.DarkGreen,
},

optionText: {
  fontSize: ms(11),
  color: "#444444",
  fontFamily: "PopinRegula",
  textAlign: "center",
  lineHeight: ms(16),
},

selectedText: {
  color: "#FFFFFF",
  fontWeight: "600",
},
  counterValue: {
    width: hs(80),
    alignItems: "center",
    justifyContent: "center",
  },

  counterNumber: {
    fontSize: ms(24),
    fontWeight: "700",
  },
  filterHeading: {
  fontSize: ms(14),
  fontWeight: "700",
  marginTop: vs(18),
  marginBottom: vs(10),
  fontFamily: "PopinRegula",
},

optionsRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: hs(8),
},

});
