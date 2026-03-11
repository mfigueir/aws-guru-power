---
title: Cost Estimation with AWS Guru
description: Detailed guide for estimating and optimizing AWS costs
---

# Cost Estimation with AWS Guru

This guide provides comprehensive instructions for estimating AWS costs and identifying optimization opportunities.

## Cost Estimation Framework

### 1. Gather Requirements

Before estimating costs, collect:

- **AWS Region**: Pricing varies by region
- **Service Types**: EC2, RDS, S3, etc.
- **Instance Types**: t3.medium, db.m5.large, etc.
- **Usage Patterns**: 24/7, business hours, sporadic
- **Data Volumes**: Storage, transfer, requests
- **High Availability**: Single-AZ vs Multi-AZ
- **Backup Requirements**: Retention period, frequency

### 2. Calculate Base Costs

#### Compute Services

**EC2 Instances**
```
Cost = (Hourly Rate × Hours per Month × Number of Instances)

Example:
- Instance: t3.medium ($0.0416/hour)
- Quantity: 2 instances
- Usage: 730 hours/month (24/7)
- Cost: $0.0416 × 730 × 2 = $60.74/month
```

**Lambda Functions**
```
Cost = (Requests × Request Price) + (GB-seconds × Compute Price)

Example:
- Requests: 1 million/month
- Duration: 200ms average
- Memory: 512 MB
- Request cost: 1M × $0.20/1M = $0.20
- Compute cost: (1M × 0.2s × 0.5GB) × $0.0000166667 = $1.67
- Total: $1.87/month
```

**ECS Fargate**
```
Cost = (vCPU Hours × vCPU Price) + (GB Hours × Memory Price)

Example:
- vCPU: 0.25 vCPU × 730 hours = 182.5 vCPU-hours
- Memory: 0.5 GB × 730 hours = 365 GB-hours
- vCPU cost: 182.5 × $0.04048 = $7.39
- Memory cost: 365 × $0.004445 = $1.62
- Total: $9.01/month per task
```

#### Storage Services

**S3 Storage**
```
Cost = (Storage GB × Storage Price) + (Requests × Request Price)

Example:
- Storage: 500 GB S3 Standard
- GET requests: 100,000/month
- PUT requests: 10,000/month
- Storage cost: 500 × $0.023 = $11.50
- GET cost: 100,000 × $0.0004/1,000 = $0.04
- PUT cost: 10,000 × $0.005/1,000 = $0.05
- Total: $11.59/month
```

**EBS Volumes**
```
Cost = Volume Size × Price per GB

Example:
- Volume: 100 GB gp3
- Price: $0.08/GB-month
- Cost: 100 × $0.08 = $8.00/month
```

#### Database Services

**RDS (Single-AZ)**
```
Cost = (Instance Hours × Instance Price) + (Storage × Storage Price)

Example:
- Instance: db.t3.medium ($0.068/hour)
- Storage: 100 GB gp3 ($0.115/GB-month)
- Instance cost: $0.068 × 730 = $49.64
- Storage cost: 100 × $0.115 = $11.50
- Total: $61.14/month
```

**RDS (Multi-AZ)**
```
Cost = Single-AZ Cost × 2

Example:
- Single-AZ: $61.14
- Multi-AZ: $61.14 × 2 = $122.28/month
```

**DynamoDB**
```
On-Demand:
- Write: $1.25 per million write request units
- Read: $0.25 per million read request units
- Storage: $0.25 per GB-month

Provisioned:
- Write: $0.00065 per WCU-hour
- Read: $0.00013 per RCU-hour
- Storage: $0.25 per GB-month
```

#### Networking Services

**Application Load Balancer**
```
Cost = (Hours × Hourly Rate) + (LCU Hours × LCU Rate)

Example:
- Hours: 730/month
- Hourly rate: $0.0225/hour
- LCU-hours: ~70/month (estimated)
- Hour cost: 730 × $0.0225 = $16.43
- LCU cost: 70 × $0.008 = $0.56 (per dimension)
- Total: ~$86.43/month (with all LCU dimensions)
```

**NAT Gateway**
```
Cost = (Hours × Hourly Rate) + (Data Processed × Processing Rate)

Example:
- Hours: 730/month
- Data processed: 500 GB/month
- Hour cost: 730 × $0.045 = $32.85
- Processing cost: 500 × $0.045 = $22.50
- Total: $55.35/month
```

