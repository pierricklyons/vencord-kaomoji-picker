/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import { Devs } from "@utils/constants";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, openModal } from "@utils/modal";
import definePlugin from "@utils/types";

const Modal = (props: ModalProps) => {
    return (
        <ModalRoot {...props}>
            <ModalHeader>
            </ModalHeader>
            <ModalContent>
                <BaseText>
                    {"hiyaaa heyy hello"}
                </BaseText>
            </ModalContent>
            <ModalFooter>
                <Button onClick={props.onClose}>
                    Close
                </Button>
            </ModalFooter>
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
                    <Modal {...modalProps} />
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
    name: "Kaomoji Picker",
    description: "Adds a Kaomoji picker to the chat box.",
    authors: [Devs.Ven],

    renderChatBarButton: KaomojiButton,
});
