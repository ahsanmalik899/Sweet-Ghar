
import { useGetSavedAdsApiQuery, useSaveItemApiMutation, useUnsaveItemApiMutation } from '@/store/api/user/MainApi';
import { userdata } from '@/store/slices/selector/user';
import Call from "@assets/Buy/call.svg";
import Mail from "@assets/Buy/email-open.svg";
import CommunitySatatus from "@assets/CreateProfile/construction-house.svg";
import RedHeart from "@assets/CreateProfile/heart-red.svg";
import Camera from "@assets/Feedimg/camera.svg";
import UnSelecteHeart from "@assets/Feedimg/unselected_heart.svg";
import Area from "@assets/icons/MypostListing/area.svg";
import Bed from "@assets/icons/MypostListing/bed.svg";
import Shower from "@assets/icons/MypostListing/shower.svg";
import CommunityType from "@assets/SideBar/commercialGreen.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { LegendList } from "@legendapp/list/react-native";
import { FlashList } from '@shopify/flash-list';
import Colors from '@src/constants/Colors';
import { hs, ms, vs } from '@utils/design/design';
import { ImageFormater } from '@utils/ImageFormat';
import { formatPrice } from '@utils/PriceFormater';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AddSingleView from '../AddSingleView';
import CircleImage from '../CircleImage/CircleImage';
import HeaderWithBack from '../HeaderWithBack';
import ProfileSingleView from '../ProfileSingleView';
import StarRating from '../StarRating';

type SavedItemCardProps = {
  item: any;
  user: any;
  saveItemApi: any;
  unsaveItemApi: any;
  openProfileModal: (item: any) => void | Promise<void>;
  setSelectedImages: (images: string[]) => void;
  setShowImages: (value: boolean) => void;
  setscrollable: (value: boolean) => void;
  setImageNo: (value: number) => void;
  setPostSingleView: (value: boolean) => void;
  setSinglePost: (value: any) => void;
};

