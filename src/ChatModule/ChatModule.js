import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    Users,
    User,
    Menu,
    X,
    Search,
    Paperclip,
    Download,
    Eye,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Users2 // Icon for the members button
} from "lucide-react";

const BASE_URL = "https://api.techsterker.com";

const StudentChats = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState("");
    const [showList, setShowList] = useState(true);
    const [showMembersModal, setShowMembersModal] = useState(false); // Modal for group members
    const [searchTerm, setSearchTerm] = useState(""); // Search term for members modal
    const [isMobile, setIsMobile] = useState(false);
    const [files, setFiles] = useState([]);
    const [loadingChats, setLoadingChats] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [groups, setGroups] = useState([]);
    const [individuals, setIndividuals] = useState([]);
    const [chatMessages, setChatMessages] = useState({});
    const [error, setError] = useState(null);
    const [previewModal, setPreviewModal] = useState({ open: false, file: null });
    const [showAllGroups, setShowAllGroups] = useState(false);
    const [showAllIndividuals, setShowAllIndividuals] = useState(false);
    const [mentors, setMentors] = useState([]); // All mentors from all groups
    const [loadingMentors, setLoadingMentors] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(null);
    const [activeChatMembers, setActiveChatMembers] = useState([]); // Members for the active chat
    const [loadingMembers, setLoadingMembers] = useState(false); // Loading state for members modal
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const Student = JSON.parse(sessionStorage.getItem('user') || '{}');
    const CURRENT_USER_ID = Student?.id;

    // Validation functions
    const isValidUserId = (userId) => {
        return userId && typeof userId === 'string' && userId.trim().length > 0;
    };
    const isValidChatId = (chatId) => {
        return chatId && typeof chatId === 'string' && chatId.trim().length > 0;
    };
    const validateMessageData = (text, files) => {
        return text.trim().length > 0 || files.length > 0;
    };

    // Responsive layout
    useEffect(() => {
        const checkScreen = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setShowList(true);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    // Fetch mentors from group chats (global list)
    useEffect(() => {
        if (!isValidUserId(CURRENT_USER_ID)) {
            setError("Invalid user ID. Please log in again.");
            return;
        }
        const fetchMentorsFromGroups = async () => {
            try {
                setLoadingMentors(true);
                const res = await fetch(`${BASE_URL}/api/group-chats/${CURRENT_USER_ID}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    // Extract all unique mentors from all groups
                    const allMentors = [];
                    const mentorIds = new Set();
                    data.data.forEach(group => {
                        if (Array.isArray(group.mentors)) {
                            group.mentors.forEach(mentor => {
                                if (mentor._id && !mentorIds.has(mentor._id)) {
                                    mentorIds.add(mentor._id);
                                    allMentors.push({
                                        _id: mentor._id,
                                        name: mentor.name || "Unknown Mentor",
                                        email: mentor.email,
                                        expertise: mentor.expertise,
                                        subjects: mentor.subjects,
                                        role: "Mentor",
                                        status: "online" // Assuming online for simplicity
                                    });
                                }
                            });
                        }
                    });
                    setMentors(allMentors);
                }
            } catch (err) {
                console.error("Error fetching mentors from groups:", err);
                setError("Failed to load mentors.");
            } finally {
                setLoadingMentors(false);
            }
        };
        fetchMentorsFromGroups();
    }, [CURRENT_USER_ID]);

    // Fetch all chats (groups + individuals)
    useEffect(() => {
        if (!isValidUserId(CURRENT_USER_ID)) {
            setError("Invalid user ID. Please log in again.");
            setLoadingChats(false);
            return;
        }
        const fetchAllChats = async () => {
            try {
                setLoadingChats(true);
                setError(null);
                // Fetch group chats
                const groupRes = await fetch(`${BASE_URL}/api/group-chats/${CURRENT_USER_ID}`);
                const groupData = await groupRes.json();
                // Fetch individual chats
                const individualRes = await fetch(`${BASE_URL}/api/individual-chats/${CURRENT_USER_ID}`);
                const individualData = await individualRes.json();
                console.log("Fetched group chats:", groupData);
                console.log("Fetched individual chats:", individualData);
                let groupChats = [];
                let individualChats = [];

                // Process group chats
                if (groupData.success && Array.isArray(groupData.data)) {
                    groupChats = groupData.data.map((g) => ({
                        id: g._id,
                        name: g.groupName || "Unnamed Group",
                        type: "group",
                        lastMessage: g.lastMessage?.text || "",
                        members: [...(g.enrolledUsers || []), ...(g.mentors || [])], // Store raw member list
                        admin: g.admin,
                        raw: g,
                    }));
                }
                // Process individual chats
                if (individualData.success && Array.isArray(individualData.data)) {
                    individualChats = individualData.data.map((chat) => {
                        const otherUser = chat.otherUser ||
                            (chat.enrolledUsers && chat.enrolledUsers.find(u => u._id !== CURRENT_USER_ID)) ||
                            (chat.mentors && chat.mentors.find(m => m._id !== CURRENT_USER_ID));
                        return {
                            id: chat._id,
                            name: otherUser?.name || chat.groupName || "Unknown User",
                            type: "individual",
                            lastMessage: chat.lastMessage?.text || "",
                            otherUser: otherUser,
                            raw: chat,
                        };
                    });
                }
                setGroups(groupChats);
                setIndividuals(individualChats);
            } catch (err) {
                console.error("Error fetching chats:", err);
                setError("Failed to load chats. Please try again.");
            } finally {
                setLoadingChats(false);
            }
        };
        fetchAllChats();
    }, [CURRENT_USER_ID]);

    // Auto-refresh messages for active chat
    useEffect(() => {
        if (!activeChat || !isValidUserId(CURRENT_USER_ID)) {
            // Clear interval if no active chat
            if (refreshInterval) {
                clearInterval(refreshInterval);
                setRefreshInterval(null);
            }
            return;
        }
        // Function to fetch messages
        const fetchMessages = async () => {
            try {
                let apiUrl;
                if (activeChat.type === "group") {
                    apiUrl = `${BASE_URL}/api/group-messages/${activeChat.id}/${CURRENT_USER_ID}`;
                } else {
                    // For individual chats, we need to determine the other user's ID
                    const otherUserId = activeChat.otherUser?._id;
                    if (!otherUserId) {
                        console.error("Unable to determine chat participant");
                        return;
                    }
                    apiUrl = `${BASE_URL}/api/individual-messages/${otherUserId}/${CURRENT_USER_ID}`;
                }
                const res = await fetch(apiUrl);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    const formattedMessages = data.data.map((msg) => {
                        const sender = msg.sender;
                        const senderName = sender?.name || "Unknown";
                        const isYou = sender?._id === CURRENT_USER_ID;
                        const timestamp = new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        });
                        let mediaFiles = [];
                        if (Array.isArray(msg.media) && msg.media.length > 0) {
                            mediaFiles = msg.media.map((m) => {
                                const url = m.url;
                                const fileName = m.fileName || url.split('/').pop() || 'file';
                                const lowerName = fileName.toLowerCase();
                                const isImageType = m.type?.startsWith('image/') ||
                                    /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(lowerName);
                                return {
                                    url,
                                    fileName,
                                    type: isImageType ? "image" : "file",
                                };
                            });
                        }
                        return {
                            id: msg._id,
                            sender: isYou ? "You" : senderName,
                            text: msg.text || "",
                            timestamp,
                            files: mediaFiles,
                            raw: msg,
                        };
                    });
                    // Only update if messages have changed
                    setChatMessages((prev) => {
                        const currentMessages = prev[activeChat.id] || [];
                        if (JSON.stringify(currentMessages) !== JSON.stringify(formattedMessages)) {
                            return {
                                ...prev,
                                [activeChat.id]: formattedMessages,
                            };
                        }
                        return prev;
                    });
                } else {
                    console.error("Failed to auto-refresh messages:", data.message);
                }
            } catch (err) {
                console.error("Error auto-refreshing messages:", err);
                // Don't show error to user for auto-refresh failures
            }
        };
        // Clear any existing interval
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
        // Fetch immediately and then set up interval
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000);
        setRefreshInterval(interval);
        // Cleanup on unmount or when dependencies change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [activeChat, CURRENT_USER_ID]); // Re-run when activeChat or CURRENT_USER_ID changes

    // Also add cleanup when component unmounts
    useEffect(() => {
        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, activeChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChatSelect = async (chat) => {
        // Clear existing interval when switching chats
        if (refreshInterval) {
            clearInterval(refreshInterval);
            setRefreshInterval(null);
        }
        if (!isValidChatId(chat.id) || !isValidUserId(CURRENT_USER_ID)) {
            setError("Invalid chat or user information");
            return;
        }
        setLoadingMessages(true);
        setError(null);
        try {
            let apiUrl;
            if (chat.type === "group") {
                apiUrl = `${BASE_URL}/api/group-messages/${chat.id}/${CURRENT_USER_ID}`;
            } else {
                // For individual chats, we need to determine the other user's ID
                const otherUserId = chat.otherUser?._id;
                if (!otherUserId) {
                    throw new Error("Unable to determine chat participant");
                }
                apiUrl = `${BASE_URL}/api/individual-messages/${otherUserId}/${CURRENT_USER_ID}`;
            }
            const res = await fetch(apiUrl);
            const data = await res.json();
            if (data.success && Array.isArray(data.data)) {
                const formattedMessages = data.data.map((msg) => {
                    const sender = msg.sender;
                    const senderName = sender?.name || "Unknown";
                    const isYou = sender?._id === CURRENT_USER_ID;
                    const timestamp = new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    let mediaFiles = [];
                    if (Array.isArray(msg.media) && msg.media.length > 0) {
                        mediaFiles = msg.media.map((m) => {
                            const url = m.url;
                            const fileName = m.fileName || url.split('/').pop() || 'file';
                            const lowerName = fileName.toLowerCase();
                            const isImageType = m.type?.startsWith('image/') ||
                                /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(lowerName);
                            return {
                                url,
                                fileName,
                                type: isImageType ? "image" : "file",
                            };
                        });
                    }
                    return {
                        id: msg._id,
                        sender: isYou ? "You" : senderName,
                        text: msg.text || "",
                        timestamp,
                        files: mediaFiles,
                        raw: msg,
                    };
                });
                setChatMessages((prev) => ({
                    ...prev,
                    [chat.id]: formattedMessages,
                }));
                setActiveChat(chat);
            } else {
                throw new Error(data.message || "Failed to load messages");
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
            setError("Failed to load messages.");
        } finally {
            setLoadingMessages(false);
            if (isMobile) setShowList(false);
        }
    };

    // Function to fetch members for the active group chat
    const fetchActiveChatMembers = async () => {
        if (!activeChat || activeChat.type !== "group") {
            // If not a group, set empty members list or a message
            setActiveChatMembers([]);
            return;
        }
        setLoadingMembers(true);
        setError(null);
        try {
            // Use the members data already fetched with the chat list
            const group = groups.find(g => g.id === activeChat.id);
            if (group && Array.isArray(group.members)) {
                // Format members for the modal list (users and mentors)
                const formattedMembers = group.members.map(m => ({
                    _id: m._id,
                    name: m.name || "Unknown User",
                    role: m.role || (m.expertise ? "Mentor" : "Member"), // Distinguish based on presence of expertise
                    status: "online" // Assuming online for simplicity
                }));
                setActiveChatMembers(formattedMembers);
            } else {
                setActiveChatMembers([]);
            }
        } catch (err) {
            console.error("Error fetching members for active chat:", err);
            setError("Failed to load members for this chat.");
            setActiveChatMembers([]);
        } finally {
            setLoadingMembers(false);
        }
    };

    // Fetch members when the active chat changes (only if it's a group)
    useEffect(() => {
        fetchActiveChatMembers();
    }, [activeChat]); // Run when activeChat changes


    const sendMessage = async () => {
        if (!validateMessageData(message, files)) {
            setError("Message cannot be empty");
            return;
        }
        if (!activeChat || !isValidUserId(CURRENT_USER_ID)) {
            setError("Invalid chat or user information");
            return;
        }
        setSendingMessage(true);
        setError(null);
        try {
            const formData = new FormData();
            if (activeChat.type === "group") {
                formData.append("chatGroupId", activeChat.id);
                formData.append("senderId", CURRENT_USER_ID);
                if (message.trim()) formData.append("text", message.trim());
                files.forEach((file) => {
                    formData.append("files", file);
                });
                const res = await fetch(`${BASE_URL}/api/group-messages`, {
                    method: "POST",
                    body: formData,
                });
                const result = await res.json();
                if (!result.success) {
                    throw new Error(result.message || "Failed to send message");
                }
            } else {
                // Individual message
                const otherUserId = activeChat.otherUser?._id;
                if (!otherUserId) {
                    throw new Error("Unable to determine recipient");
                }
                formData.append("userId", CURRENT_USER_ID);
                formData.append("mentorId", otherUserId);
                formData.append("senderId", CURRENT_USER_ID);
                if (message.trim()) formData.append("text", message.trim());
                files.forEach((file) => {
                    formData.append("files", file);
                });
                const res = await fetch(`${BASE_URL}/api/individual-messages`, {
                    method: "POST",
                    body: formData,
                });
                const result = await res.json();
                if (!result.success) {
                    throw new Error(result.message || "Failed to send message");
                }
            }
            // Update local state immediately
            const now = new Date();
            const newMsg = {
                id: Date.now().toString(), // Temporary ID
                sender: "You",
                text: message.trim(),
                timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                files: files.map((file) => {
                    const lowerName = file.name.toLowerCase();
                    const isImage = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(lowerName);
                    return {
                        url: URL.createObjectURL(file),
                        fileName: file.name,
                        type: isImage ? "image" : "file",
                    };
                }),
            };
            setChatMessages((prev) => ({
                ...prev,
                [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
            }));
            // Clear form
            setMessage("");
            setFiles([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error("Error sending message:", err);
            setError(err.message || "Failed to send message. Please try again.");
        } finally {
            setSendingMessage(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!sendingMessage) {
                sendMessage();
            }
        }
    };

    const handleAttachClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        // Validate file types and sizes
        const validFiles = selectedFiles.filter(file => {
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                setError(`File ${file.name} is too large. Maximum size is 10MB.`);
                return false;
            }
            return true;
        });
        setFiles(validFiles);
    };

    const removeFile = (indexToRemove) => {
        setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const openPreview = (file) => {
        setPreviewModal({ open: true, file });
    };

    const closePreview = () => {
        setPreviewModal({ open: false, file: null });
    };

    const getStatusColor = (status) =>
        status === "online" ? "bg-green-500" : status === "away" ? "bg-yellow-500" : "bg-gray-400";

    const renderGroupList = () => {
        if (loadingChats) return <div className="px-3 py-2 text-gray-500">Loading chats...</div>;
        if (error) return <div className="px-3 py-2 text-red-500">{error}</div>;

        const groupsToShow = showAllGroups ? groups : groups.slice(0, 4);
        if (groups.length === 0) {
            return <div className="px-3 py-2 text-gray-500">No group chats found</div>;
        }
        return (
            <>
                {groupsToShow.map((c) => {
                    const active = activeChat?.id === c.id;
                    return (
                        <li
                            key={c.id}
                            onClick={() => handleChatSelect(c)}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer
                                ${active ? "bg-[#a51d34] text-white" : "hover:bg-red-50"}`}
                        >
                            <Users className={`w-4 h-4 ${active ? "text-white" : "text-[#a51d34]"}`} />
                            <span className="truncate flex-1">{c.name}</span>
                            {c.lastMessage && (
                                <span className={`text-xs truncate max-w-[80px] ${active ? "text-white/80" : "text-gray-500"}`}>
                                    {c.lastMessage}
                                </span>
                            )}
                        </li>
                    );
                })}
                {groups.length > 4 && (
                    <button
                        onClick={() => setShowAllGroups(!showAllGroups)}
                        className="flex items-center gap-2 px-2 py-1.5 text-[#a51d34] hover:bg-red-50 rounded w-full text-left"
                    >
                        {showAllGroups ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                <span>Show Less</span>
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                <span>View All ({groups.length})</span>
                            </>
                        )}
                    </button>
                )}
            </>
        );
    };

    const renderIndividualList = () => {
        const individualsToShow = showAllIndividuals ? individuals : individuals.slice(0, 4);
        if (individuals.length === 0) {
            return <div className="px-3 py-2 text-gray-500">No individual chats found</div>;
        }
        return (
            <>
                {individualsToShow.map((p) => {
                    const active = activeChat?.id === p.id;
                    return (
                        <li
                            key={p.id}
                            onClick={() => handleChatSelect(p)}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer
                                ${active ? "bg-[#a51d34] text-white" : "hover:bg-red-50"}`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold
                                    ${active ? "bg-white/20 text-white" : "bg-[#a51d34]/10 text-[#a51d34]"}`}
                            >
                                {p.name.charAt(0)}
                            </div>
                            <span className="truncate flex-1">{p.name}</span>
                            <span className={`ml-2 w-2 h-2 rounded-full ${getStatusColor("online")}`} />
                        </li>
                    );
                })}
                {individuals.length > 4 && (
                    <button
                        onClick={() => setShowAllIndividuals(!showAllIndividuals)}
                        className="flex items-center gap-2 px-2 py-1.5 text-[#a51d34] hover:bg-red-50 rounded w-full text-left"
                    >
                        {showAllIndividuals ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                <span>Show Less</span>
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                <span>View All ({individuals.length})</span>
                            </>
                        )}
                    </button>
                )}
            </>
        );
    };

    return (
        <div className="h-screen flex bg-white text-[13px]">
            {showList && activeChat && isMobile && (
                <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setShowList(false)} />
            )}
            <aside
                className={`fixed md:static z-40 top-0 left-0 h-full w-72 border-r bg-white transition-transform duration-200 flex flex-col
                    ${showList ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <div className="h-14 px-3 flex items-center justify-between border-b bg-[#c94a5a] text-white flex-shrink-0">
                    <span className="font-semibold truncate">Workspace</span>
                    <button className="md:hidden p-1 rounded hover:bg-white/20" onClick={() => setShowList(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-3 border-b flex-shrink-0">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            placeholder="Search"
                            className="w-full pl-7 pr-3 py-1.5 border rounded text-[13px] focus:ring-1 focus:ring-[#a51d34]"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="px-3 pt-3">
                        <div className="text-gray-500 uppercase text-[11px] font-semibold mb-1">Group Chats</div>
                        <ul className="space-y-1">
                            {renderGroupList()}
                        </ul>
                    </div>
                    {individuals.length > 0 && (
                        <div className="px-3 pt-4">
                            <div className="text-gray-500 uppercase text-[11px] font-semibold mb-1">Direct messages</div>
                            <ul className="space-y-1">
                                {renderIndividualList()}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Removed the "New Message" button */}
            </aside>
            <main className="flex-1 flex flex-col min-w-0">
                <div className="h-14 flex items-center justify-between border-b px-3 flex-shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <button className="md:hidden p-1 rounded hover:bg-gray-100" onClick={() => setShowList(true)}>
                            <Menu className="w-5 h-5 text-[#a51d34]" />
                        </button>
                        <div className="flex items-center gap-2 min-w-0">
                            {activeChat?.type === "group" ? (
                                <Users className="w-5 h-5 text-[#a51d34]" />
                            ) : (
                                <User className="w-5 h-5 text-[#a51d34]" />
                            )}
                            <div className="font-semibold truncate">
                                {activeChat ? activeChat.name : "Messages"}
                            </div>
                        </div>
                    </div>
                    {/* Added the Members button, only shown if a group chat is active */}
                    {activeChat && activeChat.type === "group" && (
                        <button
                            onClick={() => setShowMembersModal(true)}
                            className="px-2 py-1 text-[12px] border border-[#a51d34] text-[#a51d34] rounded hover:bg-red-50 flex items-center gap-1"
                        >
                            <Users2 className="w-4 h-4" /> {/* Using a group/users icon */}
                            <span>Members</span>
                        </button>
                    )}
                </div>
                {error && (
                    <div className="mx-3 mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}
                <div className="flex-1 overflow-y-auto px-3 py-3 bg-white min-h-0">
                    {loadingMessages ? (
                        <div className="h-full flex items-center justify-center text-gray-500">Loading messages...</div>
                    ) : activeChat ? (
                        <>
                            {(chatMessages[activeChat.id] || []).length === 0 ? (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                (chatMessages[activeChat.id] || []).map((m, i) => (
                                    <MessageBubble
                                        key={m.id || i}
                                        msg={m}
                                        isYou={m.sender === "You"}
                                        onFileClick={openPreview}
                                    />
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-500">
                            Select a chat or start a new conversation
                        </div>
                    )}
                </div>
                {activeChat && (
                    <div className="border-t p-2 flex-shrink-0">
                        {files.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {files.map((f, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-1.5 px-2 py-1 border rounded bg-gray-50 text-[11px] max-w-[140px]"
                                    >
                                        <Paperclip className="w-3 h-3 text-[#a51d34]" />
                                        <span className="truncate">{f.name}</span>
                                        <button
                                            onClick={() => removeFile(idx)}
                                            className="ml-auto text-[10px] text-red-500 hover:underline"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex items-end gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,.pdf,.doc,.docx,.txt"
                            />
                            <button
                                className="p-2 rounded hover:bg-gray-100 text-gray-600"
                                onClick={handleAttachClick}
                                title="Attach files"
                                disabled={sendingMessage}
                            >
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1">
                                <textarea
                                    ref={inputRef}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    rows={1}
                                    placeholder={`Message ${activeChat.name}`}
                                    className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[#a51d34] disabled:bg-gray-100"
                                    disabled={sendingMessage}
                                />
                            </div>
                            <button
                                onClick={sendMessage}
                                disabled={(!message.trim() && files.length === 0) || sendingMessage}
                                className={`p-2 rounded-lg flex items-center gap-1 ${(message.trim() || files.length > 0) && !sendingMessage
                                    ? "bg-[#a51d34] text-white hover:brightness-110"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {sendingMessage ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                <span className="hidden sm:inline text-[12px]">
                                    {sendingMessage ? "Sending..." : "Send"}
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
            {/* Members Modal - Replaces the old "New Message" modal */}
            {showMembersModal && (
                <MembersModal
                    members={activeChatMembers} // Pass members specific to the active chat
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onClose={() => {
                        setShowMembersModal(false);
                        setSearchTerm("");
                    }}
                    getStatusColor={getStatusColor}
                    loading={loadingMembers} // Use loading state for members
                    isGroupChat={activeChat && activeChat.type === "group"} // Pass info about active chat type
                />
            )}
            {previewModal.open && previewModal.file && (
                <FilePreviewModal file={previewModal.file} onClose={closePreview} />
            )}
        </div>
    );
};

const MessageBubble = ({ msg, isYou, onFileClick }) => {
    return (
        <div className={`flex gap-2 mb-3 ${isYou ? "justify-end" : ""}`}>
            {!isYou && (
                <div className="w-7 h-7 rounded bg-[#a51d34]/10 text-[#a51d34] flex items-center justify-center text-[11px] font-semibold">
                    {msg.sender?.charAt(0)}
                </div>
            )}
            <div className="max-w-[80%]">
                {!isYou && (
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                        <span className="font-semibold text-gray-700">{msg.sender}</span>
                        <span>{msg.timestamp}</span>
                    </div>
                )}
                <div
                    className={`px-3 py-2 rounded-lg text-[13px] border leading-5 break-words
                        ${isYou
                            ? "bg-[#a51d34] text-white border-[#a51d34] rounded-br-none"
                            : "bg-white text-gray-900 border-gray-200 rounded-bl-none"
                        }`}
                >
                    {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}
                    {Array.isArray(msg.files) && msg.files.length > 0 && (
                        <div className={`mt-1 ${isYou ? "text-white" : "text-gray-800"}`}>
                            {msg.files.map((f, idx) => {
                                const isImage = f.type === "image";
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => onFileClick(f)}
                                        className="mt-1 cursor-pointer inline-block"
                                    >
                                        {isImage ? (
                                            <img
                                                src={f.url}
                                                alt={f.fileName}
                                                className="max-w-[180px] max-h-[180px] w-auto h-auto object-contain rounded border border-white/20"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border ${isYou ? "border-white/40" : "border-gray-300"} bg-gray-50`}>
                                                <Paperclip className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="text-[12px] truncate max-w-[100px]">{f.fileName}</span>
                                                <Eye className="w-3 h-3 flex-shrink-0" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className={`text-[10px] opacity-70 mt-1 ${isYou ? "text-white" : "text-gray-500"}`}>
                        {msg.timestamp}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilePreviewModal = ({ file, onClose }) => {
    const isImage = file.type === "image";
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative">
                <div className="flex justify-between items-center p-3 border-b">
                    <span className="font-medium truncate max-w-[80%]">{file.fileName}</span>
                    <div className="flex gap-2">
                        <a
                            href={file.url}
                            target="_blank"
                            download={file.fileName}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Download"
                        >
                            <Download className="w-4 h-4 text-gray-700" />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Close"
                        >
                            <X className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>
                <div className="p-4 overflow-auto max-h-[70vh] flex items-center justify-center bg-gray-50">
                    {isImage ? (
                        <img
                            src={file.url}
                            alt={file.fileName}
                            className="max-w-full max-h-[60vh] object-contain"
                            onError={(e) => {
                                e.target.parentElement.innerHTML = `<div class="text-center text-red-500">Failed to load image</div>`;
                            }}
                        />
                    ) : (
                        <div className="text-center py-8 px-6">
                            <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-4 font-medium">{file.fileName}</p>
                            <a
                                href={file.url}
                                download={file.fileName}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#a51d34] text-white rounded hover:brightness-110"
                            >
                                <Download className="w-4 h-4" />
                                Download File
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Updated MembersModal component to show members of the active chat
const MembersModal = ({ members, searchTerm, setSearchTerm, onClose, getStatusColor, loading, isGroupChat }) => {
    // Filter members based on search term
    const filtered = members.filter((m) =>
        m.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center p-4 border-b bg-[#a51d34] text-white rounded-t-lg">
                    <span className="font-semibold">
                        {isGroupChat ? "Group Members" : "Members"}
                    </span>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-3 border-b">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search members..."
                            className="w-full pl-7 pr-3 py-2 border rounded text-[13px] focus:ring-1 focus:ring-[#a51d34]"
                        />
                    </div>
                </div>
                <div className="p-3 max-h-[65vh] overflow-y-auto space-y-2">
                    {loading ? (
                        <div className="text-center text-gray-500 py-6 text-sm">Loading members...</div>
                    ) : isGroupChat ? (
                        // Show members if it's a group chat
                        filtered.length ? (
                            filtered.map((m) => (
                                <div key={m._id} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50">
                                    <div className="w-8 h-8 rounded-full bg-[#a51d34]/10 text-[#a51d34] flex items-center justify-center font-semibold">
                                        {m.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-[13px] truncate">{m.name || "Unknown User"}</div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {m.role || "Member"}
                                        </div>
                                    </div>
                                    <span className={`w-3 h-3 rounded-full ${getStatusColor(m.status || "offline")}`} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-6 text-sm">No members found.</div>
                        )
                    ) : (
                        // Show message if it's not a group chat
                        <div className="text-center text-gray-500 py-6 text-sm">
                            Members can only be viewed in group chats.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentChats;