import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";
import { selectAuthClientId } from "./AuthSlice";

// Define async thunk to fetch ratings and options
export const fetchFeedbackQuestions = createAsyncThunk(
    "feedback/fetchFeedbackQuestions",
    async (_, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post(
                "/CRM_Get_FeedBack_Details",
                {
                    DATA: {
                        client_id: ClientID,
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchUpdateFeedbackAnswers = createAsyncThunk(
    "feedback/FeedBackValues",
    async (data, { dispatch }) => {
        try {
            const response = await axiosInstance.post("/FeedBackValues", {
                DATA: {
                    RATINGS: data,
                },
            });
            dispatch(fetchFeedbackQuestions());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const initialState = {
    feedbackQuestions: [],
    loadingFeedbackQuestions: false,
    feedbackQuestionsMessage: "",
    feedbackQuestionsStatus: false,

    loadingFeedbackUpdate: false,
    FeedbackUpdateMessage: "",
    FeedbackUpdateStatus: false,
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        resetFeedback: (state) => {
            state.feedbackQuestions = [];
            state.loadingFeedbackQuestions = false;
            state.feedbackQuestionsMessage = "";
            state.feedbackQuestionsStatus = false;
        
            state.loadingFeedbackUpdate = false;
            state.FeedbackUpdateMessage = "";
            state.FeedbackUpdateStatus = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbackQuestions.pending, (state) => {
                state.loadingFeedbackQuestions = true;
            })
            .addCase(fetchFeedbackQuestions.fulfilled, (state, action) => {
                state.loadingFeedbackQuestions = false;
                state.feedbackQuestions = action.payload?.DATA || [];
                state.feedbackQuestionsMessage = action.payload?.MESSAGE || "";
                state.feedbackQuestionsStatus =
                    action.payload?.SUCCESS || false;
            })
            .addCase(fetchFeedbackQuestions.rejected, (state, action) => {
                state.loadingFeedbackQuestions = false;
                state.feedbackQuestionsMessage = action.payload?.MESSAGE || "";
                state.feedbackQuestionsStatus =
                    action.payload?.SUCCESS || false;
            })
            .addCase(fetchUpdateFeedbackAnswers.pending, (state) => {
                state.loadingFeedbackUpdate = true;
            })
            .addCase(fetchUpdateFeedbackAnswers.fulfilled, (state, action) => {
                state.loadingFeedbackUpdate = false;
                state.FeedbackUpdateMessage = action.payload?.MESSAGE || "";
                state.FeedbackUpdateStatus = action.payload?.SUCCESS || false;
                state.feedbackQuestions = [];
                state.loadingFeedbackQuestions = false;
                state.feedbackQuestionsMessage = "";
                state.feedbackQuestionsStatus = false;
            
                state.loadingFeedbackUpdate = false;
                state.FeedbackUpdateMessage = "";
                state.FeedbackUpdateStatus = false;
            })
            .addCase(fetchUpdateFeedbackAnswers.rejected, (state, action) => {
                state.loadingFeedbackUpdate = false;
                state.FeedbackUpdateMessage = action.payload?.MESSAGE || "";
                state.FeedbackUpdateStatus = action.payload?.SUCCESS || false;
            });
    },
});

export const {resetFeedback} = feedbackSlice.actions;

export default feedbackSlice.reducer;
