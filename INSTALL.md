# AWS Guru Power - Installation Guide

Complete installation guide for AWS Guru Power.

## Prerequisites

### 1. Graphviz (Required)

Graphviz is required for generating architecture diagrams.

#### macOS
```bash
brew install graphviz
```

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install graphviz
```

#### CentOS/RHEL
```bash
sudo yum install graphviz
```

#### Windows (Chocolatey)
```bash
choco install graphviz
```

#### Windows (Scoop)
```bash
scoop install graphviz
```

#### Verify Installation
```bash
dot -V
# Expected output: dot - graphviz version X.X.X
```

### 2. Python & uv (Required for MCP Servers)

The MCP servers use Python and the `uv` package manager.

#### Install uv
```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

#### Verify Installation
```bash
uv --version
# Expected output: uv X.X.X
```

### 3. Node.js (Required for draw.io generator and ABAP Analyzer)

Node.js >= 18 is required for the draw.io diagram generator and the optional ABAP analyzer.

#### macOS
```bash
brew install node
```

#### Ubuntu/Debian
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Windows
Download from https://nodejs.org/

#### Verify Installation
```bash
node --version
npm --version
```

#### Install draw.io generator dependencies
```bash
cd ~/.kiro/powers/aws-guru-power/mcp-servers/drawio-generator
npm install
```

> **Important:** The draw.io generator MCP server requires its Node.js dependencies to be installed. Always run `npm install` after cloning or extracting the power.

## Installation Methods

### Method 1: User-Level Installation (Recommended)

Install for your user account across all workspaces.

```bash
# 1. Navigate to your home directory
cd ~

# 2. Create Kiro powers directory if it doesn't exist
mkdir -p .kiro/powers

# 3. Copy AWS Guru Power
cp -r /path/to/aws-guru-power ~/.kiro/powers/

# 4. Verify installation
ls ~/.kiro/powers/aws-guru-power
```

### Method 2: Workspace-Level Installation

Install for a specific workspace only.

```bash
# 1. Navigate to your workspace
cd /path/to/your/workspace

# 2. Create Kiro powers directory if it doesn't exist
mkdir -p .kiro/powers

# 3. Copy AWS Guru Power
cp -r /path/to/aws-guru-power .kiro/powers/

# 4. Verify installation
ls .kiro/powers/aws-guru-power
```

### Method 3: Git Clone (For Development)

Clone directly from repository for development or contributions.

```bash
# User-level
cd ~/.kiro/powers
git clone https://github.com/aws-guru/kiro-power.git aws-guru-power

# Workspace-level
cd /path/to/workspace/.kiro/powers
git clone https://github.com/aws-guru/kiro-power.git aws-guru-power
```

## Post-Installation Setup

### 1. Verify Power Installation

1. Open Kiro
2. Open the Powers panel
3. Look for "AWS Guru" in the list
4. Check that status shows as "Available"

### 2. Install draw.io Generator Dependencies

```bash
cd ~/.kiro/powers/aws-guru-power/mcp-servers/drawio-generator
npm install
```

### 3. Test MCP Servers

The MCP servers will be automatically installed when first used.

```bash
# Test AWS Documentation MCP
uvx awslabs.aws-documentation-mcp-server@latest --version

# Test AWS Diagram MCP
uvx awslabs.aws-diagram-mcp-server@latest --version
```

### 4. Create Test Diagram (PNG)

In Kiro, try creating a simple diagram:

```
Create a simple architecture diagram with:
- Application Load Balancer
- 2 EC2 instances
- RDS database
```

Expected output: A PNG file in `generated-diagrams/` folder

### 5. Create Test Diagram (draw.io)

```
Create a draw.io diagram with:
- API Gateway → Lambda → DynamoDB
```

Expected output: A `.drawio` file that opens in diagrams.net

### 6. Test Documentation Search

```
Search AWS documentation for:
- EC2 instance types
```

Expected output: List of relevant AWS documentation pages

## Configuration

### MCP Server Configuration

