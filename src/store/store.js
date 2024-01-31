import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import mailsSlice from "./mailsSlice"
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail: mailsSlice.reducer,
  },
})
export default store
