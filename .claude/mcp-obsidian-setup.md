# Obsidian MCP Server Setup Guide

This guide explains how to connect Claude Code to your "Royal Fit Uniforms" Obsidian vault.

## Prerequisites

1. **Obsidian** installed and running
2. **Obsidian vault** named "Royal Fit Uniforms" created locally
3. **Node.js** installed (for alternative setup methods)

## Method 1: Auto-Discovery (Recommended)

The iansinnott/obsidian-claude-code-mcp plugin provides automatic discovery for Claude Code.

### Steps:

1. **Install the Obsidian Plugin:**
   - Open Obsidian
   - Go to Settings → Community Plugins → Browse
   - Search for "Claude Code"
   - Install and enable the plugin
   - The server starts automatically on port 22360

2. **Connect from Claude Code:**
   ```bash
   claude
   /ide
   # Select "Obsidian" from the list
   ```

## Method 2: Direct MCP Configuration

### For Claude Code CLI

Create or edit: `~/.config/claude/settings.json`

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "npx",
      "args": ["mcp-remote", "http://localhost:22360/sse"],
      "env": {}
    }
  }
}
```

### For Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "obsidian-royal-fit": {
      "command": "npx",
      "args": ["mcp-remote", "http://localhost:22360/sse"],
      "env": {}
    }
  }
}
```

## Method 3: Alternative MCP Servers

### Using smithery-ai/mcp-obsidian

This requires the Obsidian Local REST API plugin.

```bash
npx -y @smithery/cli install mcp-obsidian --client claude
```

**Configuration:**
```json
{
  "mcpServers": {
    "obsidian": {
      "command": "npx",
      "args": ["-y", "@smithery/mcp-obsidian"],
      "env": {
        "OBSIDIAN_VAULT_PATH": "/path/to/Royal Fit Uniforms"
      }
    }
  }
}
```

### Using file-system based access

```json
{
  "mcpServers": {
    "obsidian-vault": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/Royal Fit Uniforms"],
      "env": {}
    }
  }
}
```

## Testing the Connection

After setup, test the connection:

1. **Restart Claude Code** or Claude Desktop
2. Ask: "What files are in my Obsidian vault?"
3. Try: "Search my vault for 'uniform'"
4. Test: "Create a new note about product catalog"

## Troubleshooting

### Connection Failed
- Verify Obsidian is running
- Check the plugin is enabled in Obsidian
- Confirm port 22360 is not blocked by firewall
- Validate JSON syntax in config file

### Vault Not Found
- Ensure the vault path is absolute, not relative
- Check for spaces in path (use quotes if needed)
- Verify the .obsidian folder exists in vault directory

### Port Conflicts
Change the port in Obsidian plugin settings:
- Settings → Community Plugins → Claude Code → MCP Server Configuration
- Use alternative ports: 22361, 22362, 8080, 9090

## Available MCP Tools

Once connected, you'll have access to:

- **list_files** - List all files in the vault
- **read_file** - Read content of specific notes
- **write_file** - Create or update notes
- **search** - Search vault content
- **create_note** - Create new notes with templates
- **append_to_note** - Add content to existing notes

## Resources

- [iansinnott/obsidian-claude-code-mcp](https://github.com/iansinnott/obsidian-claude-code-mcp)
- [smithery-ai/mcp-obsidian](https://github.com/smithery-ai/mcp-obsidian)
- [Obsidian MCP Integration Guide](https://medium.com/@souvikpal/supercharge-your-knowledge-management-integrating-obsidian-mcp-with-claude-b4269d55db7a)
- [Claude Desktop Integration](https://medium.com/@joycebirkins/integrate-claude-desktop-with-your-obsidian-vault-a-step-by-step-guide-5e622f52905b)

## Next Steps

**TODO: Specify vault path**
Once you provide the full path to your "Royal Fit Uniforms" vault, I can:
1. Create the appropriate MCP configuration
2. Test the connection
3. Set up custom commands for vault operations