const SavedItemCard = ({
  item,
  user,
  saveItemApi,
  unsaveItemApi,
  openProfileModal,
  setSelectedImages,
  setShowImages,
  setscrollable,
  setImageNo,
  setPostSingleView,
  setSinglePost,
}: SavedItemCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(item?.is_saved ?? false);

  useEffect(() => {
    setExpanded(false);
    setIsSaved(item?.is_saved ?? false);
  }, [item?.type, item?.data?.id, item?.is_saved]);
           const toggleSave = async () => {
     
      try {
        if (isSaved) {
          await unsaveItemApi({
            saved_id: item?.data?.id,
            user_id: user.id,
            type: item?.type==="property"?item?.data?.property_for:item?.data?.type,
          }).unwrap();
        } else {
          await saveItemApi({
            saved_id: item?.data?.id,
            user_id: user.id,
          type: item?.type==="property"?item?.data?.property_for:item?.data?.type,
          }).unwrap();
        }
      } catch (error) {
        console.log("Error saving/unsaving item:", error);

      } finally {
        setIsSaved((prev) => !prev);
      }
    };
       const openslider = (index: number) => {
      setSelectedImages(item.images || []);
      setShowImages(true);
      setscrollable(false);
      setImageNo(index);
    };
       const facts = item?.data?.imp_facts ?? item?.data?.facts ?? "";
if(item?.type==="profile"){
  return(
 <TouchableOpacity
  activeOpacity={1}
          onPress={()=>openProfileModal(item)}
            onLongPress={()=>openProfileModal(item)}
        >
          <View className="bg-white" style={styles.card}>
            <View
              className="flex-row justify-between items-center"
              style={{
                backgroundColor:
                  item?.data?.post_type === "Trending"
                    ? Colors.light.LightGreen
                    : "white",
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                borderRadius: ms(10),
                marginBottom: item?.data?.post_type === "Trending" ? vs(10) : vs(0),
              }}
            >
           <Text
  style={{
    color:
      item?.data?.post_type === "Trending" ||
      item?.data?.post_type === "Promoted"
        ? Colors.light.DarkGreen
        : "black",
    fontWeight: 700,
    fontSize: ms(18),
    fontFamily: "PopinRegula",
  }}
  numberOfLines={1}
  ellipsizeMode="tail"
>
 
  {item?.data?.business_name?.length > 20
    ? item?.data?.business_name.slice(0, 20) + "..."
    : item?.data?.business_name}

  {item?.data?.property_for === "rent" && (
    <Text
      style={{
        color: Colors.light.red,
        fontSize: ms(18),
        fontFamily: "PopinRegula",
      }}
    >
      /{item?.data?.rent_type}
    </Text>
  )}
</Text>
              {item?.data?.post_type === "Trending" && (
                <Text
                  style={{ fontWeight: 600, color: Colors.light.DarkGreen,fontFamily: "PopinRegula", }}
                >
                  Trending
                </Text>
              )}
            </View>
            <View className="flex-row justify-between">
           
             
            </View>
            <View className="flex-row justify-between">
              <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }}>
                {item?.data?.address?.length > 25
                  ? item?.data?.address.slice(0, 25) + "..."
                  : item?.data?.address}
              </Text>

              <Text style={{ color: Colors.light.textGray, marginTop: vs(5) ,fontFamily: "PopinRegula",}}>
                License# {item?.data?.license_no}
              </Text>
            </View>
            <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }} >{item?.data?.contact}</Text>
             <View className="flex-row items-center " >
                <StarRating rating={item?.data?.rating} size={10} />
                <Text style={{ color: Colors.light.textGray, fontWeight: 700,fontFamily: "PopinRegula",marginLeft:ms(5) }}>
                  {item?.data?.total_reviews} reviews
                </Text>
              </View>
            <View
              style={{
                height: vs(1),
                marginTop: vs(5),

                backgroundColor: Colors.light.textGray,
                opacity: 0.2,
              }}
            />
            <View>
              {item?.data?.remarks&&(
              <Text style={styles.description}>
                {expanded
                  ? item?.data?.remarks
                  : item?.data?.remarks?.slice(0, 70) +
                    (item?.data?.remarks?.length > 70 ? "..." : "")}

                {item?.data?.remarks?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(expanded ? false : true)}
                  >
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>)}

              <TouchableOpacity
               activeOpacity={1}
                onPress={() => {
                 
                }}
              >
                <Image
                  source={
                    item?.data?.cover ? { uri: ImageFormater(item?.data?.cover) } : NoImage
                  }
                  style={{
                    height: vs(250),
                    width: hs(350),
                    borderRadius: ms(10),
                    resizeMode: "cover",
                    alignSelf: "center",
                    backgroundColor: "gray",
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: vs(5),
                    left: hs(10),
                    right: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                ></View>
                <View
                  style={{
                    position: "absolute",
                    top: vs(5),
                    right: hs(10),
                    left: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  <TouchableOpacity
                   activeOpacity={1}
                                     style={{ marginLeft: "auto" }}
                                     onPress={toggleSave}
                                   >
                                     { isSaved ? (
                                       <RedHeart />
                                     ) : (
                                       <UnSelecteHeart />
                                     )}
                                   </TouchableOpacity>
                </View>
              </TouchableOpacity>

              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(10),
                  paddingHorizontal: vs(25),
                  marginTop: vs(10),
                }}
              >
             <Text style={{fontWeight:600,fontSize:ms(15),fontFamily: "PopinRegula",}}>{item?.data?.sale_posts} Sale ads</Text>
             <Text style={{fontWeight:600,fontSize:ms(15),fontFamily: "PopinRegula",}}>{item?.data?.rent_posts} Rent ads</Text>
              </View>

              <View
                className="flex-row justify-between"
                style={{
                  backgroundColor: "#ff007b1f",
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: hs(10),
                  marginTop: vs(8),
                }}
              >
                <TouchableOpacity
                 activeOpacity={1}>
                  <Mail />
                </TouchableOpacity>
                <TouchableOpacity
                 activeOpacity={1}>
                  <Call />
                </TouchableOpacity>

                <CircleImage
                  source={{ uri: ImageFormater(item?.data?.logo) }}
                  Size={40}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
   
  )
}
else if(item?.type==="community"){
  return(
    <TouchableOpacity
     activeOpacity={1}
          onPress={() => {
            setPostSingleView(true);
           setSinglePost({ type: "community",
                id: item?.data?.id});
          }}
        >
          <View className="bg-white" style={styles.card}>
            <View
              className="flex-row justify-between items-center"
              style={{
                backgroundColor:
                  item?.data?.post_type === "Trending"
                    ? Colors.light.LightGreen
                    : Colors.light.lightGray,
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                borderRadius: ms(10),
                marginBottom: item?.data?.post_type === "Trending" ? vs(10) : vs(10),
              }}
            >
              <Text
                style={{
                  color:
                    item?.data?.post_type === "Trending"
                      ? Colors.light.DarkGreen
                      : "black",
                  fontWeight: 700,
                  fontSize:ms(18),
                  fontFamily: "PopinRegula",
                }}
              >
               From PKR {item?.data?.price}
                
              </Text>
              {item?.data?.post_type === "Trending" && (
                <Text
                  style={{ fontWeight: 600, color: Colors.light.DarkGreen,fontFamily: "PopinRegula", }}
                >
                  Trending
                </Text>
              )}
            </View>

            <Text style={{ color: "black",fontWeight:700,fontFamily: "PopinRegula", }}>
              {item?.data?.community_title}
            </Text>
            <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }}>
              {item?.data?.address}
            </Text>
             <View
                                style={{
                                  height: vs(1),
                                  marginTop: vs(5),
                                  
                                  backgroundColor: Colors.light.textGray,
                                  opacity: 0.2,
                                }}
                              />
            <View>
              
              <View style={{marginTop:vs(5)}}>
             {item?.data?.post_type === "Trending" && facts && (
  facts
    .split(",",4)
    .filter(Boolean)
    .map((fact, index) => (
      <View
        key={index}
        style={[
          {
           
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: vs(3),
          },
        ]}
      >
        <View className="flex-row gap-3 items-center">
          <RedHeart height={vs(10)} width={vs(10)} />
          <Text
            style={{
              color: Colors.light.DarkGreen,
              fontWeight: "500",
              fontFamily: "PopinRegula",
              width: hs(250),
            }}
          >
            {fact.trim()}
          </Text>
        </View>
      </View>
    ))
)}</View>

              <Text style={styles.description}>
                {expanded
                  ? item?.data?.community_details
                  : item?.data?.community_details?.slice(0, 70) +
                    (item?.data?.community_details?.length > 70 ? "..." : "")}

                {item?.data?.community_details?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(expanded ? false : true)}
                  >
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>

              <TouchableOpacity
               activeOpacity={1}
                onPress={() => {
                  setSelectedImages(item?.data?.images || []);
                  setShowImages(true);
                  setscrollable(false);
                }}
              >
                <Image
                  source={
                    item?.data?.images && item?.data?.images.length > 0
                      ? { uri: ImageFormater(item?.data?.images[0]) }
                      : NoImage
                  }
                  style={{
                    height: vs(200),
                    width: hs(350),
                    borderRadius: ms(10),
                    resizeMode: "cover",
                    alignSelf: "center",
                    backgroundColor: "gray",
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: vs(5),
                    left: hs(10),
                    right: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  <View className="flex-row items-center">
                    <Camera />
                    <Text style={{ color: "white", fontWeight: 600 ,fontFamily: "PopinRegula",}}>
                      {" "}
                      {item?.data?.images ? item?.data?.images.length : 0}
                    </Text>
                  </View>
                  {item?.data?.saleprice_type === "Reduced Price" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {item?.data?.saleprice_type}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: vs(5),
                    right: hs(10),
                    left: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  {item?.data?.property_condition === "Newly build" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {item?.data?.property_condition}
                    </Text>
                  )}
                  <TouchableOpacity
                   activeOpacity={1}
                                     style={{ marginLeft: "auto" }}
                                     onPress={toggleSave}
                                   >
                                     { isSaved ? (
                                       <RedHeart />
                                     ) : (
                                       <UnSelecteHeart />
                                     )}
                                   </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {item?.data?.post_type==="Trending"&&(
                <View className='flex-1'>
                 <LegendList
                data={item?.data?.images || []}
                horizontal
                className="flex-1"
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                   activeOpacity={1}
                    className="mt-4 mr-2"
                    onPress={() => {
                      openslider(index);
                    }}
                  >
                    <Image
                      source={{ uri: ImageFormater(item) }}
                      style={{
                        height: vs(80),
                        width: vs(80),
                        borderRadius: ms(10),
                        resizeMode: "cover",
                        backgroundColor: "gray",
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            
            </View>
              )}
             
              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(10),
                  paddingHorizontal: vs(15),
                  marginTop: vs(10),
                }}
              >
                <>
                  <View className="flex-row items-center">
                                       <CommunityType />
                                       <Text style={{ marginLeft: vs(5),fontFamily: "PopinRegula", }}>
                                         {item?.data?.community_type}
                                       </Text>
                                     </View>
                                     <View className="flex-row items-center">
                                       <CommunitySatatus />
                                       <Text style={{ marginLeft: vs(5),fontFamily: "PopinRegula", }}>
                                         {item?.data?.community_status}
                                       </Text>
                                     </View>
                </>
              </View>

              <View
                className="flex-row justify-between"
                style={{
                  backgroundColor: "#ff007b1f",
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: hs(10),
                  marginTop: vs(8),
                 
                }}
              >
                <TouchableOpacity
                 activeOpacity={1}
                 >
                  <Mail />
                </TouchableOpacity>
                <TouchableOpacity
                 activeOpacity={1}>
                  <Call />
                </TouchableOpacity>

                <CircleImage
                  source={{ uri: ImageFormater(item?.data?.posted_by?.logo) }}
                  Size={40}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
  )
}
else{
  return(
   <TouchableOpacity
    activeOpacity={1}
          onPress={() => {
             setPostSingleView(true);
            setSinglePost({     type: item?.data?.property_for,
                 id:item?.data?.id});
           }}
         
         >
           <View className="bg-white" style={styles.card}>
             <View
               className="flex-row justify-between items-center"
               style={{
                 backgroundColor:
                   item?.data?.post_type === "Trending"
                     ? Colors.light.LightGreen
                     : Colors.light.lightGray,
                 paddingHorizontal: hs(10),
                 paddingVertical: vs(10),
                 borderRadius: ms(10),
                 marginBottom: vs(10),
               }}
             >
               <Text
                 style={{
                   color:
                     item?.data?.post_type === "Trending"
                       ? Colors.light.DarkGreen
                       : "black",
                   fontWeight: 700,
                   fontSize: ms(20),
                   fontFamily: "PopinRegular",
                 }}
               >
                 PKR {formatPrice(item?.data?.price.toString())}
                 {item?.data?.property_for === "rent" && (
                   <Text
                     style={{
                       color: Colors.light.red,
                       fontSize: ms(18),
                       fontFamily: "PopinRegular",
                     }}
                   >
                     /{item?.data?.rent_type}
                   </Text>
                 )}
               </Text>
               {item?.data?.post_type === "Trending" && (
                 <Text
                   style={{
                     fontWeight: 600,
                     color: Colors.light.DarkGreen,
                     fontFamily: "PopinRegular",
                   }}
                 >
                   Trending
                 </Text>
               )}
             </View>
 
             <Text
               style={{
                 color: "black",
                 fontWeight: 700,
                 fontSize: ms(15),
                 fontFamily: "PopinRegular",
               }}
             >
               {item?.data?.bedrooms} bedrooms {item?.data?.property_sub_type} for{" "}
               {item?.data?.property_for}
             </Text>
             <Text
               style={{
                 color: Colors.light.textGray,
                 marginTop: vs(5),
                 fontFamily: "PopinRegular",
               }}
             >
               {item?.data?.address}
             </Text>
             <View
               style={{
                 height: vs(1),
                 marginTop: vs(5),
 
                 backgroundColor: Colors.light.textGray,
                 opacity: 0.2,
               }}
             />
             <View>
               <View style={{ marginTop: vs(5) }}>
                 {item?.data?.post_type === "Trending" &&
                   facts &&
                   facts
                     .split(",", 4)
                     .filter(Boolean)
                     .map((fact, index) => (
                       <View
                         key={index}
                         style={[
                           {
                             flexDirection: "row",
                             alignItems: "center",
                             justifyContent: "space-between",
                             marginBottom: vs(3),
                           },
                         ]}
                       >
                         <View className="flex-row gap-3 items-center">
                           <RedHeart height={vs(10)} width={vs(10)} />
                           <Text
                             style={{
                               color: Colors.light.DarkGreen,
                               fontWeight: "500",
                               width: hs(250),
                               fontFamily: "PopinRegular",
                             }}
                           >
                             {fact.trim()}
                           </Text>
                         </View>
                       </View>
                     ))}
               </View>
         {item?.data?.property_details && (
               <Text style={styles.description}>
                 {expanded
                   ? item?.data?.property_details
                   : item?.data?.property_details?.slice(0, 70) +
                     (item?.data?.property_details?.length > 70 ? "..." : "")}
 
                 {item?.data?.property_details?.length > 70 && (
                   <Text
                     style={styles.moreText}
                     onPress={() => {
                       console.log(expanded,"expanded")
                       setExpanded(expanded ? false : true)}}>
                     {expanded ? " Show Less" : " Read More"}
                   </Text>
                 )}
               </Text>)}
 
               <TouchableOpacity
                activeOpacity={1}
                 onPress={() => {
                   setSelectedImages(item?.data?.images || []);
                   setShowImages(true);
                   setscrollable(false);
                 }}
               >
                 <Image
                   source={
                     item?.data?.images && item?.data?.images?.length > 0
                       ? { uri: ImageFormater(item?.data?.images[0]) }
                       : NoImage
                   }
                   style={{
                     height: vs(250),
                     width: hs(350),
                     borderRadius: ms(10),
                     resizeMode: "cover",
                     alignSelf: "center",
                     backgroundColor: "gray",
                   }}
                 />
 
                 <View
                   style={{
                     position: "absolute",
                     bottom: vs(5),
                     left: hs(10),
                     right: hs(10),
                     alignItems: "center",
                   }}
                   className="flex-row justify-between"
                 >
                   <View className="flex-row items-center">
                     <Camera />
                     <Text
                       style={{
                         color: "white",
                         fontWeight: 600,
                         fontFamily: "PopinRegular",
                       }}
                     >
                       {" "}
                       {item?.data?.images ? item?.data?.images?.length : 0}
                     </Text>
                   </View>
                   {item?.data?.saleprice_type === "Reduced Price" && (
                     <Text
                       style={{
                         backgroundColor: "rgba(241, 28, 28, 0.41)",
                         paddingHorizontal: hs(8),
                         paddingVertical: vs(8),
                         color: "white",
                         fontWeight: 600,
                         borderRadius: ms(10),
                         fontFamily: "PopinRegular",
                       }}
                     >
                       {item?.data?.saleprice_type}
                     </Text>
                   )}
                 </View>
                 <View
                   style={{
                     position: "absolute",
                     top: vs(5),
                     right: hs(10),
                     left: hs(10),
                     alignItems: "center",
                   }}
                   className="flex-row justify-between"
                 >
                   {item?.data?.property_condition === "Newly build" && (
                     <Text
                       style={{
                         backgroundColor: "rgba(241, 28, 28, 0.41)",
                         paddingHorizontal: hs(8),
                         paddingVertical: vs(8),
                         color: "white",
                         fontWeight: 600,
                         borderRadius: ms(10),
                         fontFamily: "PopinRegular",
                       }}
                     >
                       {item?.data?.property_condition}
                     </Text>
                   )}
                   <TouchableOpacity
                    activeOpacity={1}
                     style={{ marginLeft: "auto" }}
                     onPress={toggleSave}
                   >
                     { isSaved ? (
                       <RedHeart />
                     ) : (
                       <UnSelecteHeart />
                     )}
                   </TouchableOpacity>
                 </View>
               </TouchableOpacity>
               {item?.data?.post_type === "Trending" && (
                 <>
                 <View className='flex-1'>
                   <LegendList
                     data={item?.data?.images || []}
                     horizontal
                     className="flex-1"
                     keyExtractor={(item, index) => `${item}-${index}`}
                     renderItem={({ item, index }) => (
                       <TouchableOpacity
                        activeOpacity={1}
                         className="mt-4 mr-2"
                         onPress={() => {
                           openslider(index);
                         }}
                       >
                         <Image
                           source={{ uri: ImageFormater(item) }}
                           style={{
                             height: vs(80),
                             width: vs(80),
                             borderRadius: ms(10),
                             resizeMode: "cover",
                             backgroundColor: "gray",
                           }}
                         />
                       </TouchableOpacity>
                     )}
                   />
                   </View>
                 </>
               )}
 
               <View
                 className=" bg-white flex-row  justify-between"
                 style={{
                   elevation: 5,
                   borderRadius: 8,
                   paddingRight: hs(20),
                   paddingVertical: vs(10),
                   paddingHorizontal: vs(15),
                   marginTop: vs(10),
                 }}
               >
                 <>
                   <View className="flex-row items-center">
                     <Bed />
                     <Text
                       style={{ marginLeft: vs(5), fontFamily: "PopinRegular" }}
                     >
                       {item?.data?.bedrooms}
                     </Text>
                   </View>
                   <View className="flex-row items-center">
                     <Shower />
                     <Text
                       style={{ marginLeft: vs(5), fontFamily: "PopinRegular" }}
                     >
                       {item?.data?.bathrooms}
                     </Text>
                   </View>
                   <View className="flex-row items-center">
                     <Area />
                     <Text
                       style={{ marginLeft: vs(5), fontFamily: "PopinRegular" }}
                     >
                       {item?.data?.land_area} sqft
                     </Text>
                   </View>
                 </>
               </View>
 
               <View
                 className="flex-row justify-between"
                 style={{
                  backgroundColor: "#ff007b1f",
                   borderRadius: 8,
                   paddingRight: hs(20),
                   paddingVertical: vs(5),
                   paddingHorizontal: hs(10),
                   marginTop: vs(8),
                 }}
               >
                 <TouchableOpacity
                  activeOpacity={1}>
                   <Mail />
                 </TouchableOpacity>
                 <TouchableOpacity
                  activeOpacity={1}>
                   <Call />
                 </TouchableOpacity>
                 <CircleImage
                   source={
                     item?.data?.posted_by?.logo
                       ? { uri: ImageFormater(item?.data?.posted_by?.logo) }
                       : null
                   }
                   Size={40}
                 />
               </View>
             </View>
           </View>
         </TouchableOpacity>
   
  )
}
};

