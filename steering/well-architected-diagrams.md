---
title: Well-Architected Framework Diagram Generation
description: Generate architecture diagrams guided by the AWS Well-Architected Framework six pillars
---

# Well-Architected Framework Diagram Generation

This guide enables AWS Guru Power to generate architecture diagrams that are explicitly guided by the six pillars of the AWS Well-Architected Framework. Instead of just drawing boxes and arrows, diagrams produced with this workflow visually communicate how each pillar is addressed in the architecture.

## Overview

The AWS Well-Architected Framework provides a consistent approach for evaluating architectures against six pillars:

1. **Operational Excellence** — Automate operations, respond to events, define standards
2. **Security** — Protect data, systems, and assets through risk assessment and mitigation
3. **Reliability** — Recover from failures, meet demand, mitigate disruptions
4. **Performance Efficiency** — Use resources efficiently, maintain efficiency as demand changes
5. **Cost Optimization** — Avoid unnecessary costs, understand spending, select the right resources
6. **Sustainability** — Minimize environmental impact of running cloud workloads

## How It Works

When a user asks for a Well-Architected diagram, follow this process:

### Step 1: Identify the Architecture Pattern

Determine the base architecture pattern (three-tier, serverless, data pipeline, microservices, etc.) from the user's request.

### Step 2: Map Services to Pillars

For each AWS service in the architecture, identify which Well-Architected pillar(s) it primarily supports:

