#!/bin/bash

PERSONA_DIR=".ai/personas"
ROUTER_FILE="$PERSONA_DIR/router.md"
TARGET_FILES=(
  "GEMINI.md"
  "CLAUDE.md"
  ".agent/rules/persona-router.md"
  ".cursor/rules/persona-router.mdc"
  ".github/copilot-instructions.md"
)

# 1. router.md 존재 확인
if [ ! -f "$ROUTER_FILE" ]; then
  echo "❌ Error: $ROUTER_FILE file not found."
  exit 1
fi

echo "🔄 AI 페르소나 동기화를 진행할게요..."

# 2. 내용 준비
COMBINED_CONTENT=$(cat "$ROUTER_FILE")

# 3. 대상 파일 업데이트
for target in "${TARGET_FILES[@]}"; do
  target_dir=$(dirname "$target")

  # 디렉토리가 없으면 생성
  if [ ! -d "$target_dir" ]; then
    if ! mkdir -p "$target_dir"; then
      echo "❌ Error: $target_dir 디렉토리를 생성할 수 없어요."
      exit 1
    fi
  fi

  # 기존 내용을 완전히 삭제하고 새로운 내용을 다시 작성합니다.
  if ! printf "%s" "$COMBINED_CONTENT" > "$target"; then
    echo "❌ Error: $target 파일을 작성할 수 없어요."
    exit 1
  fi

  echo "✅ 동기화 완료: $target"
done

echo "🚀 AI 페르소나 변경사항을 성공적으로 동기화 했어요!"
