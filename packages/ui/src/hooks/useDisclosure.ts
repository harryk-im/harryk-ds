import { useCallback, useState } from "react";

/**
 * boolean 상태와 관련 제어 함수를 반환하는 범용 훅이에요.
 * Modal, Drawer, Accordion 등 열림/닫힘 상태가 필요한 컴포넌트에서 사용할 수 있어요.
 *
 * @param defaultIsOpen - 초기 열림 상태 (기본값: false)
 * @returns isOpen 상태와 onOpen, onClose, onToggle 함수
 */
export const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, onOpen, onClose, onToggle } as const;
};
