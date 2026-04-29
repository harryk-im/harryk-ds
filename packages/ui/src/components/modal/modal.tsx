import React from "react";
import { createPortal } from "react-dom";
import { IconClose } from "../../assets/icons";
import { useCloseOnEsc } from "../../hooks/useCloseOnEsc";
import { useScrollLock } from "../../hooks/useScrollLock";
import {
  closeButtonStyle,
  modalBodyStyle,
  modalContentStyle,
  modalFooterStyle,
  modalHeaderStyle,
  overlayStyle,
} from "./modal.css";
import type {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from "./modal.types";

/**
 * 사용자에게 중요한 정보를 전달하거나 상호작용을 유도할 때 사용하는 모달 컴포넌트예요.
 * Controlled Component로 동작하며, `createPortal`을 통해 body 하단에 렌더링돼요.
 *
 * @example
 * ```tsx
 * const { isOpen, onOpen, onClose } = useDisclosure();
 *
 * <Button onClick={onOpen}>모달 열기</Button>
 * <Modal isOpen={isOpen} onClose={onClose} size="md">
 *   <Modal.Header onClose={onClose}>안내</Modal.Header>
 *   <Modal.Body>내용이 들어갑니다.</Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={onClose}>확인</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const ModalRoot = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, size = "md", children, ...props }, ref) => {
    useCloseOnEsc(isOpen, onClose);
    useScrollLock(isOpen);

    if (!isOpen) return null;

    return createPortal(
      <div ref={ref} className={overlayStyle} onMouseDown={onClose} {...props}>
        <div
          className={modalContentStyle({ size })}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

ModalRoot.displayName = "Modal";

/**
 * 모달의 상단 영역으로 제목과 닫기 버튼을 포함해요.
 */
const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ onClose, className, children, ...props }, ref) => {
    const classes = [modalHeaderStyle, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        <div>{children}</div>
        {onClose && (
          <button type="button" className={closeButtonStyle} onClick={onClose}>
            <IconClose />
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = "Modal.Header";

/**
 * 모달의 본문 영역이에요.
 */
const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => {
    const classes = [modalBodyStyle, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = "Modal.Body";

/**
 * 모달의 하단 영역으로 주로 액션 버튼들을 배치해요.
 */
const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => {
    const classes = [modalFooterStyle, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "Modal.Footer";

/**
 * Modal 컴포넌트예요. Header, Body, Footer를 조합하여 사용해요.
 */
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
