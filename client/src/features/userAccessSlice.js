
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getAll_WithoutToken, _update_WithoutToken } from "../CommonUtilAPI/GLApiClient";

// Async Thunks
export const fetchUserAccess = createAsyncThunk(
  "userAccess/fetchAll",
  async () => {
    const response = await _getAll_WithoutToken("/api/GLCMA100200/");
    return response?.data || [];
  }
);

export const fetchUserPermissions = createAsyncThunk(
  "userAccess/fetchPermissions",
  async (EMP_CD) => {
    const response = await _getAll_WithoutToken(`/api/GLCMA100200/${EMP_CD}`);
    return response?.data || [];
  }
);

// New async thunk to update permissions
export const updateUserPermissions = createAsyncThunk(
  "userAccess/updatePermissions",
  async ({ EMP_CD, updatedPermissions, userAccess }, { rejectWithValue }) => {
    try {
      const updateRequests = userAccess.map((row, index) => {
        const permissionData = updatedPermissions[index];

        const updateData = {
          EMP_CD,
          PAGE_CD: row.PAGE_CD,
          PAGE_YN: permissionData.PAGE_YN ? "Y" : "N",
          PAGE_INQUIRY: permissionData.PAGE_INQUIRY ? "Y" : "N",
          PAGE_SAVE: permissionData.PAGE_SAVE ? "Y" : "N",
          PAGE_UPDATE: permissionData.PAGE_UPDATE ? "Y" : "N",
          PAGE_DELETE: permissionData.PAGE_DELETE ? "Y" : "N",
          PAGE_APP_Y1: permissionData.PAGE_APP_Y1 ? "Y" : "N",
          PAGE_APP_Y2: permissionData.PAGE_APP_Y2 ? "Y" : "N",
          PAGE_APP_Y3: permissionData.PAGE_APP_Y3 ? "Y" : "N",
          PAGE_APP_Y4: permissionData.PAGE_APP_Y4 ? "Y" : "N",
          PAGE_APP_Y5: permissionData.PAGE_APP_Y5 ? "Y" : "N",
          PAGE_APP_Y6: permissionData.PAGE_APP_Y6 ? "Y" : "N",
          PAGE_PRINT: permissionData.PAGE_PRINT ? "Y" : "N",
          PAGE_EXCEL: permissionData.PAGE_EXCEL ? "Y" : "N",
        };

        return _update_WithoutToken(
          `api/GLCMA100200/Update/${EMP_CD}`,
          updateData
        );
      });

      // Wait for all update requests to complete
      await Promise.all(updateRequests);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userAccessSlice = createSlice({
  name: "userAccess",
  initialState: {
    userAccess: [],
    permissions: {},
    loading: false,
    error: null,
    updateLoading: false,  // New loading state for update action
    updateError: null,  // New error state for update action
    updateSuccess: false,  // New success state for update action
  },
  reducers: {
    togglePermission: (state, action) => {
      const { index, field } = action.payload;
      state.permissions[index][field] = !state.permissions[index][field];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.userAccess = action.payload;
      })
      .addCase(fetchUserAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        const userAccessData = action.payload;
        state.permissions = state.userAccess.reduce((acc, item, index) => {
          const userAccessItem = userAccessData.find(
            (ua) => ua.PAGE_CD === item.PAGE_CD
          );
          acc[index] = {
            PAGE_YN: userAccessItem ? userAccessItem.PAGE_YN === "Y" : false,
            PAGE_INQUIRY: userAccessItem
              ? userAccessItem.PAGE_INQUIRY === "Y"
              : false,
            PAGE_SAVE: userAccessItem
              ? userAccessItem.PAGE_SAVE === "Y"
              : false,
            PAGE_UPDATE: userAccessItem
              ? userAccessItem.PAGE_UPDATE === "Y"
              : false,
            PAGE_DELETE: userAccessItem
              ? userAccessItem.PAGE_DELETE === "Y"
              : false,
            PAGE_APP_Y1: userAccessItem
              ? userAccessItem.PAGE_APP_Y1 === "Y"
              : false,
            PAGE_APP_Y2: userAccessItem
              ? userAccessItem.PAGE_APP_Y2 === "Y"
              : false,
            PAGE_APP_Y3: userAccessItem
              ? userAccessItem.PAGE_APP_Y3 === "Y"
              : false,
            PAGE_APP_Y4: userAccessItem
              ? userAccessItem.PAGE_APP_Y4 === "Y"
              : false,
            PAGE_APP_Y5: userAccessItem
              ? userAccessItem.PAGE_APP_Y5 === "Y"
              : false,
            PAGE_APP_Y6: userAccessItem
              ? userAccessItem.PAGE_APP_Y6 === "Y"
              : false,
            PAGE_PRINT: userAccessItem
              ? userAccessItem.PAGE_PRINT === "Y"
              : false,
            PAGE_EXCEL: userAccessItem
              ? userAccessItem.PAGE_EXCEL === "Y"
              : false,
          };
          return acc;
        }, {});
      })
      .addCase(updateUserPermissions.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateUserPermissions.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.updateError = null;
      })
      .addCase(updateUserPermissions.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
        state.updateSuccess = false;
      });
  },
});

export const { togglePermission } = userAccessSlice.actions;

export default userAccessSlice.reducer;
