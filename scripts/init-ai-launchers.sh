#!/bin/bash
# AI 규약 진입점(Launcher) 자동 생성 스크립트
# 파일이 존재하지 않을 때만 최소한의 포인터 지시문을 생성해요.

TARGET_FILES=(
  "GEMINI.md"
  "CLAUDE.md"
  ".agent/rules/persona-router.md"
  ".cursor/rules/persona-router.mdc"
  ".github/copilot-instructions.md"
)

LAUNCHER_TEXT="작업을 시작하기 전에 최상위 진입점인 \`.ai/index.md\` 파일을 꼭 읽고 내용을 확인해주세요."

for target in "${TARGET_FILES[@]}"; do
  target_dir=$(dirname "$target")

  # 디렉토리가 없으면 생성
  if [ ! -d "$target_dir" ]; then
    mkdir -p "$target_dir"
  fi

  # 파일이 없을 경우에만 생성
  if [ ! -f "$target" ]; then
    echo "$LAUNCHER_TEXT" > "$target"
    echo "✅ Launcher를 만들었어요: $target"
  fi
done

echo "🚀 AI Launcher 설정을 마쳤어요!"
