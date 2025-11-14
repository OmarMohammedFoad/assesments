import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnnouncementsList } from "../components/AnnouncementsList";
import { QuizzesList } from "../components/QuizzesList";
import { useAppDispatch } from "../store/hooks";
import { fetchAnnouncements } from "../store/slices/announcementsSlice";
import { fetchQuizzes } from "../store/slices/quizzesSlice";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#f5f7fa",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box
        component="main"
        sx={{
          width: { md: "calc(100% - 280px)" },
          ml: { md: "280px" },
          mt: { xs: 7, md: 0 },
          py: 4,
        }}
      >
        <Container maxWidth="xl">

          <Card
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              p: 4,
              bgcolor: "#ffffff",
              borderRadius: 3,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" color="#0099cc">
                EXAMS TIME
              </Typography>

              <Typography sx={{ mt: 1, maxWidth: 500 }} color="text.secondary">
                Here we are. Are you ready to fight? Don’t worry, we prepared some tips to
                be ready for your exams.
              </Typography>

              <Typography sx={{ mt: 1, fontStyle: "italic" }} color="text.disabled">
                "Nothing happens until something moves" – Albert Einstein
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "#00bcd4",
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#00a5bd" },
                }}
              >
                View exams tips
              </Button>
            </Box>

            <Box component="img"
              src="https://cdn-icons-png.flaticon.com/512/3754/3754305.png"
              sx={{ width: 180, display: { xs: "none", md: "block" } }}
            />
          </Card>


          <Grid container justifyContent={"space-around"}>
            <Grid item xs={12} md={8}>
              <Card

              >
                <Typography variant="h6" fontWeight="bold" mb={2} padding={3}>
                  {t('announcements')}
                </Typography>

                <AnnouncementsList />
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  What's due
                </Typography>

                <QuizzesList />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
