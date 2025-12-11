/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { Button } from "@components/Button";
import { Divider } from "@components/Divider";
import { Heading } from "@components/Heading";
import { Devs } from "@utils/constants";
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

const KaomojiButton: ChatBarButtonFactory = ({ isMainChat }) => {
    if (!isMainChat) return null;

    return (
        <ChatBarButton
            tooltip="Open Kaomoji Picker"
            onClick={() => {
                const key = openModal(modalProps => (
                    <KaomojiModal
                        rootProps={modalProps}
                        close={() => closeModal(key)}
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

const KaomojiModal = ({ rootProps, close }: { rootProps: ModalProps; close: () => void; }) => {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader>
                <Heading style={{ flexGrow: 1 }}>Kaomoji Picker</Heading>
                <ModalCloseButton onClick={close} />
            </ModalHeader>
            <Divider />
            <ModalContent>
                <KaomojiPickerContent close={close} />
            </ModalContent>
        </ModalRoot>
    );
};

const KaomojiPickerContent = ({ close }: { close: () => void; }) => {
    const kaomojis = [
        "( •̀ ‿‿ •́)",
        "/ᐠ - ˕ -マ",
        "( ͡° ͜ʖ ͡°)",
        "(╯°□°）╯︵ ┻━┻",
        "(ಠ_ಠ)",
        "(づ｡◕‿‿◕｡)づ"
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "8px"
            }}
        >
            {kaomojis.map(kaomoji => (
                <Button
                    key={kaomoji}
                    variant="primary"
                    size="medium"
                    onClick={() => {
                        insertTextIntoChatInputBox(kaomoji);
                        close();
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
    authors: [Devs.Ven],
    description: "Adds a Kaomoji picker to the chat bar.",
    renderChatBarButton: KaomojiButton
});
