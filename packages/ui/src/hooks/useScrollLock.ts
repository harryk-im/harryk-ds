import { useEffect } from "react";

/**
 * body 스크롤을 잠그는 훅이에요.
 * overflow: hidden 방식을 사용하여 스크롤 위치가 유지돼요.
 *
 * @param isLocked - 스크롤 잠금 여부
 */
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
};
