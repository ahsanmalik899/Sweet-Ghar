import { useDeleteAlertApiMutation, useGetAlertPrefQuery } from '@/store/api/user/MainApi';
import { userdata } from '@/store/slices/selector/user';
import Delete from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import { FlashList } from '@shopify/flash-list';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { vs } from '@utils/design/design';
import { router } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithBack from '../HeaderWithBack';
import Loading from '../Loading';
const MyAlerts = ({ setVisible }: { setVisible: (value: boolean) => void }) => {
    const user = useAppSelector(userdata);
    const [deletAlert,{isLoading:deleting}]=useDeleteAlertApiMutation();
    const { data, isLoading, isFetching, refetch } = useGetAlertPrefQuery({ id: user.id, type: "" });
    const RenderItem = ({ item }: any) => {
        const isCommunity = item.alert_for === "community";
        const formatDate = (dateValue: any) => {
            if (!dateValue) return "";

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};
  return (
    <View style={styles.card}>
  
      <View style={styles.rowBetween}>
        <Text style={styles.title}>
          {isCommunity ? item.community_type : item.property_type}
        </Text>
        <Text style={styles.badge}>{item.alert_for}</Text>
      </View>


      {!isCommunity && item.property_subtype && (
        <Text style={styles.subTitle}>{item.property_subtype}</Text>
      )}


      <Text style={styles.info}>
        Price Range:<Text style={{color:Colors.light.red}}> PKR {item.min_price?.toLocaleString()} - PKR
        {item.max_price?.toLocaleString()}</Text>
      </Text>


      {item.alert_for!=="community" && (
        <Text style={styles.info}>
          Beds: {item.beds}
        </Text>
      )}


      <Text style={styles.address}>
        📍 {item.address}
      </Text>


      <Text style={styles.radius}>
        Within {item.radius} miles
      </Text>


      <Text style={styles.date}>
        Created: { formatDate(item?.created_date)}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
         activeOpacity={1} onPress={()=>{router.push({
          pathname:"/AddNewAlerts",
          params:{
            id:item.alert_id,
            edit:true
          }
        })}}
        className=""
        >
          <Edit width={20} height={20} />
        </TouchableOpacity>
<TouchableOpacity
 activeOpacity={1}
  onPress={() => {
    Alert.alert(
      "Delete Alert",
      "Are you sure you want to delete this alert?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await deletAlert({
                user_id: user.id,
                alert_id: item.alert_id,
              }).unwrap();

              refetch();
              renderToastSuccess(res.message || "Alert deleted successfully");
            } catch (error: any) {
              renderToastError(
                error?.data?.message || "Failed to delete alert"
              );
            }
          },
        },
      ]
    );
  }}
>
          <Delete width={20} height={20} />
        </TouchableOpacity>
      </View>
  <TouchableOpacity
   activeOpacity={1}
  style={{
    backgroundColor: Colors.light.DarkGreen,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginTop:vs(10),
  }}
  activeOpacity={0.8}
  onPress={()=>{
  
item.alert_for==="community"?
  router.push({pathname:"/CommunitesLising",
    params:{
     
min_price:item?.min_price,
max_price:item?.max_price,
beds:item?.beds,
address:item.address,
lat:item.latitude,
lng:item.longitude,
stateCode:item.state,
city:item.city,
zip:item.zip,
radius:item.radius,
community_type:item?.community_type, 
    }
  }):
    router.push({pathname:"/BuyListing",
      params:{
property_for:item?.alert_for,
propertyType:item?.property_type,
propertysubType:item?.property_subtype,
min_price:item?.min_price,
max_price:item?.max_price,
beds:item?.beds,
address:item.address,
lat:item.latitude,
lng:item.longitude,
stateCode:item.state,
city:item.city,
zip:item.zip,
radius:item.radius,
      }
    })
  }}
>
  <Text
    style={{
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    }}
  >
    View Result
  </Text>
</TouchableOpacity>
    </View>
  );
    }

  return (
    <View className='flex-1 bg-white'>
  <HeaderWithBack title='My Alerts'  onBackpress={()=>setVisible(false)}/>
<FlashList
  data={data?.data ?? []}
  renderItem={RenderItem}
  keyExtractor={(item) => item.alert_id.toString()}
/>
  <Loading isLoading={deleting} text='deleting...'/>
    </View>
  )
}

export default MyAlerts

const styles = StyleSheet.create({  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.DarkGreen,
    textTransform: "capitalize",
    fontFamily:"PopinRegula"
  },
  badge: {
    backgroundColor:Colors.light.LightGreen,
    color: Colors.light.red,
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontFamily:"PopinRegula",
    borderRadius: 20,
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    fontFamily:"PopinRegula",
    textTransform: "capitalize",

  },
  info: {
    fontSize: 14,
    color: "#333",
    fontFamily:"PopinRegula",
    marginTop: 4,
 

  },
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    lineHeight: 20,
    fontFamily:"PopinRegula",
  },
  radius: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    fontFamily:"PopinRegula",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
    fontFamily:"PopinRegula"
  },
actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },

})