The power automatically configures MCP servers. Configuration is in `power.json`:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    },
    "aws-diagram": {
      "command": "uvx",
      "args": ["awslabs.aws-diagram-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

### Custom Configuration

To customize, edit `power.json`:

```json
{
  "mcpServers": {
    "aws-docs": {
      "env": {
        "FASTMCP_LOG_LEVEL": "DEBUG"  // Change log level
      }
    }
  }
}
```

## Troubleshooting

### Issue 1: Graphviz Not Found

**Symptom:**
```
Error: ExecutableNotFound: failed to execute 'dot'
```

**Solution:**
1. Install Graphviz (see Prerequisites)
2. Restart terminal/IDE
3. Verify: `dot -V`
4. Restart Kiro

### Issue 2: uv Not Found

**Symptom:**
```
Error: command not found: uvx
```

**Solution:**
1. Install uv (see Prerequisites)
2. Add to PATH:
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   export PATH="$HOME/.cargo/bin:$PATH"
   ```
3. Restart terminal
4. Verify: `uv --version`

### Issue 3: MCP Server Fails to Start

**Symptom:**
```
Error: Failed to start MCP server
```

**Solution:**
1. Check uv installation: `uv --version`
2. Manually test server:
   ```bash
   uvx awslabs.aws-documentation-mcp-server@latest
   ```
3. Check logs in Kiro
4. Restart Kiro

### Issue 4: Power Not Showing in Kiro

**Symptom:**
Power doesn't appear in Powers panel

**Solution:**
1. Verify installation path:
   ```bash
   ls ~/.kiro/powers/aws-guru-power/power.json
   ```
2. Check power.json syntax
3. Restart Kiro
4. Check Kiro logs for errors

### Issue 5: Diagram Generation Fails

**Symptom:**
```
Error generating diagram
```

**Solution:**
1. Verify Graphviz: `dot -V`
2. Check MCP server status
3. Try simpler diagram
4. Check error details in Kiro
5. Verify write permissions in workspace

### Issue 6: Permission Denied

**Symptom:**
```
Error: Permission denied
```

**Solution:**
```bash
# Fix permissions
chmod -R 755 ~/.kiro/powers/aws-guru-power

# Or for workspace
chmod -R 755 .kiro/powers/aws-guru-power
```

## Updating

### Update AWS Guru Power

```bash
# If installed via git
cd ~/.kiro/powers/aws-guru-power
git pull

# If installed manually
# Download latest version and replace files
```

### Update MCP Servers

MCP servers are automatically updated by `uvx`. To force update:

```bash
# Clear uv cache
uv cache clean

# Next use will download latest versions
```

## Uninstallation

### Remove AWS Guru Power

```bash
# User-level
rm -rf ~/.kiro/powers/aws-guru-power

# Workspace-level
rm -rf .kiro/powers/aws-guru-power
```

### Remove MCP Servers

```bash
# Clear uv cache (removes downloaded MCP servers)
uv cache clean
```

### Remove Prerequisites

```bash
# Graphviz (macOS)
brew uninstall graphviz

# uv
rm -rf ~/.cargo/bin/uv
rm -rf ~/.cargo/bin/uvx
```

## Verification Checklist

After installation, verify:

- [ ] Graphviz installed: `dot -V`
- [ ] uv installed: `uv --version`
- [ ] Power appears in Kiro Powers panel
- [ ] Can create test diagram
- [ ] Can search AWS documentation
- [ ] Generated files appear in workspace
- [ ] No error messages in Kiro logs

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review Kiro logs
3. Check MCP server logs
4. Verify all prerequisites
5. Try with a fresh installation
6. Create an issue on GitHub

## Next Steps

After successful installation:

1. Read [POWER.md](POWER.md) for complete documentation
2. Follow [getting-started.md](steering/getting-started.md) guide
3. Try example prompts from [README.md](README.md)
4. Explore steering files for detailed workflows
5. Create your first architecture!

---

**Installation complete? Start creating amazing AWS architectures! 🚀**