**Data Transfer**
```
OUT to Internet (after 1 GB free):
- First 10 TB: $0.09/GB
- Next 40 TB: $0.085/GB
- Next 100 TB: $0.07/GB
- Over 150 TB: $0.05/GB

Example:
- Transfer: 1 TB (1,024 GB)
- Cost: 1,024 × $0.09 = $92.16/month
```

### 3. Add Monitoring & Management

**CloudWatch**
```
- Metrics: First 10 custom metrics free, then $0.30/metric
- Logs: $0.50/GB ingested, $0.03/GB stored
- Alarms: $0.10/alarm/month
- Dashboards: $3.00/dashboard/month

Example:
- Logs: 10 GB/month
- Alarms: 5 alarms
- Log cost: 10 × $0.50 = $5.00
- Alarm cost: 5 × $0.10 = $0.50
- Total: $5.50/month
```

## Cost Optimization Strategies

### Strategy 1: Reserved Instances & Savings Plans

**EC2 Reserved Instances**
```
Savings: 30-72% compared to On-Demand

Example:
- On-Demand: t3.medium = $30.37/month
- 1-Year No Upfront RI: $20.08/month (34% savings)
- 1-Year All Upfront RI: $19.35/month (36% savings)
- 3-Year All Upfront RI: $12.41/month (59% savings)
```

**RDS Reserved Instances**
```
Savings: 35-69% compared to On-Demand

Example:
- On-Demand: db.t3.medium = $49.64/month
- 1-Year No Upfront RI: $32.27/month (35% savings)
- 3-Year All Upfront RI: $20.55/month (59% savings)
```

**Compute Savings Plans**
```
Savings: Up to 66% on EC2, Fargate, Lambda

Example:
- Commit to $100/month for 1 year
- Flexible across instance types, regions, services
- Automatic application to eligible usage
```

### Strategy 2: Right-Sizing

**Process:**
1. Monitor actual resource utilization
2. Identify over-provisioned resources
3. Downsize or change instance families
4. Test and validate performance

**Example:**
```
Current: 4 × m5.xlarge (4 vCPU, 16 GB) = $560/month
Analysis: Average CPU 15%, Memory 30%
Optimized: 4 × t3.large (2 vCPU, 8 GB) = $240/month
Savings: $320/month (57%)
```

### Strategy 3: Auto Scaling

**Benefits:**
- Scale down during low traffic
- Scale up during peak traffic
- Pay only for what you use

**Example:**
```
Without Auto Scaling:
- 4 instances × 730 hours = 2,920 instance-hours
- Cost: 2,920 × $0.0416 = $121.47/month

With Auto Scaling (50% average):
- 2 instances × 730 hours = 1,460 instance-hours
- Cost: 1,460 × $0.0416 = $60.74/month
- Savings: $60.73/month (50%)
```

### Strategy 4: Storage Optimization

**S3 Lifecycle Policies**
```
Day 0-30: S3 Standard ($0.023/GB)
Day 31-90: S3 Standard-IA ($0.0125/GB)
Day 91+: S3 Glacier ($0.004/GB)

Example (1 TB data):
- All Standard: 1,024 × $0.023 = $23.55/month
- With Lifecycle: 
  - 200 GB Standard = $4.60
  - 300 GB Standard-IA = $3.75
  - 524 GB Glacier = $2.10
  - Total: $10.45/month
- Savings: $13.10/month (56%)
```

**S3 Intelligent-Tiering**
```
- Automatic cost optimization
- No retrieval fees
- Monitoring fee: $0.0025 per 1,000 objects

Example:
- 1 TB, 100,000 objects
- Monitoring: 100 × $0.0025 = $0.25/month
- Storage: Automatically optimized
- Typical savings: 20-40%
```

### Strategy 5: Network Optimization

**VPC Endpoints**
```
Without VPC Endpoint:
- NAT Gateway: $32.85/month (730 hours)
- Data processing: 500 GB × $0.045 = $22.50
- Total: $55.35/month

With VPC Endpoint (S3, DynamoDB):
- Endpoint: Free for S3 and DynamoDB
- Reduced NAT usage: 100 GB × $0.045 = $4.50
- Total: $37.35/month
- Savings: $18.00/month (33%)
```

**CloudFront**
```
Without CloudFront:
- Data transfer: 10 TB × $0.09 = $921.60/month

With CloudFront:
- CloudFront transfer: 10 TB × $0.085 = $870.40
- Origin transfer: 2 TB × $0.09 = $184.32
- Total: $1,054.72/month
- Note: Savings come from reduced origin load and caching
```

### Strategy 6: Spot Instances

**Use Cases:**
- Batch processing
- CI/CD pipelines
- Data analysis
- Fault-tolerant applications

