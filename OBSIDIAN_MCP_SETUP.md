# Obsidian MCP Integration Setup Guide

This guide will help you connect Claude Code to your Obsidian vault via the MCP (Model Context Protocol) Obsidian server. This integration allows Claude to access, search, and interact with your Obsidian notes, making your business knowledge base directly available during conversations.

## Overview

The MCP Obsidian server enables Claude Code to:
- **List files** in your vault and directories
- **Read note contents** including markdown, YAML frontmatter, and metadata
- **Search** across all notes for specific content
- **Create and append** to notes
- **Patch content** relative to headings, block references, or frontmatter
- **Delete** files or directories

## Prerequisites

1. **Obsidian** installed on your system
2. **Python 3.11+** (already available)
3. **uv/uvx** package manager (already installed at `/root/.local/bin/uvx`)
4. **Obsidian Local REST API plugin** (installation steps below)

## Step 1: Install Obsidian Local REST API Plugin

The MCP server communicates with Obsidian through the Local REST API community plugin.

### Installation Steps:

1. **Open Obsidian** and go to Settings (gear icon)
2. Navigate to **Community Plugins**
3. If not already done, click **"Turn on community plugins"**
4. Click **"Browse"** to open the community plugins browser
5. Search for **"Local REST API"**
6. Install the plugin by **coddingtonbear**
7. **Enable** the plugin in Community Plugins settings

### Get Your API Key:

1. In Obsidian Settings, go to **Community Plugins** → **Local REST API**
2. Copy the **API Key** shown in the settings
3. Note the **Port** (default: 27124) and **Host** (default: localhost/127.0.0.1)
4. Ensure the **REST API is enabled** in the plugin settings

## Step 2: Configure Environment Variables

Create a `.env` file in the project root with your Obsidian credentials:

```bash
# Copy the template
cp .env.obsidian.template .env

# Edit the .env file with your actual values
# Use your preferred text editor
```

Edit the `.env` file and replace the placeholder values:

```env
OBSIDIAN_API_KEY=your_actual_api_key_from_step_1
OBSIDIAN_HOST=127.0.0.1
OBSIDIAN_PORT=27124
```

**Important:** The `.env` file is git-ignored to keep your API key secure.

## Step 3: Verify MCP Configuration

The MCP server configuration has been created at `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "/root/.local/bin/uvx",
      "args": ["mcp-obsidian"],
      "env": {
        "OBSIDIAN_API_KEY": "${OBSIDIAN_API_KEY}",
        "OBSIDIAN_HOST": "${OBSIDIAN_HOST:-127.0.0.1}",
        "OBSIDIAN_PORT": "${OBSIDIAN_PORT:-27124}"
      }
    }
  }
}
```

This configuration:
- Uses `uvx` to run the mcp-obsidian server
- Automatically reads from your `.env` file
- Sets default values for HOST (127.0.0.1) and PORT (27124)

## Step 4: Test the Connection

To verify everything is working:

1. **Ensure Obsidian is running** with the Local REST API plugin enabled
2. **Restart Claude Code** to load the MCP configuration
3. Try a test prompt:

```
Please list the files in my Obsidian vault root directory.
```

If successful, you'll see Claude using the `list_files_in_vault` tool to show your notes.

## Using Obsidian with Claude Code

### Best Practices

1. **Start conversations by mentioning Obsidian:**
   - "Using Obsidian, find notes about..."
   - "Search my Obsidian vault for..."
   - "Check my Obsidian notes on..."

2. **Leverage your business structure:**
   - Reference specific folders: "Check my Projects folder in Obsidian"
   - Use your YAML frontmatter: "Find all notes tagged with #client-work"
   - Access todo lists: "What are my pending tasks in Obsidian?"

### Example Prompts

**Reading and Searching:**
- "Get the contents of my 'Business Strategy 2025.md' note and summarize it"
- "Search my Obsidian vault for all mentions of 'Royal Fit Uniform'"
- "Find all meeting notes from December and list the action items"
- "What are the key points from my last client meeting?"

