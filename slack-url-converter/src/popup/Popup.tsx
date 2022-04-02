import { faArrowDown, faArrowsRotate, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="popupContainer">
      <div className="flex">
        <TextField
          id="workspace-id-slack-com-textfield"
          label="<workspace_id>.slack.com"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained">
          <FontAwesomeIcon icon={faArrowsRotate} />
        </Button>
      </div>
      <div>
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <div className="flex">
        <TextField
          id="app-slack-com-textfield"
          label="app.slack.com"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained">
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </div>
    </div>
  );
}
