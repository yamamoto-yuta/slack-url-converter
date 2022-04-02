import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="popupContainer">
      <TextField
        id="workspace-id-slack-com"
        label="<workspace_id>.slack.com"
        variant="outlined"
        sx={{ width: "100%" }}
      />
    </div>
  );
}
