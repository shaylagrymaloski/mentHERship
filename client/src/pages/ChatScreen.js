import "../App.css";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
  s,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import axios from "axios";
import { ChatItem } from "../components/ChatItem/ChatItem";
import { Client } from "twilio-chat";

export const ChatScreen = () => {
  const [text, setText] = useState("");
  const [messages, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [channel, setChannel] = useState("");

  const styles = {
    textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
    textFieldContainer: { flex: 1, marginRight: 12 },
    gridItem: { paddingTop: 12, paddingBottom: 12 },
    gridItemChatList: { overflow: "auto", height: "70vh" },
    gridItemMessage: { marginTop: 12, marginBottom: 12 },
    sendButton: { backgroundColor: "#3f51b5" },
    sendIcon: { color: "white" },
    mainGrid: { paddingTop: 100, borderWidth: 1 },
  };

  const room = 1;
  const email = "shayla15@me.com";
  const scrollDiv = React.createRef();

  function scrollToBottom() {
    const scrollHeight = scrollDiv.current.scrollHeight;
    const height = scrollDiv.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  async function joinChannel(channel) {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }
    setChannel(channel);

    channel.on("messageAdded", this.handleMessageAdded);
    scrollToBottom();
  }

  function handleMessageAdded(message) {
    setMessage(message);
    scrollToBottom();
  }

  async function getToken(email) {
    const response = await axios.get(`http://localhost:5000/token/${email}`);
    const { data } = response;
    return data.token;
  }

  function sendMessage() {
    if (text) {
      setLoading(true);
      channel.sendMessage(String(text).trim());
      setText("");
      setLoading(false);
    }
  }

  async function componentDidMount() {
    //const { location } = this.props;
    // const { state } = location || {};
    //const { email, room } = state || {};
    let token = "";

    if (!email || !room) {
      //  this.props.history.replace("/");
    }

    setLoading(true);

    try {
      token = await getToken(email);
    } catch {
      throw new Error("Unable to get token, please reload this page");
    }

    const client = await Client.create(token);

    client.on("tokenAboutToExpire", async () => {
      const token = await getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await getToken(email);
      client.updateToken(token);
    });

    client.on("channelJoined", async (channel) => {
      // getting list of all messages since this is an existing channel
      const messages = await channel.getMessages();
      this.setState({ messages: messages.items || [] });
      this.scrollToBottom();
    });

    try {
      const channel = await client.getChannelByUniqueName(room);
      this.joinChannel(channel);
    } catch (err) {
      try {
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });

        this.joinChannel(channel);
      } catch {
        throw new Error("Unable to create channel, please reload this page");
      }
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Backdrop open={loading} style={{ zIndex: 99999 }}>
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>

      <AppBar elevation={10}>
        <Toolbar>
          <Typography variant="h6">{`Room: ${room}, User: ${email}`}</Typography>
        </Toolbar>
      </AppBar>

      <CssBaseline />

      <Grid container direction="column" style={styles.mainGrid}>
        <Grid item style={styles.gridItemChatList} ref={scrollDiv}>
          <List dense={true}>
            {messages &&
              messages.map((message) => (
                <ChatItem key={message.index} message={message} email={email} />
              ))}
          </List>
        </Grid>

        <Grid item style={styles.gridItemMessage}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item style={styles.textFieldContainer}>
              <TextField
                required
                style={styles.textField}
                placeholder="Enter message"
                variant="outlined"
                multiline
                rows={2}
                value={text}
                disabled={!channel}
                onChange={(e) => setText(e.value)}
              />
            </Grid>

            <Grid item>
              <IconButton
                style={styles.sendButton}
                onClick={sendMessage}
                disabled={!channel}
              >
                <Send style={styles.sendIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
