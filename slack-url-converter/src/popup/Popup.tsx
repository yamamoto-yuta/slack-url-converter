import { faArrowDown, faArrowsRotate, faChevronDown, faCopy, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./Popup.scss";

export default function Popup() {
  const [workspaceIdUrl, setWorkspaceIdUrl] = React.useState("");
  const [appSlackUrl, setAppSlackUrl] = React.useState("");
  const [clientBaseSlackUrl, setClientBaseSlackUrl] = React.useState("");

  const onClickApply = () => {
    chrome.storage.sync.set({ 'clientBaseSlackUrl': clientBaseSlackUrl });
  };

  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });

    chrome.storage.sync.get(['clientBaseSlackUrl'], (result) => {
      setClientBaseSlackUrl(result.clientBaseSlackUrl);
    });
  }, []);

  return (
    <div className="popupContainer">
      <div className="flex">
        <TextField
          id="workspace-url-textfield"
          label="<workspace_id>.slack.com"
          variant="outlined"
          sx={{ width: "100%" }}
          value={workspaceIdUrl}
          onChange={(e) => setWorkspaceIdUrl(e.target.value)}
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
          id="client-url-textfield"
          label="app.slack.com"
          variant="outlined"
          sx={{ width: "100%" }}
          value={appSlackUrl}
          onChange={(e) => setAppSlackUrl(e.target.value)}
        />
        <Button
          variant="contained">
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </div>

      <Divider
        sx={{ my: 2 }}
      />

      <div>
        <Accordion
          sx={{ width: "100%" }}
        >
          <AccordionSummary
            expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
          >
            <Typography>
              <FontAwesomeIcon icon={faGear} /> Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="flex">
            <TextField
              id="client-base-url-textfield"
              label="https://app.slack.com/client/*********/"
              variant="outlined"
              sx={{ width: "100%" }}
              value={clientBaseSlackUrl}
              onChange={(e) => setClientBaseSlackUrl(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={onClickApply}
            >
              Apply
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
