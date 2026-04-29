import React from "react";
import { createPortal } from "react-dom";

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

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ onClose, className, children, ...props }, ref) => {
    const classes = [modalHeaderStyle, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        <div>{children}</div>
        {onClose && (
          <button type="button" className={closeButtonStyle} onClick={onClose}>
            X
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = "Modal.Header";

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

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
