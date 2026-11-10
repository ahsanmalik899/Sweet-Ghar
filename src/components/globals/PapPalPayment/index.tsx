import { usePaybyAlfalahMutation } from "@/store/api/user/MainApi";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { renderToastError } from "@src/hooks/useToasty";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

interface AlfalahPaymentProps {
  visible: boolean;

  onPress: (
    order_id: string,
    setApproveUrl: (value: string | null) => void
  ) => void | Promise<void>;

  amount: string | number;

  type?: string;
  profileType?: string;
  upgrdeId?: number;
  upgrade_amount?: number;

  setVisible: (value: boolean) => void;
}

const AlfalahPayment = ({
  visible,
  onPress,
  amount,
  setVisible,
}: AlfalahPaymentProps) => {
  const webViewRef = useRef<WebView>(null);

  /**
   * Prevent multiple success callbacks.
   *
   * Bank Alfalah redirects through multiple pages after payment,
   * so without this ref onPress() can be called multiple times.
   */
  const paymentHandled = useRef(false);

  const [createOrder, { isLoading: isCreating }] =
    usePaybyAlfalahMutation();

  const [approveUrl, setApproveUrl] =
    useState<string | null>(null);

  const [orderId, setOrderId] =
    useState<string | null>(null);

  const selectedAmount = Number(amount);

  useEffect(() => {
    if (!visible) {
      return;
    }

    paymentHandled.current = false;

    setApproveUrl(null);
    setOrderId(null);

    if (
      Number.isNaN(selectedAmount) ||
      selectedAmount <= 0
    ) {
      renderToastError(
        "Invalid payment amount"
      );

      setVisible(false);
      return;
    }

    handlePay();
  }, [visible]);

  /**
   * --------------------------------------------------------
   * Create Bank Alfalah order
   * --------------------------------------------------------
   */
  const handlePay = async () => {
    try {
      const response = await createOrder({
        amount: selectedAmount,
      }).unwrap();

      console.log(
        "Bank Alfalah create order response:",
        response
      );

      const {
        approve_link,
        order_id,
      } = response;

      if (
        !approve_link ||
        !order_id
      ) {
        Alert.alert(
          "Payment Error",
          "Unable to start Bank Alfalah payment."
        );

        setVisible(false);
        return;
      }

      const newOrderId =
        String(order_id);

      console.log(
        "Bank Alfalah Order ID:",
        newOrderId
      );

      setOrderId(newOrderId);

      setApproveUrl(
        String(approve_link)
      );
    } catch (error: any) {
      console.log(
        "Bank Alfalah payment creation error:",
        error
      );

      const message =
        error?.data?.message ||
        error?.data?.error ||
        "Could not initiate payment. Please try again.";

      Alert.alert(
        "Payment Error",
        message
      );

      setVisible(false);
    }
  };

  /**
   * --------------------------------------------------------
   * Successful Bank Alfalah payment
   * --------------------------------------------------------
   *
   * Important:
   *
   * This only tells parent that Bank showed a successful
   * payment page.
   *
   * Parent will later call capturePayment().
   *
   * capturePayment() checks Bank Alfalah OrderStatus API,
   * so we do NOT trust WebView alone for financial status.
   */
  const handlePaymentSuccess =
    async (
      bankOrderId?: string | null
    ) => {
      if (
        paymentHandled.current
      ) {
        return;
      }

      const successfulOrderId =
        bankOrderId ||
        orderId;

      if (!successfulOrderId) {
        console.log(
          "Bank Alfalah success detected but order ID missing"
        );

        renderToastError(
          "Payment completed but Order ID is missing."
        );

        return;
      }

      paymentHandled.current = true;

      console.log(
        "================================"
      );

      console.log(
        "BANK ALFALAH PAYMENT SUCCESS"
      );

      console.log(
        "Order ID:",
        successfulOrderId
      );

      console.log(
        "================================"
      );

      /**
       * Stop WebView.
       */
      webViewRef.current?.stopLoading();

      /**
       * Remove payment URL.
       */
      setApproveUrl(null);

      /**
       * Close modal.
       */
      setVisible(false);

      try {
        /**
         * Parent:
         *
         * 1. Saves order_id in Formik
         * 2. Calls handleSubmit()
         * 3. Posts property
         * 4. Calls capturePayment()
         */
        await onPress(
          String(successfulOrderId),
          setApproveUrl
        );
      } catch (error) {
        console.log(
          "Alfalah onPress callback error:",
          error
        );

        renderToastError(
          "Payment succeeded but we could not continue. Please contact support."
        );
      }
    };

  /**
   * --------------------------------------------------------
   * Failed payment
   * --------------------------------------------------------
   */
  const handlePaymentFailed =
    (
      message =
        "Bank Alfalah payment was not completed."
    ) => {
      if (
        paymentHandled.current
      ) {
        return;
      }

      paymentHandled.current = true;

      webViewRef.current?.stopLoading();

      setApproveUrl(null);
      setOrderId(null);
      setVisible(false);

      Alert.alert(
        "Payment Failed",
        message
      );
    };

  /**
   * --------------------------------------------------------
   * Inject JS into WebView
   * --------------------------------------------------------
   *
   * Bank Alfalah success page currently returns something like:
   *
   * /Payments/Payments/SuccessPayment/00
   *
   * BODY:
   *
   * TRANSACTION SUCCESSFUL
   * payment has been successfully paid...
   *
   */
  const handleLoadEnd = () => {
    webViewRef.current?.injectJavaScript(`
      (function () {
        try {

          var url =
            window.location.href || '';

          var title =
            document.title || '';

          var body =
            document.body
              ? document.body.innerText
              : '';

          var upperBody =
            body.toUpperCase();

          /**
           * ---------------------------------------
           * Our Laravel verified result page
           * ---------------------------------------
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
                    'ALFALAH_PAYMENT_RESULT',

                  status:
                    result.getAttribute(
                      'data-status'
                    ),

                  order_id:
                    result.getAttribute(
                      'data-order-id'
                    )
                })
              );

            return;
          }


          /**
           * ---------------------------------------
           * Bank Alfalah SUCCESS
           * ---------------------------------------
           */
          var bankSuccess =
            url.indexOf(
              '/SuccessPayment/00'
            ) !== -1
            ||
            (
              url.indexOf('RC=00') !== -1
              &&
              url.indexOf('TS=P') !== -1
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

            /**
             * Try to extract Bank order
             * reference from query O=
             */
            var detectedOrderId = null;

            try {

              var parsedUrl =
                new URL(url);

              detectedOrderId =
                parsedUrl.searchParams
                  .get('O');

            } catch (e) {}

            window.ReactNativeWebView
              .postMessage(
                JSON.stringify({
                  type:
                    'ALFALAH_BANK_SUCCESS',

                  order_id:
                    detectedOrderId,

                  url: url
                })
              );

            return;
          }


          /**
           * ---------------------------------------
           * Bank Alfalah failed page
           * ---------------------------------------
           */
          var bankFailed =
            upperBody.indexOf(
              'TRANSACTION FAILED'
            ) !== -1
            ||
            upperBody.indexOf(
              'PAYMENT FAILED'
            ) !== -1
            ||
            url.indexOf(
              'TS=F'
            ) !== -1;


          if (bankFailed) {

            window.ReactNativeWebView
              .postMessage(
                JSON.stringify({
                  type:
                    'ALFALAH_BANK_FAILED',

                  url: url
                })
              );

            return;
          }


          /**
           * ---------------------------------------
           * Debug
           * ---------------------------------------
           *
           * Do not send entire HTML because Bank
           * page contains huge base64 images.
           */
          window.ReactNativeWebView
            .postMessage(
              JSON.stringify({
                type:
                  'ALFALAH_DEBUG',

                url: url,

                title: title,

                body:
                  body.substring(
                    0,
                    1500
                  )
              })
            );

        } catch (error) {

          window.ReactNativeWebView
            .postMessage(
              JSON.stringify({
                type:
                  'ALFALAH_DEBUG_ERROR',

                error:
                  String(error)
              })
            );
        }

        true;
      })();
    `);
  };

  /**
   * --------------------------------------------------------
   * Receive message from WebView
   * --------------------------------------------------------
   */
  const handleMessage =
    async (event: any) => {
      try {
        const data =
          JSON.parse(
            event.nativeEvent.data
          );

        console.log(
          "Bank Alfalah WebView MESSAGE:",
          data
        );

        /**
         * Bank payment success page.
         */
        if (
          data?.type ===
          "ALFALAH_BANK_SUCCESS"
        ) {
          await handlePaymentSuccess(
            data?.order_id ||
            orderId
          );

          return;
        }

        /**
         * Laravel verified success page.
         */
        if (
          data?.type ===
          "ALFALAH_PAYMENT_RESULT"
        ) {
          if (
            data?.status ===
            "success"
          ) {
            await handlePaymentSuccess(
              data?.order_id ||
              orderId
            );

            return;
          }

          if (
            data?.status ===
            "failed"
          ) {
            handlePaymentFailed();
            return;
          }
        }

        /**
         * Bank explicitly failed.
         */
        if (
          data?.type ===
          "ALFALAH_BANK_FAILED"
        ) {
          handlePaymentFailed();
          return;
        }

        /**
         * Debug
         */
        if (
          data?.type ===
          "ALFALAH_DEBUG"
        ) {
          console.log(
            "========== ALFALAH DEBUG =========="
          );

          console.log(
            "URL:",
            data.url
          );

          console.log(
            "TITLE:",
            data.title
          );

          console.log(
            "BODY:",
            data.body
          );

          console.log(
            "==================================="
          );

          return;
        }

        if (
          data?.type ===
          "ALFALAH_DEBUG_ERROR"
        ) {
          console.log(
            "Bank Alfalah injected JS error:",
            data.error
          );

          return;
        }

      } catch (error) {
        console.log(
          "Bank Alfalah WebView message error:",
          error,
          event.nativeEvent.data
        );
      }
    };

  /**
   * --------------------------------------------------------
   * Navigation listener
   * --------------------------------------------------------
   *
   * Extra fallback.
   *
   * We can detect:
   *
   * RC=00
   * TS=P
   *
   * But capturePayment() still does final
   * server-side verification.
   */
  const handleNavigationChange =
    async (
      navState: any
    ) => {
      const url =
        navState?.url || "";

      console.log(
        "Bank Alfalah WebView URL:",
        url
      );

      if (
        paymentHandled.current
      ) {
        return;
      }

      /**
       * Bank successful payment route.
       */
      const directSuccess =
        url.includes(
          "/SuccessPayment/00"
        );

      /**
       * Bank query result:
       *
       * RC=00 = success code
       * TS=P  = Paid
       */
      const querySuccess =
        url.includes(
          "RC=00"
        )
        &&
        url.includes(
          "TS=P"
        );

      if (
        directSuccess ||
        querySuccess
      ) {
        let bankOrderId:
          string | null = null;

        try {
          const parsed =
            new URL(url);

          bankOrderId =
            parsed.searchParams
              .get("O");

        } catch (error) {
          console.log(
            "Unable to parse Alfalah URL:",
            error
          );
        }

        await handlePaymentSuccess(
          bankOrderId ||
          orderId
        );
      }
    };

  /**
   * --------------------------------------------------------
   * User closes modal
   * --------------------------------------------------------
   */
  const handleClose = () => {
    webViewRef.current?.stopLoading();

    paymentHandled.current =
      false;

    setApproveUrl(null);
    setOrderId(null);

    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
        edges={[
          "bottom",
          "left",
          "right",
        ]}
      >
        <HeaderWithBack
          title="Bank Alfalah Payment"
          onBackpress={handleClose}
        />

        {isCreating ? (
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
              color="#D71920"
            />
          </View>
        ) : approveUrl ? (
          <WebView
            ref={webViewRef}

            source={{
              uri: approveUrl,
            }}

            style={{
              flex: 1,
            }}

            onNavigationStateChange={
              handleNavigationChange
            }

            onMessage={
              handleMessage
            }

            onLoadEnd={
              handleLoadEnd
            }

            onError={(event) => {
              console.log(
                "ALFALAH WEBVIEW ERROR:",
                event.nativeEvent
              );
            }}

            onHttpError={(event) => {
              console.log(
                "ALFALAH HTTP ERROR:",
                event.nativeEvent
                  .statusCode,
                event.nativeEvent
                  .description,
                event.nativeEvent.url
              );
            }}

            onLoadStart={(event) => {
              console.log(
                "ALFALAH LOAD START:",
                event.nativeEvent
                  .url
              );
            }}

            startInLoadingState

            javaScriptEnabled

            domStorageEnabled

            thirdPartyCookiesEnabled

            sharedCookiesEnabled

            originWhitelist={[
              "*",
            ]}
          />
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};

export default AlfalahPayment;