import type React from "react";
import type { modalSize } from "./modal.css";

/**
 * Modal 컴포넌트의 Props예요.
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 모달의 열림 상태를 결정해요.
   */
  isOpen: boolean;

  /**
   * 모달을 닫을 때 호출되는 함수예요.
   * Overlay 클릭, ESC 키 입력 시에도 호출돼요.
   */
  onClose: () => void;

  /**
   * 모달의 너비를 결정해요.
   * @default "md"
   */
  size?: ModalSize;

  /**
   * 모달 내부에 들어갈 콘텐츠예요.
   * 보통 Modal.Header, Modal.Body, Modal.Footer를 사용해요.
   */
  children?: React.ReactNode;
}

/**
 * Modal.Header 컴포넌트의 Props예요.
 */
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 헤더 우측의 닫기(X) 버튼을 클릭했을 때 호출되는 함수예요.
   * 이 prop이 없으면 닫기 버튼이 렌더링되지 않아요.
   */
  onClose?: () => void;
  children?: React.ReactNode;
}

/**
 * Modal.Body 컴포넌트의 Props예요.
 */
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Modal.Footer 컴포넌트의 Props예요.
 */
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * 모달의 너비를 지정해요.
 * - `sm`: 360px 너비예요.
 * - `md`: 540px 너비예요.
 * - `lg`: 720px 너비예요.
 */
export type ModalSize = keyof typeof modalSize;
