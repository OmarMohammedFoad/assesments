import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { Award, Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';

export function QuizzesList() {
  const { t } = useTranslation();
  const { items: quizzes, loading, error } = useAppSelector((state) => state.quizzes);
  console.log(quizzes);

  if (loading) {
    return (
      <Card sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Card>
        <Typography

          variant="h5"
          sx={{
            p: 3,
            fontWeight: 700,

            color: '#1a1a2e',

          }}
        >
          {t('quizzes')}
        </Typography>
        {quizzes.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">{t('noQuizzes')}</Typography>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {quizzes.map((quiz) => (
              <Card
                key={quiz._id}
                sx={{
                  width: "100%",

                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{

                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#1a1a2e',
                        flex: 1,
                      }}
                    >
                      {quiz.title}
                    </Typography>
                    <Chip
                      label={`${quiz.passingScore} pts`}
                      size="small"
                      sx={{
                        bgcolor: '#e8f5e9',
                        color: '#2e7d32',
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {quiz.description}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Calendar size={16} color="#666" />
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(quiz.createdAt), 'MMM dd, yyyy')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Clock size={16} color="#666" />
                      <Typography variant="caption" color="text.secondary">
                        {quiz.duration} {t('minutes')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Award size={16} color="#666" />
                      <Typography variant="caption" color="text.secondary">
                        {quiz.passingScore} {t('points')}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Card>


    </Box>
  );
}
