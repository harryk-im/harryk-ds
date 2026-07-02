import { Button, Modal, useDisclosure } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * Modal 컴포넌트는 사용자에게 중요한 정보를 전달하거나 확인을 요청할 때 사용해요.
 * `useDisclosure` 훅과 함께 사용하면 열림/닫힘 상태를 쉽게 관리할 수 있어요.
 */
const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "모달의 너비를 결정해요.",
    },
    isOpen: {
      control: false,
      table: { disable: true },
      description:
        "모달의 열림 상태예요. 스토리에서는 useDisclosure로 관리해요.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/**
 * 모달의 기본 사용 예시예요. 버튼을 클릭하여 모달을 열고 닫을 수 있어요.
 */
export const Default: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button onClick={onOpen}>모달 열기</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose}>
          <Modal.Header onClose={onClose}>안내 메세지</Modal.Header>
          <Modal.Body>
            Harryk 디자인 시스템의 모달 컴포넌트예요. <br />
            Compound Component 패턴을 사용하여 Header, Body, Footer를 자유롭게
            조합할 수 있어요.
          </Modal.Body>
          <Modal.Footer>
            <Button color="grey" variant="weak" onClick={onClose}>
              취소
            </Button>
            <Button onClick={onClose}>확인</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  args: {
    size: "md",
  },
};

/**
 * 작은 사이즈(`sm`)의 모달이에요. 간단한 확인 문구를 노출할 때 적합해요.
 */
export const Small: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button onClick={onOpen}>작은 모달 열기</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose}>
          <Modal.Header onClose={onClose}>삭제 확인</Modal.Header>
          <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button color="grey" variant="weak" onClick={onClose} size="sm">
              취소
            </Button>
            <Button onClick={onClose} size="sm">
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  args: {
    size: "sm",
  },
};

/**
 * 중간 사이즈(`md`)의 모달이에요. 가장 범용적으로 사용되는 사이즈예요.
 */
export const Medium: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button onClick={onOpen}>중간 모달 열기</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose}>
          <Modal.Header onClose={onClose}>설정 변경</Modal.Header>
          <Modal.Body>
            알림 설정을 변경하시겠습니까? <br />이 변경사항은 모든 기기에 즉시
            적용됩니다.
          </Modal.Body>
          <Modal.Footer>
            <Button color="grey" variant="weak" onClick={onClose}>
              취소
            </Button>
            <Button onClick={onClose}>변경하기</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  args: {
    size: "md",
  },
};

/**
 * 큰 사이즈(`lg`)의 모달이에요. 많은 양의 데이터나 복잡한 폼을 보여줄 때 사용해요.
 */
export const Large: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button onClick={onOpen}>큰 모달 열기</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose}>
          <Modal.Header onClose={onClose}>이용 약관</Modal.Header>
          <Modal.Body>
            <div>
              제 1 조 (목적) <br />이 약관은 harryk-ds이(가) 제공하는 서비스의
              이용조건 및 절차, 이용자와 서비스 운영자의 권리, 의무, 책임사항
              등을 규정함을 목적으로 합니다. <br />
              <br />제 2 조 (용어의 정의) <br />
              1. "서비스"라 함은 harryk-ds이(가) 제공하는 모든 기능을
              의미합니다. <br />
              2. "이용자"라 함은 본 서비스를 이용하는 사용자를 의미합니다.
              <br />
              <br />
              ... (생략)
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>확인</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  args: {
    size: "lg",
  },
};
