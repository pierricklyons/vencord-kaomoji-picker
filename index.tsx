/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { Button } from "@components/Button";
import { Divider } from "@components/Divider";
import { Heading } from "@components/Heading";
import { insertTextIntoChatInputBox } from "@utils/discord";
import {
    closeModal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalProps,
    ModalRoot,
    openModal
} from "@utils/modal";
import definePlugin from "@utils/types";

const KAOMOJIS = [
    "( •̀ ‿‿ •́)",
    "/ᐠ - ˕ -マ",
    "( ͡° ͜ʖ ͡°)",
    "(╯°□°）╯︵ ┻━┻",
    "(ಠ_ಠ)",
    "(づ｡◕‿‿◕｡)づ"
];

const KaomojiButton: ChatBarButtonFactory = ({ isMainChat }) => {
    if (!isMainChat) return null;

    return (
        <ChatBarButton
            tooltip="Open Kaomoji Picker"
            onClick={() => {
                const modalKey = openModal(modalProps => (
                    <KaomojiModal
                        rootProps={modalProps}
                        modalKey={modalKey}
                    />
                ));
            }}
            buttonProps={{
                "aria-haspopup": "dialog"
            }}
        >
            {"Kao"}
        </ChatBarButton>
    );
};


const KaomojiModal = ({
    rootProps,
    modalKey
}: {
    rootProps: ModalProps;
    modalKey: string;
}) => {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader>
                <Heading style={{ flexGrow: 1 }}>
                    Kaomoji Picker
                </Heading>
                <ModalCloseButton onClick={() => closeModal(modalKey)} />
            </ModalHeader>
            <Divider />
            <ModalContent>
                <KaomojiPickerContent modalKey={modalKey} />
            </ModalContent>
        </ModalRoot>
    );
};

const KaomojiPickerContent = ({ modalKey }: { modalKey: string; }) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "8px"
            }}
        >
            {KAOMOJIS.map(kaomoji => (
                <Button
                    key={kaomoji}
                    variant="primary"
                    size="medium"
                    onClick={() => {
                        insertTextIntoChatInputBox(kaomoji);
                        closeModal(modalKey);
                    }}
                >
                    {kaomoji}
                </Button>
            ))}
        </div>
    );
};

export default definePlugin({
    name: "KaomojiPicker",
    authors: [{ name: "flyingmisaki", id: 0n }],
    description: "Adds a Kaomoji picker to the chat bar.",
    renderChatBarButton: KaomojiButton
});
