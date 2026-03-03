#!/bin/bash

# Harryk AI Persona Sync Script (Shell Version)
# 외부 의존성(tsx, ts-node 등) 없이 동작하도록 구현했습니다.

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

echo "🔄 Syncing AI Personas (Shell Mode)..."

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
  echo "✅ Updated: $target"
done

echo "🚀 AI Persona sync completed!"
chmod +x "$0"
