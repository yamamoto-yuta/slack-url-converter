const CHANNEL_ID_PATTERN = "[A-Z0-9]+";
const WORKSPACE_MESSAGE_ID_PATTERN = "p[0-9]{16}";
const CLIENT_MESSAGE_ID_PATTERN = "[0-9]{10}.[0-9]{6}";
const clientMessageIdRegex = new RegExp(CLIENT_MESSAGE_ID_PATTERN);

export const convertWorkspaceUrlToClientUrl = (workspaceUrl: string, clientUrl: string, url: string) => {
    const workspaceUrlPattern = `^${workspaceUrl}archives/`;

    const workspaceChannelPattern = `${workspaceUrlPattern}${CHANNEL_ID_PATTERN}`;
    const workspaceMessagePattern = `${workspaceChannelPattern}/${WORKSPACE_MESSAGE_ID_PATTERN}`;
    const workspaceThredMessagePattern = `${workspaceMessagePattern}\\?thread_ts=${CLIENT_MESSAGE_ID_PATTERN}&cid=${CHANNEL_ID_PATTERN}`;
    const workspaceChannelRegex = new RegExp(workspaceChannelPattern);
    const extractChannelIdFromWorkspaceUrl = (workspaceUrl: string): string => workspaceChannelRegex.exec(workspaceUrl)[0].split("/").slice(-1)[0];
    const workspaceMessageRegex = new RegExp(workspaceMessagePattern);
    const extractMessageIdFromWorkspaceUrl = (workspaceUrl: string): string => workspaceMessageRegex.exec(workspaceUrl)[0].split("/").slice(-1)[0];
    const workspaceThreadMessageRegex = new RegExp(workspaceThredMessagePattern);
    const extractThreadMessageIdFromWorkspaceUrl = (workspaceUrl: string): string => clientMessageIdRegex.exec(workspaceThreadMessageRegex.exec(workspaceUrl)[0].split("?").slice(-1)[0])[0];

    if (workspaceThreadMessageRegex.test(url)) {
        const channelId = extractChannelIdFromWorkspaceUrl(url);
        const clientThreadMessageId = extractThreadMessageIdFromWorkspaceUrl(url);
        return `${clientUrl}${channelId}/thread/${channelId}-${clientThreadMessageId}`;
    } else if (workspaceMessageRegex.test(url)) {
        const channelId = extractChannelIdFromWorkspaceUrl(url);
        const workspaceMessageId = extractMessageIdFromWorkspaceUrl(url);
        const clientMessageId = `${workspaceMessageId.slice(1, 11)}.${workspaceMessageId.slice(11, 11 + 6)}`;
        return `${clientUrl}${channelId}/${clientMessageId}`;
    } else if (workspaceChannelRegex.test(url)) {
        const channelId = extractChannelIdFromWorkspaceUrl(url)
        return `${clientUrl}${channelId}`;
    } else {
        console.log("undefined url");
        return "";
    }
}
