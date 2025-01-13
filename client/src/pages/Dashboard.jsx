import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ flex: 1, width: "100%", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={3}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">1,024</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Sessions</Typography>
              <Typography variant="h4">342</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">New Signups</Typography>
              <Typography variant="h4">128</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Reports Generated</Typography>
              <Typography variant="h4">67</Typography>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>

      {/* Placeholder for charts */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Performance Overview
        </Typography>
        <Box
          sx={{
            height: 300,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Chart Placeholder</Typography>
        </Box>
      </Box>
    </Box>
  );
}
