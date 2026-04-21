#!/bin/bash
# AI 규약 파일 진입점(Launcher) 자동 생성 스크립트
# 마스터 허브(.ai/index.md)의 내용을 각 AI 도구 규약 파일에 동기화해요.

INDEX_FILE=".ai/index.md"
TARGET_FILES=(
  "GEMINI.md"
  "CLAUDE.md"
  ".agent/rules/persona-router.md"
  ".cursor/rules/persona-router.mdc"
  ".github/copilot-instructions.md"
)

# 1. 마스터 파일 존재 확인
# 패키지 설치(postinstall)가 실패하는 것을 막기 위해 에러 없이 부드럽게 종료해요 (exit 0).
if [ ! -f "$INDEX_FILE" ]; then
  echo "⚠️ $INDEX_FILE 파일을 찾을 수 없어요. AI 규약 동기화를 건너뛸게요."
  exit 0
fi

INDEX_CONTENT=$(cat "$INDEX_FILE")

for target in "${TARGET_FILES[@]}"; do
  target_dir=$(dirname "$target")

  # 디렉토리가 없으면 생성
  if [ ! -d "$target_dir" ]; then
    mkdir -p "$target_dir"
  fi

  # 2. 파일 깊이에 따른 상대 경로(../) 계산
  if [[ "$target" == *"/"* ]]; then
    slash_count=$(echo "$target" | tr -cd '/' | wc -c | xargs)
    prefix=".."
    for ((i=1; i<slash_count; i++)); do
      prefix+="/.."
    done
  else
    prefix="."
  fi

  # 3. 마스터 파일 내용에서 {{ROOT}}를 상대 경로로 치환
  FINAL_CONTENT=$(echo "$INDEX_CONTENT" | sed "s|{{ROOT}}|$prefix|g")

  # 4. 파일 쓰기 및 Cursor 전용 규칙 추가
  if [[ "$target" == *.mdc ]]; then
    # Cursor 툴은 항시 적용되도록 메타데이터(alwaysApply)가 필요해요.
    echo -e "---\ndescription: ALWAYS APPLY - harryk-ds ai rules\nglobs: *\nalwaysApply: true\n---\n\n$FINAL_CONTENT" > "$target"
  else
    echo "$FINAL_CONTENT" > "$target"
  fi

  echo "✅ 동기화 완료: $target"
done

echo "🚀 모든 AI 규약 파일 동기화를 마쳤어요!"
