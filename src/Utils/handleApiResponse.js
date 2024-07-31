import { showNotification } from "../Redux/Slices/notificationSlice";

export const handleApiResponse = async (dispatch, apiCall, data) => {
    try {
        const res = await dispatch(apiCall(data));
        const { status, message, Message, Status, STATUS, MESSAGE, SUCCESS } =
            res?.payload || res[0].payload; // Adjust as needed

        console.log(res, STATUS, MESSAGE, "Notifications");

        const isSuccess =
            SUCCESS.toUpperCase() === "TRUE" ||
            STATUS ||
            Status ||
            (status && status.toLowerCase() === "success") ||
            (Status && Status.toUpperCase() === "SUCCESS") ||
            res.payload[0].Status;
        const notificationMessage =
            message ||
            Message ||
            MESSAGE ||
            res.payload[0].Message ||
            "Data Saved Succesfully";
        // const isSuccess = (status && status.toLowerCase() === 'success')||STATUS||Status|| (Status && Status.toUpperCase() === 'SUCCE
        // const notificationMessage = message ||MESSAGE|| Message||res.payload[0].Message || 'Data Saved Succesfully';
        if (res.error) {
            console.log(res, "Notifications"); // Log error message if present

            // Dispatch an error notification
            return dispatch(
                showNotification({
                    severity: "error",
                    message:
                        res.error.message || "An unexpected error occurred.",
                })
            );

            // Throw the error to handle it further if needed
            // throw new Error(res.error.message || 'An unexpected error occurred.');
        }

        dispatch(
            showNotification({
                severity: isSuccess ? "success" : "error",
                message: notificationMessage,
            })
        );
    } catch (error) {
        // console.log(error.toString())
        dispatch(
            showNotification({
                severity: "error",
                message: "An unexpected error occurred.",
            })
        );
    }
};
// import { showNotification } from "../store/features/SnackNotification/SnackNoftification";

// export const handleApiResponse = async (dispatch, apiCall, data) => {
//   try {
//     const res = await dispatch(apiCall(data));
//     const { status, message, Message, Status,MESSAGE,STATUS } = res.payload; // Adjust as needed

//     console.log(res.payload[0].Message, Status, Message, "Notifications");

//     const isSuccess = (status && status.toLowerCase() === 'success')||STATUS||Status|| (Status && Status.toUpperCase() === 'SUCCESS')||res.payload[0].Status;
//     const notificationMessage = message ||MESSAGE|| Message||res.payload[0].Message || 'Data Saved Succesfully';

//     dispatch(showNotification({
//       severity: isSuccess ? 'success' : 'error',
//       message: notificationMessage
//     }));
//   } catch (error) {
//     console.log(error)
//     dispatch(showNotification({
//       severity: 'error',
//       message: 'An unexpected error occurred.'
//     }));
//   }
// };
