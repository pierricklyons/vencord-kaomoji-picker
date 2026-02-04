/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Divider } from "@components/Divider";
import { Grid } from "@components/Grid";
import { insertTextIntoChatInputBox } from "@utils/discord";
import definePlugin from "@utils/types";
import { Popout, TextInput, useRef, useState } from "@webpack/common";

import kaomojiByCategory from "./kaomoji.json";

type KaomojiEntry = {
    text: string;
    subCategory: string;
};

const KAOMOJIS: KaomojiEntry[] = [];

for (const value of Object.values(kaomojiByCategory as Record<string, Record<string, string[]>>)) {
    for (const [subCategory, list] of Object.entries(value)) {
        for (const text of list) {
            KAOMOJIS.push({ text, subCategory });
        }
    }
}

const KaomojiPickerContent = ({ maxResults = 250, onPick }: { maxResults?: number, onPick: () => void; }) => {
    const [query, setQuery] = useState("");

    const q = query.trim().toLowerCase();

    const results = q === ""
        ? []
        : KAOMOJIS.filter(
            ({ text, subCategory }) =>
                text.includes(query) || subCategory.toLowerCase().includes(q)
        ).slice(0, maxResults);

    return (
        <Card
            style={{
                width: 300,
                height: 419, // emoji picker height lmao
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
            autoFocus
        >
            <TextInput
                value={query}
                placeholder="Search kaomoji..."
                onChange={setQuery}
                autoFocus
            />

            <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                {results.length > 0 && (
                    <Grid columns={2} gap="8px">
                        {results.map(({ text }) => (
                            <Button
                                key={text}
                                size="medium"
                                onClick={() => {
                                    onPick();
                                    insertTextIntoChatInputBox(text);
                                }}
                            >
                                {text}
                            </Button>
                        ))}
                    </Grid>
                )}

                {q.length > 0 && results.length === 0 && (
                    <BaseText style={{ textAlign: "center", opacity: 0.5 }}>No results</BaseText>
                )}
            </div>
        </Card>
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
            spacing={8}
            onRequestClose={() => setShow(false)}
            targetElementRef={buttonRef}
            renderPopout={() => (
                <KaomojiPickerContent onPick={() => setShow(false)} />
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
