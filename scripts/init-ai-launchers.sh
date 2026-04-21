#!/bin/bash
# AI 규약 진입점(Launcher) 자동 생성 및 동기화 스크립트
# .ai/index.md의 내용을 각 도구별 규약 파일에 동적으로 주입해요.

INDEX_FILE=".ai/index.md"
TARGET_FILES=(
  "GEMINI.md"
  "CLAUDE.md"
  ".agent/rules/persona-router.md"
  ".cursor/rules/persona-router.mdc"
  ".github/copilot-instructions.md"
)

# 1. 마스터 허브 파일 존재 확인
if [ ! -f "$INDEX_FILE" ]; then
  echo "❌ $INDEX_FILE 파일이 존재하지 않아요. 먼저 허브 파일을 만들어주세요."
  exit 1
fi

# 2. 내용 읽기
# index.md의 내용을 변수에 담아 모든 파일에 동일하게 주입해요.
INDEX_CONTENT=$(cat "$INDEX_FILE")

for target in "${TARGET_FILES[@]}"; do
  target_dir=$(dirname "$target")

  # 3. 상대 경로 계산 ({{ROOT}} 치환용)
  # 파일의 깊이(Depth)에 따라 . 또는 ../.. 등을 결정해요.
  if [[ "$target" == *"/"* ]]; then
    slash_count=$(echo "$target" | tr -cd '/' | wc -c | xargs)
    prefix=".."
    for ((i=1; i<slash_count; i++)); do
      prefix+="/.."
    done
  else
    prefix="."
  fi

  # 디렉토리가 없으면 생성
  if [ ! -d "$target_dir" ]; then
    mkdir -p "$target_dir"
  fi

  # 4. 내용 주입 및 플레이스홀더 치환
  # {{ROOT}}를 계산된 상대 경로(prefix)로 바꿔서 저장해요.
  echo "$INDEX_CONTENT" | sed "s|{{ROOT}}|$prefix|g" > "$target"
  echo "✅ Launcher를 업데이트했어요: $target"
done

echo "🚀 모든 AI Launcher가 마스터 허브와 동기화되었어요!"
