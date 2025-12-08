/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { Devs } from "@utils/constants";
import { insertTextIntoChatInputBox } from "@utils/discord";
import { closeModal, ModalContent, ModalHeader, ModalProps, ModalRoot, openModal } from "@utils/modal";
import definePlugin from "@utils/types";

const KaomojiPickerContent = ({ close }: { close: () => void; }) => {
    const kaomojis = [
        "( •̀ ‿‿ •́)",
        "/ᐠ - ˕ -マ",
        "( ͡° ͜ʖ ͡°)",
        "(╯°□°）╯︵ ┻━┻",
        "(ಠ_ಠ)",
        "(づ｡◕‿‿◕｡)づ",
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
            {kaomojis.map(kaomoji => (
                <Button
                    key={kaomoji}
                    size="small"
                    style={{
                        padding: "8px",
                        fontSize: "20px",
                        minHeight: "40px",
                    }}
                    onClick={() => {
                        insertTextIntoChatInputBox(kaomoji);
                        close(); // properly closes now
                    }}
                >
                    {kaomoji}
                </Button>
            ))}
        </div>
    );
};

const KaomojiModal = ({ rootProps, close }: { rootProps: ModalProps; close: () => void; }) => {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader>
                <Heading>Kaomoji Picker</Heading>
            </ModalHeader>
            <ModalContent>
                <KaomojiPickerContent close={close} />
            </ModalContent>
        </ModalRoot>
    );
};

const KaomojiButton: ChatBarButtonFactory = ({ isMainChat }) => {
    if (!isMainChat) return null;

    return (
        <ChatBarButton
            tooltip="Open Kaomoji Picker"
            onClick={() => {
                openModal(modalProps => (
                    <KaomojiModal
                        rootProps={modalProps}
                        close={() => closeModal(modalProps.modalKey)}
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

export default definePlugin({
    name: "KaomojiPicker",
    description: "Adds a Kaomoji picker to the chat bar.",
    authors: [Devs.Ven],
    renderChatBarButton: KaomojiButton,
});
