import type React from "react";
import type { modalSize } from "./modal.css";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  children?: React.ReactNode;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export type ModalSize = keyof typeof modalSize;
