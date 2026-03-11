---
name: aws-guru-power
displayName: AWS Guru Power
description: Production-ready AWS architectural knowledge for Kiro IDE
icon: icon.png
keywords: ["aws", "cloud", "architecture", "diagram", "drawio", "draw.io", "diagrams.net", "cost", "pricing", "documentation", "ec2", "s3", "rds", "lambda", "vpc", "ecs", "eks", "cloudformation", "terraform", "well-architected", "optimization", "bedrock", "agentcore", "sagemaker", "infrastructure", "serverless", "microservices", "devops", "security", "networking", "containers", "iam", "monitoring", "cloudwatch", "api-gateway", "dynamodb", "sns", "sqs", "kinesis", "step-functions", "cdk"]
filePatterns:
  - "**/*.png"
  - "**/*.drawio"
  - "**/*.xml"
  - "**/*.yaml"
  - "**/*.yml"
  - "**/*.json"
  - "**/*.tf"
  - "**/*.tfvars"
  - "**/template.json"
  - "**/template.yaml"
  - "**/cdk.json"
  - "**/samconfig.toml"
---

# AWS Guru Power

> Production-ready AWS architectural knowledge for Kiro IDE

## Overview

AWS Guru is a comprehensive Kiro Power that combines AWS documentation search, architecture diagram generation (PNG and draw.io), and cost estimation into a unified workflow. It leverages multiple MCP servers to provide end-to-end support for AWS solution architects and developers.

## Keywords

`aws`, `cloud`, `architecture`, `diagram`, `drawio`, `draw.io`, `diagrams.net`, `cost`, `pricing`, `documentation`, `ec2`, `s3`, `rds`, `lambda`, `vpc`, `ecs`, `eks`, `cloudformation`, `terraform`, `well-architected`, `optimization`, `bedrock`, `agentcore`, `sagemaker`, `infrastructure`, `serverless`, `microservices`, `devops`, `security`, `networking`, `containers`, `iam`, `monitoring`, `cloudwatch`, `api-gateway`, `dynamodb`, `sns`, `sqs`, `kinesis`, `step-functions`, `cdk`

## What Can AWS Guru Do?

### 1. 📚 AWS Documentation Search & Access
- Search across all AWS documentation
- Read specific documentation pages
- Get recommendations for related content
- Filter by service, guide type, and product

### 2. 🎨 Architecture Diagram Generation (PNG)
- Create professional AWS architecture diagrams using Python diagrams library
- Support for all major AWS services (200+ icons)
- Multiple diagram types (infrastructure, data pipelines, serverless, etc.)
- Export to PNG format via Graphviz
- Requires Graphviz installed locally

