import { faArrowDown, faArrowsRotate, faChevronDown, faCopy, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./Popup.scss";
import { CLIENT_BASE_URL_PATTERN, convertWorkspaceUrlToClientUrl, WORKSPACE_BASE_URL_PATTERN } from "./utils";

export default function Popup() {

  const [workspaceUrl, setWorkspaceUrl] = React.useState("");
  const [clientUrl, setClientUrl] = React.useState("");

  const [clientBaseUrl, setClientBaseUrl] = React.useState("");
  const [workspaceBaseUrl, setWorkspaceBaseUrl] = React.useState("");

  const inputRefClientBaseUrl = React.useRef(null);
  const inputRefWorkspaceBaseUrl = React.useRef(null);

  const [isClientBaseUrlValid, setIsClientBaseUrlValid] = React.useState(false);
  const [isWorkspaceBaseUrlValid, setIsWorkspaceBaseUrlValid] = React.useState(false);

  const onClickConvert = () => {
    const converted_url = convertWorkspaceUrlToClientUrl(
      workspaceBaseUrl,
      clientBaseUrl,
      workspaceUrl
    );
    setClientUrl(converted_url);
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(clientUrl)
      .then(
        () => { },
        (err) => { console.error("Failed to copy to clipboard", err) }
      );
  };

  const onChangeClientBaseUrlTextField = (inputUrl: string) => {
    setClientBaseUrl(inputUrl);
    if (inputRefClientBaseUrl.current) {
      const ref = inputRefClientBaseUrl.current;
      if (ref.validity.valid) {
        setIsClientBaseUrlValid(true);
      } else {
        setIsClientBaseUrlValid(false);
      }
    }
  };

  const onChangeWorkspaceBaseUrlTextField = (inputUrl: string) => {
    setWorkspaceBaseUrl(inputUrl);
    if (inputRefWorkspaceBaseUrl.current) {
      const ref = inputRefWorkspaceBaseUrl.current;
      if (ref.validity.valid) {
        setIsWorkspaceBaseUrlValid(true);
      } else {
        setIsWorkspaceBaseUrlValid(false);
      }
    }
  };

  const onClickApplyButton = () => {
    chrome.storage.sync.set({
      'clientBaseUrl': clientBaseUrl,
      'workspaceBaseUrl': workspaceBaseUrl
    });
  };

  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });

    chrome.storage.sync.get(
      ['clientBaseUrl', 'workspaceBaseUrl'],
      (result) => {
        setClientBaseUrl(result.clientBaseUrl);
        setWorkspaceBaseUrl(result.workspaceBaseUrl);
        onChangeClientBaseUrlTextField(result.clientBaseUrl);
        onChangeWorkspaceBaseUrlTextField(result.workspaceBaseUrl);
      }
    );
  }, []);

  return (
    <div className="popupContainer">
      <div className="flex">
        <TextField
          id="workspace-url-textfield"
          label="<workspaceId>.slack.com"
          variant="outlined"
          sx={{ width: "100%" }}
          value={workspaceUrl}
          onChange={(e) => setWorkspaceUrl(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={onClickConvert}
        >
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
          value={clientUrl}
          onChange={(e) => setClientUrl(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={onClickCopy}
        >
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
          <AccordionDetails>
            <div>
              <TextField
                id="client-base-url-textfield"
                label="https://app.slack.com/client/*********/"
                variant="outlined"
                sx={{ width: "100%", my: 1 }}
                value={clientBaseUrl}
                onChange={(e) => onChangeClientBaseUrlTextField(e.target.value)}
                required
                inputProps={{ pattern: CLIENT_BASE_URL_PATTERN }}
                inputRef={inputRefClientBaseUrl}
                helperText={inputRefClientBaseUrl?.current?.validationMessage}
                error={!isClientBaseUrlValid}
              />
            </div>
            <div>
              <TextField
                id="workspace-base-url-textfield"
                label="https://<workspaceId>.slack.com/archives/***********/"
                variant="outlined"
                sx={{ width: "100%", my: 1 }}
                value={workspaceBaseUrl}
                onChange={(e) => onChangeWorkspaceBaseUrlTextField(e.target.value)}
                required
                inputProps={{ pattern: WORKSPACE_BASE_URL_PATTERN }}
                inputRef={inputRefWorkspaceBaseUrl}
                helperText={inputRefClientBaseUrl?.current?.validationMessage}
                error={!isWorkspaceBaseUrlValid}
              />
            </div>
            <div>
              <Button
                variant="contained"
                onClick={onClickApplyButton}
                sx={{ my: 1 }}
                disabled={!isClientBaseUrlValid && !isWorkspaceBaseUrlValid}
              >
                Apply
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
