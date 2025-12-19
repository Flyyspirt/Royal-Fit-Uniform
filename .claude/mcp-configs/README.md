# MCP Server Configurations for Royal Fit Uniform

This directory contains different MCP server configurations for accessing the Royal Fit Uniform Obsidian vault.

## Vault Information

- **Vault Name:** Royal Fit Uniform
- **Vault Path:** `C:\Users\Chitt\OneDrive\文档\Obsidian Vault`
- **Business:** Royal Fit Uniform

## Available Configurations

### 1. Filesystem Access (Current Default)

**File:** `../mcp-config.json` and configured in `../claude.json`

Uses the standard filesystem MCP server to access the vault directly.

**Pros:**
- No additional Obsidian plugin required
- Direct file access
- Works even when Obsidian is closed

**Cons:**
- No Obsidian-specific features (templates, links, etc.)
- Basic file operations only

### 2. WebSocket/SSE via Claude Code Plugin

**File:** `obsidian-websocket.json`

Requires the "Claude Code" plugin installed in Obsidian.

**Setup:**
1. Install "Claude Code" plugin in Obsidian
2. Enable the plugin (starts server on port 22360)
3. Copy configuration to `~/.config/claude/settings.json`

**Pros:**
- Rich Obsidian features
- Respects Obsidian's internal links and structure
- Real-time sync

**Cons:**
- Requires Obsidian to be running
- Requires plugin installation

### 3. Alternative: Smithery MCP Server

```json
{
  "mcpServers": {
    "obsidian-royal-fit": {
      "command": "npx",
      "args": ["-y", "@smithery/mcp-obsidian"],
      "env": {
        "OBSIDIAN_VAULT_PATH": "C:\\Users\\Chitt\\OneDrive\\文档\\Obsidian Vault"
      }
    }
  }
}
```

Install with:
```bash
npx -y @smithery/cli install mcp-obsidian --client claude
```

## Installation Instructions

### For Claude Code CLI

Copy the desired configuration to: `~/.config/claude/settings.json`

**On Windows:**
```powershell
mkdir -p $env:USERPROFILE\.config\claude
copy .claude\mcp-config.json $env:USERPROFILE\.config\claude\settings.json
```

**On Linux/Mac:**
```bash
mkdir -p ~/.config/claude
cp .claude/mcp-config.json ~/.config/claude/settings.json
```

### For Claude Desktop

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

Copy the contents of your chosen config file to the appropriate location.

## Testing the Connection

After setup, restart Claude Code and test:

```
What files are in my Obsidian vault?
```

```
Search my Royal Fit Uniform vault for "product"
```

```
List all markdown files in the vault
```

## Available Operations

Once connected, you can:

- 📄 **Read files** - "Read the note about uniform designs"
- 🔍 **Search vault** - "Search for customer feedback notes"
- ✍️ **Create notes** - "Create a note about new product line"
- 📝 **Update notes** - "Add shipping information to the logistics note"
- 📂 **List files** - "Show me all files in the vault"
- 🗂️ **Navigate folders** - "What folders exist in my vault?"

## Troubleshooting

### Connection Issues

1. **Verify vault path is correct:**
   ```powershell
   Test-Path "C:\Users\Chitt\OneDrive\文档\Obsidian Vault"
   ```

2. **Check Node.js is installed:**
   ```bash
   node --version
   npx --version
   ```

3. **Restart Claude Code** after configuration changes

4. **Check for path encoding issues** with Chinese characters (文档)

### Permission Issues

- Ensure OneDrive sync is complete
- Check that the vault folder is accessible
- Verify no file locks from Obsidian

## Custom Commands

See `.claude/commands/` for vault-specific commands:
- `/vault-search` - Search the vault
- `/vault-create` - Create a new note
- `/vault-list` - List all files

## Resources

- [MCP Filesystem Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- [Obsidian Claude Code Plugin](https://github.com/iansinnott/obsidian-claude-code-mcp)
- [Smithery MCP Obsidian](https://github.com/smithery-ai/mcp-obsidian)
