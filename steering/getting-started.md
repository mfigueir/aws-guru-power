---
title: Getting Started with AWS Guru
description: Quick start guide for using AWS Guru Power
---

# Getting Started with AWS Guru

Welcome to AWS Guru! This guide will help you get started with creating AWS architectures, searching documentation, and estimating costs.

## Prerequisites

Before using AWS Guru, ensure you have:

1. **Graphviz installed** (for diagram generation)
   ```bash
   # macOS
   brew install graphviz
   
   # Ubuntu/Debian
   sudo apt-get install graphviz
   
   # Windows (using Chocolatey)
   choco install graphviz
   ```

2. **Python and uv installed** (for MCP servers)
   ```bash
   # Install uv (Python package manager)
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

## Quick Start Examples

### Example 1: Create Your First Architecture Diagram

```
Create a simple web application architecture with:
- Application Load Balancer
- 2 EC2 instances in private subnets
- RDS MySQL database
- S3 bucket for static files
Use 2 availability zones for high availability
```

**What AWS Guru will do:**
1. Generate a professional architecture diagram
2. Save it to `generated-diagrams/` folder
3. Show you the file path

### Example 2: Search AWS Documentation

```
Search AWS documentation for:
- Lambda function best practices
- Cold start optimization techniques
- Pricing information
```

**What AWS Guru will do:**
1. Search across all AWS documentation
2. Return relevant pages with URLs
3. Optionally read specific pages for details

### Example 3: Get Cost Estimate

```
Estimate monthly costs for:
- 2 t3.medium EC2 instances (us-east-1)
- 1 Application Load Balancer
- 1 RDS db.t3.medium Multi-AZ MySQL
- 500 GB S3 storage
- 1 NAT Gateway
Include data transfer: 1TB in, 1TB out
```

**What AWS Guru will do:**
1. Calculate costs for each service
2. Provide monthly and annual totals
3. Suggest optimization opportunities
4. Compare Reserved Instance savings

## Common Workflows

### Workflow 1: Design → Diagram → Cost

**Step 1: Design**
```
I need to design a serverless API with:
- API Gateway
- Lambda functions
- DynamoDB table
- CloudWatch monitoring
```

**Step 2: Generate Diagram**
AWS Guru will create a visual architecture diagram.

**Step 3: Estimate Costs**
```
Now estimate the monthly cost for:
- 1 million API requests
- 10 GB DynamoDB storage
- 5 GB CloudWatch logs
```

### Workflow 2: Research → Design → Implement

**Step 1: Research**
```
Search for AWS best practices on:
- Microservices architecture
- Container orchestration with ECS
```

**Step 2: Design**
Based on documentation, design your architecture.

**Step 3: Create Diagram**
Generate visual representation of your design.

## Tips for Better Results

### When Creating Diagrams

1. **Be Specific About Services**
   - ✅ Good: "Use Application Load Balancer in public subnets"
   - ❌ Vague: "Use a load balancer"

2. **Specify Availability Zones**
   - ✅ Good: "Deploy across 2 availability zones"
   - ❌ Vague: "Make it highly available"

3. **Include Security Components**
   - Mention Security Groups
   - Include IAM roles
   - Specify VPC configuration

4. **Define Data Flow**
   - Describe how data moves through the system
   - Mention any data transformations
   - Include backup/DR considerations

### When Searching Documentation

1. **Use Specific Service Names**
   - ✅ Good: "Amazon RDS MySQL Multi-AZ pricing"
   - ❌ Vague: "database costs"

2. **Include Version Information**
   - ✅ Good: "EKS 1.28 best practices"
   - ❌ Vague: "Kubernetes on AWS"

3. **Filter by Guide Type**
   - User Guide: How-to information
   - API Reference: Technical specifications
   - Best Practices: Architectural guidance

### When Estimating Costs

1. **Specify AWS Region**
   - Costs vary significantly by region
   - Default is usually us-east-1

2. **Include All Components**
   - Compute (EC2, Lambda, ECS)
   - Storage (S3, EBS, EFS)
   - Database (RDS, DynamoDB)
   - Networking (ALB, NAT Gateway, Data Transfer)
   - Monitoring (CloudWatch)

3. **Provide Usage Metrics**
   - Number of requests/month
   - Data transfer volumes
   - Storage requirements
   - Concurrent users

4. **Consider Time Horizon**
   - Short-term: On-Demand pricing
   - Long-term: Reserved Instances or Savings Plans

## Architecture Patterns

### Pattern 1: Three-Tier Web Application

```
Create a three-tier architecture:
- Tier 1: ALB in public subnets (2 AZs)
- Tier 2: EC2 Auto Scaling group in private subnets
- Tier 3: RDS Multi-AZ in database subnets
Include: NAT Gateway, S3 for static assets, CloudWatch monitoring
```

### Pattern 2: Serverless Data Pipeline

```
Design a serverless data processing pipeline:
- Ingestion: Kinesis Data Streams
- Processing: Lambda functions
- Storage: S3 (raw/processed/curated buckets)
- Analytics: Athena + QuickSight
- Orchestration: Step Functions
```

### Pattern 3: Microservices Platform

```
Create a microservices architecture:
- API Gateway for external access
- ECS Fargate for container orchestration
- Application Load Balancer for internal routing
- DynamoDB for data storage
- ElastiCache for caching
- SQS for async messaging
```

### Pattern 4: Machine Learning Pipeline

```
Design an ML pipeline:
- Data ingestion: S3 + Glue
- Training: SageMaker
- Model deployment: SageMaker endpoints
- Inference: Lambda + API Gateway
- Monitoring: CloudWatch + SageMaker Model Monitor
```

## Cost Optimization Strategies

### 1. Compute Optimization

- **Right-sizing**: Match instance types to workload
- **Auto Scaling**: Scale down during low traffic
- **Spot Instances**: Use for fault-tolerant workloads
- **Reserved Instances**: 1-3 year commitments for steady workloads
- **Savings Plans**: Flexible commitment-based discounts

### 2. Storage Optimization

- **S3 Lifecycle Policies**: Move to cheaper storage classes
- **S3 Intelligent-Tiering**: Automatic cost optimization
- **EBS Snapshots**: Delete old snapshots
- **Data Compression**: Reduce storage footprint

### 3. Network Optimization

- **VPC Endpoints**: Avoid NAT Gateway charges for AWS services
- **CloudFront**: Reduce data transfer costs
- **Same-Region Traffic**: Keep traffic within one region
- **Direct Connect**: For large data transfers

### 4. Database Optimization

- **Right-sizing**: Choose appropriate instance types
- **Read Replicas**: Offload read traffic
- **Reserved Instances**: Significant savings for databases
- **Aurora Serverless**: Pay only for usage

## Troubleshooting

### Diagram Generation Issues

**Problem**: "Graphviz not found"
```bash
# Solution: Install Graphviz
brew install graphviz  # macOS
```

**Problem**: Diagram looks cluttered
```
# Solution: Simplify or break into multiple diagrams
Create separate diagrams for:
1. Network architecture
2. Application layer
3. Data layer
```

### Documentation Search Issues

**Problem**: Too many results
```
# Solution: Use more specific search terms and filters
Search for "RDS MySQL Multi-AZ pricing" 
Filter by: product_types=["Amazon Relational Database Service"]
```

**Problem**: Outdated information
```
# Solution: Check publication dates and use recommendations
Get recommendations for the latest content
```

### Cost Estimation Issues

**Problem**: Costs seem too high
```
# Solution: Review and optimize
1. Check instance types (right-sizing)
2. Consider Reserved Instances
3. Review data transfer costs
4. Optimize storage classes
```

## Next Steps

1. **Try the Examples**: Start with the quick start examples above
2. **Read the Patterns**: Explore common architecture patterns
3. **Experiment**: Create your own architectures
4. **Optimize**: Use cost estimation to find savings

## Getting Help

- Check the main POWER.md for detailed documentation
- Review other steering files for specific workflows
- Consult AWS documentation for service-specific details

---

**Ready to become an AWS architecture expert? Let's build something amazing! 🚀**
