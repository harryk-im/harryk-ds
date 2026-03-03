#!/bin/bash

PERSONA_DIR=".ai/personas"
ROUTER_FILE="$PERSONA_DIR/router.md"
TARGET_FILES=(
  "AGENTS.md"
  "GEMINI.md"
  "CLAUDE.md"
  ".cursor/rules/persona-router.mdc"
  ".github/copilot-instructions.md"
)

# 1. router.md 존재 확인
if [ ! -f "$ROUTER_FILE" ]; then
  echo "❌ Error: $ROUTER_FILE file not found."
  exit 1
fi

echo "🔄 AI 페르소나 동기화를 진행할게요..."

# 2. 모든 페르소나 파일 내용 병합
COMBINED_CONTENT=$(cat "$ROUTER_FILE")
COMBINED_CONTENT+=$'\n\n## Personas Reference\n'

for file in "$PERSONA_DIR"/*.md; do
  filename=$(basename "$file")
  if [ "$filename" != "router.md" ]; then
    COMBINED_CONTENT+=$'\n--- FILE: '"$filename"$' ---\n'
    COMBINED_CONTENT+="$(cat "$file")"
    COMBINED_CONTENT+=$'\n'
  fi
done

# 3. 대상 파일 업데이트
for target in "${TARGET_FILES[@]}"; do
  target_dir=$(dirname "$target")

  # 디렉토리가 없으면 생성
  if [ ! -d "$target_dir" ]; then
    mkdir -p "$target_dir"
  fi

  printf "%s" "$COMBINED_CONTENT" > "$target"
  echo "✅ 동기화 완료: $target"
done

echo "🚀 AI 페르소나 변경사항을 성공적으로 동기화 했어요!"
chmod +x "$0"
