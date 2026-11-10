import {
  useGetYorSalePostsQuery
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import YourAdsPostDesign from "@src/components/globals/YourAdsPostDesign";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const user = useAppSelector(userdata);

  const rawType = useLocalSearchParams().type;
  const isShowpost = useLocalSearchParams().isShowpost;
  const id = useLocalSearchParams().id;
  const post_type = useLocalSearchParams().type;
    const profile_type = useLocalSearchParams().profile_type;
    const name = useLocalSearchParams().name;
  const [ProfileType, SetProfilrType] = useState("");
  const type = String(rawType).toLowerCase();
    const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(ProfileType);
  const filter = [
    { id: 1, name: "All" },
    { id: 3, name: "Agent" },
    { id: 4, name: "Builder" },
    { id: 5, name: "Mortgage" },
    { id: 6, name: "Electrician" },
    { id: 7, name: "Decor" },
    { id: 8, name: "Plumber" },
    { id: 9, name: "Painter" },
    { id: 10, name: "Investor" },
      { id: 11, name: "Material_supplier" },
  ];
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (isShowpost === "true") {
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
  }, [isShowpost])
);

  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [posts, setPosts] = useState<[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isError,refetch } = useGetYorSalePostsQuery({
    type,
    per_page: perPage,
    page,
    user_id:id?id: user.id,
    profile_type: profile_type
  ? profile_type
  : ProfileType === "All"
    ? ""
    : ProfileType
  });
  const renderFilterItem = ({ item }) => {
    const isActive = selectedFilter === item.name;

    return (
      <TouchableOpacity
       activeOpacity={1}
        onPress={() => {
          setSelectedFilter(item.name);
          SetProfilrType(item.name);
          setPage(1);
        }}
        style={[styles.filterChip, isActive && styles.filterChipActive]}
      >
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!data?.data) return;

    setHasMore(data?.has_more);

    setPosts((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    setInitialLoadDone(true)
    
  }, [data]);
  return (
    <View className="flex-1 bg-white" style={{backgroundColor:"#F4F0F0"}}>
      <HeaderWithBack title={name?"Ads by "+name:type + " Listing"} onBackpress={()=>{isShowpost=="true"? router.replace("/Home/Feeds/NewsFeed"): router.back()}}/>
      <View className="flex-1">
        {!name&&(
        <View>
        {filter.length > 0 && (
          <View style={styles.filterContainer}>
            <Text style={styles.sortText}> Your ads by:</Text>

            <FlatList
              horizontal
              data={filter}
              renderItem={renderFilterItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterList}
            />
          </View>
        )}
</View>)}
        <YourAdsPostDesign
          data={posts}
          hasmore={hasMore}
          isfetching={isFetching}
          setPage={setPage}
          type={type}
          setpost={setPosts}
          refetch={refetch}
          initialLoadDone={initialLoadDone}
          isShowpost={isShowpost=="true"?true:false}
          id={id?id.toString(): user.id.toString()}
          post_type={post_type?.toString()}
        />
      </View>
      
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  filterList: {
    paddingHorizontal: 12,
  },

  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: Colors.light.red,
  },
  filterText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    fontFamily: "PopinRegula",
  },

  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "PopinRegula",
    fontFamily: "PopinRegula",
  },
  filterContainer: {
    backgroundColor: "#F4F0F0",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  sortText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: "PopinRegula",
  },
});
