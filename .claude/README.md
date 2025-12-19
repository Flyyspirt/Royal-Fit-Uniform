# Claude Code Configuration

This directory contains Claude Code configuration for the Royal Fit Uniform project.

## Structure

- `claude.json` - Main configuration file for Claude Code
- `hooks/` - Directory containing session hooks
  - `session-start.sh` - Runs when a Claude Code session starts
- `commands/` - Directory for custom slash commands (add your own!)

## Hooks

### Session Start Hook
The session start hook automatically:
- Checks if dependencies are installed
- Installs them if needed
- Displays project information

## Custom Commands

You can add custom slash commands by creating markdown files in the `commands/` directory.

Example: `.claude/commands/test.md`
```markdown
Run the test suite for this project
```

Then use it with `/test` in Claude Code.

## Learn More

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk)