**Savings:**
```
On-Demand: m5.large = $0.096/hour
Spot: m5.large = ~$0.029/hour (70% savings)

Example (100 hours/month):
- On-Demand: 100 × $0.096 = $9.60
- Spot: 100 × $0.029 = $2.90
- Savings: $6.70/month (70%)
```

## Cost Estimation Template

### Basic Architecture Cost Breakdown

```markdown
## Architecture: [Name]
**Region**: us-east-1
**Environment**: Production

### Compute
| Service | Type | Quantity | Hours | Unit Cost | Monthly Cost |
|---------|------|----------|-------|-----------|--------------|
| EC2 | t3.medium | 2 | 730 | $0.0416 | $60.74 |
| Lambda | - | 1M requests | - | - | $1.87 |

### Storage
| Service | Type | Size | Unit Cost | Monthly Cost |
|---------|------|------|-----------|--------------|
| S3 | Standard | 500 GB | $0.023 | $11.50 |
| EBS | gp3 | 100 GB | $0.08 | $8.00 |

### Database
| Service | Type | Deployment | Unit Cost | Monthly Cost |
|---------|------|------------|-----------|--------------|
| RDS | db.t3.medium | Multi-AZ | $0.068 | $99.28 |

### Networking
| Service | Type | Usage | Unit Cost | Monthly Cost |
|---------|------|-------|-----------|--------------|
| ALB | - | 730 hours | $0.0225 | $86.43 |
| NAT Gateway | - | 730 hours + 500 GB | - | $55.35 |
| Data Transfer | OUT | 1 TB | $0.09 | $92.16 |

### Monitoring
| Service | Type | Usage | Unit Cost | Monthly Cost |
|---------|------|-------|-----------|--------------|
| CloudWatch | Logs | 10 GB | $0.50 | $5.00 |
| CloudWatch | Alarms | 5 | $0.10 | $0.50 |

### Total Costs
- **Monthly**: $420.83
- **Annual**: $5,049.96

### Optimization Opportunities
1. Reserved Instances (EC2 + RDS): -$59/month
2. VPC Endpoints: -$18/month
3. S3 Lifecycle: -$5/month
4. **Optimized Monthly**: $338.83
5. **Annual Savings**: $984.00 (20%)
```

## Regional Pricing Differences

### Example: t3.medium EC2 Instance (730 hours/month)

| Region | Price/Hour | Monthly Cost | vs us-east-1 |
|--------|------------|--------------|--------------|
| us-east-1 (N. Virginia) | $0.0416 | $30.37 | Baseline |
| us-west-2 (Oregon) | $0.0416 | $30.37 | 0% |
| eu-west-1 (Ireland) | $0.0464 | $33.87 | +12% |
| ap-southeast-1 (Singapore) | $0.0512 | $37.38 | +23% |
| sa-east-1 (São Paulo) | $0.0624 | $45.55 | +50% |

**Tip**: Always specify region for accurate estimates!

## Cost Monitoring Best Practices

### 1. Set Up Budgets
```
- Create monthly budget alerts
- Set thresholds: 50%, 80%, 100%
- Configure SNS notifications
```

### 2. Use Cost Explorer
```
- Review daily/monthly trends
- Identify cost anomalies
- Analyze by service, region, tag
```

### 3. Enable Cost Allocation Tags
```
- Environment: prod, dev, test
- Project: project-name
- Owner: team-name
- CostCenter: department-code
```

### 4. Regular Reviews
```
- Weekly: Check for anomalies
- Monthly: Review and optimize
- Quarterly: Strategic planning
```

## Common Cost Pitfalls

### 1. Forgotten Resources
- Unused EBS volumes
- Unattached Elastic IPs
- Old snapshots
- Stopped but not terminated instances

### 2. Over-Provisioning
- Instance types too large
- Storage over-allocated
- Unnecessary Multi-AZ

### 3. Data Transfer Costs
- Cross-region transfers
- NAT Gateway overuse
- Inefficient CloudFront usage

### 4. Development Environments
- Running 24/7 when not needed
- Using production-sized resources
- No auto-shutdown policies

## Tools & Resources

- **AWS Pricing Calculator**: https://calculator.aws/
- **AWS Cost Explorer**: Console → Billing → Cost Explorer
- **AWS Budgets**: Console → Billing → Budgets
- **AWS Cost Anomaly Detection**: Automatic anomaly alerts
- **AWS Compute Optimizer**: Right-sizing recommendations
- **AWS Trusted Advisor**: Cost optimization checks

---

**Remember**: Cost optimization is an ongoing process, not a one-time task! 💰