**Content Creation:**
- "Create a new note called 'Weekly Review.md' with a summary of this conversation"
- "Append today's tasks to my 'Daily Notes' for December 18th"
- "Add a new section under ## Ideas in my 'Product Development.md' note"

**Business Operations:**
- "Review my current projects in Obsidian and prioritize them"
- "Check my client notes and tell me who I need to follow up with"
- "What are the pending items in my Business Operations folder?"
- "Find all notes with TODO items and create a consolidated task list"

### Working with YAML Frontmatter

If your notes use YAML frontmatter (metadata at the top of notes), Claude can read and work with it:

```markdown
---
title: Client Meeting Notes
date: 2025-12-18
client: ABC Corporation
status: in-progress
tags: [meetings, clients, follow-up]
---

# Meeting Notes
...
```

Example prompts:
- "Find all notes with status: in-progress"
- "List clients from my meeting notes"
- "Show me all notes tagged with #follow-up"

## Available MCP Tools

Claude has access to these tools when interacting with your Obsidian vault:

| Tool | Description |
|------|-------------|
| `list_files_in_vault` | List all files/directories in vault root |
| `list_files_in_dir` | List files in a specific directory |
| `get_file_contents` | Read content of a specific note |
| `search` | Search for text across all notes |
| `append_content` | Add content to new or existing notes |
| `patch_content` | Insert content relative to headings/blocks |
| `delete_file` | Remove files or directories |

## Troubleshooting

### Connection Issues

**Problem:** "Cannot connect to Obsidian"

**Solutions:**
1. Verify Obsidian is running
2. Check the Local REST API plugin is enabled
3. Verify the API key, host, and port in `.env`
4. Ensure no firewall is blocking localhost connections

### API Key Issues

**Problem:** "Authentication failed"

**Solutions:**
1. Copy the API key exactly from Obsidian settings (no extra spaces)
2. Regenerate the API key in the plugin settings if needed
3. Update the `.env` file with the new key
4. Restart Claude Code

### Plugin Not Found

**Problem:** "Local REST API plugin not found in Obsidian"

**Solutions:**
1. Ensure Community Plugins are enabled in Obsidian
2. Search for "Local REST API" by coddingtonbear
3. Check Obsidian is up to date
4. Try reinstalling the plugin

### MCP Server Not Loading

**Problem:** Claude doesn't have access to Obsidian tools

**Solutions:**
1. Verify `.claude/mcp.json` exists and is properly formatted
2. Check that `uvx` is available: `which uvx`
3. Restart Claude Code completely
4. Check Claude Code logs for MCP connection errors

## Security Considerations

1. **API Key Protection:**
   - Never commit `.env` to git (already in `.gitignore`)
   - The API key grants full access to your Obsidian vault
   - Regenerate the key if compromised

2. **Local Network Only:**
   - The REST API should only listen on localhost (127.0.0.1)
   - Don't expose the API port to external networks
   - Use the default configuration unless you have specific needs

3. **Vault Access:**
   - Claude Code can read/write/delete files in your vault
   - Review changes before committing important notes
   - Keep backups of critical business data

## Next Steps

1. ✅ Complete the setup by creating your `.env` file
2. ✅ Restart Claude Code to load the MCP configuration
3. ✅ Test the connection with a simple "list files" prompt
4. ✅ Start using your Obsidian knowledge base in conversations!

## Support and Resources

- **MCP Obsidian GitHub:** https://github.com/MarkusPfundstein/mcp-obsidian
- **Obsidian Local REST API:** https://github.com/coddingtonbear/obsidian-local-rest-api
- **MCP Documentation:** https://modelcontextprotocol.io

---

**Your Obsidian vault is now your AI-accessible second brain!** 🧠

Start by telling Claude to use Obsidian, and it will naturally access your notes, tasks, and business operations data throughout your conversations.
