import api from "@/config/api";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
} from "./ActionTypes";

export const createPayment = ({ planType, jwt }) => async (dispatch) => {
  console.log("Creating payment with data: ", jwt, planType);
  try {
    dispatch({ type: CREATE_PAYMENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };

    // Ensure to send any necessary data in the body
    const { data } = await api.post(
      `/api/payments/${planType}`,
      { /* Add any necessary request body data here */ },
      config
    );

    console.log("Payment data received:", data);
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url; // Redirect to payment link
    }

    dispatch({
      type: CREATE_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Payment error:", error); // Improved error logging
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
