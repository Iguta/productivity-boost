# Smoke Test Report

- Date: $(date -Iseconds)
- Preview URL: http://127.0.0.1:4175
- Result: 200 OK on root path

Commands:
- npm run preview -- --host 127.0.0.1 --port 4175
- curl -I http://127.0.0.1:4175 | head -n 1
