import { FadeIn } from '@harryk-ds/motion'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Motion/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FadeIn 컴포넌트는 Framer Motion을 사용한 페이드 인 애니메이션 컴포넌트입니다. 다양한 방향과 설정을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: '애니메이션 지속 시간 (초)',
    },
    delay: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      description: '애니메이션 지연 시간 (초)',
    },
    direction: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right', 'none'],
      description: '애니메이션 방향',
    },
    distance: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: '초기 이동 거리 (픽셀)',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FadeIn>

export default meta
type Story = StoryObj<typeof meta>

// 기본 스토리
export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        안녕하세요! 👋
      </div>
    ),
  },
}

// 방향별 스토리들
export const FadeUp: Story = {
  args: {
    direction: 'up',
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3',
        }}
      >
        위에서 아래로 페이드인
      </div>
    ),
  },
}

export const FadeDown: Story = {
  args: {
    direction: 'down',
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f3e5f5',
          borderRadius: '8px',
          border: '2px solid #9c27b0',
        }}
      >
        아래에서 위로 페이드인
      </div>
    ),
  },
}

export const FadeLeft: Story = {
  args: {
    direction: 'left',
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          border: '2px solid #4caf50',
        }}
      >
        오른쪽에서 왼쪽으로 페이드인
      </div>
    ),
  },
}

export const FadeRight: Story = {
  args: {
    direction: 'right',
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '2px solid #ff9800',
        }}
      >
        왼쪽에서 오른쪽으로 페이드인
      </div>
    ),
  },
}

export const FadeOnly: Story = {
  args: {
    direction: 'none',
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          border: '2px solid #f44336',
        }}
      >
        이동 없이 페이드인만
      </div>
    ),
  },
}

// 지속 시간 및 지연 시간 스토리들
export const SlowAnimation: Story = {
  args: {
    duration: 1.5,
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f0f4c3',
          borderRadius: '8px',
        }}
      >
        느린 애니메이션 (1.5초)
      </div>
    ),
  },
}

export const FastAnimation: Story = {
  args: {
    duration: 0.3,
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#e1bee7',
          borderRadius: '8px',
        }}
      >
        빠른 애니메이션 (0.3초)
      </div>
    ),
  },
}

export const DelayedAnimation: Story = {
  args: {
    delay: 1,
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#b3e5fc',
          borderRadius: '8px',
        }}
      >
        1초 지연 후 애니메이션
      </div>
    ),
  },
}

// 거리 설정 스토리들
export const LongDistance: Story = {
  args: {
    distance: 80,
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#c8e6c9',
          borderRadius: '8px',
        }}
      >
        긴 거리 이동 (80px)
      </div>
    ),
  },
}

export const ShortDistance: Story = {
  args: {
    distance: 5,
    children: (
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#ffcdd2',
          borderRadius: '8px',
        }}
      >
        짧은 거리 이동 (5px)
      </div>
    ),
  },
}

// 실제 사용 예시
export const CardExample: Story = {
  args: {
    duration: 0.8,
    delay: 0.2,
    direction: 'up',
    distance: 30,
    children: (
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>카드 컴포넌트</h3>
        <p style={{ margin: '0 0 1.5rem 0', color: '#666', lineHeight: 1.5 }}>
          이것은 FadeIn 애니메이션이 적용된 카드 컴포넌트의 예시입니다.
        </p>
        <button
          style={{
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          액션 버튼
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          '실제 UI에서 사용할 수 있는 카드 컴포넌트에 FadeIn 애니메이션을 적용한 예시입니다.',
      },
    },
  },
}
