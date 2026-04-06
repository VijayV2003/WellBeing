import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import React from "react";

const GroupsList = ({ groups, handleSelectGroup, selectedGroup }) => {
  const memoizedGroups = React.useMemo(() => groups, [groups]);

  return (
    <List sx={{ px: 1 }}>
      {memoizedGroups.map(({ id, name }) => (
        <ListItem 
          key={id} 
          button 
          selected={id === selectedGroup} 
          onClick={() => handleSelectGroup(id)}
          sx={{
            borderRadius: "12px",
            mb: 0.5,
            transition: "all 0.2s ease",
            "&.Mui-selected": {
              backgroundColor: "rgba(0, 133, 121, 0.08)",
              "& .MuiTypography-root": { color: "primary.main", fontWeight: 700 },
              "&:hover": { backgroundColor: "rgba(0, 133, 121, 0.12)" }
            },
            "&:hover": { borderRadius: "12px" }
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ 
              bgcolor: id === selectedGroup ? "primary.main" : "grey.200",
              color: id === selectedGroup ? "white" : "grey.600",
              width: 42,
              height: 42
            }}>
              <GroupsIcon fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={
              <Typography variant="body1" fontWeight={500}>
                {name}
              </Typography>
            } 
          />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupsList;
