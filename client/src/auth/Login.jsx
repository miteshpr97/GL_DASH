import React from "react";
import {
  CssBaseline,
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  FormControl,
  FormLabel,
  Input,
  formLabelClasses,
} from "@mui/material";
import { AccountCircle, DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import GlobalStyles from "@mui/material/GlobalStyles";
import { _post_WithoutToken } from "../CommonUtilAPI/GLApiClient";

function ColorSchemeToggle({ onClick }) {
  const theme = useTheme();

  return (
    <IconButton
      size="small"
      aria-label="toggle light/dark mode"
      onClick={onClick}
    >
      {theme.palette.mode === "light" ? (
        <DarkModeRounded />
      ) : (
        <LightModeRounded />
      )}
    </IconButton>
  );
}

export default function Login() {
  const [formData, setFormData] = React.useState({ USER_CD: "", PASS_CD: "" });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState("dark"); // Manage theme mode

  console.log(formData);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await _post_WithoutToken("/api/login", {
        USER_CD: formData.USER_CD,
        PASS_CD: formData.PASS_CD,
      });

      if (response.status === 200) {
        const token = response.headers["x-gl-auth-token"];
        const userDetails = response.data[0];
        if (token && userDetails) {
          sessionStorage.setItem("authToken", token);
          Cookies.set("authToken", token, { expires: 1 });
          sessionStorage.setItem("USER_CD", formData.USER_CD);
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
          navigate("/");
        } else {
          setErrorMessage("Failed to retrieve token");
        }
      } else {
        setErrorMessage("Invalid Employee ID or Password");
      }
    } catch (error) {
      console.error("An error occurred while logging in", error);
      setErrorMessage("An error occurred while logging in.");
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Define the theme based on the mode state
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px",
            "--Cover-width": "50vw",
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={{
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgb(40,83,149, 0.2)"
              : "rgba(255, 255, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <Typography level="title-lg" sx={{ color: isDarkMode ? "white" : "#1f4c8f" }}>
                VisiWMS
              </Typography>
            </Box>
            <ColorSchemeToggle
              onClick={() =>
                setMode((prev) => (prev === "dark" ? "light" : "dark"))
              }
            />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },

            }}
          >
            {/* <Stack gap={4} sx={{ mt: 0 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>User Code</FormLabel>
                  <Input
                    type="text"
                    value={formData.USER_CD}
                    name="USER_CD"
                    onChange={handleOnChange}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password Code</FormLabel>
                  <Input
                    type="password"
                    value={formData.PASS_CD}
                    name="PASS_CD"
                    onChange={handleOnChange}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Stack>
              </form>
            </Stack> */}
            <Stack
              gap={2}
              sx={{
                mt: 0,
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(116,124,152, 0.25)", // Transparent black for light mode
                color: isDarkMode ? "white" : "black", // Adjust text color
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backdropFilter: "blur(10px)", // Adds the blur effect
              }}
            >
             <Box sx={{ textAlign: "center", }}>
                <AccountCircle
                  sx={{ fontSize: 50, color: isDarkMode ? "white" : "#4b5979" }} // Adjust icon color
                />
                <Typography variant="h6" sx={{ mt: 0.5, color: isDarkMode ? "white" : "#4b5979"  }}>
                  User Login
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <FormControl required fullWidth>
                  <FormLabel sx={{ color: isDarkMode ? "white" : "#333333"}}>
                    User Code
                  </FormLabel>
                  <Input
                    type="text"
                    value={formData.USER_CD}
                    name="USER_CD"
                    onChange={handleOnChange}
                    sx={{
                      borderRadius: 1,
                      bgcolor: isDarkMode
                        ? "rgba(255, 255, 255, 0.2)"
                        : "white",
                      border: "1px solid #D3D3D3",
                      color: isDarkMode ? "white" : "black",
                      padding:"0px 10px"

                    }}
                  />
                </FormControl>
                <FormControl required fullWidth sx={{ mt: 1}}>
                  <FormLabel sx={{ color: isDarkMode ? "white" : "#333333" }}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    value={formData.PASS_CD}
                    name="PASS_CD"
                    onChange={handleOnChange}
                    sx={{
                      borderRadius: 1,
                      bgcolor: isDarkMode
                        ? "rgba(255, 255, 255, 0.2)"
                        : "white",
                      border: "1px solid #D3D3D3",
                      color: isDarkMode ? "white" : "black",
                      padding:"0px 10px"
                    }}
                  />
                </FormControl>

                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "#4b5979",
                      // backgroundColor: "#004040",
                      color: "white",
                   
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography
              level="body-xs"
              textAlign="center"
              sx={{ color: isDarkMode ? "white" : "#1f4c8f"  }}
            >
              VisiWMS {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition: "background-color var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: theme.palette.background.level1,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            theme.palette.mode === "dark"
              ? "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)"
              : "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
        })}
      />
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export const LoginLoader = () => {
  const token = Cookies.get("authToken");
  if (token) {
    // return redirect('/', { replace: true });
  }
  return null;
};
