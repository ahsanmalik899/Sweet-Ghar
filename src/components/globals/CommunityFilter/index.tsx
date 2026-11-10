import Cross from "@assets/CreateProfile/cross.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormikDropdownwithjson } from "../FormikDropdownwithjson";
import LargeButton from "../LaregeButton";
import SerchBar from "../SerchBar";
import { SearchDeveloper } from "../SerchDeveloper";
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
          <SearchDeveloper
            onSelect={(val) => {
              setname(val.name);
              setCity("");
              setLat(0);
              setLng(0);
              setState("");
              setZip("");
              setAddress("");
              setFieldValue("radius", "");
            }}
            value={name}
          />
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
        </View>
        <View className="mb-4">
          <Text
            style={{
              fontWeight: 700,
              fontFamily: "PopinRegula",
              fontSize: ms(15),
              marginVertical: vs(10),
            }}
          >
            Estate Type
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: vs(5),
            }}
          >
            {["Residential", "Commercial", "Mix"].map((option) => (
              <TouchableOpacity
               activeOpacity={1}
                key={option}
                onPress={() =>
                  toggleValue("estate_type", option, values, setFieldValue)
                }
                style={{
                  width: hs(150),
                  padding: ms(8),
                  borderRadius: 5,
                  marginVertical: vs(5),
                  marginHorizontal: vs(5),
                  backgroundColor: values.estate_type?.includes(option)
                    ? Colors.light.DarkGreen
                    : "lightgray",

                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: values.estate_type?.includes(option)
                      ? "white"
                      : "black",
                      fontFamily: "PopinRegula",
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={{
              fontWeight: 700,
              fontFamily: "PopinRegula",
              fontSize: ms(15),
              marginVertical: vs(10),
            }}
          >
            Development Satge
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: vs(5),
            }}
          >
            {["Completed", "Constructing", "In planning"].map((option) => (
              <TouchableOpacity
               activeOpacity={1}
                key={option}
                onPress={() =>
                  toggleValue(
                    "development_status",
                    option,
                    values,
                    setFieldValue
                  )
                }
                style={{
                  width: hs(150),
                  padding: ms(8),
                  borderRadius: 5,
                  marginVertical: vs(5),
                  marginHorizontal: vs(5),
                  backgroundColor: values.development_status?.includes(option)
                    ? Colors.light.DarkGreen
                    : "lightgray",

                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: values.development_status?.includes(option)
                      ? "white"
                      : "black",
                      fontFamily: "PopinRegula",
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              height: vs(1),
              marginTop: vs(20),

              backgroundColor: Colors.light.textGray,
              opacity: 0.2,
            }}
          />
          <View>
            <FormikDropdownwithjson
              title={"Minimun Price"}
              placeholder="No Selection"
              value={values.minPrice}
              touched={!!touched.minPrice}
              errors={!!errors.minPrice}
              required
              errorText={errors.minPrice}
              options={[
                { label: "below PKR 50,000", value: "0" },
                { label: "PKR 50,000", value: "50000" },
                { label: "PKR 70,000", value: "70000" },
                { label: "PKR 100,000", value: "100000" },
                { label: "PKR 120,000", value: "120000" },
                { label: "PKR 150,000", value: "150000" },
                { label: "PKR 175,000", value: "175000" },
                { label: "PKR 200,000", value: "200000" },
                { label: "PKR 250,000", value: "250000" },
                { label: "PKR 300,000", value: "300000" },
                { label: "PKR 350,000", value: "350000" },
                { label: "PKR 400,000", value: "400000" },
                { label: "PKR 500,000", value: "500000" },
                { label: "PKR 600,000", value: "600000" },
                { label: "PKR 700,000", value: "700000" },
                { label: "PKR 900,000", value: "900000" },
                { label: "PKR 1,000,000", value: "1000000" },
                { label: "PKR 1,200,000", value: "1200000" },
                { label: "PKR 1,500,000", value: "1500000" },
                { label: "PKR 2,000,000", value: "2000000" },
                { label: "PKR 3,000,000", value: "3000000" },
              ]}
              onSelect={(value) => {
                setFieldValue("minPrice", value);
              }}
            />
          </View>

          <View>
            <FormikDropdownwithjson
              title={"Maximun Price"}
              placeholder="No Selction"
              value={values.maxPrice}
              touched={!!touched.maxPrice}
              errors={!!errors.maxPrice}
              required
              errorText={errors.maxPrice}
              options={[
                { value: "50000", label: "PKR 50,000" },
                { value: "70000", label: "PKR 70,000" },
                { value: "100000", label: "PKR 100,000" },
                { value: "120000", label: "PKR 120,000" },
                { value: "150000", label: "PKR 150,000" },
                { value: "175000", label: "PKR 175,000" },
                { value: "200000", label: "PKR 200,000" },
                { value: "250000", label: "PKR 250,000" },
                { value: "300000", label: "PKR 300,000" },
                { value: "350000", label: "PKR 350,000" },
                { value: "400000", label: "PKR 400,000" },
                { value: "500000", label: "PKR 500,000" },
                { value: "600000", label: "PKR 600,000" },
                { value: "700000", label: "PKR 700,000" },
                { value: "900000", label: "PKR 900,000" },
                { value: "1000000", label: "PKR 1,000,000" },
                { value: "1200000", label: "PKR 1,200,000" },
                { value: "1500000", label: "PKR 1,500,000" },
                { value: "2000000", label: "PKR 2,000,000" },
                { value: "3000000", label: "PKR 3,000,000" },
                { value: "3000001", label: "Above PKR 3,000,000" },
              ]}
              onSelect={(value) => setFieldValue("maxPrice", value)}
            />
          </View>
        </View>
<LargeButton
  handleSubmit={() => {

    const empty = {
      estate_type: [],
      development_status: [],
      radius: "",
      minPrice: "",
      maxPrice: "",
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

  counterValue: {
    width: hs(80),
    alignItems: "center",
    justifyContent: "center",
  },

  counterNumber: {
    fontSize: ms(24),
    fontWeight: "700",
  },
});
