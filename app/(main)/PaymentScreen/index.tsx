import {
  useCaptureAlfalahPaymentMutation,
  useCaptureEasypaisaPaymentMutation,
  usePaybyAlfalahMutation,
  usePaybyEasypaisaMutation,
} from "@/store/api/user/MainApi";

import { userdata } from "@/store/slices/selector/user";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import {
  renderToastError,
  renderToastSuccess,
} from "@src/hooks/useToasty";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";

import WebView from "react-native-webview";

const PaymentScreen = () => {
  const captureCalled = useRef(false);

  const webViewRef =
    useRef<WebView>(null);

  const user =
    useAppSelector(userdata);

  const {
    amount,
    type,
    profileType,
    upgrdeId,
    upgradeId,
    upgrade_amount,
    provider,
  } = useLocalSearchParams();

  /* =====================================
     PARAMS
  ====================================== */

  const selectedAmount = Number(
    Array.isArray(amount)
      ? amount[0]
      : amount
  );

  const finalUpgradeType =
    Array.isArray(type)
      ? type[0]
      : String(type || "");

  const finalProfileType =
    Array.isArray(profileType)
      ? profileType[0]
      : String(profileType || "");

  const finalUpgradeId = Number(
    Array.isArray(upgradeId)
      ? upgradeId[0]
      : upgradeId ||
          (
            Array.isArray(upgrdeId)
              ? upgrdeId[0]
              : upgrdeId
          ) ||
          0
  );

  const finalUpgradeAmount = Number(
    Array.isArray(upgrade_amount)
      ? upgrade_amount[0]
      : upgrade_amount ||
          selectedAmount ||
          0
  );

  const finalProvider =
    Array.isArray(provider)
      ? provider[0]
      : String(
          provider || "alfalah"
        ).toLowerCase();

  const isEasypaisa =
    finalProvider === "easypaisa";

  /* =====================================
     BANK ALFALAH
  ====================================== */

  const [
    createAlfalahOrder,
    {
      isLoading:
        isCreatingAlfalah,
    },
  ] =
    usePaybyAlfalahMutation();

  const [
    captureAlfalahPayment,
    {
      isLoading:
        isCapturingAlfalah,
    },
  ] =
    useCaptureAlfalahPaymentMutation();

  /* =====================================
     EASYPAISA
  ====================================== */

  const [
    createEasypaisaOrder,
    {
      isLoading:
        isCreatingEasypaisa,
    },
  ] =
    usePaybyEasypaisaMutation();

  const [
    captureEasypaisaPayment,
    {
      isLoading:
        isCapturingEasypaisa,
    },
  ] =
    useCaptureEasypaisaPaymentMutation();

  /* =====================================
     STATE
  ====================================== */

  const [
    approveUrl,
    setApproveUrl,
  ] =
    useState<string | null>(
      null
    );

  const [
    paymentOrderId,
    setPaymentOrderId,
  ] =
    useState<string>("");

  const isCreating =
    isCreatingAlfalah ||
    isCreatingEasypaisa;

  const isCapturing =
    isCapturingAlfalah ||
    isCapturingEasypaisa;

  /* =====================================
     START PAYMENT
  ====================================== */

  useEffect(() => {
    if (
      Number.isNaN(
        selectedAmount
      ) ||
      selectedAmount <= 0
    ) {
      renderToastError(
        "Invalid payment amount"
      );

      router.back();

      return;
    }

    handlePay();
  }, []);

  const handlePay =
    async () => {
      try {
        console.log(
          "PAYMENT PROVIDER:",
          finalProvider
        );

        console.log(
          "PAYMENT AMOUNT:",
          selectedAmount
        );

        let response: any;

        /*
         * ==============================
         * EASYPAISA
         * ==============================
         */

        if (isEasypaisa) {
          response =
            await createEasypaisaOrder(
              {
                amount:
                  selectedAmount,

                email:
                  user?.email ||
                  undefined,

                mobile:
                  user?.phone ||
                  user?.mobile ||
                  undefined,
              }
            ).unwrap();
        }

        /*
         * ==============================
         * BANK ALFALAH
         * ==============================
         */

        else {
          response =
            await createAlfalahOrder(
              {
                amount:
                  selectedAmount,
              }
            ).unwrap();
        }

        console.log(
          "CREATE PAYMENT RESPONSE:",
          response
        );

        const url =
          response?.approve_link;

        const orderId =
          response?.order_id ||
          response?.id ||
          "";

        if (!url) {
          throw new Error(
            "Payment approval URL missing"
          );
        }

        if (!orderId) {
          throw new Error(
            "Payment Order ID missing"
          );
        }

        /*
         * PayPal mein token URL se
         * milta tha.
         *
         * Alfalah/Easypaisa mein
         * backend response ka order_id
         * save kar rahe hain.
         */

        setPaymentOrderId(
          String(orderId)
        );

        setApproveUrl(
          String(url)
        );
      } catch (error: any) {
        console.log(
          "CREATE PAYMENT ERROR:",
          error
        );

        console.log(
          "CREATE PAYMENT ERROR DATA:",
          error?.data
        );

        renderToastError(
          error?.data?.message ||
            error?.data?.error ||
            error?.message ||
            `Unable to start ${
              isEasypaisa
                ? "Easypaisa"
                : "Bank Alfalah"
            } payment`
        );
      }
    };

  /* =====================================
     CAPTURE PAYMENT

     Same flow as old PayPal:
     success -> capture -> DB -> wallet
  ====================================== */

  const completePayment =
    async (
      orderId?: string
    ) => {
      if (
        captureCalled.current
      ) {
        console.log(
          "CAPTURE ALREADY CALLED"
        );

        return;
      }

      captureCalled.current =
        true;

      try {
        const finalOrderId =
          String(
            orderId ||
              paymentOrderId ||
              ""
          );

        if (!finalOrderId) {
          throw new Error(
            "Payment Order ID missing"
          );
        }

        const payload = {
          order_id:
            finalOrderId,

          user_id:
            Number(user.id),

          upgrade_type:
            finalUpgradeType,

          profile_type:
            finalProfileType,

          upgrade_id:
            finalUpgradeId,

          upgrade_amount:
            finalUpgradeAmount,
        };

        console.log(
          "================================"
        );

        console.log(
          "CAPTURE PROVIDER:",
          finalProvider
        );

        console.log(
          "CAPTURE PAYLOAD:",
          payload
        );

        console.log(
          "================================"
        );

        let result: any;

        /*
         * ==============================
         * EASYPAISA CAPTURE
         * ==============================
         */

        if (isEasypaisa) {
          result =
            await captureEasypaisaPayment(
              payload
            ).unwrap();
        }

        /*
         * ==============================
         * BANK ALFALAH CAPTURE
         * ==============================
         */

        else {
          result =
            await captureAlfalahPayment(
              payload
            ).unwrap();
        }

        console.log(
          "CAPTURE RESULT:",
          result
        );

        if (
          result?.success === false
        ) {
          throw new Error(
            result?.message ||
              "Payment verification failed"
          );
        }

        /*
         * Capture successful.
         *
         * Backend ab payment table /
         * wallet / profile / post ka
         * existing business logic karega.
         */

        setApproveUrl(null);

        renderToastSuccess(
          result?.message ||
            "Payment completed successfully"
        );

        router.back();
      } catch (error: any) {
        console.log(
          "CAPTURE ERROR:",
          error
        );

        console.log(
          "CAPTURE ERROR DATA:",
          error?.data
        );

        captureCalled.current =
          false;

        renderToastError(
          error?.data?.message ||
            error?.data?.error ||
            error?.message ||
            "Failed to verify payment"
        );
      }
    };

  /* =====================================
     WEBVIEW RESULT
  ====================================== */

  const handleWebViewMessage =
    async (
      event: any
    ) => {
      try {
        const message =
          JSON.parse(
            event.nativeEvent.data
          );

        console.log(
          "WEBVIEW MESSAGE:",
          message
        );
if (
  message?.type ===
  "BANK_PAYMENT_SUCCESS"
) {
  const orderId =
    String(
      message?.orderId ||
        paymentOrderId ||
        ""
    );

  console.log(
    "BANK PAYMENT SUCCESS:",
    orderId
  );

  await completePayment(
    orderId
  );

  return;
}
        if (
          message?.type !==
          "PAYMENT_RESULT"
        ) {
          return;
        }

        /*
         * ==============================
         * SUCCESS
         * ==============================
         */

        if (
          message?.status ===
          "success"
        ) {
          const orderId =
            String(
              message?.orderId ||
                paymentOrderId ||
                ""
            );

          console.log(
            "PAYMENT SUCCESS ORDER:",
            orderId
          );

          await completePayment(
            orderId
          );

          return;
        }

        /*
         * ==============================
         * FAILED
         * ==============================
         */

        if (
          message?.status ===
          "failed"
        ) {
          captureCalled.current =
            false;

          setApproveUrl(null);

          renderToastError(
            "Payment was not completed"
          );

          router.back();
        }
      } catch (error) {
        console.log(
          "WEBVIEW MESSAGE ERROR:",
          error
        );
      }
    };

  /* =====================================
     NAVIGATION
  ====================================== */

const handleNavigationChange =
  async (navState: any) => {
    const url =
      String(navState?.url || "");

    console.log(
      "PAYMENT NAVIGATION:",
      url
    );

    if (
      captureCalled.current
    ) {
      return;
    }

    /*
     * BANK ALFALAH SUCCESS
     *
     * Same detection jo working
     * AlfalahPayment component mein hai.
     */
    if (!isEasypaisa) {
      const directSuccess =
        url.includes(
          "/SuccessPayment/00"
        );

      const querySuccess =
        url.includes("RC=00") &&
        url.includes("TS=P");

      if (
        directSuccess ||
        querySuccess
      ) {
        let detectedOrderId:
          string | null = null;

        try {
          const parsed =
            new URL(url);

          detectedOrderId =
            parsed.searchParams.get(
              "O"
            );
        } catch (error) {
          console.log(
            "Unable to parse Alfalah URL:",
            error
          );
        }

        console.log(
          "BANK SUCCESS DETECTED"
        );

        console.log(
          "ORDER:",
          detectedOrderId ||
            paymentOrderId
        );

        await completePayment(
          detectedOrderId ||
            paymentOrderId
        );

        return;
      }
    }

    /*
     * Cancel
     */
    if (
      url
        .toLowerCase()
        .includes("cancel")
    ) {
      captureCalled.current =
        false;

      setApproveUrl(null);

      renderToastError(
        "Payment cancelled"
      );

      router.back();
    }
  };

  /* =====================================
     RESULT CHECK

     Backend final return page should have:

     id="payment-result"
     data-status="success|failed"
     data-order-id="..."
  ====================================== */

const checkPaymentResult = `
  (function () {
    try {

      var url =
        window.location.href || '';

      var body =
        document.body
          ? document.body.innerText
          : '';

      var upperBody =
        body.toUpperCase();

      /*
       * ==========================
       * OUR LARAVEL RESULT PAGE
       * ==========================
       */

      var result =
        document.getElementById(
          'payment-result'
        );

      if (result) {

        window.ReactNativeWebView
          .postMessage(
            JSON.stringify({
              type:
                'PAYMENT_RESULT',

              status:
                result.getAttribute(
                  'data-status'
                ),

              orderId:
                result.getAttribute(
                  'data-order-id'
                )
            })
          );

        return;
      }

      /*
       * ==========================
       * BANK ALFALAH SUCCESS PAGE
       * ==========================
       */

      var bankSuccess =
        url.indexOf(
          '/SuccessPayment/00'
        ) !== -1
        ||
        (
          url.indexOf(
            'RC=00'
          ) !== -1
          &&
          url.indexOf(
            'TS=P'
          ) !== -1
        )
        ||
        upperBody.indexOf(
          'TRANSACTION SUCCESSFUL'
        ) !== -1
        ||
        upperBody.indexOf(
          'PAYMENT HAS BEEN SUCCESSFULLY PAID'
        ) !== -1;

      if (bankSuccess) {

        var detectedOrderId =
          null;

        try {
          var parsedUrl =
            new URL(url);

          detectedOrderId =
            parsedUrl
              .searchParams
              .get('O');
        } catch (e) {}

        window.ReactNativeWebView
          .postMessage(
            JSON.stringify({
              type:
                'BANK_PAYMENT_SUCCESS',

              orderId:
                detectedOrderId
            })
          );

        return;
      }

    } catch (error) {

      window.ReactNativeWebView
        .postMessage(
          JSON.stringify({
            type:
              'PAYMENT_DEBUG_ERROR',

            error:
              String(error)
          })
        );
    }
  })();

  true;
`;

  /* =====================================
     UI
  ====================================== */

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          "white",
      }}
    >
      <HeaderWithBack
        title={
          isEasypaisa
            ? "Easypaisa Payment"
            : "Card Payment"
        }
      />

      {isCreating ||
      isCapturing ? (
        <View
          style={{
            flex: 1,
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={
              isEasypaisa
                ? "#6DBE45"
                : "#D71920"
            }
          />

          <Text
            style={{
              marginTop: 12,
            }}
          >
            {isCapturing
              ? "Verifying payment..."
              : "Opening secure payment..."}
          </Text>
        </View>
      ) : approveUrl ? (
       <WebView
  ref={webViewRef}
  source={{
    uri: approveUrl,
  }}
  style={{
    flex: 1,
    backgroundColor: "#fff",
  }}
  onNavigationStateChange={handleNavigationChange}
  onMessage={handleWebViewMessage}

  onLoadStart={(event) => {
    console.log(
      "WEBVIEW LOAD START:",
      event.nativeEvent.url
    );
  }}

  onLoadEnd={(event) => {
    console.log(
      "WEBVIEW LOAD END:",
      event.nativeEvent.url
    );

    webViewRef.current?.injectJavaScript(
      checkPaymentResult
    );
  }}

  onError={(event) => {
    console.log(
      "PAYMENT WEBVIEW ERROR:",
      event.nativeEvent
    );
  }}

  onHttpError={(event) => {
    console.log(
      "PAYMENT HTTP ERROR:",
      event.nativeEvent
    );
  }}

  startInLoadingState

  renderLoading={() => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator
        size="large"
        color={
          isEasypaisa
            ? "#6DBE45"
            : "#D71920"
        }
      />
    </View>
  )}

  javaScriptEnabled={true}
  domStorageEnabled={true}

  // IMPORTANT FOR EASYPAISA
  javaScriptCanOpenWindowsAutomatically={true}
  setSupportMultipleWindows={false}

  // Payment gateway resources/cookies
  thirdPartyCookiesEnabled={true}
  sharedCookiesEnabled={true}
  mixedContentMode="always"

  // Avoid stale gateway/session page
  cacheEnabled={false}

  originWhitelist={["*"]}

  // Android rendering
  androidLayerType="hardware"
/>
      ) : null}
    </View>
  );
};

export default PaymentScreen;