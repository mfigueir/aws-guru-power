# AWS Guru - Kiro Power

> Transform your AWS architecture workflow with integrated documentation, diagrams, and cost estimation

## 🚀 Quick Start

```bash
# 1. Install prerequisites
brew install graphviz  # macOS
curl -LsSf https://astral.sh/uv/install.sh | sh  # Install uv

# 2. Install AWS Guru Power in Kiro
# Copy this folder to your Kiro powers directory

# 3. Start using!
# In Kiro, activate the aws-guru power and start creating architectures
```

## 📋 What's Included

### Core Capabilities

1. **AWS Documentation Search**
   - Search across all AWS documentation
   - Read specific pages with content extraction
   - Get recommendations for related content
   - Filter by service, guide type, and more

2. **Architecture Diagram Generation (PNG)**
   - 200+ AWS service icons
   - Professional Graphviz-based diagrams
   - Multiple layout options
   - Custom styling and colors

3. **Architecture Diagram Generation (draw.io)**
   - Editable `.drawio` XML files with AWS4 icon shapes
   - 80+ AWS service shapes across 11 categories
   - Open in diagrams.net (desktop or web)
   - Embed in Confluence, Notion, SharePoint
   - No Graphviz required (Node.js only)
   - Version-control friendly (XML/text)

4. **Well-Architected Framework Diagrams**
   - Generate diagrams guided by the six Well-Architected pillars
   - Services grouped and color-coded by pillar (Security, Reliability, Performance, Cost, Ops, Sustainability)
   - Full six-pillar review diagrams or single-pillar focused views
   - Pillar-specific cluster presets with consistent color coding
   - Edge annotations for encryption, failover, caching, and monitoring
   - Works with both PNG and draw.io formats

5. **Cost Estimation**
   - Detailed cost breakdowns by service
   - Monthly and annual projections
   - Optimization recommendations
   - Reserved Instance savings calculations

### MCP Servers

- **aws-docs**: AWS Documentation search and reading
- **aws-diagram**: Architecture diagram generation (PNG via Graphviz)
- **drawio-generator**: Architecture diagram generation (editable draw.io XML)
- **abap-analyzer**: SAP ABAP code analysis (optional)

## 📚 Documentation

### Main Documentation
- **POWER.md**: Complete power overview and capabilities
- **README.md**: This file - setup and quick reference

### Steering Files
- **getting-started.md**: Quick start guide with examples
- **cost-estimation.md**: Comprehensive cost estimation guide
- **diagram-creation.md**: Complete diagram creation guide
- **well-architected-diagrams.md**: Well-Architected Framework diagram generation guide

## 🎯 Common Use Cases

### Use Case 1: Design New Architecture
```
1. Search AWS docs for service information
2. Create architecture diagram
3. Generate cost estimate
4. Optimize based on recommendations
```

### Use Case 2: Cost Optimization
```
1. Diagram existing architecture
2. Estimate current costs
3. Identify optimization opportunities
4. Calculate potential savings
```

### Use Case 3: Documentation & Proposals
```
1. Research AWS services
2. Create visual architecture
3. Add cost projections
4. Present complete solution
```

### Use Case 4: Well-Architected Review
```
1. Define architecture and services
2. Map services to Well-Architected pillars
3. Generate pillar-annotated diagram
4. Review coverage across all six pillars
5. Identify gaps and remediate
```

## 💡 Example Prompts

### Create a Three-Tier Architecture
```
Create a three-tier web application with:
- Application Load Balancer in public subnets
- EC2 Auto Scaling group in private subnets
- RDS MySQL Multi-AZ database
- S3 for static assets
- NAT Gateway for outbound traffic
Deploy across 2 availability zones in us-east-1
Then estimate the monthly cost
```

### Design a Serverless API
```
Design a serverless REST API with:
- API Gateway for endpoints
- Lambda functions for business logic
- DynamoDB for data storage
- S3 for file uploads
- CloudWatch for monitoring
Include cost estimate for 1 million requests/month
```

