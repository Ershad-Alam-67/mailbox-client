import { createSlice } from "@reduxjs/toolkit"

const mailsSlice = createSlice({
  name: "mailState",
  initialState: {
    mailbox: [],
    sentbox: [],
    totalUnread: 0,
  },
  reducers: {
    setTotalUnread: (state, action) => {
      state.totalUnread = action.payload
    },
  },
})
export default mailsSlice
export const mailActions = mailsSlice.actions