### 3. 📐 Architecture Diagram Generation (draw.io)
- Generate editable `.drawio` XML files with AWS4 icon shapes
- Open and edit in [diagrams.net](https://app.diagrams.net) (desktop or web)
- Embed in Confluence, Notion, SharePoint, and other platforms
- No external dependencies required (pure XML generation)
- Uses the `mxgraph.aws4` shape library built into draw.io
- 80+ AWS service shapes across 11 categories
- Cluster grouping with color presets (AgentCore, Bedrock, VPC, Security, etc.)
- Customizable edge styles (dashed, colored, labeled, bold)

### 4. 🏗️ Well-Architected Framework Diagrams
- Generate architecture diagrams guided by the six pillars of the AWS Well-Architected Framework
- Visual pillar mapping: services grouped and color-coded by pillar (Security, Reliability, Performance, Cost, Operational Excellence, Sustainability)
- Pillar-specific cluster presets with consistent color coding
- Edge annotations for encryption, failover, caching, and monitoring flows
- Support for full six-pillar reviews or single-pillar focused diagrams
- Works with both PNG and draw.io output formats
- Dedicated steering guide with example prompts and best practices

### 5. 💰 Cost Estimation & Optimization
- Generate detailed cost estimates for architectures
- Identify cost optimization opportunities
- Compare pricing models (On-Demand vs Reserved Instances)
- Regional pricing analysis

## Key Features

- **Integrated Workflow**: Seamlessly move from documentation → diagram → cost estimate
- **Dual Diagram Formats**: PNG for presentations, draw.io for editable/collaborative diagrams
- **Best Practices**: Built-in AWS Well-Architected Framework guidance with pillar-mapped diagrams
- **Multi-Service Support**: Works with 200+ AWS services
- **Visual Excellence**: Professional diagrams with proper AWS icons
- **Cost Transparency**: Detailed breakdowns with optimization recommendations

## Quick Start

### Example 1: Create a Three-Tier Architecture (PNG)

```
Create a three-tier web application with:
- ALB in public subnets
- EC2 instances in private subnets
- RDS MySQL Multi-AZ
- S3 for static assets
Include cost estimate for us-east-1
```

### Example 2: Create an Editable draw.io Diagram

```
Create a draw.io diagram for a serverless API with:
- API Gateway → Lambda → DynamoDB
- S3 for file uploads
- CloudWatch for monitoring
- Cognito for authentication
Save as .drawio file
```

### Example 3: Design a Data Pipeline

```
Design a serverless data processing pipeline with:
- Kinesis for ingestion
- Lambda for transformation
- S3 data lake (raw/processed/curated)
- Athena for analytics
Show me the architecture and monthly costs
```

### Example 4: Research AWS Services

```
Search AWS documentation for:
- EKS best practices
- Lambda cold start optimization
- DynamoDB pricing models
```

### Example 5: Well-Architected Framework Diagram

```
Create a Well-Architected diagram for a three-tier web application:
- Show how each of the six pillars is addressed
- ALB + EC2 Auto Scaling + RDS Multi-AZ
- Include security (WAF, IAM, KMS), monitoring (CloudWatch, CloudTrail),
  caching (ElastiCache), and cost optimization (Reserved Instances, VPC Endpoints)
- Group services by Well-Architected pillar with color coding
```

## MCP Servers Used

This power integrates four MCP servers:

1. **AWS Documentation MCP** (`awslabs.aws-documentation-mcp-server`)
   - Search documentation
   - Read specific pages
   - Get content recommendations

2. **AWS Diagram MCP** (`awslabs.aws-diagram-mcp-server`)
   - Generate PNG architecture diagrams via Graphviz
   - List available AWS icons
   - View diagram examples

3. **Draw.io Generator MCP** (`drawio-generator`)
   - Generate editable `.drawio` XML diagrams
   - List available AWS4 shape keys
   - No external dependencies (Node.js only)
   - 80+ AWS service shapes, 11 categories
   - Cluster presets and edge styling

4. **ABAP Analyzer MCP** (Optional — for SAP migrations)
   - Analyze ABAP code
   - Support SAP to AWS migrations

## Draw.io Generator — Detailed Reference

### Available Service Shape Keys

The draw.io generator supports 80+ AWS service shapes organized in categories:

| Category | Services |
|----------|----------|
| **compute** | ec2, lambda, ecs, eks, fargate, batch, lightsail, auto_scaling, step_functions |
| **storage** | s3, ebs, efs, fsx, backup, storage_gateway |
| **database** | rds, aurora, dynamodb, elasticache, neptune, redshift, timestream, documentdb |
| **networking** | vpc, cloudfront, route53, api_gateway, alb, nlb, direct_connect, transit_gateway, nat_gateway, global_accelerator, appsync |
| **security** | iam, cognito, kms, waf, shield, guardduty, secrets_manager, certificate_manager |
| **analytics** | kinesis, athena, glue, emr, quicksight, msk, opensearch, lake_formation |
| **ai_ml** | sagemaker, bedrock, comprehend, rekognition, lex, polly, textract, kendra, translate |
| **management** | cloudwatch, cloudformation, systems_manager, config, cloudtrail, eventbridge |
| **integration** | sqs, sns |
| **iot** | iot_core, iot_greengrass, iot_sensor |
| **general** | users, client, traditional_server, documents, generic_database |

### Cluster Type Presets

| Type | Color | Use Case |
|------|-------|----------|
| `agentcore` | #FF8000 (orange) | AgentCore Runtime grouping |
| `bedrock` | #01A88D (green) | Amazon Bedrock services |
| `vpc` | #8C4FFF (purple) | VPC / networking boundaries |
| `security` | #DD344C (red) | Security components |
| `data` | #C925D1 (magenta) | Data layer / databases |
| `storage` | #3F8624 (green) | Storage grouping |
| `compute` | #ED7100 (orange) | Compute grouping |
| `onpremise` | #5A6C86 (gray) | On-premises / external |
| `output` | #8C4FFF (purple) | Output / dashboard layer |

### Edge Styles

| Property | Type | Description |
|----------|------|-------------|
| `dashed` | boolean | Dashed line (inference, optional paths) |
| `color` | hex string | Line color (e.g. `#01A88D` for Bedrock) |
| `strokeWidth` | number | Line thickness (2 for bold/critical paths) |
| `label` | string | Text label on the edge |

### When to Use PNG vs draw.io

| Criteria | PNG (Graphviz) | draw.io |
|----------|---------------|---------|
| Editable after generation | No | Yes |
| Embed in Confluence/Notion | Image only | Native plugin |
| Requires Graphviz | Yes | No |
| Auto-layout | Yes | Manual positioning |
| Collaborative editing | No | Yes (diagrams.net) |
| File size | Larger (image) | Small (XML) |
| Version control friendly | No (binary) | Yes (XML/text) |

## Common Workflows

### Workflow 1: Architecture Design
1. Search AWS docs for service information
2. Generate architecture diagram (PNG or draw.io)
3. Create cost estimate
4. Optimize based on recommendations

### Workflow 2: Cost Optimization
1. Analyze existing architecture
2. Search for pricing documentation
3. Generate cost comparison
4. Recommend Reserved Instances/Savings Plans

### Workflow 3: Documentation Research
1. Search for specific AWS topics
2. Read detailed documentation
3. Get related content recommendations
4. Create reference diagrams

### Workflow 4: Collaborative Architecture Review
1. Generate draw.io diagram
2. Share with team via Confluence or diagrams.net
3. Iterate on design collaboratively
4. Export final version as PNG for presentations

### Workflow 5: Well-Architected Review
1. Identify architecture pattern and services
2. Map services to Well-Architected pillars
3. Generate pillar-annotated diagram (draw.io or PNG)
4. Review coverage across all six pillars
5. Identify gaps and add missing components
6. Generate cost estimate with optimization recommendations

## Best Practices

### When Creating Diagrams
- Start with data flow from left to right
- Group related services in clusters
- Use proper AWS service icons
- Include security groups and IAM roles
- Show data flow with colored arrows
- Use draw.io for diagrams that need team review/editing
- Use PNG for final presentation-ready diagrams
- For Well-Architected reviews, group services by pillar with consistent color coding

### When Estimating Costs
- Specify the AWS region
- Include data transfer costs
- Consider Reserved Instances for steady workloads
- Account for Multi-AZ deployments
- Add monitoring and backup costs

### When Searching Documentation
- Use specific service names
- Include version numbers when relevant
- Filter by guide type for focused results
- Check publication dates for currency

## Supported Architecture Patterns

- **Well-Architected Architectures** (pillar-mapped diagrams)
- **Three-Tier Web Applications**
- **Serverless Applications**
- **Data Processing Pipelines**
- **Microservices on ECS/EKS**
- **Event-Driven Architectures**
- **Hybrid Cloud Architectures**
- **Disaster Recovery Solutions**
- **Machine Learning Pipelines**
- **Multi-Agent AI Architectures (Bedrock + AgentCore)**
- **IoT Platforms**
- **SAP on AWS**

## Limitations

- PNG diagrams require Graphviz to be installed (`brew install graphviz` on macOS)
- Draw.io generator requires Node.js >= 18.0.0
- Cost estimates are approximations based on AWS public pricing
- Actual costs may vary based on usage patterns and discounts
- Some newer AWS services may not have icons available in either format

## Version History

- **v1.2.0** (2026-03-11): Well-Architected Framework diagram generation
  - New capability: generate diagrams guided by the six Well-Architected pillars
  - New steering guide: well-architected-diagrams.md
  - Pillar-specific cluster color presets (Security=red, Reliability=green, Performance=orange, Cost=purple, Ops=blue, Sustainability=teal)
  - Edge annotations for encryption, failover, caching, and monitoring flows
  - Support for full six-pillar reviews or single-pillar focused diagrams
  - Works with both PNG and draw.io output formats

- **v1.1.0** (2026-03-11): Draw.io diagram generation
  - New MCP server: drawio-generator
  - 80+ AWS service shapes with mxgraph.aws4 library
  - Cluster presets for common groupings
  - Edge styling (dashed, colored, labeled)
  - No external dependencies (Node.js only)
  - Updated keywords: drawio, draw.io, diagrams.net, bedrock, agentcore, sagemaker

- **v1.0.0** (2025-02-27): Initial release
  - AWS Documentation search and reading
  - Architecture diagram generation (PNG via Graphviz)
  - Cost estimation and optimization
  - Integration with 3 MCP servers

## Support & Resources

- AWS Pricing Calculator: https://calculator.aws/
- AWS Architecture Center: https://aws.amazon.com/architecture/
- AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/
- AWS Documentation: https://docs.aws.amazon.com/
- diagrams.net (draw.io): https://app.diagrams.net/

---

**Ready to architect amazing AWS solutions? Let's get started! 🚀**