| Pillar | Typical Services | Cluster Color |
|--------|-----------------|---------------|
| Operational Excellence | CloudWatch, CloudFormation, Systems Manager, Config, CloudTrail, EventBridge | Blue (#1A73E8) |
| Security | IAM, Cognito, KMS, WAF, Shield, GuardDuty, Secrets Manager, Certificate Manager | Red (#DD344C) |
| Reliability | Auto Scaling, Multi-AZ RDS, S3 Cross-Region Replication, Route53 Health Checks, Backup | Green (#3F8624) |
| Performance Efficiency | CloudFront, ElastiCache, Aurora, DynamoDB DAX, Global Accelerator | Orange (#ED7100) |
| Cost Optimization | S3 Intelligent-Tiering, Spot Instances, Savings Plans, Compute Optimizer | Purple (#8C4FFF) |
| Sustainability | Graviton instances, Lambda, Fargate, S3 Glacier | Teal (#01A88D) |

### Step 3: Generate the Diagram with Pillar Annotations

When generating draw.io or PNG diagrams, apply these conventions:

- **Group services into clusters named by pillar** when the architecture is being reviewed for Well-Architected compliance
- **Use pillar-specific colors** for cluster borders (see table above)
- **Add edge labels** that indicate the Well-Architected concern (e.g., "Encrypted at rest", "Auto-failover", "Cache hit")
- **Use dashed edges** for monitoring/observability flows
- **Use bold edges** for critical data paths that affect reliability

### Step 4: Add a Well-Architected Legend

Include a text annotation or subtitle in the diagram listing which pillars are addressed and how.

## Pillar-Specific Diagram Patterns

### 1. Operational Excellence

Include these components to demonstrate operational excellence:

- **CloudWatch** with alarms and dashboards for monitoring
- **CloudFormation / CDK** for infrastructure as code
- **Systems Manager** for operational management
- **CloudTrail** for API audit logging
- **EventBridge** for event-driven automation
- **Config** for configuration compliance

Diagram convention: Group in a cluster labeled "Operational Excellence" with blue (#1A73E8) border. Use dashed edges for monitoring flows.

### 2. Security

Include these components to demonstrate security:

- **IAM** roles and policies (least privilege)
- **VPC** with public/private subnet separation
- **Security Groups** and NACLs
- **WAF** in front of public endpoints
- **KMS** for encryption at rest
- **Secrets Manager** for credential management
- **Certificate Manager** for TLS/SSL
- **GuardDuty** for threat detection
- **Cognito** for user authentication

Diagram convention: Group in a cluster labeled "Security" with red (#DD344C) border. Label edges with encryption and auth details.

### 3. Reliability

Include these components to demonstrate reliability:

- **Multi-AZ** deployments for databases and compute
- **Auto Scaling** groups for elastic capacity
- **Route53** health checks and failover routing
- **S3** cross-region replication for critical data
- **Backup** for automated backup plans
- **Multiple Availability Zones** shown as separate clusters

Diagram convention: Group in a cluster labeled "Reliability" with green (#3F8624) border. Show AZ boundaries explicitly. Use bold edges for failover paths.

### 4. Performance Efficiency

Include these components to demonstrate performance efficiency:

- **CloudFront** for content delivery and edge caching
- **ElastiCache** (Redis/Memcached) for application caching
- **DynamoDB** with DAX for microsecond reads
- **Aurora** with read replicas for read scaling
- **Global Accelerator** for network performance
- **Right-sized instances** (annotate instance types)

Diagram convention: Group in a cluster labeled "Performance" with orange (#ED7100) border. Label edges with latency or throughput annotations.

### 5. Cost Optimization

Include these components and annotations to demonstrate cost optimization:

- **S3 Intelligent-Tiering** or lifecycle policies
- **Spot Instances** for fault-tolerant workloads
- **Reserved Instances / Savings Plans** annotations
- **VPC Endpoints** to avoid NAT Gateway costs
- **Auto Scaling** to scale down during low demand
- **Compute Optimizer** recommendations

Diagram convention: Group in a cluster labeled "Cost Optimization" with purple (#8C4FFF) border. Annotate nodes with pricing model (RI, Spot, On-Demand).

### 6. Sustainability

Include these components to demonstrate sustainability:

- **Graviton-based instances** (ARM, energy efficient)
- **Lambda / Fargate** for right-sized compute
- **S3 Glacier** for cold storage (less active infrastructure)
- **Managed services** over self-managed (shared responsibility)
- **Region selection** based on carbon footprint

Diagram convention: Group in a cluster labeled "Sustainability" with teal (#01A88D) border.

## Example Prompts

### Full Well-Architected Review Diagram

```
Create a Well-Architected diagram for a three-tier web application:
- Show how each of the six pillars is addressed
- ALB + EC2 Auto Scaling + RDS Multi-AZ
- Include security (WAF, IAM, KMS), monitoring (CloudWatch, CloudTrail),
  caching (ElastiCache), and cost optimization (Reserved Instances, VPC Endpoints)
- Group services by Well-Architected pillar
- Use pillar-specific colors for clusters
```

### Security-Focused Diagram

```
Create a Well-Architected security-focused diagram for a serverless API:
- API Gateway with WAF
- Lambda in VPC with security groups
- DynamoDB with KMS encryption
- Cognito for authentication
- CloudTrail for audit logging
- GuardDuty for threat detection
- Highlight the Security pillar components in red clusters
```

### Reliability-Focused Diagram

```
Create a Well-Architected reliability diagram showing:
- Multi-AZ deployment across 3 AZs
- Auto Scaling group with health checks
- RDS Multi-AZ with automated backups
- S3 with cross-region replication
- Route53 with health-based failover
- Show failover paths with bold green edges
```

### Cost-Optimized Architecture Diagram

```
Create a Well-Architected cost-optimized diagram:
- Mix of Reserved Instances and Spot Instances
- S3 with Intelligent-Tiering
- VPC Endpoints for S3 and DynamoDB (avoid NAT costs)
- Auto Scaling to match demand
- Annotate each node with pricing model
- Group cost optimization components in purple cluster
```

## Draw.io Cluster Mapping for Well-Architected Pillars

When generating draw.io diagrams, use these cluster configurations:

```json
[
  { "id": "ops", "label": "Operational Excellence", "type": "vpc", "color": "#1A73E8" },
  { "id": "sec", "label": "Security", "type": "security" },
  { "id": "rel", "label": "Reliability", "color": "#3F8624" },
  { "id": "perf", "label": "Performance Efficiency", "type": "compute" },
  { "id": "cost", "label": "Cost Optimization", "color": "#8C4FFF" },
  { "id": "sust", "label": "Sustainability", "type": "bedrock" }
]
```

## Best Practices

1. Not every diagram needs all six pillars — focus on the pillars most relevant to the user's request
2. For architecture reviews, show all six pillars to demonstrate comprehensive coverage
3. Use the pillar color coding consistently across all diagrams in a project
4. Add a subtitle or legend explaining the color coding
5. When estimating costs alongside a Well-Architected diagram, reference the Cost Optimization pillar recommendations
6. Link to the AWS Well-Architected Tool for formal reviews: https://aws.amazon.com/well-architected-tool/

## Resources

- AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/
- AWS Well-Architected Tool: https://aws.amazon.com/well-architected-tool/
- AWS Well-Architected Labs: https://wellarchitectedlabs.com/
- AWS Architecture Center: https://aws.amazon.com/architecture/

---

**Design architectures that are secure, reliable, efficient, cost-effective, and sustainable from the start.**