### Create a Data Pipeline
```
Create a data processing pipeline with:
- Kinesis Data Streams for ingestion
- Lambda for transformation
- S3 data lake (raw/processed/curated)
- Glue for ETL
- Athena for querying
- QuickSight for visualization
Show architecture and estimate costs
```

### Well-Architected Review Diagram
```
Create a Well-Architected diagram for a three-tier web app:
- Show how each of the six pillars is addressed
- ALB + EC2 Auto Scaling + RDS Multi-AZ
- Include WAF, IAM, KMS for Security
- CloudWatch, CloudTrail for Operational Excellence
- ElastiCache for Performance Efficiency
- Reserved Instances, VPC Endpoints for Cost Optimization
- Group services by pillar with color coding
```

## 🛠️ Installation

### Prerequisites

1. **Graphviz** (required for diagrams)
   ```bash
   # macOS
   brew install graphviz
   
   # Ubuntu/Debian
   sudo apt-get install graphviz
   
   # Windows
   choco install graphviz
   ```

2. **Python & uv** (required for MCP servers)
   ```bash
   # Install uv
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

### Install AWS Guru Power

1. **Copy to Kiro Powers Directory**
   ```bash
   # User-level (recommended)
   cp -r aws-guru-power ~/.kiro/powers/
   
   # Workspace-level
   cp -r aws-guru-power .kiro/powers/
   ```

2. **Verify Installation**
   - Open Kiro
   - Check Powers panel
   - Look for "AWS Guru"

3. **Install draw.io Generator Dependencies**
   ```bash
   cd ~/.kiro/powers/aws-guru-power/mcp-servers/drawio-generator
   npm install
   ```

4. **Activate the Power**
   ```
   In Kiro chat:
   "Activate aws-guru power"
   ```

## 📖 Usage Examples

### Example 1: Complete Workflow

**Step 1: Research**
```
Search AWS documentation for:
- EC2 instance types for web applications
- RDS Multi-AZ best practices
- Application Load Balancer configuration
```

**Step 2: Design**
```
Create an architecture diagram with:
- ALB distributing traffic to EC2 instances
- RDS MySQL with Multi-AZ deployment
- ElastiCache for session storage
- S3 for static content
- CloudWatch for monitoring
```

**Step 3: Estimate**
```
Estimate monthly cost for:
- 2 t3.medium EC2 instances (24/7)
- 1 Application Load Balancer
- 1 db.t3.medium RDS Multi-AZ
- 500 GB S3 storage
- 1 TB data transfer out
Region: us-east-1
```

**Step 4: Optimize**
```
Identify cost optimization opportunities:
- Reserved Instance savings
- Right-sizing recommendations
- Storage class optimization
- Network cost reduction
```

### Example 2: Quick Architecture

```
Create a simple web app architecture:
- Users → CloudFront → S3 (static site)
- API requests → API Gateway → Lambda → DynamoDB
Include cost estimate for 100K users/month
```

### Example 3: Enterprise Platform

```
Design an enterprise microservices platform:
- API Gateway for external access
- ECS Fargate for containers
- Application Load Balancer for routing
- RDS Aurora for relational data
- DynamoDB for NoSQL data
- ElastiCache for caching
- SQS for messaging
- S3 for object storage
- CloudWatch for monitoring
Deploy across 3 availability zones
Estimate costs for production workload
```

## 🎨 Diagram Features

### Supported Services (200+)

**Compute**: EC2, Lambda, ECS, EKS, Fargate, Batch, Lightsail
**Storage**: S3, EBS, EFS, FSx, Backup, Storage Gateway
**Database**: RDS, DynamoDB, Aurora, ElastiCache, Neptune, QLDB
**Networking**: VPC, ALB, NLB, CloudFront, Route53, API Gateway, Direct Connect
**Analytics**: Athena, EMR, Kinesis, Glue, QuickSight, Lake Formation
**ML/AI**: SageMaker, Comprehend, Rekognition, Bedrock, Lex
**Security**: IAM, KMS, Secrets Manager, WAF, Shield, GuardDuty
**Management**: CloudWatch, CloudFormation, Systems Manager, Config

### Diagram Styles

- **Direction**: Left-to-right, Top-to-bottom
- **Clusters**: Group related components
- **Colors**: Custom edge colors for data flow
- **Styles**: Bold, dashed, dotted lines
- **Labels**: Descriptive component names

## 💰 Cost Estimation Features

### Supported Services

- EC2 instances (all types)
- RDS databases (all engines)
- Lambda functions
- ECS/EKS containers
- S3 storage (all classes)
- EBS volumes
- Application/Network Load Balancers
- NAT Gateways
- Data Transfer
- CloudWatch
- DynamoDB
- ElastiCache
- And more...

### Cost Optimization

- Reserved Instance savings (30-72%)
- Savings Plans recommendations
- Right-sizing analysis
- Storage class optimization
- Network cost reduction
- Auto Scaling benefits

## 🔧 Configuration

### MCP Server Configuration

The power automatically configures four MCP servers:

```json
{
  "aws-docs": {
    "command": "uvx",
    "args": ["awslabs.aws-documentation-mcp-server@latest"]
  },
  "aws-diagram": {
    "command": "uvx",
    "args": ["awslabs.aws-diagram-mcp-server@latest"]
  },
  "drawio-generator": {
    "command": "node",
    "args": ["${powerDir}/mcp-servers/drawio-generator/index.js"]
  },
  "abap-analyzer": {
    "command": "node",
    "args": ["${powerDir}/mcp-servers/abap-analyzer/index.js"]
  }
}
```

### Customization

You can customize the power by:
- Editing steering files for specific workflows
- Adding custom diagram templates
- Creating cost estimation templates
- Adding organization-specific guidelines

## 📊 Output Files

### Generated Files

**Diagrams**: `generated-diagrams/*.png` and `generated-diagrams/*.drawio`
- Professional PNG images (Graphviz)
- Editable draw.io XML files (diagrams.net)
- AWS service icons
- Clear data flow visualization

**Cost Estimates**: `generated-diagrams/*-cost-estimate.md`
- Detailed cost breakdowns
- Optimization recommendations
- Monthly and annual projections

## 🐛 Troubleshooting

### Graphviz Not Found
```bash
# Install Graphviz
brew install graphviz  # macOS
sudo apt-get install graphviz  # Linux

# Verify installation
dot -V
```

### MCP Server Issues
```bash
# Ensure uv is installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Restart Kiro after installation
```

### Diagram Generation Fails
```
1. Check Graphviz installation: dot -V
2. Verify MCP server is running
3. Check error messages in Kiro
4. Try simpler diagram first
```

## 📝 Best Practices

### Architecture Design
1. Start with high-level components
2. Add details incrementally
3. Consider high availability
4. Include security components
5. Plan for monitoring

### Cost Estimation
1. Specify AWS region
2. Include all components
3. Account for data transfer
4. Consider Reserved Instances
5. Plan for growth

### Documentation
1. Search before designing
2. Follow AWS best practices
3. Reference Well-Architected Framework
4. Use Well-Architected pillar-mapped diagrams for architecture reviews
5. Document assumptions
6. Keep estimates updated

## 🤝 Contributing

Want to improve AWS Guru? Contributions welcome!

1. Add new diagram templates
2. Improve cost estimation formulas
3. Add more steering guides
4. Share example architectures
5. Report issues and suggestions

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Resources

- **AWS Documentation**: https://docs.aws.amazon.com/
- **AWS Architecture Center**: https://aws.amazon.com/architecture/
- **AWS Pricing Calculator**: https://calculator.aws/
- **AWS Well-Architected**: https://aws.amazon.com/architecture/well-architected/
- **Diagrams Package**: https://diagrams.mingrammer.com/

## 📞 Support

- Check steering files for detailed guides
- Review POWER.md for complete documentation
- Search AWS documentation for service-specific help
- Create issues for bugs or feature requests

---

**Built with ❤️ for AWS architects and developers**

**Version**: 1.2.0
**Last Updated**: March 2026
