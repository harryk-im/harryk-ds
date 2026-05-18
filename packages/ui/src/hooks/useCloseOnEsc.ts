import { useEffect } from "react";

/**
 * ESC 키 입력 시 onClose를 호출하는 훅이에요.
 * Modal, Drawer 등 오버레이 컴포넌트에서 키보드 닫기 기능을 분리할 때 사용해요.
 *
 * @param isOpen - 현재 열림 상태
 * @param onClose - 닫기 함수
 */
export const useCloseOnEsc = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
};
