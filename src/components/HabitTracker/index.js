import React, { useState } from "react";
import HabitList from "./HabitList/HabitList";
import AddHabitForm from "./AddHabitForm/AddHabitForm";
import FiltersAndSorting from "./FiltersAndSorting/FiltersAndSorting";
import { Box, Container, Typography, Paper } from "@mui/material";

const HabitTracker = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [refreshHabits, setRefreshHabits] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={800} align="center" gutterBottom color="primary.main">
        Habit Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
         Build strong patterns and maintain your streaks
      </Typography>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, backgroundColor: 'background.paper' }}>
        <AddHabitForm
          setRefreshHabits={setRefreshHabits}
          refreshHabits={refreshHabits}
        />
        <Box sx={{ my: 3 }}>
          <FiltersAndSorting
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Box>
        <HabitList
          filter={filter}
          sortBy={sortBy}
          setRefreshHabits={setRefreshHabits}
          refreshHabits={refreshHabits}
        />
      </Paper>
    </Container>
  );
};

export default HabitTracker;
