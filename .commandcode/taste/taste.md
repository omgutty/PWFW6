# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# workflow
- Do not edit files or implement changes automatically; always present suggestions first and keep the user in the loop for every action. Confidence: 0.85

# test-data
- Separate invalid test users into a dedicated `invalidUsers[]` array instead of mixing them with valid users in the test data JSON. Confidence: 0.70

# security
- Never store credentials (usernames, passwords, base URLs) in JSON test data files or config files that get committed to git; use GitHub secrets, environment variables, or local-only credential files instead, and ensure credentials are never visible in test reports or logs. Confidence: 0.85

# architecture
- Organize src/ with components/, pages/ (BasePage inside pages, not separate base/), modules/, services/, fixtures/, utils/, and tests/ directories. Confidence: 0.65
- Place shared UI elements (Header, Grid, Toast, Dialog) into components/ so they can be composed across multiple pages without duplicating locators. Confidence: 0.70

