import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@src/constants/Colors";
import { ms, vs } from "@utils/design/design";
import { formatPrice } from "@utils/PriceFormater";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


interface PromotionPricingCardProps {
  promotionPrices?: {
    data?: {
      price: number;
      life?: number;
    };

  };
  
    setSelectedtimeprd?:any;
    setprice?:any;
    setfieldvalue?:any;
}

export default function PromotionPricingCard({
  promotionPrices,
  setSelectedtimeprd,
  setprice,
  setfieldvalue
}: PromotionPricingCardProps) {
  const pricePerDay = promotionPrices?.data?.price ?? 0;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(tomorrow);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
const FormatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

  const diffMs = endDate.getTime() - startDate.getTime();
  const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const totalPrice = days * pricePerDay;
const minStartDate = new Date();
minStartDate.setDate(minStartDate.getDate() + 3);

  useEffect(() => {
    setSelectedtimeprd?.(days);
setfieldvalue?.('ad_life',days);
  }, [days]);
  useEffect(() => {
    setprice?.(totalPrice);
  }, [totalPrice]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Promotion Pricing</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PKR{pricePerDay}/day</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Date Selection */}
      <Text style={styles.sectionLabel}>Select Promotion Period</Text>

      <View style={styles.dateRow}>
        {/* Start Date */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowStartPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
          <Text style={styles.dateIcon}>📅</Text>
        </TouchableOpacity>

        <View style={styles.arrowBox}>
          <Text style={styles.arrow}>→</Text>
        </View>

        {/* End Date */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowEndPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateLabel}>End Date</Text>
          <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
          <Text style={styles.dateIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          minimumDate={minStartDate}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) {
              setStartDate(date);
              setfieldvalue?.("start_date",FormatDate(date));
              if (date >= endDate) {
                const next = new Date(date);
                next.setDate(date.getDate() + 1);
                setEndDate(next);
                setfieldvalue?.("end_date",FormatDate(next));
              }
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          minimumDate={(() => {
            const min = new Date(startDate);
            min.setDate(startDate.getDate() + 1);
            return min;
          })()}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) {setEndDate(date);
             setfieldvalue?.("end_date",FormatDate(date));
            }
          }}
        />
      )}

      <View style={styles.divider} />

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Duration</Text>
          <Text style={styles.summaryValue}>{days} day{days > 1 ? "s" : ""}</Text>
        </View>
        <View style={styles.summaryDividerV} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Rate</Text>
          <Text style={styles.summaryValue}>PKR{formatPrice(pricePerDay)}/day</Text>
        </View>
        <View style={styles.summaryDividerV} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={[styles.summaryValue, styles.totalPrice]}>
            PKR {formatPrice(totalPrice)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: ms(16),
    padding: ms(16),
    marginVertical: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(10),
  },
  headerTitle: {
    fontFamily: "PopinSemiBold",
    fontSize: ms(16),
    color: "#1A1A2E",
  },
  badge: {
    backgroundColor: Colors.light.LightGreen,
    paddingHorizontal: ms(10),
    paddingVertical: vs(4),
    borderRadius: ms(20),
  },
  badgeText: {
    fontFamily: "PopinSemiBold",
    fontSize: ms(12),
    color:Colors.light.red,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: vs(10),
  },
  sectionLabel: {
    fontFamily: "PopinRegula",
    fontSize: ms(13),
    color: "#6B7280",
    marginBottom: vs(10),
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  dateBox: {
    flex: 1,
    backgroundColor:Colors.light.LightGreen,
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: Colors.light.DarkGreen,
    padding: ms(12),
    alignItems: "center",
  },
  dateLabel: {
    fontFamily: "PopinRegula",
    fontSize: ms(11),
    color: "#9CA3AF",
    marginBottom: vs(4),
  },
  dateValue: {
    fontFamily: "PopinSemiBold",
    fontSize: ms(13),
    color: "#111827",
  },
  dateIcon: {
    fontSize: ms(16),
    marginTop: vs(4),
  },
  arrowBox: {
    width: ms(28),
    alignItems: "center",
  },
  arrow: {
    fontSize: ms(18),
    color:Colors.light.red,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.light.LightGreen,
    borderRadius: ms(12),
    paddingVertical: vs(12),
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDividerV: {
    width: 1,
    height: vs(30),
    backgroundColor: "#E5E7EB",
  },
  summaryLabel: {
    fontFamily: "PopinRegula",
    fontSize: ms(11),
    color: "#6B7280",
    marginBottom: vs(4),
  },
  summaryValue: {
    fontFamily: "PopinSemiBold",
    fontSize: ms(15),
    color:"black",
  },
  totalPrice: {
    color: Colors.light.red,
    fontSize: ms(17),
  },
});