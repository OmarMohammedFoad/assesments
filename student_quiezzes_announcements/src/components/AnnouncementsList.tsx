import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';

export function AnnouncementsList() {
  const { t } = useTranslation();
  const { items: announcements, loading, error } = useAppSelector(
    (state) => state.announcements
  );


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
      <Card sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
      }}>

        {announcements.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">{t('noAnnouncements')}</Typography>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {announcements.map((announcement) => (
              <Card
                key={announcement._id}
                sx={{
                  transition: 'all 0.3s ease',
                  borderLeft: '4px solid #667eea',
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
                      {announcement.title}
                    </Typography>
                    <Chip
                      label="New"
                      size="small"
                      sx={{
                        bgcolor: '#667eea',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {announcement.content}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Clock size={14} color="#999" />
                    <Typography variant="caption" color="text.secondary">
                      {formatDistanceToNow(new Date(announcement.createdAt), {
                        addSuffix: true,
                      })}
                    </Typography>
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
