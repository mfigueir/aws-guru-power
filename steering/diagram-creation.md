---
title: Creating AWS Architecture Diagrams
description: Complete guide for generating professional AWS diagrams
---

# Creating AWS Architecture Diagrams with AWS Guru

This guide covers everything you need to know about creating professional AWS architecture diagrams.

## Diagram Formats

AWS Guru supports two diagram output formats:

| Format | Tool | Dependencies | Editable | Best For |
|--------|------|-------------|----------|----------|
| **PNG** | aws-diagram MCP (Graphviz) | Graphviz + Python/uv | No | Presentations, final docs |
| **draw.io** | drawio-generator MCP | Node.js only | Yes | Collaboration, Confluence, version control |

### Choosing the Right Format

- Use **PNG** when you need a final, polished image for slides or documents
- Use **draw.io** when the diagram needs to be edited, reviewed by a team, or embedded in Confluence/Notion
- draw.io files are XML-based, making them version-control friendly (git diff works)
- draw.io files can be opened at [app.diagrams.net](https://app.diagrams.net) or the desktop app

## Prerequisites

### Install Graphviz (for PNG diagrams)

Graphviz is required for diagram generation:

```bash
# macOS
brew install graphviz

# Ubuntu/Debian
sudo apt-get install graphviz

# CentOS/RHEL
sudo yum install graphviz

# Windows (Chocolatey)
choco install graphviz

# Windows (Scoop)
scoop install graphviz
```

Verify installation:
```bash
dot -V
# Should output: dot - graphviz version X.X.X
```

### Install Node.js (for draw.io diagrams)

Node.js >= 18 is required for the drawio-generator MCP server.

```bash
# macOS
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
choco install nodejs-lts
```

After installing, run `npm install` inside the drawio-generator folder:
```bash
cd ~/.kiro/powers/aws-guru-power/mcp-servers/drawio-generator
npm install
```

> **Note:** This step is required after every fresh installation or update of the power.

## Draw.io Diagram Creation

### How It Works

The drawio-generator MCP server generates `.drawio` XML files using the `mxgraph.aws4` shape library that is built into diagrams.net. No Graphviz or Python required.

### Tool: `generate_drawio`

Accepts a structured JSON input with:
- **title** / **subtitle**: Diagram header
- **nodes**: Array of AWS service icons with position, label, and service key
- **clusters**: Grouping rectangles with color presets
- **edges**: Connections between nodes with styling

### Tool: `list_aws4_shapes`

Lists all available AWS service shape keys, optionally filtered by category.

### Service Shape Keys

Use these keys in the `service` field of nodes:

**Compute:** `ec2`, `lambda`, `ecs`, `eks`, `fargate`, `batch`, `lightsail`, `auto_scaling`, `step_functions`

**Storage:** `s3`, `ebs`, `efs`, `fsx`, `backup`, `storage_gateway`

**Database:** `rds`, `aurora`, `dynamodb`, `elasticache`, `neptune`, `redshift`, `timestream`, `documentdb`

**Networking:** `vpc`, `cloudfront`, `route53`, `api_gateway`, `alb`, `nlb`, `direct_connect`, `transit_gateway`, `nat_gateway`, `global_accelerator`, `appsync`

**Security:** `iam`, `cognito`, `kms`, `waf`, `shield`, `guardduty`, `secrets_manager`, `certificate_manager`

**Analytics:** `kinesis`, `athena`, `glue`, `emr`, `quicksight`, `msk`, `opensearch`, `lake_formation`

**AI/ML:** `sagemaker`, `bedrock`, `comprehend`, `rekognition`, `lex`, `polly`, `textract`, `kendra`, `translate`

**Management:** `cloudwatch`, `cloudformation`, `systems_manager`, `config`, `cloudtrail`, `eventbridge`

**Integration:** `sqs`, `sns`

**IoT:** `iot_core`, `iot_greengrass`, `iot_sensor`

**General:** `users`, `client`, `traditional_server`, `documents`, `generic_database`

### Cluster Presets

Use the `type` field in clusters for automatic color coding:

| Type | Color | Use Case |
|------|-------|----------|
| `agentcore` | Orange (#FF8000) | AgentCore Runtime |
| `bedrock` | Green (#01A88D) | Amazon Bedrock |
| `vpc` | Purple (#8C4FFF) | VPC boundaries |
| `security` | Red (#DD344C) | Security layer |
| `data` | Magenta (#C925D1) | Data / databases |
| `storage` | Green (#3F8624) | Storage layer |
| `compute` | Orange (#ED7100) | Compute layer |
| `onpremise` | Gray (#5A6C86) | On-premises |
| `output` | Purple (#8C4FFF) | Output / dashboards |

### Draw.io Example

```
Create a draw.io diagram for a serverless API:
- API Gateway receiving requests from Users
- Lambda for business logic
- DynamoDB for data
- S3 for file storage
- CloudWatch for monitoring
- Cognito for auth
Group Lambda + DynamoDB in a "compute" cluster
Group S3 in a "storage" cluster
```

### Editing Generated draw.io Files

1. Open the `.drawio` file at [app.diagrams.net](https://app.diagrams.net)
2. Or use the diagrams.net desktop app
3. Or install the Confluence/Notion draw.io plugin for embedded editing
4. All AWS4 shapes are available in the shape panel under "AWS"

---

## PNG Diagram Creation (Graphviz)

## Diagram Basics

### Available AWS Services

AWS Guru supports 200+ AWS services across categories:

- **Compute**: EC2, Lambda, ECS, EKS, Fargate, Batch
- **Storage**: S3, EBS, EFS, FSx, Backup
- **Database**: RDS, DynamoDB, Aurora, ElastiCache, Neptune
- **Networking**: VPC, ALB, NLB, CloudFront, Route53, API Gateway
- **Analytics**: Athena, EMR, Kinesis, Glue, QuickSight
- **ML/AI**: SageMaker, Comprehend, Rekognition, Bedrock
- **Security**: IAM, KMS, Secrets Manager, WAF, Shield
- **Management**: CloudWatch, CloudFormation, Systems Manager

### Diagram Structure

```
with Diagram("Title", show=False, direction="LR"):
    # Components
    user = User("Users")
    alb = ALB("Load Balancer")
    ec2 = EC2("Web Server")
    
    # Connections
    user >> alb >> ec2
```

**Key Elements:**
- **Title**: Diagram name
- **show=False**: Don't display (save to file only)
- **direction**: "LR" (left-right), "TB" (top-bottom), "RL", "BT"
- **Clusters**: Group related components
- **Edges**: Define connections and data flow

## Basic Patterns

### Pattern 1: Simple Web Application

```
Create a diagram with:
- Users connecting to Application Load Balancer
- ALB routing to 2 EC2 instances
- EC2 instances connecting to RDS database
- S3 bucket for static assets
```

**Result:**
- Clean left-to-right flow
- Proper AWS service icons
- Clear data paths

### Pattern 2: Serverless Application

```
Create a serverless architecture:
- API Gateway receiving requests
- Lambda functions for processing
- DynamoDB for data storage
- S3 for file storage
- CloudWatch for monitoring
```

### Pattern 3: Data Pipeline

```
Design a data processing pipeline:
- Kinesis Data Streams for ingestion
- Lambda for real-time processing
- S3 buckets (raw, processed, curated)
- Glue for ETL
- Athena for querying
- QuickSight for visualization
```

## Advanced Techniques

### Using Clusters

Clusters group related components:

```
Create a VPC architecture with:
- VPC containing all resources
- Availability Zone 1 cluster:
  - Public subnet with ALB
  - Private subnet with EC2
- Availability Zone 2 cluster:
  - Public subnet with ALB
  - Private subnet with EC2
- RDS in separate database subnets
```

**Benefits:**
- Visual organization
- Clear boundaries
- Better readability

### Styling Connections

Use Edge attributes for visual clarity:

```
Create a diagram showing:
- Blue bold arrows for data flow
- Green dashed lines for replication
- Red dotted lines for monitoring
- Orange lines for security group associations
```

**Edge Styles:**
- `style="bold"`: Thick lines
- `style="dashed"`: Dashed lines
- `style="dotted"`: Dotted lines
- `color="blue"`: Colored lines
- `label="text"`: Add labels

### Multi-Layer Architectures

```
Create a three-tier architecture:
- Presentation Layer (cluster):
  - CloudFront
  - S3 for static content
- Application Layer (cluster):
  - ALB
  - EC2 Auto Scaling group
  - Lambda functions
- Data Layer (cluster):
  - RDS Multi-AZ
  - ElastiCache
  - DynamoDB
```

## Common Architecture Patterns

### 1. High Availability Web Application

```
Create an HA web application:
- Route53 for DNS
- CloudFront for CDN
- ALB in 2 availability zones
- EC2 Auto Scaling group (2-10 instances)
- RDS Multi-AZ MySQL
- ElastiCache Redis cluster
- S3 for static assets and backups
- CloudWatch for monitoring
```

**Key Features:**
- Multi-AZ deployment
- Auto Scaling
- Database replication
- CDN for performance
- Monitoring and alerts

### 2. Microservices on ECS

```
Design a microservices platform:
- API Gateway for external access
- Application Load Balancer
- ECS Fargate cluster with multiple services:
  - User Service
  - Product Service
  - Order Service
  - Payment Service
- DynamoDB tables per service
- SQS queues for async communication
- ElastiCache for shared cache
- CloudWatch for logs and metrics
```

**Key Features:**
- Service isolation
- Independent scaling
- Async messaging
- Shared caching

### 3. Event-Driven Architecture

```
Create an event-driven system:
- S3 bucket triggering events
- EventBridge for event routing
- Lambda functions for processing
- Step Functions for orchestration
- SNS for notifications
- SQS for queuing
- DynamoDB for state management
```

**Key Features:**
- Loose coupling
- Scalability
- Resilience
- Async processing

### 4. Data Lake Architecture

```
Design a data lake:
- Ingestion layer:
  - Kinesis Data Streams
  - Kinesis Firehose
  - AWS DMS
- Storage layer:
  - S3 buckets (raw/processed/curated)
  - Lake Formation
- Processing layer:
  - Glue ETL jobs
  - EMR clusters
  - Lambda functions
- Analytics layer:
  - Athena
  - QuickSight
  - SageMaker
```

**Key Features:**
- Scalable storage
- Multiple processing options
- Unified analytics
- ML integration

### 5. Hybrid Cloud Architecture

```
Create a hybrid architecture:
- On-premises data center
- AWS Direct Connect
- Transit Gateway
- VPC with:
  - Application servers
  - Database servers
- S3 for backup
- CloudWatch for monitoring
```

**Key Features:**
- Secure connectivity
- Low latency
- Unified management
- Disaster recovery

## Diagram Best Practices

### 1. Layout and Flow

**Left-to-Right Flow:**
- Users/sources on the left
- Processing in the middle
- Storage/destinations on the right

**Top-to-Bottom Flow:**
- External services at top
- Application layers in middle
- Data layer at bottom

### 2. Grouping and Organization

**Use Clusters for:**
- VPCs and subnets
- Availability Zones
- Logical tiers (web, app, data)
- Security boundaries
- Service groups

### 3. Color Coding

**Standard Colors:**
- Blue: Data flow
- Green: Replication/sync
- Red: Security/IAM
- Orange: Monitoring
- Purple: Metadata
- Gray: Management

### 4. Labeling

**Good Labels:**
- Descriptive names
- Include key specs (instance types, sizes)
- Show ports for security groups
- Indicate Multi-AZ, regions

**Example:**
```
ALB("Application LB\nPort 80/443")
EC2("Web Server\nt3.medium")
RDS("MySQL 8.0\ndb.t3.medium\nMulti-AZ")
```

### 5. Complexity Management

**For Complex Architectures:**
- Create multiple diagrams
- One for network topology
- One for application flow
- One for data flow
- One for security

## Troubleshooting

### Common Issues

**Issue 1: Graphviz Not Found**
```
Error: ExecutableNotFound: failed to execute 'dot'

Solution:
1. Install Graphviz (see Prerequisites)
2. Restart terminal/IDE
3. Verify: dot -V
```

**Issue 2: Diagram Too Cluttered**
```
Problem: Too many components in one diagram

Solution:
1. Break into multiple diagrams
2. Use more clusters
3. Simplify connections
4. Focus on one aspect at a time
```

**Issue 3: Icons Not Found**
```
Problem: Service icon not available

Solution:
1. Check available icons: "List AWS diagram icons"
2. Use similar service icon
3. Use generic icons (GenericDatabase, GenericFirewall)
```

**Issue 4: Layout Issues**
```
Problem: Components not arranged well

Solution:
1. Try different direction (LR vs TB)
2. Adjust cluster nesting
3. Reorder component definitions
4. Use invisible edges for positioning
```

### Optimization Tips

**For Better Diagrams:**

1. **Start Simple**: Begin with core components
2. **Add Gradually**: Layer in details
3. **Test Frequently**: Generate and review
4. **Iterate**: Refine based on output
5. **Use Templates**: Start from patterns

## Example Workflows

### Workflow 1: From Scratch

```
Step 1: Define architecture
"I need a web application with load balancer, app servers, and database"

Step 2: Add details
"Use ALB, 2 EC2 instances, RDS MySQL Multi-AZ"

Step 3: Add networking
"Put ALB in public subnets, EC2 and RDS in private subnets"

Step 4: Add security
"Include security groups and NAT gateway"

Step 5: Add monitoring
"Add CloudWatch monitoring"

Step 6: Generate
AWS Guru creates the diagram
```

### Workflow 2: Iterative Refinement

```
Step 1: Create basic diagram
"Create a simple three-tier architecture"

Step 2: Review and refine
"Add Auto Scaling group for EC2"

Step 3: Add more details
"Include ElastiCache for caching"

Step 4: Add security
"Show security group associations"

Step 5: Final touches
"Add CloudFront and Route53"
```

### Workflow 3: From Documentation

```
Step 1: Research
"Search AWS docs for microservices best practices"

Step 2: Design based on docs
"Create microservices architecture following AWS best practices"

Step 3: Generate diagram
AWS Guru creates based on research

Step 4: Validate
Compare with AWS reference architectures
```

## Advanced Features

### Custom Styling

```
Create a diagram with custom styling:
- Use Edge(color="blue", style="bold") for primary data flow
- Use Edge(color="green", style="dashed") for replication
- Use Edge(color="red", style="dotted") for IAM permissions
- Add labels to edges: Edge(label="HTTPS")
```

### Multiple Diagrams

```
Create a series of diagrams:
1. Network topology diagram
2. Application architecture diagram
3. Data flow diagram
4. Security architecture diagram
5. Disaster recovery diagram
```

### Integration with Documentation

```
Workflow:
1. Search AWS docs for service details
2. Create architecture based on best practices
3. Generate diagram
4. Create cost estimate
5. Document everything together
```

## Diagram Gallery

### Example 1: Startup MVP
- Simple, cost-effective
- Single AZ acceptable
- Minimal services

### Example 2: Production Application
- Multi-AZ for HA
- Auto Scaling
- Monitoring and backups

### Example 3: Enterprise Platform
- Multi-region
- Advanced security
- Comprehensive monitoring
- DR capabilities

### Example 4: Serverless First
- No EC2 instances
- Event-driven
- Pay-per-use
- Auto-scaling

### Example 5: Big Data Platform
- Massive scale
- Multiple processing engines
- Data lake architecture
- ML integration

## Resources

- **AWS Architecture Center**: https://aws.amazon.com/architecture/
- **AWS Reference Architectures**: https://github.com/aws-samples
- **AWS Well-Architected**: https://aws.amazon.com/architecture/well-architected/
- **Diagrams Package Docs**: https://diagrams.mingrammer.com/

---

**Ready to create stunning AWS diagrams? Let's visualize your architecture! 🎨**
