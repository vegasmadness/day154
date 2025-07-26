# My-Blog Project Rules

# Development Server Management Rules

**CRITICAL RULE**: Before executing any commands that modify files (especially .astro files), follow this sequence:
1. **Stop Current Dev Server**: Terminate any running development server to prevent file lock issues
2. **Check for Multiple Servers**: Verify no other dev servers are running and close them if found
3. **Execute Task**: Perform the required file modifications or commands
4. **Restart Dev Server**: Start a fresh development server after changes are complete

**Why This Rule Exists**:
- File modifications often fail when dev server is watching files
- Multiple dev servers can cause port conflicts and confusion
- Clean server restarts ensure changes are properly loaded
- Prevents "file in use" errors during updates

**Implementation**:
- Use `stop_command` tool to terminate running servers before file changes
- Use `check_command_status` to verify server status
- Use `run_command` with proper `cwd` to restart servers cleanly
- Always verify only one dev server instance is running 

# Database Migration Management Rules

**CRITICAL RULE**: All database changes and migrations are handled manually by the user (James).

**AI Assistant Responsibilities**:
- Create migration SQL files in the `supabase/migrations/` folder
- Write complete, well-documented SQL scripts
- Follow proper migration naming conventions (e.g., `005_feature_name.sql`)
- Include rollback instructions in comments when applicable
- Test SQL syntax for correctness

**User (James) Responsibilities**:
- Manually execute migrations in Supabase dashboard
- Review migration files before applying
- Handle any migration conflicts or issues
- Maintain control over database schema changes
- Learn and understand Supabase operations

**Workflow**:
1. AI creates migration SQL file in `supabase/migrations/`
2. AI notifies user that migration file is ready
3. User reviews the migration file
4. User manually applies migration in Supabase
5. User confirms migration success before proceeding

**Benefits of Manual Migration**:
- User maintains full control over database changes
- Opportunity to learn Supabase operations
- Prevents accidental or unwanted schema changes
- Allows for careful review before applying changes

# Always do a Build before pushing to GitHub

** This is an .astro app and is deployed on Netlify that is connected to my GitHub 
- Before doing any GitHub pushes or any GitHub commands at all always do a Build
- NPM RUN BUILD i the command and this will build the app and set up the dist folder correctly
- Once this has been done then proceed with any requested GitHub command
- This will ensure each GitHub push will automaticly and correctly trigger a deployment refresh on Netlify
- The existing repository on Github is called 'my-astro-blog' which matches our project.


## Directory Structure Guidelines

### Project Root Structure
```
c:\Users\James\_myApps\day154\my-blog\                # MAIN PROJECT DIRECTORY
├── .docs\                    # Documentation and planning files
│   ├── scratchpad.md         # Main project tracking document
│   ├── requirements.md       # Project requirements
│   └── design.md            # Design specifications
├── src\                     # Source code
├── public\                  # Static assets
├── package.json             # Dependencies
└── ...                      # Other project files
```

## Critical Directory Rules

### 🎯 ALWAYS Work in my-blog Directory

**For ALL development operations, ensure you are in the `my-blog` directory:**
- **Installing dependencies**: `cd my-blog && npm install`
- **Running dev server**: `cd my-blog && npm run dev`
- **Creating/editing source files**: All paths should be relative to `my-blog/`
- **Running build commands**: `cd my-blog && npm run build`
- **Any npm/node operations**: Must be executed from `my-blog/`

### 📁 File Path Guidelines

**Source Code Files** (always in my-blog/):
- Components: `my-blog/src/components/`
- Pages: `my-blog/src/pages/`
- Layouts: `my-blog/src/layouts/`
- Utils: `my-blog/src/utils/`
- Styles: `my-blog/src/styles/`
- Types: `my-blog/src/types/`

**Documentation Files** (in my-blog root directory):
- Scratchpad: `my-blog/.docs/scratchpad.md`
- Requirements: `my-blog/.docs/requirements.md`
- Design docs: `my-blog/.docs/design.md`

### 🚨 Common Mistakes to Avoid

1. **Wrong Directory for npm commands**
   - ❌ Running `npm install` from `c:\Users\James\_myApps\day154\`
   - ✅ Running `npm install` from `c:\Users\James\_myApps\day154\my-blog\`

2. **Incorrect file paths**
   - ❌ Creating files in root directory instead of my-blog/
   - ✅ All source files go in my-blog/src/

3. **Dev server issues**
   - ❌ Starting server from wrong directory
   - ✅ Always `cd my-blog` before `npm run dev`

### 🔧 Terminal Commands Template

```bash
# Always start with:
cd c:\Users\James\_myApps\day154\my-blog

# Then run your commands:
npm install [package-name]
npm run dev
npm run build
# etc.
```

### 📝 File Creation Guidelines

**When creating new files:**
- Source code files → Use absolute path starting with `c:\Users\James\_myApps\day154\my-blog\`
- Documentation files → Use absolute path starting with `c:\Users\James\_myApps\day154\my-blog\.docs\`

**Example absolute paths:**
- Component: `c:\Users\James\_myApps\day154\my-blog\src\components\MyComponent.astro`
- Documentation: `c:\Users\James\_myApps\day154\my-blog\.docs\new-doc.md`

### 🎯 Success Criteria

✅ **Correct Setup Indicators:**
- Dev server runs from `my-blog/` directory
- Package.json operations work without errors
- File imports resolve correctly
- Scratchpad updates happen in `my-blog/.docs/` folder

❌ **Warning Signs:**
- "Module not found" errors
- npm commands failing
- Files created in wrong directories
- Dev server not starting

---
