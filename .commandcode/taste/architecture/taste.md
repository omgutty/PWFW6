# architecture
- Organize src/ with components/, pages/ (BasePage inside pages, not separate base/), modules/, services/, fixtures/, utils/, and tests/ directories. Confidence: 0.65
- Place shared UI elements (Header, Grid, Toast, Dialog) into components/ so they can be composed across multiple pages without duplicating locators. Confidence: 0.70
- Use a centralized typed config module (`import { config } from '../config'`) that reads test data from environment variables and provides type-safe access, replacing direct JSON file imports with raw type assertions. Confidence: 0.70
- Enforce a strict 3-layer architecture: Tests → Modules → Pages; tests never import or instantiate Page objects directly. Confidence: 0.90
- Modules own orchestration — a module method handles the full workflow (login, navigation, post-condition wait) so tests stay at assertion level. Confidence: 0.90
- Pages own locators and raw actions — a page method does one thing (click, fill, getText) with no if/else, loops, or business decisions. Confidence: 0.90
- Return page objects from navigation methods for fluent page transitions. Confidence: 0.85
