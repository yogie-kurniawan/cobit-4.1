import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../../features/admin/questionSlice";
import domainReducer from "../../features/admin/domainSlice";
import processReducer from "../../features/admin/processSlice";
import userReducer from "../../features/admin/userSlice";
import adminReducer from "../../features/admin/adminSlice";
import answerReducer from "../../features/admin/answerSlice";
import maturityLevelReducer from "../../features/admin/maturityLevelSlice";

const store = configureStore({
  reducer: {
    admins: adminReducer,
    users: userReducer,
    domains: domainReducer,
    processes: processReducer,
    questions: questionReducer,
    answers: answerReducer,
    maturityLevels: maturityLevelReducer,
  },
});

export default store;
