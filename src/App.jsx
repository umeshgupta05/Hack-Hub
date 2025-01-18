import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  CircularProgress,
  Badge,
} from '@mui/material';
import {
  Search,
  Add,
  Notifications,
  AccountCircle,
  Delete,
  LocationOn,
  Event,
  People,
} from '@mui/icons-material';

const HackathonDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('all');
  const [newHackathon, setNewHackathon] = useState({
    name: '',
    date: '',
    location: '',
    maxParticipants: '',
    description: '',
    registrationDeadline: '',
    skillLevels: [],
  });
  const [formOpen, setFormOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Registration deadline for Web3 Hackathon', type: 'deadline' },
    { id: 2, message: 'New team request from John Doe', type: 'team' },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [loading, setLoading] = useState(true);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Fetch Hackathons (Mocked for now)
  useEffect(() => {
    setTimeout(() => {
      setHackathons([
        {
          id: 1,
          name: 'AI Hackathon',
          date: '2025-02-15',
          location: 'Online',
          maxParticipants: 200,
          currentParticipants: 150,
          description: 'An exciting hackathon focused on AI technologies.',
          status: 'upcoming',
        },
        {
          id: 2,
          name: 'Blockchain Summit',
          date: '2025-01-30',
          location: 'Mumbai',
          maxParticipants: 100,
          currentParticipants: 90,
          description: 'Build innovative blockchain solutions.',
          status: 'ongoing',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle Notifications Menu
  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  // Submit New Hackathon
  const handleFormSubmit = () => {
    setHackathons([...hackathons, { id: hackathons.length + 1, ...newHackathon }]);
    setFormOpen(false);
    setSnackbar({ open: true, message: 'Hackathon added successfully!', severity: 'success' });
  };

  // Delete Hackathon
  const handleDeleteHackathon = (id) => {
    setHackathons(hackathons.filter((hackathon) => hackathon.id !== id));
    setSnackbar({ open: true, message: 'Hackathon deleted successfully!', severity: 'error' });
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HackHub
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search hackathons"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginRight: 2, background: 'white', borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
          >
            Add Hackathon
          </Button>
          <IconButton color="inherit" onClick={handleNotificationsClick}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationsClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <MenuItem key={notif.id}>{notif.message}</MenuItem>
              ))
            ) : (
              <MenuItem>No notifications</MenuItem>
            )}
          </Menu>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Filters */}
      <div style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Skill Level</InputLabel>
              <Select
                value={selectedSkillLevel}
                onChange={(e) => setSelectedSkillLevel(e.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                {skillLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>

      {/* Hackathon Cards */}
      <div style={{ padding: 16 }}>
        {loading ? (
          <CircularProgress />
        ) : hackathons.length === 0 ? (
          <Alert severity="info">No hackathons found. Try adjusting your search or add a new hackathon.</Alert>
        ) : (
          <Grid container spacing={3}>
            {hackathons.map((hackathon) => (
              <Grid item xs={12} md={6} lg={4} key={hackathon.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{hackathon.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      <Event /> {new Date(hackathon.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <LocationOn /> {hackathon.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <People /> {hackathon.currentParticipants}/{hackathon.maxParticipants} Participants
                    </Typography>
                    <Typography variant="body2">{hackathon.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => alert(`View details of ${hackathon.name}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      color="secondary"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteHackathon(hackathon.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {/* Add Hackathon Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>Add New Hackathon</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newHackathon.name}
            onChange={(e) => setNewHackathon({ ...newHackathon, name: e.target.value })}
          />
          <TextField
            label="Date"
            fullWidth
            type="date"
            margin="normal"
            value={newHackathon.date}
            onChange={(e) => setNewHackathon({ ...newHackathon, date: e.target.value })}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newHackathon.location}
            onChange={(e) => setNewHackathon({ ...newHackathon, location: e.target.value })}
          />
          <TextField
            label="Max Participants"
            fullWidth
            type="number"
            margin="normal"
            value={newHackathon.maxParticipants}
            onChange={(e) => setNewHackathon({ ...newHackathon, maxParticipants: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={newHackathon.description}
            onChange={(e) => setNewHackathon({ ...newHackathon, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HackathonDashboard;
