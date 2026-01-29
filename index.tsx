/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Divider } from "@components/Divider";
import { Grid } from "@components/Grid";
import { Heading } from "@components/Heading";
import { insertTextIntoChatInputBox } from "@utils/discord";
import definePlugin from "@utils/types";
import { Popout, useRef, useState } from "@webpack/common";

const KAOMOJIS = [
    "( •̀ ‿‿ •́)",
    "/ᐠ - ˕ -マ",
    "( ͡° ͜ʖ ͡°)",
    "(╯°□°）╯︵ ┻━┻",
    "(ಠ_ಠ)",
    "(づ｡◕‿‿◕｡)づ"
];

const KaomojiPickerContent = ({ onPick }: { onPick: () => void; }) => {
    return (
        <>
            <Heading>Kaomoji Picker!</Heading>
            <Divider />
            <Grid columns={2} gap="8px">{
                KAOMOJIS.map(kaomoji => (
                    <Button
                        key={kaomoji}
                        variant="primary"
                        size="medium"
                        onClick={() => {
                            onPick();
                            queueMicrotask(() => {
                                insertTextIntoChatInputBox(kaomoji);
                            });
                        }}
                    >
                        {kaomoji}
                    </Button>
                ))
            }</Grid>
        </>
    );
};

const KaomojiButton: ChatBarButtonFactory = ({ isMainChat }) => {
    if (!isMainChat) return null;

    const buttonRef = useRef<HTMLSpanElement>(null);
    const [show, setShow] = useState(false);

    return (
        <Popout
            position="top"
            align="center"
            animation={Popout.Animation.NONE}
            shouldShow={show}
            onRequestClose={() => setShow(false)}
            targetElementRef={buttonRef}
            renderPopout={() => (
                <Card><KaomojiPickerContent onPick={() => setShow(false)} /></Card>

            )}
        >
            {() => (
                <span ref={buttonRef}>
                    <ChatBarButton
                        tooltip="Open Kaomoji Picker"
                        onClick={() => setShow(v => !v)}
                        buttonProps={{
                            "aria-haspopup": "dialog"
                        }}
                    >
                        {"Kao"}
                    </ChatBarButton>
                </span>
            )}
        </Popout>
    );
};

export default definePlugin({
    name: "KaomojiPicker",
    authors: [{ name: "flyingmisaki", id: 0n }],
    description: "Adds a Kaomoji picker to the chat bar.",
    renderChatBarButton: KaomojiButton
});