const index = ({setShowSaved}:{setShowSaved:(value:boolean)=>void}) => {
    const user = useSelector(userdata);
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(10);
      const [showImages, setShowImages] = useState(false);
      const [selectedImages, setSelectedImages] = useState<string[]>([]);
        const [scrollable, setscrollable] = useState(true);
      const[singlePost,setSinglePost]=useState<any>(null);
      const[singleView,setSingleView]=useState(false);
      const[postSingleView,setPostSingleView]=useState(false);
    const [profileData, setProfileData] = useState<any>(null);
      const [imageNo, setImageNo] = useState(0);
      const[initialLoad,setInitialLoad]=useState(true);
    const {data:savedItems,isLoading,isFetching}=useGetSavedAdsApiQuery({user_id:user?.id,page,limit},{skip:!user?.id});
    const [saveList, setSaveList] = useState<any[]>([]);
 const [saveItemApi] = useSaveItemApiMutation();
      const [unsaveItemApi] = useUnsaveItemApiMutation();
    useEffect(() => {
      if(page===1){
        if(isLoading){
         setInitialLoad(true);
        }else{
          setInitialLoad(false);
        }
        setSaveList(savedItems?.data?.feed ?? []);}
        else{
          setSaveList((prev) => [...prev, ...(savedItems?.data?.feed ?? [])]);
        }
    }, [savedItems]);
   
      const openProfileModal = async(item: any) => {
    setProfileData({
    type: item?.data?.type,
    id: item?.data?.id,
    userid:item?.data?.users_id,
    });
    setSingleView(true);
  };
  return (
    <View className='flex-1' style={{backgroundColor:"#F4F0F0"}}>
      <HeaderWithBack title="Saved Items" onBackpress={()=>setShowSaved(false)} />
        {initialLoad?(
          <ActivityIndicator />
        ):(
          <View className='flex-1'>
            <FlashList
  data={saveList}
  onEndReached={() => {
    if (!isFetching) {
      setPage((prev) => prev + 1);
    }
  }}
  onEndReachedThreshold={0.8}
  ListFooterComponent={
    isFetching ? <ActivityIndicator /> : null
  }
  ListEmptyComponent={
    <View className="flex-1 justify-center items-center">
      <Text>No Saved Items</Text>
    </View>
  }
  onRefresh={() => {
    setPage(1);
    setSaveList([]);
  }}
  refreshing={isFetching}
  keyExtractor={(item, index) => `${item?.type}-${item?.data?.id ?? index}`}
    renderItem={({ item }: { item: any }) => (
      <SavedItemCard
        item={item}
        user={user}
        saveItemApi={saveItemApi}
        unsaveItemApi={unsaveItemApi}
        openProfileModal={openProfileModal}
        setSelectedImages={setSelectedImages}
        setShowImages={setShowImages}
        setscrollable={setscrollable}
        setImageNo={setImageNo}
        setPostSingleView={setPostSingleView}
        setSinglePost={setSinglePost}
      />
    )}
/>
     </View>)}

          <Modal
                visible={singleView}
                animationType="slide"
                onRequestClose={() => setSingleView(false)}
                transparent={true}
                statusBarTranslucent={true}
              >
                 <SafeAreaView
                                                                                           style={{ flex: 1 }}
                                                                                           edges={[ "bottom", "left", "right"]}
                                                                                         >
         <ProfileSingleView id={profileData?.id} type={profileData?.type} setshowModel={setSingleView}/>
         </SafeAreaView>
              </Modal>
                  <Modal visible={postSingleView} animationType="slide" onRequestClose={() => {    setPostSingleView(false);
                  setSinglePost(null);
                }} transparent={true}
                              statusBarTranslucent={true}  >
                                 <SafeAreaView
                                                                                           style={{ flex: 1 }}
                                                                                           edges={[ "bottom", "left", "right"]}
                                                                                         >
                              <AddSingleView id={singlePost?.id} type={singlePost?.type} setshowModel={setPostSingleView} />
                              </SafeAreaView>
                            </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    marginTop: vs(20),
    borderRadius: ms(10),
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
    elevation: 2,
  },
  description: {
    color: Colors.light.textGray,
    marginTop: vs(5),
    fontFamily: "PopinRegula",
    fontSize: ms(14),
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: 700,
    fontSize: ms(14),
    fontFamily: "PopinRegula",
  },
})


export default index