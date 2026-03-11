# Changelog

All notable changes to AWS Guru Power will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-11

### Added
- **Well-Architected Framework Diagram Generation** — Generate architecture diagrams guided by the six pillars of the AWS Well-Architected Framework
  - Visual pillar mapping: services grouped and color-coded by pillar
  - Pillar-specific cluster color presets: Operational Excellence (blue #1A73E8), Security (red #DD344C), Reliability (green #3F8624), Performance Efficiency (orange #ED7100), Cost Optimization (purple #8C4FFF), Sustainability (teal #01A88D)
  - Edge annotations for encryption, failover, caching, and monitoring flows
  - Support for full six-pillar review diagrams or single-pillar focused diagrams
  - Works with both PNG (Graphviz) and draw.io output formats
  - New steering guide: `well-architected-diagrams.md` with detailed patterns, examples, and best practices
- Updated POWER.md with Well-Architected diagram capability and examples
- Updated README.md with Well-Architected workflow
- New supported architecture pattern: Well-Architected pillar-mapped diagrams

### Changed
- Version bumped to 1.2.0

## [1.1.0] - 2026-03-11

### Added
- **Draw.io Diagram Generation** — New MCP server `drawio-generator` for creating editable `.drawio` XML files
  - 80+ AWS service shapes using the `mxgraph.aws4` library built into diagrams.net
  - 11 shape categories: compute, storage, database, networking, security, analytics, ai_ml, management, integration, iot, general
  - Cluster presets with color coding: agentcore, bedrock, vpc, security, data, storage, compute, onpremise, output
  - Edge styling: dashed, colored, labeled, bold
  - No external dependencies (Node.js only, no Graphviz required)
  - Two tools: `generate_drawio` and `list_aws4_shapes`
- New keywords: `drawio`, `draw.io`, `diagrams.net`, `bedrock`, `agentcore`, `sagemaker`
- Updated steering guide `diagram-creation.md` with draw.io section
- Updated POWER.md with draw.io reference documentation and shape catalog

### Changed
- Version bumped to 1.1.0
- `power.json` now includes `drawio-generator` MCP server
- README.md updated with draw.io capabilities
- INSTALL.md updated with Node.js prerequisite for draw.io

## [1.0.0] - 2025-02-27

### Added
- Initial release of AWS Guru Power
- AWS Documentation search and reading via MCP server
- Architecture diagram generation with 200+ AWS services
- Cost estimation and optimization recommendations
- Three comprehensive steering guides:
  - Getting Started guide
  - Cost Estimation guide
  - Diagram Creation guide
- Support for multiple architecture patterns:
  - Three-tier web applications
  - Serverless architectures
  - Data processing pipelines
  - Microservices platforms
  - Event-driven systems
- Integration with three MCP servers:
  - awslabs.aws-documentation-mcp-server
  - awslabs.aws-diagram-mcp-server
  - abap-analyzer (optional)
- Comprehensive documentation:
  - POWER.md with complete overview
  - README.md with quick start
  - Detailed steering files
- Cost optimization features:
  - Reserved Instance savings calculations
  - Right-sizing recommendations
  - Storage class optimization
  - Network cost reduction strategies
- Diagram features:
  - Multiple layout directions
  - Custom styling and colors
  - Cluster grouping
  - Professional AWS icons
- Example architectures and workflows
- Best practices and troubleshooting guides

### Features
- **Documentation Search**: Search across all AWS documentation with filtering
- **Content Reading**: Extract and read specific AWS documentation pages
- **Content Recommendations**: Get related AWS documentation suggestions
- **Diagram Generation**: Create professional architecture diagrams
- **Icon Library**: Access 200+ AWS service icons
- **Cost Estimation**: Detailed cost breakdowns by service
- **Optimization Analysis**: Identify cost-saving opportunities
- **Regional Pricing**: Support for all AWS regions
- **Multi-AZ Support**: High availability architecture patterns
- **Well-Architected**: Built-in AWS best practices

### Documentation
- Complete POWER.md with all capabilities
- Quick start README.md
- Getting Started steering guide
- Cost Estimation steering guide (comprehensive)
- Diagram Creation steering guide (detailed)
- Example prompts and workflows
- Troubleshooting section
- Best practices guide

### Dependencies
- Graphviz (required for diagram generation)
- Python with uv package manager (for MCP servers)
- Node.js (optional, for ABAP analyzer)

### Known Limitations
- Requires Graphviz installation for diagram generation
- Cost estimates are approximations based on public AWS pricing
- Some newer AWS services may not have icons available
- ABAP analyzer requires separate Node.js setup

## [Unreleased]

### Planned Features
- Additional architecture pattern templates
- Cost comparison across AWS regions
- Terraform/CloudFormation code generation
- Integration with AWS Cost Explorer API
- Custom icon support
- Diagram export to multiple formats (SVG, PDF)
- Interactive diagram editing
- Cost trend analysis
- Budget alert integration
- Multi-cloud support (Azure, GCP)

### Potential Improvements
- Enhanced cost estimation accuracy
- More granular service configurations
- Additional diagram layout algorithms
- Real-time pricing updates
- Cost anomaly detection
- Architecture validation against Well-Architected Framework
- Automated optimization recommendations
- Integration with AWS Organizations
- Support for AWS Marketplace services
- Custom pricing models (EDPs, Private Pricing)

---

## Version History

- **1.2.0** (2026-03-11): Well-Architected Framework diagram generation
- **1.1.0** (2026-03-11): Draw.io diagram generation
- **1.0.0** (2025-02-27): Initial release with core features

---

For more information, see the [README.md](README.md) and [POWER.md](POWER.md) files.
