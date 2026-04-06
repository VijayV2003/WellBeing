import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "../../store/features/supportGroups/supportGroupsSlice";
import GroupsList from "./groupsList";
import Chats from "./chats";
import CreateGroup from "./createGroup";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SupportGroups = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const theme = useTheme();
    let isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const groups = useSelector(selectGroups);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    const handleSelectGroup = (groupId) => {
        setSelectedGroup(groupId);
    };

    const handleBack = () => {
        setSelectedGroup(null);
    };

    const chatAnimation = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
    };

    return (
        <Box 
            sx={{ 
                display: "flex", 
                height: "calc(100vh - 64px)",
                backgroundColor: "background.default",
                overflow: "hidden"
            }}
        >
            <Grid container sx={{ height: "100%" }}>
                {/* SIDEBAR: Group List */}
                <Grid 
                    item 
                    xs={12} 
                    sm={4} 
                    md={3} 
                    sx={{ 
                        display: { xs: selectedGroup ? "none" : "flex", sm: "flex" },
                        flexDirection: "column",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                        height: "100%"
                    }}
                >
                    <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
                        <Typography variant="h5" fontWeight={800} color="primary.main">
                            Circles
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Find support in shared journeys.
                        </Typography>
                    </Box>

                    <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                        <CreateGroup />
                    </Box>

                    <Box sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
                        <GroupsList 
                            groups={groups} 
                            handleSelectGroup={handleSelectGroup} 
                            selectedGroup={selectedGroup} 
                        />
                    </Box>
                </Grid>

                {/* CHAT AREA: Selected Group */}
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={9} 
                    sx={{ 
                        height: "100%",
                        display: { xs: selectedGroup ? "flex" : "none", sm: "flex" },
                        flexDirection: "column",
                        position: "relative"
                    }}
                >
                    <AnimatePresence mode="wait">
                        {selectedGroup ? (
                            <motion.div 
                                key={selectedGroup} 
                                initial="hidden" 
                                animate="visible" 
                                exit="exit" 
                                variants={chatAnimation}
                                style={{ height: "100%", display: "flex", flexDirection: "column" }}
                            >
                                <Box sx={{ 
                                    p: 2, 
                                    display: "flex", 
                                    alignItems: "center", 
                                    borderBottom: "1px solid", 
                                    borderColor: "divider",
                                    backgroundColor: "background.paper"
                                }}>
                                    {isMobile && (
                                        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    )}
                                    <Typography variant="h6" fontWeight={700}>
                                        {groups.find(g => g.id === selectedGroup)?.name || "Group Chat"}
                                    </Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                                    <Chats groupId={selectedGroup} />
                                </Box>
                            </motion.div>
                        ) : (
                            <Box sx={{ 
                                height: "100%", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                p: 4,
                                textAlign: "center"
                            }}>
                                <Box>
                                    <Typography variant="h5" fontWeight={700} gutterBottom color="text.secondary">
                                        Select a Circle
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Join a conversation to share experiences and find support.
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </AnimatePresence>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupportGroups;
