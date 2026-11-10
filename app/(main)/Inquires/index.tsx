import {
  useDeleterecivedInquiriesMutation,
  useDeletSendedInquiryMutation,
  useGetRecivedInquieryQuery,
  useGetsendedInquieryQuery,
  useInquirymarkAsReadMutation,
  useLazyGetInquireyMessagesApiQuery,
  useSendInquireyMessageApiMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Back from "@assets/icons/BackArrow.svg";
import Send from "@assets/icons/send.svg";
import Delete from "@assets/SideBar/deletbaskit.svg";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Loading from "@src/components/globals/Loading";
import TablikeButton from "@src/components/globals/TablikeButton";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { formatPrice } from "@utils/PriceFormater";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const index = () => {
  const user = useAppSelector(userdata);

  const params = useLocalSearchParams();
  const [value, setValue] = useState("Sent");
  const insets = useSafeAreaInsets();
  const [sendInquireyMessageApi, { isLoading: sendInquireyMessageLoading }] =
    useSendInquireyMessageApiMutation();
  const [getInquireyMessagesApi, { isLoading: getInquireyMessagesLoading }] =
    useLazyGetInquireyMessagesApiQuery();
  const [message, setMessage] = useState("");
  const [ids, setIds] = useState<number[]>([]);
  const [showchatModal, setShowchatModal] = useState(false);
  const [selectedChatProfile, setSelectedChatProfile] = useState<any>(null);
  const [selectedChatItem, setSelectedChatItem] = useState<any>(null);
  const [recivesIds, setReciveIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [inquirymarkAsRead] = useInquirymarkAsReadMutation();
  const [messages, setMessages] = useState<any[]>([]);
  const [chatHasMore, setChatHasMore] = useState(true);
  const [chatLoadingMore, setChatLoadingMore] = useState(false);
  const [chatInitialLoading, setChatInitialLoading] = useState(false);
  const chatListRef = useRef<any>(null);
  const [deletsended, { isLoading }] = useDeletSendedInquiryMutation();
  const [deletrecived, { isLoading: loadingRecivedDelet }] =
    useDeleterecivedInquiriesMutation();
  const [selectAll, setSellectall] = useState(false);
  const [selectAllcomp2, setSellectallcomp2] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState<"sent" | "received" | null>(
    null
  );
const [receivedHasMore, setReceivedHasMore] = useState(true);
const receivedEndReachedLock = useRef(false);
  useEffect(() => {
    inquirymarkAsRead({
      userId: user.id,
      chatUserId: selectedChatProfile?.users_id,
      postId: selectedChatItem?.inquiry_id,
    });
  }, [messages, selectedChatProfile, selectedChatItem]);
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
  const handlereciveSelect = (id: number | string) => {
    const numId = Number(id);
    setReciveIds((prev) => {
      if (prev.includes(numId)) {
        return prev.filter((i) => i !== numId);
      } else {
        return [...prev, numId];
      }
    });
  };
  const [sendpage, setsendPage] = useState(1);
  const [recivedpage, setrecivedPage] = useState(1);
  const [sended, setsended] = useState([]);
  const [recived, setrecived] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showProfiles, setShowProfiles] = useState<Record<string, boolean>>({});
  const [sentExpanded, setSentExpanded] = useState<Record<string, boolean>>({});
  const [sentShowMore, setSentShowMore] = useState<Record<string, boolean>>({});

  const [receivedExpanded, setReceivedExpanded] = useState<
    Record<string, boolean>
  >({});

  const [receivedShowMore, setReceivedShowMore] = useState<
    Record<string, boolean>
  >({});
  const {
    isFetching,
    data,
    refetch: refetchSended,
  } = useGetsendedInquieryQuery({
    id: user.id,
    page: sendpage,
  });
  const confirmDelete = async () => {
    try {
      if (deleteType === "sent") {
        const formData = new FormData();
        formData.append("ids", ids.join(","));

        const result = await deletsended(formData).unwrap();
        renderToastSuccess("Deleted successfully!");

        setsended((prev) =>
          prev.filter((item) => !ids.includes(Number(item.inquiry_id)))
        );

        setIds([]);
        setSellectall(false);
      }

      if (deleteType === "received") {
        const formData = new FormData();
        formData.append("ids", recivesIds.join(","));
        formData.append("user_id", user?.id?.toString());

        const result = await deletrecived(formData).unwrap();
        renderToastSuccess("Deleted successfully!");

        setrecived((prev) =>
          prev.filter((item) => !recivesIds.includes(Number(item.inquiry_id)))
        );

        setReciveIds([]);
        setSellectallcomp2(false);
      }

      setShowConfirm(false);
    } catch (err) {
      console.log("Delete Error:", err);
      renderToastError("Failed to delete inquiries");
      setShowConfirm(false);
    }
  };
  useEffect(() => {
    if (showchatModal && selectedChatProfile) {
      if (page === 1) {
        setChatInitialLoading(true);
      } else {
        setChatLoadingMore(true);
      }

      getInquireyMessagesApi({
        user_id: user.id,
        chat_user_id: selectedChatProfile.users_id,
        page: page,
        per_page: 20,
        post_id: selectedChatItem?.inquiry_id,
      })
        .unwrap()
        .then((res: any) => {
          if (res.success) {
            const msgs = res?.data ? [...res.data].reverse() : [];

            if (page === 1) {
              setMessages(msgs);
            } else {
              setMessages((prev) => [...msgs, ...prev]);
            }

            setChatHasMore(res.pagination?.has_more ?? false);
          }
        })
        .finally(() => {
          setChatInitialLoading(false);
          setChatLoadingMore(false);
        });
    }
  }, [showchatModal, selectedChatProfile, page]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const optimisticMsg = {
      msg_id: `temp-${Date.now()}`,
      sender_id: user.id,
      sender_name: user.name,
      recevier_id: selectedChatProfile.users_id,
      recevier_name: selectedChatProfile?.business_name,
      msg_description: message,
      last_activity: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setMessage("");

    try {
      const res: any = await sendInquireyMessageApi({
        sender_id: user.id,
        sender_name: user.name,
        recevier_id: selectedChatProfile.users_id,
        recevier_name: selectedChatProfile?.business_name,
        msg_description: message,
        recevier_post_id: selectedChatItem?.inquiry_id,
        chat_type: selectedChatItem?.chat_type,
      }).unwrap();

      if (res.success && res.message) {
        setMessages((prev) =>
          prev.map((m) => (m.msg_id === optimisticMsg.msg_id ? res.message : m))
        );
      }
    } catch (err) {
      console.error("Send message error:", err);

      setMessages((prev) =>
        prev.filter((m) => m.msg_id !== optimisticMsg.msg_id)
      );
      renderToastError("Failed to send message");
    }
  };

  const renderChatMessage = ({ item }: any) => {
    const isMe = item.sender_id == user.id;
    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 4,
          alignItems: isMe ? "flex-end" : "flex-start",
        }}
      >
        <View
          style={{
            backgroundColor: isMe ? Colors.light.DarkGreen : "#e5e5e5",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 16,
            borderBottomRightRadius: isMe ? 4 : 16,
            borderBottomLeftRadius: isMe ? 16 : 4,
            maxWidth: "80%",
          }}
        >
          <Text
            style={{
              color: isMe ? "#fff" : "#000",
              fontSize: 14,
              fontFamily: "PopinRegula",
            }}
          >
            {item.msg_description || item.content}
          </Text>
        </View>
        {item.last_activity && (
          <Text
            style={{
              fontSize: 10,
              color: "#999",
              marginTop: 2,
              marginHorizontal: 4,
            }}
          >
            {new Date(item.last_activity).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>
    );
  };
  const {
    isFetching: recivedLoading,
    data: recivedData,
    refetch: refetchRecived,
  } = useGetRecivedInquieryQuery({ id: user.id, page: recivedpage });
  const renderItem = ({ item }) => {
    const profileCount = item.profiles?.length || 0;
    const inquiryId = String(item.inquiry_id);

    const showprofile = !!showProfiles[inquiryId];

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            elevation: ids.includes(Number(item.inquiry_id)) ? 0 : 3,
            backgroundColor: ids.includes(Number(item.inquiry_id))
              ? Colors.light.LightGreen
              : "#fff",
            borderColor: ids.includes(Number(item.inquiry_id))
              ? Colors.light.DarkGreen
              : "#eee",
          },
          {},
        ]}
        activeOpacity={0.9}
        onPress={() => handleSelect(item.inquiry_id)}
      >
        {item.total_unread > 0 && (
          <Text
            style={{
              color: "white",
              height: 30,
              width: 30,
              textAlign: "center",
              backgroundColor: Colors.light.red,
              fontWeight: "bold",
              position: "absolute",
              top: 5,
              right: 10,
              fontSize: 12,
              padding: 5,
              borderRadius: 15,
            }}
          >
            {item.total_unread}
          </Text>
        )}
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              Request for {item.inquiry_for || "Property"}
              {item.property_type && ` ${item.property_type}`}
              {item.inquiry_type && (
                <Text style={styles.subTitle}> • {item.inquiry_type}</Text>
              )}
            </Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        {(item.property_type || item.min_price || item.max_price) && (
          <View style={styles.infoRow}>
            {item.property_type && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.property_type}</Text>
              </View>
            )}
            {item.min_price && item.max_price && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  PKR{formatPrice(item.min_price)} - PKR
                  {formatPrice(item.max_price)}
                </Text>
              </View>
            )}
            {item.min_bed && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {item.min_bed}-{item.max_bed} Beds
                </Text>
              </View>
            )}
          </View>
        )}

        <View
          style={{
            height: 1,
            backgroundColor: Colors.light.lightGray,
            marginVertical: vs(10),
          }}
        />
        {item.message && (
          <>
            <Text
              numberOfLines={sentExpanded[inquiryId] ? undefined : 2}
              onTextLayout={(e) => {
                const lines = e?.nativeEvent?.lines;

                if (!Array.isArray(lines)) return;

                setSentShowMore((prev) => ({
                  ...prev,
                  [inquiryId]: lines.length > 2,
                }));
              }}
              style={styles.message}
            >
              {item.message}
            </Text>

            {sentShowMore[inquiryId] && (
              <Text
                style={styles.seeMore}
                onPress={() => {
                  setSentExpanded((prev) => ({
                    ...prev,
                    [inquiryId]: !prev[inquiryId],
                  }));
                }}
              >
                {sentExpanded[inquiryId] ? "See less" : "See more"}
              </Text>
            )}
          </>
        )}
        <View
          style={{
            height: 1,
            backgroundColor: Colors.light.lightGray,
            marginVertical: vs(10),
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowProfiles((prev) => ({
              ...prev,
              [inquiryId]: !prev[inquiryId],
            }));
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subTitle}>
              {profileCount} {profileCount > 1 ? "Businesses" : "Business"}{" "}
              received your inquiry
            </Text>
            <Ionicons
              name={showprofile ? "chevron-up" : "chevron-down"}
              size={22}
              color={Colors.light.DarkGreen}
            />
          </View>
        </TouchableOpacity>
        {showprofile && item.profiles?.length > 0 && (
          <View className="flex-1">
            <FlashList
              style={{ flex: 1, backgroundColor: "white" }}
              data={item.profiles ?? []}
              extraData={ids}
              showsVerticalScrollIndicator={false}
              keyExtractor={(profile, index) =>
                profile.users_id?.toString() ?? `profile-${index}`
              }
              renderItem={({ item: profile }) => (
                <TouchableOpacity
                 activeOpacity={1}
                  style={styles.card}
                  disabled={profile?.inquiry_closed}
                  onPress={() => {
                    setSelectedChatProfile(profile);
                    setSelectedChatItem({
                      ...item,
                      chat_type: "sent",
                    });
                    setShowchatModal(true);
                  }}
                >
                  <View style={styles.topRow}>
                    <View style={{ position: "relative" }}>
                      {profile?.unread_count > 0 && (
                        <Text
                          style={{
                            position: "absolute",
                            top: -5,
                            left: -5,
                            zIndex: 10,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 11,
                            height: 22,
                            width: 22,
                            textAlign: "center",
                            backgroundColor: Colors.light.red,
                            borderRadius: 11,
                            paddingTop: 3,
                          }}
                        >
                          {profile?.unread_count}
                        </Text>
                      )}

                      <CircleImage
                        Size={45}
                        source={{ uri: ImageFormater(profile?.logo) }}
                      />
                    </View>

                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.name}>{profile?.business_name}</Text>

                      <Text style={styles.address}>{profile?.address}</Text>
                    </View>
                  </View>

                  {profile?.inquiry_closed && (
                    <View style={styles.closedBadge}>
                      <Text style={styles.closedText}>Inquiry Closed</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  const renderrecived = ({ item }) => {
    const inquiryId = String(item.inquiry_id);
    return (
      <TouchableOpacity
       activeOpacity={1}
        style={[
          styles.card,
          {
            elevation: recivesIds.includes(Number(item.inquiry_id)) ? 0 : 3,
            backgroundColor: recivesIds.includes(Number(item.inquiry_id))
              ? Colors.light.LightGreen
              : "#fff",
            borderColor: recivesIds.includes(Number(item.inquiry_id))
              ? Colors.light.DarkGreen
              : "#eee",
          },
        ]}
        onPress={() => handlereciveSelect(item.inquiry_id)}
      >
        <View style={styles.senderBox}>
          <CircleImage
            Size={45}
            source={{
              uri: item.sender_image
                ? ImageFormater(item.sender_image)
                : "https://i.pravatar.cc/150?img=12",
            }}
          />

          {/* INFO */}
          <View style={{ flex: 1 }}>
            <Text style={styles.senderName}>{item.sender_name}</Text>

            {item.sender_phone && (
              <Text style={styles.senderInfo}>📞 {item.sender_phone}</Text>
            )}

            {item.sender_email && (
              <Text style={styles.senderInfo}>✉️ {item.sender_email}</Text>
            )}
          </View>
          {item.status === "Deleted" && (
            <Text style={{ color: Colors.light.red }}>Inquiery closed</Text>
          )}
        </View>
        {/* TOP ROW */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inquiryFor}>{item.inquiry_for}</Text>

            {item.inquiry_type && (
              <Text style={styles.inquiryType}>{item.inquiry_type}</Text>
            )}
          </View>

          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        {item.address && <Text style={styles.address}>📍 {item.address}</Text>}
        <View
          style={{
            height: 1,
            backgroundColor: Colors.light.lightGray,
            marginVertical: vs(10),
          }}
        />

        {item.message && (
          <>
            <Text
              numberOfLines={receivedExpanded[inquiryId] ? undefined : 2}
              onTextLayout={(e) => {
                const lines = e?.nativeEvent?.lines;

                if (!Array.isArray(lines)) return;

                if (!receivedShowMore[inquiryId]) {
                  setReceivedShowMore((prev) => ({
                    ...prev,
                    [inquiryId]: lines.length > 2,
                  }));
                }
              }}
              style={styles.message}
            >
              💬 {item.message}
            </Text>

            {receivedShowMore[inquiryId] && (
              <Text
                style={styles.seeMore}
                onPress={() => {
                  setReceivedExpanded((prev) => ({
                    ...prev,
                    [inquiryId]: !prev[inquiryId],
                  }));
                }}
              >
                {receivedExpanded[inquiryId] ? "See less" : "See more"}
              </Text>
            )}
          </>
        )}

        <TouchableOpacity
         activeOpacity={1}
          style={styles.replyBtn}
          disabled={item?.inquiry_closed || item.status === "Deleted"}
          onPress={() => {
            setSelectedChatProfile({
              business_name: item.sender_name,
              logo: item.sender_image,
              users_id: item.sender_id,
            });
            setSelectedChatItem({
              ...item,
              chat_type: "received",
            });
            setShowchatModal(true);
          }}
        >
          <MaterialIcons name="reply" size={18} color="#fff" />
          <Text style={styles.replyBtnText}>Reply</Text>
          {item.unread_count > 0 && (
            <View
              style={{
                backgroundColor: "red",
                borderRadius: 10,
                minWidth: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 5,
                marginLeft: 6,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 11, fontWeight: "bold" }}>
                {item.unread_count}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (data?.success) {
      if (sendpage === 1) {
        setsended(data?.data || []);
      } else {
        setsended((prev) => [...prev, ...(data?.data || [])]);
      }
    }
  }, [data]);
useEffect(() => {
  if (!recivedData?.success) return;

  const newItems = recivedData?.data ?? [];

  if (recivedpage === 1) {
    setrecived(newItems);
  } else {
    setrecived((prev: any[]) => {
      const existingIds = new Set(
        prev.map((item) => Number(item.inquiry_id))
      );

      const uniqueItems = newItems.filter(
        (item: any) =>
          !existingIds.has(Number(item.inquiry_id))
      );

      return [...prev, ...uniqueItems];
    });
  }

  // Backend has_more bhej raha ho to usko prefer karo.
  // Warna current page ke 10 items ko fallback samjho.
  const hasMore =
    recivedData?.pagination?.has_more ??
    recivedData?.has_more ??
    newItems.length >= 10;

  setReceivedHasMore(Boolean(hasMore));
  receivedEndReachedLock.current = false;
}, [recivedData, recivedpage]);
  const componenet1 = (
    <View style={{ marginTop: vs(10), flex: 1 }}>
      <Text>Your inquiries</Text>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <TouchableOpacity
         activeOpacity={1}
          className="flex-row gap-3 mb-3"
          onPress={() => {
            const newSelectAll = !selectAll;
            setSellectall(newSelectAll);
            console.log(data);
            setIds(newSelectAll ? data?.all_ids ?? [] : []);
          }}
        >
          <MaterialIcons
            size={18}
            color={Colors.light.DarkGreen}
            name={selectAll ? "check-box" : "check-box-outline-blank"}
          />
          <Text>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity
         activeOpacity={1}
          onPress={() => {
            if (!ids.length) return;
            setDeleteType("sent");
            setShowConfirm(true);
          }}
        >
          <Delete />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {!isFetching && sended?.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 120 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#F4F0F0" }}>
              No Data Found
            </Text>
          </View>
        ) : (
          <FlashList
            style={{ flex: 1, backgroundColor: "#F4F0F0" }}
            data={sended ?? []}
            extraData={ids}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.inquiry_id?.toString()}
            onEndReachedThreshold={1}
            onEndReached={() => {
              if (!isFetching && sended?.length > 9) {
                setsendPage((prev) => prev + 1);
              }
            }}
            ListFooterComponent={
              isFetching && sendpage > 1 ? (
                <ActivityIndicator size="small" />
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={isFetching && sendpage === 1}
                onRefresh={() => {
                  if (sendpage === 1) {
                    refetchSended();
                  } else {
                    setsendPage(1);
                  }
                }}
              />
            }
          />
        )}
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10), flex: 1 }}>
      <View>
        <Text>Your inquiries</Text>
      </View>

      {!recivedLoading && recived?.length === 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
            Boost your <Text style={{ color: Colors.light.red }}>BUSINESS</Text>{" "}
            & to next level
          </Text>
          <Text style={{ marginTop: vs(20) }}>
            Upgrade your business profile to Trending and receive unlimited
            queries relevant to your business such as if you upgrade your agent
            profile then you can receive queries for buying,selling or letting
            from your city No limit of receiving queries untill your profile
            remains trending you will keep receiving queries. Simply go to your
            business profiles and select the profile you want to upgrade and
            starting getting enquiries straight into your account. Increase your
            clientele base without spending too much on advertisement.
          </Text>
          <TouchableOpacity  activeOpacity={1}>
            <Text style={{ color: Colors.light.DarkGreen }}>
              One place to boost your businesss
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1">
          <View
            className="justify-between flex-row"
            style={{ marginTop: vs(10) }}
          >
            <TouchableOpacity
             activeOpacity={1}
              className="flex-row gap-3 mb-3"
              onPress={() => {
                const newSelectAll = !selectAllcomp2;
                setSellectallcomp2(newSelectAll);
                console.log(data);
                setReciveIds(newSelectAll ? recivedData?.all_ids ?? [] : []);
              }}
            >
              <MaterialIcons
                size={18}
                color={Colors.light.DarkGreen}
                name={selectAllcomp2 ? "check-box" : "check-box-outline-blank"}
              />
              <Text>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity
             activeOpacity={1}
              onPress={() => {
                if (!recivesIds.length) return;
                setDeleteType("received");
                setShowConfirm(true);
              }}
            >
              <Delete />
            </TouchableOpacity>
          </View>
          <View className="flex-1">
        <FlashList
  style={{
    flex: 1,
    backgroundColor: "#F4F0F0",
  }}
  data={recived ?? []}
  extraData={recivesIds}
  showsVerticalScrollIndicator={false}
  renderItem={renderrecived}
  keyExtractor={(item) =>
    item.inquiry_id?.toString()
  }
  onEndReachedThreshold={0.3}
  onEndReached={() => {
    if (
      receivedEndReachedLock.current ||
      recivedLoading ||
      !receivedHasMore
    ) {
      return;
    }

    receivedEndReachedLock.current = true;
    setrecivedPage((prev) => prev + 1);
  }}
  ListFooterComponent={
    recivedLoading && recivedpage > 1 ? (
      <ActivityIndicator size="small" />
    ) : null
  }
  refreshControl={
    <RefreshControl
      refreshing={
        recivedLoading && recivedpage === 1
      }
      onRefresh={() => {
        setReceivedHasMore(true);
        receivedEndReachedLock.current = false;

        if (recivedpage === 1) {
          refetchRecived();
        } else {
          setrecivedPage(1);
        }
      }}
    />
  }
/>
          </View>
        </View>
      )}
    </View>
  );
  useEffect(() => {
    if (params?.inquierychat?.toString() !== "1") return;

    const inquiryId = Number(params.post_id);

    if (!inquiryId) return;

    if (!sended.length && !recived.length) return;

    const foundItem =
      sended.find((item) => Number(item.inquiry_id) === inquiryId) ||
      recived.find((item) => Number(item.inquiry_id) === inquiryId);

    setSelectedChatProfile({
      business_name: params.name || params.sender_name,
      logo: params.sender_image,
      users_id: Number(params.userId),
    });
    console.log("foundItem", params.userId);
    if (foundItem) {
      setSelectedChatItem(foundItem);
    } else {
      setSelectedChatItem({ inquiry_id: inquiryId });
    }

    setPage(1);
    setMessages([]);
    setChatHasMore(true);
    setShowchatModal(true);
  }, [sended, recived]);
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#F4F0F0" }}>
      <HeaderWithBack title="Inquiries" />
      <View className="flex-1" style={{ marginHorizontal: hs(10) }}>
        <TablikeButton
          btn1value="Sent"
          btn2value="Received"
          btnTxt1="Sent"
          btnTxt2="Received"
          onPress={(value) => setValue(value)}
          value={value}
          Componet1={componenet1}
          Componet2={componenet2}
          backgroundColor="#F4F0F0"
        />
      </View>
      <Loading isLoading={isLoading} text="Deleting..." />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {showConfirm && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 20 }}
              >
                Are you sure you want to delete{" "}
                {deleteType === "sent" ? ids.length : recivesIds.length}{" "}
                inquiries?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                 activeOpacity={1}
                  onPress={() => setShowConfirm(false)}>
                  <Text style={{ color: "gray", fontWeight: "600" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                 activeOpacity={1}
                  onPress={confirmDelete}>
                  <Text style={{ color: Colors.light.red, fontWeight: "700" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <Modal
          visible={showchatModal}
          animationType="slide"
          transparent
          onRequestClose={() => {
            setShowchatModal(false);
            setMessages([]);
            setPage(1);
            setChatHasMore(true);
          }}
        >
          <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={0}
            >
              <View style={{ flex: 1, backgroundColor: "#F4F0F0" }}>
                {selectedChatProfile && (
                  <View
                    style={{
                      backgroundColor: "#fff",
                      paddingBottom: vs(12),
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                      elevation: 3,
                      paddingTop: insets.top,
                    }}
                  >
                    <View
                      className="flex-row items-center gap-3"
                      style={{
                        marginHorizontal: hs(10),
                        paddingTop: vs(10),
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                       activeOpacity={1}
                        onPress={() => {
                          setShowchatModal(false);
                          setMessages([]);
                          setPage(1);
                          setChatHasMore(true);
                        }}
                      >
                        <Back />
                      </TouchableOpacity>

                      <View style={{ flex: 1 }}>
                        <Text style={styles.name}>
                          {selectedChatProfile?.business_name}
                        </Text>
                      </View>
                      <CircleImage
                        Size={45}
                        source={{
                          uri: ImageFormater(selectedChatProfile?.logo),
                        }}
                      />
                      {selectedChatProfile?.inquiry_closed && (
                        <View style={styles.closedBadge}>
                          <Text style={styles.closedText}>Closed</Text>
                        </View>
                      )}
                    </View>

                    {selectedChatItem && (
                      <View
                        style={{
                          marginHorizontal: hs(10),
                          marginTop: vs(10),
                          paddingTop: vs(8),
                          borderTopWidth: 1,
                          borderColor: "#eee",
                        }}
                      >
                        <Text style={styles.title}>
                          Request for{" "}
                          {selectedChatItem.inquiry_for || "Property"}
                          {selectedChatItem.property_type &&
                            ` ${selectedChatItem.property_type}`}
                          {selectedChatItem.inquiry_type && (
                            <Text style={styles.subTitle}>
                              {" "}
                              • {selectedChatItem.inquiry_type}
                            </Text>
                          )}
                        </Text>
                        {selectedChatItem.address && (
                          <Text style={styles.address}>
                            📍 {selectedChatItem.address}
                          </Text>
                        )}
                        {(selectedChatItem.property_type ||
                          selectedChatItem.min_price ||
                          selectedChatItem.min_bed) && (
                          <View style={styles.infoRow}>
                            {selectedChatItem.property_type && (
                              <View style={styles.tag}>
                                <Text style={styles.tagText}>
                                  {selectedChatItem.property_type}
                                </Text>
                              </View>
                            )}
                            {selectedChatItem.min_price &&
                              selectedChatItem.max_price && (
                                <View style={styles.tag}>
                                  <Text style={styles.tagText}>
                                    PKR{formatPrice(selectedChatItem.min_price)} -
                                    PKR{formatPrice(selectedChatItem.max_price)}
                                  </Text>
                                </View>
                              )}
                            {selectedChatItem.min_bed && (
                              <View style={styles.tag}>
                                <Text style={styles.tagText}>
                                  {selectedChatItem.min_bed}-
                                  {selectedChatItem.max_bed} Beds
                                </Text>
                              </View>
                            )}
                          </View>
                        )}
                        <View
                          style={{
                            height: 1,
                            backgroundColor: Colors.light.lightGray,
                            marginVertical: vs(10),
                          }}
                        />
                        {selectedChatItem.message && (
                          <>
                            <Text
                              numberOfLines={expanded ? undefined : 2}
                              onTextLayout={(e) => {
                                const lines = e?.nativeEvent?.lines;

                                if (!Array.isArray(lines)) return;

                                setShowMore(lines.length > 2);
                              }}
                              style={styles.message}
                            >
                              {selectedChatItem.message}
                            </Text>

                            {showMore && (
                              <Text
                                style={styles.seeMore}
                                onPress={() => setExpanded(!expanded)}
                              >
                                {expanded ? "See less" : "See more"}
                              </Text>
                            )}
                          </>
                        )}
                      </View>
                    )}
                  </View>
                )}

                {chatInitialLoading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator
                      size="large"
                      color={Colors.light.DarkGreen}
                    />
                  </View>
                ) : (
                  <>
                    {chatLoadingMore && (
                      <View
                        style={{ paddingVertical: 8, alignItems: "center" }}
                      >
                        <ActivityIndicator
                          size="small"
                          color={Colors.light.DarkGreen}
                        />
                      </View>
                    )}
                    <View className="flex-1">
                      <FlashList
                        ref={chatListRef}
                        style={{ flex: 1, backgroundColor: "#F4F0F0" }}
                        data={messages}
                        renderItem={renderChatMessage}
                        keyExtractor={(item: any) => item.msg_id?.toString()}
                        onEndReachedThreshold={0.1}
                        onScroll={(e: any) => {
                          const offset = e.nativeEvent.contentOffset.y;

                          if (
                            offset <= 0 &&
                            chatHasMore &&
                            !chatLoadingMore &&
                            !chatInitialLoading
                          ) {
                            setPage((prev) => prev + 1);
                          }
                        }}
                      />
                    </View>
                  </>
                )}
                <View className="flex-row p-3 border-t border-gray-200 mb-1 ">
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type message..."
                    placeholderTextColor={Colors.light.textGray}
                    className="flex-1 rounded-full px-5 text-lg"
                    style={{
                      borderColor: Colors.light.DarkGreen,
                      borderWidth: 1,
                      height: vs(52),
                    }}
                  />

                  <TouchableOpacity
                   activeOpacity={1}
                    onPress={handleSend}
                    className="ml-2  px-3 justify-center rounded-full"
                  >
                    <Send height={30} width={30} />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>
      </View>
      <Loading
        isLoading={loadingRecivedDelet || isLoading}
        text="Deleting ..."
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
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
    fontSize: ms(16),
    fontWeight: "500",
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },

  city: {
    fontSize: ms(12),
    color: "#666",
    marginTop: 2,
    fontFamily: "PopinRegula",
  },
  card: {
    marginVertical: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  topRow: {
    marginTop: vs(10),
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },

  subTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.DarkGreen,
    fontFamily: "PopinRegula",
  },

  address: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
    fontFamily: "PopinRegula",
  },

  date: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 6,
  },

  tag: {
    backgroundColor: Colors.light.DarkGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  message: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    fontFamily: "PopinRegula",
  },
  senderBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: vs(5),
    paddingBottom: vs(10),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  senderName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },
  seeMore: {
    color: Colors.light.DarkGreen,
    marginTop: 4,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
  senderInfo: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: "PopinRegula",
  },
  closedBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#ffe5e5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  closedText: {
    color: Colors.light.red,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  replyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: Colors.light.DarkGreen,
    paddingVertical: vs(8),
    paddingHorizontal: hs(16),
    borderRadius: 8,
    marginTop: vs(10),
    alignSelf: "flex-end",
  },

  replyBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
});
